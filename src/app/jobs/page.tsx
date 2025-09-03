import { JobsHeader } from '@/components/jobs/jobs-header'
import { JobsFilters } from '@/components/jobs/jobs-filters'
import { JobsGrid } from '@/components/jobs/jobs-grid'
import { mockJobs } from '@/mock/mockData'

export default function JobsPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <JobsHeader />
      <div className="pj-sticky pj-top-0 pj-z-10 pj-bg-pj-page-bg pj-py-4">
        <JobsFilters />
      </div>
      <div className="pj-mt-6 pj-space-y-6">
        {mockJobs.map((job) => (
          <div key={job.id} className="pj-border pj-rounded-lg pj-p-6 pj-shadow-sm hover:pj-shadow-md pj-transition-shadow">
            <div className="pj-flex pj-justify-between pj-items-start">
              <div>
                <h3 className="pj-text-xl pj-font-semibold pj-text-gray-900">{job.title}</h3>
                <p className="pj-mt-1 pj-text-gray-600">{job.company} • {job.location}</p>
                <div className="pj-mt-2 pj-flex pj-items-center pj-space-x-2">
                  <span className="pj-px-2 pj-py-1 pj-text-xs pj-rounded-full pj-bg-green-100 pj-text-green-800">
                    {job.type}
                  </span>
                  {job.verified && (
                    <span className="pj-px-2 pj-py-1 pj-text-xs pj-rounded-full pj-bg-blue-100 pj-text-blue-800 pj-flex pj-items-center">
                      <svg className="pj-w-3 pj-h-3 pj-mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      ZK Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="pj-text-right">
                <p className="pj-text-lg pj-font-semibold pj-text-gray-900">{job.salary}</p>
                <p className="pj-text-sm pj-text-gray-500">{job.posted}</p>
              </div>
            </div>
            <p className="pj-mt-4 pj-text-gray-700">{job.description}</p>
            <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-200">
              <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">Requirements:</h4>
              <ul className="pj-mt-2 pj-space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i} className="pj-flex pj-items-center">
                    <svg className="pj-w-4 pj-h-4 pj-mr-2 pj-text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="pj-text-sm pj-text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pj-mt-6 pj-pt-4 pj-border-t pj-border-gray-200 pj-flex pj-justify-between pj-items-center">
              <div className="pj-flex pj-items-center pj-text-sm pj-text-gray-500">
                <svg className="pj-w-4 pj-h-4 pj-mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10a1 1 0 01-1.64 0l-7-10A1 1 0 012 8V2a1 1 0 01.7-.954 1 1 0 01.3-.046h8z" clipRule="evenodd" />
                </svg>
                <span>Zero-Knowledge Proof: {job.zkProof}</span>
              </div>
              <button className="pj-px-4 pj-py-2 pj-bg-indigo-600 pj-text-white pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-indigo-700 focus:pj-outline-none focus:pj-ring-2 focus:pj-ring-offset-2 focus:pj-ring-indigo-500">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
