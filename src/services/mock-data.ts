import { Job, Company, Attestation, Application, ContactRequest, Applicant } from '@/types'
import { generateId, generateTxHash } from '@/lib/utils'

// Mock companies
export const mockCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'Figma',
    logoUrl: '/Figma.webp',
    about: 'Design platform for teams who build products together.',
    website: 'https://figma.com'
  },
  {
    id: 'company-2',
    name: 'Stripe',
    logoUrl: '/Stripe.png',
    about: 'Financial infrastructure for the internet.',
    website: 'https://stripe.com'
  },
  {
    id: 'company-3',
    name: 'Vercel',
    logoUrl: '/vercel.svg',
    about: 'Platform for frontend frameworks and static sites.',
    website: 'https://vercel.com'
  },
  {
    id: 'company-4',
    name: 'Linear',
    logoUrl: '/Linear.jpg',
    about: 'Issue tracking for modern software teams.',
    website: 'https://linear.app'
  },
  {
    id: 'company-5',
    name: 'Notion',
    logoUrl: '/Notion.webp',
    about: 'All-in-one workspace for notes, docs, and collaboration.',
    website: 'https://notion.so'
  }
]

// Mock jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    company: mockCompanies[0],
    status: 'Open',
    type: 'Full Time',
    workplace: 'Hybrid',
    location: 'San Francisco, CA',
    salaryMin: 150000,
    salaryMax: 220000,
    salaryCurrency: 'USD',
    seniority: 'Senior',
    description: 'We are looking for an experienced Frontend Engineer to join our team. You will be responsible for building user interfaces using React and TypeScript.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with state management (Redux, Context API)',
      'Knowledge of modern CSS and design systems'
    ],
    postedAt: '2024-08-15T10:00:00Z',
    lastActivityAt: '2024-08-20T14:30:00Z',
    applicationDeadline: '2024-10-15T23:59:59Z',
    tags: ['React', 'TypeScript', 'Frontend', 'UI/UX'],
    criteria: {
      minYears: 5,
      allowedCertGroupIds: ['frontend-certs']
    },
    applicationsCount: 2,
    privacyOptions: {
      hideCompany: false,
      hideSalary: false,
      requireVerification: true
    },
    applications: ['app-1', 'app-2'],
    responsibilities: [
      'Develop and maintain user interfaces using React and TypeScript',
      'Collaborate with designers to implement responsive and accessible UIs',
      'Optimize application for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote work options',
      'Professional development budget'
    ]
  },
  {
    id: 'job-2',
    title: 'Blockchain Developer',
    company: mockCompanies[1],
    status: 'Open',
    type: 'Full Time',
    workplace: 'Remote',
    location: 'Global',
    salaryMin: 180000,
    salaryMax: 250000,
    salaryCurrency: 'USD',
    seniority: 'Senior',
    description: 'Join our blockchain team to build decentralized applications with a focus on privacy and security.',
    requirements: [
      '3+ years of blockchain development',
      'Experience with Solidity and smart contracts',
      'Knowledge of zero-knowledge proofs',
      'Understanding of cryptographic principles'
    ],
    postedAt: '2024-08-20T09:15:00Z',
    lastActivityAt: '2024-08-25T11:20:00Z',
    applicationDeadline: '2024-10-20T23:59:59Z',
    tags: ['Blockchain', 'Solidity', 'Smart Contracts', 'ZKPs'],
    criteria: {
      minYears: 3,
      allowedCertGroupIds: ['blockchain-certs']
    },
    applicationsCount: 0,
    privacyOptions: {
      hideCompany: true,
      hideSalary: true,
      requireVerification: true
    },
    applications: [],
    responsibilities: [
      'Design and implement smart contracts using Solidity',
      'Develop and maintain blockchain infrastructure',
      'Research and implement privacy-preserving technologies',
      'Collaborate with the team on protocol design and implementation'
    ],
    benefits: [
      'Fully remote position',
      'Competitive salary and token allocation',
      'Flexible working hours',
      'Opportunity to work on cutting-edge blockchain technology'
    ]
  },
  {
    id: 'job-3',
    title: 'UX/UI Designer',
    company: mockCompanies[2],
    status: 'Open',
    type: 'Contract',
    workplace: 'Remote',
    location: 'Global',
    salaryMin: 100,
    salaryMax: 150,
    salaryCurrency: 'USD',
    seniority: 'Senior',
    description: 'We are looking for a talented UX/UI Designer to create amazing user experiences.',
    requirements: [
      '5+ years of experience in UX/UI design',
      'Strong portfolio of design projects',
      'Proficiency in design tools like Figma and Sketch',
      'Experience with design systems'
    ],
    postedAt: '2024-09-01T10:00:00Z',
    lastActivityAt: '2024-09-05T14:30:00Z',
    applicationDeadline: '2024-11-01T23:59:59Z',
    tags: ['UX Design', 'UI Design', 'Figma', 'Design Systems'],
    criteria: {
      minYears: 5,
      allowedCertGroupIds: ['design-certs']
    },
    applicationsCount: 12,
    privacyOptions: {
      hideCompany: false,
      hideSalary: false,
      requireVerification: true
    },
    applications: ['app-3', 'app-4', 'app-5'],
    responsibilities: [
      'Design and implement user interfaces for web and mobile applications',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and developers to implement designs',
      'Develop and maintain design systems and component libraries'
    ],
    benefits: [
      'Competitive hourly rate',
      'Remote work flexibility',
      'Opportunity to work with a talented team',
      'Exciting projects with real impact'
    ]
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    company: mockCompanies[3],
    status: 'Open',
    type: 'Full Time',
    workplace: 'Remote',
    location: 'Global',
    salaryMin: 140000,
    salaryMax: 200000,
    salaryCurrency: 'USD',
    seniority: 'Senior',
    description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure.',
    requirements: [
      'Experience with AWS, GCP, or Azure',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'CI/CD pipeline implementation',
      'Containerization and orchestration (Docker, Kubernetes)'
    ],
    postedAt: '2024-09-02T09:30:00Z',
    lastActivityAt: '2024-09-07T11:45:00Z',
    applicationDeadline: '2024-11-15T23:59:59Z',
    tags: ['DevOps', 'AWS', 'Kubernetes', 'Terraform'],
    criteria: {
      minYears: 4,
      allowedCertGroupIds: ['devops-certs']
    },
    applicationsCount: 5,
    privacyOptions: {
      hideCompany: false,
      hideSalary: true,
      requireVerification: true
    },
    applications: ['app-6', 'app-7'],
    responsibilities: [
      'Design and implement cloud infrastructure',
      'Automate deployment and scaling processes',
      'Monitor system performance and troubleshoot issues',
      'Implement security best practices'
    ],
    benefits: [
      'Competitive salary and benefits',
      'Fully remote position',
      'Professional development opportunities',
      'Flexible working hours'
    ]
  },
  {
    id: 'job-3',
    title: 'UX/UI Designer',
    company: mockCompanies[2],
    status: 'Open',
    type: 'Contract',
    workplace: 'Remote',
    location: 'Global',
    salaryMin: 100,
    salaryMax: 150,
    salaryCurrency: 'USD',
    seniority: 'Senior',
    description: 'We are looking for a talented UX/UI Designer to create amazing user experiences.',
    requirements: [
      '5+ years of experience in UX/UI design',
      'Strong portfolio of design projects',
      'Proficiency in design tools like Figma and Sketch',
      'Experience with design systems'
    ],
    postedAt: '2024-09-01T10:00:00Z',
    lastActivityAt: '2024-09-05T14:30:00Z',
    applicationDeadline: '2024-11-01T23:59:59Z',
    tags: ['UX Design', 'UI Design', 'Figma', 'Design Systems'],
    criteria: {
      minYears: 5,
      allowedCertGroupIds: ['design-certs']
    },
    applicationsCount: 12,
    privacyOptions: {
      hideCompany: false,
      hideSalary: false,
      requireVerification: true
    },
    applications: ['app-3', 'app-4', 'app-5'],
    responsibilities: [
      'Design and implement user interfaces for web and mobile applications',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and developers to implement designs',
      'Develop and maintain design systems and component libraries'
    ],
    benefits: [
      'Competitive hourly rate',
      'Remote work flexibility',
      'Opportunity to work with a talented team',
      'Exciting projects with real impact'
    ]
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    company: mockCompanies[3],
    status: 'Open',
    type: 'Full Time',
    workplace: 'Remote',
    location: 'Global',
    salaryMin: 140000,
    salaryMax: 170000,
    salaryCurrency: 'USD',
    seniority: 'Senior',
    postedAt: '2024-01-13T16:00:00Z',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
    criteria: {
      minYears: 4,
      allowedCertGroupIds: ['aws-certs', 'devops-certs'],
      cutoffTime: '2020-01-01T00:00:00Z'
    },
    applicationsCount: 15,
    lastActivityAt: '2024-01-16T13:45:00Z',
    description: 'Help us scale our deployment platform to serve millions of developers.',
    responsibilities: [
      'Manage cloud infrastructure',
      'Implement CI/CD pipelines',
      'Monitor system performance'
    ],
    benefits: ['Health insurance', 'Equity', 'Learning budget']
  }
]

