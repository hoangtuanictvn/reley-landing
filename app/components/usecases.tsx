import {
  Coins,
  Lock,
  ArrowsClockwise,
  Lightning,
  Wrench,
  ShieldCheck,
  Code,
  Receipt,
} from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './reveal'

type UseCase = {
  icon: React.ComponentType<{ size?: number; weight?: 'regular' | 'bold' | 'fill' }>
  kicker: string
  title: string
  body: string
}

const CASES: UseCase[] = [
  {
    icon: Lock,
    kicker: 'Permissioned paths',
    title: "Run the admin path you don't have keys for.",
    body: 'Patch a pool admin, vault manager, or program upgrade authority to your wallet. Walk the CPI tree locally.',
  },
  {
    icon: Coins,
    kicker: 'Mint anything',
    title: 'Mint USDC, BONK, or any token to your wallet.',
    body: 'Flip mint authority on a cloned mint. Fund test scenarios with as much liquidity as you need.',
  },
  {
    icon: ArrowsClockwise,
    kicker: 'Replay + debug',
    title: 'Re-run a failed mainnet tx with a debugger.',
    body: 'Hydrate at slot - 1, execute locally, compare account diffs and CU per frame against the chain.',
  },
  {
    icon: Wrench,
    kicker: 'Edge cases',
    title: 'Push oracles to extreme prices. Force liquidations.',
    body: 'Set Pyth / Switchboard feeds to any value. Test how your program behaves at the edge of its config.',
  },
  {
    icon: ShieldCheck,
    kicker: 'Upgrades',
    title: 'Test the new program before you redeploy.',
    body: 'Clone live state, swap in the new program, replay top traffic. Catch regressions before mainnet does.',
  },
  {
    icon: Code,
    kicker: 'CPI integration',
    title: 'Wire your program against any protocol locally.',
    body: 'Clone Meteora, Kamino, Jupiter, Drift, anything. Build the CPI path, simulate, ship with confidence.',
  },
  {
    icon: Lightning,
    kicker: 'Workflows',
    title: 'Reproduce bugs your team can re-run with one click.',
    body: 'Stack airdrops, warps, snapshots, txs into a script. Share the sandbox as a JSON-RPC URL.',
  },
  {
    icon: Receipt,
    kicker: 'CI + tests',
    title: 'Run integration tests without RPC quotas.',
    body: 'SVM sandbox boots in milliseconds. No archive node, no rate limits, no shared state.',
  },
]

export function UseCases({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="usecases"
      className={`relative ${compact ? 'py-16 md:py-24' : 'py-20 md:py-36 border-t border-line'}`}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {!compact && (
          <>
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
                Use cases
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-fore text-[28px] sm:text-[36px] md:text-[48px] lg:text-[54px] leading-[1.04] tracking-[-0.028em] font-medium max-w-[22ch] [text-wrap:balance]">
                What people build with Relay.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-soft text-[16.5px] max-w-[60ch] leading-[1.6] [text-wrap:pretty]">
                Anything the live chain refuses or makes slow. Permissioned
                paths, upgrade dress rehearsals, oracle edge cases, CPI
                integration tests, CI without quotas.
              </p>
            </Reveal>
          </>
        )}

        <Reveal delay={compact ? 0 : 0.16}>
          <div className={`${compact ? '' : 'mt-14'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
            {CASES.map((c) => {
              const Icon = c.icon
              return (
                <article
                  key={c.kicker}
                  className="group relative rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6 transition-colors hover:border-line-strong overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(280px 180px at 50% 0%, rgba(93,131,255,0.07), transparent 70%)',
                    }}
                  />
                  <div className="relative">
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-[8px] border border-line bg-ink/40 text-accent">
                      <Icon size={17} weight="regular" />
                    </span>
                    <div className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-mute">
                      {c.kicker}
                    </div>
                    <h3 className="mt-2 text-fore text-[15.5px] leading-[1.3] tracking-[-0.005em] font-medium [text-wrap:balance]">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-soft text-[13.5px] leading-[1.6] [text-wrap:pretty]">
                      {c.body}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
