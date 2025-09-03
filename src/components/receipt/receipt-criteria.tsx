'use client'

interface Props { txid: string }

export function ReceiptCriteria({ txid }: Props) {
  return (
    <section className="pj-card pj-p-6">
      <h2 className="pj-text-pj-lg pj-font-semibold pj-mb-2">Criteria Results</h2>
      <ul className="pj-list-disc pj-list-inside pj-text-pj-text-secondary">
        <li>Minimum experience: Pass</li>
        <li>Certification group: Pass</li>
        <li>Cutoff date: Pass</li>
      </ul>
    </section>
  )
}
