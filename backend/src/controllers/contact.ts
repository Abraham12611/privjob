import { FastifyRequest, FastifyReply } from 'fastify';
import { ContactBroker } from '@/services/contact-broker';
import { CreateContactRequestRequest, RevealContactRequest, NotFoundError, AuthorizationError } from '@/types';
import { logger } from '@/utils/logger';

const contactBroker = new ContactBroker();

// Create contact request (employer only)
export async function createContactRequest(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { jobId, applicationId } = (request.params as { jobId: string; applicationId: string });
  const { message } = (request.body as CreateContactRequestRequest);

  try {
    const result = await contactBroker.createContactRequest(
      jobId,
      applicationId,
      message
    );

    logger.info('Contact request created:', {
      requestId: result.requestId,
      jobId,
      applicationId,
      organizationId: request.user.org_id
    });

    return reply.status(201).send({
      success: true,
      data: result,
      message: 'Contact request created successfully'
    });
  } catch (error) {
    logger.error('Error creating contact request:', error);
    throw error;
  }
}

// Reveal contact information (candidate - no auth required)
export async function revealContact(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { job_id, application_id, channel, encrypted_payload } = (request.body as RevealContactRequest);

  // Find the contact request
  const { data: contactRequest, error } = await require('@/services/database').supabase
    .from('contact_requests')
    .select('id')
    .eq('job_id', job_id)
    .eq('application_id', application_id)
    .eq('status', 'requested')
    .single();

  if (error || !contactRequest) {
    throw new NotFoundError('Contact request not found or not in requested state');
  }

  try {
    const result = await contactBroker.revealContact(
      contactRequest.id,
      channel,
      encrypted_payload
    );

    logger.info('Contact revealed:', {
      requestId: contactRequest.id,
      jobId: job_id,
      applicationId: application_id,
      channel
    });

    return reply.send({
      success: true,
      data: result,
      message: 'Contact information revealed successfully'
    });
  } catch (error) {
    logger.error('Error revealing contact:', error);
    throw error;
  }
}

// Consume contact token (employer only)
export async function consumeContactToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { token } = (request.params as { token: string });

  try {
    const contactInfo = await contactBroker.consumeContactToken(token);

    if (!contactInfo) {
      throw new NotFoundError('Contact token not found or already consumed');
    }

    logger.info('Contact token consumed:', {
      requestId: contactInfo.request_id,
      organizationId: request.user.org_id
    });

    return reply.send({
      success: true,
      data: contactInfo,
      message: 'Contact information retrieved successfully'
    });
  } catch (error) {
    logger.error('Error consuming contact token:', error);
    throw error;
  }
}

// Get contact requests for a job (employer only)
export async function getJobContactRequests(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { jobId } = (request.params as { jobId: string });

  try {
    const requests = await contactBroker.getJobContactRequests(
      jobId,
      request.user.org_id
    );

    return reply.send({
      success: true,
      data: requests
    });
  } catch (error) {
    logger.error('Error fetching job contact requests:', error);
    throw error;
  }
}

// Get all contact requests for organization (employer only)
export async function getOrganizationContactRequests(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { status, limit = '20', offset = '0' } = (request.query as { status?: string; limit?: string; offset?: string });

  try {
    const result = await contactBroker.getOrganizationContactRequests(
      request.user.org_id,
      status,
      parseInt(limit),
      parseInt(offset)
    );

    return reply.send({
      success: true,
      data: result.requests,
      pagination: {
        total: result.total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: result.total > parseInt(offset) + parseInt(limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching organization contact requests:', error);
    throw error;
  }
}

// Update contact request status (employer only)
export async function updateContactRequestStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { requestId } = (request.params as { requestId: string });
  const { status } = (request.body as { status: string });

  try {
    const updatedRequest = await contactBroker.updateContactRequestStatus(
      requestId,
      status as any,
      request.user.org_id
    );

    logger.info('Contact request status updated:', {
      requestId,
      status,
      organizationId: request.user.org_id
    });

    return reply.send({
      success: true,
      data: updatedRequest,
      message: 'Contact request status updated successfully'
    });
  } catch (error) {
    logger.error('Error updating contact request status:', error);
    throw error;
  }
}
