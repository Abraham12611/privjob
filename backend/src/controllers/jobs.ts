import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '@/services/database';
import { CreateJobRequest, UpdateJobRequest, JobFilters, NotFoundError, AuthorizationError } from '@/types';
import { logger } from '@/utils/logger';

// Get all jobs (public endpoint with optional filters)
export async function getJobs(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const {
    search,
    type,
    workplace,
    location,
    seniority,
    salary_min,
    salary_max,
    organization_id,
    limit = 20,
    offset = 0
  } = (request.query as JobFilters);

  let query = supabase
    .from('jobs')
    .select(`
      id,
      organization_id,
      title,
      description,
      type,
      workplace,
      location,
      seniority,
      salary_min,
      salary_max,
      salary_currency,
      status,
      criteria,
      tags,
      responsibilities,
      benefits,
      posted_at,
      updated_at,
      organizations!inner(
        id,
        name,
        logo_url,
        website
      )
    `)
    .eq('status', 'Open') // Only show open jobs publicly
    .order('posted_at', { ascending: false });

  // Apply filters
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (type && type.length > 0) {
    query = query.in('type', type);
  }

  if (workplace && workplace.length > 0) {
    query = query.in('workplace', workplace);
  }

  if (seniority && seniority.length > 0) {
    query = query.in('seniority', seniority);
  }

  if (location && location.length > 0) {
    query = query.in('location', location);
  }

  if (salary_min) {
    query = query.gte('salary_max', salary_min);
  }

  if (salary_max) {
    query = query.lte('salary_min', salary_max);
  }

  if (organization_id) {
    query = query.eq('organization_id', organization_id);
  }

  // Get total count for pagination
  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Open');

  // Apply pagination
  const { data: jobs, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    logger.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }

  return reply.send({
    success: true,
    data: jobs,
    pagination: {
      total: count || 0,
      limit,
      offset,
      has_more: (count || 0) > offset + limit
    }
  });
}

// Get single job by ID (public endpoint)
export async function getJobById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = (request.params as { id: string });

  const { data: job, error } = await supabase
    .from('jobs')
    .select(`
      id,
      organization_id,
      title,
      description,
      type,
      workplace,
      location,
      seniority,
      salary_min,
      salary_max,
      salary_currency,
      status,
      criteria,
      tags,
      responsibilities,
      benefits,
      posted_at,
      updated_at,
      organizations!inner(
        id,
        name,
        logo_url,
        website
      )
    `)
    .eq('id', id)
    .eq('status', 'Open') // Only show open jobs publicly
    .single();

  if (error || !job) {
    throw new NotFoundError('Job not found');
  }

  return reply.send({
    success: true,
    data: job
  });
}

// Create new job (employer only)
export async function createJob(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const jobData = {
    ...(request.body as CreateJobRequest),
    organization_id: request.user.org_id,
    created_by: request.user.sub
  };

  const { data: job, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select(`
      id,
      organization_id,
      title,
      description,
      type,
      workplace,
      location,
      seniority,
      salary_min,
      salary_max,
      salary_currency,
      status,
      criteria,
      tags,
      responsibilities,
      benefits,
      posted_at,
      updated_at,
      created_by
    `)
    .single();

  if (error) {
    logger.error('Error creating job:', error);
    throw new Error('Failed to create job');
  }

  logger.info('Job created:', { jobId: job.id, organizationId: request.user.org_id });

  return reply.status(201).send({
    success: true,
    data: job,
    message: 'Job created successfully'
  });
}

// Update job (employer only)
export async function updateJob(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { id } = (request.params as { id: string });

  // Verify job belongs to user's organization
  const { data: existingJob, error: fetchError } = await supabase
    .from('jobs')
    .select('id, organization_id')
    .eq('id', id)
    .single();

  if (fetchError || !existingJob) {
    throw new NotFoundError('Job not found');
  }

  if (existingJob.organization_id !== request.user.org_id) {
    throw new AuthorizationError('You can only update jobs from your organization');
  }

  const { data: job, error } = await supabase
    .from('jobs')
    .update(request.body as UpdateJobRequest)
    .eq('id', id)
    .select(`
      id,
      organization_id,
      title,
      description,
      type,
      workplace,
      location,
      seniority,
      salary_min,
      salary_max,
      salary_currency,
      status,
      criteria,
      tags,
      responsibilities,
      benefits,
      posted_at,
      updated_at,
      created_by
    `)
    .single();

  if (error) {
    logger.error('Error updating job:', error);
    throw new Error('Failed to update job');
  }

  logger.info('Job updated:', { jobId: id, organizationId: request.user.org_id });

  return reply.send({
    success: true,
    data: job,
    message: 'Job updated successfully'
  });
}

// Delete job (employer only)
export async function deleteJob(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const { id } = (request.params as { id: string });

  // Verify job belongs to user's organization
  const { data: existingJob, error: fetchError } = await supabase
    .from('jobs')
    .select('id, organization_id')
    .eq('id', id)
    .single();

  if (fetchError || !existingJob) {
    throw new NotFoundError('Job not found');
  }

  if (existingJob.organization_id !== request.user.org_id) {
    throw new AuthorizationError('You can only delete jobs from your organization');
  }

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    logger.error('Error deleting job:', error);
    throw new Error('Failed to delete job');
  }

  logger.info('Job deleted:', { jobId: id, organizationId: request.user.org_id });

  return reply.send({
    success: true,
    message: 'Job deleted successfully'
  });
}

// Get organization's jobs (employer only)
export async function getOrganizationJobs(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) {
    throw new AuthorizationError('Authentication required');
  }

  const {
    search,
    type,
    workplace,
    location,
    seniority,
    salary_min,
    salary_max,
    limit = 20,
    offset = 0
  } = (request.query as JobFilters);

  let query = supabase
    .from('jobs')
    .select(`
      id,
      organization_id,
      title,
      description,
      type,
      workplace,
      location,
      seniority,
      salary_min,
      salary_max,
      salary_currency,
      status,
      criteria,
      tags,
      responsibilities,
      benefits,
      posted_at,
      updated_at,
      created_by
    `)
    .eq('organization_id', request.user.org_id)
    .order('posted_at', { ascending: false });

  // Apply filters (same as public endpoint but without status filter)
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (type && type.length > 0) {
    query = query.in('type', type);
  }

  if (workplace && workplace.length > 0) {
    query = query.in('workplace', workplace);
  }

  if (seniority && seniority.length > 0) {
    query = query.in('seniority', seniority);
  }

  if (location && location.length > 0) {
    query = query.in('location', location);
  }

  if (salary_min) {
    query = query.gte('salary_max', salary_min);
  }

  if (salary_max) {
    query = query.lte('salary_min', salary_max);
  }

  // Get total count for pagination
  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', request.user.org_id);

  // Apply pagination
  const { data: jobs, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    logger.error('Error fetching organization jobs:', error);
    throw new Error('Failed to fetch jobs');
  }

  return reply.send({
    success: true,
    data: jobs,
    pagination: {
      total: count || 0,
      limit,
      offset,
      has_more: (count || 0) > offset + limit
    }
  });
}
