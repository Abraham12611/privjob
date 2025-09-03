'use client'

import Link from 'next/link'
import { Job } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { MapPin, Clock, Users } from 'lucide-react'

interface JobCardProps {
  job: Job
  selected?: boolean
  onSelect?: () => void
}

export function JobCard({ job, selected = false, onSelect }: JobCardProps) {
  return (
    <article 
      className={`pj-card pj-p-6 pj-cursor-pointer pj-transition-all pj-duration-[var(--pj-hover-duration)] ${
        selected ? 'pj-card--selected' : ''
      }`}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.()
        }
      }}
    >
      {/* Header */}
      <div className="pj-flex pj-items-center pj-space-x-3 pj-mb-4">
        <Avatar className="pj-w-8 pj-h-8">
          <AvatarImage src={job.company.logoUrl} alt={`${job.company.name} logo`} />
          <AvatarFallback className="pj-text-pj-xs">
            {job.company.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="pj-flex-1">
          <p className="pj-text-pj-sm pj-text-pj-text-secondary">{job.company.name}</p>
          {job.type === 'Freelance' && (
            <span className="pj-meta-chip pj-meta-chip--yellow pj-text-pj-xs">Freelance</span>
          )}
        </div>
        <div className="pj-flex pj-items-center pj-text-pj-xs pj-text-pj-text-muted">
          <Clock className="pj-w-3 pj-h-3 pj-mr-1" />
          {formatRelativeTime(job.postedAt)}
        </div>
      </div>

      {/* Title */}
      <h3 className={`pj-text-pj-lg pj-font-semibold pj-mb-3 pj-line-clamp-2 ${
        selected ? 'pj-title-gradient' : 'pj-text-pj-text-primary'
      }`}>
        {job.title}
      </h3>

      {/* Meta chips */}
      <div className="pj-flex pj-flex-wrap pj-gap-2 pj-mb-4">
        <span className="pj-meta-chip">{job.type}</span>
        <span className="pj-meta-chip pj-flex pj-items-center">
          <MapPin className="pj-w-3 pj-h-3 pj-mr-1" />
          {job.workplace}
        </span>
        <span className="pj-meta-chip">
          {formatCurrency(job.salaryMin, job.salaryCurrency)}–{formatCurrency(job.salaryMax, job.salaryCurrency)}
        </span>
      </div>

      {/* Criteria preview */}
      {job.criteria && (
        <div className="pj-mb-4">
          <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mb-2">Requirements:</p>
          <div className="pj-flex pj-flex-wrap pj-gap-1">
            {job.criteria.minYears && (
              <span className="pj-text-pj-xs pj-text-pj-text-secondary">≥{job.criteria.minYears}y exp</span>
            )}
            {job.criteria.allowedCertGroupIds?.length && (
              <span className="pj-text-pj-xs pj-text-pj-text-secondary">• Certification req'd</span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pj-flex pj-items-center pj-justify-between">
        <div className="pj-flex pj-items-center pj-text-pj-xs pj-text-pj-text-muted">
          <Users className="pj-w-3 pj-h-3 pj-mr-1" />
          {job.applicationsCount} applicants
        </div>
        
        <Link href={`/jobs/${job.id}`}>
          <Button 
            size="sm" 
            className="pj-btn pj-btn--primary pj-px-4 pj-py-2"
            onClick={(e) => e.stopPropagation()}
          >
            Apply Privately
          </Button>
        </Link>
      </div>
    </article>
  )
}
