import { PrivacyHero } from '@/components/privacy/privacy-hero'
import { PrivacyTiles } from '@/components/privacy/privacy-tiles'
import { PrivacyLifecycle } from '@/components/privacy/privacy-lifecycle'
import { PrivacyThreatModel } from '@/components/privacy/privacy-threat-model'
import { PrivacyFAQ } from '@/components/privacy/privacy-faq'
import { PrivacyLearnMore } from '@/components/privacy/privacy-learn-more'

export default function PrivacyPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8 pj-space-y-12">
      <PrivacyHero />
      <PrivacyTiles />
      <PrivacyLifecycle />
      <PrivacyThreatModel />
      <PrivacyFAQ />
      <PrivacyLearnMore />
    </div>
  )
}
