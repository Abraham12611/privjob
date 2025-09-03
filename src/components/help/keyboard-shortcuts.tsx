'use client'

export function KeyboardShortcuts() {
  return (
    <section className="pj-card pj-p-6">
      <h2 className="pj-text-pj-xl pj-font-semibold pj-mb-2">Keyboard Shortcuts</h2>
      <ul className="pj-text-pj-sm pj-text-pj-text-secondary pj-space-y-1">
        <li><code className="pj-bg-gray-100 pj-px-1 pj-rounded">/</code> Focus search</li>
        <li><code className="pj-bg-gray-100 pj-px-1 pj-rounded">g</code> Go to jobs</li>
        <li><code className="pj-bg-gray-100 pj-px-1 pj-rounded">v</code> Open vault</li>
      </ul>
    </section>
  )
}
