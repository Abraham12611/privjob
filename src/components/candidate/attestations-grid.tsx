'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { Attestation } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatRelativeTime } from '@/lib/utils'
import { Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface AttestationsGridProps {
  onSelect?: (attestation: Attestation) => void
  selectedId?: string
}

export function AttestationsGrid({ onSelect, selectedId }: AttestationsGridProps) {
  const { data: attestations, isLoading, error } = useQuery({
    queryKey: ['attestations'],
    queryFn: () => apiClient.getAttestations() as Promise<Attestation[]>,
  })

  if (isLoading) {
    return (
      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 lg:pj-grid-cols-3 pj-gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="pj-card pj-p-6 pj-animate-pulse">
            <div className="pj-flex pj-items-center pj-space-x-3 pj-mb-4">
              <div className="pj-w-10 pj-h-10 pj-bg-gray-200 pj-rounded-full"></div>
              <div className="pj-flex-1">
                <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-mb-2"></div>
                <div className="pj-h-3 pj-bg-gray-200 pj-rounded pj-w-2/3"></div>
              </div>
            </div>
            <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-mb-3"></div>
            <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-mb-2"></div>
            <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <AlertCircle className="pj-w-12 pj-h-12 pj-text-pj-error pj-mx-auto pj-mb-4" />
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Failed to load your attestations
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

  if (!attestations?.length) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <Shield className="pj-w-12 pj-h-12 pj-text-pj-text-muted pj-mx-auto pj-mb-4" />
        <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
          No credentials yet
        </h3>
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Import existing credentials or visit the Issuer Studio to create demo attestations
        </p>
        <div className="pj-flex pj-justify-center pj-space-x-3">
          <button className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
            Import Credentials
          </button>
          <a href="/issuer" className="pj-btn pj-btn--ghost pj-px-4 pj-py-2">
            Visit Issuer Studio
          </a>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle className="pj-w-4 pj-h-4 pj-text-pj-chip-green" />
      case 'Expired':
        return <Clock className="pj-w-4 pj-h-4 pj-text-orange-500" />
      case 'Revoked':
        return <AlertCircle className="pj-w-4 pj-h-4 pj-text-pj-error" />
      default:
        return <Shield className="pj-w-4 pj-h-4 pj-text-pj-text-muted" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cert':
        return 'pj-bg-blue-100 pj-text-blue-800'
      case 'experience':
        return 'pj-bg-green-100 pj-text-green-800'
      case 'education':
        return 'pj-bg-purple-100 pj-text-purple-800'
      default:
        return 'pj-bg-gray-100 pj-text-gray-800'
    }
  }

  return (
    <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 lg:pj-grid-cols-3 pj-gap-6">
      {attestations.map((attestation) => (
        <article
          key={attestation.id}
          className={`pj-card pj-p-6 pj-cursor-pointer pj-transition-all pj-duration-[var(--pj-hover-duration)] ${
            selectedId === attestation.id ? 'pj-card--selected' : ''
          }`}
          onClick={() => onSelect?.(attestation)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect?.(attestation)
            }
          }}
        >
          {/* Header */}
          <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
            <div className="pj-flex pj-items-center pj-space-x-3">
              <Avatar className="pj-w-10 pj-h-10">
                <AvatarImage src={attestation.issuer.logoUrl} alt={`${attestation.issuer.name} logo`} />
                <AvatarFallback className="pj-text-pj-sm">
                  {attestation.issuer.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">
                  {attestation.issuer.name}
                </p>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">
                  {formatRelativeTime(attestation.createdAt)}
                </p>
              </div>
            </div>
            
            <div className="pj-flex pj-items-center pj-space-x-2">
              {getStatusIcon(attestation.status)}
              <span className={`pj-text-pj-xs pj-px-2 pj-py-1 pj-rounded-full ${getTypeColor(attestation.type)}`}>
                {attestation.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="pj-mb-4">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
              {attestation.metadata.label}
            </h3>
            <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-3">
              {attestation.metadata.value}
            </p>
            
            {attestation.expiry && (
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Expires: {new Date(attestation.expiry).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="pj-flex pj-items-center pj-justify-between pj-text-pj-xs pj-text-pj-text-muted">
            <span>Group: {attestation.groupId}</span>
            <span className={`pj-font-medium ${
              attestation.status === 'Valid' ? 'pj-text-pj-chip-green' :
              attestation.status === 'Expired' ? 'pj-text-orange-500' :
              'pj-text-pj-error'
            }`}>
              {attestation.status}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}
