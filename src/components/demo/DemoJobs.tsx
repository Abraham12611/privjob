import { Job } from '@/types';
import { mockJobs } from '@/services/mock-data';

export function DemoJobs() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <h1 className="pj-text-2xl pj-font-bold pj-mb-6">Available Jobs</h1>
      <div className="pj-grid pj-gap-6 md:pj-grid-cols-2 lg:pj-grid-cols-3">
        {mockJobs.map((job) => (
          <div key={job.id} className="pj-border pj-rounded-lg pj-p-6 pj-bg-white pj-shadow-sm">
            <div className="pj-flex pj-items-start pj-justify-between">
              <div>
                <h2 className="pj-text-lg pj-font-semibold pj-text-gray-900">{job.title}</h2>
                <p className="pj-text-gray-600">{job.company.name}</p>
                <p className="pj-text-sm pj-text-gray-500 pj-mt-1">
                  {job.location} • {job.type}
                </p>
              </div>
              {job.company.logoUrl && (
                <img
                  src={job.company.logoUrl}
                  alt={`${job.company.name} logo`}
                  className="pj-w-12 pj-h-12 pj-object-contain pj-rounded"
                />
              )}
            </div>
            
            <div className="pj-mt-4">
              <p className="pj-text-gray-700 pj-mb-3">{job.description}</p>
              
              <div className="pj-mt-4 pj-space-y-2">
                <div className="pj-flex pj-items-center pj-text-sm pj-text-gray-600">
                  <span className="pj-font-medium pj-w-32">Salary:</span>
                  <span>
                    {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} {job.salaryCurrency}/year
                  </span>
                </div>
                <div className="pj-flex pj-items-center pj-text-sm pj-text-gray-600">
                  <span className="pj-font-medium pj-w-32">Experience:</span>
                  <span>{job.seniority} Level</span>
                </div>
                <div className="pj-flex pj-items-center pj-text-sm pj-text-gray-600">
                  <span className="pj-font-medium pj-w-32">Workplace:</span>
                  <span className="pj-capitalize">{job.workplace.toLowerCase()}</span>
                </div>
              </div>
              
              <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-100">
                <h4 className="pj-text-sm pj-font-medium pj-text-gray-900 pj-mb-2">Requirements:</h4>
                <ul className="pj-list-disc pj-list-inside pj-text-sm pj-text-gray-700 pj-space-y-1">
                  {job.requirements?.slice(0, 3).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-100">
                <div className="pj-flex pj-flex-wrap pj-gap-2 pj-mb-4">
                  {job.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="pj-px-2 pj-py-1 pj-text-xs pj-rounded-full pj-bg-blue-100 pj-text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="pj-w-full pj-px-4 pj-py-2 pj-bg-blue-600 pj-text-white pj-rounded-md pj-font-medium hover:pj-bg-blue-700 pj-transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
