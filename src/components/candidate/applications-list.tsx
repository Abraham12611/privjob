'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { Application } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/utils'
import { Check, X, Clock, ExternalLink, FileText } from 'lucide-react'

interface ApplicationsListProps {
  onSelect?: (application: Application) => void
  selectedId?: string
}

export function ApplicationsList({ onSelect, selectedId }: ApplicationsListProps) {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: () => apiClient.getApplications() as Promise<Application[]>,
  })

  if (isLoading) {
    return (
      <div className="pj-space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="pj-card pj-p-6 pj-animate-pulse">
            <div className="pj-flex pj-items-center pj-space-x-4 pj-mb-4">
              <div className="pj-w-12 pj-h-12 pj-bg-gray-200 pj-rounded-full"></div>
              <div className="pj-flex-1">
                <div className="pj-h-5 pj-bg-gray-200 pj-rounded pj-mb-2"></div>
                <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-w-2/3"></div>
              </div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-20"></div>
            </div>
            <div className="pj-flex pj-space-x-2 pj-mb-4">
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-24"></div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-24"></div>
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
        <FileText className="pj-w-12 pj-h-12 pj-text-pj-error pj-mx-auto pj-mb-4" />
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Failed to load your applications
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

  if (!applications?.length) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <FileText className="pj-w-12 pj-h-12 pj-text-pj-text-muted pj-mx-auto pj-mb-4" />
        <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
          No applications yet
        </h3>
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Start applying to jobs privately to see your application history here
        </p>
        <a href="/jobs" className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
          Browse Jobs
        </a>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'pj-text-pj-chip-green'
      case 'Submitted':
        return 'pj-text-pj-action-blue'
      case 'Failed':
        return 'pj-text-pj-error'
      default:
        return 'pj-text-pj-text-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified':
        return <Check className="pj-w-4 pj-h-4 pj-text-pj-chip-green" />
      case 'Submitted':
        return <Clock className="pj-w-4 pj-h-4 pj-text-pj-action-blue" />
      case 'Failed':
        return <X className="pj-w-4 pj-h-4 pj-text-pj-error" />
      default:
        return <Clock className="pj-w-4 pj-h-4 pj-text-pj-text-muted" />
    }
  }

  return (
    <div className="pj-space-y-4">
      {applications.map((application) => (
        <article
          key={application.id}
          className={`pj-card pj-p-6 pj-cursor-pointer pj-transition-all pj-duration-[var(--pj-hover-duration)] ${
            selectedId === application.id ? 'pj-card--selected' : ''
          }`}
          onClick={() => onSelect?.(application)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect?.(application)
            }
          }}
        >
          {/* Header */}
          <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
            <div className="pj-flex pj-items-center pj-space-x-4">
              {application.job && (
                <>
                  <Avatar className="pj-w-12 pj-h-12">
                    <AvatarImage src={application.job.company.logoUrl} alt={`${application.job.company.name} logo`} />
                    <AvatarFallback className="pj-text-pj-sm">
                      {application.job.company.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary">
                      {application.job.title}
                    </h3>
                    <p className="pj-text-pj-sm pj-text-pj-text-secondary">
                      {application.job.company.name}
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="pj-flex pj-items-center pj-space-x-2">
              {getStatusIcon(application.status)}
              <span className={`pj-text-pj-sm pj-font-medium ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
          </div>

          {/* Criteria Results */}
          <div className="pj-mb-4">
            <p className="pj-text-pj-sm pj-text-pj-text-muted pj-mb-2">Requirements:</p>
            <div className="pj-flex pj-flex-wrap pj-gap-2">
              {application.criteriaResults.map((result, index) => (
                <div
                  key={index}
                  className={`pj-flex pj-items-center pj-space-x-1 pj-px-2 pj-py-1 pj-rounded-full pj-text-pj-xs ${
                    result.pass 
                      ? 'pj-bg-green-100 pj-text-green-800' 
                      : 'pj-bg-red-100 pj-text-red-800'
                  }`}
                >
                  {result.pass ? (
                    <Check className="pj-w-3 pj-h-3" />
                  ) : (
                    <X className="pj-w-3 pj-h-3" />
                  )}
                  <span>{result.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pj-flex pj-items-center pj-justify-between">
            <div className="pj-text-pj-xs pj-text-pj-text-muted">
              <p>Applied {formatRelativeTime(application.submittedAt)}</p>
              {application.meetsAll ? (
                <p className="pj-text-pj-chip-green pj-font-medium">✓ All requirements met</p>
              ) : (
                <p className="pj-text-orange-600 pj-font-medium">⚠ Partial match</p>
              )}
            </div>
            
            <div className="pj-flex pj-items-center pj-space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="pj-btn pj-btn--ghost pj-px-3 pj-py-1 pj-text-pj-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`/receipt/${application.receiptTxHash}`, '_blank')
                }}
              >
                <ExternalLink className="pj-w-3 pj-h-3 pj-mr-1" />
                Receipt
              </Button>
              
              {application.job && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="pj-btn pj-btn--ghost pj-px-3 pj-py-1 pj-text-pj-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`/jobs/${application.job!.id}`, '_blank')
                  }}
                >
                  View Job
                </Button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
