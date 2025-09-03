import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Bell, Mail, Key, Server } from 'lucide-react';

type PrivacySetting = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
};

type DataPermission = {
  id: string;
  name: string;
  description: string;
  sharedWith: string[];
  lastUpdated: string;
};

export function DemoPrivacySettings() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      icon: <Eye className="pj-w-5 pj-h-5 pj-text-blue-500" />,
      enabled: true,
    },
    {
      id: 'contact-privacy',
      title: 'Contact Privacy',
      description: 'Keep your contact information private until you choose to share',
      icon: <Lock className="pj-w-5 pj-h-5 pj-text-purple-500" />,
      enabled: true,
    },
    {
      id: 'job-alerts',
      title: 'Job Alerts',
      description: 'Receive notifications about relevant job opportunities',
      icon: <Bell className="pj-w-5 pj-h-5 pj-text-green-500" />,
      enabled: true,
    },
    {
      id: 'email-communications',
      title: 'Email Communications',
      description: 'Receive important updates and notifications via email',
      icon: <Mail className="pj-w-5 pj-h-5 pj-text-yellow-500" />,
      enabled: true,
    },
  ]);

  const [permissions, setPermissions] = useState<DataPermission[]>([
    {
      id: 'resume',
      name: 'Resume',
      description: 'Your professional work history and skills',
      sharedWith: ['TechCorp Inc.', 'StartupXYZ'],
      lastUpdated: '2023-11-15',
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      description: 'Your email and phone number',
      sharedWith: ['Verified Employers'],
      lastUpdated: '2023-11-10',
    },
    {
      id: 'education',
      name: 'Education History',
      description: 'Your academic background and qualifications',
      sharedWith: ['TechCorp Inc.'],
      lastUpdated: '2023-11-05',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
      <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white">
        <div className="pj-flex pj-items-center pj-justify-between">
          <div>
            <h2 className="pj-text-xl pj-font-bold">Privacy & Security</h2>
            <p className="pj-mt-1 pj-opacity-90 pj-text-sm">
              Manage your privacy settings and data permissions
            </p>
          </div>
          <div className="pj-p-2 pj-bg-white pj-bg-opacity-10 pj-rounded-lg">
            <Shield className="pj-w-6 pj-h-6" />
          </div>
        </div>
      </div>

      <div className="pj-p-6">
        <div className="pj-mb-8">
          <h3 className="pj-text-lg pj-font-medium pj-text-gray-900 pj-mb-4">Privacy Settings</h3>
          <div className="pj-grid pj-gap-4 md:pj-grid-cols-2">
            {settings.map((setting) => (
              <div key={setting.id} className="pj-border pj-rounded-lg pj-p-4">
                <div className="pj-flex pj-items-start">
                  <div className="pj-mr-4 pj-mt-0.5">
                    {setting.icon}
                  </div>
                  <div className="pj-flex-1">
                    <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">{setting.title}</h4>
                    <p className="pj-mt-1 pj-text-xs pj-text-gray-500">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className={`pj-relative pj-inline-flex pj-flex-shrink-0 pj-h-6 pj-w-11 pj-border-2 pj-border-transparent pj-rounded-full pj-cursor-pointer pj-transition-colors pj-ease-in-out pj-duration-200 focus:pj-outline-none focus:pj-ring-2 focus:pj-ring-offset-2 focus:pj-ring-indigo-500 ${
                      setting.enabled ? 'pj-bg-indigo-600' : 'pj-bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pj-pointer-events-none pj-inline-block pj-h-5 pj-w-5 pj-rounded-full pj-bg-white pj-shadow pj-transform pj-ring-0 pj-transition pj-ease-in-out pj-duration-200 ${
                        setting.enabled ? 'pj-translate-x-5' : 'pj-translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pj-mb-8">
          <div className="pj-flex pj-justify-between pj-items-center pj-mb-4">
            <h3 className="pj-text-lg pj-font-medium pj-text-gray-900">Data Permissions</h3>
            <button className="pj-text-sm pj-font-medium pj-text-indigo-600 hover:pj-text-indigo-500">
              View all permissions
            </button>
          </div>
          
          <div className="pj-overflow-hidden pj-shadow pj-ring-1 pj-ring-black pj-ring-opacity-5 pj-rounded-lg">
            <table className="pj-min-w-full pj-divide-y pj-divide-gray-300">
              <thead className="pj-bg-gray-50">
                <tr>
                  <th scope="col" className="pj-py-3.5 pj-pl-4 pj-pr-3 pj-text-left pj-text-sm pj-font-semibold pj-text-gray-900 sm:pj-pl-6">
                    Data Type
                  </th>
                  <th scope="col" className="pj-px-3 pj-py-3.5 pj-text-left pj-text-sm pj-font-semibold pj-text-gray-900">
                    Shared With
                  </th>
                  <th scope="col" className="pj-px-3 pj-py-3.5 pj-text-left pj-text-sm pj-font-semibold pj-text-gray-900">
                    Last Updated
                  </th>
                  <th scope="col" className="pj-relative pj-py-3.5 pj-pl-3 pj-pr-4 sm:pj-pr-6">
                    <span className="pj-sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="pj-divide-y pj-divide-gray-200 pj-bg-white">
                {permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td className="pj-whitespace-nowrap pj-py-4 pj-pl-4 pj-pr-3 pj-text-sm pj-font-medium pj-text-gray-900 sm:pj-pl-6">
                      <div className="pj-font-medium">{permission.name}</div>
                      <div className="pj-text-gray-500 pj-text-xs">{permission.description}</div>
                    </td>
                    <td className="pj-whitespace-nowrap pj-px-3 pj-py-4 pj-text-sm pj-text-gray-500">
                      <div className="pj-flex pj-flex-col pj-space-y-1">
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
                    <td className="pj-relative pj-whitespace-nowrap pj-py-4 pj-pl-3 pj-pr-4 pj-text-right pj-text-sm pj-font-medium sm:pj-pr-6">
                      <button className="pj-text-indigo-600 hover:pj-text-indigo-900">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pj-bg-gray-50 pj-p-4 pj-rounded-lg pj-flex pj-items-start">
          <div className="pj-mr-3 pj-mt-0.5">
            <Key className="pj-w-5 pj-h-5 pj-text-gray-400" />
          </div>
          <div>
            <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">Zero-Knowledge Proofs</h4>
            <p className="pj-mt-1 pj-text-sm pj-text-gray-600">
              Your data is protected using zero-knowledge proofs, allowing you to prove your qualifications without revealing sensitive information.
            </p>
            <div className="pj-mt-3 pj-flex pj-items-center pj-text-sm pj-text-gray-500">
              <Server className="pj-w-4 pj-h-4 pj-mr-1" />
              <span>Secure end-to-end encryption enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
