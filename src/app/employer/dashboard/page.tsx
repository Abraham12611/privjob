import { DashboardHeader } from '@/components/employer/dashboard-header'
import { DashboardFilters } from '@/components/employer/dashboard-filters'
import { JobCardsGrid } from '@/components/employer/job-cards-grid'

export default function EmployerDashboardPage() {
  return (
    <div className="pj-space-y-6">
      <DashboardHeader />
      <DashboardFilters />
      <JobCardsGrid />
    </div>
  )
}
