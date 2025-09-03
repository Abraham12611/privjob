'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

export function HelpTOC() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { id: 'quickstart', title: 'Quick Start Guide' },
        { id: 'demo-script', title: 'Demo Script' },
        { id: 'first-application', title: 'Your First Application' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      items: [
        { id: 'how-privacy-works', title: 'How Privacy Works' },
        { id: 'threat-model', title: 'Threat Model' },
        { id: 'best-practices', title: 'Security Best Practices' }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      items: [
        { id: 'candidate-vault', title: 'Candidate Vault' },
        { id: 'zk-proofs', title: 'Zero-Knowledge Proofs' },
        { id: 'contact-requests', title: 'Contact Requests' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      items: [
        { id: 'common-issues', title: 'Common Issues' },
        { id: 'browser-support', title: 'Browser Support' },
        { id: 'performance', title: 'Performance Tips' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Reference',
      items: [
        { id: 'api-reference', title: 'API Reference' },
        { id: 'midnight-integration', title: 'Midnight Integration' },
        { id: 'compact-contracts', title: 'Compact Contracts' }
      ]
    }
  ]

  return (
    <nav className="pj-sticky pj-top-6 pj-space-y-2">
      <h2 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-mb-4">
        Table of Contents
      </h2>
      
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => toggleSection(section.id)}
            className="pj-flex pj-items-center pj-justify-between pj-w-full pj-p-2 pj-text-left pj-text-pj-sm pj-font-medium pj-text-pj-text-primary hover:pj-bg-gray-50 pj-rounded pj-focus-ring"
          >
            {section.title}
            {expandedSections.includes(section.id) ? (
              <ChevronDown className="pj-w-4 pj-h-4" />
            ) : (
              <ChevronRight className="pj-w-4 pj-h-4" />
            )}
          </button>
          
          {expandedSections.includes(section.id) && (
            <div className="pj-ml-4 pj-mt-1 pj-space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="pj-block pj-w-full pj-p-2 pj-text-left pj-text-pj-sm pj-text-pj-text-secondary hover:pj-text-pj-action-blue hover:pj-bg-gray-50 pj-rounded pj-focus-ring"
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
