import { ArrowRight, BookOpen, Lightning, FileCode, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './reveal'
import { HeroParticles } from './hero-particles'
import { DOWNLOAD_URL } from '../lib/links'

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-24 pb-20 md:pt-36 md:pb-40 overflow-hidden"
    >
      <div className="hero-orb" />
      <div className="hero-grid" />
      <div className="hero-scan" style={{ top: '12%' }} />
      <div className="hero-scan" style={{ top: '42%', animationDelay: '3.5s' }} />
      <div className="accent-glow absolute inset-x-0 top-0 h-[560px] pointer-events-none" />
      <HeroParticles />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_1.12fr] gap-10 lg:gap-16 items-center">
          <div className="lg:pt-2">
            <Reveal>
              <h1 className="text-fore text-[34px] sm:text-[42px] md:text-[58px] lg:text-[68px] leading-[1.04] tracking-[-0.028em] font-medium [text-wrap:balance]">
                Lightweight Solana mainnet
                <br />
                <span className="text-mute">on your laptop.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 sm:mt-7 max-w-[54ch] text-soft text-[15.5px] sm:text-[17.5px] leading-[1.55] [text-wrap:pretty]">
                Clone any Solana program into a local SVM sandbox. Patch PDA
                state, simulate transactions, publish a local JSON-RPC
                endpoint.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={DOWNLOAD_URL}
                  className="group inline-flex items-center gap-2 h-[46px] px-5 rounded-[10px] bg-fore text-ink font-medium text-[14.5px] hover:bg-[#f4f6fb] transition-all active:translate-y-[1px] focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_22px_40px_-22px_rgba(0,0,0,0.6)]"
                >
                  Download for macOS
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="/docs"
                  className="group inline-flex items-center gap-2 h-[46px] px-4 rounded-[10px] text-fore font-mono text-[13.5px] hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <BookOpen size={16} weight="regular" />
                  Read the docs
                  <ArrowRight
                    size={13}
                    weight="bold"
                    className="opacity-60 transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-[440px]">
                <Stat k="0.84s" v="Program cached" />
                <Stat k="47" v="Accounts hydrated" />
                <Stat k="24" v="RPC methods" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <div className="relative">
              {/* halo */}
              <div className="absolute -inset-12 rounded-[28px] bg-[radial-gradient(60%_60%_at_70%_0%,rgba(93,131,255,0.22),transparent_70%),radial-gradient(50%_60%_at_15%_60%,rgba(93,131,255,0.10),transparent_70%)] blur-2xl pointer-events-none" />

              {/* window */}
              <div className="relative float-y">
                <div className="shine-edge rounded-[16px]">
                  <div className="relative rounded-[16px] border border-line bg-[#0b0c10] overflow-hidden code-shadow">
                    <div className="flex items-center gap-2 px-4 h-[36px] border-b border-line bg-[#0d0f15]">
                      <div className="flex gap-1.5">
                        <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
                        <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
                        <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
                      </div>
                      <span className="ml-3 font-mono text-[11px] text-mute">
                        reley · pamm · env/current-local-clean
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10.5px] text-mute uppercase tracking-[0.18em]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        live
                      </span>
                    </div>
                    <img
                      src="/docs/ui/workflow-detail.png"
                      alt="Reley app showing a step-by-step test running on a local copy of a Solana app"
                      loading="eager"
                      className="block w-full h-auto"
                    />
                  </div>
                </div>

                {/* floating annotation chips */}
                <div className="hidden md:block">
                  <div
                    className="absolute -left-6 top-[24%] z-10 rounded-[12px] border border-line bg-surface-1/85 backdrop-blur-md px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
                    style={{ animation: 'float-y 9s ease-in-out infinite' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 rounded-[8px] bg-accent/15 text-accent inline-flex items-center justify-center">
                        <CheckCircle size={15} weight="fill" />
                      </span>
                      <div>
                        <div className="font-mono text-[10.5px] text-mute uppercase tracking-[0.2em]">
                          cloned
                        </div>
                        <div className="font-mono text-[12.5px] text-fore">
                          MET_DLMM + 47 accts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute -right-6 top-[6%] z-10 rounded-[12px] border border-line bg-surface-1/85 backdrop-blur-md px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
                    style={{ animation: 'float-y 8s ease-in-out infinite', animationDelay: '1.5s' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 rounded-[8px] bg-surface-2 text-soft inline-flex items-center justify-center border border-line">
                        <FileCode size={15} weight="regular" />
                      </span>
                      <div>
                        <div className="font-mono text-[10.5px] text-mute uppercase tracking-[0.2em]">
                          IDL
                        </div>
                        <div className="font-mono text-[12.5px] text-fore">
                          anchor v0.30.1
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute -right-4 bottom-[12%] z-10 rounded-[12px] border border-line bg-surface-1/85 backdrop-blur-md px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
                    style={{ animation: 'float-y 10s ease-in-out infinite', animationDelay: '2.8s' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 rounded-[8px] bg-accent/12 text-accent inline-flex items-center justify-center">
                        <Lightning size={15} weight="fill" />
                      </span>
                      <div>
                        <div className="font-mono text-[10.5px] text-mute uppercase tracking-[0.2em]">
                          patch
                        </div>
                        <div className="font-mono text-[12.5px] text-fore">
                          pool.admin → wallet
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-l border-line pl-3.5">
      <div className="font-mono text-[22px] text-fore tracking-[-0.01em] tabular-nums">
        {k}
      </div>
      <div className="mt-1 font-mono text-[10.5px] text-mute uppercase tracking-[0.2em] leading-snug">
        {v}
      </div>
    </div>
  )
}
