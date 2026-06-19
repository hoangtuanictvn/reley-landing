'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navFor, inferVariant, type Variant } from './nav-config'
import { clsx } from '../components/clsx'

const STORAGE_KEY = 'relay-docs-variant'

export function Sidebar() {
  const path = usePathname()
  const [variant, setVariant] = useState<Variant>('cli')

  useEffect(() => {
    const fromPath = inferVariant(path)
    if (fromPath) {
      setVariant(fromPath)
      try {
        localStorage.setItem(STORAGE_KEY, fromPath)
      } catch {}
      return
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Variant | null
      if (stored === 'ui' || stored === 'cli') setVariant(stored)
    } catch {}
  }, [path])

  const groups = navFor(variant)
  const isGettingStarted = path === '/docs' || path === '/docs/install'

  if (isGettingStarted) return null

  return (
    <aside className="hidden lg:block w-[244px] shrink-0 border-r border-line">
      <nav className="sticky top-[112px] py-10 pr-6 max-h-[calc(100dvh-112px)] overflow-y-auto">
        <ul className="space-y-9">
          {groups.map((g) => (
            <li key={g.group}>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mute mb-3">
                {g.group}
              </div>
              <ul className="space-y-1.5">
                {g.items.map((it) => {
                  const active = path === it.href
                  return (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className={clsx(
                          'block text-[13.5px] py-1 transition-colors',
                          active
                            ? 'text-fore font-medium'
                            : 'text-soft hover:text-fore',
                        )}
                      >
                        {active && (
                          <span className="inline-block w-[3px] h-[14px] rounded-sm bg-accent mr-2 align-middle" />
                        )}
                        {it.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
