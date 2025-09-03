// API client that works with MSW in development and real APIs in production
class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Jobs
  async getJobs(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters)
    return this.request(`/jobs?${params}`)
  }

  async getJob(id: string) {
    return this.request(`/jobs/${id}`)
  }

  // Companies
  async getCompanies() {
    return this.request('/companies')
  }

  async getCompany(id: string) {
    return this.request(`/companies/${id}`)
  }

  // Attestations
  async getAttestations() {
    return this.request('/attestations')
  }

  async getAttestation(id: string) {
    return this.request(`/attestations/${id}`)
  }

  // Applications
  async getApplications(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters)
    return this.request(`/applications?${params}`)
  }

  async getApplication(id: string) {
    return this.request(`/applications/${id}`)
  }

  // Contact requests
  async getContactRequests(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters)
    return this.request(`/contact-requests?${params}`)
  }

  async respondToContactRequest(id: string, action: 'accept' | 'decline', message?: string) {
    return this.request(`/contact-requests/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ action, message })
    })
  }

  // Applicants (for employers)
  async getJobApplicants(jobId: string, filters?: Record<string, string>) {
    const params = new URLSearchParams(filters)
    return this.request(`/jobs/${jobId}/applicants?${params}`)
  }

  // ZK Proofs
  async buildProof(publicInputs: any, witnessInputs: any) {
    return this.request('/proofs/build', {
      method: 'POST',
      body: JSON.stringify({ publicInputs, witnessInputs })
    })
  }

  async submitApplication(proof: any) {
    return this.request('/applications/submit', {
      method: 'POST',
      body: JSON.stringify({ proof })
    })
  }

  // Settings
  async getSettings() {
    return this.request('/settings')
  }

  async updateSettings(settings: any) {
    return this.request('/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings)
    })
  }
}

export const apiClient = new ApiClient()
