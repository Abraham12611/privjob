'use client';

import { useState } from 'react';
import { Shield, Check, Clock, X, Plus, Download, Eye, Lock } from 'lucide-react';
import { mockCredentials } from '@/mock/mockData';

const CredentialCard = ({ credential }: { credential: any }) => {
  const [showProof, setShowProof] = useState(false);
  
  return (
    <div className="pj-border pj-rounded-lg pj-p-6 pj-shadow-sm hover:pj-shadow-md pj-transition-shadow">
      <div className="pj-flex pj-justify-between pj-items-start">
        <div>
          <h3 className="pj-text-lg pj-font-semibold pj-text-gray-900">{credential.title}</h3>
          <p className="pj-mt-1 pj-text-gray-600">{credential.issuer}</p>
          <div className="pj-mt-2 pj-flex pj-items-center pj-space-x-2">
            <span className="pj-px-2 pj-py-1 pj-text-xs pj-rounded-full pj-bg-blue-100 pj-text-blue-800 pj-flex pj-items-center">
              <Check className="pj-w-3 pj-h-3 pj-mr-1" />
              Verified
            </span>
            <span className="pj-px-2 pj-py-1 pj-text-xs pj-rounded-full pj-bg-gray-100 pj-text-gray-800">
              {credential.type}
            </span>
          </div>
        </div>
        <div className="pj-text-right">
          <p className="pj-text-sm pj-text-gray-500">
            Issued: {new Date(credential.issueDate).toLocaleDateString()}
          </p>
          {credential.expiryDate && (
            <p className="pj-text-sm pj-text-gray-500">
              Expires: {new Date(credential.expiryDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      
      <div className="pj-mt-4 pj-pt-4 pj-border-t pj-border-gray-200">
        <div className="pj-flex pj-justify-between pj-items-center">
          <div className="pj-flex pj-items-center pj-space-x-2">
            <button 
              onClick={() => setShowProof(!showProof)}
              className="pj-px-3 pj-py-1 pj-bg-indigo-100 pj-text-indigo-700 pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-indigo-200 pj-flex pj-items-center"
            >
              <Shield className="pj-w-4 pj-h-4 pj-mr-1" />
              {showProof ? 'Hide Proof' : 'View Proof'}
            </button>
            <button className="pj-px-3 pj-py-1 pj-bg-white pj-border pj-border-gray-300 pj-text-gray-700 pj-text-sm pj-font-medium pj-rounded-md hover:pj-bg-gray-50 pj-flex pj-items-center">
              <Download className="pj-w-4 pj-h-4 pj-mr-1" />
              Download
            </button>
          </div>
          <span className="pj-text-xs pj-text-gray-500 pj-flex pj-items-center">
            <Lock className="pj-w-3 pj-h-3 pj-mr-1" />
            Secured with ZK Proofs
          </span>
        </div>
        
        {showProof && (
          <div className="pj-mt-4 pj-p-3 pj-bg-gray-50 pj-rounded-md pj-font-mono pj-text-sm pj-overflow-x-auto">
            <div className="pj-flex pj-justify-between pj-items-center pj-mb-2">
              <span className="pj-text-xs pj-font-medium pj-text-gray-500">ZK PROOF</span>
              <button 
                onClick={() => navigator.clipboard.writeText(credential.zkProof)}
                className="pj-text-xs pj-text-indigo-600 hover:pj-text-indigo-800"
              >
                Copy
              </button>
            </div>
            <code className="pj-text-xs pj-text-gray-800 pj-break-all">
              {credential.zkProof}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};
export default function CredentialsPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredCredentials = activeTab === 'all' 
    ? mockCredentials 
    : mockCredentials.filter(cred => cred.type === activeTab);
  
  return (
    <div className="pj-container pj-mx-auto pj-px-pj-gutter pj-py-8">
      <div className="pj-flex pj-flex-col md:pj-flex-row md:pj-justify-between md:pj-items-center pj-mb-8">
        <div>
          <h1 className="pj-text-2xl pj-font-bold pj-text-gray-900">My Credentials</h1>
          <p className="pj-mt-2 pj-text-gray-600">
            Manage and share your verified professional credentials
          </p>
        </div>
        <button className="pj-mt-4 md:pj-mt-0 pj-inline-flex pj-items-center pj-px-4 pj-py-2 pj-border pj-border-transparent pj-text-sm pj-font-medium pj-rounded-md pj-text-white pj-bg-indigo-600 hover:pj-bg-indigo-700 focus:pj-outline-none focus:pj-ring-2 focus:pj-ring-offset-2 focus:pj-ring-indigo-500">
          <Plus className="pj-w-4 pj-h-4 pj-mr-2" />
          Add Credential
        </button>
      </div>
      
      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden pj-mb-8">
        <div className="pj-p-6">
          <div className="pj-flex pj-space-x-1 pj-bg-gray-100 pj-p-1 pj-rounded-lg pj-mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`pj-px-4 pj-py-2 pj-text-sm pj-font-medium pj-rounded-md ${
                activeTab === 'all' ? 'pj-bg-white pj-text-indigo-700 pj-shadow-sm' : 'pj-text-gray-600 hover:pj-text-gray-900'
              }`}
            >
              All Credentials
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`pj-px-4 pj-py-2 pj-text-sm pj-font-medium pj-rounded-md ${
                activeTab === 'education' ? 'pj-bg-white pj-text-indigo-700 pj-shadow-sm' : 'pj-text-gray-600 hover:pj-text-gray-900'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`pj-px-4 pj-py-2 pj-text-sm pj-font-medium pj-rounded-md ${
                activeTab === 'experience' ? 'pj-bg-white pj-text-indigo-700 pj-shadow-sm' : 'pj-text-gray-600 hover:pj-text-gray-900'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('certification')}
              className={`pj-px-4 pj-py-2 pj-text-sm pj-font-medium pj-rounded-md ${
                activeTab === 'certification' ? 'pj-bg-white pj-text-indigo-700 pj-shadow-sm' : 'pj-text-gray-600 hover:pj-text-gray-900'
              }`}
            >
              Certifications
            </button>
          </div>
          
          <div className="pj-space-y-4">
            {filteredCredentials.length > 0 ? (
              filteredCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))
            ) : (
              <div className="pj-text-center pj-py-12 pj-bg-gray-50 pj-rounded-lg">
                <Shield className="pj-mx-auto pj-h-12 pj-w-12 pj-text-gray-400" />
                <h3 className="pj-mt-2 pj-text-sm pj-font-medium pj-text-gray-900">No credentials found</h3>
                <p className="pj-mt-1 pj-text-sm pj-text-gray-500">
                  {activeTab === 'all' 
                    ? 'You have not added any credentials yet.'
                    : `You have no ${activeTab} credentials.`}
                </p>
                <div className="pj-mt-6">
                  <button className="pj-inline-flex pj-items-center pj-px-4 pj-py-2 pj-border pj-border-transparent pj-text-sm pj-font-medium pj-rounded-md pj-text-white pj-bg-indigo-600 hover:pj-bg-indigo-700 focus:pj-outline-none focus:pj-ring-2 focus:pj-ring-offset-2 focus:pj-ring-indigo-500">
                    <Plus className="pj-w-4 pj-h-4 pj-mr-2" />
                    Add {activeTab === 'all' ? 'Credential' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
        <div className="pj-px-6 pj-py-4 pj-bg-gradient-to-r pj-from-purple-600 pj-to-indigo-600 pj-text-white">
          <h2 className="pj-text-lg pj-font-semibold">Zero-Knowledge Verification</h2>
          <p className="pj-mt-1 pj-text-sm pj-opacity-90">
            Verify your credentials without revealing sensitive information
          </p>
        </div>
        <div className="pj-p-6">
          <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-3 pj-gap-6">
            <div className="pj-p-6 pj-bg-blue-50 pj-rounded-lg">
              <div className="pj-w-12 pj-h-12 pj-bg-blue-100 pj-rounded-full pj-flex pj-items-center pj-justify-center pj-mb-4">
                <Shield className="pj-w-6 pj-h-6 pj-text-blue-600" />
              </div>
              <h3 className="pj-text-lg pj-font-medium pj-text-gray-900 pj-mb-2">How It Works</h3>
              <p className="pj-text-gray-600">
                Zero-knowledge proofs allow you to prove you have certain credentials or meet specific criteria without revealing the underlying data.
              </p>
            </div>
            
            <div className="pj-p-6 pj-bg-purple-50 pj-rounded-lg">
              <div className="pj-w-12 pj-h-12 pj-bg-purple-100 pj-rounded-full pj-flex pj-items-center pj-justify-center pj-mb-4">
                <Lock className="pj-w-6 pj-h-6 pj-text-purple-600" />
              </div>
              <h3 className="pj-text-lg pj-font-medium pj-text-gray-900 pj-mb-2">Your Privacy</h3>
              <p className="pj-text-gray-600">
                Your personal information stays private. We only verify what's necessary for the verification process.
              </p>
            </div>
            
            <div className="pj-p-6 pj-bg-indigo-50 pj-rounded-lg">
              <div className="pj-w-12 pj-h-12 pj-bg-indigo-100 pj-rounded-full pj-flex pj-items-center pj-justify-center pj-mb-4">
                <Check className="pj-w-6 pj-h-6 pj-text-indigo-600" />
              </div>
              <h3 className="pj-text-lg pj-font-medium pj-text-gray-900 pj-mb-2">Verified Status</h3>
              <p className="pj-text-gray-600">
                All your credentials are cryptographically verified and tamper-proof on the blockchain.
              </p>
            </div>
          </div>
          
          <div className="pj-mt-8 pj-pt-6 pj-border-t pj-border-gray-200">
            <h3 className="pj-text-lg pj-font-medium pj-text-gray-900 pj-mb-4">Verification Status</h3>
            <div className="pj-space-y-4">
              {mockCredentials.map((cred, index) => (
                <div key={index} className="pj-flex pj-items-center pj-justify-between pj-p-4 pj-bg-gray-50 pj-rounded-lg">
                  <div className="pj-flex pj-items-center">
                    <div className="pj-p-2 pj-bg-green-100 pj-rounded-full pj-mr-3">
                      <Check className="pj-w-5 pj-h-5 pj-text-green-600" />
                    </div>
                    <div>
                      <h4 className="pj-text-sm pj-font-medium pj-text-gray-900">{cred.title}</h4>
                      <p className="pj-text-xs pj-text-gray-500">Issued by {cred.issuer}</p>
                    </div>
                  </div>
                  <span className="pj-px-2.5 pj-py-0.5 pj-rounded-full pj-text-xs pj-font-medium pj-bg-green-100 pj-text-green-800">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
