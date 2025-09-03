'use client'

import { Button } from '@/components/ui/button'
import { Users, Download } from 'lucide-react'

interface ContactsHeaderProps {
  onExport?: () => void
}

export function ContactsHeader({ onExport }: ContactsHeaderProps) {
  return (
    <div className="pj-flex pj-flex-col md:pj-flex-row md:pj-items-center md:pj-justify-between pj-gap-4 pj-mb-6">
      <div>
        <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-2">
          Contact Requests
        </h1>
        <p className="pj-text-pj-text-secondary">
          Manage employer requests to connect and reveal your contact information
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
