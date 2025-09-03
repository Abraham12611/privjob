'use client'

import { Lightbulb, Shield, Users, Zap } from 'lucide-react'

export function PostJobAside() {
  const tips = [
    {
      icon: Shield,
      title: 'Privacy-First Hiring',
      description: 'Candidates prove qualifications without revealing identity, reducing bias and protecting privacy.',
      items: [
        'See only pass/fail results for criteria',
        'No personal details until contact accepted',
        'Mathematically verified qualifications'
      ]
    },
    {
      icon: Users,
      title: 'Better Candidates',
      description: 'Zero-knowledge proofs attract privacy-conscious professionals who value security.',
      items: [
        'Tech-savvy candidates',
        'Privacy-aware professionals',
        'Quality over quantity applications'
      ]
    },
    {
      icon: Zap,
      title: 'Efficient Process',
      description: 'Automated verification saves time on initial screening and qualification checks.',
      items: [
        'Instant qualification verification',
        'Reduced manual screening',
        'Focus on qualified candidates only'
      ]
    }
  ]

  return (
    <div className="pj-space-y-6">
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Lightbulb className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-2" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Tips for Success</h3>
        </div>
        
        <div className="pj-space-y-4 pj-text-pj-sm">
          <div>
            <h4 className="pj-font-medium pj-mb-2">Be Specific with Criteria</h4>
            <p className="pj-text-pj-text-secondary">
              Set clear, verifiable requirements. Candidates can only prove what they actually have.
            </p>
          </div>
          
          <div>
            <h4 className="pj-font-medium pj-mb-2">Focus on Skills, Not Background</h4>
            <p className="pj-text-pj-text-secondary">
              Emphasize technical abilities and experience over personal characteristics.
            </p>
          </div>
          
          <div>
            <h4 className="pj-font-medium pj-mb-2">Reasonable Experience Requirements</h4>
            <p className="pj-text-pj-text-secondary">
              Set minimum experience that matches the role complexity to get quality applications.
            </p>
          </div>
        </div>
      </div>

      {tips.map((tip, index) => (
        <div key={index} className="pj-card pj-p-6">
          <div className="pj-flex pj-items-center pj-mb-3">
            <tip.icon className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-2" />
            <h3 className="pj-text-pj-lg pj-font-semibold">{tip.title}</h3>
          </div>
          
          <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-3">
            {tip.description}
          </p>
          
          <ul className="pj-space-y-1">
            {tip.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pj-flex pj-items-start pj-text-pj-xs">
                <span className="pj-w-1 pj-h-1 pj-bg-pj-action-blue pj-rounded-full pj-mt-2 pj-mr-2 pj-flex-shrink-0"></span>
                <span className="pj-text-pj-text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="pj-card pj-p-6 pj-bg-orange-50 pj-border-orange-200">
        <div className="pj-flex pj-items-start pj-space-x-3">
          <Lightbulb className="pj-w-5 pj-h-5 pj-text-orange-600 pj-mt-0.5 pj-flex-shrink-0" />
          <div>
            <h4 className="pj-text-pj-sm pj-font-medium pj-text-orange-800 pj-mb-2">
              Demo Environment
            </h4>
            <p className="pj-text-pj-xs pj-text-orange-700">
              This is a demonstration. Job postings and applications are simulated for testing purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
