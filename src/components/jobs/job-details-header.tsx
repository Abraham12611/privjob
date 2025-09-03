'use client'

import { Job } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { MapPin, Clock, Users, Share, Bookmark } from 'lucide-react'

interface JobDetailsHeaderProps {
  job: Job
  onApply?: () => void
}

export function JobDetailsHeader({ job, onApply }: JobDetailsHeaderProps) {
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
          <Button variant="ghost" size="sm" className="pj-icon-btn">
            <Bookmark className="pj-w-4 pj-h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="pj-icon-btn">
            <Share className="pj-w-4 pj-h-4" />
          </Button>
        </div>
      </div>

      <div className="pj-flex pj-flex-wrap pj-items-center pj-gap-4 pj-mb-6">
        <div className="pj-flex pj-items-center pj-text-pj-sm pj-text-pj-text-secondary">
          <MapPin className="pj-w-4 pj-h-4 pj-mr-1" />
          {job.workplace} • {job.location}
        </div>
        <div className="pj-flex pj-items-center pj-text-pj-sm pj-text-pj-text-secondary">
          <Clock className="pj-w-4 pj-h-4 pj-mr-1" />
          Posted {formatRelativeTime(job.postedAt)}
        </div>
        <div className="pj-flex pj-items-center pj-text-pj-sm pj-text-pj-text-secondary">
          <Users className="pj-w-4 pj-h-4 pj-mr-1" />
          {job.applicationsCount} applicants
        </div>
      </div>

      <div className="pj-flex pj-flex-wrap pj-gap-2 pj-mb-6">
        <span className="pj-meta-chip">{job.type}</span>
        <span className="pj-meta-chip">{job.seniority}</span>
        <span className="pj-meta-chip pj-meta-chip--green">
          {formatCurrency(job.salaryMin, job.salaryCurrency)}–{formatCurrency(job.salaryMax, job.salaryCurrency)}
        </span>
        {job.tags.map((tag) => (
          <span key={tag} className="pj-meta-chip pj-meta-chip--blue">
            {tag}
          </span>
        ))}
      </div>

      <div className="pj-flex pj-items-center pj-justify-between">
        <div className="pj-flex pj-items-center pj-space-x-4">
          <Button 
            size="lg" 
            className="pj-btn pj-btn--primary pj-px-6 pj-py-3"
            onClick={onApply}
          >
            Apply Privately
          </Button>
          <span className="pj-text-pj-sm pj-text-pj-text-muted">
            Your identity stays private until you choose to reveal it
          </span>
        </div>
        
        <div className="pj-text-right">
          <div className="pj-text-pj-sm pj-text-pj-text-muted">Status</div>
          <div className={`pj-text-pj-sm pj-font-medium ${
            job.status === 'Open' ? 'pj-text-pj-chip-green' : 'pj-text-pj-text-muted'
          }`}>
            {job.status}
          </div>
        </div>
      </div>
    </div>
  )
}
