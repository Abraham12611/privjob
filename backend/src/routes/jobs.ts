import { FastifyInstance } from 'fastify';
import { authenticateJWT, requireRole } from '@/middleware/auth';
import { validateSchema, validateQuery, validateParams, schemas } from '@/middleware/validation';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getOrganizationJobs
} from '@/controllers/jobs';

export async function jobRoutes(
  fastify: FastifyInstance,
  opts: { scope?: 'public' | 'employer' } = {}
) {
  const scope = opts.scope || 'public';

  if (scope === 'public') {
    // Public job routes
    fastify.get('/', {
      preHandler: [validateQuery(schemas.jobSearch)]
    }, getJobs as any);

    fastify.get('/:id', {
      preHandler: [validateParams(schemas.uuidParam)]
    }, getJobById as any);
    return;
  }

  // Employer job management routes
  // Apply authentication to all routes in this context
  fastify.addHook('preHandler', authenticateJWT);

  // Get organization's jobs
  fastify.get('/', {
    preHandler: [validateQuery(schemas.jobSearch)]
  }, getOrganizationJobs as any);

  // Create new job
  fastify.post('/', {
    preHandler: [
      requireRole(['admin', 'recruiter']),
      validateSchema(schemas.createJob)
    ]
  }, createJob as any);

  // Update job
  fastify.put('/:id', {
    preHandler: [
      requireRole(['admin', 'recruiter']),
      validateParams(schemas.uuidParam),
      validateSchema(schemas.updateJob)
    ]
  }, updateJob as any);

  // Delete job
  fastify.delete('/:id', {
    preHandler: [
      requireRole(['admin', 'recruiter']),
      validateParams(schemas.uuidParam)
    ]
  }, deleteJob as any);
}
