'use client';

import { useEffect, ReactNode } from 'react';
import { useDomainValidation, enforceClientSideDomainCheck, logDomainInfo } from '../../lib/anti-clone';

interface AntiCloneProviderProps {
  children: ReactNode;
}

/**
 * AntiCloneProvider Component
 * 
 * Provider yang mengaktifkan sistem anti-clone di sisi client.
 * Komponen ini akan:
 * 1. Memvalidasi domain saat aplikasi dimuat
 * 2. Memblokir akses jika domain tidak diizinkan
 * 3. Menerapkan security measures tambahan
 * 
 * PENTING: Ini adalah lapisan keamanan tambahan.
 * Keamanan utama tetap berada di middleware.ts (server-side).
 */
export default function AntiCloneProvider({ children }: AntiCloneProviderProps) {
  const { isAllowed, currentDomain } = useDomainValidation();

  useEffect(() => {
    // Log informasi domain di development
    if (process.env.NODE_ENV === 'development') {
      logDomainInfo();
    }

    // Enforce domain check di client-side
    enforceClientSideDomainCheck();

    // Tambahan security measures (hanya di production)
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Disable right-click context menu
      const handleContextMenu = (e: Event) => {
        e.preventDefault();
        return false;
      };

      // Disable common dev tools shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        // F12
        if (e.keyCode === 123) {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+Shift+I (Dev Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
          e.preventDefault();
          return false;
        }
      };

      // Add event listeners
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      // Add anti-debug measures (opsional, bisa mengganggu legitimate users)
      let devtools = {
        open: false,
        orientation: null as string | null
      };

      const threshold = 160;
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            // Optional: Redirect atau block akses
            console.warn('🔒 Developer tools terdeteksi');
          }
        } else {
          devtools.open = false;
        }
      }, 500);

      // Cleanup function
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentDomain]);

  // Di server-side rendering, selalu render children
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // Di client-side, periksa domain validity
  if (!isAllowed) {
    // Jika domain tidak diizinkan, tampilkan halaman error
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
            <br /><br />
            Jika Anda adalah pemilik sah, pastikan Anda mengakses melalui domain yang benar.
          </div>
          <div className="mt-6 text-sm text-white/70">
            Domain saat ini: <code className="bg-black/20 px-2 py-1 rounded">{currentDomain}</code>
          </div>
        </div>
      </div>
    );
  }

  // Jika domain diizinkan, render children normal
  return <>{children}</>;
}

// Export untuk backward compatibility
export { AntiCloneProvider };
