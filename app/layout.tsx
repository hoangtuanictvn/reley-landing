import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { PosthogProvider } from './components/posthog-provider'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://reley.xyz'
const TITLE = 'Reley - Local SVM sandbox for Solana programs'
const DESCRIPTION =
  'Clone any on-chain Solana program. Patch PDA state. Simulate transactions on a local SVM sandbox. Publish a Solana-compatible JSON-RPC URL without touching mainnet.'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08090c',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: '%s · Reley',
  },
  description: DESCRIPTION,
  keywords: [
    'Solana',
    'SVM sandbox',
    'LiteSVM',
    'mainnet fork',
    'Solana program testing',
    'Anchor IDL',
    'PDA patch',
    'Solana JSON-RPC',
    'Solana simulator',
    'Solana developer tools',
    'Reley',
  ],
  authors: [{ name: 'Reley' }],
  applicationName: 'Reley',
  category: 'developer tools',
  creator: 'Reley',
  publisher: 'Reley',
  alternates: { canonical: SITE },
  icons: {
    icon: [{ url: '/logo-mark.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/logo-mark.svg' }],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Reley',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Reley - Lightweight Solana mainnet on your laptop',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@relaydev',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="grain" />
        <Suspense fallback={null}>
          <PosthogProvider />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
