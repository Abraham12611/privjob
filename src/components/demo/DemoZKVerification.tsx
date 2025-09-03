import React, { useState } from 'react';
import { Shield, CheckCircle, Lock, XCircle, Info } from 'lucide-react';

type VerificationStep = {
  id: string;
  title: string;
  status: 'complete' | 'current' | 'upcoming';
  description: string;
};

type VerificationStatus = 'idle' | 'verifying' | 'success' | 'failed';

export function DemoZKVerification() {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [progress, setProgress] = useState(0);

  const steps: VerificationStep[] = [
    {
      id: 'identity',
      title: 'Identity Verification',
      status: 'complete',
      description: 'Your identity has been verified using zero-knowledge proofs',
    },
    {
      id: 'experience',
      title: 'Experience Validation',
      status: 'complete',
      description: '5+ years of experience confirmed',
    },
    {
      id: 'credentials',
      title: 'Credential Verification',
      status: 'current',
      description: 'Verifying your credentials without exposing sensitive data',
    },
    {
      id: 'privacy',
      title: 'Privacy Check',
      status: 'upcoming',
      description: 'Ensuring your personal data remains private',
    },
  ];

  const startVerification = () => {
    setStatus('verifying');
    setProgress(0);
    
    // Simulate verification progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 15);
        if (newProgress >= 100) {
          clearInterval(interval);
          setStatus('success');
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
      <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white">
        <div className="pj-flex pj-items-center pj-justify-between">
          <div>
            <h2 className="pj-text-xl pj-font-bold">Zero-Knowledge Verification</h2>
            <p className="pj-mt-1 pj-opacity-90 pj-text-sm">
              Verify your credentials without revealing sensitive information
            </p>
          </div>
          <div className="pj-p-2 pj-bg-white pj-bg-opacity-10 pj-rounded-lg">
            <Shield className="pj-w-6 pj-h-6" />
          </div>
        </div>
      </div>

      <div className="pj-p-6">
        <div className="pj-space-y-6">
          <div className="pj-space-y-2">
            <h3 className="pj-text-lg pj-font-medium pj-text-gray-900">Verification Steps</h3>
            <p className="pj-text-sm pj-text-gray-500">
              Your information is being verified using zero-knowledge proofs to protect your privacy.
            </p>
          </div>

          <div className="pj-space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="pj-flex pj-items-start">
                <div className="pj-mr-4 pj-pt-0.5">
                  {step.status === 'complete' ? (
                    <div className="pj-flex pj-items-center pj-justify-center pj-h-8 pj-w-8 pj-rounded-full pj-bg-green-100">
                      <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-600" />
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="pj-flex pj-items-center pj-justify-center pj-h-8 pj-w-8 pj-rounded-full pj-bg-blue-100">
                      <div className="pj-h-3 pj-w-3 pj-rounded-full pj-bg-blue-600 pj-animate-pulse" />
                    </div>
                  ) : (
                    <div className="pj-flex pj-items-center pj-justify-center pj-h-8 pj-w-8 pj-rounded-full pj-bg-gray-100">
                      <span className="pj-text-gray-500">{index + 1}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">{step.title}</h4>
                  <p className="pj-text-sm pj-text-gray-500">{step.description}</p>
                  {step.status === 'current' && status === 'verifying' && (
                    <div className="pj-mt-2 pj-w-full pj-bg-gray-200 pj-rounded-full pj-h-1.5">
                      <div
                        className="pj-bg-blue-600 pj-h-1.5 pj-rounded-full pj-transition-all pj-duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {status === 'idle' && (
            <div className="pj-mt-6">
              <button
                onClick={startVerification}
                className="pj-w-full pj-px-4 pj-py-3 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white pj-font-medium pj-rounded-lg hover:pj-opacity-90 pj-transition-opacity"
              >
                Start Verification
              </button>
            </div>
          )}

          {status === 'verifying' && (
            <div className="pj-mt-6 pj-p-4 pj-bg-blue-50 pj-rounded-lg pj-flex pj-items-start">
              <div className="pj-mr-3 pj-mt-0.5 pj-flex-shrink-0">
                <div className="pj-h-5 pj-w-5 pj-rounded-full pj-bg-blue-100 pj-flex pj-items-center pj-justify-center">
                  <div className="pj-h-2 pj-w-2 pj-rounded-full pj-bg-blue-600 pj-animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="pj-text-sm pj-font-medium pj-text-blue-800">Verification in progress</h4>
                <p className="pj-mt-1 pj-text-sm pj-text-blue-700">
                  This may take a moment. Please don't close this window.
                </p>
                <div className="pj-mt-2 pj-w-full pj-bg-blue-200 pj-rounded-full pj-h-1.5">
                  <div
                    className="pj-bg-blue-600 pj-h-1.5 pj-rounded-full pj-transition-all pj-duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="pj-mt-6 pj-p-4 pj-bg-green-50 pj-rounded-lg pj-flex pj-items-start">
              <div className="pj-mr-3 pj-mt-0.5 pj-flex-shrink-0">
                <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-500" />
              </div>
              <div>
                <h4 className="pj-text-sm pj-font-medium pj-text-green-800">Verification Complete</h4>
                <p className="pj-mt-1 pj-text-sm pj-text-green-700">
                  Your credentials have been successfully verified without exposing any sensitive information.
                </p>
              </div>
            </div>
          )}

          <div className="pj-mt-6 pj-p-4 pj-bg-gray-50 pj-rounded-lg pj-flex pj-items-start">
            <div className="pj-mr-3 pj-mt-0.5 pj-flex-shrink-0">
              <Info className="pj-w-5 pj-h-5 pj-text-gray-400" />
            </div>
            <div>
              <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">How it works</h4>
              <p className="pj-mt-1 pj-text-sm pj-text-gray-600">
                Zero-knowledge proofs allow you to prove you have certain credentials or meet specific criteria without revealing the underlying data. This keeps your personal information private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
