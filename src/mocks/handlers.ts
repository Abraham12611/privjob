import { http, HttpResponse } from 'msw'
import { 
  mockJobs, 
  mockCompanies, 
  mockAttestations, 
  mockApplications, 
  mockContactRequests, 
  mockApplicants,
  simulateNetworkDelay,
  simulateRandomError 
} from '@/services/mock-data'
import type { ContactRequest } from '@/types'
import { Job, JobFilters } from '@/types'

export const handlers = [
  // Jobs endpoints
  http.get('/api/v1/jobs', async ({ request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const type = url.searchParams.get('type')
    const seniority = url.searchParams.get('seniority')
    const workplace = url.searchParams.get('workplace')
    const companyId = url.searchParams.get('companyId')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const offset = parseInt(url.searchParams.get('offset') || '0', 10)
    
    let filteredJobs = [...mockJobs]
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.name.toLowerCase().includes(searchLower) ||
        (job.description && job.description.toLowerCase().includes(searchLower))
      )
    }
    
    if (type) {
      filteredJobs = filteredJobs.filter(job => job.type === type)
    }
    
    if (seniority) {
      filteredJobs = filteredJobs.filter(job => job.seniority === seniority)
    }
    
    if (workplace) {
      filteredJobs = filteredJobs.filter(job => job.workplace === workplace)
    }
    
    if (companyId) {
      filteredJobs = filteredJobs.filter(job => job.company.id === companyId)
    }
    
    // Apply pagination
    const paginatedJobs = filteredJobs.slice(offset, offset + limit)
    
    return HttpResponse.json({
      success: true,
      data: paginatedJobs,
      pagination: {
        total: filteredJobs.length,
        limit,
        offset,
        has_more: offset + limit < filteredJobs.length
      }
    })
    
    return HttpResponse.json(filteredJobs)
  }),

  http.get('/api/v1/jobs/:id', async ({ params }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const job = mockJobs.find(j => j.id === params.id)
    if (!job) {
      return HttpResponse.json({
        success: false,
        error: 'Job not found',
        status: 404
      }, { status: 404 })
    }
    
    // Format the response to match the expected API format
    const response = {
      success: true,
      data: {
        ...job,
        // Add any additional fields that the API would return
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Ensure all required fields are present
        salary_range: {
          min: job.salaryMin,
          max: job.salaryMax,
          currency: job.salaryCurrency
        },
        remote_ok: job.workplace === 'Remote',
        organization_id: job.company.id,
        organization: {
          id: job.company.id,
          name: job.company.name,
          logo_url: job.company.logoUrl,
          website: job.company.website
        }
      }
    }
    
    return HttpResponse.json(response)
  }),

  // Companies endpoints
  http.get('/api/v1/organizations', async ({ request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const offset = parseInt(url.searchParams.get('offset') || '0', 10)
    
    let filteredCompanies = [...mockCompanies]
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredCompanies = filteredCompanies.filter(company => 
        company.name.toLowerCase().includes(searchLower) ||
        (company.about && company.about.toLowerCase().includes(searchLower))
      )
    }
    
    // Apply pagination
    const paginatedCompanies = filteredCompanies.slice(offset, offset + limit)
    
    return HttpResponse.json({
      success: true,
      data: paginatedCompanies,
      pagination: {
        total: filteredCompanies.length,
        limit,
        offset,
        has_more: offset + limit < filteredCompanies.length
      }
    })
  }),

  http.get('/api/v1/organizations/:id', async ({ params }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const company = mockCompanies.find(c => c.id === params.id)
    if (!company) {
      return HttpResponse.json({
        success: false,
        error: 'Organization not found',
        status: 404
      }, { status: 404 })
    }
    
    // Format the response to match the expected API format
    const response = {
      success: true,
      data: {
        id: company.id,
        name: company.name,
        logo_url: company.logoUrl,
        about: company.about,
        website: company.website,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
    
    return HttpResponse.json(company)
  }),

  // Attestations endpoints
  http.get('/api/v1/attestations', async ({ request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const status = url.searchParams.get('status')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const offset = parseInt(url.searchParams.get('offset') || '0', 10)
    
    let filteredAttestations = [...mockAttestations]
    
    if (type) {
      filteredAttestations = filteredAttestations.filter(a => a.type === type)
    }
    
    if (status) {
      filteredAttestations = filteredAttestations.filter(a => a.status === status)
    }
    
    // Apply pagination
    const paginatedAttestations = filteredAttestations.slice(offset, offset + limit)
    
    return HttpResponse.json({
      success: true,
      data: paginatedAttestations,
      pagination: {
        total: filteredAttestations.length,
        limit,
        offset,
        has_more: offset + limit < filteredAttestations.length
      }
    })
  }),

  http.get('/api/v1/attestations/:id', async ({ params }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const attestation = mockAttestations.find(a => a.id === params.id)
    if (!attestation) {
      return HttpResponse.json({
        success: false,
        error: 'Attestation not found',
        status: 404
      }, { status: 404 })
    }
    
    // Format the response to match the expected API format
    const response = {
      success: true,
      data: {
        ...attestation,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Add any additional fields that the API would return
        issuer: {
          id: attestation.issuer.id,
          name: attestation.issuer.name,
          logo_url: attestation.issuer.logoUrl
        },
        // Ensure all required fields are present
        metadata: attestation.metadata || {},
        // Add any other fields that might be required
        status: attestation.status || 'Valid',
        // Add any other fields that might be required
        proof: {
          // Add any proof related fields here if needed
        }
      }
    }
    
    return HttpResponse.json(attestation)
  }),

  // Applications endpoints
  http.get('/api/v1/applications', async ({ request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const jobId = url.searchParams.get('jobId')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const offset = parseInt(url.searchParams.get('offset') || '0', 10)
    
    let filteredApplications = [...mockApplications]
    
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status)
    }
    
    if (jobId) {
      filteredApplications = filteredApplications.filter(app => app.jobId === jobId)
    }
    
    // Apply pagination
    const paginatedApplications = filteredApplications.slice(offset, offset + limit)
    
    // Format the response to match the expected API format
    const formattedApplications = paginatedApplications.map(app => ({
      ...app,
      created_at: app.submittedAt,
      updated_at: app.submittedAt,
      job: mockJobs.find(job => job.id === app.jobId),
      // Add any additional fields that the API would return
      criteria_results: app.criteriaResults,
      receipt_tx_hash: app.receiptTxHash,
      meets_all_criteria: app.meetsAll
    }))
    
    return HttpResponse.json({
      success: true,
      data: formattedApplications,
      pagination: {
        total: filteredApplications.length,
        limit,
        offset,
        has_more: offset + limit < filteredApplications.length
      }
    })
  }),

  http.get('/api/v1/applications/:id', async ({ params }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const application = mockApplications.find(a => a.id === params.id)
    if (!application) {
      return HttpResponse.json({
        success: false,
        error: 'Application not found',
        status: 404
      }, { status: 404 })
    }
    
    // Get the related job
    const job = mockJobs.find(j => j.id === application.jobId)
    
    // Format the response to match the expected API format
    const response = {
      success: true,
      data: {
        ...application,
        created_at: application.submittedAt,
        updated_at: application.submittedAt,
        job: job ? {
          id: job.id,
          title: job.title,
          company: job.company,
          status: job.status,
          type: job.type,
          workplace: job.workplace,
          location: job.location,
          salary_range: {
            min: job.salaryMin,
            max: job.salaryMax,
            currency: job.salaryCurrency
          },
          seniority: job.seniority,
          posted_at: job.postedAt,
          tags: job.tags
        } : null,
        // Add any additional fields that the API would return
        criteria_results: application.criteriaResults,
        receipt_tx_hash: application.receiptTxHash,
        meets_all_criteria: application.meetsAll,
        // Add any other fields that might be required
        status: application.status || 'Submitted',
        notes: application.notes || ''
      }
    }
    
    return HttpResponse.json(application)
  }),

  // Contact requests endpoints
  http.get('/api/v1/contact-requests', async ({ request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const jobId = url.searchParams.get('jobId')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const offset = parseInt(url.searchParams.get('offset') || '0', 10)
    
    let filteredRequests = [...mockContactRequests]
    
    if (status) {
      filteredRequests = filteredRequests.filter(req => req.status === status)
    }
    
    if (jobId) {
      filteredRequests = filteredRequests.filter(req => req.jobId === jobId)
    }
    
    // Apply pagination
    const paginatedRequests = filteredRequests.slice(offset, offset + limit)
    
    // Format the response to match the expected API format
    const formattedRequests = paginatedRequests.map(req => {
      const job = mockJobs.find(j => j.id === req.jobId)
      return {
        ...req,
        created_at: req.createdAt,
        updated_at: req.updatedAt || req.createdAt,
        expires_at: req.expiresAt,
        job: job ? {
          id: job.id,
          title: job.title,
          company: job.company,
          status: job.status,
          type: job.type,
          workplace: job.workplace,
          location: job.location
        } : null,
        from_employer: req.fromEmployer,
        channel: req.channel,
        ephemeral_handle: req.ephemeralHandle,
        // Add any other fields that might be required
        status: req.status || 'Pending',
        message: req.message || ''
      }
    })
    
    return HttpResponse.json({
      success: true,
      data: formattedRequests,
      pagination: {
        total: filteredRequests.length,
        limit,
        offset,
        has_more: offset + limit < filteredRequests.length
      }
    })
  }),

  http.post('/api/v1/contact-requests/:id/respond', async ({ params, request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const body = await request.json() as { action: 'accept' | 'decline'; message?: string }
    
    const requestIndex = mockContactRequests.findIndex(r => r.id === params.id)
    if (requestIndex === -1) {
      return HttpResponse.json({
        success: false,
        error: 'Contact request not found',
        status: 404
      }, { status: 404 })
    }
    
    // Create an updated request with the new status
    const currentRequest = mockContactRequests[requestIndex]
    const status = body.action === 'accept' ? 'Accepted' as const : 'Declined' as const;
    
    const updatedRequest: ContactRequest = {
      ...currentRequest,
      status,
      updatedAt: new Date().toISOString(),
      // If the request is accepted, generate an ephemeral handle if not exists
      ephemeralHandle: body.action === 'accept' 
        ? (currentRequest.ephemeralHandle || `anon-${Math.random().toString(36).substring(2, 10)}`)
        : currentRequest.ephemeralHandle
    }
    
    // Update the mock data
    mockContactRequests[requestIndex] = updatedRequest
    
    // Format the response
    const job = mockJobs.find(j => j.id === updatedRequest.jobId)
    
    return HttpResponse.json({
      success: true,
      data: {
        ...updatedRequest,
        created_at: updatedRequest.createdAt,
        updated_at: updatedRequest.updatedAt,
        expires_at: updatedRequest.expiresAt,
        job: job ? {
          id: job.id,
          title: job.title,
          company: job.company,
          status: job.status,
          type: job.type,
          workplace: job.workplace,
          location: job.location
        } : null,
        from_employer: updatedRequest.fromEmployer,
        channel: updatedRequest.channel,
        ephemeral_handle: updatedRequest.ephemeralHandle,
        status: updatedRequest.status,
        message: updatedRequest.message || ''
      }
    })
  }),

  // Applicants endpoints (for employers)
  http.get('/api/v1/jobs/:jobId/applicants', async ({ params, request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    
    let filteredApplicants = mockApplicants.filter(a => a.jobId === params.jobId)
    
    if (status) {
      filteredApplicants = filteredApplicants.filter(a => a.status === status)
    }
    
    return HttpResponse.json(filteredApplicants)
  }),

  // ZK Proof endpoints
  http.post('/api/proofs/build', async ({ request }) => {
    await simulateNetworkDelay(2000, 4000) // Longer delay for proof generation
    simulateRandomError()
    
    const body = await request.json() as {
      publicInputs: any
      witnessInputs: any
    }
    
    // Simulate proof generation
    const proof = {
      id: `proof_${Date.now()}`,
      publicInputs: body.publicInputs,
      proof: `0x${Math.random().toString(16).substring(2, 66)}`,
      createdAt: new Date().toISOString()
    }
    
    return HttpResponse.json(proof)
  }),

  http.post('/api/applications/submit', async ({ request }) => {
    await simulateNetworkDelay(1000, 3000)
    simulateRandomError()
    
    const body = await request.json() as { proof: any }
    
    const txHash = `0x${Math.random().toString(16).substring(2, 66)}`
    
    return HttpResponse.json({
      success: true,
      txHash,
      timestamp: new Date().toISOString()
    })
  }),

  // Settings endpoints
  http.get('/api/settings', async () => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    return HttpResponse.json({
      notifications: {
        email: true,
        push: false,
        sms: false
      },
      privacy: {
        showProfile: false,
        allowContact: true,
        shareStats: false
      },
      security: {
        twoFactor: false,
        sessionTimeout: 30
      }
    })
  }),

  http.patch('/api/settings', async ({ request }) => {
    await simulateNetworkDelay()
    simulateRandomError()
    
    const body = await request.json()
    
    return HttpResponse.json({
      success: true,
      settings: body
    })
  })
  ,
  // ------------------------------------------------------------
  // API v1 endpoints used by the demo script via src/lib/api.ts
  // ------------------------------------------------------------
  // Small helpers
  http.get('/api/v1/health', async () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'privjob-frontend-msw' })
  }),
  
  // In-memory stores for demo contact flow (ephemeral)
  http.post('/api/v1/employer/contact/jobs/:jobId/applications/:applicationId/request', async ({ params, request }) => {
    await simulateNetworkDelay()
    const { message } = await request.json().catch(() => ({})) as { message?: string }
    
    const job = mockJobs.find(j => j.id === params.jobId)
    if (!job) return new HttpResponse(JSON.stringify({ success: false, error: 'Job not found' }), { status: 404 })
    
    const contactRequest = {
      id: `cr_${Date.now()}`,
      job_id: job.id,
      application_id: String(params.applicationId),
      organization_id: job.company.id,
      status: 'pending',
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      message: message || 'We would like to get in touch regarding your application.'
    }
    // Stash into a loose array for demo visibility
    ;(globalThis as any).__contactRequests = (globalThis as any).__contactRequests || []
    ;(globalThis as any).__contactRequests.push(contactRequest)
    
    return HttpResponse.json({ success: true, data: contactRequest })
  }),
  
  // Candidate reveals contact info (returns a one-time token)
  http.post('/api/v1/contact/reveal', async ({ request }) => {
    await simulateNetworkDelay()
    const body = await request.json().catch(() => ({})) as any
    const token = `tok_${Math.random().toString(36).slice(2)}_${Date.now()}`
    
    ;(globalThis as any).__contactTokens = (globalThis as any).__contactTokens || new Map<string, any>()
    const store: Map<string, any> = (globalThis as any).__contactTokens
    store.set(token, { consumed: false, payload: body })
    
    return HttpResponse.json({ success: true, data: { token } })
  }),
  
  // Employer consumes the token (one-time)
  http.get('/api/v1/contact/token/:token', async ({ params }) => {
    await simulateNetworkDelay()
    const token = String(params.token)
    
    const store: Map<string, any> | undefined = (globalThis as any).__contactTokens
    if (!store || !store.has(token)) {
      return new HttpResponse(JSON.stringify({ success: false, error: 'Token not found or expired' }), { status: 404 })
    }
    const entry = store.get(token)
    if (entry.consumed) {
      return new HttpResponse(JSON.stringify({ success: false, error: 'Token already consumed' }), { status: 410 })
    }
    entry.consumed = true
    store.set(token, entry)
    // Only return the candidate-allowed subset
    const contact = entry.payload?.contact_info || { email: 'hidden@example.com' }
    return HttpResponse.json({ success: true, data: { contact, consumed_at: new Date().toISOString() } })
  }),
  
  // Jobs list (public) with pagination wrapper
  http.get('/api/v1/jobs', async ({ request }) => {
    await simulateNetworkDelay()
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase()
    const limit = Number(url.searchParams.get('limit') || 10)
    const offset = Number(url.searchParams.get('offset') || 0)
    
    let items = [...mockJobs]
    if (search) {
      items = items.filter(j => j.title.toLowerCase().includes(search) || j.company.name.toLowerCase().includes(search) || j.description.toLowerCase().includes(search))
    }
    
    const total = items.length
    const page = items.slice(offset, offset + limit)
    
    // Map to API Job shape
    const mapped = page.map(j => ({
      id: j.id,
      title: j.title,
      description: j.description,
      requirements: [],
      zk_criteria: j.criteria,
      salary_range: { min: j.salaryMin, max: j.salaryMax, currency: j.salaryCurrency },
      location: j.location,
      remote_ok: j.workplace === 'Remote',
      organization_id: j.company.id,
      organization: { id: j.company.id, name: j.company.name, logo_url: j.company.logoUrl, website: j.company.website },
      status: 'published',
      created_at: j.postedAt,
      updated_at: j.lastActivityAt
    }))
    
    return HttpResponse.json({
      success: true,
      data: mapped,
      pagination: { total, limit, offset, has_more: total > offset + limit }
    })
  }),
  
  // Job detail (public)
  http.get('/api/v1/jobs/:id', async ({ params }) => {
    await simulateNetworkDelay()
    const j = mockJobs.find(x => x.id === params.id)
    if (!j) return new HttpResponse(JSON.stringify({ success: false, error: 'Not found' }), { status: 404 })
    const mapped = {
      id: j.id,
      title: j.title,
      description: j.description,
      requirements: [],
      zk_criteria: j.criteria,
      salary_range: { min: j.salaryMin, max: j.salaryMax, currency: j.salaryCurrency },
      location: j.location,
      remote_ok: j.workplace === 'Remote',
      organization_id: j.company.id,
      organization: { id: j.company.id, name: j.company.name, logo_url: j.company.logoUrl, website: j.company.website },
      status: 'published',
      created_at: j.postedAt,
      updated_at: j.lastActivityAt
    }
    return HttpResponse.json({ success: true, data: mapped })
  }),
  
  // Applications (employer) with pagination
  http.get('/api/v1/applications', async ({ request }) => {
    await simulateNetworkDelay()
    const url = new URL(request.url)
    const jobId = url.searchParams.get('job_id') || undefined
    const limit = Number(url.searchParams.get('limit') || 10)
    const offset = Number(url.searchParams.get('offset') || 0)
    
    let apps = [...mockApplications]
    if (jobId) apps = apps.filter(a => a.jobId === jobId)
    const total = apps.length
    const page = apps.slice(offset, offset + limit)
    
    const mapped = page.map(a => ({
      id: a.id,
      job_id: a.jobId,
      organization_id: a.job.company.id,
      candidate_proof_hash: a.receiptTxHash,
      proof_data: a.criteriaResults,
      transaction_id: a.receiptTxHash,
      block_number: Math.floor(Math.random() * 100000),
      status: 'submitted',
      submitted_at: a.submittedAt,
      updated_at: a.submittedAt,
      job: {
        id: a.job.id,
        title: a.job.title,
        description: a.job.description,
        requirements: [],
        zk_criteria: a.job.criteria,
        salary_range: { min: a.job.salaryMin, max: a.job.salaryMax, currency: a.job.salaryCurrency },
        location: a.job.location,
        remote_ok: a.job.workplace === 'Remote',
        organization_id: a.job.company.id,
        organization: { id: a.job.company.id, name: a.job.company.name, logo_url: a.job.company.logoUrl, website: a.job.company.website },
        status: 'published',
        created_at: a.job.postedAt,
        updated_at: a.job.lastActivityAt
      }
    }))
    
    return HttpResponse.json({ success: true, data: mapped, pagination: { total, limit, offset, has_more: total > offset + limit } })
  }),
  
  // Applications per job (employer)
  http.get('/api/v1/applications/job/:jobId', async ({ params, request }) => {
    await simulateNetworkDelay()
    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit') || 10)
    const offset = Number(url.searchParams.get('offset') || 0)
    const jobId = String(params.jobId)
    
    let apps = mockApplications.filter(a => a.jobId === jobId)
    const total = apps.length
    const page = apps.slice(offset, offset + limit)
    
    const mapped = page.map(a => ({
      id: a.id,
      job_id: a.jobId,
      organization_id: a.job.company.id,
      candidate_proof_hash: a.receiptTxHash,
      proof_data: a.criteriaResults,
      transaction_id: a.receiptTxHash,
      block_number: Math.floor(Math.random() * 100000),
      status: 'submitted',
      submitted_at: a.submittedAt,
      updated_at: a.submittedAt
    }))
    
    return HttpResponse.json({ success: true, data: mapped, pagination: { total, limit, offset, has_more: total > offset + limit } })
  })
]
