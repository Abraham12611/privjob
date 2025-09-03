import { JobHeader } from '@/components/job-details/job-header'
import { JobContent } from '@/components/job-details/job-content'
import { JobAside } from '@/components/job-details/job-aside'
import { ProofBuilderModal } from '@/components/modals/proof-builder-modal'
import { Suspense } from 'react'

interface JobDetailsPageProps {
  params: { id: string }
  searchParams: { apply?: string }
}

export default function JobDetailsPage({ params, searchParams }: JobDetailsPageProps) {
  const showProofBuilder = searchParams.apply === 'true'

  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <Suspense fallback={<div>Loading job details...</div>}>
        <JobHeader jobId={params.id} />
        <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-7 pj-gap-8 pj-mt-8">
          <div className="lg:pj-col-span-5">
            <JobContent jobId={params.id} />
          </div>
          <div className="lg:pj-col-span-2">
            <JobAside jobId={params.id} />
          </div>
        </div>
      </Suspense>
      {showProofBuilder && <ProofBuilderModal jobId={params.id} />}
    </div>
  )
}
