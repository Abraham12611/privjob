'use client'

import { Code, Terminal, Keyboard, Eye, Shield, Zap } from 'lucide-react'

export function HelpContent() {
  return (
    <div className="pj-space-y-12">
      {/* Quick Start */}
      <section id="quickstart">
        <h2 className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary pj-mb-6">Quick Start Guide</h2>
        
        <div className="pj-space-y-6">
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">For Job Seekers</h3>
            <ol className="pj-space-y-3 pj-list-decimal pj-list-inside">
              <li className="pj-text-pj-text-secondary">Browse jobs on the <a href="/jobs" className="pj-text-pj-action-blue hover:pj-underline">Jobs page</a></li>
              <li className="pj-text-pj-text-secondary">Click "Apply Privately" on any job that interests you</li>
              <li className="pj-text-pj-text-secondary">Select your credentials from the Vault (or import new ones)</li>
              <li className="pj-text-pj-text-secondary">Generate a zero-knowledge proof on your device</li>
              <li className="pj-text-pj-text-secondary">Submit your anonymous application to the blockchain</li>
              <li className="pj-text-pj-text-secondary">Wait for contact requests from interested employers</li>
            </ol>
          </div>
          
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">For Employers</h3>
            <ol className="pj-space-y-3 pj-list-decimal pj-list-inside">
              <li className="pj-text-pj-text-secondary">Create an account and set up your company profile</li>
              <li className="pj-text-pj-text-secondary">Post a job with specific, verifiable requirements</li>
              <li className="pj-text-pj-text-secondary">Review anonymous applications showing only pass/fail results</li>
              <li className="pj-text-pj-text-secondary">Send contact requests to qualified candidates</li>
              <li className="pj-text-pj-text-secondary">Connect directly when candidates accept your request</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Demo Script */}
      <section id="demo-script">
        <h2 className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary pj-mb-6">Demo Script</h2>
        
        <div className="pj-card pj-p-6">
          <p className="pj-text-pj-text-secondary pj-mb-4">
            Follow this 2-minute script to experience the full PrivJob workflow:
          </p>
          
          <div className="pj-space-y-4">
            <div className="pj-flex pj-items-start pj-space-x-3">
              <span className="pj-w-6 pj-h-6 pj-bg-pj-action-blue pj-text-white pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-bold pj-flex-shrink-0">1</span>
              <div>
                <p className="pj-font-medium">Visit the Issuer Studio</p>
                <p className="pj-text-pj-sm pj-text-pj-text-secondary">Go to <a href="/issuer" className="pj-text-pj-action-blue hover:pj-underline">/issuer</a> and mint sample attestations for education and experience</p>
              </div>
            </div>
            
            <div className="pj-flex pj-items-start pj-space-x-3">
              <span className="pj-w-6 pj-h-6 pj-bg-pj-action-blue pj-text-white pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-bold pj-flex-shrink-0">2</span>
              <div>
                <p className="pj-font-medium">Browse Jobs</p>
                <p className="pj-text-pj-sm pj-text-pj-text-secondary">Visit <a href="/jobs" className="pj-text-pj-action-blue hover:pj-underline">/jobs</a> and find a position that matches your minted credentials</p>
              </div>
            </div>
            
            <div className="pj-flex pj-items-start pj-space-x-3">
              <span className="pj-w-6 pj-h-6 pj-bg-pj-action-blue pj-text-white pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-bold pj-flex-shrink-0">3</span>
              <div>
                <p className="pj-font-medium">Apply Privately</p>
                <p className="pj-text-pj-sm pj-text-pj-text-secondary">Click "Apply Privately" and follow the proof generation workflow</p>
              </div>
            </div>
            
            <div className="pj-flex pj-items-start pj-space-x-3">
              <span className="pj-w-6 pj-h-6 pj-bg-pj-action-blue pj-text-white pj-rounded-full pj-flex pj-items-center pj-justify-center pj-text-pj-sm pj-font-bold pj-flex-shrink-0">4</span>
              <div>
                <p className="pj-font-medium">View Results</p>
                <p className="pj-text-pj-sm pj-text-pj-text-secondary">Check your application status in <a href="/candidate/apps" className="pj-text-pj-action-blue hover:pj-underline">/candidate/apps</a> and explore employer view in <a href="/employer" className="pj-text-pj-action-blue hover:pj-underline">/employer</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="common-issues">
        <h2 className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary pj-mb-6">Common Issues</h2>
        
        <div className="pj-space-y-4">
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-3">Proof generation fails</h3>
            <p className="pj-text-pj-text-secondary pj-mb-3">
              If zero-knowledge proof generation fails or takes too long:
            </p>
            <ul className="pj-space-y-2 pj-list-disc pj-list-inside pj-text-pj-sm pj-text-pj-text-secondary">
              <li>Ensure you have sufficient attestations that meet the job criteria</li>
              <li>Check that your browser supports WebAssembly and has enough memory</li>
              <li>Try refreshing the page and attempting the application again</li>
              <li>Consider using a desktop browser for better performance</li>
            </ul>
          </div>
          
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-3">Browser compatibility</h3>
            <p className="pj-text-pj-text-secondary pj-mb-3">
              PrivJob requires modern browser features:
            </p>
            <ul className="pj-space-y-2 pj-list-disc pj-list-inside pj-text-pj-sm pj-text-pj-text-secondary">
              <li>WebAssembly support for zero-knowledge proof generation</li>
              <li>IndexedDB for local credential storage</li>
              <li>Modern JavaScript features (ES2020+)</li>
              <li>Recommended: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section id="keyboard-shortcuts">
        <h2 className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary pj-mb-6 pj-flex pj-items-center">
          <Keyboard className="pj-w-6 pj-h-6 pj-mr-2" />
          Keyboard Shortcuts
        </h2>
        
        <div className="pj-card pj-p-6">
          <div className="pj-grid pj-grid-cols-1 md:pj-grid-cols-2 pj-gap-6">
            <div>
              <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Navigation</h3>
              <div className="pj-space-y-2">
                <div className="pj-flex pj-justify-between">
                  <span className="pj-text-pj-sm pj-text-pj-text-secondary">Go to Jobs</span>
                  <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">G → J</code>
                </div>
                <div className="pj-flex pj-justify-between">
                  <span className="pj-text-pj-sm pj-text-pj-text-secondary">Go to Vault</span>
                  <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">G → V</code>
                </div>
                <div className="pj-flex pj-justify-between">
                  <span className="pj-text-pj-sm pj-text-pj-text-secondary">Go to Applications</span>
                  <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">G → A</code>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Actions</h3>
              <div className="pj-space-y-2">
                <div className="pj-flex pj-justify-between">
                  <span className="pj-text-pj-sm pj-text-pj-text-secondary">Search</span>
                  <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">Ctrl + K</code>
                </div>
                <div className="pj-flex pj-justify-between">
                  <span className="pj-text-pj-sm pj-text-pj-text-secondary">Close Modal</span>
                  <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">Escape</code>
                </div>
                <div className="pj-flex pj-justify-between">
                  <span className="pj-text-pj-sm pj-text-pj-text-secondary">Help</span>
                  <code className="pj-text-pj-xs pj-bg-gray-100 pj-px-2 pj-py-1 pj-rounded">?</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section id="accessibility">
        <h2 className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary pj-mb-6 pj-flex pj-items-center">
          <Eye className="pj-w-6 pj-h-6 pj-mr-2" />
          Accessibility Features
        </h2>
        
        <div className="pj-space-y-4">
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Built-in Support</h3>
            <ul className="pj-space-y-2 pj-list-disc pj-list-inside pj-text-pj-text-secondary">
              <li>Full keyboard navigation support</li>
              <li>Screen reader compatibility with ARIA labels</li>
              <li>High contrast mode and focus indicators</li>
              <li>Reduced motion support for animations</li>
              <li>Semantic HTML structure</li>
              <li>Alt text for all images and icons</li>
            </ul>
          </div>
          
          <div className="pj-card pj-p-6">
            <h3 className="pj-text-pj-lg pj-font-semibold pj-mb-4">Privacy Accessibility</h3>
            <p className="pj-text-pj-text-secondary pj-mb-3">
              PrivJob's privacy features also enhance accessibility:
            </p>
            <ul className="pj-space-y-2 pj-list-disc pj-list-inside pj-text-pj-text-secondary">
              <li>No need to upload or share personal documents</li>
              <li>Reduced bias from employers who can't see personal details</li>
              <li>Clear indication of what information is public vs private</li>
              <li>Simple, step-by-step application process</li>
            </ul>
          </div>
        </div>
      </section>

      {/* License */}
      <section id="license">
        <h2 className="pj-text-pj-xl pj-font-bold pj-text-pj-text-primary pj-mb-6">License & Open Source</h2>
        
        <div className="pj-card pj-p-6">
          <p className="pj-text-pj-text-secondary pj-mb-4">
            PrivJob is open source software released under the MIT License. This means:
          </p>
          
          <ul className="pj-space-y-2 pj-list-disc pj-list-inside pj-text-pj-text-secondary pj-mb-6">
            <li>You can freely use, modify, and distribute the code</li>
            <li>You can deploy your own instance of PrivJob</li>
            <li>You can contribute improvements back to the community</li>
            <li>The code is transparent and auditable for security</li>
          </ul>
          
          <div className="pj-flex pj-items-center pj-space-x-4">
            <a
              href="https://github.com/privjob/privjob"
              target="_blank"
              rel="noopener noreferrer"
              className="pj-text-pj-action-blue hover:pj-underline pj-flex pj-items-center"
            >
              <Code className="pj-w-4 pj-h-4 pj-mr-1" />
              View on GitHub
            </a>
            <a
              href="https://github.com/privjob/privjob/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="pj-text-pj-action-blue hover:pj-underline"
            >
              Read License
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
