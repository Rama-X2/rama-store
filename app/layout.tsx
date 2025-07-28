import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ToastProvider from '../components/ui/ToastProvider'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import { ThemeProvider } from '../components/ui/ThemeProvider'
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6366f1',
  colorScheme: 'dark light',
}

export const metadata = {
  title: 'Rama Store - Website Top Up Game Terpercaya Indonesia',
  description: 'Platform top up game terlengkap di Indonesia! Mobile Legends, Free Fire, Genshin Impact, PUBG Mobile, dan 100+ game lainnya. Harga murah, proses instant, aman & terpercaya.',
  metadataBase: new URL('https://rama-store.vercel.app'),
  keywords: 'top up game, mobile legends, free fire, genshin impact, pubg mobile, diamond ml, voucher game, pulsa murah, paket data, topup game indonesia, game online',
  authors: [{ name: 'Rama Store' }],
  creator: 'Rama Store',
  publisher: 'Rama Store',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: 'Rama Store - Website Top Up Game Terpercaya Indonesia',
    description: 'Platform top up game terlengkap di Indonesia! Mobile Legends, Free Fire, Genshin Impact, PUBG Mobile, dan 100+ game lainnya. Harga murah, proses instant, aman & terpercaya.',
    siteName: 'Rama Store',
    images: [
      {
        url: '/images/banners/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Rama Store - Website Top Up Game Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rama Store - Top Up Game Terpercaya',
    description: 'Platform top up game terlengkap! Mobile Legends, Free Fire, Genshin Impact & 100+ game lainnya. Harga murah, proses instant!',
    images: ['/images/banners/banner.jpg'],
    creator: '@ramastore',
  },
  alternates: {
    canonical: 'https://rama-store.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rama Store",
    "description": "Platform top up game terlengkap di Indonesia",
    "url": "https://rama-store.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://rama-store.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://instagram.com/rama_tcp",
      "https://facebook.com/ramastore",
      "https://twitter.com/ramastore"
    ]
  }

  return (
    <html lang="id" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const root = document.documentElement;
                  
                  // Remove any existing theme classes
                  root.classList.remove('light', 'dark');
                  
                  if (theme === 'light') {
                    root.classList.add('light');
                  } else if (theme === 'system') {
                    const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    root.classList.add(isDarkSystem ? 'dark' : 'light');
                  } else {
                    // Default to dark mode (including when theme is null/undefined)
                    root.classList.add('dark');
                    if (!theme) {
                      localStorage.setItem('theme', 'dark');
                    }
                  }
                } catch (e) {
                  // Fallback to dark mode
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            <ToastProvider>
              {children}
              <Analytics />
            </ToastProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
