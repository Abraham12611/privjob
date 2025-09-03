'use client';

import { useEffect, type ReactNode } from 'react';

interface MSWProviderProps {
  children: ReactNode;
}

const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

export function MSWProvider({ children }: MSWProviderProps) {
  useEffect(() => {
    if (isMockingMode && typeof window !== 'undefined') {
      import('@/mocks/browser')
        .then(({ worker }) => {
          worker.start();
        })
        .catch(console.error);
    }
  }, []);

  // Don't render anything while MSW is starting
  if (isMockingMode && typeof window === 'undefined') {
    return null;
  }

  return <>{children}</>;
}
