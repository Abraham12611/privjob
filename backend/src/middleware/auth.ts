import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { securityConfig } from '@/config/env';
import { supabase } from '@/services/database';
import { JWTPayload, AuthenticationError, AuthorizationError } from '@/types';
import { logger } from '@/utils/logger';

// Extend FastifyRequest to include user info
declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}

// JWT Authentication middleware
export async function authenticateJWT(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify JWT token
    const decoded = jwt.verify(token, securityConfig.jwtSecret) as JWTPayload;
    
    // Validate token structure
    if (!decoded.sub || !decoded.org_id || !decoded.role) {
      throw new AuthenticationError('Invalid token payload');
    }

    // Verify user still exists and is active
    const { data: user, error } = await supabase
      .from('employer_users')
      .select('id, organization_id, email, role')
      .eq('id', decoded.sub)
      .single();

    if (error || !user) {
      throw new AuthenticationError('User not found or inactive');
    }

    // Verify organization match
    if (user.organization_id !== decoded.org_id) {
      throw new AuthenticationError('Token organization mismatch');
    }

    // Attach user info to request
    request.user = decoded;
    
    // Update last login timestamp
    await supabase
      .from('employer_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', decoded.sub);

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid or expired token');
    }
    throw error;
  }
}

// Role-based authorization middleware
export function requireRole(allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      throw new AuthenticationError('Authentication required');
    }

    if (!allowedRoles.includes(request.user.role)) {
      throw new AuthorizationError(
        `Insufficient permissions. Required roles: ${allowedRoles.join(', ')}`
      );
    }
  };
}

// Generate JWT token for employer user
export function generateJWT(user: {
  id: string;
  organization_id: string;
  role: string;
}): string {
  const payload: Omit<JWTPayload, 'exp' | 'iat'> = {
    sub: user.id,
    org_id: user.organization_id,
    role: user.role as any
  };

  return jwt.sign(payload, securityConfig.jwtSecret, {
    expiresIn: '24h',
    issuer: 'privjob-backend',
    audience: 'privjob-frontend'
  });
}

// Verify JWT token without middleware (for utility use)
export function verifyJWT(token: string): JWTPayload {
  try {
    return jwt.verify(token, securityConfig.jwtSecret) as JWTPayload;
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
}

// Optional authentication middleware (doesn't throw if no token)
export async function optionalAuth(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await authenticateJWT(request, reply);
  } catch (error) {
    // Silently ignore authentication errors for optional auth
    logger.debug('Optional auth failed:', error);
  }
}
