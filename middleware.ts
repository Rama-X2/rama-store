import { NextRequest, NextResponse } from 'next/server';

// ================================
// KONFIGURASI DOMAIN ANTI-CLONE
// ================================

// Domain utama yang diizinkan - UBAH SESUAI DOMAIN ANDA
const ALLOWED_PRODUCTION_DOMAINS = [
  'rama-store.vercel.app',                                        // Domain produksi utama
  'rama-store-47at6s6j5-rama-x2s-projects.vercel.app',          // Preview deployment 1
  'rama-store-git-main-rama-x2s-projects.vercel.app',           // Git branch deployment
  'rama-store-rama-x2s-projects.vercel.app',                    // Project deployment
];

// Domain development yang diizinkan
const ALLOWED_DEVELOPMENT_DOMAINS = [
  'localhost:3000',
  'localhost:3001', 
  'localhost',
  '127.0.0.1:3000',
  '127.0.0.1:3001',
  '127.0.0.1',
  '0.0.0.0:3000',
];

// ================================
// ENVIRONMENT & SECURITY CONFIG
// ================================

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const ANTI_CLONE_ENABLED = process.env.ANTI_CLONE_ENABLED !== 'false'; // Default: enabled

// Secret key untuk bypass (hanya untuk emergency debugging)
const BYPASS_SECRET = process.env.ANTI_CLONE_BYPASS_SECRET;

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Normalizes domain/host untuk konsistensi pemeriksaan
 */
function normalizeDomain(domain: string): string {
  if (!domain) return '';
  
  return domain
    .toLowerCase()
    .replace(/^www\./, '')          // Hapus www.
    .replace(/\/$/, '')             // Hapus trailing slash
    .trim();
}

/**
 * Memeriksa apakah domain termasuk dalam daftar yang diizinkan
 */
function isDomainAllowed(host: string): boolean {
  if (!host || !ANTI_CLONE_ENABLED) return true;
  
  const normalizedHost = normalizeDomain(host);
  
  // Periksa domain produksi
  const isProductionDomainAllowed = ALLOWED_PRODUCTION_DOMAINS.some(domain => 
    normalizedHost === normalizeDomain(domain) ||
    normalizedHost.startsWith(normalizeDomain(domain))
  );
  
  if (isProductionDomainAllowed) return true;
  
  // Periksa domain development (selalu diizinkan terlepas dari NODE_ENV)
  const isDevelopmentDomainAllowed = ALLOWED_DEVELOPMENT_DOMAINS.some(domain =>
    normalizedHost === normalizeDomain(domain) ||
    normalizedHost.startsWith(normalizeDomain(domain)) ||
    normalizedHost.includes('localhost') ||
    normalizedHost.includes('127.0.0.1') ||
    normalizedHost.includes('0.0.0.0')
  );
  
  if (isDevelopmentDomainAllowed) return true;
  
  // Izinkan Vercel preview deployments yang valid
  if (normalizedHost.includes('vercel.app') && 
      (normalizedHost.includes('rama-store') || normalizedHost.includes('rama-x2s-projects'))) {
    return true;
  }
  
  return false;
}

/**
 * Memeriksa bypass secret dari query parameter atau header
 */
function checkBypassSecret(request: NextRequest): boolean {
  if (!BYPASS_SECRET) return false;
  
  const queryBypass = request.nextUrl.searchParams.get('bypass');
  const headerBypass = request.headers.get('x-bypass-secret');
  
  return queryBypass === BYPASS_SECRET || headerBypass === BYPASS_SECRET;
}

/**
 * Log informasi akses yang diblokir (hanya di development)
 */
