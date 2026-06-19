import type { Metadata } from 'next'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'
import { CTA } from '../components/cta'
import { UseCase } from '../components/usecase'
import { UseCases } from '../components/usecases'
import { Reveal } from '../components/reveal'

export const metadata: Metadata = {
  title: 'Use cases · Relay',
  description:
    'What protocol developers, integrators, and security researchers build with Relay.',
}

export default function UseCasesPage() {
  return (
    <main className="relative">
      <Nav />
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden border-b border-line">
        <div className="accent-glow absolute inset-x-0 top-0 h-[420px] pointer-events-none" />
        <div className="dotgrid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
              Use cases
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-fore text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.028em] font-medium max-w-[22ch] [text-wrap:balance]">
              What people build with Relay.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-soft text-[17px] max-w-[60ch] leading-[1.6] [text-wrap:pretty]">
              Anything the live chain refuses or makes slow. Permissioned paths,
              upgrade dress rehearsals, oracle edge cases, CPI integration
              tests, CI without quotas.
            </p>
          </Reveal>
        </div>
      </section>
      <UseCases compact />
      <UseCase />
      <CTA />
      <Footer />
    </main>
  )
}
