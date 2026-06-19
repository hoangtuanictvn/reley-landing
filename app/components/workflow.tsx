import { Reveal } from './reveal'
import {
  ArrowRight,
  Clock,
  Coin,
  Lightning,
  Receipt,
  ArrowsClockwise,
  FastForward,
} from '@phosphor-icons/react/dist/ssr'

type Op = {
  icon: React.ComponentType<{ size?: number; weight?: 'regular' | 'bold' | 'fill' }>
  label: string
  arg: string
}

const OPS: Op[] = [
  { icon: Coin, label: 'airdrop', arg: '100 SOL → wallet' },
  { icon: Clock, label: 'warp time', arg: '+ 14d' },
  { icon: FastForward, label: 'warp slot', arg: '+ 1,209,600' },
  { icon: Lightning, label: 'send tx', arg: 'UserProg::vest_close' },
  { icon: ArrowsClockwise, label: 'snapshot', arg: 'after_vest' },
  { icon: Receipt, label: 'send tx', arg: 'UserProg::claim' },
]

export function Workflow() {
  return (
    <section
      id="workflow"
      className="relative py-28 md:py-40 border-t border-line overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-6">
        <Reveal>
          <div className="max-w-[68ch]">
            <h2 className="text-fore text-[36px] md:text-[54px] leading-[1.06] tracking-[-0.028em] font-medium [text-wrap:balance]">
              Scripted scenarios.
              <br />
              <span className="text-mute">Reusable, deterministic.</span>
            </h2>
            <p className="mt-6 text-soft text-[16.5px] leading-[1.6] [text-wrap:pretty]">
              Chain airdrops, time warps, snapshots, and transaction sends into a
              workflow. Run the same sequence against any fork of any session.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 relative">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
            <div className="relative flex flex-col md:flex-row md:items-center md:overflow-x-auto md:pb-3 gap-3 md:gap-0">
              {OPS.map((op, i) => {
                const Icon = op.icon
                return (
                  <div
                    key={op.label + i}
                    className="flex md:flex-row items-center md:shrink-0"
                  >
                    <div className="group relative flex-1 md:flex-none rounded-[12px] border border-line bg-surface-1 px-4 py-3.5 min-w-[182px] hover:border-line-strong hover:bg-surface-2 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-7 rounded-[7px] border border-line-strong flex items-center justify-center text-accent bg-ink">
                          <Icon size={14} weight="regular" />
                        </span>
                        <span className="font-mono text-[13px] text-fore">
                          {op.label}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-[11.5px] text-mute pl-[38px]">
                        {op.arg}
                      </div>
                    </div>
                    {i < OPS.length - 1 && (
                      <ArrowRight
                        size={14}
                        weight="bold"
                        className="hidden md:block mx-1 text-mute shrink-0"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20 grid md:grid-cols-3 gap-x-12 gap-y-10 max-w-[1100px]">
            {[
              {
                k: 'in-process',
                v: 'SVM sandbox via NAPI. No validator, no gossip, no RPC round-trip.',
              },
              {
                k: 'deterministic',
                v: 'Same inputs, same hash. Snapshots are canonical-JSON-stable.',
              },
              {
                k: 'offline',
                v: 'Once cached, every session runs without an RPC call.',
              },
            ].map((c) => (
              <div key={c.k} className="border-t border-line pt-6">
                <div className="font-mono text-[26px] text-fore tracking-tight tabular-nums">
                  {c.k}
                </div>
                <div className="mt-3 text-soft text-[14.5px] leading-[1.6] max-w-[28ch]">
                  {c.v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
