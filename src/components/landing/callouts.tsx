'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Briefcase, Play } from 'lucide-react'

export function Callouts() {
  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter">
      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-8">
        <div className="pj-card pj-p-8 pj-text-center">
          <div className="pj-flex pj-justify-center pj-mb-4">
            <div className="pj-w-12 pj-h-12 pj-bg-pj-action-blue pj-rounded-lg pj-flex pj-items-center pj-justify-center">
              <Briefcase className="pj-w-6 pj-h-6 pj-text-white" />
            </div>
          </div>
          
          <h3 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary pj-mb-3">
            For Employers
          </h3>
          
          <p className="pj-text-pj-text-secondary pj-mb-6">
            Find qualified candidates without compromising their privacy. See verified skills, not personal details.
          </p>
          
          <Link href="/employer/jobs/new">
            <Button variant="blue" size="lg" className="pj-btn pj-btn--blue pj-px-6 pj-py-3">
              Post a Job
            </Button>
          </Link>
        </div>

        <div className="pj-card pj-p-8 pj-text-center">
          <div className="pj-flex pj-justify-center pj-mb-4">
            <div className="pj-w-12 pj-h-12 pj-bg-pj-chip-green pj-rounded-lg pj-flex pj-items-center pj-justify-center">
              <Play className="pj-w-6 pj-h-6 pj-text-white" />
            </div>
          </div>
          
          <h3 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary pj-mb-3">
            Try the Demo
          </h3>
          
          <p className="pj-text-pj-text-secondary pj-mb-6">
            Experience the full privacy-preserving job application flow in under 2 minutes.
          </p>
          
          <Link href="/issuer">
            <Button variant="ghost" size="lg" className="pj-btn pj-btn--ghost pj-px-6 pj-py-3">
              Start Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