function logBlockedAccess(request: NextRequest): void {
  if (!IS_DEVELOPMENT) return;
  
  const clientIP = request.ip || 
                   request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const host = request.headers.get('host') || 'unknown';
  const referer = request.headers.get('referer') || 'direct';
  
  console.log('🚫 ANTI-CLONE: Access blocked', {
    host,
    ip: clientIP,
    userAgent: userAgent.substring(0, 100),
    referer: referer.substring(0, 100),
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Membuat response 403 yang aman dan informatif
 */
function createBlockedResponse(request: NextRequest): NextResponse {
  logBlockedAccess(request);
  
  const host = request.headers.get('host') || 'unknown';
  const isBot = /bot|crawler|spider|scraper/i.test(request.headers.get('user-agent') || '');
  
  // Response khusus untuk bot/crawler
  if (isBot) {
    return new NextResponse('Access Denied - Domain Not Authorized', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive, noimageindex',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
  
  // HTML response untuk browser
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="noindex, nofollow, nosnippet, noarchive">
        <title>403 - Akses Ditolak | Rama Store</title>
        <style>
            * { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
            }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                line-height: 1.6;
            }
            .container {
                text-align: center;
                max-width: 600px;
                background: rgba(255, 255, 255, 0.1);
                padding: 60px 40px;
                border-radius: 20px;
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .shield-icon { 
                font-size: 5rem; 
                margin-bottom: 30px; 
                display: block;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
            }
            .error-code { 
                font-size: 5rem; 
                font-weight: 800; 
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
                letter-spacing: -2px;
            }
            .error-title { 
                font-size: 2rem; 
                margin-bottom: 20px; 
                font-weight: 600;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }
            .error-description { 
                font-size: 1.1rem; 
                opacity: 0.95; 
                line-height: 1.8;
                margin-bottom: 30px;
            }
            .domain-info {
                background: rgba(255, 255, 255, 0.1);
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 4px solid #ff6b6b;
            }
            .footer {
                margin-top: 30px;
                font-size: 0.9rem;
                opacity: 0.8;
            }
            .pulse {
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="shield-icon pulse">🛡️</div>
            <div class="error-code">403</div>
            <div class="error-title">Akses Ditolak</div>
            <div class="error-description">
                Website ini dilindungi sistem anti-clone dan hanya dapat diakses 
                melalui domain resmi yang telah diotorisasi.
            </div>
            <div class="domain-info">
                <strong>Domain saat ini:</strong> ${host}<br>
                <strong>Status:</strong> Tidak diotorisasi
            </div>
            <div class="error-description">
                Jika Anda adalah pemilik sah, pastikan mengakses melalui domain yang benar.
                <br><br>
                <strong>Domain resmi:</strong> rama-store.vercel.app
            </div>
            <div class="footer">
                © ${new Date().getFullYear()} Rama Store - Sistem Keamanan Anti-Clone Aktif
            </div>
        </div>
        
        <script>
            // Prevent console access dan debugging tools
            (function() {
                'use strict';
                
                // Disable context menu
                document.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    return false;
                });
                
                // Disable F12, Ctrl+Shift+I, Ctrl+U
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'F12' || 
                        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                        (e.ctrlKey && e.key === 'u')) {
                        e.preventDefault();
                        return false;
                    }
                });
                
                // Clear any existing timers and prevent new ones
                setTimeout(function() {
                    if (window.location.host !== 'rama-store.vercel.app' && 
                        !window.location.host.includes('localhost')) {
                        document.body.innerHTML = '<div style="color:red;text-align:center;margin-top:50vh;transform:translateY(-50%);">Access Denied</div>';
                    }
                }, 100);
            })();
        </script>
    </body>
    </html>
  `;

  return new NextResponse(htmlResponse, {
    status: 403,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive, noimageindex',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      // Custom security headers
      'X-Anti-Clone': 'protected',
      'X-Domain-Protection': 'active',
    },
  });
}

/**
 * Menambahkan security headers ke response yang valid
 */
function addSecurityHeaders(response: NextResponse, host: string): NextResponse {
  const securityHeaders: Record<string, string> = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
  };
  
  // Tambahkan HSTS hanya untuk domain produksi HTTPS
  if (IS_PRODUCTION && host.includes('vercel.app')) {
    securityHeaders['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }
  
  // Set security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Development headers
  if (IS_DEVELOPMENT) {
    response.headers.set('X-Development-Mode', 'true');
    response.headers.set('X-Anti-Clone-Status', 'active');
    response.headers.set('X-Allowed-Domain', 'true');
  }
  
  return response;
}

// ================================
// MAIN MIDDLEWARE FUNCTION
// ================================

export function middleware(request: NextRequest) {
  // Skip middleware untuk static files yang tidak sensitif
  const { pathname } = request.nextUrl;
  
  // Skip untuk file sistem Next.js dan asset publik
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/_next/image/') ||
    pathname.includes('/favicon.') ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf)$/i)
  ) {
    return NextResponse.next();
  }
  
  // Ambil host dari request
  const host = request.headers.get('host');
  
  // Periksa bypass secret terlebih dahulu (untuk emergency debugging)
  if (BYPASS_SECRET && checkBypassSecret(request)) {
    console.log('⚠️  ANTI-CLONE: Bypass secret used from:', host);
    return NextResponse.next();
  }
  
  // Periksa apakah domain diizinkan
  if (!host || !isDomainAllowed(host)) {
    return createBlockedResponse(request);
  }
  
  // Domain diizinkan - lanjutkan dengan request normal
  const response = NextResponse.next();
  
  // Tambahkan security headers
  addSecurityHeaders(response, host);
  
  // Domain diizinkan - akses berhasil
  
  return response;
}

// ================================
// MIDDLEWARE CONFIGURATION
// ================================

export const config = {
  matcher: [
    /*
     * Match semua request paths KECUALI:
     * 1. _next/static (static files Next.js)
     * 2. _next/image (Next.js image optimization)
     * 3. favicon files
     * 4. File ekstensi umum (images, fonts, css, js, etc.)
     * 
     * Pattern ini memastikan semua halaman dan API routes dilindungi
     * tapi asset statis tidak diproses untuk performa optimal
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf|xml|txt)$).*)',
  ],
};

// ================================
// TYPESCRIPT EXPORTS
// ================================

export type { NextRequest, NextResponse } from 'next/server';

// Export konfigurasi untuk referensi eksternal jika diperlukan
export const ANTI_CLONE_CONFIG = {
  ALLOWED_PRODUCTION_DOMAINS,
  ALLOWED_DEVELOPMENT_DOMAINS,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  ANTI_CLONE_ENABLED,
} as const;