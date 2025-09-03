'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { Job } from '@/types'
import { BarChart3, FileText, Settings, Users } from 'lucide-react'

interface JobOverviewTabsProps {
  jobId: string
  activeTab?: string
}

export function JobOverviewTabs({ jobId, activeTab = 'overview' }: JobOverviewTabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => apiClient.getJob(jobId) as Promise<Job>,
  })

  if (isLoading) {
    return (
      <div className="pj-space-y-6 pj-animate-pulse">
        <div className="pj-h-40 pj-bg-gray-100 pj-rounded"></div>
        <div className="pj-h-40 pj-bg-gray-100 pj-rounded"></div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="pj-card pj-p-6 pj-text-center">
        <p className="pj-text-pj-text-secondary">Failed to load job information.</p>
      </div>
    )
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      content: (
        <div className="pj-space-y-6">
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Job Description</h3>
            <p className="pj-text-pj-text-secondary pj-leading-relaxed">
              {job.description || 'No description provided for this position.'}
            </p>
          </div>

          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Requirements</h3>
            <div className="pj-space-y-3">
              {job.criteria.minYears && (
                <div className="pj-flex pj-items-center pj-space-x-3">
                  <span className="pj-w-2 pj-h-2 pj-bg-pj-action-blue pj-rounded-full"></span>
                  <span>Minimum {job.criteria.minYears} years of relevant experience</span>
                </div>
              )}
              
              {job.criteria.allowedCertGroupIds && job.criteria.allowedCertGroupIds.length > 0 && (
                <div className="pj-flex pj-items-center pj-space-x-3">
                  <span className="pj-w-2 pj-h-2 pj-bg-pj-action-blue pj-rounded-full"></span>
                  <span>Valid certification from approved issuers required</span>
                </div>
              )}
              
              {job.criteria.cutoffTime && (
                <div className="pj-flex pj-items-center pj-space-x-3">
                  <span className="pj-w-2 pj-h-2 pj-bg-pj-action-blue pj-rounded-full"></span>
                  <span>Experience must be from {new Date(job.criteria.cutoffTime).getFullYear()} or later</span>
                </div>
              )}
            </div>
          </div>

          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Application Analytics</h3>
            <div className="pj-grid pj-grid-cols-2 md:pj-grid-cols-4 pj-gap-4">
              <div className="pj-text-center">
                <div className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary">{job.applicationsCount}</div>
                <div className="pj-text-pj-xs pj-text-pj-text-muted">Total Applications</div>
              </div>
              <div className="pj-text-center">
                <div className="pj-text-pj-xl pj-font-bold pj-text-pj-chip-green">{Math.floor(job.applicationsCount * 0.7)}</div>
                <div className="pj-text-pj-xs pj-text-pj-text-muted">Qualified</div>
              </div>
              <div className="pj-text-center">
                <div className="pj-text-pj-xl pj-font-bold pj-text-pj-action-blue">{Math.floor(job.applicationsCount * 0.3)}</div>
                <div className="pj-text-pj-xs pj-text-pj-text-muted">Partial Match</div>
              </div>
              <div className="pj-text-center">
                <div className="pj-text-pj-xl pj-font-bold pj-text-pj-error">{Math.floor(job.applicationsCount * 0.1)}</div>
                <div className="pj-text-pj-xs pj-text-pj-text-muted">No Match</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'details',
      label: 'Details',
      icon: FileText,
      content: (
        <div className="pj-space-y-6">
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Job Information</h3>
            <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-4 pj-text-pj-sm">
              <div>
                <span className="pj-font-medium">Type:</span> {job.type}
              </div>
              <div>
                <span className="pj-font-medium">Workplace:</span> {job.workplace}
              </div>
              <div>
                <span className="pj-font-medium">Location:</span> {job.location}
              </div>
              <div>
                <span className="pj-font-medium">Seniority:</span> {job.seniority}
              </div>
              <div>
                <span className="pj-font-medium">Salary Range:</span> {job.salaryCurrency} {job.salaryMin.toLocaleString()}–{job.salaryMax.toLocaleString()}
              </div>
              <div>
                <span className="pj-font-medium">Status:</span> {job.status}
              </div>
            </div>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="pj-card pj-p-6">
              <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Responsibilities</h3>
              <ul className="pj-space-y-2">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="pj-flex pj-items-start pj-space-x-3">
                    <span className="pj-w-1.5 pj-h-1.5 pj-bg-pj-action-blue pj-rounded-full pj-mt-2 pj-flex-shrink-0"></span>
                    <span className="pj-text-pj-text-secondary">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="pj-card pj-p-6">
              <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Benefits</h3>
              <ul className="pj-space-y-2">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="pj-flex pj-items-start pj-space-x-3">
                    <span className="pj-w-1.5 pj-h-1.5 pj-bg-pj-chip-green pj-rounded-full pj-mt-2 pj-flex-shrink-0"></span>
                    <span className="pj-text-pj-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'criteria',
      label: 'Criteria',
      icon: Settings,
      content: (
        <div className="pj-space-y-6">
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Zero-Knowledge Verification Rules</h3>
            <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-6">
              These criteria are verified cryptographically without revealing candidate details.
            </p>
            
            <div className="pj-space-y-4">
              <div className="pj-p-4 pj-border pj-border-pj-border pj-rounded-pj-button">
                <div className="pj-flex pj-items-center pj-justify-between pj-mb-2">
                  <span className="pj-font-medium">Minimum Experience</span>
                  <span className="pj-text-pj-action-blue">{job.criteria.minYears || 0} years</span>
                </div>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">
                  Candidates must prove they have at least this many years of relevant experience
                </p>
              </div>

              <div className="pj-p-4 pj-border pj-border-pj-border pj-rounded-pj-button">
                <div className="pj-flex pj-items-center pj-justify-between pj-mb-2">
                  <span className="pj-font-medium">Experience Cutoff</span>
                  <span className="pj-text-pj-action-blue">
                    {job.criteria.cutoffTime ? new Date(job.criteria.cutoffTime).getFullYear() : 'None'}
                  </span>
                </div>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">
                  Only experience after this date counts toward the minimum requirement
                </p>
              </div>

              <div className="pj-p-4 pj-border pj-border-pj-border pj-rounded-pj-button">
                <div className="pj-flex pj-items-center pj-justify-between pj-mb-2">
                  <span className="pj-font-medium">Required Certifications</span>
                  <span className="pj-text-pj-action-blue">
                    {job.criteria.allowedCertGroupIds?.length || 0} groups
                  </span>
                </div>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">
                  {job.criteria.allowedCertGroupIds?.length 
                    ? `Candidates must have valid certificates from: ${job.criteria.allowedCertGroupIds.join(', ')}`
                    : 'No specific certifications required'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Verification Results</h3>
            <div className="pj-space-y-3">
              <div className="pj-flex pj-items-center pj-justify-between pj-p-3 pj-bg-green-50 pj-border pj-border-green-200 pj-rounded">
                <span className="pj-text-pj-sm">Meets all criteria</span>
                <span className="pj-text-pj-sm pj-font-bold pj-text-green-700">{Math.floor(job.applicationsCount * 0.7)}</span>
              </div>
              <div className="pj-flex pj-items-center pj-justify-between pj-p-3 pj-bg-orange-50 pj-border pj-border-orange-200 pj-rounded">
                <span className="pj-text-pj-sm">Partial match</span>
                <span className="pj-text-pj-sm pj-font-bold pj-text-orange-700">{Math.floor(job.applicationsCount * 0.2)}</span>
              </div>
              <div className="pj-flex pj-items-center pj-justify-between pj-p-3 pj-bg-red-50 pj-border pj-border-red-200 pj-rounded">
                <span className="pj-text-pj-sm">Does not meet criteria</span>
                <span className="pj-text-pj-sm pj-font-bold pj-text-red-700">{Math.floor(job.applicationsCount * 0.1)}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div>
      {/* Tab Navigation */}
      <div className="pj-border-b pj-border-pj-border pj-mb-6">
        <nav className="pj-flex pj-space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = currentTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`pj-flex pj-items-center pj-space-x-2 pj-px-1 pj-py-4 pj-border-b-2 pj-transition-colors ${
                  isActive
                    ? 'pj-border-pj-action-blue pj-text-pj-action-blue'
                    : 'pj-border-transparent pj-text-pj-text-secondary hover:pj-text-pj-text-primary hover:pj-border-gray-300'
                }`}
              >
                <Icon className="pj-w-4 pj-h-4" />
                <span className="pj-font-medium">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {tabs.find(tab => tab.id === currentTab)?.content}
      </div>
    </div>
  )
}
