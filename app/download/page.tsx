import type { Metadata } from 'next'
import { ArrowRight, AppleLogo, WindowsLogo, LinuxLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'
import { Reveal } from '../components/reveal'
import { DOWNLOAD_URL } from '../lib/links'

export const metadata: Metadata = {
  title: 'Download · Relay',
  description: 'Get the Relay desktop app. macOS today, Windows and Linux next.',
}

type Build = {
  icon: React.ComponentType<{ size?: number; weight?: 'regular' | 'bold' | 'fill' }>
  label: string
  detail: string
  href: string
  status: 'ready' | 'soon'
}

const BUILDS: Build[] = [
  {
    icon: AppleLogo,
    label: 'macOS · Apple Silicon',
    detail: 'macOS 12+. M1, M2, M3, M4.',
    href: DOWNLOAD_URL,
    status: 'ready',
  },
  {
    icon: AppleLogo,
    label: 'macOS · Intel',
    detail: 'macOS 12+. x86_64 Macs.',
    href: DOWNLOAD_URL,
    status: 'ready',
  },
  {
    icon: WindowsLogo,
    label: 'Windows',
    detail: 'Windows 11 64-bit. NSIS installer.',
    href: '#',
    status: 'soon',
  },
  {
    icon: LinuxLogo,
    label: 'Linux',
    detail: 'AppImage + deb. Ubuntu 22.04+.',
    href: '#',
    status: 'soon',
  },
]

export default function DownloadPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-line">
        <div className="accent-glow absolute inset-x-0 top-0 h-[420px] pointer-events-none" />
        <div className="dotgrid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
              Download
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-fore text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] leading-[1.02] tracking-[-0.028em] font-medium max-w-[20ch] [text-wrap:balance]">
              Pick a build. Open it.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-soft text-[16.5px] sm:text-[17.5px] max-w-[62ch] leading-[1.6] [text-wrap:pretty]">
              The desktop app runs the SVM sandbox locally. No account, no
              sign-in. Source under PolyForm Noncommercial 1.0.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] text-mute uppercase tracking-[0.18em]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Free for noncommercial use
              </span>
              <span>v0.1 preview</span>
              <span>No telemetry</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal>
            <h2 className="text-fore text-[26px] sm:text-[32px] md:text-[42px] leading-[1.1] tracking-[-0.022em] font-medium max-w-[28ch] [text-wrap:balance]">
              Builds.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUILDS.map((b) => {
                const Icon = b.icon
                const ready = b.status === 'ready'
                return (
                  <article
                    key={b.label}
                    className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-[8px] border border-line bg-ink/40 text-fore">
                        <Icon size={17} weight="regular" />
                      </span>
                      <div>
                        <div className="text-fore text-[15.5px] font-medium">
                          {b.label}
                        </div>
                        <div className="mt-0.5 text-mute text-[12.5px] font-mono">
                          {b.detail}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      {ready ? (
                        <a
                          href={b.href}
                          className="group inline-flex items-center gap-2 h-[40px] px-4 rounded-[9px] bg-fore text-ink font-medium text-[13.5px] hover:bg-[#f4f6fb] transition-colors active:translate-y-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_30px_-18px_rgba(0,0,0,0.6)]"
                        >
                          Download
                          <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 h-[40px] px-4 rounded-[9px] border border-line text-mute font-mono text-[12.5px] uppercase tracking-[0.16em]">
                          Coming soon
                        </span>
                      )}
                      {ready && (
                        <span className="font-mono text-[11.5px] text-mute uppercase tracking-[0.18em]">
                          .dmg
                        </span>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="text-fore text-[24px] sm:text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] font-medium max-w-[24ch] [text-wrap:balance]">
                Prefer the source.
              </h2>
              <p className="mt-4 text-soft text-[15.5px] max-w-[50ch] leading-[1.6]">
                Clone the monorepo, run <span className="font-mono text-fore">pnpm install</span>{' '}
                and{' '}
                <span className="font-mono text-fore">pnpm --filter @relay/desktop dev</span>{' '}
                for Electron + HMR. Read the architecture notes in the docs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://github.com/hoangtuanictvn/relay"
                  className="inline-flex items-center gap-2 h-[40px] px-4 rounded-[9px] border border-line bg-surface-1 text-fore font-mono text-[13px] hover:border-line-strong transition-colors"
                >
                  <GithubLogo size={15} weight="regular" />
                  hoangtuanictvn/relay
                </a>
                <a
                  href="/docs/install"
                  className="inline-flex items-center gap-2 h-[40px] px-4 rounded-[9px] text-fore font-mono text-[13px] hover:text-accent transition-colors"
                >
                  Install guide
                  <ArrowRight size={13} weight="bold" className="opacity-60" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep">
                System requirements
              </div>
              <ul className="mt-4 space-y-3 text-[14px] text-soft leading-[1.55]">
                <li>
                  <span className="font-mono text-fore">macOS 12</span> Monterey
                  or newer.
                </li>
                <li>
                  <span className="font-mono text-fore">2 GB</span> free disk
                  per project (program ELFs + account blobs).
                </li>
                <li>
                  <span className="font-mono text-fore">Node 22</span> only if
                  you build from source. The packaged app bundles its runtime.
                </li>
                <li>
                  Archive RPC endpoint (Helius / Triton / your own) for replay
                  paths that read <span className="font-mono text-fore">slot - 1</span>.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
