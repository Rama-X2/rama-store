import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ToastProvider from '../components/ui/ToastProvider'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import { ThemeProvider } from '../components/ui/ThemeProvider'
import AntiCloneProvider from '../components/security/AntiCloneProvider'

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
  metadataBase: new URL('https://topupgame-premium.vercel.app'),
  keywords: 'top up game, mobile legends, free fire, genshin impact, pubg mobile, diamond ml, voucher game, pulsa murah, paket data, topup game indonesia, game online',
  authors: [{ name: 'TopUp Game Premium' }],
  creator: 'TopUp Game Premium',
  publisher: 'TopUp Game Premium',
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
        alt: 'TopUp Game Premium - Website Top Up Game Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rama Store - Top Up Game Terpercaya',
    description: 'Platform top up game terlengkap! Mobile Legends, Free Fire, Genshin Impact & 100+ game lainnya. Harga murah, proses instant!',
    images: ['/images/banners/banner.jpg'],
    creator: '@topupgamepremium',
  },
  alternates: {
    canonical: 'https://topupgame-premium.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
}

import { Analytics } from '@vercel/analytics/next';

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
    "url": "https://topupgame-premium.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://topupgame-premium.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://instagram.com/topupgamepremium",
      "https://facebook.com/topupgamepremium",
      "https://twitter.com/topupgamepremium"
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
        <AntiCloneProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <ToastProvider>
                {children}
                <Analytics />
              </ToastProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </AntiCloneProvider>
      </body>
    </html>
  )
}
