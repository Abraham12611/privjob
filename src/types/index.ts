// Core data types for PrivJob application

export interface Job {
  id: string
  title: string
  company: Company
  status: 'Open' | 'Closed'
  type: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance'
  workplace: 'Remote' | 'Hybrid' | 'Onsite'
  location: string
  salaryMin: number
  salaryMax: number
  salaryCurrency: string
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Head'
  postedAt: string
  lastActivityAt: string
  applicationDeadline?: string
  tags: string[]
  criteria: JobCriteria
  applicationsCount: number
  description?: string
  requirements?: string[]
  responsibilities?: string[]
  benefits?: string[]
  privacyOptions?: {
    hideCompany: boolean
    hideSalary: boolean
    requireVerification: boolean
  }
  applications?: string[]
}

export interface Company {
  id: string
  name: string
  logoUrl: string
  about?: string
  website?: string
}

export interface JobCriteria {
  minYears?: number
  allowedCertGroupIds?: string[]
  cutoffTime?: string
}

export interface Attestation {
  id: string
  type: 'cert' | 'experience' | 'education'
  issuer: Issuer
  groupId: string
  hash: string
  createdAt: string
  expiry?: string
  status: 'Valid' | 'Expired' | 'Revoked'
  metadata: { label: string; value: string }
  merklePath?: string[]
}

export interface Issuer {
  id: string
  name: string
  logoUrl: string
}

export interface Application {
  id: string
  jobId: string
  job?: Job
  submittedAt: string
  receiptTxHash: string
  criteriaResults: CriteriaResult[]
  meetsAll: boolean
  status: 'Submitted' | 'Verified' | 'Failed'
  notes?: string
}

export interface CriteriaResult {
  label: string
  pass: boolean
}

export interface ContactRequest {
  id: string
  jobId: string
  job?: Job
  fromEmployer: Employer
  message?: string
  createdAt: string
  updatedAt?: string
  expiresAt?: string
  status: 'Pending' | 'Accepted' | 'Declined' | 'Expired' | 'Failed'
  channel: 'privInbox' | 'email'
  ephemeralHandle?: string
}

export interface Employer {
  id: string
  name: string
  logoUrl?: string
  team?: TeamMember[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email?: string
  avatarUrl?: string
}

export interface Applicant {
  id: string
  jobId: string
  submittedAt: string
  appliedAt: string
  anonymousId: string
  avatarUrl?: string
  criteriaResults: CriteriaResult[]
  proofResults: { criterion: string; verified: boolean }[]
  meetsAll: boolean
  status: 'Received' | 'ContactRequested' | 'ContactRevealed'
  verificationStatus: 'qualified' | 'partial' | 'rejected' | 'pending'
  contactStatus: 'none' | 'requested' | 'accepted' | 'declined'
  receiptTxHash: string
}

export interface Activity {
  id: string
  type: 'posted' | 'criteria_updated' | 'application_received' | 'contact_requested'
  jobId: string
  at: string
  meta: any
}

// Settings types
export interface CandidateSettings {
  handle: string
  keyFingerprint: string
  vault: {
    encrypted: boolean
    lastBackupAt?: string
  }
  notifications: {
    contactRequests: boolean
    email?: string
  }
  privacy: {
    telemetry: boolean
    reducedMotion: boolean
  }
  security: {
    autoLockMinutes: number
  }
  dangerZone: {
    resetEnabled: boolean
  }
}

export interface EmployerSettings {
  org: {
    name: string
    logoUrl: string
    website?: string
  }
  team: TeamMember[]
  notifications: {
    applicantEvents: boolean
    contactReveals: boolean
    email?: string
  }
  api: {
    publicKey: string
    webhookUrl?: string
  }
  security: {
    require2FA: boolean
  }
}

// Filter and sort types
export interface JobFilters {
  search?: string
  type?: string | string[]
  seniority?: string | string[]
  workplace?: string | string[]
  location?: string[]
  time?: string
  salaryMin?: number
  salaryMax?: number
  companyId?: string
  companyIds?: string[]
}

export interface AttestationFilters {
  type?: string
  status?: string
  issuerId?: string
}

export interface ApplicationFilters {
  status?: string
  companyId?: string
}

export interface ContactFilters {
  status?: string
  companyId?: string
}

// UI State types
export interface UIState {
  selectedCardId?: string
  drawerOpen: boolean
  modalOpen: boolean
  loading: boolean
  error?: string
}

// ZK Proof types (mocked)
export interface ProofInputs {
  postingId: string
  minYears: number
  allowedCertRoot: string
  cutoffTime: string
  nullifier: string
}

export interface WitnessInputs {
  userSecret: string
  yearsExperience: number
  certId: string
  merklePath: string[]
  attestationTimestamp: string
}

export interface ZKProof {
  proof: string
  publicInputs: ProofInputs
  nullifier: string
}

export interface ProofResult {
  success: boolean
  txHash?: string
  error?: string
}
