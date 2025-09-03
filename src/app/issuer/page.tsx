import { IssuerStudioHeader } from '@/components/issuer/issuer-studio-header'
import { CertFamilySelector } from '@/components/issuer/cert-family-selector'
import { AttestationMinter } from '@/components/issuer/attestation-minter'
import { IssuerDemo } from '@/components/issuer/issuer-demo'

export default function IssuerPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8 pj-space-y-8">
      <IssuerStudioHeader />
      <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-2 pj-gap-8">
        <div className="pj-space-y-6">
          <CertFamilySelector />
          <AttestationMinter />
        </div>
        <div>
          <IssuerDemo />
        </div>
      </div>
    </div>
  )
}
