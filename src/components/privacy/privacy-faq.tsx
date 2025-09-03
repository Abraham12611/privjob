'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function PrivacyFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: "How does zero-knowledge proof work in job applications?",
      answer: "Zero-knowledge proofs allow you to prove you meet job requirements (like having 5+ years experience) without revealing the exact details (like where you worked or your specific experience). The proof is mathematically verifiable but reveals no personal information."
    },
    {
      question: "What information do employers actually see?",
      answer: "Employers see only pass/fail results for each job requirement, the timestamp of your application, and proof verification status. They cannot see your identity, exact experience details, certificates, or any personal information until you choose to reveal it."
    },
    {
      question: "Can my applications be traced back to me?",
      answer: "Applications use cryptographic nullifiers that prevent linking multiple applications to the same person, while also preventing double applications to the same job. Your identity remains protected unless you explicitly choose to reveal it."
    },
    {
      question: "What happens if I want to share my contact information?",
      answer: "You have full control over when and with whom you share contact details. If an employer is interested, they can send a contact request. You can then choose to accept and reveal your information, or decline and remain anonymous."
    },
    {
      question: "How secure is my data on my device?",
      answer: "Your credentials and personal data are stored locally on your device and never transmitted to PrivJob servers. We recommend using secure, updated devices and considering hardware wallets for storing important credentials."
    },
    {
      question: "Can PrivJob see my private information?",
      answer: "No. PrivJob operates on a zero-knowledge architecture where your private credentials never leave your device. We cannot see your identity, experience details, certificates, or any personal information."
    },
    {
      question: "What if an employer wants to verify my credentials later?",
      answer: "During the hiring process, you can selectively reveal specific credentials or provide additional proofs as needed. You maintain control over what information to share and when."
    },
    {
      question: "Is this really more private than traditional job boards?",
      answer: "Yes. Traditional job boards require you to upload resumes, create profiles, and expose your identity to all employers. PrivJob proves your qualifications cryptographically without revealing any personal details until you choose to."
    }
  ]

  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-16">
      <div className="pj-text-center pj-mb-12">
        <h2 className="pj-text-pj-2xl pj-font-bold pj-text-pj-text-primary pj-mb-4">
          Frequently asked questions
        </h2>
        <p className="pj-text-pj-text-secondary pj-max-w-2xl pj-mx-auto">
          Common questions about how PrivJob protects your privacy during the job search process.
        </p>
      </div>

      <div className="pj-max-w-3xl pj-mx-auto">
        <div className="pj-space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="pj-card pj-border pj-border-pj-border">
              <button
                className="pj-w-full pj-p-6 pj-text-left pj-flex pj-items-center pj-justify-between pj-focus-ring"
                onClick={() => toggleItem(index)}
              >
                <h3 className="pj-text-pj-lg pj-font-semibold pj-text-pj-text-primary pj-pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-flex-shrink-0" />
                ) : (
                  <ChevronDown className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="pj-px-6 pj-pb-6">
                  <p className="pj-text-pj-text-secondary pj-leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
