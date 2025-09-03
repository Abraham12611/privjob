'use client'

import { Search, BookOpen } from 'lucide-react'

export function HelpHeader() {
  return (
    <div className="pj-border-b pj-border-pj-border pj-pb-8 pj-mb-8">
      <div className="pj-flex pj-items-center pj-mb-6">
        <div className="pj-w-12 pj-h-12 pj-bg-pj-action-blue pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-mr-4">
          <BookOpen className="pj-w-6 pj-h-6 pj-text-white" />
        </div>
        <div>
          <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary">
            Help & Documentation
          </h1>
          <p className="pj-text-pj-text-secondary">
            Everything you need to know about using PrivJob
          </p>
        </div>
      </div>
      
      <div className="pj-relative pj-max-w-md">
        <Search className="pj-absolute pj-left-3 pj-top-1/2 pj-transform pj--translate-y-1/2 pj-h-4 pj-w-4 pj-text-pj-text-muted" />
        <input
          type="text"
          placeholder="Search documentation..."
          className="pj-w-full pj-pl-10 pj-pr-4 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-text-pj-text-primary pj-placeholder-pj-text-muted pj-focus-ring"
        />
      </div>
    </div>
  )
}
