'use client'

import { Database, Shield, Zap, Eye, Lock, Users } from 'lucide-react'

export function PrivacyTiles() {
  const tiles = [
    {
      icon: Database,
      title: 'On-chain (Public)',
      description: 'Publicly visible information stored on the Midnight blockchain',
      items: [
        'Job posting ID and criteria',
        'Pass/fail results for each requirement',
        'Proof verification status',
        'Application timestamp',
        'Nullifier (prevents double applications)'
      ],
      color: 'pj-bg-orange-100 pj-border-orange-200'
    },
    {
      icon: Lock,
      title: 'Your Device (Private)',
      description: 'Sensitive data that never leaves your browser or device',
      items: [
        'Your real identity and contact info',
        'Exact years of experience',
        'Certificate details and credentials',
        'Education history and transcripts',
        'Previous employer information'
      ],
      color: 'pj-bg-blue-100 pj-border-blue-200'
    },
    {
      icon: Zap,
      title: 'Zero-Knowledge Proof',
      description: 'Cryptographic proof that validates requirements without revealing data',
      items: [
        'Proves you meet minimum experience',
        'Validates certificate authenticity',
        'Confirms education requirements',
        'No personal details leaked',
        'Mathematically verifiable'
      ],
      color: 'pj-bg-green-100 pj-border-green-200'
    }
  ]

  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16">
      <div className="pj-text-center pj-mb-12">
        <h2 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-4">
          What's public vs private
        </h2>
        <p className="pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
          Understanding exactly what information is shared and what stays private during the application process.
        </p>
      </div>

      <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-3 pj-gap-8">
        {tiles.map((tile, index) => (
          <div key={index} className={`pj-card pj-p-6 pj-border-2 ${tile.color}`}>
            <div className="pj-flex pj-items-center pj-mb-4">
              <div className="pj-w-10 pj-h-10 pj-bg-white pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-mr-3">
                <tile.icon className="pj-w-5 pj-h-5 pj-text-gray-600" />
              </div>
              <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary">
                {tile.title}
              </h3>
            </div>
            
            <p className="pj-text-pj-text-secondary pj-mb-4">
              {tile.description}
            </p>
            
            <ul className="pj-space-y-2">
              {tile.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pj-flex pj-items-start pj-text-pj-sm">
                  <span className="pj-w-1.5 pj-h-1.5 pj-bg-gray-400 pj-rounded-full pj-mt-2 pj-mr-3 pj-flex-shrink-0"></span>
                  <span className="pj-text-pj-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
