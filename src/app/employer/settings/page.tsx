import { EmployerSettingsOrg } from '@/components/employer/settings/employer-settings-org'
import { EmployerSettingsTeam } from '@/components/employer/settings/employer-settings-team'
import { EmployerSettingsNotifications } from '@/components/employer/settings/employer-settings-notifications'
import { EmployerSettingsAPI } from '@/components/employer/settings/employer-settings-api'
import { EmployerSettingsSecurity } from '@/components/employer/settings/employer-settings-security'
import { EmployerSettingsDanger } from '@/components/employer/settings/employer-settings-danger'

export default function EmployerSettingsPage() {
  return (
    <div className="pj-space-y-8">
      <h1 className="pj-text-pj-2xl pj-font-bold">Organization & Team Settings</h1>
      <div className="pj-space-y-6">
        <EmployerSettingsOrg />
        <EmployerSettingsTeam />
        <EmployerSettingsNotifications />
        <EmployerSettingsAPI />
        <EmployerSettingsSecurity />
        <EmployerSettingsDanger />
      </div>
    </div>
  )
}
