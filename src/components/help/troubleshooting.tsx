'use client'

export function Troubleshooting() {
  return (
    <section className="pj-card pj-p-6">
      <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-2">Troubleshooting</h2>
      <ul className="pj-list-disc pj-list-inside pj-text-pj-text-secondary pj-space-y-1">
        <li>Refresh the page if mock API requests fail randomly (intentional for demo).</li>
        <li>Ensure Service Workers are enabled for MSW to function in dev.</li>
        <li>Clear cache if UI styles look incorrect.</li>
      </ul>
    </section>
  )
}
