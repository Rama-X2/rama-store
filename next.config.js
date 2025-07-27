/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers untuk anti-clone protection
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },

  // Environment variables untuk anti-clone system
  env: {
    ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS || 'rama-store.vercel.app,localhost:3000',
    ANTI_CLONE_ENABLED: process.env.ANTI_CLONE_ENABLED || 'true',
    ANTI_CLONE_BYPASS_SECRET: process.env.ANTI_CLONE_BYPASS_SECRET,
    DOMAIN_CHECK_STRICT: process.env.DOMAIN_CHECK_STRICT || 'true',
  },

  // Redirects untuk domain yang tidak diizinkan (fallback)
  async redirects() {
    return [
      // Redirect www ke non-www untuk konsistensi
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.rama-store.vercel.app',
          },
        ],
        destination: 'https://rama-store.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
  // Image optimization configuration
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000', // sesuaikan jika kamu pakai port berbeda
      pathname: '/**',
    },
  ],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 86400,
},


  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // REMOVE the experimental optimizeCss that causes critters error
  // experimental: {
  //   optimizeCss: true, // This causes the critters module error
  // },

  // Simplified webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Only add essential configurations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Optimize chunks in production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },

  // Transpile packages if needed
  transpilePackages: ['framer-motion'],

  // Use standalone output for better performance on Vercel
  output: 'standalone',
  
  // Disable sourcemaps in production to reduce build size and time
  productionBrowserSourceMaps: false,

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Compress responses
  compress: true,

  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig