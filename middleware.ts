import { NextRequest, NextResponse } from 'next/server';

// Konfigurasi domain yang diizinkan
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

// Mode development
const DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

/**
 * Fungsi untuk memeriksa apakah domain mengandung "rama-store"
 * @param host - Host dari request
 * @returns boolean - True jika domain diizinkan
 */
function isDomainAllowed(host: string): boolean {
  if (!host) return false;

  // Normalisasi host (hapus www. dan ubah ke lowercase)
  const normalizedHost = host.replace(/^www\./, '').toLowerCase();

  // Dalam mode development, izinkan localhost
  if (DEVELOPMENT_MODE) {
    if (ALLOWED_DEVELOPMENT_DOMAINS.some(domain => 
      normalizedHost === domain.toLowerCase() || 
      normalizedHost.startsWith(domain.toLowerCase())
    )) {
      return true;
    }
  }

  // Periksa apakah domain mengandung "rama-store" di posisi manapun
  const containsRamaStore = ALLOWED_BASE_DOMAINS.some(baseDomain => 
    normalizedHost.includes(baseDomain.toLowerCase())
  );

  if (containsRamaStore) {
    // Jika mengandung "rama-store", periksa apakah menggunakan TLD yang diizinkan
    const hasValidTLD = ALLOWED_TLD.some(tld => 
      normalizedHost.endsWith(tld.toLowerCase())
    );
    
    if (hasValidTLD) {
      return true;
    }
    
    // Khusus untuk Vercel, izinkan semua subdomain yang mengandung "rama-store"
    if (normalizedHost.includes('vercel.app')) {
      return true;
    }
  }

  return false;
}

/**
 * Fungsi untuk membuat response 403 yang aman
 * @param request - NextRequest object
 * @returns NextResponse - Response 403 dengan pesan error
 */
function createForbiddenResponse(request: NextRequest): NextResponse {
  const clientIP = request.ip || 
                   request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const host = request.headers.get('host') || 'unknown';
  
  // Log attempt untuk monitoring (hanya di development)
  if (DEVELOPMENT_MODE) {
    console.log(`🚫 Access blocked from unauthorized domain:`, {
      host,
      ip: clientIP,
      userAgent: userAgent.substring(0, 100),
      url: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  // Response HTML dengan styling yang sesuai dengan desain website
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>403 - Akses Ditolak | Rama Store</title>
        <style>
            * { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
            }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                overflow: hidden;
            }
            .container {
                text-align: center;
                max-width: 600px;
                background: rgba(255, 255, 255, 0.1);
                padding: 60px 40px;
                border-radius: 24px;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                animation: fadeInUp 0.6s ease-out;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .icon { 
                font-size: 5rem; 
                margin-bottom: 24px;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .error-code { 
                font-size: 7rem; 
                font-weight: 900; 
                margin-bottom: 16px;
                text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
                background: linear-gradient(45deg, #ff6b6b, #ffd93d);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .error-title { 
                font-size: 2.5rem; 
                margin-bottom: 24px; 
                font-weight: 700;
                text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
            }
            .error-message { 
                font-size: 1.2rem; 
                margin-bottom: 32px; 
                opacity: 0.95; 
                line-height: 1.6;
                font-weight: 300;
            }
            .domain-info {
                background: rgba(0, 0, 0, 0.2);
                padding: 16px;
                border-radius: 12px;
                margin-top: 24px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                border-left: 4px solid rgba(255, 255, 255, 0.3);
            }
            .brand {
                margin-top: 32px;
                font-size: 1.5rem;
                font-weight: 600;
                background: linear-gradient(45deg, #4facfe, #00f2fe);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1;
            }
            .particle {
                position: absolute;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                animation: float 6s ease-in-out infinite;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        </style>
    </head>
    <body>
        <div class="particles">
            <div class="particle" style="left: 10%; top: 20%; width: 20px; height: 20px; animation-delay: 0s;"></div>
            <div class="particle" style="left: 80%; top: 30%; width: 15px; height: 15px; animation-delay: 1s;"></div>
            <div class="particle" style="left: 60%; top: 70%; width: 25px; height: 25px; animation-delay: 2s;"></div>
            <div class="particle" style="left: 20%; top: 80%; width: 18px; height: 18px; animation-delay: 3s;"></div>
        </div>
        
        <div class="container">
            <div class="icon">🚫</div>
            <div class="error-code">403</div>
            <div class="error-title">Akses Ditolak</div>
            <div class="error-message">
                Website ini hanya dapat diakses melalui domain resmi Rama Store.
                <br><br>
                Jika Anda adalah pemilik yang sah, pastikan Anda mengakses melalui domain yang benar.
            </div>
            
            <div class="domain-info">
                <strong>Domain saat ini:</strong><br>
                ${host}
            </div>
            
            <div class="brand">🎮 Rama Store</div>
        </div>
    </body>
    </html>
  `;

  return new NextResponse(htmlResponse, {
    status: 403,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      // Security headers
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'X-XSS-Protection': '1; mode=block',
    },
  });
}

/**
 * Middleware utama untuk Next.js
 * @param request - NextRequest object
 * @returns NextResponse - Response yang sesuai
 */
export function middleware(request: NextRequest) {
  // Ambil host dari header
  const host = request.headers.get('host');
  
  // Periksa apakah domain diizinkan
  if (!host || !isDomainAllowed(host)) {
    return createForbiddenResponse(request);
  }

  // Jika domain diizinkan, lanjutkan dengan request normal
  const response = NextResponse.next();
  
  // Tambahkan header keamanan untuk response yang valid
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  
  // Header untuk identifikasi domain yang valid (hanya di development)
  if (DEVELOPMENT_MODE) {
    response.headers.set('X-Allowed-Domain', 'true');
    response.headers.set('X-Request-Host', host);
    response.headers.set('X-Timestamp', new Date().toISOString());
  }

  return response;
}

/**
 * Konfigurasi matcher untuk middleware
 * Menentukan path mana saja yang akan diproses oleh middleware
 */
export const config = {
  matcher: [
    /*
     * Match semua request paths kecuali:
     * - _next/static (static files)  
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files di public folder dengan ekstensi file umum
     * - API routes yang tidak memerlukan domain validation
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|mp4|webm|ogg|mp3|wav|flac|aac)$).*)',
  ],
};
