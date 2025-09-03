'use client';

import { DemoZKVerification } from '@/components/demo/DemoZKVerification';
import { DemoCredentialManagement } from '@/components/demo/DemoCredentialManagement';
import { DemoPrivacySettings } from '@/components/demo/DemoPrivacySettings';

export default function DemoPage() {
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8 pj-space-y-8">
      <div>
        <h1 className="pj-text-2xl pj-font-bold pj-text-gray-900">PrivJob</h1>
      </div>

      <div className="pj-grid pj-gap-8 lg:pj-grid-cols-2">
        <div className="pj-space-y-6">
          <h2 className="pj-text-lg pj-font-semibold pj-text-gray-900">Zero-Knowledge Verification</h2>
          <DemoZKVerification />
        </div>

        <div className="pj-space-y-6">
          <h2 className="pj-text-lg pj-font-semibold pj-text-gray-900">Credential Management</h2>
          <DemoCredentialManagement />
        </div>
      </div>

      <div className="pj-space-y-6">
        <h2 className="pj-text-lg pj-font-semibold pj-text-gray-900">Privacy Settings & Data Sharing</h2>
        <DemoPrivacySettings />
      </div>
    </div>
  );
}
