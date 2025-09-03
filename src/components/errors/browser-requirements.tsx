'use client'

export function BrowserRequirements() {
  return (
    <ul className="pj-list-disc pj-list-inside pj-text-pj-text-secondary pj-card pj-p-6">
      <li>Service Workers enabled</li>
      <li>LocalStorage and IndexedDB allowed</li>
      <li>JavaScript enabled</li>
    </ul>
  )
}
