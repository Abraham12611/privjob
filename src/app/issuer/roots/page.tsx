import { RootManagementHeader } from '@/components/issuer/root-management/root-management-header'
import { RootsTable } from '@/components/issuer/root-management/roots-table'
import { PublishRootModal } from '@/components/issuer/root-management/publish-root-modal'

export default function RootManagementPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8 pj-space-y-8">
      <RootManagementHeader />
      <RootsTable />
      <PublishRootModal />
    </div>
  )
}
