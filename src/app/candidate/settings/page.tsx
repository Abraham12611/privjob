import { SettingsIdentity } from '@/components/candidate/settings/settings-identity'
import { SettingsVault } from '@/components/candidate/settings/settings-vault'
import { SettingsNotifications } from '@/components/candidate/settings/settings-notifications'
import { SettingsPrivacy } from '@/components/candidate/settings/settings-privacy'
import { SettingsSecurity } from '@/components/candidate/settings/settings-security'
import { SettingsDanger } from '@/components/candidate/settings/settings-danger'

export default function SettingsPage() {
  return (
    <div className="pj-space-y-8">
      <h1 className="pj-text-pj-2xl pj-font-bold">Settings</h1>
      <div className="pj-space-y-6">
        <SettingsIdentity />
        <SettingsVault />
        <SettingsNotifications />
        <SettingsPrivacy />
        <SettingsSecurity />
        <SettingsDanger />
      </div>
    </div>
  )
}
