import { ApplicantsHeader } from '@/components/employer/applicants/applicants-header'
import { ApplicantsFilters } from '@/components/employer/applicants/applicants-filters'
import { ApplicantsList } from '@/components/employer/applicants/applicants-list'
import { ApplicantReceiptDrawer } from '@/components/employer/applicants/applicant-receipt-drawer'
import { Suspense } from 'react'

interface ApplicantsPageProps {
  params: { id: string }
}

export default function ApplicantsPage({ params }: ApplicantsPageProps) {
  return (
    <div className="pj-space-y-8">
      <Suspense fallback={<div>Loading job...</div>}>
        <ApplicantsHeader jobId={params.id} />
        <ApplicantsFilters />
        <ApplicantsList jobId={params.id} />
      </Suspense>
      <ApplicantReceiptDrawer />
    </div>
  )
}
