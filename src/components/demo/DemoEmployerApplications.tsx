import { CheckCircle, Clock, Shield, User, Mail, FileText } from 'lucide-react';

interface Application {
  id: string;
  candidateName: string;
  candidateTitle: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'interview' | 'hired' | 'rejected';
  isVerified: boolean;
  credentials: { type: string; title: string; verified: boolean }[];
}

const mockApplications: Application[] = [
  {
    id: 'app-001',
    candidateName: 'Alex Johnson',
    candidateTitle: 'Senior Frontend Developer',
    appliedDate: '2024-09-05T14:30:00Z',
    status: 'new',
    isVerified: true,
    credentials: [
      { type: 'experience', title: '5+ years in React', verified: true },
      { type: 'education', title: 'MSc Computer Science', verified: true },
    ],
  },
  {
    id: 'app-002',
    candidateName: 'Taylor Smith',
    candidateTitle: 'Full Stack Engineer',
    appliedDate: '2024-09-04T11:20:00Z',
    status: 'reviewed',
    isVerified: true,
    credentials: [
      { type: 'experience', title: '4+ years in Node.js', verified: true },
      { type: 'certification', title: 'Google Cloud Certified', verified: false },
    ],
  },
];

export function DemoEmployerApplications() {
  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-p-6">
      <h2 className="pj-text-xl pj-font-semibold pj-text-gray-900 pj-mb-6">Candidate Applications</h2>
      
      <div className="pj-space-y-4">
        {mockApplications.map((app) => (
          <div key={app.id} className="pj-border pj-rounded-lg pj-overflow-hidden">
            <div className="pj-p-4 pj-bg-gray-50 pj-border-b pj-border-gray-200">
              <div className="pj-flex pj-justify-between pj-items-start">
                <div className="pj-flex pj-space-x-4">
                  <div className="pj-flex-shrink-0 pj-h-12 pj-w-12 pj-rounded-full pj-bg-blue-100 pj-flex pj-items-center pj-justify-center pj-text-blue-600 pj-font-medium">
                    {app.candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="pj-flex pj-items-center pj-space-x-2">
                      <h3 className="pj-text-lg pj-font-medium pj-text-gray-900">
                        {app.candidateName}
                      </h3>
                      {app.isVerified && (
                        <span className="pj-inline-flex pj-items-center pj-px-2 pj-py-0.5 pj-rounded-full pj-text-xs pj-font-medium pj-bg-green-100 pj-text-green-800">
                          <Shield className="pj-w-3 pj-h-3 pj-mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="pj-text-sm pj-text-gray-600">{app.candidateTitle}</p>
                  </div>
                </div>
                <div className="pj-flex pj-space-x-2">
                  <button className="pj-p-1.5 pj-text-gray-400 hover:pj-text-gray-600 hover:pj-bg-gray-100 pj-rounded-full">
                    <FileText className="pj-w-5 pj-h-5" />
                  </button>
                  <button className="pj-p-1.5 pj-text-gray-400 hover:pj-text-gray-600 hover:pj-bg-gray-100 pj-rounded-full">
                    <Mail className="pj-w-5 pj-h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pj-p-4">
              <h4 className="pj-text-sm pj-font-medium pj-text-gray-900 pj-mb-2">Verified Credentials</h4>
              <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-3 pj-mb-4">
                {app.credentials.map((cred, idx) => (
                  <div key={idx} className="pj-flex pj-items-start pj-p-3 pj-bg-gray-50 pj-rounded-lg">
                    <div className={`pj-mr-3 pj-mt-0.5 pj-flex-shrink-0 pj-flex pj-items-center pj-justify-center pj-h-5 pj-w-5 pj-rounded-full ${cred.verified ? 'pj-bg-green-100 pj-text-green-500' : 'pj-bg-yellow-100 pj-text-yellow-500'}`}>
                      {cred.verified ? (
                        <CheckCircle className="pj-w-3.5 pj-h-3.5" />
                      ) : (
                        <Clock className="pj-w-3 pj-h-3" />
                      )}
                    </div>
                    <div>
                      <p className="pj-text-xs pj-font-medium pj-text-gray-500 pj-uppercase">
                        {cred.type}
                      </p>
                      <p className="pj-text-sm pj-font-medium pj-text-gray-900">
                        {cred.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pj-pt-4 pj-border-t pj-border-gray-200 pj-flex pj-justify-end pj-space-x-3">
                <button className="pj-px-4 pj-py-2 pj-border pj-border-gray-300 pj-text-sm pj-font-medium pj-rounded-md pj-text-gray-700 pj-bg-white hover:pj-bg-gray-50">
                  View Details
                </button>
                <button className="pj-px-4 pj-py-2 pj-border pj-border-transparent pj-text-sm pj-font-medium pj-rounded-md pj-text-white pj-bg-blue-600 hover:pj-bg-blue-700">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
