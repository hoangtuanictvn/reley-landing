import type { ReactNode } from 'react'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'

export function LegalShell({
  kicker,
  title,
  effective,
  children,
}: {
  kicker: string
  title: string
  effective: string
  children: ReactNode
}) {
  return (
    <main className="relative">
      <Nav />
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 border-b border-line">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
            {kicker}
          </div>
          <h1 className="mt-3 text-fore text-[34px] sm:text-[42px] md:text-[52px] leading-[1.04] tracking-[-0.025em] font-medium [text-wrap:balance]">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.2em] text-mute">
            Effective {effective}
          </p>
        </div>
      </section>
      <article className="legal-prose mx-auto max-w-[820px] px-4 sm:px-6 py-16 md:py-24">
        {children}
      </article>
      <Footer />
    </main>
  )
}
