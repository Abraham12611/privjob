import { PostJobWizard } from '@/components/employer/post-job-wizard'
import { PostJobAside } from '@/components/employer/post-job-aside'

export default function PostJobPage() {
  return (
    <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-4 pj-gap-8">
      <div className="lg:pj-col-span-3">
        <PostJobWizard />
      </div>
      <div className="lg:pj-col-span-1">
        <PostJobAside />
      </div>
    </div>
  )
}
