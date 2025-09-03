import { CheckCircle, Clock, XCircle, FileText, Shield } from 'lucide-react';

type ApplicationStatus = 'pending' | 'verified' | 'rejected' | 'in_review';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
  isVerified: boolean;
  verificationProof?: string;
}

const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'TechCorp',
    appliedDate: '2024-09-01',
    status: 'verified',
    isVerified: true,
    verificationProof: 'zkp:0x1234...5678',
  },
  {
    id: 'app-2',
    jobTitle: 'Full Stack Developer',
    company: 'WebSolutions',
    appliedDate: '2024-08-28',
    status: 'in_review',
    isVerified: true,
    verificationProof: 'zkp:0xabcd...ef01',
  },
  {
    id: 'app-3',
    jobTitle: 'UX/UI Designer',
    company: 'DesignHub',
    appliedDate: '2024-08-30',
    status: 'pending',
    isVerified: false,
  },
];

const statusIcons = {
  pending: <Clock className="pj-w-5 pj-h-5 pj-text-yellow-500" />,
  verified: <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-500" />,
  rejected: <XCircle className="pj-w-5 pj-h-5 pj-text-red-500" />,
  in_review: <FileText className="pj-w-5 pj-h-5 pj-text-blue-500" />,
};

const statusLabels = {
  pending: 'Pending',
  verified: 'Verified',
  rejected: 'Rejected',
  in_review: 'In Review',
};

export function DemoApplicationStatus() {
  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-p-6">
      <div className="pj-flex pj-items-center pj-justify-between pj-mb-6">
        <h2 className="pj-text-xl pj-font-semibold pj-text-gray-900">My Applications</h2>
        <div className="pj-flex pj-items-center pj-space-x-2 pj-text-sm pj-text-blue-600">
          <Shield className="pj-w-4 pj-h-4" />
          <span>Zero-Knowledge Verified</span>
        </div>
      </div>
      
      <div className="pj-space-y-4">
        {mockApplications.map((app) => (
          <div key={app.id} className="pj-border pj-rounded-lg pj-p-4 pj-bg-gray-50">
            <div className="pj-flex pj-items-start pj-justify-between">
              <div>
                <h3 className="pj-font-medium pj-text-gray-900">{app.jobTitle}</h3>
                <p className="pj-text-sm pj-text-gray-600">{app.company}</p>
                <p className="pj-text-xs pj-text-gray-500 pj-mt-1">
                  Applied on {new Date(app.appliedDate).toLocaleDateString()}
                </p>
              </div>
              
              <div className="pj-flex pj-flex-col pj-items-end pj-space-y-1">
                <div className="pj-flex pj-items-center pj-space-x-1">
                  {statusIcons[app.status]}
                  <span className="pj-text-sm pj-font-medium">{statusLabels[app.status]}</span>
                </div>
                {app.isVerified && (
                  <div className="pj-flex pj-items-center pj-space-x-1 pj-text-xs pj-text-green-600 pj-bg-green-50 pj-px-2 pj-py-0.5 pj-rounded-full">
                    <Shield className="pj-w-3 pj-h-3" />
                    <span>ZK Verified</span>
                  </div>
                )}
              </div>
            </div>
            
            {app.verificationProof && (
              <div className="pj-mt-3 pj-pt-3 pj-border-t pj-border-gray-200">
                <div className="pj-flex pj-justify-between pj-items-center">
                  <span className="pj-text-xs pj-text-gray-500 pj-font-mono pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">
                    {app.verificationProof}
                  </span>
                  <button className="pj-text-xs pj-text-blue-600 hover:pj-underline">
                    View Proof
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="pj-mt-6 pj-pt-4 pj-border-t pj-border-gray-200">
        <h3 className="pj-text-sm pj-font-medium pj-text-gray-900 pj-mb-2">Verification Status</h3>
        <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-4">
          <div className="pj-bg-blue-50 pj-p-3 pj-rounded-lg">
            <div className="pj-flex pj-items-center pj-space-x-2 pj-mb-1">
              <Shield className="pj-w-4 pj-h-4 pj-text-blue-600" />
              <span className="pj-text-xs pj-font-medium pj-text-blue-800">Identity</span>
            </div>
            <div className="pj-text-xs pj-text-gray-600">Verified with zero-knowledge proof</div>
          </div>
          <div className="pj-bg-green-50 pj-p-3 pj-rounded-lg">
            <div className="pj-flex pj-items-center pj-space-x-2 pj-mb-1">
              <CheckCircle className="pj-w-4 pj-h-4 pj-text-green-600" />
              <span className="pj-text-xs pj-font-medium pj-text-green-800">Experience</span>
            </div>
            <div className="pj-text-xs pj-text-gray-600">5+ years verified</div>
          </div>
          <div className="pj-bg-purple-50 pj-p-3 pj-rounded-lg">
            <div className="pj-flex pj-items-center pj-space-x-2 pj-mb-1">
              <FileText className="pj-w-4 pj-h-4 pj-text-purple-600" />
              <span className="pj-text-xs pj-font-medium pj-text-purple-800">Certifications</span>
            </div>
            <div className="pj-text-xs pj-text-gray-600">3 verified certifications</div>
          </div>
        </div>
      </div>
    </div>
  );
}