// Mock attestations
export const mockAttestations: Attestation[] = [
  {
    id: 'att-1',
    type: 'cert',
    issuer: {
      id: 'aws',
      name: 'Amazon Web Services',
      logoUrl: '/logos/aws.png'
    },
    groupId: 'aws-certs',
    hash: 'hash_aws_sa_cert_123',
    createdAt: '2023-06-15T10:00:00Z',
    expiry: '2026-06-15T10:00:00Z',
    status: 'Valid',
    metadata: {
      label: 'AWS Solutions Architect',
      value: 'Professional'
    },
    merklePath: ['path1', 'path2', 'path3']
  },
  {
    id: 'att-2',
    type: 'experience',
    issuer: {
      id: 'previous-employer',
      name: 'Tech Corp',
      logoUrl: '/logos/techcorp.png'
    },
    groupId: 'experience-certs',
    hash: 'hash_experience_5years_456',
    createdAt: '2023-01-10T10:00:00Z',
    status: 'Valid',
    metadata: {
      label: 'Years of Experience',
      value: '5'
    },
    merklePath: ['exp1', 'exp2', 'exp3']
  },
  {
    id: 'att-3',
    type: 'education',
    issuer: {
      id: 'university',
      name: 'Stanford University',
      logoUrl: '/logos/stanford.png'
    },
    groupId: 'education-certs',
    hash: 'hash_cs_degree_789',
    createdAt: '2020-05-20T10:00:00Z',
    status: 'Valid',
    metadata: {
      label: 'Computer Science Degree',
      value: 'Bachelor of Science'
    },
    merklePath: ['edu1', 'edu2', 'edu3']
  }
]

