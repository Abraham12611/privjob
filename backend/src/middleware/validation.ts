import { FastifyRequest, FastifyReply } from 'fastify';
import { z, ZodSchema, ZodTypeAny } from 'zod';
import { ValidationError } from '@/types';

// Generic validation middleware factory
export function validateSchema(schema: ZodTypeAny) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      // Validate request body
      if (request.body) {
        request.body = schema.parse(request.body);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Validation failed: ${errorMessage}`);
      }
      throw error;
    }
  };
}

// Validate query parameters
export function validateQuery(schema: ZodTypeAny) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      request.query = schema.parse(request.query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Query validation failed: ${errorMessage}`);
      }
      throw error;
    }
  };
}

// Validate URL parameters
export function validateParams(schema: ZodTypeAny) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      request.params = schema.parse(request.params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Parameter validation failed: ${errorMessage}`);
      }
      throw error;
    }
  };
}

// Common validation schemas
export const schemas = {
  // UUID parameter validation
  uuidParam: z.object({
    id: z.string().uuid('Invalid UUID format')
  }),

  // Specific named params
  tokenParam: z.object({
    token: z.string().min(1)
  }),
  jobIdParam: z.object({
    jobId: z.string().uuid('Invalid jobId UUID format')
  }),
  requestIdParam: z.object({
    requestId: z.string().uuid('Invalid requestId UUID format')
  }),
  jobAppParams: z.object({
    jobId: z.string().uuid('Invalid jobId UUID format'),
    applicationId: z.string().uuid('Invalid applicationId UUID format')
  }),

  // Pagination query validation
  pagination: z.object({
    limit: z.string().optional().transform(val => val ? parseInt(val) : 20)
      .pipe(z.number().min(1).max(100)),
    offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
      .pipe(z.number().min(0))
  }),

  // Job creation validation
  createJob: z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(5000).optional(),
    type: z.enum(['Full Time', 'Part Time', 'Contract', 'Freelance']),
    workplace: z.enum(['Remote', 'Hybrid', 'Onsite']),
    location: z.string().min(1).max(100),
    seniority: z.enum(['Junior', 'Mid', 'Senior', 'Lead', 'Head']),
    salary_min: z.number().min(0).optional(),
    salary_max: z.number().min(0).optional(),
    salary_currency: z.string().length(3).default('USD'),
    criteria: z.object({
      minYears: z.number().min(0).max(50).optional(),
      allowedCertGroupIds: z.array(z.string()).optional(),
      cutoffTime: z.string().datetime().optional()
    }),
    tags: z.array(z.string().max(50)).max(20).default([]),
    responsibilities: z.array(z.string().max(500)).max(20).default([]),
    benefits: z.array(z.string().max(200)).max(20).default([])
  }).refine(data => {
    if (data.salary_min && data.salary_max) {
      return data.salary_min <= data.salary_max;
    }
    return true;
  }, {
    message: "salary_min must be less than or equal to salary_max"
  }),

  // Job update validation
  updateJob: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(5000).optional(),
    type: z.enum(['Full Time', 'Part Time', 'Contract', 'Freelance']).optional(),
    workplace: z.enum(['Remote', 'Hybrid', 'Onsite']).optional(),
    location: z.string().min(1).max(100).optional(),
    seniority: z.enum(['Junior', 'Mid', 'Senior', 'Lead', 'Head']).optional(),
    salary_min: z.number().min(0).optional(),
    salary_max: z.number().min(0).optional(),
    salary_currency: z.string().length(3).optional(),
    status: z.enum(['Open', 'Closed', 'Draft']).optional(),
    criteria: z.object({
      minYears: z.number().min(0).max(50).optional(),
      allowedCertGroupIds: z.array(z.string()).optional(),
      cutoffTime: z.string().datetime().optional()
    }).optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
    responsibilities: z.array(z.string().max(500)).max(20).optional(),
    benefits: z.array(z.string().max(200)).max(20).optional()
  }).refine(data => {
    if (data.salary_min && data.salary_max) {
      return data.salary_min <= data.salary_max;
    }
    return true;
  }, {
    message: "salary_min must be less than or equal to salary_max"
  }),

  // Job search query validation
  jobSearch: z.object({
    search: z.string().max(100).optional(),
    type: z.union([
      z.string(),
      z.array(z.string())
    ]).optional().transform(val => {
      if (typeof val === 'string') return [val];
      return val;
    }),
    workplace: z.union([
      z.string(),
      z.array(z.string())
    ]).optional().transform(val => {
      if (typeof val === 'string') return [val];
      return val;
    }),
    location: z.union([
      z.string(),
      z.array(z.string())
    ]).optional().transform(val => {
      if (typeof val === 'string') return [val];
      return val;
    }),
    seniority: z.union([
      z.string(),
      z.array(z.string())
    ]).optional().transform(val => {
      if (typeof val === 'string') return [val];
      return val;
    }),
    salary_min: z.string().optional().transform(val => val ? parseInt(val) : undefined)
      .pipe(z.number().min(0).optional()),
    salary_max: z.string().optional().transform(val => val ? parseInt(val) : undefined)
      .pipe(z.number().min(0).optional()),
    organization_id: z.string().uuid().optional(),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 20)
      .pipe(z.number().min(1).max(100)),
    offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
      .pipe(z.number().min(0))
  }),

  // Application filters validation
  applicationFilters: z.object({
    verdict: z.string().optional().transform(val => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    }).pipe(z.boolean().optional()),
    since: z.string().datetime().optional(),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 20)
      .pipe(z.number().min(1).max(100)),
    offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
      .pipe(z.number().min(0))
  }),

  // Contact request creation validation
  createContactRequest: z.object({
    message: z.string().max(1000).optional()
  }),

  // Contact reveal validation
  revealContact: z.object({
    job_id: z.string().uuid(),
    application_id: z.string().uuid(),
    channel: z.enum(['privInbox', 'email']),
    encrypted_payload: z.string().min(1).max(10000)
  }),

  // Webhook creation validation
  createWebhook: z.object({
    url: z.string().url(),
    events: z.array(z.enum([
      'application.received',
      'contact.requested',
      'contact.revealed'
    ])).min(1),
    secret: z.string().min(16).max(128).optional()
  }),

  // Organization creation validation
  createOrganization: z.object({
    name: z.string().min(1).max(200),
    logo_url: z.string().url().optional(),
    website: z.string().url().optional()
  }),

  // Employer user creation validation
  createEmployerUser: z.object({
    email: z.string().email(),
    role: z.enum(['admin', 'recruiter', 'viewer'])
  })
};
