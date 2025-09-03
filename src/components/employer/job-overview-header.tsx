'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { Job } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { Edit, MoreHorizontal, Users, Eye, Settings } from 'lucide-react'

interface JobOverviewHeaderProps {
  jobId: string
  onEdit?: () => void
}

export function JobOverviewHeader({ jobId, onEdit }: JobOverviewHeaderProps) {
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => apiClient.getJob(jobId) as Promise<Job>,
  })

  if (isLoading) {
    return (
      <div className="pj-border-b pj-border-pj-border pj-pb-6 pj-mb-6 pj-animate-pulse">
        <div className="pj-flex pj-items-start pj-justify-between pj-mb-4">
          <div className="pj-flex pj-items-center pj-space-x-4">
            <div className="pj-w-12 pj-h-12 pj-bg-gray-200 pj-rounded-full"></div>
            <div>
              <div className="pj-h-8 pj-bg-gray-200 pj-rounded pj-w-64 pj-mb-2"></div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-32"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="pj-border-b pj-border-pj-border pj-pb-6 pj-mb-6">
        <p className="pj-text-pj-text-secondary">Failed to load job details</p>
      </div>
    )
  }
  return (
    <div className="pj-border-b pj-border-pj-border pj-pb-6 pj-mb-6">
      <div className="pj-flex pj-items-start pj-justify-between pj-mb-4">
        <div className="pj-flex pj-items-center pj-space-x-4">
          <Avatar className="pj-w-12 pj-h-12">
            <AvatarImage src={job.company.logoUrl} alt={`${job.company.name} logo`} />
            <AvatarFallback className="pj-text-pj-lg">
              {job.company.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-1">
              {job.title}
            </h1>
            <p className="pj-text-pj-lg pj-text-pj-text-secondary">
              {job.company.name}
            </p>
          </div>
        </div>
        
        <div className="pj-flex pj-items-center pj-space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="pj-btn pj-btn--ghost pj-px-3 pj-py-2"
            onClick={onEdit}
          >
            <Edit className="pj-w-4 pj-h-4 pj-mr-1" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="pj-icon-btn">
            <MoreHorizontal className="pj-w-4 pj-h-4" />
          </Button>
        </div>
      </div>

      <div className="pj-flex pj-flex-wrap pj-gap-2 pj-mb-6">
        <span className={`pj-meta-chip ${
          job.status === 'Open' ? 'pj-meta-chip--green' : 'pj-meta-chip--gray'
        }`}>
          {job.status}
        </span>
        <span className="pj-meta-chip">{job.type}</span>
        <span className="pj-meta-chip">{job.seniority}</span>
        <span className="pj-meta-chip">{job.workplace}</span>
        <span className="pj-meta-chip pj-meta-chip--blue">
          {formatCurrency(job.salaryMin, job.salaryCurrency)}–{formatCurrency(job.salaryMax, job.salaryCurrency)}
        </span>
      </div>

      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-6 pj-mb-6">
        <div className="pj-text-center pj-p-4 pj-bg-gray-50 pj-rounded-pj-button">
          <div className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary">
            {job.applicationsCount}
          </div>
          <div className="pj-text-pj-sm pj-text-pj-text-secondary">Applications</div>
        </div>
        
        <div className="pj-text-center pj-p-4 pj-bg-gray-50 pj-rounded-pj-button">
          <div className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary">
            {Math.floor(job.applicationsCount * 0.7)}
          </div>
          <div className="pj-text-pj-sm pj-text-pj-text-secondary">Qualified</div>
        </div>
        
        <div className="pj-text-center pj-p-4 pj-bg-gray-50 pj-rounded-pj-button">
          <div className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary">
            {formatRelativeTime(job.postedAt)}
          </div>
          <div className="pj-text-pj-sm pj-text-pj-text-secondary">Posted</div>
        </div>
      </div>

      <div className="pj-flex pj-items-center pj-space-x-3">
        <Button 
          size="lg" 
          className="pj-btn pj-btn--primary pj-px-6 pj-py-3"
        >
          <Users className="pj-w-4 pj-h-4 pj-mr-2" />
          View Applicants
        </Button>
        
        <Button 
          variant="ghost" 
          size="lg" 
          className="pj-btn pj-btn--ghost pj-px-6 pj-py-3"
        >
          <Eye className="pj-w-4 pj-h-4 pj-mr-2" />
          Preview Job
        </Button>
        
        <Button 
          variant="ghost" 
          size="lg" 
          className="pj-btn pj-btn--ghost pj-px-6 pj-py-3"
        >
          <Settings className="pj-w-4 pj-h-4 pj-mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
