import { createHash, randomBytes } from 'crypto';
import { getRedisService } from '@/services/redis';
import { supabase } from '@/services/database';
import { ContactRequest, ContactInfo, RevealContactRequest, NotFoundError, ConflictError } from '@/types';
import { logger } from '@/utils/logger';

export class ContactBroker {
  private static readonly CONTACT_REQUEST_TTL = 14 * 24 * 60 * 60; // 14 days
  private static readonly CONTACT_TOKEN_TTL = 60 * 60; // 1 hour

  // Create a contact request from employer to candidate
  async createContactRequest(
    jobId: string,
    applicationId: string,
    employerMessage?: string
  ): Promise<{ requestId: string }> {
    // Check if contact request already exists
    const { data: existing } = await supabase
      .from('contact_requests')
      .select('id, status')
      .eq('job_id', jobId)
      .eq('application_id', applicationId)
      .single();

    if (existing) {
      if (existing.status === 'consumed' || existing.status === 'revealed') {
        throw new ConflictError('Contact has already been revealed for this application');
      }
      if (existing.status === 'requested') {
        throw new ConflictError('Contact request already exists for this application');
      }
    }

    const { data: contactRequest, error } = await supabase
      .from('contact_requests')
      .upsert({
        job_id: jobId,
        application_id: applicationId,
        message: employerMessage,
        status: 'requested'
      }, {
        onConflict: 'job_id,application_id'
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating contact request:', error);
      throw new Error('Failed to create contact request');
    }

    // Cache in Redis for fast lookup
    const redis = await getRedisService();
    await redis.setJSONWithTTL(
      `contact_req:${contactRequest.id}`,
      contactRequest,
      ContactBroker.CONTACT_REQUEST_TTL
    );

    logger.info('Contact request created:', {
      requestId: contactRequest.id,
      jobId,
      applicationId
    });

    return { requestId: contactRequest.id };
  }

  // Candidate reveals contact information
  async revealContact(
    requestId: string,
    channel: 'privInbox' | 'email',
    encryptedPayload: string
  ): Promise<{ token: string }> {
    // Verify contact request exists and is in correct state
    const { data: request, error } = await supabase
      .from('contact_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (error || !request) {
      throw new NotFoundError('Contact request not found');
    }

    if (request.status !== 'requested') {
      throw new ConflictError(`Contact request is in ${request.status} state, cannot reveal`);
    }

    if (new Date(request.expires_at) < new Date()) {
      throw new ConflictError('Contact request has expired');
    }

    // Generate one-time token
    const token = randomBytes(32).toString('hex');
    
    // Store encrypted contact info with short TTL
    const redis = await getRedisService();
    const contactInfo: ContactInfo = {
      request_id: requestId,
      channel,
      payload: encryptedPayload,
      created_at: Date.now()
    };

    await redis.setJSONWithTTL(
      `contact_token:${token}`,
      contactInfo,
      ContactBroker.CONTACT_TOKEN_TTL
    );

    // Update request status
    await supabase
      .from('contact_requests')
      .update({ 
        status: 'revealed',
        one_time_token: token,
        channel,
        revealed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    logger.info('Contact revealed:', {
      requestId,
      channel,
      tokenHash: createHash('sha256').update(token).digest('hex').substring(0, 8)
    });

    return { token };
  }

  // Employer consumes contact token (one-time read)
  async consumeContactToken(token: string): Promise<ContactInfo | null> {
    const redis = await getRedisService();
    
    // One-time read and delete
    const contactInfo = await redis.getJSONAndDelete(`contact_token:${token}`);
    
    if (!contactInfo) {
      return null;
    }

    // Mark as consumed in database
    await supabase
      .from('contact_requests')
      .update({ status: 'consumed' })
      .eq('one_time_token', token);

    logger.info('Contact token consumed:', {
      requestId: contactInfo.request_id,
      channel: contactInfo.channel,
      tokenHash: createHash('sha256').update(token).digest('hex').substring(0, 8)
    });

    return contactInfo;
  }

  // Get contact request by ID
  async getContactRequest(requestId: string): Promise<ContactRequest | null> {
    const redis = await getRedisService();
    
    // Try Redis cache first
    let request = await redis.getJSONAndDelete(`contact_req:${requestId}`);
    
    if (!request) {
      // Fallback to database
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (error || !data) {
        return null;
      }

      request = data;
    }

    return request;
  }

  // Get contact requests for a job (employer only)
  async getJobContactRequests(
    jobId: string,
    organizationId: string
  ): Promise<ContactRequest[]> {
    // Verify job belongs to organization
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('id, organization_id')
      .eq('id', jobId)
      .eq('organization_id', organizationId)
      .single();

    if (jobError || !job) {
      throw new NotFoundError('Job not found');
    }

    const { data: requests, error } = await supabase
      .from('contact_requests')
      .select(`
        *,
        applications!inner(
          id,
          tx_hash,
          verdict,
          submitted_at
        )
      `)
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Error fetching contact requests:', error);
      throw new Error('Failed to fetch contact requests');
    }

    return requests || [];
  }

  // Get all contact requests for organization (employer only)
  async getOrganizationContactRequests(
    organizationId: string,
    status?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<{ requests: ContactRequest[]; total: number }> {
    let query = supabase
      .from('contact_requests')
      .select(`
        *,
        jobs!inner(
          id,
          title,
          organization_id
        ),
        applications!inner(
          id,
          tx_hash,
          verdict,
          submitted_at
        )
      `)
      .eq('jobs.organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    // Get total count
    const { count } = await supabase
      .from('contact_requests')
      .select('*, jobs!inner(organization_id)', { count: 'exact', head: true })
      .eq('jobs.organization_id', organizationId);

    // Apply pagination
    const { data: requests, error } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error('Error fetching organization contact requests:', error);
      throw new Error('Failed to fetch contact requests');
    }

    return {
      requests: requests || [],
      total: count || 0
    };
  }

  // Update contact request status
  async updateContactRequestStatus(
    requestId: string,
    status: ContactRequest['status'],
    organizationId: string
  ): Promise<ContactRequest> {
    // Verify request belongs to organization
    const { data: request, error: fetchError } = await supabase
      .from('contact_requests')
      .select(`
        *,
        jobs!inner(
          organization_id
        )
      `)
      .eq('id', requestId)
      .single();

    if (fetchError || !request) {
      throw new NotFoundError('Contact request not found');
    }

    if (request.jobs.organization_id !== organizationId) {
      throw new NotFoundError('Contact request not found');
    }

    const { data: updatedRequest, error } = await supabase
      .from('contact_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      logger.error('Error updating contact request status:', error);
      throw new Error('Failed to update contact request');
    }

    logger.info('Contact request status updated:', {
      requestId,
      status,
      organizationId
    });

    return updatedRequest;
  }

  // Clean up expired contact requests (called by cron job)
  async cleanupExpiredRequests(): Promise<{ cleaned: number }> {
    const { data: expired, error } = await supabase
      .from('contact_requests')
      .delete()
      .or(`expires_at.lt.${new Date().toISOString()},and(revealed_at.not.is.null,revealed_at.lt.${new Date(Date.now() - 60 * 60 * 1000).toISOString()})`)
      .select('id');

    if (error) {
      logger.error('Error cleaning up expired contact requests:', error);
      return { cleaned: 0 };
    }

    const cleanedCount = expired?.length || 0;
    
    if (cleanedCount > 0) {
      logger.info('Cleaned up expired contact requests:', { count: cleanedCount });
    }

    return { cleaned: cleanedCount };
  }
}
