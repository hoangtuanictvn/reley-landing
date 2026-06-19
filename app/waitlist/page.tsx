import type { Metadata } from 'next'
import { Cloud, Lightning, ShieldCheck, Users } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'
import { Reveal } from '../components/reveal'
import { Waitlist } from '../components/waitlist'

export const metadata: Metadata = {
  title: 'Relay Cloud · Waitlist',
  description:
    'Shared, persistent Relay sandboxes in the cloud. Team-wide replays, snapshots, and JSON-RPC URLs your CI can hit. Join the waitlist.',
}

const FEATURES = [
  {
    icon: Cloud,
    title: 'Sandboxes that live past your laptop',
    body: 'Persistent state on managed infra. Resume a sandbox tomorrow, or hand it to a teammate, exactly where you left off.',
  },
  {
    icon: Users,
    title: 'Team replays + shared snapshots',
    body: 'Snapshots and workflows shared by URL. Show a reviewer the exact state behind a bug instead of describing it.',
  },
  {
    icon: Lightning,
    title: 'A JSON-RPC URL your CI can hit',
    body: 'Each sandbox gets a stable HTTPS endpoint. Wire it into integration tests, staging dApps, or a private devnet.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    body: 'Single-tenant runtimes, scoped tokens, audit log. Bring your own RPC. Bring your own key material.',
  },
]

const WAITLIST_ENABLED = !!process.env.RESEND_API_KEY

export default function CloudPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-line">
        <div className="accent-glow absolute inset-x-0 top-0 h-[460px] pointer-events-none" />
        <div className="dotgrid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
              Relay Cloud
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-fore text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] leading-[1.02] tracking-[-0.028em] font-medium max-w-[22ch] [text-wrap:balance]">
              Sandboxes your whole team can share.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-soft text-[16.5px] sm:text-[17.5px] max-w-[62ch] leading-[1.6] [text-wrap:pretty]">
              The local app stays local. Cloud is the hosted side: persistent
              sandboxes, shared snapshots, an HTTPS JSON-RPC URL per sandbox.
              We&apos;re opening it in waves. Drop your email to get in.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10">
              <Waitlist source="cloud-hero" enabled={WAITLIST_ENABLED} />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11px] text-mute uppercase tracking-[0.18em]">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Private beta
              </span>
              <span>Free during preview</span>
              <span>No credit card</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal>
            <h2 className="text-fore text-[26px] sm:text-[32px] md:text-[42px] leading-[1.1] tracking-[-0.022em] font-medium max-w-[26ch] [text-wrap:balance]">
              What changes in cloud.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-soft text-[15.5px] max-w-[60ch] leading-[1.6]">
              Same clone, patch, simulate flow. Same SVM sandbox. New: it
              outlives the tab and the rest of the team can see it.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <article
                    key={f.title}
                    className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6"
                  >
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-[8px] border border-line bg-ink/40 text-accent">
                      <Icon size={17} weight="regular" />
                    </span>
                    <h3 className="mt-5 text-fore text-[16px] leading-[1.3] tracking-[-0.005em] font-medium [text-wrap:balance]">
                      {f.title}
                    </h3>
                    <p className="mt-2.5 text-soft text-[14px] leading-[1.6] [text-wrap:pretty]">
                      {f.body}
                    </p>
                  </article>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            <Reveal>
              <div>
                <h2 className="text-fore text-[26px] sm:text-[32px] md:text-[42px] leading-[1.1] tracking-[-0.022em] font-medium max-w-[24ch] [text-wrap:balance]">
                  Who we&apos;re letting in first.
                </h2>
                <p className="mt-4 text-soft text-[15.5px] max-w-[50ch] leading-[1.6]">
                  Protocol teams running integration tests against another team&apos;s
                  program. Security researchers replaying mainnet incidents.
                  Anyone whose laptop already has 6 Relay projects open.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6 lg:p-8">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep">
                  Be early
                </div>
                <h3 className="mt-3 text-fore text-[20px] leading-[1.25] font-medium">
                  Join the waitlist.
                </h3>
                <p className="mt-2 text-soft text-[14px] leading-[1.6] max-w-[44ch]">
                  We email everyone on the list when the next wave opens. One
                  email per launch. Unsubscribe instantly.
                </p>
                <div className="mt-5">
                  <Waitlist source="cloud-secondary" compact enabled={WAITLIST_ENABLED} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
