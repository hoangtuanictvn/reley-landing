import type { Metadata } from 'next'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'
import { CTA } from '../components/cta'
import { Reveal } from '../components/reveal'

export const metadata: Metadata = {
  title: 'RPC server · Reley',
  description:
    'Publish your sandbox as a Solana-compatible JSON-RPC endpoint. Wire-compatible with @solana/web3.js, Anchor, Phantom dev mode.',
}

const METHODS = [
  ['Accounts', ['getAccountInfo', 'getMultipleAccounts', 'getProgramAccounts', 'getBalance']],
  ['Tokens', ['getTokenAccountBalance', 'getTokenAccountsByOwner', 'getTokenSupply']],
  ['Transactions', ['sendTransaction', 'simulateTransaction', 'getSignatureStatuses', 'getTransaction']],
  ['Cluster', ['getLatestBlockhash', 'getBlockHeight', 'getSlot', 'getEpochInfo']],
  ['Utility', ['getMinimumBalanceForRentExemption', 'requestAirdrop (synthetic)']],
]

const CLIENTS = [
  { name: '@solana/web3.js', note: 'Drop the URL into new Connection(url).' },
  { name: 'Anchor', note: 'Set AnchorProvider with the sandbox URL.' },
  { name: 'Phantom dev mode', note: 'Use as custom RPC for any local dApp.' },
  { name: 'Solana CLI', note: 'solana config set --url <sandbox URL>.' },
]

export default function RpcPage() {
  return (
    <main className="relative">
      <Nav />
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden border-b border-line">
        <div className="accent-glow absolute inset-x-0 top-0 h-[420px] pointer-events-none" />
        <div className="dotgrid absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
              RPC server
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-fore text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.028em] font-medium max-w-[24ch] [text-wrap:balance]">
              A Solana JSON-RPC, running on your laptop.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-soft text-[17px] max-w-[62ch] leading-[1.6] [text-wrap:pretty]">
              Promote any sandbox to a wire-compatible JSON-RPC endpoint. Point
              <span className="font-mono"> @solana/web3.js</span>, Anchor,
              Phantom dev mode, or your own dApp at it. No mock, no proxy.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 inline-flex items-center gap-3 rounded-[10px] border border-line bg-ink/60 px-4 py-3 font-mono text-[13px]">
              <span className="text-accent">→</span>
              <span className="text-fore">http://127.0.0.1:8899/sandbox/main</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <Reveal>
            <div>
              <h2 className="text-fore text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-medium max-w-[26ch]">
                Connect a client.
              </h2>
              <p className="mt-4 text-soft text-[15.5px] max-w-[50ch] leading-[1.6]">
                Anything that speaks Solana speaks Reley. Drop the sandbox URL
                in instead of mainnet.
              </p>
              <ul className="mt-8 space-y-3 max-w-[42ch]">
                {CLIENTS.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-baseline gap-3 text-[14px] text-soft"
                  >
                    <span className="font-mono text-fore text-[13.5px] min-w-[140px]">
                      {c.name}
                    </span>
                    <span className="leading-[1.55]">{c.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface-1 overflow-hidden code-shadow">
              <div className="flex items-center gap-2 px-4 h-[34px] border-b border-line bg-surface">
                <div className="flex gap-1.5">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
                </div>
                <span className="ml-3 font-mono text-[11px] text-mute">
                  @solana/web3.js
                </span>
              </div>
              <pre className="p-5 font-mono text-[12.5px] leading-[1.7] text-soft overflow-x-auto whitespace-pre">
                <span className="text-[#aeb9f0]">{`import`}</span>
                {` { Connection, Keypair } `}
                <span className="text-[#aeb9f0]">{`from`}</span>
                {` 'solana-web3.js'\n\n`}
                <span className="text-[#aeb9f0]">{`const`}</span>
                {` connection = `}
                <span className="text-[#aeb9f0]">{`new`}</span>
                {` Connection(\n  `}
                <span className="text-[#cdd6e8]">{`'http://127.0.0.1:8899/sandbox/main'`}</span>
                {`,\n  `}
                <span className="text-[#cdd6e8]">{`'confirmed'`}</span>
                {`,\n)\n\n`}
                <span className="text-[#aeb9f0]">{`const`}</span>
                {` payer = Keypair.generate()\n`}
                <span className="text-[#aeb9f0]">{`await`}</span>
                {` connection.requestAirdrop(payer.publicKey, 1e9)\n`}
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 md:py-32 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-6">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 flex-wrap">
              <h2 className="text-fore text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-medium max-w-[20ch]">
                Methods covered.
              </h2>
              <div className="font-mono text-[12.5px] text-mute">
                HTTP · 24 methods · WS subscriptions on the roadmap
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {METHODS.map(([group, items]) => (
                <article
                  key={group as string}
                  className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6"
                >
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-deep">
                    {group}
                  </div>
                  <ul className="mt-4 space-y-2 font-mono text-[12.5px]">
                    {(items as string[]).map((m) => (
                      <li key={m} className="flex items-center gap-2 text-soft">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  )
}
