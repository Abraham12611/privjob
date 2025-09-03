'use client'

import { Shield, Lock, Eye } from 'lucide-react'

export function PrivacyHero() {
  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16">
      <div className="pj-text-center pj-max-w-4xl pj-mx-auto">
        <div className="pj-flex pj-justify-center pj-mb-6">
          <div className="pj-w-16 pj-h-16 pj-bg-pj-action-blue pj-rounded-full pj-flex pj-items-center pj-justify-center">
            <Shield className="pj-w-8 pj-h-8 pj-text-white" />
          </div>
        </div>
        
        <h1 className="pj-text-pj-3xl md:pj-text-pj-4xl pj-font-bold pj-text-pj-text-primary pj-mb-6">
          Privacy-first job applications
        </h1>
        
        <p className="pj-text-pj-xl pj-text-pj-text-secondary pj-mb-8 pj-leading-relaxed">
          PrivJob uses zero-knowledge proofs to verify your qualifications without revealing your identity, 
          experience details, or personal information to employers.
        </p>
        
        <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-8 pj-mt-12">
          <div className="pj-text-center">
            <div className="pj-w-12 pj-h-12 pj-bg-pj-chip-green pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-mx-auto pj-mb-4">
              <Lock className="pj-w-6 pj-h-6 pj-text-white" />
            </div>
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-2">Your data stays private</h3>
            <p className="pj-text-pj-text-secondary">
              Credentials and personal details never leave your device
            </p>
          </div>
          
          <div className="pj-text-center">
            <div className="pj-w-12 pj-h-12 pj-bg-pj-action-blue pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-mx-auto pj-mb-4">
              <Shield className="pj-w-6 pj-h-6 pj-text-white" />
            </div>
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-2">Cryptographic proofs</h3>
            <p className="pj-text-pj-text-secondary">
              Mathematically prove eligibility without revealing details
            </p>
          </div>
          
          <div className="pj-text-center">
            <div className="pj-w-12 pj-h-12 pj-bg-pj-chip-yellow pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-mx-auto pj-mb-4">
              <Eye className="pj-w-6 pj-h-6 pj-text-white" />
            </div>
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-2">Selective disclosure</h3>
            <p className="pj-text-pj-text-secondary">
              Choose what to reveal and when during the hiring process
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
