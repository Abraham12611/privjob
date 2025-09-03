'use client';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/providers';
import { MSWProvider } from '@/components/mocks/MSWProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set page title and description in the client
  useEffect(() => {
    document.title = 'PrivJob - Privacy-First Job Board';
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Find jobs and prove your qualifications without revealing your identity using zero-knowledge proofs.';
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} pj-bg-pj-bg-primary pj-text-pj-text-primary`}>
        <MSWProvider>
          <Providers>
            <div className="pj-min-h-screen pj-flex pj-flex-col">
              <Navigation />
              <main className="pj-flex-1">
                {children}
              </main>
            </div>
            <Toaster />
          </Providers>
        </MSWProvider>
      </body>
    </html>
  );
}
