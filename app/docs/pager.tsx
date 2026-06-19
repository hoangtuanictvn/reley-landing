'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { navFor, inferVariant, type Variant } from './nav-config'

const STORAGE_KEY = 'relay-docs-variant'

function flat(variant: Variant) {
  return navFor(variant).flatMap((g) => g.items.map((it) => ({ ...it, group: g.group })))
}

export function Pager({ current, variant }: { current: string; variant?: Variant }) {
  const inferred = inferVariant(current)
  const [v, setV] = useState<Variant>(variant ?? inferred ?? 'cli')

  useEffect(() => {
    if (variant) return
    if (inferred) {
      setV(inferred)
      return
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Variant | null
      if (stored === 'ui' || stored === 'cli') setV(stored)
    } catch {}
  }, [variant, inferred])

  const all = flat(v)
  const idx = all.findIndex((p) => p.href === current)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null
  return (
    <div className="mt-24 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link href={prev.href} className="group rounded-[10px] border border-line p-5 hover:border-line-strong transition-colors">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mute flex items-center gap-1.5">
            <ArrowLeft size={11} weight="bold" /> Previous
          </div>
          <div className="mt-2 text-fore text-[15px] group-hover:text-accent transition-colors">
            {prev.label}
          </div>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className="group rounded-[10px] border border-line p-5 hover:border-line-strong transition-colors sm:text-right">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mute flex items-center gap-1.5 sm:justify-end">
            Next <ArrowRight size={11} weight="bold" />
          </div>
          <div className="mt-2 text-fore text-[15px] group-hover:text-accent transition-colors">
            {next.label}
          </div>
        </Link>
      ) : <span />}
    </div>
  )
}
