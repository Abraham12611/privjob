import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { ApiError, ValidationError, AuthenticationError, AuthorizationError, NotFoundError, ConflictError, RateLimitError } from '@/types';
import { logger } from '@/utils/logger';

// Global error handler
export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // Log error details
  logger.error('Request error:', {
    error: error.message,
    stack: error.stack,
    method: request.method,
    url: request.url,
    statusCode: error.statusCode,
    requestId: request.id
  });

  // Handle known API errors
  if (error instanceof ValidationError) {
    return reply.status(400).send({
      success: false,
      error: 'VALIDATION_ERROR',
      message: error.message
    });
  }

  if (error instanceof AuthenticationError) {
    return reply.status(401).send({
      success: false,
      error: 'AUTHENTICATION_ERROR',
      message: error.message
    });
  }

  if (error instanceof AuthorizationError) {
    return reply.status(403).send({
      success: false,
      error: 'AUTHORIZATION_ERROR',
      message: error.message
    });
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      success: false,
      error: 'NOT_FOUND',
      message: error.message
    });
  }

  if (error instanceof ConflictError) {
    return reply.status(409).send({
      success: false,
      error: 'CONFLICT',
      message: error.message
    });
  }

  if (error instanceof RateLimitError) {
    return reply.status(429).send({
      success: false,
      error: 'RATE_LIMIT_EXCEEDED',
      message: error.message
    });
  }

  // Handle Fastify validation errors
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Request validation failed',
      details: error.validation
    });
  }

  // Handle Supabase errors
  if (error.message?.includes('duplicate key value')) {
    return reply.status(409).send({
      success: false,
      error: 'CONFLICT',
      message: 'Resource already exists'
    });
  }

  if (error.message?.includes('foreign key constraint')) {
    return reply.status(400).send({
      success: false,
      error: 'INVALID_REFERENCE',
      message: 'Referenced resource does not exist'
    });
  }

  // Handle rate limiting errors
  if (error.statusCode === 429) {
    return reply.status(429).send({
      success: false,
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    });
  }

  // Handle generic API errors
  if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
    return reply.status(error.statusCode).send({
      success: false,
      error: 'CLIENT_ERROR',
      message: error.message || 'Bad request'
    });
  }

  // Handle server errors
  const statusCode = error.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  return reply.status(statusCode).send({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: isDevelopment ? error.message : 'Internal server error',
    ...(isDevelopment && { stack: error.stack })
  });
}

// Not found handler
export async function notFoundHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  return reply.status(404).send({
    success: false,
    error: 'NOT_FOUND',
    message: `Route ${request.method} ${request.url} not found`
  });
}
