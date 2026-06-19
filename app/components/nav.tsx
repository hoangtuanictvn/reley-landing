'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GithubLogo, List, X } from '@phosphor-icons/react/dist/ssr'
import { Brand } from './brand'
import { clsx } from './clsx'

const PRIMARY = [
  { label: 'Sandbox', href: '/#sandbox' },
  { label: 'Patch', href: '/patch' },
  { label: 'RPC', href: '/rpc' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Download', href: '/download' },
  { label: 'Docs', href: '/docs' },
]

export function Nav() {
  const path = usePathname()
  const onDocs = path === '/docs' || path.startsWith('/docs/')
  const onUseCases = path === '/use-cases'
  const onPatch = path === '/patch'
  const onRpc = path === '/rpc'
  const onCloud = path === '/waitlist'
  const onDownload = path === '/download'
  const onHome = path === '/'

  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false)
  }, [path])

  // Lock body scroll while menu is open.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function isActive(href: string) {
    if (href === '/docs') return onDocs
    if (href === '/use-cases') return onUseCases
    if (href === '/patch') return onPatch
    if (href === '/rpc') return onRpc
    if (href === '/waitlist') return onCloud
    if (href === '/download') return onDownload
    if (href === '/#sandbox') return onHome
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[var(--color-ink)]/72 backdrop-blur-xl border-b border-line" />
      <div className="relative mx-auto max-w-[1320px] h-[64px] px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Reley home"
          className="flex items-center rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink shrink-0"
        >
          <Brand />
        </Link>
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[12.5px]">
          {PRIMARY.map((it) => {
            const active = isActive(it.href)
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
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 h-[34px] px-4 rounded-[8px] bg-accent text-white font-medium font-mono text-[12.5px] hover:bg-[#7295ff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:translate-y-[1px]"
            aria-label="Sign up for the cloud waitlist"
          >
            Signup
          </Link>
          <a
            href="https://github.com/hoangtuanictvn/reley"
            aria-label="GitHub repository"
            className="hidden sm:inline-flex items-center justify-center h-[34px] w-[34px] rounded-[8px] text-soft hover:text-fore hover:bg-surface-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <GithubLogo size={17} weight="regular" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-[34px] w-[34px] rounded-[8px] text-soft hover:text-fore hover:bg-surface-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {menuOpen ? <X size={18} weight="regular" /> : <List size={18} weight="regular" />}
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] z-40">
          <div
            aria-hidden
            className="absolute inset-0 bg-[var(--color-ink)]/85 backdrop-blur-xl"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative mx-auto max-w-[1320px] px-4 py-6">
            <nav className="flex flex-col gap-1">
              {PRIMARY.map((it) => {
                const active = isActive(it.href)
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={clsx(
                      'flex items-center justify-between rounded-[10px] px-4 py-3 text-[15px] transition-colors border border-line',
                      active ? 'text-fore bg-surface-1' : 'text-soft hover:text-fore hover:bg-surface-1',
                    )}
                  >
                    <span>{it.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Link>
                )
              })}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-[10px] bg-accent text-white font-medium text-[14.5px] hover:bg-[#7295ff] transition-colors"
              >
                Signup
              </Link>
              <a
                href="https://github.com/hoangtuanictvn/reley"
                className="inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-[10px] border border-line text-fore font-mono text-[13px] hover:bg-surface-1 transition-colors"
              >
                <GithubLogo size={15} weight="regular" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
