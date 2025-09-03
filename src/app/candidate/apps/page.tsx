import { AppsHeader } from '@/components/candidate/apps-header'
import { AppsFilters } from '@/components/candidate/apps-filters'
import { ApplicationsList } from '@/components/candidate/applications-list'
import { ReceiptDrawer } from '@/components/candidate/apps/receipt-drawer'
import { Suspense } from 'react'

export default function AppsPage() {
  return (
    <div className="pj-space-y-8">
      <AppsHeader />
      <AppsFilters />
      <Suspense fallback={<div>Loading applications...</div>}>
        <ApplicationsList />
      </Suspense>
      <ReceiptDrawer />
    </div>
  )
}
