// Core types for PrivJob Backend API

export interface Organization {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployerUser {
  id: string;
  organization_id: string;
  email: string;
  role: 'admin' | 'recruiter' | 'viewer';
  created_at: string;
  last_login_at?: string;
}

export interface Job {
  id: string;
  organization_id: string;
  title: string;
  description?: string;
  type: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance';
  workplace: 'Remote' | 'Hybrid' | 'Onsite';
  location: string;
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Head';
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  status: 'Open' | 'Closed' | 'Draft';
  criteria: ZKCriteria;
  tags: string[];
  responsibilities: string[];
  benefits: string[];
  posted_at: string;
  updated_at: string;
  created_by: string;
}

export interface ZKCriteria {
  minYears?: number;
  allowedCertGroupIds?: string[];
  cutoffTime?: string;
}

export interface Application {
  id: string;
  job_id: string;
  tx_hash: string;
  commitment_hash: string;
  verdict: boolean;
  criteria_results: CriteriaResults;
  submitted_at: string;
  indexed_at: string;
}

export interface CriteriaResults {
  yearsExperience?: boolean;
  certificationValid?: boolean;
  timeRequirement?: boolean;
  [key: string]: boolean | undefined;
}

export interface ContactRequest {
  id: string;
  job_id: string;
  application_id: string;
  status: 'pending' | 'requested' | 'accepted' | 'declined' | 'expired' | 'revealed' | 'consumed';
  message?: string;
  one_time_token?: string;
  channel?: 'privInbox' | 'email';
  created_at: string;
  expires_at: string;
  revealed_at?: string;
}

export interface Webhook {
  id: string;
  organization_id: string;
  url: string;
  secret: string;
  events: string[];
  active: boolean;
  created_at: string;
  last_triggered_at?: string;
}

// API Request/Response Types
export interface CreateJobRequest {
  title: string;
  description?: string;
  type: Job['type'];
  workplace: Job['workplace'];
  location: string;
  seniority: Job['seniority'];
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  criteria: ZKCriteria;
  tags?: string[];
  responsibilities?: string[];
  benefits?: string[];
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  status?: Job['status'];
}

export interface JobFilters {
  search?: string;
  type?: string[];
  workplace?: string[];
  location?: string[];
  seniority?: string[];
  salary_min?: number;
  salary_max?: number;
  organization_id?: string;
  limit?: number;
  offset?: number;
}

export interface ApplicationFilters {
  verdict?: boolean;
  since?: string;
  limit?: number;
  offset?: number;
}

export interface CreateContactRequestRequest {
  message?: string;
}

export interface RevealContactRequest {
  job_id: string;
  application_id: string;
  channel: 'privInbox' | 'email';
  encrypted_payload: string;
}

export interface ContactInfo {
  request_id: string;
  channel: 'privInbox' | 'email';
  payload: string;
  created_at: number;
}

// Authentication Types
export interface JWTPayload {
  sub: string; // employer_user.id
  org_id: string;
  role: EmployerUser['role'];
  exp: number;
  iat: number;
}

// Midnight Network Types
export interface MidnightApplicationEvent {
  txHash: string;
  jobId: string;
  commitment: string;
  verdict: boolean;
  criteriaVector: string;
  timestamp: number;
  blockNumber: number;
}

export interface ZKProofInputs {
  jobId: string;
  minYears: number;
  allowedCertRoot: string;
  cutoffTime: string;
  nullifier: string;
}

export interface ZKWitnessInputs {
  yearsExperience: number;
  certId: string;
  merklePath: string[];
  attestationTimestamp: string;
  userSecret: string;
}

// Webhook Event Types
export interface WebhookEvent {
  type: 'application.received' | 'contact.requested' | 'contact.revealed';
  timestamp: string;
  data: Record<string, any>;
}

export interface ApplicationReceivedEvent extends WebhookEvent {
  type: 'application.received';
  data: {
    job_id: string;
    tx_hash: string;
    verdict: boolean;
    submitted_at: string;
  };
}

export interface ContactRequestedEvent extends WebhookEvent {
  type: 'contact.requested';
  data: {
    job_id: string;
    application_id: string;
    request_id: string;
    message?: string;
  };
}

export interface ContactRevealedEvent extends WebhookEvent {
  type: 'contact.revealed';
  data: {
    job_id: string;
    application_id: string;
    request_id: string;
    channel: string;
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

// Error Types
export interface ApiError extends Error {
  statusCode: number;
  code?: string;
}

export class ValidationError extends Error implements ApiError {
  statusCode = 400;
  code = 'VALIDATION_ERROR';
}

export class AuthenticationError extends Error implements ApiError {
  statusCode = 401;
  code = 'AUTHENTICATION_ERROR';
}

export class AuthorizationError extends Error implements ApiError {
  statusCode = 403;
  code = 'AUTHORIZATION_ERROR';
}

export class NotFoundError extends Error implements ApiError {
  statusCode = 404;
  code = 'NOT_FOUND';
}

export class ConflictError extends Error implements ApiError {
  statusCode = 409;
  code = 'CONFLICT';
}

export class RateLimitError extends Error implements ApiError {
  statusCode = 429;
  code = 'RATE_LIMIT_EXCEEDED';
}
