'use client'

import { AlertTriangle, Shield, Eye, Database, Users, Lock } from 'lucide-react'

export function PrivacyThreatModel() {
  const threats = [
    {
      icon: Eye,
      title: 'Identity exposure',
      description: 'Traditional job boards expose your identity to all employers',
      solution: 'Zero-knowledge proofs prove eligibility without revealing identity',
      status: 'protected'
    },
    {
      icon: Database,
      title: 'Data harvesting',
      description: 'Platforms collect and monetize your personal and professional data',
      solution: 'Your data never leaves your device - no central database to breach',
      status: 'protected'
    },
    {
      icon: Users,
      title: 'Employer discrimination',
      description: 'Bias based on name, photo, school, or other personal characteristics',
      solution: 'Employers see only qualification results, not personal details',
      status: 'protected'
    },
    {
      icon: Lock,
      title: 'Credential theft',
      description: 'Uploaded documents and certificates can be stolen or misused',
      solution: 'Cryptographic proofs validate credentials without exposing them',
      status: 'protected'
    }
  ]

  const limitations = [
    {
      icon: AlertTriangle,
      title: 'Network analysis',
      description: 'Blockchain transactions could potentially be linked to reveal patterns',
      mitigation: 'Use different devices/networks, consider additional privacy tools'
    },
    {
      icon: AlertTriangle,
      title: 'Metadata leakage',
      description: 'Timing and frequency of applications might reveal information',
      mitigation: 'Randomize application timing, batch multiple applications'
    },
    {
      icon: AlertTriangle,
      title: 'Device compromise',
      description: 'Malware or device access could expose private credentials',
      mitigation: 'Use secure devices, regular security updates, hardware wallets'
    }
  ]

  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16">
      <div className="pj-text-center pj-mb-12">
        <h2 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-4">
          Privacy threat model
        </h2>
        <p className="pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
          Understanding what privacy risks PrivJob protects against and current limitations.
        </p>
      </div>

      <div className="pj-grid pj-grid-cols-1 lg:pj-grid-cols-2 pj-gap-12">
        {/* Protected Against */}
        <div>
          <h3 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary pj-mb-6 pj-flex pj-items-center">
            <Shield className="pj-w-6 pj-h-6 pj-text-pj-chip-green pj-mr-2" />
            Protected against
          </h3>
          
          <div className="pj-space-y-6">
            {threats.map((threat, index) => (
              <div key={index} className="pj-card pj-p-6 pj-border-l-4 pj-border-pj-chip-green">
                <div className="pj-flex pj-items-start pj-space-x-4">
                  <div className="pj-w-10 pj-h-10 pj-bg-red-100 pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-flex-shrink-0">
                    <threat.icon className="pj-w-5 pj-h-5 pj-text-red-600" />
                  </div>
                  <div className="pj-flex-1">
                    <h4 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
                      {threat.title}
                    </h4>
                    <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-3">
                      <strong>Risk:</strong> {threat.description}
                    </p>
                    <p className="pj-text-pj-sm pj-text-pj-chip-green">
                      <strong>Protection:</strong> {threat.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div>
          <h3 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary pj-mb-6 pj-flex pj-items-center">
            <AlertTriangle className="pj-w-6 pj-h-6 pj-text-orange-500 pj-mr-2" />
            Current limitations
          </h3>
          
          <div className="pj-space-y-6">
            {limitations.map((limitation, index) => (
              <div key={index} className="pj-card pj-p-6 pj-border-l-4 pj-border-orange-500">
                <div className="pj-flex pj-items-start pj-space-x-4">
                  <div className="pj-w-10 pj-h-10 pj-bg-orange-100 pj-rounded-lg pj-flex pj-items-center pj-justify-center pj-flex-shrink-0">
                    <limitation.icon className="pj-w-5 pj-h-5 pj-text-orange-600" />
                  </div>
                  <div className="pj-flex-1">
                    <h4 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
                      {limitation.title}
                    </h4>
                    <p className="pj-text-pj-sm pj-text-pj-text-secondary pj-mb-3">
                      <strong>Concern:</strong> {limitation.description}
                    </p>
                    <p className="pj-text-pj-sm pj-text-orange-700">
                      <strong>Mitigation:</strong> {limitation.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pj-mt-12 pj-card pj-p-6 pj-bg-blue-50 pj-border-blue-200">
        <div className="pj-flex pj-items-start pj-space-x-4">
          <Shield className="pj-w-6 pj-h-6 pj-text-pj-action-blue pj-mt-1 pj-flex-shrink-0" />
          <div>
            <h4 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-2">
              Security best practices
            </h4>
            <ul className="pj-text-pj-sm pj-text-pj-text-secondary pj-space-y-1">
              <li>• Use PrivJob on a secure, updated device</li>
              <li>• Consider using a VPN or Tor for additional network privacy</li>
              <li>• Store important credentials in hardware wallets when possible</li>
              <li>• Regularly audit your applications and contact reveals</li>
              <li>• Report any suspicious activity to the PrivJob team</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
