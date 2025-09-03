import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { registerRoutes } from '@/routes';

describe('Health Endpoints', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify({ logger: false });
    await registerRoutes(app);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return healthy status on /health', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.status).toBe('healthy');
    expect(body.service).toBe('privjob-backend');
    expect(body.timestamp).toBeDefined();
  });

  it('should return liveness status on /live', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/live'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.alive).toBe(true);
    expect(body.timestamp).toBeDefined();
  });

  it('should return jobs list endpoint', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/jobs'
    });

    // Should return 200 even with empty results
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });
});
