/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
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