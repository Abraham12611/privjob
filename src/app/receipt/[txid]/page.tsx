import { ReceiptHeader } from '@/components/receipt/receipt-header'
import { ReceiptDetails } from '@/components/receipt/receipt-details'
import { ReceiptCriteria } from '@/components/receipt/receipt-criteria'
import { ReceiptPrivacy } from '@/components/receipt/receipt-privacy'
import { Suspense } from 'react'

interface ReceiptPageProps {
  params: { txid: string }
}

export default function ReceiptPage({ params }: ReceiptPageProps) {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <Suspense fallback={<div>Loading receipt...</div>}>
        <ReceiptHeader txid={params.txid} />
        <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-3 pj-gap-8 pj-mt-8">
          <div className="lg:pj-col-span-2 pj-space-y-6">
            <ReceiptDetails txid={params.txid} />
            <ReceiptCriteria txid={params.txid} />
          </div>
          <div>
            <ReceiptPrivacy />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
