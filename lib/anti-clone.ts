/**
 * Anti-Clone Security Utilities (Client-side only)
 * CATATAN: Keamanan utama tetap di middleware (server-side)
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
 */
export function getCurrentDomain(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.host.toLowerCase();
}

/**
 * Memeriksa apakah domain saat ini diizinkan
 */
export function isCurrentDomainAllowed(): boolean {
  if (typeof window === 'undefined') {
    return true; // Server-side, biarkan middleware yang handle
  }

  const currentDomain = getCurrentDomain();
  const normalizedDomain = currentDomain.replace(/^www\./, '');
  
  return ALLOWED_DOMAINS.some(domain => 
    normalizedDomain === domain.toLowerCase() || 
    normalizedDomain.startsWith(domain.toLowerCase())
  );
}

/**
 * Utility untuk development - log informasi domain
 */
export function logDomainInfo(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log('🔒 Domain Security Check:', {
    currentDomain: getCurrentDomain(),
    isAllowed: isCurrentDomainAllowed(),
    allowedDomains: ALLOWED_DOMAINS,
  });
}

const antiClone = {
  getCurrentDomain,
  isCurrentDomainAllowed,
  logDomainInfo,
};

export default antiClone;
