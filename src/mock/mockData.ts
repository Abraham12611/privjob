export const mockJobs = [
  {
    id: '1',
    title: 'Senior Blockchain Developer',
    company: 'ZK Tech Solutions',
    location: 'Remote',
    salary: '$120,000 - $180,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for an experienced blockchain developer with expertise in zero-knowledge proofs and privacy-preserving technologies.',
    requirements: ['5+ years of blockchain development', 'Experience with zk-SNARKs/STARKs', 'Proficiency in Rust/Go'],
    verified: true,
    zkProof: 'zkp:0x9a8b7c6d5e4f3a2b1'
  },
  {
    id: '2',
    title: 'Privacy Engineer',
    company: 'SecureChain',
    location: 'San Francisco, CA',
    salary: '$150,000 - $200,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Join our team to build the next generation of privacy-preserving applications using zero-knowledge proofs.',
    requirements: ['3+ years of crypto/security experience', 'Knowledge of zk-Proof systems', 'Strong cryptography background'],
    verified: true,
    zkProof: 'zkp:0x1b2c3d4e5f6a7b8c'
  },
  {
    id: '3',
    title: 'Frontend Developer (ZK Applications)',
    company: 'PrivTech Labs',
    location: 'New York, NY',
    salary: '$110,000 - $160,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Build beautiful, user-friendly interfaces for our zero-knowledge proof based applications.',
    requirements: ['React/TypeScript experience', 'Understanding of web3.js/ethers.js', 'Interest in privacy tech'],
    verified: true,
    zkProof: 'zkp:0x9d8e7f6a5b4c3d2e'
  }
];

export const mockApplications = [
  {
    id: 'app1',
    jobId: '1',
    candidate: 'Alex Johnson',
    status: 'In Review',
    date: '2023-11-10',
    verified: true,
    credentials: [
      { type: 'education', title: 'MSc Computer Science', verified: true },
      { type: 'experience', title: 'Senior Developer at BlockCorp', verified: true },
      { type: 'certification', title: 'ZK Proof Specialist', verified: true }
    ],
    zkProof: 'zkp:0x1a2b3c4d5e6f7a8b'
  },
  {
    id: 'app2',
    jobId: '1',
    candidate: 'Taylor Smith',
    status: 'Interview',
    date: '2023-11-12',
    verified: true,
    credentials: [
      { type: 'education', title: 'BSc Mathematics', verified: true },
      { type: 'experience', title: 'Blockchain Developer', verified: true },
      { type: 'certification', title: 'Advanced Cryptography', verified: true }
    ],
    zkProof: 'zkp:0x2b3c4d5e6f7a8b9c'
  }
];

export const mockCredentials = [
  {
    id: 'cred1',
    type: 'education',
    title: 'MSc Computer Science',
    issuer: 'Stanford University',
    issueDate: '2020-05-15',
    verified: true,
    zkProof: 'zkp:0x3c4d5e6f7a8b9c1d'
  },
  {
    id: 'cred2',
    type: 'certification',
    title: 'ZK Proof Specialist',
    issuer: 'ZK University',
    issueDate: '2022-11-20',
    expiryDate: '2024-11-20',
    verified: true,
    zkProof: 'zkp:0x4d5e6f7a8b9c1d2e'
  },
  {
    id: 'cred3',
    type: 'experience',
    title: 'Senior Blockchain Developer',
    issuer: 'BlockCorp',
    issueDate: '2021-01-10',
    endDate: '2023-10-31',
    verified: true,
    zkProof: 'zkp:0x5e6f7a8b9c1d2e3f'
  }
];
