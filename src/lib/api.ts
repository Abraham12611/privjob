// API client for PrivJob backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Ensure the base URL ends with /api/v1
const normalizeBaseUrl = (url: string) => {
  const normalized = url.endsWith('/') ? url.slice(0, -1) : url;
  return normalized.endsWith('/api/v1') ? normalized : `${normalized}/api/v1`;
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: any[];
  zk_criteria: any[];
  salary_range: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  remote_ok: boolean;
  organization_id: string;
  organization?: {
    id: string;
    name: string;
    logo_url?: string;
    website?: string;
  };
  status: 'draft' | 'published' | 'closed';
  created_at: string;
  updated_at: string;
}

interface Application {
  id: string;
  job_id: string;
  organization_id: string;
  candidate_proof_hash: string;
  proof_data: any;
  transaction_id: string;
  block_number: number;
  status: 'submitted' | 'reviewed' | 'contacted' | 'rejected';
  submitted_at: string;
  updated_at: string;
  job?: Job;
}

interface Organization {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
  created_at: string;
}

interface ContactRequest {
  id: string;
  job_id: string;
  application_id: string;
  organization_id: string;
  status: 'pending' | 'revealed' | 'consumed' | 'expired';
  expires_at: string;
  created_at: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = normalizeBaseUrl(baseUrl);
    
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Job endpoints
  async getJobs(params?: {
    search?: string;
    location?: string;
    remote?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Job>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/jobs${query ? `?${query}` : ''}`);
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`);
  }

  // Organization endpoints
  async getOrganizations(params?: {
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Organization>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/organizations${query ? `?${query}` : ''}`);
  }

  async getOrganization(id: string): Promise<ApiResponse<Organization>> {
    return this.request(`/organizations/${id}`);
  }

  // Employer endpoints (require authentication)
  async createJob(jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.request('/employer/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.request(`/employer/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.request(`/employer/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  async getOrganizationJobs(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Job>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/employer/jobs${query ? `?${query}` : ''}`);
  }

  // Application endpoints (require authentication)
  async getApplications(params?: {
    job_id?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Application>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/applications${query ? `?${query}` : ''}`);
  }

  async getApplication(id: string): Promise<ApiResponse<Application>> {
    return this.request(`/applications/${id}`);
  }

  async getJobApplications(jobId: string, params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Application>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/applications/job/${jobId}${query ? `?${query}` : ''}`);
  }

  // Contact endpoints
  async revealContact(data: {
    job_id: string;
    application_id: string;
    contact_info: {
      email: string;
      phone?: string;
      linkedin?: string;
    };
  }): Promise<ApiResponse<{ token: string }>> {
    return this.request('/contact/reveal', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async consumeContactToken(token: string): Promise<ApiResponse<any>> {
    return this.request(`/contact/token/${token}`);
  }

  async createContactRequest(
    jobId: string,
    applicationId: string,
    data: { message?: string }
  ): Promise<ApiResponse<ContactRequest>> {
    return this.request(`/employer/contact/jobs/${jobId}/applications/${applicationId}/request`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContactRequests(jobId?: string): Promise<PaginatedResponse<ContactRequest>> {
    const endpoint = jobId 
      ? `/employer/contact/jobs/${jobId}/requests`
      : '/employer/contact/requests';
    return this.request(endpoint);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; service: string }> {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type {
  Job,
  Application,
  Organization,
  ContactRequest,
  ApiResponse,
  PaginatedResponse,
};
