'use client'

import { useQuery } from '@tanstack/react-query'
import { JobsService } from '@/services/jobs-service'
import { JobCard } from '@/components/shared/job-card'

export function JobsGrid() {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => JobsService.getJobs(),
  })

  if (isLoading) {
    return (
      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 lg:pj-grid-cols-3 pj-gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="pj-card pj-p-6 pj-animate-pulse">
            <div className="pj-flex pj-items-center pj-space-x-3 pj-mb-4">
              <div className="pj-w-8 pj-h-8 pj-bg-gray-200 pj-rounded-full"></div>
              <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-flex-1"></div>
            </div>
            <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-mb-3"></div>
            <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-mb-4"></div>
            <div className="pj-flex pj-space-x-2 pj-mb-4">
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-16"></div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-20"></div>
            </div>
            <div className="pj-h-10 pj-bg-gray-200 pj-rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <p className="pj-text-pj-text-secondary pj-mb-4">
          We couldn't load jobs. Check your connection and try again.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="pj-btn pj-btn--ghost pj-px-4 pj-py-2"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!jobs?.length) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <p className="pj-text-pj-text-secondary pj-mb-4">
          No jobs match these filters.
        </p>
        <button className="pj-btn pj-btn--ghost pj-px-4 pj-py-2">
          Reset filters
        </button>
      </div>
    )
  }

  return (
    <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 lg:pj-grid-cols-3 pj-gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
