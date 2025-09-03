'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { mockCompanies } from '@/services/mock-data'

export function BrandRow() {
  return (
    <section className="pj-container pj-mx-auto pj-px-pj-gutter">
      <div className="pj-text-center pj-mb-8">
        <p className="pj-text-pj-text-muted pj-text-pj-sm">
          Trusted by leading companies
        </p>
      </div>
      
      <div className="pj-flex pj-justify-center pj-items-center pj-gap-pj-brand-gap pj-overflow-x-auto pj-pb-4">
        {mockCompanies.map((company) => (
          <Link
            key={company.id}
            href={`/jobs?company=${encodeURIComponent(company.name)}`}
            className="pj-flex-shrink-0 pj-focus-ring pj-rounded-full pj-transition-transform pj-duration-[var(--pj-hover-duration)] hover:pj--translate-y-1"
          >
            <div className="pj-bg-gray-50 pj-rounded-full pj-p-3 pj-border pj-border-pj-border-subtle">
              <Avatar className="pj-w-12 pj-h-12">
                <AvatarImage src={company.logoUrl} alt={`${company.name} logo`} />
                <AvatarFallback className="pj-text-pj-text-secondary pj-font-medium">
                  {company.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
