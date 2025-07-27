/**
 * Anti-Clone Security Utilities
 * Utilitas keamanan untuk mencegah clone website
 * 
 * CATATAN: Ini adalah lapisan keamanan tambahan di client-side.
 * Keamanan utama tetap berada di middleware (server-side).
 */

// Konfigurasi domain yang diizinkan
const ALLOWED_DOMAINS = [
  'rama-store.vercel.app',
  'localhost:3000',
  'localhost:3001',
  'localhost',
  '127.0.0.1:3000',
  '127.0.0.1',
];

/**
 * Mengambil domain saat ini dari window.location
 * @returns string - Domain saat ini
 */
export function getCurrentDomain(): string {
  if (typeof window === 'undefined') {
    return 'server'; // Server-side rendering
  }
  
  return window.location.host.toLowerCase();
}

/**
 * Memeriksa apakah domain saat ini diizinkan
 * @returns boolean - True jika domain diizinkan
 */
export function isCurrentDomainAllowed(): boolean {
  const currentDomain = getCurrentDomain();
  
  if (currentDomain === 'server') {
    return true; // Biarkan middleware yang handle server-side
  }

  // Normalisasi domain (hapus www.)
  const normalizedDomain = currentDomain.replace(/^www\./, '');
  
  return ALLOWED_DOMAINS.some(domain => 
    normalizedDomain === domain.toLowerCase() || 
    normalizedDomain.startsWith(domain.toLowerCase())
  );
}

/**
 * Fungsi untuk memblokir akses jika domain tidak diizinkan
 * Ini adalah lapisan keamanan tambahan di client-side
 */
export function enforceClientSideDomainCheck() {
  if (typeof window === 'undefined') {
    return; // Skip di server-side
  }

  // Delay sedikit untuk memastikan DOM sudah loaded
  setTimeout(() => {
    if (!isCurrentDomainAllowed()) {
      // Redirect ke halaman error atau blokir akses
      document.body.innerHTML = `
        <div style="
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          margin: 0;
        ">
          <div style="
            text-align: center;
            max-width: 500px;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          ">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚫</div>
            <div style="font-size: 3rem; font-weight: bold; margin-bottom: 20px;">403</div>
            <div style="font-size: 1.5rem; margin-bottom: 20px;">Akses Ditolak</div>
            <div style="font-size: 1rem; opacity: 0.9; line-height: 1.6;">
              Website ini hanya dapat diakses melalui domain resmi.
            </div>
          </div>
        </div>
      `;
      
      // Disable semua event listeners
      window.onload = null;
      window.addEventListener = () => {};
      document.addEventListener = () => {};
      
      // Block navigation
      if (window.history && window.history.pushState) {
        window.history.pushState = () => {};
        window.history.replaceState = () => {};
      }
    }
  }, 100);
}

/**
 * Hook untuk menggunakan domain validation di React components
 * @returns object - Status domain dan informasi terkait
 */
export function useDomainValidation() {
  if (typeof window === 'undefined') {
    return {
      isAllowed: true,
      currentDomain: 'server',
      isLoading: false,
    };
  }

  const currentDomain = getCurrentDomain();
  const isAllowed = isCurrentDomainAllowed();

  return {
    isAllowed,
    currentDomain,
    isLoading: false,
  };
}

/**
 * Utility untuk development - log informasi domain
 */
export function logDomainInfo() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const currentDomain = getCurrentDomain();
  const isAllowed = isCurrentDomainAllowed();
  
  console.log('🔒 Domain Security Check:', {
    currentDomain,
    isAllowed,
    allowedDomains: ALLOWED_DOMAINS,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Fungsi untuk mengamankan console (opsional)
 * Mencegah manipulasi melalui browser dev tools
 */
export function secureConsole() {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') {
    return;
  }

  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+U
  document.addEventListener('keydown', (e) => {
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
  });

  // Clear console periodically (opsional, bisa mengganggu development)
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      if (console.clear) {
        console.clear();
      }
    }, 10000); // Clear every 10 seconds
  }
}

/**
 * Export semua utilities
 */
export default {
  getCurrentDomain,
  isCurrentDomainAllowed,
  enforceClientSideDomainCheck,
  useDomainValidation,
  logDomainInfo,
  secureConsole,
};
