import { CodeLine } from './code'
import { Reveal } from './reveal'

function Cell({
  className = '',
  id,
  children,
}: {
  className?: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <div
      id={id}
      className={`group relative rounded-[var(--radius-lg)] border border-line bg-surface-1 overflow-hidden transition-colors hover:border-line-strong ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background:
            'radial-gradient(380px 220px at var(--mx, 50%) var(--my, 50%), rgba(20,241,149,0.07), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function CellHeader({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="p-6 md:p-7">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep mb-4">
        {kicker}
      </div>
      <h3 className="text-fore text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.02em] font-medium [text-wrap:balance]">
        {title}
      </h3>
      <p className="mt-3 text-soft text-[14.5px] leading-[1.6] max-w-[42ch]">{body}</p>
    </div>
  )
}

export function Bento() {
  return (
    <section id="sandbox" className="relative py-20 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
            Capabilities
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-fore text-[28px] sm:text-[36px] md:text-[48px] lg:text-[54px] leading-[1.06] tracking-[-0.028em] font-medium max-w-[18ch] [text-wrap:balance]">
            The SVM sandbox that thinks it&apos;s mainnet.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-soft text-[16.5px] max-w-[58ch] leading-[1.6] [text-wrap:pretty]">
            Real Programs. Real account state. Real Anchor IDLs. SVM sandbox,
            sealed off from anything that costs SOL.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(240px,auto)]">
            <Cell className="md:col-span-3 md:row-span-2 dotgrid">
              <CellHeader
                kicker="Clone"
                title="Any on-chain program, in seconds."
                body="Fetch the program, account state, and Anchor IDL by pubkey. Transitive PDAs, lookup tables, ATAs, oracles. Pulled and cached locally."
              />
              <div className="px-6 md:px-7 pb-6">
                <div className="rounded-[10px] border border-line bg-ink/60 p-4 font-mono text-[12.5px]">
                  <CodeLine tokens={[{ t: '$ ', c: 'p' }, { t: 'reley', c: 'cmd' }, { t: ' clone ', c: 'arg' }, { t: 'METEORA_DLMM', c: 'kw' }]} />
                  <CodeLine tokens={[{ t: '  resolving deps  ', c: 'op' }, { t: '47 accounts', c: 'num' }, { t: '  ', c: 'op' }, { t: '12 PDAs', c: 'num' }]} />
                  <CodeLine tokens={[{ t: '  hydrate @ slot ', c: 'op' }, { t: '348,201,118', c: 'num' }]} />
                  <CodeLine tokens={[{ t: '✓', c: 'p' }, { t: ' 0.84s', c: 'num' }, { t: '  Program cached  ', c: 'op' }, { t: 'IDL: anchor v0.30.1', c: 'fn' }]} />
                </div>
              </div>
            </Cell>

            <Cell id="patch" className="md:col-span-3 md:row-span-2">
              <CellHeader
                kicker="Patch"
                title="Mutate any field. IDL-aware."
                body="Make USDC mintable to your keypair. Flip a pool admin. Splice raw bytes when no IDL exists."
              />
              <div className="px-6 md:px-7 pb-6 -mt-2">
                <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-3 font-mono text-[12.5px]">
                  <span className="text-mute">pool.admin</span>
                  <span className="text-soft truncate">DLMM…7v2</span>
                  <span className="text-accent">→ Bn4…wA</span>
                  <span className="text-mute">mint.authority</span>
                  <span className="text-soft truncate">null</span>
                  <span className="text-accent">→ wallet</span>
                  <span className="text-mute">pool.fee_bps</span>
                  <span className="text-soft">30</span>
                  <span className="text-accent">→ 5</span>
                  <span className="text-mute">vault.balance</span>
                  <span className="text-soft">218.4 SOL</span>
                  <span className="text-accent">→ 10,000</span>
                  <span className="text-mute">oracle.price</span>
                  <span className="text-soft">142.07</span>
                  <span className="text-accent">→ 0.01</span>
                </div>
                <div className="mt-6 pt-5 border-t border-line/60 flex items-center gap-3 font-mono text-[11px] text-mute uppercase tracking-[0.18em]">
                  <span>3 modes</span>
                  <span className="text-line-strong">·</span>
                  <span>idl</span>
                  <span className="text-line-strong">·</span>
                  <span>native</span>
                  <span className="text-line-strong">·</span>
                  <span>raw splice</span>
                </div>
              </div>
            </Cell>

            <Cell id="rpc" className="md:col-span-6 md:row-span-1 relative">
              <CellHeader
                kicker="RPC"
                title="Publish the sandbox as Solana JSON-RPC."
                body="Point @solana/web3.js, Anchor, or Phantom dev mode at the URL. Wire-compatible byte-for-byte."
              />
              <div className="px-7 md:px-8 pb-7 -mt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-3 rounded-[10px] border border-line bg-ink/60 px-3.5 py-2.5 font-mono text-[12.5px]">
                  <span className="text-accent">→</span>
                  <span className="text-fore">http://127.0.0.1:8899/sandbox/main</span>
                </div>
                <div className="inline-flex items-center gap-2 font-mono text-[11.5px] text-mute">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  HTTP · 24 methods covered
                </div>
              </div>
            </Cell>

            <Cell className="md:col-span-6 md:row-span-1">
              <div className="grid md:grid-cols-[1fr_1.1fr] items-stretch">
                <div className="p-6 md:p-7 flex flex-col">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep mb-4">
                    Snapshot
                  </div>
                  <h3 className="text-fore text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.02em] font-medium [text-wrap:balance]">
                    Fork a sandbox. Diff the outcomes.
                  </h3>
                  <p className="mt-3 text-soft text-[14.5px] leading-[1.6] max-w-[42ch]">
                    Snapshot a state, branch it, run both branches
                    independently, compare account-level diffs. Canonical JSON,
                    stable hash.
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-3 font-mono text-[11px] text-mute uppercase tracking-[0.18em]">
                    <span>fork</span>
                    <span className="text-line-strong">·</span>
                    <span>diff</span>
                    <span className="text-line-strong">·</span>
                    <span>replay</span>
                  </div>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-line p-6 md:p-7 bg-surface flex flex-col justify-center">
                  <div className="font-mono text-[10.5px] text-mute uppercase tracking-[0.22em] mb-4">
                    diff · happy-path vs zero-liquidity
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[12.5px]">
                    <span className="text-mute">slot</span>
                    <span className="text-soft tabular-nums">+ 248</span>
                    <span className="text-mute">compute</span>
                    <span className="text-soft tabular-nums">183,402 cu</span>
                    <span className="text-mute">pool.reserve_a</span>
                    <span className="text-accent tabular-nums">- 4,802,113</span>
                    <span className="text-mute">pool.reserve_b</span>
                    <span className="text-accent tabular-nums">+ 19.4 SOL</span>
                    <span className="text-mute">hash</span>
                    <span className="text-fore">7a3f…b91c</span>
                  </div>
                </div>
              </div>
            </Cell>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
