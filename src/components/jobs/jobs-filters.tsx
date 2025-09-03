'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function JobsFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filterOptions = [
    {
      id: 'type',
      label: 'Type',
      options: ['Full Time', 'Part Time', 'Contract', 'Freelance']
    },
    {
      id: 'seniority',
      label: 'Seniority',
      options: ['Junior', 'Mid', 'Senior', 'Lead', 'Head']
    },
    {
      id: 'location',
      label: 'Location',
      options: ['Remote', 'Hybrid', 'Onsite']
    },
    {
      id: 'time',
      label: 'Posted',
      options: ['Last 24h', 'Last week', 'Last month']
    }
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'salary-high', label: 'Salary: High to Low' }
  ]

  return (
    <div className="pj-flex pj-flex-wrap pj-items-center pj-gap-pj-filter-gap">
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
