'use client';

import { useEffect, useState } from 'react';
import { mockApplications, mockJobs } from '@/mock/mockData';
import { CheckCircle, Clock, Shield, XCircle } from 'lucide-react';

export default function ApplicationsPage() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const ids = mockApplications.map((a) => a.id);
    const interval = setInterval(() => {
      setProgressMap((prev) => {
        const next: Record<string, number> = { ...prev };
        ids.forEach((id) => {
          const curr = next[id] ?? 10;
          const inc = Math.floor(Math.random() * 12) + 3;
          next[id] = Math.min(100, curr + inc);
        });
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <div className="pj-mb-8">
        <h1 className="pj-text-2xl pj-font-bold pj-text-gray-900">My Applications</h1>
        <p className="pj-mt-2 pj-text-gray-600">Track application status with zero-knowledge verification</p>
      </div>

      <div className="pj-space-y-4">
        {mockApplications.map((app) => {
          const job = mockJobs.find((j) => j.id === app.jobId);
          const progress = progressMap[app.id] ?? 10;
          const isDone = progress >= 100;
          return (
            <div key={app.id} className="pj-bg-white pj-border pj-rounded-lg pj-shadow-sm">
              <div className="pj-p-6 pj-flex pj-justify-between pj-items-start">
                <div>
                  <h3 className="pj-text-lg pj-font-semibold pj-text-gray-900">{job?.title}</h3>
                  <p className="pj-text-sm pj-text-gray-600">{job?.company} • Applied {new Date(app.date).toLocaleDateString()}</p>
                  <div className="pj-mt-2">
                    <span className="pj-inline-flex pj-items-center pj-px-2 pj-py-1 pj-rounded-full pj-text-xs pj-font-medium pj-bg-blue-100 pj-text-blue-800">
                      <Shield className="pj-w-3 pj-h-3 pj-mr-1" /> ZK Verified
                    </span>
                  </div>
                </div>
                <div>
                  <span className={`pj-inline-flex pj-items-center pj-px-2 pj-py-1 pj-rounded-full pj-text-xs pj-font-medium ${
                    app.status === 'Interview' ? 'pj-bg-blue-100 pj-text-blue-800' : 'pj-bg-yellow-100 pj-text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
              <div className="pj-px-6 pj-pb-6">
                <div className="pj-mb-2 pj-flex pj-justify-between pj-text-xs pj-text-gray-500">
                  <span>Zero-knowledge verification</span>
                  <span>{progress}%</span>
                </div>
                <div className="pj-w-full pj-bg-gray-200 pj-rounded-full pj-h-2">
                  <div className={`pj-h-2 pj-rounded-full ${isDone ? 'pj-bg-green-600' : 'pj-bg-indigo-600'}`} style={{ width: `${progress}%` }} />
                </div>

                <div className="pj-mt-4 pj-grid md:pj-grid-cols-3 pj-gap-3">
                  <StatusCard
                    title="Identity"
                    description="Proved without revealing PII"
                    ok={true}
                  />
                  <StatusCard
                    title="Experience"
                    description="Employment verified via ZK"
                    ok={progress > 40}
                  />
                  <StatusCard
                    title="Credentials"
                    description="Certificates attested"
                    ok={progress > 70}
                  />
                </div>

                <div className="pj-mt-4 pj-text-xs pj-text-gray-500 pj-flex pj-items-center">
                  <Shield className="pj-w-4 pj-h-4 pj-mr-1" /> Proof: {app.zkProof}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusCard({ title, description, ok }: { title: string; description: string; ok: boolean }) {
  return (
    <div className="pj-flex pj-items-start pj-p-3 pj-bg-gray-50 pj-rounded-lg">
      <div className="pj-mr-3 pj-mt-0.5">
        {ok ? (
          <div className="pj-w-5 pj-h-5 pj-rounded-full pj-bg-green-100 pj-flex pj-items-center pj-justify-center">
            <CheckCircle className="pj-w-3.5 pj-h-3.5 pj-text-green-600" />
          </div>
        ) : (
          <div className="pj-w-5 pj-h-5 pj-rounded-full pj-bg-yellow-100 pj-flex pj-items-center pj-justify-center">
            <Clock className="pj-w-3.5 pj-h-3.5 pj-text-yellow-600" />
          </div>
        )}
      </div>
      <div>
        <div className="pj-text-sm pj-font-medium pj-text-gray-900">{title}</div>
        <div className="pj-text-xs pj-text-gray-500">{description}</div>
      </div>
    </div>
  );
}
