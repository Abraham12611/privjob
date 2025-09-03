import { VaultHeader } from '@/components/candidate/vault/vault-header'
import { VaultActions } from '@/components/candidate/vault/vault-actions'
import { VaultFilters } from '@/components/candidate/vault/vault-filters'
import { AttestationsGrid } from '@/components/candidate/vault/attestations-grid'
import { AttestationDrawer } from '@/components/candidate/vault/attestation-drawer'
import { ImportAttestationModal } from '@/components/modals/import-attestation-modal'
import { Suspense } from 'react'

export default function VaultPage() {
  return (
    <div className="pj-space-y-8">
      <VaultHeader />
      <VaultActions />
      <VaultFilters />
      <Suspense fallback={<div>Loading attestations...</div>}>
        <AttestationsGrid />
      </Suspense>
      <AttestationDrawer />
      <ImportAttestationModal />
    </div>
  )
}
