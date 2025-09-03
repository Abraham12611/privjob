import { Hero } from '@/components/landing/hero'
import { BrandRow } from '@/components/landing/brand-row'
import { PrivacyTiles } from '@/components/landing/privacy-tiles'
import { Callouts } from '@/components/landing/callouts'

export default function LandingPage() {
  return (
    <div className="pj-space-y-16 pj-py-8">
      <Hero />
      <BrandRow />
      <PrivacyTiles />
      <Callouts />
    </div>
  )
}
