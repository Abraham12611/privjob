import { Shield, Plus, FileText, Check, X } from 'lucide-react';

interface Credential {
  id: string;
  type: string;
  title: string;
  issuer: string;
  status: 'verified' | 'pending' | 'expired';
}

const mockCredentials: Credential[] = [
  {
    id: '1',
    type: 'certification',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    status: 'verified',
  },
  {
    id: '2',
    type: 'education',
    title: 'MSc Computer Science',
    issuer: 'Stanford University',
    status: 'verified',
  },
  {
    id: '3',
    type: 'experience',
    title: 'Senior Software Engineer',
    issuer: 'TechCorp Inc.',
    status: 'verified',
  },
];

export function DemoCredentialManagement() {
  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-p-6">
      <div className="pj-flex pj-justify-between pj-items-center pj-mb-6">
        <div>
          <h2 className="pj-text-xl pj-font-semibold pj-text-gray-900">My Credentials</h2>
          <p className="pj-mt-1 pj-text-sm pj-text-gray-500">
            Manage your verified credentials and attestations
          </p>
        </div>
        <button className="pj-inline-flex pj-items-center pj-px-4 pj-py-2 pj-border pj-border-transparent pj-text-sm pj-font-medium pj-rounded-md pj-text-white pj-bg-indigo-600 hover:pj-bg-indigo-700">
          <Plus className="pj-w-4 pj-h-4 pj-mr-2" />
          Add Credential
        </button>
      </div>

      <div className="pj-space-y-4">
        {mockCredentials.map((cred) => (
          <div key={cred.id} className="pj-border pj-rounded-lg pj-p-4 pj-flex pj-justify-between pj-items-center">
            <div className="pj-flex pj-items-center">
              <div className="pj-p-2 pj-bg-indigo-100 pj-rounded-lg pj-mr-4">
                <FileText className="pj-w-5 pj-h-5 pj-text-indigo-600" />
              </div>
              <div>
                <h3 className="pj-text-sm pj-font-medium pj-text-gray-900">{cred.title}</h3>
                <p className="pj-text-sm pj-text-gray-500">{cred.issuer}</p>
              </div>
            </div>
            <div className="pj-flex pj-items-center">
              {cred.status === 'verified' ? (
                <span className="pj-inline-flex pj-items-center pj-px-2.5 pj-py-0.5 pj-rounded-full pj-text-xs pj-font-medium pj-bg-green-100 pj-text-green-800">
                  <Check className="pj-w-3 pj-h-3 pj-mr-1" />
                  Verified
                </span>
              ) : (
                <span className="pj-inline-flex pj-items-center pj-px-2.5 pj-py-0.5 pj-rounded-full pj-text-xs pj-font-medium pj-bg-yellow-100 pj-text-yellow-800">
                  <X className="pj-w-3 pj-h-3 pj-mr-1" />
                  Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pj-mt-8 pj-pt-6 pj-border-t pj-border-gray-200">
        <div className="pj-bg-blue-50 pj-p-4 pj-rounded-lg pj-flex pj-items-start">
          <div className="pj-mr-3 pj-mt-0.5">
            <Shield className="pj-w-5 pj-h-5 pj-text-blue-500" />
          </div>
          <div>
            <h3 className="pj-text-sm pj-font-medium pj-text-blue-800">Zero-Knowledge Verification</h3>
            <p className="pj-mt-1 pj-text-sm pj-text-blue-700">
              Your credentials are verified using zero-knowledge proofs, ensuring your privacy while allowing you to prove your qualifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
