import { FastifyInstance } from 'fastify';
import { authenticateJWT, requireRole } from '@/middleware/auth';
import { validateQuery, validateParams, schemas } from '@/middleware/validation';
import {
  getJobApplications,
  getApplicationById,
  getOrganizationApplications,
  getJobApplicationStats
} from '@/controllers/applications';

export async function applicationRoutes(fastify: FastifyInstance) {
  // Apply authentication to all application routes
  fastify.addHook('preHandler', authenticateJWT);

  // Get all applications for organization
  fastify.get('/', {
    preHandler: [validateQuery(schemas.applicationFilters)]
  }, getOrganizationApplications as any);

  // Get single application by ID
  fastify.get('/:id', {
    preHandler: [validateParams(schemas.uuidParam)]
  }, getApplicationById as any);

  // Get applications for specific job
  fastify.get('/job/:jobId', {
    preHandler: [
      validateParams(schemas.jobIdParam),
      validateQuery(schemas.applicationFilters)
    ]
  }, getJobApplications as any);

  // Get application statistics for a job
  fastify.get('/job/:jobId/stats', {
    preHandler: [validateParams(schemas.jobIdParam)]
  }, getJobApplicationStats as any);
}
