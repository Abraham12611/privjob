'use client'

import { ArrowRight, User, FileText, Shield, Eye, CheckCircle } from 'lucide-react'

export function PrivacyLifecycle() {
  const steps = [
    {
      icon: User,
      title: 'You apply privately',
      description: 'Generate a zero-knowledge proof using your private credentials',
      details: ['Credentials stay on your device', 'Proof generated locally', 'No identity revealed']
    },
    {
      icon: Shield,
      title: 'Proof gets verified',
      description: 'The blockchain validates your proof without seeing your data',
      details: ['Cryptographic verification', 'Pass/fail results recorded', 'Mathematically secure']
    },
    {
      icon: Eye,
      title: 'Employer sees results',
      description: 'Employer knows you meet requirements but not your identity',
      details: ['Only eligibility shown', 'No personal details', 'Anonymous application']
    },
    {
      icon: CheckCircle,
      title: 'You choose to reveal',
      description: 'Selectively share contact info only with interested employers',
      details: ['You control disclosure', 'Share when ready', 'Direct communication']
    }
  ]

  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16 pj-bg-gray-50">
      <div className="pj-text-center pj-mb-12">
        <h2 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-4">
          How the privacy-preserving process works
        </h2>
        <p className="pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
          From application to hire, your privacy is protected at every step of the process.
        </p>
      </div>

      <div className="pj-max-w-4xl pj-mx-auto">
        <div className="pj-relative">
          {/* Connection line */}
          <div className="pj-hidden md:pj-block pj-absolute pj-top-16 pj-left-0 pj-right-0 pj-h-0.5 pj-bg-gray-300 pj-z-0"></div>
          
          <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-4 pj-gap-8 pj-relative pj-z-10">
            {steps.map((step, index) => (
              <div key={index} className="pj-text-center">
                <div className="pj-w-16 pj-h-16 pj-bg-white pj-border-4 pj-border-pj-action-blue pj-rounded-full pj-flex pj-items-center pj-justify-center pj-mx-auto pj-mb-4">
                  <step.icon className="pj-w-6 pj-h-6 pj-text-pj-action-blue" />
                </div>
                
                <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
                  {step.title}
                </h3>
                
                <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-4">
                  {step.description}
                </p>
                
                <ul className="pj-space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="pj-text-pj-xs pj-text-pj-text-muted">
                      {detail}
                    </li>
                  ))}
                </ul>
                
                {index < steps.length - 1 && (
                  <div className="pj-flex pj-justify-center pj-mt-6 md:pj-hidden">
                    <ArrowRight className="pj-w-5 pj-h-5 pj-text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
