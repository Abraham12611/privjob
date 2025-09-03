import { HelpHeader } from '@/components/help/help-header'
import { HelpTOC } from '@/components/help/help-toc'
import { Quickstart } from '@/components/help/quickstart'
import { DemoScript } from '@/components/help/demo-script'
import { Troubleshooting } from '@/components/help/troubleshooting'
import { KeyboardShortcuts } from '@/components/help/keyboard-shortcuts'
import { Accessibility } from '@/components/help/accessibility'
import { LicenseRepo } from '@/components/help/license-repo'

export default function HelpPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <HelpHeader />
      <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-4 pj-gap-8 pj-mt-8">
        <div className="lg:pj-col-span-1">
          <HelpTOC />
        </div>
        <div className="lg:pj-col-span-3 pj-space-y-12">
          <Quickstart />
          <DemoScript />
          <Troubleshooting />
          <KeyboardShortcuts />
          <Accessibility />
          <LicenseRepo />
        </div>
      </div>
    </div>
  )
}
