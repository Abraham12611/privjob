import { JobOverviewHeader } from '@/components/employer/job-overview-header'
import { JobOverviewTabs } from '@/components/employer/job-overview-tabs'
import { Suspense } from 'react'

interface JobOverviewPageProps {
  params: { id: string }
  searchParams: { tab?: string }
}

export default function JobOverviewPage({ params, searchParams }: JobOverviewPageProps) {
  const activeTab = searchParams.tab || 'overview'

  return (
    <div className="pj-space-y-8">
      <Suspense fallback={<div>Loading job...</div>}>
        <JobOverviewHeader jobId={params.id} />
        <JobOverviewTabs jobId={params.id} activeTab={activeTab} />
      </Suspense>
    </div>
  )
}
