import { UnsupportedBrowserCard } from '@/components/errors/unsupported-browser-card'
import { BrowserRequirements } from '@/components/errors/browser-requirements'
import { AlternativeOptions } from '@/components/errors/alternative-options'

export default function UnsupportedPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16">
      <div className="pj-max-w-2xl pj-mx-auto pj-space-y-8">
        <UnsupportedBrowserCard />
        <BrowserRequirements />
        <AlternativeOptions />
      </div>
    </div>
  )
}
