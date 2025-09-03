'use client'

import { Job } from '@/types'
import { Button } from '@/components/ui/button'
import { Shield, Eye, Clock, AlertCircle } from 'lucide-react'

interface JobDetailsAsideProps {
  job: Job
  onApply?: () => void
}

export function JobDetailsAside({ job, onApply }: JobDetailsAsideProps) {
  return (
    <div className="pj-space-y-6">
      {/* Apply Card */}
      <div className="pj-card pj-p-6">
        <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Apply privately</h3>
        <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-4">
          Prove you meet the requirements without revealing your identity or personal details.
        </p>
        <Button 
          size="lg" 
          className="pj-btn pj-btn--primary pj-w-full pj-mb-3"
          onClick={onApply}
        >
          Start Application
        </Button>
        <p className="pj-text-pj-xs pj-text-pj-text-muted pj-text-center">
          Takes 2-3 minutes • Your data never leaves your device
        </p>
      </div>

      {/* Privacy Info */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Shield className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-2" />
          <h3 className="pj-text-pj-lg pj-font-semibold">How privacy works</h3>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-flex pj-items-start pj-space-x-3">
            <Eye className="pj-w-4 pj-h-4 pj-text-pj-chip-green pj-mt-1 pj-flex-shrink-0" />
            <div>
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Public</p>
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Job criteria results (pass/fail), timestamp, proof verification
              </p>
            </div>
          </div>
          
          <div className="pj-flex pj-items-start pj-space-x-3">
            <Shield className="pj-w-4 pj-h-4 pj-text-pj-action-blue pj-mt-1 pj-flex-shrink-0" />
            <div>
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Private</p>
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Your identity, exact experience, certificates, personal data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Check */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Clock className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-mr-2" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Requirements</h3>
        </div>
        
        <div className="pj-space-y-3">
          {job.criteria.minYears && (
            <div className="pj-flex pj-items-center pj-justify-between">
              <span className="pj-text-pj-sm pj-text-pj-text-secondary">
                Min. experience
              </span>
              <span className="pj-text-pj-sm pj-font-medium">
                {job.criteria.minYears}+ years
              </span>
            </div>
          )}
          
          {job.criteria.allowedCertGroupIds && job.criteria.allowedCertGroupIds.length > 0 && (
            <div className="pj-flex pj-items-center pj-justify-between">
              <span className="pj-text-pj-sm pj-text-pj-text-secondary">
                Certification
              </span>
              <span className="pj-text-pj-sm pj-font-medium pj-text-pj-chip-green">
                Required
              </span>
            </div>
          )}
          
          {job.criteria.cutoffTime && (
            <div className="pj-flex pj-items-center pj-justify-between">
              <span className="pj-text-pj-sm pj-text-pj-text-secondary">
                Experience from
              </span>
              <span className="pj-text-pj-sm pj-font-medium">
                {new Date(job.criteria.cutoffTime).getFullYear()}+
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className="pj-card pj-p-4 pj-bg-orange-50 pj-border-orange-200">
        <div className="pj-flex pj-items-start pj-space-x-3">
          <AlertCircle className="pj-w-4 pj-h-4 pj-text-orange-600 pj-mt-0.5 pj-flex-shrink-0" />
          <div>
            <p className="pj-text-pj-sm pj-font-medium pj-text-orange-800">
              Demo Environment
            </p>
            <p className="pj-text-pj-xs pj-text-orange-700">
              This is a demonstration. No real applications will be submitted.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="pj-card pj-p-6">
        <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Job stats</h3>
        <div className="pj-space-y-3">
          <div className="pj-flex pj-items-center pj-justify-between">
            <span className="pj-text-pj-sm pj-text-pj-text-secondary">Applications</span>
            <span className="pj-text-pj-sm pj-font-medium">{job.applicationsCount}</span>
          </div>
          <div className="pj-flex pj-items-center pj-justify-between">
            <span className="pj-text-pj-sm pj-text-pj-text-secondary">Posted</span>
            <span className="pj-text-pj-sm pj-font-medium">
              {new Date(job.postedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="pj-flex pj-items-center pj-justify-between">
            <span className="pj-text-pj-sm pj-text-pj-text-secondary">Last activity</span>
            <span className="pj-text-pj-sm pj-font-medium">
              {new Date(job.lastActivityAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
