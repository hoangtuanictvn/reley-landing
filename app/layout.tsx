import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Relay · LiteSVM sandbox for Solana programs',
  description:
    'Clone any on-chain Solana program. Patch PDA state. Simulate transactions locally. Without touching mainnet.',
  metadataBase: new URL('https://relay.dev'),
  icons: {
    icon: [{ url: '/logo-mark.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Relay · LiteSVM sandbox for Solana programs',
    description:
      'Clone any on-chain Solana program. Patch PDA state. Simulate transactions locally.',
    type: 'website',
    images: [{ url: '/logo.svg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  )
}
