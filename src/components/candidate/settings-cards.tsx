'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Vault, Bell, Shield, Lock, AlertTriangle } from 'lucide-react'

export function SettingsCards() {
  const [settings, setSettings] = useState({
    handle: 'anon_candidate_42',
    keyFingerprint: 'A1B2C3D4E5F6',
    vault: {
      encrypted: true,
      lastBackupAt: '2024-01-15T10:30:00Z'
    },
    notifications: {
      contactRequests: true,
      email: 'user@example.com'
    },
    privacy: {
      telemetry: false,
      reducedMotion: false
    },
    security: {
      autoLockMinutes: 30
    }
  })

  const handleToggle = (section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !prev[section as keyof typeof prev][key as keyof any]
      }
    }))
  }

  return (
    <div className="pj-space-y-6">
      {/* Identity */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <User className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-mr-3" />
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary">Identity</h2>
        </div>
        
        <div className="pj-space-y-4">
          <div>
            <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
              Anonymous Handle
            </label>
            <input
              type="text"
              value={settings.handle}
              onChange={(e) => setSettings(prev => ({ ...prev, handle: e.target.value }))}
              className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
            />
            <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mt-1">
              This handle is used for anonymous communications and never linked to your identity
            </p>
          </div>
          
          <div>
            <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
              Key Fingerprint
            </label>
            <div className="pj-flex pj-items-center pj-space-x-2">
              <code className="pj-text-pj-sm pj-bg-gray-100 pj-px-3 pj-py-2 pj-rounded pj-font-mono">
                {settings.keyFingerprint}
              </code>
              <Button variant="ghost" size="sm" className="pj-btn pj-btn--ghost pj-px-3 pj-py-1">
                Regenerate
              </Button>
            </div>
            <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mt-1">
              Unique identifier for your cryptographic keys
            </p>
          </div>
        </div>
      </div>

      {/* Vault */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Vault className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-mr-3" />
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary">Vault</h2>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-flex pj-items-center pj-justify-between">
            <div>
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Encryption</p>
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Encrypt credentials stored on your device
              </p>
            </div>
            <label className="pj-relative pj-inline-flex pj-items-center pj-cursor-pointer">
              <input
                type="checkbox"
                checked={settings.vault.encrypted}
                onChange={() => handleToggle('vault', 'encrypted')}
                className="pj-sr-only pj-peer"
              />
              <div className="pj-w-11 pj-h-6 pj-bg-gray-200 peer-focus:pj-outline-none peer-focus:pj-ring-4 peer-focus:pj-ring-blue-300 pj-rounded-full pj-peer peer-checked:after:pj-translate-x-full peer-checked:after:pj-border-white after:pj-content-[''] after:pj-absolute after:pj-top-[2px] after:pj-left-[2px] after:pj-bg-white after:pj-border-gray-300 after:pj-border after:pj-rounded-full after:pj-h-5 after:pj-w-5 after:pj-transition-all peer-checked:pj-bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <div className="pj-flex pj-items-center pj-justify-between pj-mb-2">
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Backup</p>
              <Button variant="ghost" size="sm" className="pj-btn pj-btn--ghost pj-px-3 pj-py-1">
                Create Backup
              </Button>
            </div>
            <p className="pj-text-pj-xs pj-text-pj-text-muted">
              Last backup: {new Date(settings.vault.lastBackupAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Bell className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-mr-3" />
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary">Notifications</h2>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-flex pj-items-center pj-justify-between">
            <div>
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Contact Requests</p>
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Get notified when employers want to connect
              </p>
            </div>
            <label className="pj-relative pj-inline-flex pj-items-center pj-cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.contactRequests}
                onChange={() => handleToggle('notifications', 'contactRequests')}
                className="pj-sr-only pj-peer"
              />
              <div className="pj-w-11 pj-h-6 pj-bg-gray-200 peer-focus:pj-outline-none peer-focus:pj-ring-4 peer-focus:pj-ring-blue-300 pj-rounded-full pj-peer peer-checked:after:pj-translate-x-full peer-checked:after:pj-border-white after:pj-content-[''] after:pj-absolute after:pj-top-[2px] after:pj-left-[2px] after:pj-bg-white after:pj-border-gray-300 after:pj-border after:pj-rounded-full after:pj-h-5 after:pj-w-5 after:pj-transition-all peer-checked:pj-bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={settings.notifications.email}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, email: e.target.value }
              }))}
              className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
              placeholder="your-email@example.com"
            />
            <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mt-1">
              Used only for notifications, never shared with employers
            </p>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Shield className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-mr-3" />
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary">Privacy</h2>
        </div>
        
        <div className="pj-space-y-4">
          <div className="pj-flex pj-items-center pj-justify-between">
            <div>
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Anonymous Telemetry</p>
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Help improve PrivJob with anonymous usage data
              </p>
            </div>
            <label className="pj-relative pj-inline-flex pj-items-center pj-cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.telemetry}
                onChange={() => handleToggle('privacy', 'telemetry')}
                className="pj-sr-only pj-peer"
              />
              <div className="pj-w-11 pj-h-6 pj-bg-gray-200 peer-focus:pj-outline-none peer-focus:pj-ring-4 peer-focus:pj-ring-blue-300 pj-rounded-full pj-peer peer-checked:after:pj-translate-x-full peer-checked:after:pj-border-white after:pj-content-[''] after:pj-absolute after:pj-top-[2px] after:pj-left-[2px] after:pj-bg-white after:pj-border-gray-300 after:pj-border after:pj-rounded-full after:pj-h-5 after:pj-w-5 after:pj-transition-all peer-checked:pj-bg-blue-600"></div>
            </label>
          </div>
          
          <div className="pj-flex pj-items-center pj-justify-between">
            <div>
              <p className="pj-text-pj-sm pj-font-medium pj-text-pj-text-primary">Reduced Motion</p>
              <p className="pj-text-pj-xs pj-text-pj-text-muted">
                Minimize animations and transitions
              </p>
            </div>
            <label className="pj-relative pj-inline-flex pj-items-center pj-cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.reducedMotion}
                onChange={() => handleToggle('privacy', 'reducedMotion')}
                className="pj-sr-only pj-peer"
              />
              <div className="pj-w-11 pj-h-6 pj-bg-gray-200 peer-focus:pj-outline-none peer-focus:pj-ring-4 peer-focus:pj-ring-blue-300 pj-rounded-full pj-peer peer-checked:after:pj-translate-x-full peer-checked:after:pj-border-white after:pj-content-[''] after:pj-absolute after:pj-top-[2px] after:pj-left-[2px] after:pj-bg-white after:pj-border-gray-300 after:pj-border after:pj-rounded-full after:pj-h-5 after:pj-w-5 after:pj-transition-all peer-checked:pj-bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="pj-card pj-p-6">
        <div className="pj-flex pj-items-center pj-mb-4">
          <Lock className="pj-w-5 pj-h-5 pj-text-pj-text-secondary pj-mr-3" />
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-pj-text-primary">Security</h2>
        </div>
        
        <div className="pj-space-y-4">
          <div>
            <label className="pj-block pj-text-pj-sm pj-font-medium pj-text-pj-text-primary pj-mb-2">
              Auto-lock after inactivity
            </label>
            <select
              value={settings.security.autoLockMinutes}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, autoLockMinutes: parseInt(e.target.value) }
              }))}
              className="pj-w-full pj-px-3 pj-py-2 pj-border pj-border-pj-border pj-rounded-pj-button pj-bg-pj-card-bg pj-focus-ring"
            >
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={0}>Never</option>
            </select>
            <p className="pj-text-pj-xs pj-text-pj-text-muted pj-mt-1">
              Automatically lock your vault after period of inactivity
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pj-card pj-p-6 pj-border-red-200 pj-bg-red-50">
        <div className="pj-flex pj-items-center pj-mb-4">
          <AlertTriangle className="pj-w-5 pj-h-5 pj-text-red-600 pj-mr-3" />
          <h2 className="pj-text-pj-xl pj-font-semibold pj-text-red-800">Danger Zone</h2>
        </div>
        
        <div className="pj-space-y-4">
          <div>
            <h3 className="pj-text-pj-sm pj-font-medium pj-text-red-800 pj-mb-2">
              Reset All Data
            </h3>
            <p className="pj-text-pj-xs pj-text-red-700 pj-mb-3">
              This will permanently delete all your credentials, applications, and settings. This action cannot be undone.
            </p>
            <Button variant="ghost" className="pj-border pj-border-red-300 pj-text-red-700 hover:pj-bg-red-100 pj-px-4 pj-py-2">
              Reset All Data
            </Button>
          </div>
          
          <div>
            <h3 className="pj-text-pj-sm pj-font-medium pj-text-red-800 pj-mb-2">
              Export & Delete Account
            </h3>
            <p className="pj-text-pj-xs pj-text-red-700 pj-mb-3">
              Export your data and permanently delete your PrivJob account. Your on-chain applications will remain.
            </p>
            <Button variant="ghost" className="pj-border pj-border-red-300 pj-text-red-700 hover:pj-bg-red-100 pj-px-4 pj-py-2">
              Export & Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
