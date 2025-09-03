'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { Applicant } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/utils'
import { CheckCircle, XCircle, Clock, MessageSquare, Eye, Shield } from 'lucide-react'

interface ApplicantsListProps {
  jobId: string
  onSelect?: (applicant: Applicant) => void
  selectedId?: string
}

export function ApplicantsList({ jobId, onSelect, selectedId }: ApplicantsListProps) {
  const { data: applicants, isLoading, error } = useQuery({
    queryKey: ['job-applicants', jobId],
    queryFn: () => apiClient.getJobApplicants(jobId) as Promise<Applicant[]>,
  })

  if (isLoading) {
    return (
      <div className="pj-space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="pj-card pj-p-6 pj-animate-pulse">
            <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
              <div className="pj-flex pj-items-center pj-space-x-3">
                <div className="pj-w-10 pj-h-10 pj-bg-gray-200 pj-rounded-full"></div>
                <div>
                  <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-w-32 pj-mb-2"></div>
                  <div className="pj-h-3 pj-bg-gray-200 pj-rounded pj-w-24"></div>
                </div>
              </div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-20"></div>
            </div>
            <div className="pj-flex pj-space-x-2 pj-mb-4">
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-16"></div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-20"></div>
            </div>
            <div className="pj-flex pj-space-x-2">
              <div className="pj-h-8 pj-bg-gray-200 pj-rounded pj-w-24"></div>
              <div className="pj-h-8 pj-bg-gray-200 pj-rounded pj-w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Failed to load applicants
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

  if (!applicants?.length) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <Shield className="pj-w-12 pj-h-12 pj-text-pj-text-muted pj-mx-auto pj-mb-4" />
        <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
          No applications yet
        </h3>
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Qualified candidates will appear here once they submit zero-knowledge proofs
        </p>
        <a href="/jobs" className="pj-btn pj-btn--ghost pj-px-4 pj-py-2">
          View Public Job Listing
        </a>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'qualified':
        return <CheckCircle className="pj-w-4 pj-h-4 pj-text-green-600" />
      case 'partial':
        return <Clock className="pj-w-4 pj-h-4 pj-text-orange-600" />
      case 'rejected':
        return <XCircle className="pj-w-4 pj-h-4 pj-text-red-600" />
      default:
        return <Clock className="pj-w-4 pj-h-4 pj-text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified':
        return 'pj-bg-green-100 pj-text-green-800'
      case 'partial':
        return 'pj-bg-orange-100 pj-text-orange-800'
      case 'rejected':
        return 'pj-bg-red-100 pj-text-red-800'
      default:
        return 'pj-bg-gray-100 pj-text-gray-800'
    }
  }

  return (
    <div className="pj-space-y-4">
      {applicants.map((applicant) => (
        <article
          key={applicant.id}
          className={`pj-card pj-p-6 pj-cursor-pointer pj-transition-all pj-duration-[var(--pj-hover-duration)] ${
            selectedId === applicant.id ? 'pj-card--selected' : ''
          }`}
          onClick={() => onSelect?.(applicant)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect?.(applicant)
            }
          }}
        >
          {/* Header */}
          <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
            <div className="pj-flex pj-items-center pj-space-x-3">
              <Avatar className="pj-w-10 pj-h-10">
                <AvatarImage src={applicant.avatarUrl} alt="Anonymous applicant" />
                <AvatarFallback className="pj-bg-pj-action-blue pj-text-white">
                  {applicant.anonymousId.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="pj-flex pj-items-center pj-space-x-2">
                  <h3 className="pj-font-semibold pj-text-pj-text-primary">
                    Anonymous Candidate #{applicant.anonymousId}
                  </h3>
                  {getStatusIcon(applicant.verificationStatus)}
                </div>
                <p className="pj-text-pj-sm pj-text-pj-text-secondary">
                  Applied {formatRelativeTime(applicant.appliedAt)}
                </p>
              </div>
            </div>
            
            <span className={`pj-text-pj-xs pj-px-2 pj-py-1 pj-rounded-full pj-font-medium ${getStatusColor(applicant.verificationStatus)}`}>
              {applicant.verificationStatus === 'qualified' ? 'Fully Qualified' :
               applicant.verificationStatus === 'partial' ? 'Partial Match' :
               applicant.verificationStatus === 'rejected' ? 'Not Qualified' : 'Pending'}
            </span>
          </div>

          {/* Verification Results */}
          <div className="pj-mb-4">
            <h4 className="pj-text-pj-sm pj-font-medium pj-mb-2">Verification Results</h4>
            <div className="pj-flex pj-flex-wrap pj-gap-2">
              {(applicant.proofResults || []).map((result: { criterion: string; verified: boolean }, index: number) => (
                <span
                  key={index}
                  className={`pj-text-pj-xs pj-px-2 pj-py-1 pj-rounded pj-flex pj-items-center pj-space-x-1 ${
                    result.verified 
                      ? 'pj-bg-green-100 pj-text-green-800' 
                      : 'pj-bg-red-100 pj-text-red-800'
                  }`}
                >
                  {result.verified ? (
                    <CheckCircle className="pj-w-3 pj-h-3" />
                  ) : (
                    <XCircle className="pj-w-3 pj-h-3" />
                  )}
                  <span>{result.criterion}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="pj-p-3 pj-bg-blue-50 pj-border pj-border-blue-200 pj-rounded pj-mb-4">
            <div className="pj-flex pj-items-start pj-space-x-2">
              <Shield className="pj-w-4 pj-h-4 pj-text-blue-600 pj-mt-0.5 pj-flex-shrink-0" />
              <div>
                <p className="pj-text-pj-xs pj-text-blue-800 pj-font-medium pj-mb-1">
                  Privacy Protected
                </p>
                <p className="pj-text-pj-xs pj-text-blue-700">
                  Personal details are hidden until candidate accepts contact request. 
                  Only verification results are visible.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pj-flex pj-items-center pj-space-x-2">
            <Button
              size="sm"
              className="pj-btn pj-btn--primary pj-px-3 pj-py-2"
              onClick={(e) => {
                e.stopPropagation()
                // Handle contact request
              }}
              disabled={applicant.contactStatus === 'requested' || applicant.contactStatus === 'accepted'}
            >
              <MessageSquare className="pj-w-4 pj-h-4 pj-mr-1" />
              {applicant.contactStatus === 'none' ? 'Request Contact' :
               applicant.contactStatus === 'requested' ? 'Request Sent' :
               applicant.contactStatus === 'accepted' ? 'Contact Accepted' : 'Contact'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="pj-btn pj-btn--ghost pj-px-3 pj-py-2"
              onClick={(e) => {
                e.stopPropagation()
                // Handle view proofs
              }}
            >
              <Eye className="pj-w-4 pj-h-4 pj-mr-1" />
              View Proofs
            </Button>

            {applicant.contactStatus === 'accepted' && (
              <Button
                variant="ghost"
                size="sm"
                className="pj-btn pj-btn--ghost pj-px-3 pj-py-2"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle view profile
                }}
              >
                View Profile
              </Button>
            )}
          </div>

          {/* Contact Status */}
          {applicant.contactStatus !== 'none' && (
            <div className="pj-mt-3 pj-pt-3 pj-border-t pj-border-pj-border">
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                {applicant.contactStatus === 'requested' && 'Contact request sent. Waiting for candidate response.'}
                {applicant.contactStatus === 'accepted' && 'Contact request accepted. You can now view candidate details.'}
                {applicant.contactStatus === 'declined' && 'Contact request declined by candidate.'}
              </p>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
