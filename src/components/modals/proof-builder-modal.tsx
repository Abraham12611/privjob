'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { JobsService } from '@/services/jobs-service'
import { MidnightService } from '@/services/midnight-service'
import { mockAttestations } from '@/services/mock-data'
import { Button } from '@/components/ui/button'
import { X, Check, AlertCircle } from 'lucide-react'
import { generateTxHash } from '@/lib/utils'

interface ProofBuilderModalProps {
  jobId: string
  onClose?: () => void
}

type Step = 'select' | 'review' | 'generate' | 'submit' | 'result'

export function ProofBuilderModal({ jobId, onClose }: ProofBuilderModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('select')
  const [selectedAttestations, setSelectedAttestations] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; txHash?: string; error?: string } | null>(null)

  const { data: job } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => JobsService.getJob(jobId),
  })

  const handleSelectAttestation = (attestationId: string) => {
    setSelectedAttestations(prev => 
      prev.includes(attestationId) 
        ? prev.filter(id => id !== attestationId)
        : [...prev, attestationId]
    )
  }

  const handleGenerateProof = async () => {
    if (!job) return
    
    setIsGenerating(true)
    setCurrentStep('generate')
    
    try {
      const selectedAtts = mockAttestations.filter(att => selectedAttestations.includes(att.id))
      
      // Mock proof generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const publicInputs = {
        postingId: job.id,
        minYears: job.criteria.minYears || 0,
        allowedCertRoot: 'mock_cert_root',
        cutoffTime: job.criteria.cutoffTime || '2020-01-01T00:00:00Z',
        nullifier: 'mock_nullifier'
      }
      
      const witnessInputs = {
        userSecret: 'mock_user_secret',
        yearsExperience: 5,
        certId: 'mock_cert_id',
        merklePath: ['path1', 'path2'],
        attestationTimestamp: '2023-01-01T00:00:00Z'
      }
      
      const proof = await MidnightService.buildEligibilityProof(publicInputs, witnessInputs)
      setCurrentStep('submit')
      
      // Auto-submit after brief delay
      setTimeout(() => handleSubmitProof(proof), 1000)
      
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate proof'
      })
      setCurrentStep('result')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmitProof = async (proof: any) => {
    setIsSubmitting(true)
    
    try {
      const submitResult = await MidnightService.submitApplication(proof)
      setResult(submitResult)
      setCurrentStep('result')
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit application'
      })
      setCurrentStep('result')
    } finally {
      setIsSubmitting(false)
    }
  }

  const criteriaResults = job ? MidnightService.checkCriteria(
    mockAttestations.filter(att => selectedAttestations.includes(att.id)),
    job.criteria
  ) : []

  return (
    <div className="pj-fixed pj-inset-0 pj-bg-black pj-bg-opacity-50 pj-flex pj-items-center pj-justify-center pj-z-50 pj-p-4">
      <div className="pj-bg-pj-card-bg pj-rounded-pj-card pj-shadow-pj-card pj-w-full pj-max-w-2xl pj-max-h-[90vh] pj-overflow-hidden">
        {/* Header */}
        <div className="pj-flex pj-items-center pj-justify-between pj-p-6 pj-border-b pj-border-pj-border">
          <h2 className="pj-text-pj-xl pj-font-semibold">Apply Privately</h2>
          <button 
            onClick={onClose}
            className="pj-icon-btn"
          >
            <X className="pj-w-4 pj-h-4" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="pj-flex pj-items-center pj-justify-center pj-p-4 pj-border-b pj-border-pj-border">
          <div className="pj-flex pj-items-center pj-space-x-4">
            {['Select attestations', 'Review public vs private', 'Generate proof'].map((label, index) => {
              const stepNames: Step[] = ['select', 'review', 'generate']
              const isActive = stepNames[index] === currentStep
              const isCompleted = stepNames.indexOf(currentStep) > index
              
              return (
                <div key={index} className="pj-flex pj-items-center">
                  <div className={`pj-w-8 pj-h-8 pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-medium ${
                    isCompleted ? 'pj-bg-pj-chip-green pj-text-white' :
                    isActive ? 'pj-bg-pj-action-blue pj-text-white' :
                    'pj-bg-gray-200 pj-text-pj-text-muted'
                  }`}>
                    {isCompleted ? <Check className="pj-w-4 pj-h-4" /> : index + 1}
                  </div>
                  <span className={`pj-ml-2 pj-text-pj-sm ${
                    isActive ? 'pj-text-pj-text-primary pj-font-medium' : 'pj-text-pj-text-muted'
                  }`}>
                    {label}
                  </span>
                  {index < 2 && <div className="pj-w-8 pj-h-px pj-bg-gray-300 pj-ml-4"></div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="pj-p-6 pj-overflow-y-auto pj-max-h-96">
          {currentStep === 'select' && (
            <div>
              <h3 className="pj-text-pj-lg pj-font-medium pj-mb-4">Select your attestations</h3>
              <p className="pj-text-pj-text-secondary pj-mb-6">
                Choose which credentials to use for this application. Only the proof will be shared.
              </p>
              
              <div className="pj-space-y-3">
                {mockAttestations.map((attestation) => (
                  <label
                    key={attestation.id}
                    className="pj-flex pj-items-center pj-p-4 pj-border pj-border-pj-border pj-rounded-pj-button pj-cursor-pointer hover:pj-bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAttestations.includes(attestation.id)}
                      onChange={() => handleSelectAttestation(attestation.id)}
                      className="pj-mr-3"
                    />
                    <div className="pj-flex-1">
                      <div className="pj-flex pj-items-center pj-justify-between">
                        <span className="pj-font-medium">{attestation.metadata.label}</span>
                        <span className={`pj-meta-chip ${
                          attestation.status === 'Valid' ? 'pj-text-pj-chip-green' : 'pj-text-pj-error'
                        }`}>
                          {attestation.status}
                        </span>
                      </div>
                      <p className="pj-text-pj-sm pj-text-pj-text-secondary">
                        {attestation.issuer.name} • {attestation.metadata.value}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div>
              <h3 className="pj-text-pj-lg pj-font-medium pj-mb-4">Review what will be shared</h3>
              
              <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-6">
                <div>
                  <h4 className="pj-font-medium pj-text-pj-chip-green pj-mb-3">✓ Public (shared on-chain)</h4>
                  <ul className="pj-space-y-2 pj-text-pj-sm">
                    <li>• Job ID: {job?.id}</li>
                    <li>• Criteria results (pass/fail)</li>
                    <li>• Timestamp</li>
                    <li>• Proof verification</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="pj-font-medium pj-text-pj-action-blue pj-mb-3">🔒 Private (stays on device)</h4>
                  <ul className="pj-space-y-2 pj-text-pj-sm">
                    <li>• Your identity</li>
                    <li>• Exact years of experience</li>
                    <li>• Certificate details</li>
                    <li>• Raw attestation data</li>
                  </ul>
                </div>
              </div>

              <div className="pj-mt-6 pj-p-4 pj-bg-gray-50 pj-rounded-pj-button">
                <h4 className="pj-font-medium pj-mb-2">Criteria Check Preview</h4>
                <div className="pj-space-y-1">
                  {criteriaResults.map((result, index) => (
                    <div key={index} className="pj-flex pj-items-center pj-text-pj-sm">
                      {result.pass ? (
                        <Check className="pj-w-4 pj-h-4 pj-text-pj-chip-green pj-mr-2" />
                      ) : (
                        <X className="pj-w-4 pj-h-4 pj-text-pj-error pj-mr-2" />
                      )}
                      {result.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'generate' && (
            <div className="pj-text-center pj-py-8">
              <div className="pj-w-16 pj-h-16 pj-border-4 pj-border-pj-action-blue pj-border-t-transparent pj-rounded-full pj-animate-spin pj-mx-auto pj-mb-4"></div>
              <h3 className="pj-text-pj-lg pj-font-medium pj-mb-2">Building proof on your device...</h3>
              <p className="pj-text-pj-text-secondary">
                Generating zero-knowledge proof using your private attestations
              </p>
            </div>
          )}

          {currentStep === 'submit' && (
            <div className="pj-text-center pj-py-8">
              <div className="pj-w-16 pj-h-16 pj-border-4 pj-border-pj-chip-green pj-border-t-transparent pj-rounded-full pj-animate-spin pj-mx-auto pj-mb-4"></div>
              <h3 className="pj-text-pj-lg pj-font-medium pj-mb-2">Submitting proof to network...</h3>
              <p className="pj-text-pj-text-secondary">
                Your proof is being verified on the Midnight blockchain
              </p>
            </div>
          )}

          {currentStep === 'result' && result && (
            <div className="pj-text-center pj-py-8">
              {result.success ? (
                <>
                  <div className="pj-w-16 pj-h-16 pj-bg-pj-chip-green pj-rounded-full pj-flex pj-items-center pj-justify-center pj-mx-auto pj-mb-4">
                    <Check className="pj-w-8 pj-h-8 pj-text-white" />
                  </div>
                  <h3 className="pj-text-pj-lg pj-font-medium pj-mb-2">Application received—your identity remains private</h3>
                  <p className="pj-text-pj-text-secondary pj-mb-4">
                    Transaction hash: <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">{result.txHash}</code>
                  </p>
                  <div className="pj-space-y-2">
                    {criteriaResults.map((result, index) => (
                      <div key={index} className="pj-flex pj-items-center pj-justify-center pj-text-pj-sm">
                        {result.pass ? (
                          <Check className="pj-w-4 pj-h-4 pj-text-pj-chip-green pj-mr-2" />
                        ) : (
                          <X className="pj-w-4 pj-h-4 pj-text-pj-error pj-mr-2" />
                        )}
                        {result.label}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="pj-w-16 pj-h-16 pj-bg-pj-error pj-rounded-full pj-flex pj-items-center pj-justify-center pj-mx-auto pj-mb-4">
                    <AlertCircle className="pj-w-8 pj-h-8 pj-text-white" />
                  </div>
                  <h3 className="pj-text-pj-lg pj-font-medium pj-mb-2">Application failed</h3>
                  <p className="pj-text-pj-text-secondary pj-mb-4">{result.error}</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pj-flex pj-items-center pj-justify-between pj-p-6 pj-border-t pj-border-pj-border">
          <Button 
            variant="ghost" 
            onClick={onClose}
            disabled={isGenerating || isSubmitting}
          >
            {result?.success ? 'Close' : 'Cancel'}
          </Button>
          
          <div className="pj-flex pj-space-x-3">
            {currentStep === 'select' && (
              <Button 
                onClick={() => setCurrentStep('review')}
                disabled={selectedAttestations.length === 0}
                className="pj-btn pj-btn--primary"
              >
                Continue
              </Button>
            )}
            
            {currentStep === 'review' && (
              <Button 
                onClick={handleGenerateProof}
                className="pj-btn pj-btn--primary"
              >
                Generate Proof
              </Button>
            )}
            
            {result && !result.success && (
              <Button 
                onClick={() => {
                  setCurrentStep('select')
                  setResult(null)
                }}
                className="pj-btn pj-btn--primary"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