// Mock applications
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    job: mockJobs[0],
    submittedAt: '2024-01-16T10:30:00Z',
    receiptTxHash: generateTxHash(),
    criteriaResults: [
      { label: 'Min 5 years experience', pass: true },
      { label: 'AWS or Frontend certification', pass: true },
      { label: 'Attestation not expired', pass: true }
    ],
    meetsAll: true,
    status: 'Verified'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    job: mockJobs[1],
    submittedAt: '2024-01-15T14:20:00Z',
    receiptTxHash: generateTxHash(),
    criteriaResults: [
      { label: 'Min 3 years experience', pass: true },
      { label: 'Backend or Cloud certification', pass: false },
      { label: 'Attestation not expired', pass: true }
    ],
    meetsAll: false,
    status: 'Verified'
  }
]

// Mock contact requests
export const mockContactRequests: ContactRequest[] = [
  {
    id: 'contact-1',
    jobId: 'job-1',
    job: mockJobs[0],
    fromEmployer: {
      id: 'emp-1',
      name: 'Figma Recruiting',
      logoUrl: '/logos/figma.png'
    },
    message: 'We would like to discuss the Senior Frontend Engineer position with you.',
    createdAt: '2024-01-16T15:00:00Z',
    updatedAt: '2024-01-16T15:00:00Z',
    expiresAt: '2024-01-23T15:00:00Z',
    status: 'Pending',
    channel: 'privInbox',
    ephemeralHandle: undefined
  },
  {
    id: 'contact-2',
    jobId: 'job-2',
    job: mockJobs[1],
    fromEmployer: {
      id: 'emp-2',
      name: 'Stripe Hiring',
      logoUrl: '/logos/stripe.png'
    },
    message: 'Your application for the Backend Engineer position looks promising.',
    createdAt: '2024-01-17T10:30:00Z',
    updatedAt: '2024-01-17T10:30:00Z',
    expiresAt: '2024-01-24T10:30:00Z',
    status: 'Pending',
    channel: 'email',
    ephemeralHandle: 'user-1234@privjob.app'
  }
]

