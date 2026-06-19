import { CodeLine, TerminalFrame } from './code'
import { Reveal } from './reveal'

export function UseCase() {
  return (
    <section
      id="patch-deep"
      className="relative py-20 md:py-40 border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
                Use case
              </div>
              <h2 className="mt-4 text-fore text-[28px] sm:text-[36px] md:text-[48px] lg:text-[54px] leading-[1.06] tracking-[-0.028em] font-medium [text-wrap:balance]">
                Test the admin path
                <br />
                you never had keys for.
              </h2>
              <div className="mt-7 space-y-5 text-soft text-[16.5px] leading-[1.65] max-w-[48ch] [text-wrap:pretty]">
                <p>
                  Your program CPIs into Meteora&apos;s DLMM. The pool admin is a
                  Meteora-controlled key. The integration path you actually need
                  to exercise is the one only that key can call.
                </p>
                <p>
                  Reley clones the pool, the vaults, the oracle, every bin array,
                  every mint. Then it patches{' '}
                  <span className="font-mono text-fore">pool.admin</span> to your
                  local wallet. The CPI tree runs. You see compute, logs, and
                  account diffs at every frame.
                </p>
                <p className="text-mute">
                  Same shape for Kamino vault managers, Drift insurance
                  authorities, Jupiter route ops, any permissioned PDA on
                  mainnet.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.05}>
              <TerminalFrame title="clone the pool surface">
                <CodeLine
                  tokens={[
                    { t: '$ ', c: 'p' },
                    { t: 'reley', c: 'cmd' },
                    { t: ' account add ', c: 'arg' },
                    { t: '<pool_pda>', c: 'kw' },
                    { t: ' --program ', c: 'flag' },
                    { t: 'METEORA_DLMM', c: 'arg' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '  + vault_a vault_b oracle bin_array[0..32]', c: 'op' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '  + mint_a mint_b ata_user ata_treasury', c: 'op' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '✓', c: 'p' },
                    { t: ' 51 accounts hydrated @ slot ', c: 'op' },
                    { t: '348,201,118', c: 'num' },
                  ]}
                />
              </TerminalFrame>
            </Reveal>

            <Reveal delay={0.08}>
              <TerminalFrame title="patch the admin field">
                <CodeLine
                  tokens={[
                    { t: '$ ', c: 'p' },
                    { t: 'reley', c: 'cmd' },
                    { t: ' patch ', c: 'arg' },
                    { t: 'pool', c: 'kw' },
                    { t: ' --set ', c: 'flag' },
                    { t: 'admin=$WALLET', c: 'arg' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '  using IDL ', c: 'op' },
                    { t: 'meteora_dlmm@0.30.1', c: 'fn' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '  field ', c: 'op' },
                    { t: 'admin: PublicKey', c: 'kw' },
                    { t: '  encoded 32B', c: 'op' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '✓', c: 'p' },
                    { t: ' patch staged · scope: project · auto-apply on sandbox reset', c: 'op' },
                  ]}
                />
              </TerminalFrame>
            </Reveal>

            <Reveal delay={0.11}>
              <TerminalFrame title="run the CPI path">
                <CodeLine
                  tokens={[
                    { t: '$ ', c: 'p' },
                    { t: 'reley', c: 'cmd' },
                    { t: ' tx send ', c: 'arg' },
                    { t: '--ix ', c: 'flag' },
                    { t: 'UserProg::do_admin_thing', c: 'kw' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '▾ UserProg                          ', c: 'op' },
                    { t: '14,221 cu', c: 'num' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '  ▾ Meteora_DLMM::admin_rebalance   ', c: 'op' },
                    { t: '102,418 cu', c: 'num' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '    ▸ TokenProgram::transfer        ', c: 'op' },
                    { t: ' 4,712 cu', c: 'num' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '    ▸ TokenProgram::transfer        ', c: 'op' },
                    { t: ' 4,712 cu', c: 'num' },
                  ]}
                />
                <CodeLine
                  tokens={[
                    { t: '✓', c: 'p' },
                    { t: ' tx ok · 6 accounts mutated · log lines: 38', c: 'op' },
                  ]}
                />
              </TerminalFrame>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
