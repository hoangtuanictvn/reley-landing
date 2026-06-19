'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { Brand } from './brand'
import { clsx } from './clsx'

const PRIMARY = [
  { label: 'Sandbox', href: '/#sandbox' },
  { label: 'Patch', href: '/#patch' },
  { label: 'RPC', href: '/#rpc' },
  { label: 'Docs', href: '/docs' },
]

export function Nav() {
  const path = usePathname()
  const onDocs = path === '/docs' || path.startsWith('/docs/')

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[var(--color-ink)]/72 backdrop-blur-xl border-b border-line" />
      <div className="relative mx-auto max-w-[1320px] h-[64px] px-6 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Relay home"
          className="flex items-center rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <Brand />
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-mono text-[12.5px]">
          {PRIMARY.map((it) => {
            const active = it.href === '/docs' ? onDocs : false
            return (
              <Link
                key={it.href}
                href={it.href}
                className={clsx(
                  'relative transition-colors',
                  active ? 'text-fore' : 'text-soft hover:text-fore',
                )}
              >
                {it.label}
                {active && (
                  <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-accent rounded-sm" />
                )}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/hoangtuanictvn/relay"
            aria-label="GitHub repository"
            className="inline-flex items-center justify-center h-[34px] w-[34px] rounded-[8px] text-soft hover:text-fore hover:bg-surface-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <GithubLogo size={17} weight="regular" />
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2 px-3.5 h-[34px] rounded-[8px] bg-fore text-ink font-mono text-[12.5px] hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:translate-y-[1px]"
          >
            Download
            <span className="hidden lg:inline-flex items-center px-1 h-[18px] rounded-[4px] bg-ink/20 text-[10.5px] font-mono">
              macOS
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
