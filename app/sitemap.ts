import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://relay.dev'

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/patch', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/rpc', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/use-cases', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/download', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/waitlist', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/docs', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/docs/install', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/docs/first-session', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/docs/clone', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/docs/patch', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/docs/rpc', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/docs/architecture', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/docs/cli', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/docs/ui', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/docs/ui/clone', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/docs/ui/patch', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/docs/ui/rpc', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/docs/ui/first-session', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
