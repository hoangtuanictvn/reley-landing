'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TOP_MENU, topKeyFor } from './nav-config'
import { clsx } from '../components/clsx'

export function TopMenu() {
  const path = usePathname()
  const active = topKeyFor(path)

  return (
    <div className="fixed top-[64px] left-0 right-0 z-40 border-b border-line bg-[var(--color-ink)]/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div className="flex items-center gap-1 h-[48px] overflow-x-auto">
          {TOP_MENU.map((m) => {
            const isActive = active === m.key
            return (
              <Link
                key={m.key}
                href={m.href}
                className={clsx(
                  'relative px-4 py-3 font-mono text-[12.5px] tracking-tight shrink-0 transition-colors',
                  isActive ? 'text-fore' : 'text-soft hover:text-fore',
                )}
              >
                {m.label}
                {isActive && (
                  <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-accent" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
