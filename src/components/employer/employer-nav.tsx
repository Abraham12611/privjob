'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Plus, Users, Settings } from 'lucide-react'

export function EmployerNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/employer',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Overview and analytics'
    },
    {
      href: '/employer/jobs/new',
      label: 'Post Job',
      icon: Plus,
      description: 'Create new job posting'
    },
    {
      href: '/employer/jobs',
      label: 'Jobs',
      icon: Users,
      description: 'Manage job postings'
    },
    {
      href: '/employer/settings',
      label: 'Settings',
      icon: Settings,
      description: 'Organization settings'
    }
  ]

  return (
    <nav className="pj-border-b pj-border-pj-border pj-mb-8">
      <div className="pj-flex pj-space-x-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/employer/jobs' && pathname.startsWith('/employer/jobs/') && pathname !== '/employer/jobs/new')
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`pj-flex pj-items-center pj-space-x-2 pj-px-1 pj-py-4 pj-border-b-2 pj-transition-colors ${
                isActive
                  ? 'pj-border-pj-action-blue pj-text-pj-action-blue'
                  : 'pj-border-transparent pj-text-pj-text-secondary hover:pj-text-pj-text-primary hover:pj-border-gray-300'
              }`}
            >
              <Icon className="pj-w-4 pj-h-4" />
              <span className="pj-font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
