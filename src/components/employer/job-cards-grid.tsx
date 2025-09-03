'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { Job } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { Users, Eye, Settings, MoreHorizontal } from 'lucide-react'

interface JobCardsGridProps {
  onSelect?: (job: Job) => void
  selectedId?: string
}

export function JobCardsGrid({ onSelect, selectedId }: JobCardsGridProps) {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['employer-jobs'],
    queryFn: () => apiClient.getJobs() as Promise<Job[]>,
  })

  if (isLoading) {
    return (
      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 lg:pj-grid-cols-3 pj-gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="pj-card pj-p-6 pj-animate-pulse">
            <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-16"></div>
              <div className="pj-w-8 pj-h-8 pj-bg-gray-200 pj-rounded"></div>
            </div>
            <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-mb-3"></div>
            <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-mb-4 pj-w-2/3"></div>
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
          Failed to load your jobs
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="pj-btn pj-btn--ghost pj-px-4 pj-py-2"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!jobs?.length) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <Users className="pj-w-12 pj-h-12 pj-text-pj-text-muted pj-mx-auto pj-mb-4" />
        <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
          No jobs posted yet
        </h3>
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Create your first job posting to start receiving anonymous applications
        </p>
        <a href="/employer/jobs/new" className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
          Post Your First Job
        </a>
      </div>
    )
  }

  return (
    <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 lg:pj-grid-cols-3 pj-gap-6">
      {jobs.map((job) => (
        <article
          key={job.id}
          className={`pj-card pj-p-6 pj-cursor-pointer pj-transition-all pj-duration-[var(--pj-hover-duration)] ${
            selectedId === job.id ? 'pj-card--selected' : ''
          }`}
          onClick={() => onSelect?.(job)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect?.(job)
            }
          }}
        >
          {/* Header */}
          <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
            <span className={`pj-text-pj-xs pj-px-2 pj-py-1 pj-rounded-full pj-font-medium ${
              job.status === 'Open' 
                ? 'pj-bg-green-100 pj-text-green-800' 
                : 'pj-bg-gray-100 pj-text-gray-800'
            }`}>
              {job.status}
            </span>
            <button 
              className="pj-icon-btn pj-p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="pj-w-4 pj-h-4" />
            </button>
          </div>

          {/* Title */}
          <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2 pj-line-clamp-2">
            {job.title}
          </h3>
          
          <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-4">
            Posted {formatRelativeTime(job.postedAt)}
          </p>

          {/* Meta chips */}
          <div className="pj-flex pj-flex-wrap pj-gap-2 pj-mb-4">
            <span className="pj-meta-chip">{job.type}</span>
            <span className="pj-meta-chip">{job.seniority}</span>
            <span className="pj-meta-chip pj-meta-chip--green">
              {formatCurrency(job.salaryMin, job.salaryCurrency)}–{formatCurrency(job.salaryMax, job.salaryCurrency)}
            </span>
          </div>

          {/* Stats */}
          <div className="pj-flex pj-items-center pj-justify-between pj-text-pj-sm pj-text-pj-text-muted pj-mb-4">
            <div className="pj-flex pj-items-center">
              <Users className="pj-w-4 pj-h-4 pj-mr-1" />
              {job.applicationsCount} applicants
            </div>
            <span>
              Last activity {formatRelativeTime(job.lastActivityAt)}
            </span>
          </div>

          {/* Actions */}
          <div className="pj-flex pj-items-center pj-space-x-2">
            <Button
              size="sm"
              className="pj-btn pj-btn--primary pj-flex-1 pj-px-3 pj-py-2"
              onClick={(e) => {
                e.stopPropagation()
                window.open(`/employer/jobs/${job.id}/applicants`, '_blank')
              }}
            >
              <Users className="pj-w-4 pj-h-4 pj-mr-1" />
              View Applicants
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="pj-btn pj-btn--ghost pj-px-3 pj-py-2"
              onClick={(e) => {
                e.stopPropagation()
                window.open(`/jobs/${job.id}`, '_blank')
              }}
            >
              <Eye className="pj-w-4 pj-h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="pj-btn pj-btn--ghost pj-px-3 pj-py-2"
              onClick={(e) => {
                e.stopPropagation()
                window.open(`/employer/jobs/${job.id}`, '_blank')
              }}
            >
              <Settings className="pj-w-4 pj-h-4" />
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
