'use client'

import { useMemo, useState } from 'react'
import { Download, Hash, Tag } from '@phosphor-icons/react/dist/ssr'
import { clsx } from '../components/clsx'
import { capture } from '../lib/posthog'
import type { CommunityIndex, CommunityPackage } from './types'

interface Props {
  index: CommunityIndex
}

const ALL_ID = '__all__'

function formatSize(bytes?: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function CommunityBrowser({ index }: Props) {
  const [activeCat, setActiveCat] = useState<string>(ALL_ID)

  const sortedCategories = useMemo(() => {
    return [...index.categories].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  }, [index.categories])

  const counts = useMemo(() => {
    const m = new Map<string, number>()
    for (const p of index.packages) m.set(p.categoryId, (m.get(p.categoryId) ?? 0) + 1)
    return m
  }, [index.packages])

  const visible = useMemo<CommunityPackage[]>(() => {
    if (activeCat === ALL_ID) return index.packages
    return index.packages.filter((p) => p.categoryId === activeCat)
  }, [index.packages, activeCat])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      <aside className="lg:sticky lg:top-[88px] self-start">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-soft mb-3 px-2">
          Categories
        </div>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          <CategoryButton
            label="All"
            count={index.packages.length}
            active={activeCat === ALL_ID}
            onClick={() => setActiveCat(ALL_ID)}
          />
          {sortedCategories.map((c) => (
            <CategoryButton
              key={c.id}
              label={c.title}
              count={counts.get(c.id) ?? 0}
              active={activeCat === c.id}
              onClick={() => setActiveCat(c.id)}
            />
          ))}
        </nav>
      </aside>

      <div>
        {visible.length === 0 ? (
          <div className="rounded-xl border border-line bg-surface-1 p-10 text-center text-soft text-sm">
            No packages in this category yet.
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((p) => (
              <li key={p.id}>
                <PackageCard pkg={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'whitespace-nowrap inline-flex items-center justify-between gap-3 px-3 h-9 rounded-[8px] text-[13px] font-mono border transition-colors',
        active
          ? 'border-accent/40 bg-accent/10 text-fore'
          : 'border-line bg-surface-1/40 text-soft hover:text-fore hover:border-line/80',
      )}
    >
      <span>{label}</span>
      <span
        className={clsx(
          'text-[10.5px] tabular-nums rounded-[4px] px-1.5 py-0.5',
          active ? 'bg-accent/20 text-accent-soft' : 'bg-surface-2 text-soft',
        )}
      >
        {count}
      </span>
    </button>
  )
}

// Stable hash → palette index, so the same package always gets the same colors.
function hashIdx(s: string, mod: number): number {
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h) % mod
}

const PALETTE: Array<[string, string]> = [
  ['#5d83ff', '#3a5fd8'], // accent blue
  ['#7c5cff', '#4a2dd1'], // violet
  ['#ff7a59', '#d4451c'], // coral
  ['#1fb88a', '#0e7a59'], // emerald
  ['#f5b454', '#c78919'], // amber
  ['#ff5fa2', '#c91e6d'], // pink
  ['#3ec5ff', '#0d8fc8'], // cyan
  ['#a8d04a', '#6e9a18'], // lime
]

function ComposedThumb({
  pkg,
  logoFailed,
  onLogoError,
}: {
  pkg: CommunityPackage
  logoFailed: boolean
  onLogoError: () => void
}) {
  const [c1, c2] = PALETTE[hashIdx(pkg.id, PALETTE.length)]!
  const initials = pkg.title
    .replace(/[^a-zA-Z0-9 ]+/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
  const showLogo = !!pkg.logoUrl && !logoFailed
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
    >
      {/* subtle dot grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* centered dapp logo (or initials fallback) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showLogo ? (
          <div className="h-[72%] aspect-square rounded-full overflow-hidden bg-white/10 ring-1 ring-white/25 drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pkg.logoUrl}
              alt={`${pkg.title} logo`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={onLogoError}
            />
          </div>
        ) : (
          <span className="text-white font-semibold text-[44px] leading-none tracking-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)]">
            {initials || '◆'}
          </span>
        )}
      </div>
      {/* corner brand mark */}
      <div className="absolute bottom-1.5 right-2 inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/80">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
        reley
      </div>
    </div>
  )
}

function PackageCard({ pkg }: { pkg: CommunityPackage }) {
  const [thumbFailed, setThumbFailed] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const useThumb = !!pkg.thumbnail && !thumbFailed
  return (
    <article className="group relative flex flex-col h-full overflow-hidden rounded-[10px] border border-line bg-surface-1 transition-colors hover:border-accent/40">
      <div className="relative w-full aspect-[16/9] bg-surface-2 overflow-hidden">
        {useThumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pkg.thumbnail}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setThumbFailed(true)}
          />
        ) : (
          <ComposedThumb pkg={pkg} logoFailed={logoFailed} onLogoError={() => setLogoFailed(true)} />
        )}
        {pkg.network && (
          <span className="absolute top-1.5 right-1.5 font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[4px] bg-[var(--color-ink)]/70 text-soft border border-line/70">
            {pkg.network}
          </span>
        )}
      </div>

      <div className="flex-1 p-3 flex flex-col gap-2">
        <header>
          <h3 className="text-fore text-[13px] font-medium leading-snug line-clamp-2">
            {pkg.title}
          </h3>
          {pkg.author && (
            <div className="mt-0.5 text-soft text-[10.5px] font-mono">by {pkg.author}</div>
          )}
        </header>
        <p className="text-soft text-[11.5px] leading-snug line-clamp-2 [text-wrap:pretty]">
          {pkg.description}
        </p>

        {pkg.tags && pkg.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pkg.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-0.5 text-[9.5px] font-mono px-1 py-[1px] rounded-[3px] bg-surface-2 text-soft"
              >
                <Tag size={8} weight="regular" />
                {t}
              </span>
            ))}
          </div>
        )}

        {pkg.programIds && pkg.programIds.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-mono text-soft/80 truncate">
            <Hash size={8} weight="regular" className="text-soft/50 shrink-0" />
            <span className="truncate">{pkg.programIds[0]}</span>
            {pkg.programIds.length > 1 && (
              <span className="text-soft/50 shrink-0">+{pkg.programIds.length - 1}</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-soft/70 text-[10px] font-mono tabular-nums">
            {formatSize(pkg.size)}
            {pkg.createdAt && <span className="ml-1.5">· {pkg.createdAt}</span>}
          </span>
          <a
            href={pkg.zipUrl}
            onClick={() => capture('community_download', { id: pkg.id, category: pkg.categoryId })}
            className="inline-flex items-center gap-1 h-7 px-2 rounded-[6px] bg-accent text-white font-mono text-[11px] hover:bg-[#7295ff] transition-colors"
            download
          >
            <Download size={11} weight="regular" />
            <span>Get</span>
          </a>
        </div>
      </div>
    </article>
  )
}
