import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '@/services/database';
import { ApplicationFilters, NotFoundError, AuthorizationError } from '@/types';
import { logger } from '@/utils/logger';

// Get applications for a specific job (employer only)
export async function getJobApplications(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { jobId } = (request.params as { jobId: string });
  const { verdict, since, limit = 20, offset = 0 } = (request.query as ApplicationFilters);

  // Verify job belongs to user's organization
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('id, organization_id')
    .eq('id', jobId)
    .single();

  if (jobError || !job) {
    throw new NotFoundError('Job not found');
  }

  if (job.organization_id !== request.user.org_id) {
    throw new AuthorizationError('You can only view applications for your organization\'s jobs');
  }

  let query = supabase
    .from('applications')
    .select(`
      id,
      job_id,
      tx_hash,
      commitment_hash,
      verdict,
      criteria_results,
      submitted_at,
      indexed_at
    `)
    .eq('job_id', jobId)
    .order('submitted_at', { ascending: false });

  // Apply filters
  if (verdict !== undefined) {
    query = query.eq('verdict', verdict);
  }

  if (since) {
    query = query.gte('submitted_at', since);
  }

  // Get total count for pagination
  const { count } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('job_id', jobId);

  // Apply pagination
  const { data: applications, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    logger.error('Error fetching applications:', error);
    throw new Error('Failed to fetch applications');
  }

  return reply.send({
    success: true,
    data: applications,
    pagination: {
      total: count || 0,
      limit,
      offset,
      has_more: (count || 0) > offset + limit
    }
  });
}

// Get single application by ID (employer only)
export async function getApplicationById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { id } = (request.params as { id: string });

  const { data: application, error } = await supabase
    .from('applications')
    .select(`
      id,
      job_id,
      tx_hash,
      commitment_hash,
      verdict,
      criteria_results,
      submitted_at,
      indexed_at,
      jobs!inner(
        id,
        title,
        organization_id,
        organizations!inner(
          id,
          name
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error || !application) {
    throw new NotFoundError('Application not found');
  }

  // Verify application belongs to user's organization
  const jobOrgId = Array.isArray((application as any).jobs)
    ? (application as any).jobs[0]?.organization_id
    : (application as any).jobs?.organization_id;
  if (jobOrgId !== request.user.org_id) {
    throw new AuthorizationError('You can only view applications for your organization\'s jobs');
  }

  return reply.send({
    success: true,
    data: application
  });
}

// Get all applications for organization (employer only)
export async function getOrganizationApplications(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { verdict, since, limit = 20, offset = 0 } = (request.query as ApplicationFilters);

  let query = supabase
    .from('applications')
    .select(`
      id,
      job_id,
      tx_hash,
      commitment_hash,
      verdict,
      criteria_results,
      submitted_at,
      indexed_at,
      jobs!inner(
        id,
        title,
        organization_id
      )
    `)
    .eq('jobs.organization_id', request.user.org_id)
    .order('submitted_at', { ascending: false });

  // Apply filters
  if (verdict !== undefined) {
    query = query.eq('verdict', verdict);
  }

  if (since) {
    query = query.gte('submitted_at', since);
  }

  // Get total count for pagination
  const { count } = await supabase
    .from('applications')
    .select('*, jobs!inner(organization_id)', { count: 'exact', head: true })
    .eq('jobs.organization_id', request.user.org_id);

  // Apply pagination
  const { data: applications, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    logger.error('Error fetching organization applications:', error);
    throw new Error('Failed to fetch applications');
  }

  return reply.send({
    success: true,
    data: applications,
    pagination: {
      total: count || 0,
      limit,
      offset,
      has_more: (count || 0) > offset + limit
    }
  });
}

// Get application statistics for a job (employer only)
export async function getJobApplicationStats(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { jobId } = (request.params as { jobId: string });

  // Verify job belongs to user's organization
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('id, organization_id')
    .eq('id', jobId)
    .single();

  if (jobError || !job) {
    throw new NotFoundError('Job not found');
  }

  if (job.organization_id !== request.user.org_id) {
    throw new AuthorizationError('You can only view statistics for your organization\'s jobs');
  }

  // Get application statistics
  const { data: stats, error } = await supabase
    .rpc('get_application_stats', { job_id: jobId });

  if (error) {
    // If RPC doesn't exist, calculate stats manually
    const [totalResult, qualifiedResult, recentResult] = await Promise.all([
      supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_id', jobId),
      supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_id', jobId)
        .eq('verdict', true),
      supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_id', jobId)
        .gte('submitted_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    ]);

    const statistics = {
      total_applications: totalResult.count || 0,
      qualified_applications: qualifiedResult.count || 0,
      recent_applications: recentResult.count || 0,
      qualification_rate: totalResult.count ? 
        Math.round((qualifiedResult.count || 0) / totalResult.count * 100) : 0
    };

    return reply.send({
      success: true,
      data: statistics
    });
  }

  return reply.send({
    success: true,
    data: stats
  });
}
