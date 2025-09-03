import { EmployerNav } from '@/components/employer/employer-nav'

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <EmployerNav />
      <div className="pj-mt-8">
        {children}
      </div>
    </div>
  )
}
