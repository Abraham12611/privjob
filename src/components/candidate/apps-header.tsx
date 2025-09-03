'use client'

import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

interface AppsHeaderProps {
  onExport?: () => void
}

export function AppsHeader({ onExport }: AppsHeaderProps) {
  return (
    <div className="pj-flex pj-flex-col md:pj-flex-row md:pj-items-center md:pj-justify-between pj-gap-4 pj-mb-6">
      <div>
        <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-2">
          Your Applications
        </h1>
        <p className="pj-text-pj-text-secondary">
          Track the status of your private job applications and proof submissions
        </p>
      </div>
      
      <div className="pj-flex pj-items-center pj-space-x-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="pj-btn pj-btn--ghost pj-px-4 pj-py-2"
          onClick={onExport}
        >
          <Download className="pj-w-4 pj-h-4 pj-mr-2" />
          Export History
        </Button>
      </div>
    </div>
  )
}
