import { Shield, Mail, Lock, CheckCircle, XCircle } from 'lucide-react';

export function DemoContactRequest() {
  return (
    <div className="pj-bg-white pj-rounded-lg pj-shadow pj-overflow-hidden">
      <div className="pj-p-6 pj-bg-gradient-to-r pj-from-blue-600 pj-to-blue-800 pj-text-white">
        <div className="pj-flex pj-items-center pj-justify-between">
          <div>
            <h2 className="pj-text-2xl pj-font-bold">Contact Candidate</h2>
            <p className="pj-mt-1 pj-opacity-90">Send a secure message through our privacy-preserving system</p>
          </div>
          <div className="pj-p-3 pj-bg-blue-500 pj-bg-opacity-20 pj-rounded-lg">
            <Shield className="pj-w-8 pj-h-8" />
          </div>
        </div>
      </div>

      <div className="pj-p-6">
        <div className="pj-mb-6 pj-p-4 pj-bg-blue-50 pj-rounded-lg pj-flex pj-items-start">
          <div className="pj-mr-3 pj-mt-0.5 pj-flex-shrink-0">
            <Lock className="pj-w-5 pj-h-5 pj-text-blue-500" />
          </div>
          <div>
            <h3 className="pj-font-medium pj-text-blue-800">Your Privacy is Protected</h3>
            <p className="pj-mt-1 pj-text-sm pj-text-blue-700">
              The candidate's personal information will remain private until they choose to share it with you.
            </p>
          </div>
        </div>

        <form className="pj-space-y-4">
          <div>
            <label htmlFor="message" className="pj-block pj-text-sm pj-font-medium pj-text-gray-700 pj-mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="pj-mt-1 pj-block pj-w-full pj-rounded-md pj-border-gray-300 pj-shadow-sm focus:pj-border-blue-500 focus:pj-ring-blue-500"
              placeholder="Write a personalized message to the candidate..."
              defaultValue="Hello, we were impressed by your application and would like to schedule an interview. Please let us know your availability."
            />
          </div>

          <div className="pj-mt-6 pj-p-4 pj-bg-gray-50 pj-rounded-lg">
            <h3 className="pj-text-sm pj-font-medium pj-text-gray-900 pj-mb-3">Privacy Settings</h3>
            
            <div className="pj-space-y-3">
              <label className="pj-flex pj-items-start">
                <div className="pj-flex pj-h-5 pj-items-center">
                  <input
                    id="hide-contact"
                    name="hide-contact"
                    type="checkbox"
                    className="pj-h-4 pj-w-4 pj-rounded pj-border-gray-300 pj-text-blue-600 focus:pj-ring-blue-500"
                    defaultChecked
                  />
                </div>
                <div className="pj-ml-3 pj-text-sm">
                  <span className="pj-font-medium pj-text-gray-700">Keep my contact information private</span>
                  <p className="pj-text-gray-500">
                    Your email and phone will be hidden until the candidate accepts your request.
                  </p>
                </div>
              </label>

              <label className="pj-flex pj-items-start">
                <div className="pj-flex pj-h-5 pj-items-center">
                  <input
                    id="expiry"
                    name="expiry"
                    type="checkbox"
                    className="pj-h-4 pj-w-4 pj-rounded pj-border-gray-300 pj-text-blue-600 focus:pj-ring-blue-500"
                    defaultChecked
                  />
                </div>
                <div className="pj-ml-3 pj-text-sm">
                  <span className="pj-font-medium pj-text-gray-700">Set message expiry</span>
                  <p className="pj-text-gray-500">
                    This message will automatically expire in 14 days if not accepted.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="pj-mt-6 pj-flex pj-justify-between pj-items-center">
            <div className="pj-flex pj-items-center pj-text-sm pj-text-gray-500">
              <Shield className="pj-w-4 pj-h-4 pj-mr-1 pj-text-blue-500" />
              <span>End-to-end encrypted</span>
            </div>
            <div className="pj-space-x-3">
              <button
                type="button"
                className="pj-px-4 pj-py-2 pj-border pj-border-gray-300 pj-text-sm pj-font-medium pj-rounded-md pj-text-gray-700 pj-bg-white hover:pj-bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="pj-px-4 pj-py-2 pj-border pj-border-transparent pj-text-sm pj-font-medium pj-rounded-md pj-text-white pj-bg-blue-600 hover:pj-bg-blue-700"
              >
                Send Request
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="pj-px-6 pj-py-4 pj-bg-gray-50 pj-border-t pj-border-gray-200">
        <h3 className="pj-text-sm pj-font-medium pj-text-gray-900 pj-mb-2">How it works</h3>
        <ul className="pj-space-y-2 pj-text-sm pj-text-gray-600">
          <li className="pj-flex pj-items-start">
            <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-500 pj-mr-2 pj-mt-0.5 pj-flex-shrink-0" />
            <span>Your message is encrypted and sent through our secure system</span>
          </li>
          <li className="pj-flex pj-items-start">
            <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-500 pj-mr-2 pj-mt-0.5 pj-flex-shrink-0" />
            <span>The candidate can choose to accept or decline your request</span>
          </li>
          <li className="pj-flex pj-items-start">
            <CheckCircle className="pj-w-5 pj-h-5 pj-text-green-500 pj-mr-2 pj-mt-0.5 pj-flex-shrink-0" />
            <span>If accepted, you'll be connected while maintaining privacy</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
