'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function ContactsFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filterOptions = [
    {
      id: 'status',
      label: 'Status',
      options: ['Pending', 'Accepted', 'Declined', 'Expired']
    },
    {
      id: 'company',
      label: 'Company',
      options: ['TechCorp', 'DataFlow', 'CloudScale', 'InnovateLab']
    },
    {
      id: 'channel',
      label: 'Channel',
      options: ['PrivInbox', 'Email']
    },
    {
      id: 'date',
      label: 'Received',
      options: ['Last 7 days', 'Last 30 days', 'Last 3 months']
    }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'company', label: 'By company' },
    { value: 'status', label: 'By status' }
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
