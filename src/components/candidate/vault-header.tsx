'use client'

import { Button } from '@/components/ui/button'
import { Plus, Download, Upload } from 'lucide-react'

interface VaultHeaderProps {
  onImport?: () => void
  onExport?: () => void
  onAdd?: () => void
}

export function VaultHeader({ onImport, onExport, onAdd }: VaultHeaderProps) {
  return (
    <div className="pj-flex pj-flex-col md:pj-flex-row md:pj-items-center md:pj-justify-between pj-gap-4 pj-mb-6">
      <div>
        <h1 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-2">
          Your Vault
        </h1>
        <p className="pj-text-pj-text-secondary">
          Securely store and manage your private credentials on your device
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
          Export
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="pj-btn pj-btn--ghost pj-px-4 pj-py-2"
          onClick={onImport}
        >
          <Upload className="pj-w-4 pj-h-4 pj-mr-2" />
          Import
        </Button>
        
        <Button 
          size="sm" 
          className="pj-btn pj-btn--primary pj-px-4 pj-py-2"
          onClick={onAdd}
        >
          <Plus className="pj-w-4 pj-h-4 pj-mr-2" />
          Add Credential
        </Button>
      </div>
    </div>
  )
}
