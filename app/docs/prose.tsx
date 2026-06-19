import type { ReactNode } from 'react'

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-fore text-[36px] md:text-[44px] leading-[1.08] tracking-[-0.025em] font-medium">
      {children}
    </h1>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-soft text-[17px] leading-[1.6] max-w-[62ch]">{children}</p>
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-16 text-fore text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.015em] font-medium scroll-mt-24"
    >
      {children}
    </h2>
  )
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="mt-10 text-fore text-[17px] font-medium scroll-mt-24"
    >
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-soft text-[15.5px] leading-[1.7] max-w-[68ch]">{children}</p>
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[13px] px-1.5 py-0.5 rounded-[5px] bg-surface-1 border border-line text-fore">
      {children}
    </code>
  )
}

export function Pre({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="mt-6 rounded-[10px] border border-line bg-[#0b0c10] overflow-hidden">
      {label && (
        <div className="px-4 py-2 border-b border-line font-mono text-[11px] text-mute">
          {label}
        </div>
      )}
      <pre className="px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-soft overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  )
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-2.5 max-w-[66ch]">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-soft text-[15px] leading-[1.6]">
          <span aria-hidden className="mt-[10px] h-[4px] w-[4px] rounded-full bg-line-strong shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function Shot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="mt-6 rounded-[10px] border border-line bg-[#0b0c10] overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block w-full h-auto"
      />
      {caption && (
        <figcaption className="px-5 py-3 border-t border-line font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function Callout({ kind = 'info', children }: { kind?: 'info' | 'warn'; children: ReactNode }) {
  const tint =
    kind === 'warn'
      ? 'border-[#d8a86a]/30 bg-[#d8a86a]/[0.04]'
      : 'border-accent/30 bg-accent/[0.04]'
  return (
    <div className={`mt-6 rounded-[10px] border ${tint} px-5 py-4 max-w-[68ch]`}>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mute mb-1.5">
        {kind === 'warn' ? 'caveat' : 'note'}
      </div>
      <div className="text-soft text-[14.5px] leading-[1.6]">{children}</div>
    </div>
  )
}
