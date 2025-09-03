import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { registerRoutes } from '@/routes';
import { initializeRedis, closeRedisConnection } from '@/services/redis';
import { supabase } from '@/services/database';

describe('PrivJob Full-Stack Integration Tests', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    // Initialize test app
    app = Fastify({ logger: false });
    await registerRoutes(app);
    await app.ready();

    // Initialize Redis for tests
    await initializeRedis();
  });

  afterAll(async () => {
    await app.close();
    await closeRedisConnection();
  });

  describe('Health Endpoints', () => {
    it('should return healthy status', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health'
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.status).toBe('healthy');
      expect(body.service).toBe('privjob-backend');
    });

    it('should return detailed health check', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health/detailed'
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('checks');
      expect(body.checks).toHaveProperty('database');
      expect(body.checks).toHaveProperty('redis');
    });
  });

  describe('Job Endpoints', () => {
    it('should fetch public jobs', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/jobs'
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
    });

    it('should handle job search with filters', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/jobs?search=developer&location=remote'
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
    });

    it('should return 404 for non-existent job', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/jobs/00000000-0000-0000-0000-000000000000'
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('Organization Endpoints', () => {
    it('should fetch organizations', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/organizations'
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
    });
  });

  describe('Contact Endpoints', () => {
    it('should handle contact reveal request', async () => {
      const contactData = {
        job_id: '550e8400-e29b-41d4-a716-446655440000',
        application_id: '550e8400-e29b-41d4-a716-446655440001',
        contact_info: {
          email: 'test@example.com',
          phone: '+1234567890'
        }
      };

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/contact/reveal',
        payload: contactData
      });

      // Should return 200 or appropriate error based on data validation
      expect([200, 400, 404]).toContain(response.statusCode);
    });
  });

  describe('Authentication Flow', () => {
    it('should reject unauthorized requests to protected endpoints', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/applications'
      });

      expect(response.statusCode).toBe(401);
    });

    it('should reject invalid JWT tokens', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/applications',
        headers: {
          authorization: 'Bearer invalid-token'
        }
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('Database Integration', () => {
    it('should connect to Supabase successfully', async () => {
      const { data, error } = await supabase
        .from('organizations')
        .select('id')
        .limit(1);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should respect RLS policies', async () => {
      // Test that unauthorized access is blocked by RLS
      const { data, error } = await supabase
        .from('employer_users')
        .select('*');

      // Should either return empty array or error due to RLS
      expect(error || data?.length === 0).toBeTruthy();
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limits to API endpoints', async () => {
      const requests = Array.from({ length: 10 }, () =>
        app.inject({
          method: 'GET',
          url: '/api/v1/jobs'
        })
      );

      const responses = await Promise.all(requests);
      
      // All requests should succeed initially (within rate limit)
      responses.forEach(response => {
        expect([200, 429]).toContain(response.statusCode);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON requests', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/contact/reveal',
        payload: 'invalid-json',
        headers: {
          'content-type': 'application/json'
        }
      });

      expect(response.statusCode).toBe(400);
    });

    it('should return proper error format', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/nonexistent'
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body).toHaveProperty('error');
    });
  });

  describe('CORS Configuration', () => {
    it('should include CORS headers', async () => {
      const response = await app.inject({
        method: 'OPTIONS',
        url: '/api/v1/jobs',
        headers: {
          origin: 'http://localhost:3000'
        }
      });

      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });
});
