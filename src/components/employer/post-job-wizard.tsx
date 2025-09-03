'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

export function PostJobWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full Time',
    workplace: 'Remote',
    location: '',
    seniority: 'Mid',
    salaryMin: 80000,
    salaryMax: 120000,
    salaryCurrency: 'USD',
    description: '',
    responsibilities: [''],
    benefits: [''],
    criteria: {
      minYears: 3,
      allowedCertGroupIds: [],
      cutoffTime: '2020-01-01'
    },
    tags: []
  })

  const steps = [
    { title: 'Basic Info', description: 'Job title, type, and location' },
    { title: 'Details', description: 'Description and requirements' },
    { title: 'Criteria', description: 'Zero-knowledge verification rules' },
    { title: 'Review', description: 'Preview and publish' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateCriteria = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      criteria: { ...prev.criteria, [field]: value }
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as string[], '']
    }))
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => i === index ? value : item)
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="pj-max-w-2xl pj-mx-auto">
      {/* Progress Steps */}
      <div className="pj-mb-8">
        <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
          {steps.map((step, index) => (
            <div key={index} className="pj-flex pj-items-center">
              <div className={`pj-w-8 pj-h-8 pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-medium ${
                index < currentStep ? 'pj-bg-pj-chip-green pj-text-white' :
                index === currentStep ? 'pj-bg-pj-action-blue pj-text-white' :
                'pj-bg-gray-200 pj-text-pj-text-muted'
              }`}>
                {index < currentStep ? <Check className="pj-w-4 pj-h-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`pj-w-16 pj-h-0.5 pj-ml-2 ${
                  index < currentStep ? 'pj-bg-pj-chip-green' : 'pj-bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="pj-text-center">
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary">
            {steps[currentStep].title}
          </h2>
          <p className="pj-text-pj-text-secondary">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="pj-card pj-p-8 pj-mb-8">
        {currentStep === 0 && (
          <div className="pj-space-y-6">
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>

            <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-4">
              <div>
                <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                  Job Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => updateFormData('type', e.target.value)}
                  className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                  Workplace *
                </label>
                <select
                  value={formData.workplace}
                  onChange={(e) => updateFormData('workplace', e.target.value)}
                  className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
            </div>

            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="e.g. San Francisco, CA or Global"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>

            <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-4">
              <div>
                <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                  Seniority Level *
                </label>
                <select
                  value={formData.seniority}
                  onChange={(e) => updateFormData('seniority', e.target.value)}
                  className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Head">Head</option>
                </select>
              </div>

              <div>
                <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                  Min Salary
                </label>
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => updateFormData('salaryMin', parseInt(e.target.value))}
                  className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                />
              </div>

              <div>
                <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                  Max Salary
                </label>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => updateFormData('salaryMax', parseInt(e.target.value))}
                  className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="pj-space-y-6">
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Job Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Describe the role, company, and what makes this opportunity unique..."
                rows={6}
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>

            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Key Responsibilities
              </label>
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="pj-flex pj-items-center pj-space-x-2 pj-mb-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => updateArrayItem('responsibilities', index, e.target.value)}
                    placeholder="e.g. Design and implement user interfaces"
                    className="pj-flex-1 pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                  />
                  {formData.responsibilities.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem('responsibilities', index)}
                      className="pj-btn pj-btn--ghost pj-px-2 pj-py-1"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem('responsibilities')}
                className="pj-btn pj-btn--ghost pj-px-3 pj-py-1"
              >
                Add Responsibility
              </Button>
            </div>

            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Benefits & Perks
              </label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="pj-flex pj-items-center pj-space-x-2 pj-mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                    placeholder="e.g. Health insurance, flexible hours"
                    className="pj-flex-1 pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
                  />
                  {formData.benefits.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem('benefits', index)}
                      className="pj-btn pj-btn--ghost pj-px-2 pj-py-1"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem('benefits')}
                className="pj-btn pj-btn--ghost pj-px-3 pj-py-1"
              >
                Add Benefit
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="pj-space-y-6">
            <div className="pj-p-4 pj-bg-blue-50 pj-border pj-border-blue-200 pj-rounded-pj-button">
              <h3 className="pj-text-pj-sm pj-font-medium pj-text-blue-800 pj-mb-2">
                Zero-Knowledge Verification
              </h3>
              <p className="pj-text-pj-xs pj-text-blue-700">
                Set criteria that candidates can prove they meet without revealing personal details. 
                Only pass/fail results will be visible to you.
              </p>
            </div>

            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Minimum Years of Experience
              </label>
              <input
                type="number"
                value={formData.criteria.minYears}
                onChange={(e) => updateCriteria('minYears', parseInt(e.target.value))}
                min="0"
                max="20"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
              <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mt-1">
                Candidates will prove they have at least this many years of relevant experience
              </p>
            </div>

            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Experience Cutoff Date
              </label>
              <input
                type="date"
                value={formData.criteria.cutoffTime}
                onChange={(e) => updateCriteria('cutoffTime', e.target.value)}
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
              <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mt-1">
                Only experience after this date will count toward the minimum requirement
              </p>
            </div>

            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Required Certifications
              </label>
              <div className="pj-p-4 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-gray-50">
                <p className="pj-text-pj-sm pj-text-pj-text-muted pj-mb-2">
                  Select certification groups that candidates must have:
                </p>
                <div className="pj-space-y-2">
                  {['University Degrees', 'Professional Certifications', 'Industry Licenses'].map((group) => (
                    <label key={group} className="pj-flex pj-items-center pj-space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.criteria.allowedCertGroupIds?.includes(group)}
                        onChange={(e) => {
                          const current = formData.criteria.allowedCertGroupIds || []
                          if (e.target.checked) {
                            updateCriteria('allowedCertGroupIds', [...current, group])
                          } else {
                            updateCriteria('allowedCertGroupIds', current.filter(id => id !== group))
                          }
                        }}
                        className="pj-rounded"
                      />
                      <span className="pj-text-pj-sm">{group}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="pj-space-y-6">
            <div className="pj-p-4 pj-bg-green-50 pj-border pj-border-green-200 pj-rounded-pj-button">
              <h3 className="pj-text-pj-sm pj-font-medium pj-text-green-800 pj-mb-2">
                Ready to Publish
              </h3>
              <p className="pj-text-pj-xs pj-text-green-700">
                Review your job posting below. Once published, candidates can apply anonymously using zero-knowledge proofs.
              </p>
            </div>

            <div className="pj-card pj-p-6 pj-bg-gray-50">
              <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
                {formData.title}
              </h3>
              <div className="pj-flex pj-flex-wrap pj-gap-2 pj-mb-4">
                <span className="pj-meta-chip">{formData.type}</span>
                <span className="pj-meta-chip">{formData.seniority}</span>
                <span className="pj-meta-chip">{formData.workplace}</span>
                <span className="pj-meta-chip pj-meta-chip--green">
                  ${formData.salaryMin.toLocaleString()}–${formData.salaryMax.toLocaleString()}
                </span>
              </div>
              
              <div className="pj-space-y-3 pj-text-pj-sm">
                <div>
                  <strong>Description:</strong>
                  <p className="pj-text-pj-text-secondary pj-mt-1">{formData.description || 'No description provided'}</p>
                </div>
                
                <div>
                  <strong>Requirements:</strong>
                  <ul className="pj-list-disc pj-list-inside pj-text-pj-text-secondary pj-mt-1">
                    <li>Minimum {formData.criteria.minYears} years of experience</li>
                    {formData.criteria.allowedCertGroupIds?.length > 0 && (
                      <li>Valid certification from: {formData.criteria.allowedCertGroupIds.join(', ')}</li>
                    )}
                    <li>Experience from {formData.criteria.cutoffTime} or later</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="pj-flex pj-items-center pj-justify-between">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="pj-btn pj-btn--ghost pj-px-4 pj-py-2"
        >
          <ChevronLeft className="pj-w-4 pj-h-4 pj-mr-1" />
          Previous
        </Button>

        <div className="pj-flex pj-items-center pj-space-x-2">
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="pj-btn pj-btn--primary pj-px-4 pj-py-2"
            >
              Next
              <ChevronRight className="pj-w-4 pj-h-4 pj-ml-1" />
            </Button>
          ) : (
            <Button
              className="pj-btn pj-btn--primary pj-px-6 pj-py-2"
            >
              Publish Job
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
