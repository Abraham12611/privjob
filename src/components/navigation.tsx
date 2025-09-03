'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  
  const isCandidate = pathname.startsWith('/candidate')
  const isEmployer = pathname.startsWith('/employer')
  
  return (
    <header className="pj-bg-pj-card-bg pj-border-b pj-border-pj-border pj-sticky pj-top-0 pj-z-50">
      <div className="pj-container pj-mx-auto pj-px-pj-gutter">
        <div className="pj-flex pj-items-center pj-justify-between pj-h-16">
          {/* Logo */}
          <Link href="/" className="pj-flex pj-items-center pj-space-x-2 pj-focus-ring">
            <div className="pj-w-8 pj-h-8 pj-bg-pj-action-blue pj-rounded-lg pj-flex pj-items-center pj-justify-center">
              <span className="pj-text-pj-text-inverse pj-font-bold pj-text-sm">P</span>
            </div>
            <span className="pj-font-bold pj-text-pj-lg">PrivJob</span>
          </Link>

          {/* Main Navigation */}
          <nav className="pj-hidden md:pj-flex pj-items-center pj-space-x-8">
            <Link 
              href="/jobs" 
              className={`pj-text-pj-md pj-transition-colors pj-focus-ring ${
                pathname.startsWith('/jobs') 
                  ? 'pj-text-pj-text-primary pj-font-medium' 
                  : 'pj-text-pj-text-secondary hover:pj-text-pj-text-primary'
              }`}
            >
              Jobs
            </Link>
            <Link 
              href="/privacy" 
              className={`pj-text-pj-md pj-transition-colors pj-focus-ring ${
                pathname === '/privacy' 
                  ? 'pj-text-pj-text-primary pj-font-medium' 
                  : 'pj-text-pj-text-secondary hover:pj-text-pj-text-primary'
              }`}
            >
              Privacy
            </Link>
            <Link 
              href="/help" 
              className={`pj-text-pj-md pj-transition-colors pj-focus-ring ${
                pathname === '/help' 
                  ? 'pj-text-pj-text-primary pj-font-medium' 
                  : 'pj-text-pj-text-secondary hover:pj-text-pj-text-primary'
              }`}
            >
              Help
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="pj-flex pj-items-center pj-space-x-4">
            {!isCandidate && !isEmployer && (
              <>
                <Link href="/employer/jobs/new">
                  <Button variant="ghost" size="sm" className="pj-text-pj-action-blue">
                    For Employers
                  </Button>
                </Link>
                <Link href="/candidate/vault">
                  <Button size="sm" className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            
            {(isCandidate || isEmployer) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="pj-flex pj-items-center pj-space-x-2 pj-focus-ring pj-rounded-full">
                    <Avatar className="pj-w-8 pj-h-8">
                      <div className="pj-w-full pj-h-full pj-bg-pj-chip-purple pj-rounded-full pj-flex pj-items-center pj-justify-center">
                        <User className="pj-w-4 pj-h-4 pj-text-white" />
                      </div>
                    </Avatar>
                    <span className="pj-text-pj-sm pj-text-pj-text-secondary pj-hidden sm:pj-block">
                      {isCandidate ? 'candidate_user' : 'employer_org'}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="pj-w-56">
                  {isCandidate && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/candidate/vault" className="pj-flex pj-items-center">
                          <User className="pj-mr-2 pj-h-4 pj-w-4" />
                          Credential Vault
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/candidate/apps" className="pj-flex pj-items-center">
                          <User className="pj-mr-2 pj-h-4 pj-w-4" />
                          My Applications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/candidate/contacts" className="pj-flex pj-items-center">
                          <User className="pj-mr-2 pj-h-4 pj-w-4" />
                          Contact Requests
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/candidate/settings" className="pj-flex pj-items-center">
                          <Settings className="pj-mr-2 pj-h-4 pj-w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {isEmployer && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/employer" className="pj-flex pj-items-center">
                          <User className="pj-mr-2 pj-h-4 pj-w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/employer/jobs/new" className="pj-flex pj-items-center">
                          <User className="pj-mr-2 pj-h-4 pj-w-4" />
                          Post a Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/employer/settings" className="pj-flex pj-items-center">
                          <Settings className="pj-mr-2 pj-h-4 pj-w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="pj-mr-2 pj-h-4 pj-w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
