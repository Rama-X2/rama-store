'use client';

import { useEffect, ReactNode } from 'react';
import { getCurrentDomain, isCurrentDomainAllowed, logDomainInfo } from '../../lib/anti-clone';

interface AntiCloneProviderProps {
  children: ReactNode;
}

export default function AntiCloneProvider({ children }: AntiCloneProviderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Log informasi domain di development
    if (process.env.NODE_ENV === 'development') {
      logDomainInfo();
    }

    // Security measures hanya di production
    if (process.env.NODE_ENV === 'production') {
      // Disable right-click context menu
      const handleContextMenu = (e: Event) => {
        e.preventDefault();
        return false;
      };

      // Disable dev tools shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
            (e.ctrlKey && e.keyCode === 83)) { // Ctrl+S
          e.preventDefault();
          return false;
        }
      };

      // Add event listeners
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      // Cleanup
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  // Server-side rendering
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // Client-side domain check
  const currentDomain = getCurrentDomain();
  const isAllowed = isCurrentDomainAllowed();

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-6xl mb-6">🚫</div>
          <div className="text-4xl font-bold text-white mb-4">403</div>
          <div className="text-xl font-semibold text-white mb-4">
            Akses Ditolak
          </div>
          <div className="text-white/90 leading-relaxed">
            Website ini hanya dapat diakses melalui domain resmi.
          </div>
          <div className="mt-6 text-sm text-white/70">
            Domain: <code className="bg-black/20 px-2 py-1 rounded">{currentDomain}</code>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
