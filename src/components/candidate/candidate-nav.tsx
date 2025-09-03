'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, FileText, Users, Settings } from 'lucide-react'

export function CandidateNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/candidate/credentials',
      label: 'Credentials',
      icon: Shield,
      description: 'Your verified credentials'
    },
    {
      href: '/candidate/applications',
      label: 'Applications',
      icon: FileText,
      description: 'Track your job applications'
    },
    {
      href: '/contact',
      label: 'Contacts',
      icon: Users,
      description: 'Employer contact requests'
    },
    {
      href: '/settings/privacy',
      label: 'Settings',
      icon: Settings,
      description: 'Account and privacy settings'
    }
  ]

  return (
    <nav className="pj-border-b pj-border-pj-border pj-mb-8">
      <div className="pj-flex pj-space-x-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href
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
