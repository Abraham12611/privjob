'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, Bell, Mail, Key, Server, Check } from 'lucide-react';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: JSX.Element;
}

interface DataPermission {
  id: string;
  name: string;
  description: string;
  sharedWith: string[];
  lastUpdated: string; // ISO
}

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      enabled: true,
      icon: <Eye className="pj-w-5 pj-h-5 pj-text-blue-500" />,
    },
    {
      id: 'contact-privacy',
      title: 'Contact Privacy',
      description: 'Keep your email and phone private until you explicitly share them',
      enabled: true,
      icon: <Lock className="pj-w-5 pj-h-5 pj-text-purple-500" />,
    },
    {
      id: 'job-alerts',
      title: 'Job Alerts',
      description: 'Receive notifications about relevant job opportunities',
      enabled: true,
      icon: <Bell className="pj-w-5 pj-h-5 pj-text-green-500" />,
    },
    {
      id: 'email-communications',
      title: 'Email Communications',
      description: 'Receive important updates and notifications via email',
      enabled: true,
      icon: <Mail className="pj-w-5 pj-h-5 pj-text-yellow-500" />,
    },
  ]);

  const [permissions] = useState<DataPermission[]>([
    {
      id: 'resume',
      name: 'Resume',
      description: 'Your professional work history and skills',
      sharedWith: ['TechCorp Inc.', 'StartupXYZ'],
      lastUpdated: '2025-08-21',
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      description: 'Your email and phone number',
      sharedWith: ['Verified Employers'],
      lastUpdated: '2025-08-10',
    },
    {
      id: 'education',
      name: 'Education History',
      description: 'Your academic background and qualifications',
      sharedWith: ['TechCorp Inc.'],
      lastUpdated: '2025-08-05',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <div className="pj-mb-8">
        <h1 className="pj-text-2xl pj-font-bold pj-text-gray-900">Privacy & Security</h1>
        <p className="pj-mt-2 pj-text-gray-600">Control your privacy settings and data sharing preferences</p>
      </div>

      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden pj-mb-8">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white">
          <h2 className="pj-text-lg pj-font-semibold">Privacy Settings</h2>
          <p className="pj-mt-1 pj-text-sm pj-opacity-90">Manage your privacy preferences and data sharing options</p>
        </div>

        <div className="pj-p-6">
          <div className="pj-grid pj-gap-4 md:pj-grid-cols-2">
            {settings.map(setting => (
              <div key={setting.id} className="pj-border pj-rounded-lg pj-p-4">
                <div className="pj-flex pj-items-start">
                  <div className="pj-mr-4 pj-mt-0.5">{setting.icon}</div>
                  <div className="pj-flex-1">
                    <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">{setting.title}</h4>
                    <p className="pj-mt-1 pj-text-xs pj-text-gray-500">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className={`pj-relative pj-inline-flex pj-h-6 pj-w-11 pj-border-2 pj-border-transparent pj-rounded-full pj-cursor-pointer pj-transition-colors pj-duration-200 focus:pj-outline-none focus:pj-ring-2 focus:pj-ring-offset-2 focus:pj-ring-indigo-500 ${
                      setting.enabled ? 'pj-bg-indigo-600' : 'pj-bg-gray-200'
                    }`}
                    aria-label={`Toggle ${setting.title}`}
                  >
                    <span
                      className={`pj-pointer-events-none pj-inline-block pj-h-5 pj-w-5 pj-rounded-full pj-bg-white pj-shadow pj-transform pj-transition pj-duration-200 ${
                        setting.enabled ? 'pj-translate-x-5' : 'pj-translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden pj-mb-8">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-indigo-600 pj-to-purple-600 pj-text-white">
          <h2 className="pj-text-lg pj-font-semibold">Data Permissions</h2>
          <p className="pj-mt-1 pj-text-sm pj-opacity-90">Manage who has access to your information</p>
        </div>

        <div className="pj-p-6">
          <div className="pj-overflow-hidden pj-shadow pj-ring-1 pj-ring-black pj-ring-opacity-5 pj-rounded-lg">
            <table className="pj-min-w-full pj-divide-y pj-divide-gray-300">
              <thead className="pj-bg-gray-50">
                <tr>
                  <th className="pj-py-3.5 pj-pl-4 pj-pr-3 pj-text-left pj-text-sm pj-font-semibold pj-text-gray-900 sm:pj-pl-6">Data Type</th>
                  <th className="pj-px-3 pj-py-3.5 pj-text-left pj-text-sm pj-font-semibold pj-text-gray-900">Shared With</th>
                  <th className="pj-px-3 pj-py-3.5 pj-text-left pj-text-sm pj-font-semibold pj-text-gray-900">Last Updated</th>
                  <th className="pj-relative pj-py-3.5 pj-pl-3 pj-pr-4 sm:pj-pr-6">
                    <span className="pj-sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="pj-divide-y pj-divide-gray-200 pj-bg-white">
                {permissions.map(permission => (
                  <tr key={permission.id}>
                    <td className="pj-whitespace-nowrap pj-py-4 pj-pl-4 pj-pr-3 pj-text-sm pj-font-medium pj-text-gray-900 sm:pj-pl-6">
                      <div className="pj-font-medium">{permission.name}</div>
                      <div className="pj-text-gray-500 pj-text-xs">{permission.description}</div>
                    </td>
                    <td className="pj-whitespace-nowrap pj-px-3 pj-py-4 pj-text-sm pj-text-gray-500">
                      <div className="pj-flex pj-flex-wrap pj-gap-1">
                        {permission.sharedWith.map((entity, idx) => (
                          <span key={idx} className="pj-inline-flex pj-items-center pj-px-2.5 pj-py-0.5 pj-rounded-full pj-text-xs pj-font-medium pj-bg-blue-100 pj-text-blue-800">
                            {entity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="pj-whitespace-nowrap pj-px-3 pj-py-4 pj-text-sm pj-text-gray-500">
                      {new Date(permission.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="pj-whitespace-nowrap pj-py-4 pj-pl-3 pj-pr-4 pj-text-right pj-text-sm pj-font-medium sm:pj-pr-6">
                      <button className="pj-text-indigo-600 hover:pj-text-indigo-900">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white">
          <h2 className="pj-text-lg pj-font-semibold">Zero-Knowledge Privacy</h2>
          <p className="pj-mt-1 pj-text-sm pj-opacity-90">Advanced privacy controls using zero-knowledge proofs</p>
        </div>

        <div className="pj-p-6">
          <div className="pj-grid pj-gap-6 md:pj-grid-cols-2">
            <div>
              <h3 className="pj-text-base pj-font-medium pj-text-gray-900">Credential Verification</h3>
              <p className="pj-mt-1 pj-text-sm pj-text-gray-600">Control how your credentials are verified without revealing sensitive information.</p>
              <div className="pj-mt-4 pj-space-y-4">
                <div className="pj-flex pj-items-start">
                  <div className="pj-flex-shrink-0 pj-mt-0.5">
                    <div className="pj-flex pj-items-center pj-justify-center pj-h-5 pj-w-5 pj-rounded-full pj-bg-green-100">
                      <Check className="pj-w-3.5 pj-h-3.5 pj-text-green-600" />
                    </div>
                  </div>
                  <div className="pj-ml-3">
                    <p className="pj-text-sm pj-font-medium pj-text-gray-900">Enable Zero-Knowledge Proofs</p>
                    <p className="pj-text-sm pj-text-gray-500">Verify your credentials without revealing personal data</p>
                  </div>
                </div>
                <div className="pj-flex pj-items-start">
                  <div className="pj-flex-shrink-0 pj-mt-0.5">
                    <div className="pj-flex pj-items-center pj-justify-center pj-h-5 pj-w-5 pj-rounded-full pj-bg-green-100">
                      <Check className="pj-w-3.5 pj-h-3.5 pj-text-green-600" />
                    </div>
                  </div>
                  <div className="pj-ml-3">
                    <p className="pj-text-sm pj-font-medium pj-text-gray-900">Selective Disclosure</p>
                    <p className="pj-text-sm pj-text-gray-500">Choose exactly what information to share</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="pj-text-base pj-font-medium pj-text-gray-900">Data Protection</h3>
              <p className="pj-mt-1 pj-text-sm pj-text-gray-600">Advanced settings to protect your personal information.</p>
              <div className="pj-mt-4 pj-space-y-4">
                <div className="pj-flex pj-justify-between pj-items-center">
                  <div>
                    <p className="pj-text-sm pj-font-medium pj-text-gray-900">Automatic Data Expiration</p>
                    <p className="pj-text-sm pj-text-gray-500">Automatically remove shared data after 30 days</p>
                  </div>
                  <div className="pj-flex pj-items-center">
                    <span className="pj-text-sm pj-text-gray-500 pj-mr-2">Enabled</span>
                    <div className="pj-relative pj-inline-flex pj-h-6 pj-w-11 pj-border-2 pj-border-transparent pj-rounded-full pj-bg-indigo-600">
                      <span className="pj-pointer-events-none pj-inline-block pj-h-5 pj-w-5 pj-rounded-full pj-bg-white pj-shadow pj-transform pj-translate-x-5" />
                    </div>
                  </div>
                </div>
                <div className="pj-flex pj-justify-between pj-items-center">
                  <div>
                    <p className="pj-text-sm pj-font-medium pj-text-gray-900">Data Encryption</p>
                    <p className="pj-text-sm pj-text-gray-500">End-to-end encryption for all your data</p>
                  </div>
                  <div className="pj-flex pj-items-center">
                    <span className="pj-text-sm pj-text-gray-500 pj-mr-2">Enabled</span>
                    <div className="pj-relative pj-inline-flex pj-h-6 pj-w-11 pj-border-2 pj-border-transparent pj-rounded-full pj-bg-indigo-600">
                      <span className="pj-pointer-events-none pj-inline-block pj-h-5 pj-w-5 pj-rounded-full pj-bg-white pj-shadow pj-transform pj-translate-x-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pj-mt-8 pj-pt-6 pj-border-t pj-border-gray-200">
            <h3 className="pj-text-base pj-font-medium pj-text-gray-900">Privacy Audit Log</h3>
            <ul className="pj-mt-4 pj-space-y-3">
              <li className="pj-flex pj-items-start">
                <span className="pj-h-8 pj-w-8 pj-rounded-full pj-bg-green-500 pj-flex pj-items-center pj-justify-center pj-mr-3">
                  <Check className="pj-w-5 pj-h-5 pj-text-white" />
                </span>
                <div>
                  <p className="pj-text-sm pj-text-gray-700">Your credentials were verified using zero-knowledge proofs</p>
                  <p className="pj-text-xs pj-text-gray-500">Nov 15</p>
                </div>
              </li>
              <li className="pj-flex pj-items-start">
                <span className="pj-h-8 pj-w-8 pj-rounded-full pj-bg-indigo-500 pj-flex pj-items-center pj-justify-center pj-mr-3">
                  <Key className="pj-w-5 pj-h-5 pj-text-white" />
                </span>
                <div>
                  <p className="pj-text-sm pj-text-gray-700">End-to-end encryption enabled</p>
                  <p className="pj-text-xs pj-text-gray-500">Nov 12</p>
                </div>
              </li>
              <li className="pj-flex pj-items-start">
                <span className="pj-h-8 pj-w-8 pj-rounded-full pj-bg-purple-500 pj-flex pj-items-center pj-justify-center pj-mr-3">
                  <Server className="pj-w-5 pj-h-5 pj-text-white" />
                </span>
                <div>
                  <p className="pj-text-sm pj-text-gray-700">Data retention policy updated</p>
                  <p className="pj-text-xs pj-text-gray-500">Nov 04</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
