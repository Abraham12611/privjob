import { Shield, Plus, FileText, GraduationCap, Briefcase, Check, X } from 'lucide-react';

interface Credential {
  id: string;
  type: 'education' | 'experience' | 'certification';
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  isVerified: boolean;
  proofId?: string;
  status: 'verified' | 'pending' | 'expired' | 'rejected';
}

const mockCredentials: Credential[] = [
  {
    id: 'cred-1',
    type: 'certification',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2023-05-15',
    expiryDate: '2026-05-15',
    isVerified: true,
    proofId: 'zkp:0x9a8b...7c6d',
    status: 'verified',
  },
  {
    id: 'cred-2',
    type: 'education',
    title: 'Master of Computer Science',
    issuer: 'Stanford University',
    issueDate: '2020-06-10',
    isVerified: true,
    proofId: 'zkp:0x1a2b...3c4d',
    status: 'verified',
  },
  {
    id: 'cred-3',
    type: 'experience',
    title: 'Senior Software Engineer',
    issuer: 'TechCorp Inc.',
    issueDate: '2021-01-15',
    expiryDate: '2023-12-31',
    isVerified: true,
    proofId: 'zkp:0x5e6f...7g8h',
    status: 'verified',
  },
  {
    id: 'cred-4',
    type: 'certification',
    title: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    issueDate: '2023-02-20',
    expiryDate: '2025-02-20',
    isVerified: false,
    status: 'pending',
  },
];

const CredentialTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'education':
      return <GraduationCap className="pj-w-5 pj-h-5 pj-text-blue-500" />;
    case 'experience':
      return <Briefcase className="pj-w-5 pj-h-5 pj-text-green-500" />;
    case 'certification':
      return <FileText className="pj-w-5 pj-h-5 pj-text-purple-500" />;
    default:
      return <FileText className="pj-w-5 pj-h-5 pj-text-gray-500" />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    verified: {
      bg: 'pj-bg-green-50',
      text: 'pj-text-green-800',
      icon: <Check className="pj-w-3 pj-h-3 pj-text-green-500" />,
      label: 'Verified',
    },
    pending: {
      bg: 'pj-bg-yellow-50',
      text: 'pj-text-yellow-800',
      icon: <Clock className="pj-w-3 pj-h-3 pj-text-yellow-500" />,
      label: 'Pending',
    },
    expired: {
      bg: 'pj-bg-red-50',
      text: 'pj-text-red-800',
      icon: <X className="pj-w-3 pj-h-3 pj-text-red-500" />,
      label: 'Expired',
    },
    rejected: {
      bg: 'pj-bg-red-50',
      text: 'pj-text-red-800',
      icon: <X className="pj-w-3 pj-h-3 pj-text-red-500" />,
      label: 'Rejected',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div className={`${config.bg} ${config.text} pj-inline-flex pj-items-center pj-px-2 pj-py-0.5 pj-rounded-full pj-text-xs pj-font-medium`}>
      {config.icon}
      <span className="pj-ml-1">{config.label}</span>
    </div>
  );
};

export function DemoCredentials() {
  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-p-6">
      <div className="pj-flex pj-justify-between pj-items-center pj-mb-6">
        <h2 className="pj-text-xl pj-font-semibold pj-text-gray-900">My Credentials</h2>
        <button className="pj-flex pj-items-center pj-space-x-1 pj-px-3 pj-py-1.5 pj-bg-blue-600 pj-text-white pj-text-sm pj-rounded-md hover:pj-bg-blue-700 pj-transition-colors">
          <Plus className="pj-w-4 pj-h-4" />
          <span>Add Credential</span>
        </button>
      </div>

      <div className="pj-grid pj-gap-4 md:pj-grid-cols-2">
        {mockCredentials.map((cred) => (
          <div key={cred.id} className="pj-border pj-rounded-lg pj-p-4 pj-bg-gray-50">
            <div className="pj-flex pj-justify-between pj-items-start pj-mb-2">
              <div className="pj-flex pj-items-start pj-space-x-3">
                <div className="pj-p-2 pj-bg-blue-50 pj-rounded-lg pj-mt-0.5">
                  <CredentialTypeIcon type={cred.type} />
                </div>
                <div>
                  <h3 className="pj-font-medium pj-text-gray-900">{cred.title}</h3>
                  <p className="pj-text-sm pj-text-gray-600">{cred.issuer}</p>
                </div>
              </div>
              <StatusBadge status={cred.status} />
            </div>

            <div className="pj-mt-3 pj-pt-3 pj-border-t pj-border-gray-200 pj-text-sm">
              <div className="pj-grid pj-grid-cols-2 pj-gap-2 pj-mb-3">
                <div>
                  <p className="pj-text-xs pj-text-gray-500">Issued</p>
                  <p>{new Date(cred.issueDate).toLocaleDateString()}</p>
                </div>
                {cred.expiryDate && (
                  <div>
                    <p className="pj-text-xs pj-text-gray-500">
                      {cred.status === 'expired' ? 'Expired' : 'Expires'}
                    </p>
                    <p>{new Date(cred.expiryDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {cred.isVerified && cred.proofId && (
                <div className="pj-mt-2 pj-pt-2 pj-border-t pj-border-gray-200">
                  <div className="pj-flex pj-justify-between pj-items-center">
                    <div className="pj-flex pj-items-center pj-space-x-1">
                      <Shield className="pj-w-4 pj-h-4 pj-text-green-500" />
                      <span className="pj-text-xs pj-text-gray-500">Zero-Knowledge Proof</span>
                    </div>
                    <span className="pj-text-xs pj-font-mono pj-text-gray-600 pj-bg-gray-100 pj-px-2 pj-py-0.5 pj-rounded">
                      {cred.proofId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pj-mt-8 pj-pt-6 pj-border-t pj-border-gray-200">
        <h3 className="pj-text-lg pj-font-medium pj-text-gray-900 pj-mb-4">Verification Status</h3>
        <div className="pj-bg-blue-50 pj-p-4 pj-rounded-lg">
          <div className="pj-flex pj-items-start">
            <div className="pj-flex-shrink-0">
              <Shield className="pj-w-5 pj-h-5 pj-text-blue-500" />
            </div>
            <div className="pj-ml-3">
              <h4 className="pj-text-sm pj-font-medium pj-text-blue-800">Zero-Knowledge Verification</h4>
              <p className="pj-text-sm pj-text-blue-700 pj-mt-1">
                Your credentials are verified using zero-knowledge proofs, ensuring your privacy while allowing you to prove your qualifications.
              </p>
              <div className="pj-mt-3">
                <button className="pj-text-sm pj-font-medium pj-text-blue-600 hover:pj-underline">
                  Learn more about verification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
