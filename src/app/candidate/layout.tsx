import { CandidateNav } from '@/components/candidate/candidate-nav'

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <CandidateNav />
      <div className="pj-mt-8">
        {children}
      </div>
    </div>
  )
}
