export type DocLink = { label: string; href: string }
export type DocGroup = { group: string; items: DocLink[] }
export type Variant = 'ui' | 'cli'

export const VARIANTS: { key: Variant; label: string }[] = [
  { key: 'ui', label: 'Desktop' },
  { key: 'cli', label: 'CLI' },
]

export type TopKey = 'overview' | 'install' | 'desktop' | 'cli'

export const TOP_MENU: { key: TopKey; label: string; href: string }[] = [
  { key: 'overview', label: 'Overview', href: '/docs' },
  { key: 'install', label: 'Install', href: '/docs/install' },
  { key: 'desktop', label: 'Desktop', href: '/docs/ui' },
  { key: 'cli', label: 'CLI', href: '/docs/cli' },
]

export const NAV_UI: DocGroup[] = [
  {
    group: 'Concepts',
    items: [
      { label: 'First session', href: '/docs/ui/first-session' },
      { label: 'Clone', href: '/docs/ui/clone' },
      { label: 'Patch', href: '/docs/ui/patch' },
      { label: 'RPC server', href: '/docs/ui/rpc' },
    ],
  },
  {
    group: 'Reference',
    items: [{ label: 'Panels', href: '/docs/ui' }],
  },
]

export const NAV_CLI: DocGroup[] = [
  {
    group: 'Concepts',
    items: [
      { label: 'First session', href: '/docs/first-session' },
      { label: 'Clone', href: '/docs/clone' },
      { label: 'Patch', href: '/docs/patch' },
      { label: 'RPC server', href: '/docs/rpc' },
    ],
  },
  {
    group: 'Reference',
    items: [{ label: 'Commands', href: '/docs/cli' }],
  },
]

export function navFor(variant: Variant): DocGroup[] {
  return variant === 'ui' ? NAV_UI : NAV_CLI
}

export function inferVariant(path: string): Variant | null {
  if (path === '/docs/ui' || path.startsWith('/docs/ui/')) return 'ui'
  if (path === '/docs/cli' || path.startsWith('/docs/cli/')) return 'cli'
  if (path === '/docs/clone' || path === '/docs/patch' || path === '/docs/rpc') return 'cli'
  if (path === '/docs/first-session') return 'cli'
  return null
}

export function topKeyFor(path: string): TopKey {
  if (path === '/docs') return 'overview'
  if (path === '/docs/install') return 'install'
  const v = inferVariant(path)
  if (v === 'ui') return 'desktop'
  return 'cli'
}
