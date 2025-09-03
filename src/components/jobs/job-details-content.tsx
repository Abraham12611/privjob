'use client'

import { Job } from '@/types'
import { Check, X } from 'lucide-react'

interface JobDetailsContentProps {
  job: Job
}

export function JobDetailsContent({ job }: JobDetailsContentProps) {
  return (
    <div className="pj-space-y-8">
      {/* Description */}
      <section>
        <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-4">About this role</h2>
        <div className="pj-prose pj-prose-pj pj-max-w-none">
          <p className="pj-text-pj-text-secondary pj-leading-relaxed">
            {job.description || 'No description provided for this position.'}
          </p>
        </div>
      </section>

      {/* Responsibilities */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <section>
          <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-4">What you'll do</h2>
          <ul className="pj-space-y-3">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="pj-flex pj-items-start pj-space-x-3">
                <Check className="pj-w-5 pj-h-5 pj-text-pj-chip-green pj-mt-0.5 pj-flex-shrink-0" />
                <span className="pj-text-pj-text-secondary">{responsibility}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Requirements */}
      <section>
        <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-4">Requirements</h2>
        <div className="pj-space-y-4">
          {job.criteria.minYears && (
            <div className="pj-flex pj-items-center pj-space-x-3">
              <Check className="pj-w-5 pj-h-5 pj-text-pj-chip-green" />
              <span className="pj-text-pj-text-secondary">
                Minimum {job.criteria.minYears} years of relevant experience
              </span>
            </div>
          )}
          
          {job.criteria.allowedCertGroupIds && job.criteria.allowedCertGroupIds.length > 0 && (
            <div className="pj-flex pj-items-center pj-space-x-3">
              <Check className="pj-w-5 pj-h-5 pj-text-pj-chip-green" />
              <span className="pj-text-pj-text-secondary">
                Valid certification from approved issuers required
              </span>
            </div>
          )}
          
          {job.criteria.cutoffTime && (
            <div className="pj-flex pj-items-center pj-space-x-3">
              <Check className="pj-w-5 pj-h-5 pj-text-pj-chip-green" />
              <span className="pj-text-pj-text-secondary">
                Experience must be from {new Date(job.criteria.cutoffTime).getFullYear()} or later
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <section>
          <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-4">What we offer</h2>
          <ul className="pj-space-y-3">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="pj-flex pj-items-start pj-space-x-3">
                <Check className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mt-0.5 pj-flex-shrink-0" />
                <span className="pj-text-pj-text-secondary">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Company Info */}
      <section>
        <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-4">About {job.company.name}</h2>
        <div className="pj-prose pj-prose-pj pj-max-w-none">
          <p className="pj-text-pj-text-secondary pj-leading-relaxed">
            {job.company.about || `${job.company.name} is a forward-thinking company committed to innovation and excellence.`}
          </p>
          {job.company.website && (
            <p className="pj-mt-4">
              <a 
                href={job.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-text-pj-action-blue hover:pj-underline"
              >
                Visit company website →
              </a>
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
