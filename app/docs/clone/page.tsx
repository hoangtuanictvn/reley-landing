import { Bullets, Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'Clone · Relay docs' }

export default function Clone() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts
      </div>
      <H1>Clone</H1>
      <Lead>
        Pull any program and its account graph from a live RPC into the local
        SVM sandbox. Cache forever, hydrate in milliseconds.
      </Lead>

      <H2 id="what">What gets cloned</H2>
      <Bullets
        items={[
          <>The program <Mono>ELF</Mono> binary, exactly as deployed on mainnet.</>,
          <>The Anchor <Mono>IDL</Mono> if one is registered on-chain.</>,
          <>Account <Mono>data</Mono>, <Mono>lamports</Mono>, <Mono>owner</Mono>, <Mono>rent_epoch</Mono>, and <Mono>executable</Mono> flag for every requested address.</>,
          <>Transitive closure: PDAs, ATAs, lookup tables, oracle accounts you mark for follow.</>,
        ]}
      />

      <H2 id="how">How to clone</H2>
      <Pre label="terminal">
{`# program by pubkey
pnpm cli program add <programId> --project <pid>

# account / PDA, grouped under a program for organization
pnpm cli account add <pubkey> --project <pid> \\
  --program <programId> --label "pool A"

# bulk import from JSON
pnpm cli account bulk-add accounts.json --project <pid>`}
      </Pre>

      <H2 id="cache">Cache layout</H2>
      <P>
        Blobs are stored under <Mono>{'<projectRoot>/.relay/'}</Mono> as
        content-addressed files. Programs, accounts, IDLs each get their own
        directory. The catalog index lives in <Mono>store.json</Mono>.
      </P>
      <Pre label="layout">
{`.relay/
  programs/<programId>.so
  accounts/<pubkey>.bin
  idls/<programId>.json
  keypairs/<label>.json
  store.json`}
      </Pre>

      <H2 id="slot">Snapshot slot</H2>
      <P>
        Each clone is tagged with the RPC slot at the moment of fetch. Replay
        uses this to pin hydration to a specific historical point. Re-clone
        when you want fresher state.
      </P>

      <Callout kind="warn">
        Public mainnet RPC retains account state for roughly two epochs. For
        any meaningful replay or historical clone, use an archive endpoint.
      </Callout>

      <Pager current="/docs/clone" />
    </article>
  )
}
