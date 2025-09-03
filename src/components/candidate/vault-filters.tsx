'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function VaultFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filterOptions = [
    {
      id: 'type',
      label: 'Type',
      options: ['Education', 'Experience', 'Certification', 'Skill']
    },
    {
      id: 'status',
      label: 'Status',
      options: ['Valid', 'Expired', 'Revoked']
    },
    {
      id: 'issuer',
      label: 'Issuer',
      options: ['University', 'Company', 'Certification Body']
    },
    {
      id: 'date',
      label: 'Date Added',
      options: ['Last 7 days', 'Last 30 days', 'Last year']
    }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'type', label: 'By type' },
    { value: 'issuer', label: 'By issuer' }
  ]

  return (
    <div className="pj-flex pj-flex-wrap pj-items-center pj-gap-pj-filter-gap pj-mb-6">
      {filterOptions.map((filter) => (
        <button
          key={filter.id}
          className={`pj-filter-chip ${
            activeFilters.includes(filter.id) ? 'pj-filter-chip--active' : ''
          }`}
        >
          {filter.label}
          <ChevronDown className="pj-ml-1 pj-h-3 pj-w-3" />
        </button>
      ))}
      
      <div className="pj-ml-auto pj-flex pj-items-center pj-gap-2">
        <span className="pj-text-pj-sm pj-text-pj-text-muted">Sort by:</span>
        <select className="pj-bg-pj-card-bg pj-border pj-border-pj-border pj-rounded-pj-chip pj-px-3 pj-py-1 pj-text-pj-sm pj-focus-ring">
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
