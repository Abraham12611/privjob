'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { ContactRequest } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/utils'
import { Check, X, Clock, Mail, MessageSquare, AlertCircle } from 'lucide-react'

interface ContactRequestsListProps {
  onSelect?: (request: ContactRequest) => void
  selectedId?: string
}

export function ContactRequestsList({ onSelect, selectedId }: ContactRequestsListProps) {
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['contact-requests'],
    queryFn: () => apiClient.getContactRequests() as Promise<ContactRequest[]>,
  })

  const respondMutation = useMutation({
    mutationFn: ({ id, action, message }: { id: string; action: 'accept' | 'decline'; message?: string }) =>
      apiClient.respondToContactRequest(id, action, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-requests'] })
      setRespondingTo(null)
    },
  })

  const handleRespond = (id: string, action: 'accept' | 'decline') => {
    respondMutation.mutate({ id, action })
  }

  if (isLoading) {
    return (
      <div className="pj-space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="pj-card pj-p-6 pj-animate-pulse">
            <div className="pj-flex pj-items-center pj-space-x-4 pj-mb-4">
              <div className="pj-w-12 pj-h-12 pj-bg-gray-200 pj-rounded-full"></div>
              <div className="pj-flex-1">
                <div className="pj-h-5 pj-bg-gray-200 pj-rounded pj-mb-2"></div>
                <div className="pj-h-4 pj-bg-gray-200 pj-rounded pj-w-2/3"></div>
              </div>
              <div className="pj-h-6 pj-bg-gray-200 pj-rounded pj-w-20"></div>
            </div>
            <div className="pj-h-16 pj-bg-gray-200 pj-rounded pj-mb-4"></div>
            <div className="pj-flex pj-space-x-2">
              <div className="pj-h-8 pj-bg-gray-200 pj-rounded pj-w-20"></div>
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
        <AlertCircle className="pj-w-12 pj-h-12 pj-text-pj-error pj-mx-auto pj-mb-4" />
        <p className="pj-text-pj-text-secondary pj-mb-4">
          Failed to load contact requests
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

  if (!requests?.length) {
    return (
      <div className="pj-card pj-p-8 pj-text-center">
        <MessageSquare className="pj-w-12 pj-h-12 pj-text-pj-text-muted pj-mx-auto pj-mb-4" />
        <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
          No contact requests yet
        </h3>
        <p className="pj-text-pj-text-secondary pj-mb-4">
          When employers are interested in your applications, they'll send contact requests here
        </p>
        <a href="/jobs" className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
          Apply to More Jobs
        </a>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'pj-text-pj-chip-green'
      case 'Pending':
        return 'pj-text-pj-action-blue'
      case 'Declined':
        return 'pj-text-pj-text-muted'
      case 'Expired':
        return 'pj-text-orange-500'
      case 'Failed':
        return 'pj-text-pj-error'
      default:
        return 'pj-text-pj-text-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <Check className="pj-w-4 pj-h-4 pj-text-pj-chip-green" />
      case 'Pending':
        return <Clock className="pj-w-4 pj-h-4 pj-text-pj-action-blue" />
      case 'Declined':
        return <X className="pj-w-4 pj-h-4 pj-text-pj-text-muted" />
      case 'Expired':
        return <Clock className="pj-w-4 pj-h-4 pj-text-orange-500" />
      case 'Failed':
        return <X className="pj-w-4 pj-h-4 pj-text-pj-error" />
      default:
        return <Clock className="pj-w-4 pj-h-4 pj-text-pj-text-muted" />
    }
  }

  return (
    <div className="pj-space-y-4">
      {requests.map((request) => (
        <article
          key={request.id}
          className={`pj-card pj-p-6 pj-cursor-pointer pj-transition-all pj-duration-[var(--pj-hover-duration)] ${
            selectedId === request.id ? 'pj-card--selected' : ''
          }`}
          onClick={() => onSelect?.(request)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect?.(request)
            }
          }}
        >
          {/* Header */}
          <div className="pj-flex pj-items-center pj-justify-between pj-mb-4">
            <div className="pj-flex pj-items-center pj-space-x-4">
              <Avatar className="pj-w-12 pj-h-12">
                <AvatarImage src={request.fromEmployer.logoUrl} alt={`${request.fromEmployer.name} logo`} />
                <AvatarFallback className="pj-text-pj-sm">
                  {request.fromEmployer.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary">
                  {request.fromEmployer.name}
                </h3>
                {request.job && (
                  <p className="pj-text-pj-sm pj-text-pj-text-secondary">
                    {request.job.title}
                  </p>
                )}
              </div>
            </div>
            
            <div className="pj-flex pj-items-center pj-space-x-2">
              {getStatusIcon(request.status)}
              <span className={`pj-text-pj-sm pj-font-medium ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
          </div>

          {/* Message */}
          {request.message && (
            <div className="pj-mb-4 pj-p-4 pj-bg-gray-50 pj-rounded-pj-button">
              <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-italic">
                "{request.message}"
              </p>
            </div>
          )}

          {/* Details */}
          <div className="pj-mb-4 pj-text-pj-xs pj-text-pj-text-muted pj-space-y-1">
            <div className="pj-flex pj-items-center pj-justify-between">
              <span>Received {formatRelativeTime(request.createdAt)}</span>
              <div className="pj-flex pj-items-center pj-space-x-1">
                {request.channel === 'email' ? (
                  <Mail className="pj-w-3 pj-h-3" />
                ) : (
                  <MessageSquare className="pj-w-3 pj-h-3" />
                )}
                <span className="pj-capitalize">{request.channel}</span>
              </div>
            </div>
            {request.expiresAt && (
              <p>
                Expires {formatRelativeTime(request.expiresAt)}
              </p>
            )}
            {request.ephemeralHandle && (
              <p>
                Contact handle: <code className="pj-bg-gray-200 pj-px-1 pj-rounded">{request.ephemeralHandle}</code>
              </p>
            )}
          </div>

          {/* Actions */}
          {request.status === 'Pending' && (
            <div className="pj-flex pj-items-center pj-space-x-3" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                className="pj-btn pj-btn--primary pj-px-4 pj-py-2"
                onClick={() => handleRespond(request.id, 'accept')}
                disabled={respondMutation.isPending}
              >
                <Check className="pj-w-4 pj-h-4 pj-mr-1" />
                Accept & Reveal Contact
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="pj-btn pj-btn--ghost pj-px-4 pj-py-2"
                onClick={() => handleRespond(request.id, 'decline')}
                disabled={respondMutation.isPending}
              >
                <X className="pj-w-4 pj-h-4 pj-mr-1" />
                Decline
              </Button>
            </div>
          )}

          {request.status === 'Accepted' && (
            <div className="pj-p-3 pj-bg-green-50 pj-border pj-border-green-200 pj-rounded-pj-button">
              <p className="pj-text-pj-sm pj-text-green-800">
                ✓ Contact information shared. The employer can now reach out to you directly.
              </p>
            </div>
          )}

          {request.status === 'Declined' && (
            <div className="pj-p-3 pj-bg-gray-50 pj-border pj-border-gray-200 pj-rounded-pj-button">
              <p className="pj-text-pj-sm pj-text-pj-text-muted">
                Contact request declined. Your information remains private.
              </p>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
