'use client';

import { useState } from 'react';
import { Shield, Lock, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [message, setMessage] = useState('');
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    // Mock request flow only for demo/screenshot
    setRequested(true);
    setTimeout(() => setRequested(false), 3000);
  };

  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <div className="pj-mb-8">
        <h1 className="pj-text-2xl pj-font-bold pj-text-gray-900">Initiate Contact (Privacy-Preserving)</h1>
        <p className="pj-mt-2 pj-text-gray-600">Send a contact request without exposing your personal email or phone. We broker communication until you approve disclosure.</p>
      </div>

      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-indigo-600 pj-to-purple-600 pj-text-white">
          <div className="pj-flex pj-items-center pj-justify-between">
            <div>
              <h2 className="pj-text-lg pj-font-semibold">Contact Request</h2>
              <p className="pj-text-sm pj-opacity-90">Your details remain private until you explicitly approve sharing</p>
            </div>
            <div className="pj-p-2 pj-bg-white pj-bg-opacity-10 pj-rounded-lg">
              <Shield className="pj-w-6 pj-h-6" />
            </div>
          </div>
        </div>

        <div className="pj-p-6 pj-space-y-6">
          <div>
            <label className="pj-block pj-text-sm pj-font-medium pj-text-gray-700 pj-mb-2">Preferred Contact Method</label>
            <div className="pj-flex pj-space-x-2">
              <button
                onClick={() => setMethod('email')}
                className={`pj-inline-flex pj-items-center pj-px-3 pj-py-2 pj-text-sm pj-font-medium pj-rounded-md border ${method === 'email' ? 'pj-bg-indigo-600 pj-text-white pj-border-indigo-600' : 'pj-bg-white pj-text-gray-700 pj-border-gray-300'}`}
              >
                <Mail className="pj-w-4 pj-h-4 pj-mr-2" /> Email Relay
              </button>
              <button
                onClick={() => setMethod('phone')}
                className={`pj-inline-flex pj-items-center pj-px-3 pj-py-2 pj-text-sm pj-font-medium pj-rounded-md border ${method === 'phone' ? 'pj-bg-indigo-600 pj-text-white pj-border-indigo-600' : 'pj-bg-white pj-text-gray-700 pj-border-gray-300'}`}
              >
                <Phone className="pj-w-4 pj-h-4 pj-mr-2" /> Phone Proxy
              </button>
            </div>
            <p className="pj-mt-2 pj-text-xs pj-text-gray-500 pj-flex pj-items-center">
              <Lock className="pj-w-3 pj-h-3 pj-mr-1" /> We relay messages so your real contact stays private.
            </p>
          </div>

          <div>
            <label className="pj-block pj-text-sm pj-font-medium pj-text-gray-700 pj-mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="pj-block pj-w-full pj-rounded-md pj-border-gray-300 focus:pj-ring-indigo-500 focus:pj-border-indigo-500 pj-text-sm"
              placeholder="Introduce yourself and explain the reason for contact..."
            />
            <p className="pj-mt-2 pj-text-xs pj-text-gray-500">
              The message is sent through a privacy broker using ephemeral addresses.
            </p>
          </div>

          <div className="pj-flex pj-justify-between pj-items-center">
            <div className="pj-text-xs pj-text-gray-500 pj-flex pj-items-center">
              <Shield className="pj-w-4 pj-h-4 pj-mr-1" /> ZK policy: Proves eligibility to contact without revealing personal identifiers.
            </div>
            <button
              onClick={handleRequest}
              className="pj-px-4 pj-py-2 pj-bg-indigo-600 pj-text-white pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-indigo-700"
            >
              Send Contact Request
            </button>
          </div>

          {requested ? (
            <div className="pj-mt-4 pj-p-4 pj-bg-green-50 pj-border pj-border-green-200 pj-rounded-md pj-flex pj-items-center">
              <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-600 pj-mr-2" />
              <div>
                <div className="pj-text-sm pj-font-medium pj-text-green-800">Request sent via privacy broker</div>
                <div className="pj-text-xs pj-text-green-700">Your real contact info remains hidden until you approve disclosure.</div>
              </div>
            </div>
          ) : (
            <div className="pj-mt-4 pj-p-4 pj-bg-yellow-50 pj-border pj-border-yellow-200 pj-rounded-md pj-flex pj-items-center">
              <AlertCircle className="pj-w-5 pj-h-5 pj-text-yellow-600 pj-mr-2" />
              <div>
                <div className="pj-text-sm pj-font-medium pj-text-yellow-800">No personal data shared</div>
                <div className="pj-text-xs pj-text-yellow-700">Employer will receive a proxied address to reply to.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
