'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, BookOpen, Play, Code } from 'lucide-react'

export function PrivacyLearnMore() {
  const resources = [
    {
      icon: Play,
      title: 'Try the Demo',
      description: 'Experience the full privacy-preserving application flow in under 2 minutes',
      action: 'Start Demo',
      href: '/issuer',
      variant: 'blue' as const
    },
    {
      icon: BookOpen,
      title: 'Technical Documentation',
      description: 'Deep dive into zero-knowledge proofs, Midnight Network, and Compact contracts',
      action: 'Read Docs',
      href: '/help',
      variant: 'ghost' as const
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Explore the codebase, contribute, or deploy your own privacy-preserving job board',
      action: 'View on GitHub',
      href: 'https://github.com/privjob/privjob',
      variant: 'ghost' as const,
      external: true
    }
  ]

  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16 pj-bg-gray-50">
      <div className="pj-text-center pj-mb-12">
        <h2 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-4">
          Learn more about privacy-preserving hiring
        </h2>
        <p className="pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
          Explore the technology, try the demo, or dive into the technical details behind PrivJob.
        </p>
      </div>

      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-8 pj-max-w-4xl pj-mx-auto">
        {resources.map((resource, index) => (
          <div key={index} className="pj-card pj-p-6 pj-text-center pj-bg-white">
            <div className="pj-flex pj-justify-center pj-mb-4">
              <div className="pj-w-12 pj-h-12 pj-bg-pj-action-blue pj-rounded-lg pj-flex pj-items-center pj-justify-center">
                <resource.icon className="pj-w-6 pj-h-6 pj-text-white" />
              </div>
            </div>
            
            <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-3">
              {resource.title}
            </h3>
            
            <p className="pj-text-pj-text-secondary pj-mb-6">
              {resource.description}
            </p>
            
            {resource.external ? (
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-inline-block"
              >
                <Button variant={resource.variant} className="pj-btn pj-btn--ghost pj-px-6 pj-py-2">
                  {resource.action}
                  <ExternalLink className="pj-w-4 pj-h-4 pj-ml-2" />
                </Button>
              </a>
            ) : (
              <Link href={resource.href}>
                <Button variant={resource.variant} className={`pj-btn pj-btn--${resource.variant} pj-px-6 pj-py-2`}>
                  {resource.action}
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="pj-mt-12 pj-text-center">
        <p className="pj-text-pj-text-muted pj-mb-4">
          Have questions about privacy or zero-knowledge proofs?
        </p>
        <Link href="/help">
          <Button variant="ghost" className="pj-btn pj-btn--ghost pj-px-6 pj-py-2">
            Visit Help Center
          </Button>
        </Link>
      </div>
    </section>
  )
}
