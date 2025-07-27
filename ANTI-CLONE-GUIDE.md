# 🛡️ PANDUAN SISTEM ANTI-CLONE RAMA STORE

## 📋 Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Cara Kerja](#cara-kerja)
3. [Konfigurasi](#konfigurasi)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)
7. [Security Best Practices](#security-best-practices)
8. [Performance Optimization](#performance-optimization)
9. [Advanced Configuration](#advanced-configuration)

---

## 🔐 Pengenalan

Sistem Anti-Clone Rama Store adalah solusi keamanan server-side yang dirancang untuk:
- **Mencegah clone website** dari repository GitHub public
- **Membatasi akses** hanya ke domain resmi yang diotorisasi
- **Melindungi dari unauthorized hosting** di domain lain
- **Memberikan kontrol penuh** atas distribusi website

### ✨ Fitur Utama:
- ✅ **Server-side protection** - tidak bisa dimanipulasi dari client
- ✅ **Multiple domain support** - mendukung domain produksi & preview
- ✅ **Development friendly** - otomatis izinkan localhost
- ✅ **Custom error pages** - response 403 yang informatif
- ✅ **Security headers** - perlindungan tambahan
- ✅ **Bypass mechanism** - untuk emergency debugging
- ✅ **Comprehensive logging** - monitoring akses
- ✅ **Performance optimized** - tidak mempengaruhi kecepatan

---

## ⚙️ Cara Kerja

### 🔍 Alur Pemeriksaan:
```
Request masuk → Middleware Next.js → Cek domain → Izinkan/Blokir
```

1. **Setiap request** yang masuk akan dicek oleh middleware
2. **Domain extraction** dari header `host`
3. **Domain validation** terhadap daftar yang diizinkan
4. **Security headers** ditambahkan untuk request yang valid
5. **403 response** untuk domain tidak diizinkan

### 🎯 Domain yang Diizinkan:
- `rama-store.vercel.app` (domain utama)
- `rama-store-47at6s6j5-rama-x2s-projects.vercel.app` (preview)
- `rama-store-git-main-rama-x2s-projects.vercel.app` (git branch)
- `rama-store-rama-x2s-projects.vercel.app` (project)
- `localhost:3000` & `localhost:3001` (development)

---

## 🛠️ Konfigurasi

### 1. Environment Variables

Buat file `.env.local` berdasarkan `.env.example`:

```bash
# Domain yang diizinkan
ALLOWED_DOMAINS="rama-store.vercel.app,localhost:3000"

# Enable/disable anti-clone
ANTI_CLONE_ENABLED="true"

# Emergency bypass (opsional)
ANTI_CLONE_BYPASS_SECRET="your-secret-key-here"

# Mode strict
DOMAIN_CHECK_STRICT="true"
```

### 2. Middleware Configuration

File `middleware.ts` sudah dikonfigurasi dengan:

```typescript
// Domain produksi
const ALLOWED_PRODUCTION_DOMAINS = [
  'rama-store.vercel.app',
  'rama-store-47at6s6j5-rama-x2s-projects.vercel.app',
  // ... domain lainnya
];

// Domain development  
const ALLOWED_DEVELOPMENT_DOMAINS = [
  'localhost:3000',
  'localhost:3001',
  // ... localhost variations
];
```

### 3. Next.js Configuration

File `next.config.js` sudah include:
- Security headers
- Environment variables
- Redirects rules

---

## 🧪 Testing

### 1. Test di Development

```bash
# Start development server
npm run dev

# Akses dari localhost (should work)
http://localhost:3000

# Akses dari IP (should be blocked)
http://192.168.1.100:3000
```

### 2. Test di Production

```bash
# Deploy ke Vercel
vercel --prod

# Test domain resmi (should work)
https://rama-store.vercel.app

# Test domain fake (should be blocked)
https://fake-domain.com
```

### 3. Test Bypass Secret

```bash
# Jika ada emergency, gunakan bypass
https://fake-domain.com?bypass=YOUR_SECRET_KEY

# Atau via header
curl -H "x-bypass-secret: YOUR_SECRET_KEY" https://fake-domain.com
```

---

## 🚀 Deployment

### 1. Deployment ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables di Vercel dashboard
# Project Settings → Environment Variables
```

### 2. Environment Variables di Vercel

Tambahkan di Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Production Environment Variables
ANTI_CLONE_ENABLED=true
ALLOWED_DOMAINS=rama-store.vercel.app,rama-store-47at6s6j5-rama-x2s-projects.vercel.app
DOMAIN_CHECK_STRICT=true
ANTI_CLONE_BYPASS_SECRET=your-super-secret-key
```

### 3. Custom Domain Setup

Jika menggunakan custom domain:

```bash
# Update ALLOWED_DOMAINS
ALLOWED_DOMAINS=rama-store.com,www.rama-store.com,rama-store.vercel.app
```

---

## 🔧 Troubleshooting

### ❌ Problem: Website tidak bisa diakses di localhost

**Solusi:**
```bash
# 1. Pastikan environment variable benar
ANTI_CLONE_ENABLED=true
ALLOWED_DOMAINS="localhost:3000,localhost:3001,127.0.0.1:3000"

# 2. Restart development server
npm run dev

# 3. Clear browser cache
# Ctrl+Shift+R (Chrome) atau Cmd+Shift+R (Mac)
```

### ❌ Problem: Domain Vercel preview diblokir

**Solusi:**
```bash
# Tambahkan domain preview ke ALLOWED_DOMAINS
ALLOWED_DOMAINS="rama-store.vercel.app,rama-store-git-feature-rama-x2s-projects.vercel.app"

# Atau gunakan bypass secret sementara
https://your-preview-domain.vercel.app?bypass=YOUR_SECRET_KEY
```

### ❌ Problem: 403 error di production domain resmi

**Diagnosa:**
```bash
# 1. Check console logs di Vercel
vercel logs

# 2. Check environment variables
vercel env ls

# 3. Pastikan domain spelling exact match
# rama-store.vercel.app (benar)
# rama-store.vercel.app/ (salah - ada trailing slash)
```

### ❌ Problem: Middleware tidak berjalan

**Solusi:**
```bash
# 1. Pastikan file middleware.ts di root project
# 2. Check export config matcher
# 3. Restart development server
# 4. Clear .next folder
rm -rf .next
npm run dev
```

### ❌ Problem: Static files (images/CSS) diblokir

**Solusi:**
```typescript
// Update matcher di middleware.ts
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)$).*)',
  ],
};
```

---

## 🔒 Security Best Practices

### 1. Environment Variables Security

```bash
# ❌ JANGAN commit .env.local ke Git
echo ".env.local" >> .gitignore

# ✅ Gunakan .env.example untuk template
cp .env.example .env.local

# ✅ Use strong bypass secret
ANTI_CLONE_BYPASS_SECRET=$(openssl rand -hex 32)
```

### 2. Domain Management

```bash
# ✅ Specific domain matching
ALLOWED_DOMAINS="rama-store.vercel.app"  # Exact match

# ❌ Wildcard yang terlalu permissive
ALLOWED_DOMAINS="*.vercel.app"  # Terlalu luas
```

### 3. Monitoring & Logging

```bash
# Development: Enable detailed logging
ACCESS_LOG_LEVEL="detailed"

# Production: Basic logging saja
ACCESS_LOG_LEVEL="basic"
```

### 4. Rate Limiting (Advanced)

```typescript
// Tambahan di middleware untuk rate limiting
const rateLimitMap = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - (60 * 60 * 1000); // 1 hour
  
  const attempts = rateLimitMap.get(ip) || [];
  const validAttempts = attempts.filter(time => time > windowStart);
  
  if (validAttempts.length >= 100) { // Max 100 attempts per hour
    return false;
  }
  
  validAttempts.push(now);
  rateLimitMap.set(ip, validAttempts);
  return true;
}
```

---

## 📊 Monitoring Dashboard

### 1. Vercel Analytics

Di Vercel Dashboard, monitor:
- **Function invocations** - berapa kali middleware dijalankan
- **Error rates** - frequency 403 responses
- **Response times** - impact pada performance

### 2. Custom Logging

```typescript
// Tambahan logging di middleware
if (IS_DEVELOPMENT) {
  console.log('🛡️ Anti-clone stats:', {
    allowedAccess: successCount,
    blockedAccess: blockedCount,
    uniqueBlockedDomains: uniqueBlockedDomains.size,
    timestamp: new Date().toISOString(),
  });
}
```

### 3. Webhook Notifications (Advanced)

```typescript
// Alert via webhook untuk suspicious activity
async function sendSecurityAlert(data: any) {
  if (IS_PRODUCTION && data.blockedCount > 50) {
    await fetch('https://your-webhook-url.com/security-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'anti-clone-alert',
        message: `High number of blocked attempts: ${data.blockedCount}`,
        data,
      }),
    });
  }
}
```

---

## 🚀 Performance Optimization

### 1. Middleware Optimization

```typescript
// Cache domain checks untuk performa
const domainCache = new Map<string, boolean>();

function isDomainAllowedCached(host: string): boolean {
  if (domainCache.has(host)) {
    return domainCache.get(host)!;
  }
  
  const result = isDomainAllowed(host);
  domainCache.set(host, result);
  
  // Clear cache setiap 1 jam
  setTimeout(() => domainCache.delete(host), 60 * 60 * 1000);
  
  return result;
}
```

### 2. Static File Exclusion

```typescript
// Matcher yang optimal untuk exclude static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf|xml|txt)$).*)',
  ],
};
```

### 3. Response Caching

```typescript
// Cache 403 responses untuk mengurangi processing
const blockedResponseCache = new Map<string, NextResponse>();

function getCachedBlockedResponse(host: string): NextResponse | null {
  return blockedResponseCache.get(host) || null;
}
```

---

## 📝 Checklist Deployment

### Pre-Deployment ✅
- [ ] Update `ALLOWED_PRODUCTION_DOMAINS` di middleware.ts
- [ ] Set environment variables di Vercel
- [ ] Test middleware di development
- [ ] Commit dan push ke GitHub
- [ ] Verify .gitignore includes .env.local

### Post-Deployment ✅
- [ ] Test akses domain resmi
- [ ] Test blocking domain fake
- [ ] Check Vercel function logs
- [ ] Monitor error rates
- [ ] Test bypass secret (jika ada)
- [ ] Verify security headers

### Security Audit ✅
- [ ] Review allowed domains list
- [ ] Rotate bypass secret regularly
- [ ] Monitor suspicious access patterns
- [ ] Update security headers
- [ ] Review middleware performance

---

## 🎯 Advanced Configuration

### 1. Custom Error Pages

```typescript
// Redirect ke custom error page
function createBlockedResponse(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL('/blocked', request.url), 403);
}
```

### 2. Whitelist IP Addresses

```typescript
// Whitelist specific IP addresses
const WHITELISTED_IPS = ['203.0.113.0', '198.51.100.0'];

function isIPWhitelisted(request: NextRequest): boolean {
  const clientIP = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return WHITELISTED_IPS.includes(clientIP || '');
}
```

### 3. Time-based Access Control

```typescript
// Restrict access berdasarkan jam
function isAccessTimeAllowed(): boolean {
  const now = new Date();
  const hour = now.getHours();
  // Allow access only between 6 AM - 11 PM WIB
  return hour >= 6 && hour <= 23;
}
```

### 4. Geographic Restrictions

```typescript
// Block specific countries (contoh)
const BLOCKED_COUNTRIES = ['CN', 'RU']; // China, Russia

function isCountryAllowed(request: NextRequest): boolean {
  const country = request.headers.get('cf-ipcountry'); // Cloudflare header
  return !BLOCKED_COUNTRIES.includes(country || '');
}
```

---

## 🔗 Resources

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [HTTP Security Headers](https://owasp.org/www-project-secure-headers/)
- [Web Security Best Practices](https://web.dev/security/)

---

## 📞 Support

Jika mengalami masalah dengan sistem anti-clone:

1. **Check logs** di Vercel dashboard
2. **Verify environment variables** 
3. **Test di development** terlebih dahulu
4. **Use bypass secret** untuk emergency access
5. **Contact developer** jika masalah persisten

---

## 🚨 Emergency Commands

### Quick Disable Anti-Clone
```bash
# Via Vercel CLI
vercel env add ANTI_CLONE_ENABLED false

# Via Dashboard
# Go to Project Settings → Environment Variables
# Set ANTI_CLONE_ENABLED = false
# Redeploy
```

### Quick Add Domain
```bash
# Add new domain quickly
vercel env add ALLOWED_DOMAINS "rama-store.vercel.app,new-domain.com"
```

### Generate Bypass Secret
```bash
# Generate strong bypass secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

**© 2024 Rama Store - Anti-Clone Protection System v2.0**

*Sistem ini dirancang untuk melindungi intellectual property dan mencegah unauthorized distribution.*