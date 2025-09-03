'use client'

import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'

interface DashboardHeaderProps {
  onPostJob?: () => void
  onExport?: () => void
}

export function DashboardHeader({ onPostJob, onExport }: DashboardHeaderProps) {
  return (
    <div className="pj-flex pj-flex-col md:pj-flex-row md:pj-items-center md:pj-justify-between pj-gap-4 pj-mb-6">
      <div>
        <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-2">
          Employer Dashboard
        </h1>
        <p className="pj-text-pj-text-secondary">
          Manage your job postings and review anonymous applications
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
          Export Data
        </Button>
        
        <Button 
          size="sm" 
          className="pj-btn pj-btn--primary pj-px-4 pj-py-2"
          onClick={onPostJob}
        >
          <Plus className="pj-w-4 pj-h-4 pj-mr-2" />
          Post New Job
        </Button>
      </div>
    </div>
  )
}
