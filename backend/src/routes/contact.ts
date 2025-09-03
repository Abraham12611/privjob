import { FastifyInstance } from 'fastify';
import { authenticateJWT, requireRole } from '@/middleware/auth';
import { validateSchema, validateParams, schemas } from '@/middleware/validation';
import {
  createContactRequest,
  revealContact,
  consumeContactToken,
  getJobContactRequests,
  getOrganizationContactRequests,
  updateContactRequestStatus
} from '@/controllers/contact';

export async function contactRoutes(fastify: FastifyInstance) {
  // Public contact routes (no authentication)
  
  // Candidate reveals contact information
  fastify.post('/reveal', {
    preHandler: [validateSchema(schemas.revealContact)]
  }, revealContact as any);

  // Employer consumes contact token
  fastify.get('/token/:token', {
    preHandler: [authenticateJWT, validateParams(schemas.tokenParam)]
  }, consumeContactToken as any);

  // Employer contact management routes
  fastify.register(async function (fastify) {
    // Apply authentication to all routes in this context
    fastify.addHook('preHandler', authenticateJWT);

    // Create contact request for specific application
    fastify.post('/jobs/:jobId/applications/:applicationId/request', {
      preHandler: [
        requireRole(['admin', 'recruiter']),
        validateParams(schemas.jobAppParams),
        validateSchema(schemas.createContactRequest)
      ]
    }, createContactRequest as any);

    // Get contact requests for a job
    fastify.get('/jobs/:jobId/requests', {
      preHandler: [validateParams(schemas.jobIdParam)]
    }, getJobContactRequests as any);

    // Get all contact requests for organization
    fastify.get('/requests', getOrganizationContactRequests as any);

    // Update contact request status
    fastify.put('/requests/:requestId/status', {
      preHandler: [
        requireRole(['admin', 'recruiter']),
        validateParams(schemas.requestIdParam)
      ]
    }, updateContactRequestStatus as any);
  });
}
