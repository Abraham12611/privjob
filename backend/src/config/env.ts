import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenvConfig();

// Environment validation schema
const envSchema = z.object({
  // Server Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('3000'),
  HOST: z.string().default('0.0.0.0'),

  // Supabase Configuration
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_KEY: z.string().min(1),

  // Redis Configuration
  REDIS_URL: z.string().url().default('redis://localhost:6379'),

  // Midnight Network Configuration
  MIDNIGHT_PROVIDER_URL: z.string().url(),
  MIDNIGHT_CONTRACT_ADDRESS: z.string().min(1),

  // Security Configuration
  JWT_SECRET: z.string().min(32),
  ENCRYPTION_KEY: z.string().length(32),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).pipe(z.number().positive()).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).pipe(z.number().positive()).default('100'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FORMAT: z.enum(['json', 'simple']).default('json'),

  // CORS Configuration
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Webhook Configuration
  WEBHOOK_TIMEOUT_MS: z.string().transform(Number).pipe(z.number().positive()).default('5000'),
  WEBHOOK_RETRY_ATTEMPTS: z.string().transform(Number).pipe(z.number().min(0).max(10)).default('3'),
});

// Validate and export configuration
const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  console.error('❌ Invalid environment configuration:');
  envResult.error.issues.forEach((issue) => {
    console.error(`  ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

export const config = envResult.data;

// Derived configurations
export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';

// Database configuration
export const supabaseConfig = {
  url: config.SUPABASE_URL,
  anonKey: config.SUPABASE_ANON_KEY,
  serviceKey: config.SUPABASE_SERVICE_KEY,
};

// Redis configuration
export const redisConfig = {
  url: config.REDIS_URL,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
};

// Midnight Network configuration
export const midnightConfig = {
  providerUrl: config.MIDNIGHT_PROVIDER_URL,
  contractAddress: config.MIDNIGHT_CONTRACT_ADDRESS,
};

// Security configuration
export const securityConfig = {
  jwtSecret: config.JWT_SECRET,
  encryptionKey: config.ENCRYPTION_KEY,
  corsOrigins: config.CORS_ORIGIN.split(',').map(origin => origin.trim()),
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
};

// Logging configuration
export const loggingConfig = {
  level: config.LOG_LEVEL,
  format: config.LOG_FORMAT,
};

// Webhook configuration
export const webhookConfig = {
  timeoutMs: config.WEBHOOK_TIMEOUT_MS,
  retryAttempts: config.WEBHOOK_RETRY_ATTEMPTS,
};
