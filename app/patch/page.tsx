import type { Metadata } from 'next'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'
import { CTA } from '../components/cta'
import { Reveal } from '../components/reveal'

export const metadata: Metadata = {
  title: 'Patch · Relay',
  description:
    'Mutate any field on any cloned account. IDL-aware for Anchor, native layouts for SPL Token, raw splice for everything else.',
}

const MODES = [
  {
    kicker: 'IDL field set',
    title: 'Anchor accounts, decoded against the IDL.',
    body: 'Field-level setter, re-encoded with the discriminator preserved. Works for any account the program publishes an IDL for.',
    example: ['pool.admin', 'DLMM…7v2', '→ Bn4…wA'],
  },
  {
    kicker: 'Native layout',
    title: 'SPL Token, Token-2022, lookup tables.',
    body: 'Native account layouts surfaced as named fields - mint authority, extensions, freeze authority, addresses. No IDL required.',
    example: ['mint.authority', 'null', '→ wallet'],
  },
  {
    kicker: 'Raw splice',
    title: 'When the layout is unknown.',
    body: 'Byte-offset editor. Pick offset, supply hex bytes, save. The escape hatch for non-Anchor, non-native account types.',
    example: ['offset 96', '0x00 (8B)', '→ 0xff…'],
  },
]

const EXAMPLES = [
  {
    title: 'Make USDC mintable to your wallet',
    body: 'Patch the mint authority on the cloned USDC mint account to your local keypair. Now you can mint any supply you need to stage test scenarios.',
  },
  {
    title: 'Flip a pool admin to test owner-only paths',
    body: 'Set Meteora DLMM pool.admin to your wallet, then call the admin-only instruction your program needs to integrate with.',
  },
  {
    title: 'Push an oracle price to an extreme',
    body: 'Patch a Pyth or Switchboard feed value. Test how your liquidation, AMM, or perp engine handles edges of its config.',
  },
  {
    title: 'Backdate a vesting cliff',
    body: 'Edit the start timestamp on a vesting PDA. Combine with warp_time and your claim path runs against state that took weeks to reach on mainnet.',
  },
]

export default function PatchPage() {
  return (
    <main className="relative">
      <Nav />
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden border-b border-line">
        <div className="accent-glow absolute inset-x-0 top-0 h-[420px] pointer-events-none" />
        <div className="dotgrid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
              Patch
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-fore text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.028em] font-medium max-w-[24ch] [text-wrap:balance]">
              Mutate any field. Even what you don&apos;t own.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-soft text-[17px] max-w-[60ch] leading-[1.6] [text-wrap:pretty]">
              Patches mutate the account store directly. Use them to set up
              preconditions. Use transactions to test the code paths your
              program actually runs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-6">
          <Reveal>
            <h2 className="text-fore text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-medium max-w-[28ch]">
              Three modes. Picked automatically.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-soft text-[15.5px] max-w-[60ch] leading-[1.6]">
              Relay decodes against the IDL when one exists. Falls back to
              native layout for SPL programs. Drops to raw byte editing when
              there is no map.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {MODES.map((m) => (
                <article
                  key={m.kicker}
                  className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6"
                >
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep">
                    {m.kicker}
                  </div>
                  <h3 className="mt-3 text-fore text-[18px] leading-[1.25] tracking-[-0.01em] font-medium [text-wrap:balance]">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-soft text-[14px] leading-[1.6] [text-wrap:pretty]">
                    {m.body}
                  </p>
                  <div className="mt-5 rounded-[10px] border border-line bg-ink/60 p-3 font-mono text-[12.5px] grid grid-cols-[auto_1fr_auto] gap-x-3 items-center">
                    <span className="text-mute">{m.example[0]}</span>
                    <span className="text-soft truncate">{m.example[1]}</span>
                    <span className="text-accent">{m.example[2]}</span>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-6">
          <Reveal>
            <h2 className="text-fore text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-medium max-w-[28ch]">
              Examples.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAMPLES.map((e) => (
                <article
                  key={e.title}
                  className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6"
                >
                  <h3 className="text-fore text-[16.5px] leading-[1.3] font-medium tracking-[-0.005em]">
                    {e.title}
                  </h3>
                  <p className="mt-2.5 text-soft text-[14px] leading-[1.6] [text-wrap:pretty]">
                    {e.body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32 border-t border-line">
        <div className="mx-auto max-w-[1320px] px-6 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep">
                Scope
              </div>
              <h2 className="mt-3 text-fore text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.02em] font-medium">
                Project patches or sandbox patches.
              </h2>
              <p className="mt-4 text-soft text-[15.5px] leading-[1.6]">
                Project patches auto-apply to every sandbox on creation and on
                every reset. Sandbox patches live in one sandbox only - useful
                for scratch experiments you do not want to keep.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6 font-mono text-[12.5px] leading-[1.7]">
              <div className="flex items-center gap-3 text-mute uppercase tracking-[0.18em] text-[10.5px] mb-4">
                <span>scope</span>
                <span className="text-line-strong">·</span>
                <span>behavior</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-soft">
                <span className="text-fore">project</span>
                <span>baked into every sandbox</span>
                <span className="text-fore">project</span>
                <span>re-applies on reset</span>
                <span className="text-fore">sandbox</span>
                <span>scoped to one sandbox</span>
                <span className="text-fore">sandbox</span>
                <span>wiped on reset</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  )
}
