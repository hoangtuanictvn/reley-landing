import { Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'First session · Reley docs' }

export default function FirstSession() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Getting started
      </div>
      <H1>First session</H1>
      <Lead>
        Five minutes from install to a running SVM sandbox that thinks it&apos;s
        mainnet. We&apos;ll create a project, clone a program, patch a field,
        and send a transaction.
      </Lead>

      <H2 id="create">Create a project</H2>
      <P>Projects are long-lived workspaces with their own program catalog, keypair vault, and one or more sessions.</P>
      <Pre label="terminal">
{`$ pnpm cli project create "First flight" --rpc mainnet
✓ project j_a91  ·  First flight
  rpc:    https://api.mainnet-beta.solana.com
  root:   ~/.relay-cli-project/j_a91`}
      </Pre>

      <H2 id="clone">Clone a program</H2>
      <P>
        Add the SPL Memo program by pubkey. Reley fetches the Program, resolves the
        IDL if one is registered, and caches the blob locally.
      </P>
      <Pre label="terminal">
{`$ pnpm cli program add MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr \\
    --project j_a91
↻ fetching Program       21 KB
↻ resolving IDL      none on-chain
✓ cloned             MEMO_v2`}
      </Pre>

      <H2 id="session">Open a session</H2>
      <P>
        A session is one SVM sandbox instance hydrated with the project&apos;s
        programs and accounts. Patches apply on session creation. Reset to
        discard mutations.
      </P>
      <Pre label="terminal">
{`$ pnpm cli session create main --project j_a91
✓ session s_42f  ·  main
  slot:   348,201,118 (synthetic genesis + cloned state)
  funded: wallet $W ← 1000 SOL`}
      </Pre>

      <H2 id="send">Send a transaction</H2>
      <P>
        Build a Memo instruction with a raw data buffer and one signer account.
        The CLI prints a tx tree, CU per frame, and the touched account set.
      </P>
      <Pre label="terminal">
{`$ pnpm cli tx send --session s_42f \\
    --program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr \\
    --data 68656c6c6f \\
    --account "$W:false:true"
▾ MEMO_v2                 312 cu
✓ ok  ·  log lines: 1`}
      </Pre>

      <H2 id="serve">Publish as JSON-RPC</H2>
      <P>
        Promote the session to a Solana-compatible endpoint. Point any client
        at the URL.
      </P>
      <Pre label="terminal">
{`$ pnpm cli session serve --session s_42f
⠿ JSON-RPC live  http://127.0.0.1:8899/session/main`}
      </Pre>

      <Callout>
        The session URL is wire-compatible with <Mono>@solana/web3.js</Mono>,
        Anchor, and Phantom dev mode. No mock layer, no proxy. The bytes are
        the bytes.
      </Callout>

      <Pager current="/docs/first-session" />
    </article>
  )
}
