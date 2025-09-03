'use client'

import { Shield, Monitor, Zap } from 'lucide-react'

export function PrivacyTiles() {
  const tiles = [
    {
      icon: Monitor,
      title: 'On-chain state',
      description: 'Job criteria, pass/fail results, and timestamps are publicly visible on the blockchain.',
      items: ['Job requirements', 'Application results', 'Verification timestamps']
    },
    {
      icon: Shield,
      title: 'Your device',
      description: 'Attestations, experience details, and personal data never leave your browser.',
      items: ['Private credentials', 'Years of experience', 'Certificate details']
    },
    {
      icon: Zap,
      title: 'Zero-knowledge proof',
      description: 'Cryptographic proof validates your eligibility without revealing any sensitive information.',
      items: ['Proves requirements met', 'No identity revealed', 'Mathematically secure']
    }
  ]

  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter">
      <div className="pj-text-center pj-mb-12">
        <h2 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-4">
          How privacy works
        </h2>
        <p className="pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
          PrivJob uses zero-knowledge proofs to verify your qualifications while keeping your personal data completely private.
        </p>
      </div>

      <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-8">
        {tiles.map((tile, index) => (
          <div key={index} className="pj-card pj-p-6 pj-text-center">
            <div className="pj-flex pj-justify-center pj-mb-4">
              <div className="pj-w-12 pj-h-12 pj-bg-pj-action-blue pj-rounded-lg pj-flex pj-items-center pj-justify-center">
                <tile.icon className="pj-w-6 pj-h-6 pj-text-white" />
              </div>
            </div>
            
            <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-3">
              {tile.title}
            </h3>
            
            <p className="pj-text-pj-text-secondary pj-mb-4">
              {tile.description}
            </p>
            
            <ul className="pj-space-y-2">
              {tile.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pj-text-pj-sm pj-text-pj-text-muted pj-flex pj-items-center pj-justify-center">
                  <span className="pj-w-1 pj-h-1 pj-bg-pj-text-muted pj-rounded-full pj-mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
