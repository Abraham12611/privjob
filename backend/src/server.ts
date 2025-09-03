import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { config, securityConfig, rateLimitConfig, isDevelopment } from '@/config/env';
import { logger } from '@/utils/logger';
import { initializeRedis, closeRedisConnection } from '@/services/redis';
import { errorHandler, notFoundHandler } from '@/middleware/error-handler';
import { registerRoutes } from '@/routes';

// Create Fastify instance
const fastify: FastifyInstance = Fastify({
  logger: isDevelopment ? {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  } : false,
  requestIdLogLabel: 'reqId',
  requestIdHeader: 'x-request-id'
});

// Register plugins
async function registerPlugins() {
  // Security plugins
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  });

  await fastify.register(cors, {
    origin: securityConfig.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID']
  });

  // Rate limiting
  await fastify.register(rateLimit, {
    ...rateLimitConfig,
    keyGenerator: (request) => {
      return request.ip || 'unknown';
    },
    errorResponseBuilder: (request, context) => {
      return {
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: `Rate limit exceeded, retry in ${Math.round(context.ttl / 1000)} seconds`,
        retryAfter: Math.round(context.ttl / 1000)
      };
    }
  });

  // API Documentation (only in development)
  if (isDevelopment) {
    await fastify.register(swagger, {
      swagger: {
        info: {
          title: 'PrivJob API',
          description: 'Privacy-first job platform with zero-knowledge proofs',
          version: '1.0.0'
        },
        host: `localhost:${config.PORT}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'jobs', description: 'Job management endpoints' },
          { name: 'applications', description: 'Application management endpoints' },
          { name: 'contact', description: 'Contact broker endpoints' },
          { name: 'organizations', description: 'Organization endpoints' },
          { name: 'health', description: 'Health check endpoints' }
        ],
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter JWT token in format: Bearer <token>'
          }
        }
      }
    });

    await fastify.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false
      }
    });
  }
}

// Initialize services
async function initializeServices() {
  try {
    // Initialize Redis connection
    await initializeRedis();
    logger.info('Services initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize services:', error);
    throw error;
  }
}

// Setup error handlers
function setupErrorHandlers() {
  fastify.setErrorHandler(errorHandler);
  fastify.setNotFoundHandler(notFoundHandler);
}

// Graceful shutdown
async function gracefulShutdown() {
  logger.info('Shutting down gracefully...');
  
  try {
    await closeRedisConnection();
    await fastify.close();
    logger.info('Server shutdown complete');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// Setup process handlers
function setupProcessHandlers() {
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
  
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
  });
}

// Start server
async function start() {
  try {
    // Setup process handlers
    setupProcessHandlers();
    
    // Initialize services
    await initializeServices();
    
    // Register plugins
    await registerPlugins();
    
    // Setup error handlers
    setupErrorHandlers();
    
    // Register routes
    await registerRoutes(fastify);
    
    // Start server
    await fastify.listen({
      port: config.PORT,
      host: config.HOST
    });
    
    logger.info(`🚀 PrivJob Backend API server running on http://${config.HOST}:${config.PORT}`);
    
    if (isDevelopment) {
      logger.info(`📚 API Documentation available at http://${config.HOST}:${config.PORT}/docs`);
    }
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
start();
