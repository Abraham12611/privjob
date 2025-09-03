import { createClient, RedisClientType } from 'redis';
import { redisConfig } from '@/config/env';
import { logger } from '@/utils/logger';

// Redis client instance
let redisClient: RedisClientType | null = null;

// Initialize Redis connection
export async function initializeRedis(): Promise<RedisClientType> {
  if (redisClient) {
    return redisClient;
  }

  try {
    redisClient = createClient({
      url: redisConfig.url,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis connection failed after 10 retries');
            return new Error('Redis connection failed');
          }
          return Math.min(retries * 100, 3000);
        }
      }
    });

    redisClient.on('error', (error) => {
      logger.error('Redis client error:', error);
    });

    redisClient.on('connect', () => {
      logger.info('Redis client connected');
    });

    redisClient.on('ready', () => {
      logger.info('Redis client ready');
    });

    redisClient.on('end', () => {
      logger.warn('Redis client connection ended');
    });

    await redisClient.connect();
    
    // Test connection
    await redisClient.ping();
    logger.info('Redis connection established successfully');

    return redisClient;
  } catch (error) {
    logger.error('Failed to initialize Redis:', error);
    throw error;
  }
}

// Get Redis client (initialize if needed)
export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    return await initializeRedis();
  }
  return redisClient;
}

// Redis health check
export async function checkRedisConnection(): Promise<boolean> {
  try {
    const client = await getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    logger.error('Redis health check failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function closeRedisConnection(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
      redisClient = null;
      logger.info('Redis connection closed gracefully');
    } catch (error) {
      logger.error('Error closing Redis connection:', error);
    }
  }
}

// Redis utility functions for contact broker
export class RedisService {
  private client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  // Set key with TTL
  async setWithTTL(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.client.setEx(key, ttlSeconds, value);
  }

  // Get and delete (one-time read)
  async getAndDelete(key: string): Promise<string | null> {
    const value = await this.client.getDel(key);
    return value;
  }

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  // Delete key
  async delete(key: string): Promise<boolean> {
    const result = await this.client.del(key);
    return result === 1;
  }

  // Get TTL for key
  async getTTL(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  // Set JSON object with TTL
  async setJSONWithTTL(key: string, value: any, ttlSeconds: number): Promise<void> {
    await this.setWithTTL(key, JSON.stringify(value), ttlSeconds);
  }

  // Get JSON object and delete
  async getJSONAndDelete(key: string): Promise<any | null> {
    const value = await this.getAndDelete(key);
    if (!value) return null;
    
    try {
      return JSON.parse(value);
    } catch (error) {
      logger.error('Failed to parse JSON from Redis:', error);
      return null;
    }
  }

  // Increment counter with TTL
  async incrementWithTTL(key: string, ttlSeconds: number): Promise<number> {
    const pipeline = this.client.multi();
    pipeline.incr(key);
    pipeline.expire(key, ttlSeconds);
    const results = await pipeline.exec();
    return results?.[0] as number || 0;
  }

  // Rate limiting helper
  async checkRateLimit(
    identifier: string, 
    windowSeconds: number, 
    maxRequests: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = now - (windowSeconds * 1000);

    // Remove old entries and count current requests
    await this.client.zRemRangeByScore(key, 0, windowStart);
    const currentCount = await this.client.zCard(key);

    if (currentCount >= maxRequests) {
      const oldestEntry = await this.client.zRange(key, 0, 0, { BY: 'SCORE' });
      const resetTime = oldestEntry.length > 0 
        ? parseInt(oldestEntry[0]) + (windowSeconds * 1000)
        : now + (windowSeconds * 1000);

      return {
        allowed: false,
        remaining: 0,
        resetTime
      };
    }

    // Add current request
    await this.client.zAdd(key, { score: now, value: `${now}-${Math.random()}` });
    await this.client.expire(key, windowSeconds);

    return {
      allowed: true,
      remaining: maxRequests - currentCount - 1,
      resetTime: now + (windowSeconds * 1000)
    };
  }
}

// Export singleton instance
export async function getRedisService(): Promise<RedisService> {
  const client = await getRedisClient();
  return new RedisService(client);
}