// Mock applicants (employer view)
export const mockApplicants: Applicant[] = [
  {
    id: 'applicant-1',
    jobId: 'job-1',
    submittedAt: '2024-01-16T10:30:00Z',
    appliedAt: '2024-01-16T10:30:00Z',
    anonymousId: 'anon-123456',
    criteriaResults: [
      { label: 'Min 5 years experience', pass: true },
      { label: 'AWS or Frontend certification', pass: true },
      { label: 'Attestation not expired', pass: true }
    ],
    proofResults: [
      { criterion: 'experience', verified: true },
      { criterion: 'certification', verified: true },
      { criterion: 'attestation', verified: true }
    ],
    meetsAll: true,
    status: 'Received',
    verificationStatus: 'qualified',
    contactStatus: 'none',
    receiptTxHash: generateTxHash()
  },
  {
    id: 'applicant-2',
    jobId: 'job-1',
    submittedAt: '2024-01-16T11:15:00Z',
    appliedAt: '2024-01-16T11:15:00Z',
    anonymousId: 'anon-789012',
    criteriaResults: [
      { label: 'Min 5 years experience', pass: false },
      { label: 'AWS or Frontend certification', pass: true },
      { label: 'Attestation not expired', pass: true }
    ],
    proofResults: [
      { criterion: 'experience', verified: false },
      { criterion: 'certification', verified: true },
      { criterion: 'attestation', verified: true }
    ],
    meetsAll: false,
    status: 'Received',
    verificationStatus: 'partial',
    contactStatus: 'none',
    receiptTxHash: generateTxHash()
  },
  {
    id: 'applicant-3',
    jobId: 'job-1',
    submittedAt: '2024-01-16T12:45:00Z',
    appliedAt: '2024-01-16T12:45:00Z',
    anonymousId: 'anon-345678',
    criteriaResults: [
      { label: 'Min 5 years experience', pass: true },
      { label: 'AWS or Frontend certification', pass: true },
      { label: 'Attestation not expired', pass: true }
    ],
    proofResults: [
      { criterion: 'experience', verified: true },
      { criterion: 'certification', verified: true },
      { criterion: 'attestation', verified: true }
    ],
    meetsAll: true,
    status: 'ContactRequested',
    verificationStatus: 'qualified',
    contactStatus: 'requested',
    receiptTxHash: generateTxHash()
  }
]

// Helper functions to simulate API delays and errors
export const simulateNetworkDelay = (min = 200, max = 800) => {
  const delay = Math.random() * (max - min) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

export const simulateRandomError = (errorRate = 0.1) => {
  if (Math.random() < errorRate) {
    throw new Error('Network error - please try again')
  }
}
