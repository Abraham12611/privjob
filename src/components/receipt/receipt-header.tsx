'use client'

interface Props { txid: string }

export function ReceiptHeader({ txid }: Props) {
  return (
    <div className="pj-flex pj-items-center pj-justify-between">
      <h1 className="pj-text-pj-xl pj-font-semibold">Application Receipt</h1>
      <code className="pj-text-pj-sm pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">{txid}</code>
    </div>
  )
}
