import { Bento } from './components/bento'
import { CTA } from './components/cta'
import { Footer } from './components/footer'
import { Hero } from './components/hero'
import { Nav } from './components/nav'
import { Trust } from './components/trust'
import { UseCase } from './components/usecase'
import { Workflow } from './components/workflow'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://reley.xyz'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE}/#app`,
      name: 'Reley',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS',
      description:
        'Local SVM sandbox for Solana programs. Clone, patch, simulate, publish a JSON-RPC URL.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: SITE,
      image: `${SITE}/og.png`,
      softwareVersion: '0.1',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#org`,
      name: 'Reley',
      url: SITE,
      logo: `${SITE}/logo-mark.svg`,
      sameAs: ['https://github.com/hoangtuanictvn/reley'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#site`,
      name: 'Reley',
      url: SITE,
      publisher: { '@id': `${SITE}/#org` },
    },
  ],
}

export default function Page() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        // biome-ignore lint: structured-data inline
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Nav />
      <Hero />
      <Trust />
      <Bento />
      <UseCase />
      <Workflow />
      <CTA />
      <Footer />
    </main>
  )
}
