import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { initializeRedis, closeRedisConnection } from '@/services/redis';

// Test environment setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'error';
  
  // Initialize Redis for tests
  await initializeRedis();
});

afterAll(async () => {
  // Clean up Redis connection
  await closeRedisConnection();
});

beforeEach(() => {
  // Reset any global state before each test
});

afterEach(() => {
  // Clean up after each test
});
