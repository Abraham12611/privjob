'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  Users, 
  AlertTriangle,
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export function EmployerSettingsCards() {
  const [notifications, setNotifications] = useState({
    newApplications: true,
    contactRequests: true,
    jobExpiring: true,
    weeklyReports: false
  })

  const [privacy, setPrivacy] = useState({
    showCompanyLogo: true,
    allowDirectContact: false,
    requireProofVerification: true
  })

  return (
    <div className="pj-space-y-6">
      {/* Company Profile */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Building2 className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Company Profile</h3>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-4">
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="TechCorp Inc."
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>
            
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Industry
              </label>
              <select className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring">
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
              Company Description
            </label>
            <textarea
              rows={3}
              defaultValue="Leading technology company focused on privacy-preserving solutions."
              className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
            />
          </div>

          <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-4">
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                <Globe className="pj-w-4 pj-h-4 pj-inline pj-mr-1" />
                Website
              </label>
              <input
                type="url"
                defaultValue="https://techcorp.com"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>
            
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                <MapPin className="pj-w-4 pj-h-4 pj-inline pj-mr-1" />
                Location
              </label>
              <input
                type="text"
                defaultValue="San Francisco, CA"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>
          </div>

          <div className="pj-flex pj-justify-end">
            <Button className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Mail className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Contact Information</h3>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-4">
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="hiring@techcorp.com"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>
            
            <div>
              <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              />
            </div>
          </div>

          <div className="pj-flex pj-justify-end">
            <Button className="pj-btn pj-btn--primary pj-px-4 pj-py-2">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Bell className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Notification Preferences</h3>
        </div>
        
        <div className="pj-space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="pj-flex pj-items-center pj-justify-between pj-py-2">
              <div>
                <span className="pj-text-pj-sm pj-font-medium">
                  {key === 'newApplications' && 'New Applications'}
                  {key === 'contactRequests' && 'Contact Requests'}
                  {key === 'jobExpiring' && 'Job Expiring Soon'}
                  {key === 'weeklyReports' && 'Weekly Reports'}
                </span>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">
                  {key === 'newApplications' && 'Get notified when candidates apply to your jobs'}
                  {key === 'contactRequests' && 'Get notified when candidates accept contact requests'}
                  {key === 'jobExpiring' && 'Get notified 7 days before job postings expire'}
                  {key === 'weeklyReports' && 'Receive weekly analytics reports via email'}
                </p>
              </div>
              <label className="pj-relative pj-inline-flex pj-items-center pj-cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="pj-sr-only pj-peer"
                />
                <div className="pj-w-11 pj-h-6 pj-bg-gray-200 peer-focus:pj-outline-none peer-focus:pj-ring-4 peer-focus:pj-ring-blue-300 pj-rounded-full pj-peer peer-checked:after:pj-translate-x-full peer-checked:after:pj-border-white after:pj-content-[''] after:pj-absolute after:pj-top-[2px] after:pj-left-[2px] after:pj-bg-white after:pj-border-gray-300 after:pj-border after:pj-rounded-full after:pj-h-5 after:pj-w-5 after:pj-transition-all peer-checked:pj-bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Shield className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Privacy Settings</h3>
        </div>
        
        <div className="pj-space-y-4">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="pj-flex pj-items-center pj-justify-between pj-py-2">
              <div>
                <span className="pj-text-pj-sm pj-font-medium">
                  {key === 'showCompanyLogo' && 'Show Company Logo'}
                  {key === 'allowDirectContact' && 'Allow Direct Contact'}
                  {key === 'requireProofVerification' && 'Require Proof Verification'}
                </span>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">
                  {key === 'showCompanyLogo' && 'Display your company logo on job postings'}
                  {key === 'allowDirectContact' && 'Allow candidates to contact you directly without verification'}
                  {key === 'requireProofVerification' && 'Require zero-knowledge proof verification for all applications'}
                </p>
              </div>
              <label className="pj-relative pj-inline-flex pj-items-center pj-cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="pj-sr-only pj-peer"
                />
                <div className="pj-w-11 pj-h-6 pj-bg-gray-200 peer-focus:pj-outline-none peer-focus:pj-ring-4 peer-focus:pj-ring-blue-300 pj-rounded-full pj-peer peer-checked:after:pj-translate-x-full peer-checked:after:pj-border-white after:pj-content-[''] after:pj-absolute after:pj-top-[2px] after:pj-left-[2px] after:pj-bg-white after:pj-border-gray-300 after:pj-border after:pj-rounded-full after:pj-h-5 after:pj-w-5 after:pj-transition-all peer-checked:pj-bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Billing & Subscription */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <CreditCard className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Billing & Subscription</h3>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-flex pj-items-center pj-justify-between pj-p-4 pj-bg-green-50 pj-border pj-border-green-200 pj-rounded-pj-button">
            <div>
              <span className="pj-text-pj-sm pj-font-medium pj-text-green-800">Pro Plan</span>
              <p className="pj-text-pj-xs pj-text-green-700">$99/month • Up to 50 job postings</p>
            </div>
            <span className="pj-text-pj-xs pj-px-2 pj-py-1 pj-bg-green-100 pj-text-green-800 pj-rounded-full">Active</span>
          </div>

          <div className="pj-flex pj-items-center pj-justify-between">
            <span className="pj-text-pj-sm">Next billing date</span>
            <span className="pj-text-pj-sm pj-text-pj-text-muted">January 15, 2024</span>
          </div>

          <div className="pj-flex pj-items-center pj-justify-between">
            <span className="pj-text-pj-sm">Payment method</span>
            <span className="pj-text-pj-sm pj-text-pj-text-muted">•••• •••• •••• 4242</span>
          </div>

          <div className="pj-flex pj-space-x-2">
            <Button variant="ghost" className="pj-btn pj-btn--ghost pj-px-4 pj-py-2">
              Update Payment
            </Button>
            <Button variant="ghost" className="pj-btn pj-btn--ghost pj-px-4 pj-py-2">
              View Invoices
            </Button>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Users className="pj-w-5 pj-h-5 pj-text-pj-action-blue pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold">Team Management</h3>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-flex pj-items-center pj-justify-between pj-p-3 pj-border pj-border-pj-border pj-rounded">
            <div className="pj-flex pj-items-center pj-space-x-3">
              <div className="pj-w-8 pj-h-8 pj-bg-pj-action-blue pj-text-white pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-medium">
                JD
              </div>
              <div>
                <span className="pj-text-pj-sm pj-font-medium">john@techcorp.com</span>
                <p className="pj-text-pj-xs pj-text-pj-text-muted">Admin • You</p>
              </div>
            </div>
            <span className="pj-text-pj-xs pj-px-2 pj-py-1 pj-bg-blue-100 pj-text-blue-800 pj-rounded">Owner</span>
          </div>

          <Button variant="ghost" className="pj-btn pj-btn--ghost pj-w-full pj-px-4 pj-py-2">
            Invite Team Member
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pj-card pj-p-6 pj-border-red-200">
        <div className="pj-flex pj-items-center pj-mb-4">
          <AlertTriangle className="pj-w-5 pj-h-5 pj-text-red-600 pj-mr-3" />
          <h3 className="pj-text-pj-lg pj-font-semibold pj-text-red-800">Danger Zone</h3>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-p-4 pj-bg-red-50 pj-border pj-border-red-200 pj-rounded">
            <h4 className="pj-text-pj-sm pj-font-medium pj-text-red-800 pj-mb-2">
              Delete Company Account
            </h4>
            <p className="pj-text-pj-xs pj-text-red-700 pj-mb-3">
              This will permanently delete your company account, all job postings, and applicant data. 
              This action cannot be undone.
            </p>
            <Button className="pj-btn pj-btn--error pj-px-4 pj-py-2">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
