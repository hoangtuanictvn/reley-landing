import type { Metadata } from 'next'
import { Footer } from '../components/footer'
import { Nav } from '../components/nav'
import { Reveal } from '../components/reveal'
import { CommunityBrowser } from './CommunityBrowser'
import type { CommunityIndex } from './types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Community packages · Reley',
  description:
    'Ready-to-run Reley project snapshots. Lending markets, DEX pools, perps, NFT — clone, patch, sandbox in one click.',
}

const FALLBACK_INDEX_URL = '/community/packages.example.json'

async function fetchIndex(): Promise<CommunityIndex | null> {
  const url = process.env.NEXT_PUBLIC_COMMUNITY_INDEX_URL
  const target = url && url.length > 0 ? url : null
  if (target) {
    try {
      const res = await fetch(target, { next: { revalidate: 60 } })
      if (res.ok) return (await res.json()) as CommunityIndex
    } catch {
      /* fall through to local fallback */
    }
  }
  try {
    const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${site}${FALLBACK_INDEX_URL}`, { cache: 'no-store' })
    if (res.ok) return (await res.json()) as CommunityIndex
  } catch {
    /* ignored */
  }
  return null
}

export default async function CommunityPage() {
  const index = await fetchIndex()

  return (
    <main className="relative">
      <Nav />
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14 overflow-hidden border-b border-line">
        <div className="accent-glow absolute inset-x-0 top-0 h-[420px] pointer-events-none" />
        <div className="dotgrid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
              Community
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-fore text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.028em] font-medium max-w-[22ch] [text-wrap:balance]">
              Ready-to-run snapshots.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-soft text-[17px] max-w-[60ch] leading-[1.6] [text-wrap:pretty]">
              Download a packaged Reley project. Programs, accounts, and patches
              pre-loaded — open the zip, hit run.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-[1320px] px-6">
          {index ? (
            <CommunityBrowser index={index} />
          ) : (
            <div className="rounded-xl border border-line bg-surface-1 p-10 text-center">
              <div className="text-fore text-lg font-medium">Catalog unavailable</div>
              <p className="mt-2 text-soft text-sm max-w-[48ch] mx-auto">
                Could not load the package index. Set{' '}
                <code className="font-mono text-accent">NEXT_PUBLIC_COMMUNITY_INDEX_URL</code> to
                your R2 URL, or check that{' '}
                <code className="font-mono text-accent">/community/packages.example.json</code>{' '}
                is reachable.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
