import { FastifyInstance } from 'fastify';
import { checkDatabaseConnection } from '@/services/database';
import { checkRedisConnection } from '@/services/redis';

export async function healthRoutes(fastify: FastifyInstance) {
  // Basic health check
  fastify.get('/health', async (request, reply) => {
    return reply.send({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'privjob-backend'
    });
  });

  // Detailed health check with dependencies
  fastify.get('/health/detailed', async (request, reply) => {
    const checks = {
      database: await checkDatabaseConnection(),
      redis: await checkRedisConnection()
    };

    const healthy = Object.values(checks).every(Boolean);

    return reply
      .code(healthy ? 200 : 503)
      .send({
        status: healthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'privjob-backend',
        checks
      });
  });

  // Readiness probe
  fastify.get('/ready', async (request, reply) => {
    const ready = await checkDatabaseConnection() && await checkRedisConnection();
    
    return reply
      .code(ready ? 200 : 503)
      .send({
        ready,
        timestamp: new Date().toISOString()
      });
  });

  // Liveness probe
  fastify.get('/live', async (request, reply) => {
    return reply.send({
      alive: true,
      timestamp: new Date().toISOString()
    });
  });
}
