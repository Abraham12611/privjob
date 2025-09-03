import { EmployerDashboardHeader } from '@/components/employer/dashboard/dashboard-header'
import { DashboardFilters } from '@/components/employer/dashboard/dashboard-filters'
import { mockApplications, mockJobs } from '@/mock/mockData'

export default function EmployerDashboardPage() {
  return (
    <div className="pj-space-y-8 pj-p-6">
      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-indigo-600 pj-to-purple-600 pj-text-white">
          <h1 className="pj-text-2xl pj-font-bold">Employer Dashboard</h1>
          <p className="pj-mt-1 pj-opacity-90">Manage job postings and review applications</p>
        </div>
        
        <div className="pj-p-6">
          <h2 className="pj-text-xl pj-font-semibold pj-mb-4">Recent Applications</h2>
          <div className="pj-space-y-4">
            {mockApplications.map((app) => {
              const job = mockJobs.find(j => j.id === app.jobId);
              return (
                <div key={app.id} className="pj-border pj-rounded-lg pj-p-4">
                  <div className="pj-flex pj-justify-between pj-items-start">
                    <div>
                      <h3 className="pj-text-lg pj-font-medium pj-text-gray-900">{app.candidate}</h3>
                      <p className="pj-mt-1 pj-text-gray-600">Applied for: {job?.title || 'Position'}</p>
                      <div className="pj-mt-2 pj-flex pj-items-center pj-space-x-2">
                        <span className={`pj-px-2 pj-py-1 pj-text-xs pj-rounded-full ${
                          app.status === 'In Review' ? 'pj-bg-yellow-100 pj-text-yellow-800' : 
                          app.status === 'Interview' ? 'pj-bg-blue-100 pj-text-blue-800' : 
                          'pj-bg-gray-100 pj-text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                        <span className="pj-text-xs pj-text-gray-500">Applied on {new Date(app.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="pj-flex pj-space-x-2">
                      <button className="pj-px-3 pj-py-1 pj-bg-indigo-600 pj-text-white pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-indigo-700">
                        View Profile
                      </button>
                      <button className="pj-px-3 pj-py-1 pj-bg-white pj-border pj-border-gray-300 pj-text-gray-700 pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-gray-50">
                        Message
                      </button>
                    </div>
                  </div>
                  
                  <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-200">
                    <h4 className="pj-text-sm pj-font-medium pj-text-gray-900 pj-mb-2">Verified Credentials:</h4>
                    <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-3">
                      {app.credentials.map((cred, i) => (
                        <div key={i} className="pj-flex pj-items-start pj-p-3 pj-bg-gray-50 pj-rounded-lg">
                          <div className="pj-mr-3 pj-mt-0.5">
                            {cred.verified ? (
                              <div className="pj-w-5 pj-h-5 pj-rounded-full pj-bg-green-100 pj-flex pj-items-center pj-justify-center">
                                <svg className="pj-w-3 pj-h-3 pj-text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : (
                              <div className="pj-w-5 pj-h-5 pj-rounded-full pj-bg-yellow-100 pj-flex pj-items-center pj-justify-center">
                                <svg className="pj-w-3 pj-h-3 pj-text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="pj-text-sm pj-font-medium pj-text-gray-900">{cred.title}</div>
                            <div className="pj-text-xs pj-text-gray-500 pj-capitalize">{cred.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-200 pj-flex pj-justify-between pj-items-center">
                    <div className="pj-flex pj-items-center pj-text-xs pj-text-gray-500">
                      <svg className="pj-w-4 pj-h-4 pj-mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10a1 1 0 01-1.64 0l-7-10A1 1 0 012 8V2a1 1 0 01.7-.954 1 1 0 01.3-.046h8z" clipRule="evenodd" />
                      </svg>
                      <span>ZK Proof: {app.zkProof}</span>
                    </div>
                    <div className="pj-flex pj-space-x-2">
                      <button className="pj-px-3 pj-py-1 pj-bg-green-600 pj-text-white pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-green-700">
                        Schedule Interview
                      </button>
                      <button className="pj-px-3 pj-py-1 pj-bg-red-600 pj-text-white pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-red-700">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white">
          <h2 className="pj-text-xl pj-font-semibold">Your Job Postings</h2>
        </div>
        <div className="pj-p-6">
          <div className="pj-grid pj-gap-4 md:pj-grid-cols-2 lg:pj-grid-cols-3">
            {mockJobs.map((job) => (
              <div key={job.id} className="pj-border pj-rounded-lg pj-p-4">
                <h3 className="pj-text-lg pj-font-medium pj-text-gray-900">{job.title}</h3>
                <p className="pj-mt-1 pj-text-gray-600">{job.company} • {job.location}</p>
                <p className="pj-mt-2 pj-text-sm pj-text-gray-700">{job.description.substring(0, 100)}...</p>
                <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-200 pj-flex pj-justify-between pj-items-center">
                  <span className="pj-text-sm pj-text-gray-500">{job.posted}</span>
                  <button className="pj-px-3 pj-py-1 pj-bg-indigo-600 pj-text-white pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-indigo-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
