import { Bullets, Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'Replay · Reley docs' }

export default function Replay() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts
      </div>
      <H1>Replay</H1>
      <Lead>
        Take any mainnet transaction by signature and run it locally. Reley
        fetches every touched account at <Mono>slot - 1</Mono>, executes the
        transaction in SVM sandbox, then diffs the local result against the
        on-chain one.
      </Lead>

      <H2 id="flow">The flow</H2>
      <Bullets
        items={[
          <>Resolve the signature against the archive RPC. Pull the message, signers, recent blockhash.</>,
          <>Walk the touched account set. For each, fetch the state at <Mono>slot - 1</Mono>.</>,
          <>Hydrate a scratch session with that account set. Apply project patches.</>,
          <>Execute the transaction.</>,
          <>Diff each touched account against the mainnet post-state. Report mismatches.</>,
        ]}
      />

      <H2 id="run">Run a replay</H2>
      <Pre label="terminal">
{`pnpm cli tx replay <signature> \\
  --session <sid> \\
  --rpc-url https://your-archive.rpc.url`}
      </Pre>

      <H2 id="output">What you get back</H2>
      <Pre label="output">
{`replay 2nFx…q9pK
  hydrated     14 accounts @ slot 348,201,117
  executed     6 instructions, 412,118 cu
  diff         clean  ·  no field-level deltas

▾ AmmV4                       102,418 cu
  ▾ TokenProgram::transfer      4,712 cu
  ▾ TokenProgram::transfer      4,712 cu`}
      </Pre>

      <H2 id="when">When it diverges</H2>
      <P>
        If the diff is non-empty, something differed: a program version,
        clock-sensitive code, a randomness source, or a patch that touched an
        account the transaction read. The diff names the account and the
        offending field.
      </P>

      <Callout kind="warn">
        Replay reads <em>historical</em> account state. You need an RPC that
        retains it. Plain mainnet public RPC is not enough.
      </Callout>

      <Pager current="/docs/replay" />
    </article>
  )
}
