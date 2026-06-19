import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Bullets, H1, H2, Lead, Mono, P } from './prose'
import { Pager } from './pager'

export const metadata = { title: 'Docs · Reley' }

export default function DocsIndex() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Getting started
      </div>
      <H1>Overview</H1>
      <Lead>
        Reley is a per-project, per-session SVM sandbox loaded with real
        on-chain Solana programs. Clone, patch, replay, and publish a session
        as a Solana-compatible JSON-RPC endpoint.
      </Lead>

      <H2 id="what">What you get</H2>
      <Bullets
        items={[
          <>
            <Mono>Clone</Mono> any program by pubkey. Program, account state, Anchor
            IDL, transitive PDAs.
          </>,
          <>
            <Mono>Patch</Mono> any field on any cloned account. IDL-aware for
            Anchor, native layouts for SPL Token / Token-2022, raw splices for
            anything else.
          </>,
          <>
            <Mono>Replay</Mono> any historical mainnet transaction by signature.
            Hydrates at <Mono>slot - 1</Mono>, executes, diffs.
          </>,
          <>
            <Mono>Serve</Mono> a session as Solana JSON-RPC at{' '}
            <Mono>localhost:8899/session/&lt;id&gt;</Mono>. Wire-compatible with
            @solana/web3.js, Anchor, Phantom dev mode.
          </>,
        ]}
      />

      <H2 id="who">Who this is for</H2>
      <P>
        Solana program developers, security researchers, integrators, and
        educators who need to exercise execution paths mainnet authority keys
        will not give them.
      </P>
      <P>
        If your program CPIs into a permissioned protocol and you need the
        admin path, Reley clones the protocol, patches the admin, and lets you
        run the CPI tree locally.
      </P>

      <H2 id="next">Where to go next</H2>
      <div className="mt-5 grid sm:grid-cols-2 gap-4 max-w-[68ch]">
        {[
          { href: '/docs/install', title: 'Install', body: 'pnpm, Node 22, native modules.' },
          { href: '/docs/first-session', title: 'First session', body: '5-minute end-to-end walkthrough.' },
          { href: '/docs/clone', title: 'Clone', body: 'Resolution, caching, transitive accounts.' },
          { href: '/docs/patch', title: 'Patch', body: 'IDL fields, native layouts, raw splices.' },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-[10px] border border-line p-5 hover:border-line-strong transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-fore text-[15px] font-medium">{card.title}</span>
              <ArrowRight size={14} weight="bold" className="text-mute group-hover:text-accent transition-colors" />
            </div>
            <div className="mt-1.5 text-soft text-[13.5px] leading-[1.55]">{card.body}</div>
          </Link>
        ))}
      </div>

      <Pager current="/docs" />
    </article>
  )
}
