import { FastifyInstance } from 'fastify';
import { jobRoutes } from './jobs';
import { applicationRoutes } from './applications';
import { contactRoutes } from './contact';
import { organizationRoutes } from './organizations';
import { healthRoutes } from './health';

// Register all API routes
export async function registerRoutes(fastify: FastifyInstance) {
  // Health check routes (no prefix)
  await fastify.register(healthRoutes);

  // API routes with /api/v1 prefix
  await fastify.register(async function (fastify) {
    // Public routes
    await fastify.register(jobRoutes, { prefix: '/jobs', scope: 'public' } as any);
    await fastify.register(organizationRoutes, { prefix: '/organizations' });
    
    // Contact routes (mixed auth)
    await fastify.register(contactRoutes, { prefix: '/contact' });
    
    // Employer-only routes
    await fastify.register(async function (fastify) {
      await fastify.register(applicationRoutes, { prefix: '/applications' });
      
      // Employer job management
      await fastify.register(jobRoutes, { prefix: '/employer/jobs', scope: 'employer' } as any);
      
      // Employer contact management
      await fastify.register(contactRoutes, { prefix: '/employer/contact' });
    });
  }, { prefix: '/api/v1' });
}
