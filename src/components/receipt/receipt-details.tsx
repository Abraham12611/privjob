'use client'

interface Props { txid: string }

export function ReceiptDetails({ txid }: Props) {
  return (
    <section className="pj-card pj-p-6">
      <h2 className="pj-text-pj-lg pj-font-semibold pj-mb-2">Details</h2>
      <p className="pj-text-pj-text-secondary">Transaction: {txid}</p>
    </section>
  )
}
