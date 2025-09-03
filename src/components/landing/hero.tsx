'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16">
      <div className="pj-max-w-4xl pj-mx-auto pj-text-center pj-space-y-8">
        <div className="pj-space-y-4">
          <h1 className="pj-text-4xl md:pj-text-6xl pj-font-bold pj-text-pj-text-primary">
            Prove you qualify without revealing your identity
          </h1>
          <p className="pj-text-pj-lg pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
            Generate proof in your browser. Share pass/fail—keep everything else private.
          </p>
        </div>
        
        <div className="pj-flex pj-flex-col sm:pj-flex-row pj-gap-4 pj-justify-center pj-items-center">
          <Link href="/jobs">
            <Button size="lg" className="pj-btn pj-btn--primary pj-px-8 pj-py-3">
              Explore Jobs
            </Button>
          </Link>
          <Link href="/privacy">
            <Button variant="ghost" size="lg" className="pj-btn pj-btn--ghost pj-px-8 pj-py-3 pj-text-pj-action-blue">
              How Privacy Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
