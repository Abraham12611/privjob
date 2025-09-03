'use client'

import { Search } from 'lucide-react'

export function JobsHeader() {
  return (
    <div className="pj-mb-8">
      <div className="pj-flex pj-flex-col md:pj-flex-row md:pj-items-center md:pj-justify-between pj-gap-4">
        <div>
          <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary">
            Explore Jobs
          </h1>
          <p className="pj-text-pj-text-secondary pj-mt-1">
            Find opportunities that match your skills while keeping your identity private
          </p>
        </div>
        
        <div className="pj-relative pj-w-full md:pj-w-80">
          <Search className="pj-absolute pj-left-3 pj-top-1/2 pj-transform pj--translate-y-1/2 pj-h-4 pj-w-4 pj-text-pj-text-muted" />
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            className="pj-w-full pj-pl-10 pj-pr-4 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-text-pj-text-primary pj-placeholder-pj-text-muted pj-focus-ring"
          />
        </div>
      </div>
    </div>
  )
}
