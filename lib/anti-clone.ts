/**
 * Anti-Clone Security Utilities
 * Utilitas keamanan untuk mencegah clone website - Updated Version
 * 
 * CATATAN: Ini adalah lapisan keamanan tambahan di client-side.
 * Keamanan utama tetap berada di middleware (server-side).
 */

// Konfigurasi domain yang diizinkan - lebih fleksibel
const ALLOWED_BASE_DOMAINS = [
  'rama-store',                   // Base domain yang harus ada
];

const ALLOWED_DEVELOPMENT_DOMAINS = [
  'localhost:3000',
  'localhost:3001',
  'localhost',
  '127.0.0.1:3000',
  '127.0.0.1',
  '0.0.0.0:3000',
];

const ALLOWED_TLD = [
  '.vercel.app',
  '.com',
  '.id',
  '.net',
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
 * Memeriksa apakah domain saat ini diizinkan - versi yang lebih fleksibel
 * @returns boolean - True jika domain diizinkan
 */
export function isCurrentDomainAllowed(): boolean {
  const currentDomain = getCurrentDomain();
  
  if (currentDomain === 'server') {
    return true; // Biarkan middleware yang handle server-side
  }

  // Normalisasi domain (hapus www.)
  const normalizedDomain = currentDomain.replace(/^www\./, '');
  
  // Development domains
  if (ALLOWED_DEVELOPMENT_DOMAINS.some(domain => 
    normalizedDomain === domain.toLowerCase() || 
    normalizedDomain.startsWith(domain.toLowerCase())
  )) {
    return true;
  }

  // Periksa apakah domain mengandung "rama-store" di posisi manapun
  const containsRamaStore = ALLOWED_BASE_DOMAINS.some(baseDomain => 
    normalizedDomain.includes(baseDomain.toLowerCase())
  );

  if (containsRamaStore) {
    // Jika mengandung "rama-store", periksa apakah menggunakan TLD yang diizinkan
    const hasValidTLD = ALLOWED_TLD.some(tld => 
      normalizedDomain.endsWith(tld.toLowerCase())
    );
    
    if (hasValidTLD) {
      return true;
    }
    
    // Khusus untuk Vercel, izinkan semua subdomain yang mengandung "rama-store"
    if (normalizedDomain.includes('vercel.app')) {
      return true;
    }
  }

  return false;
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
      const currentDomain = getCurrentDomain();
      
      // Redirect ke halaman error atau blokir akses dengan styling yang lebih baik
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
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\"><circle cx=\\"20\\" cy=\\"20\\" r=\\"2\\" fill=\\"rgba(255,255,255,0.1)\\"/><circle cx=\\"80\\" cy=\\"30\\" r=\\"1.5\\" fill=\\"rgba(255,255,255,0.1)\\"/><circle cx=\\"60\\" cy=\\"70\\" r=\\"2.5\\" fill=\\"rgba(255,255,255,0.1)\\"/><circle cx=\\"30\\" cy=\\"80\\" r=\\"1.8\\" fill=\\"rgba(255,255,255,0.1)\\"/></svg>');
            animation: float 6s ease-in-out infinite;
          ">
          </div>
          
          <div style="
            text-align: center;
            max-width: 600px;
            background: rgba(255, 255, 255, 0.1);
            padding: 60px 40px;
            border-radius: 24px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            position: relative;
            z-index: 1;
            animation: slideUp 0.6s ease-out;
          ">
            <div style="font-size: 5rem; margin-bottom: 24px; animation: pulse 2s infinite;">🚫</div>
            <div style="
              font-size: 7rem; 
              font-weight: 900; 
              margin-bottom: 16px;
              text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
              background: linear-gradient(45deg, #ff6b6b, #ffd93d);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">403</div>
            <div style="font-size: 2.5rem; margin-bottom: 24px; font-weight: 700;">Akses Ditolak</div>
            <div style="font-size: 1.2rem; margin-bottom: 32px; opacity: 0.95; line-height: 1.6;">
              Website ini hanya dapat diakses melalui domain resmi Rama Store.
              <br><br>
              Jika Anda adalah pemilik yang sah, pastikan Anda mengakses melalui domain yang benar.
            </div>
            
            <div style="
              background: rgba(0, 0, 0, 0.2);
              padding: 16px;
              border-radius: 12px;
              margin-top: 24px;
              font-family: 'Courier New', monospace;
              font-size: 0.9rem;
              border-left: 4px solid rgba(255, 255, 255, 0.3);
            ">
              <strong>Domain saat ini:</strong><br>
              ${currentDomain}
            </div>
            
            <div style="
              margin-top: 32px;
              font-size: 1.5rem;
              font-weight: 600;
              background: linear-gradient(45deg, #4facfe, #00f2fe);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">🎮 Rama Store</div>
          </div>
          
          <style>
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
          </style>
        </div>
      `;
      
      // Disable semua event listeners dan navigation
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
    allowedBaseDomains: ALLOWED_BASE_DOMAINS,
    allowedTLD: ALLOWED_TLD,
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
