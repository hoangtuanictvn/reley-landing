import { Bullets, Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'RPC server · Relay docs' }

export default function Rpc() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts
      </div>
      <H1>RPC server</H1>
      <Lead>
        Promote any session to a Solana-compatible JSON-RPC endpoint at{' '}
        <Mono>http://localhost:8899/session/&lt;id&gt;</Mono>. The wire shape
        matches Solana RPC byte-for-byte. Anything that speaks Solana will
        speak Relay.
      </Lead>

      <H2 id="start">Start the server</H2>
      <Pre label="desktop">
{`Inspector → Details → RPC endpoint → Start`}
      </Pre>
      <Pre label="cli">
{`pnpm cli session serve --session <sid>
⠿ JSON-RPC live  http://127.0.0.1:8899/session/main`}
      </Pre>

      <H2 id="connect">Connect a client</H2>
      <Pre label="@solana/web3.js">
{`import { Connection, Keypair, SystemProgram, Transaction } from '@solana/web3.js'

const connection = new Connection(
  'http://127.0.0.1:8899/session/main',
  'confirmed'
)

const payer = Keypair.generate()
await connection.requestAirdrop(payer.publicKey, 1e9)

const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: Keypair.generate().publicKey,
    lamports: 1000,
  })
)
await connection.sendTransaction(tx, [payer])`}
      </Pre>

      <H2 id="phantom">Phantom dev mode</H2>
      <P>
        Phantom&apos;s dev RPC field accepts custom URLs. Point it at your
        session URL, switch the wallet to <Mono>Devnet</Mono> network slot,
        and connect any dApp running locally. Transactions will sign with the
        real Phantom keypair and execute in the SVM sandbox.
      </P>

      <H2 id="methods">Implemented methods</H2>
      <Bullets
        items={[
          <><Mono>getAccountInfo</Mono>, <Mono>getMultipleAccounts</Mono>, <Mono>getProgramAccounts</Mono></>,
          <><Mono>getBalance</Mono>, <Mono>getMinimumBalanceForRentExemption</Mono></>,
          <><Mono>getLatestBlockhash</Mono>, <Mono>getBlockHeight</Mono>, <Mono>getSlot</Mono>, <Mono>getEpochInfo</Mono></>,
          <><Mono>sendTransaction</Mono>, <Mono>simulateTransaction</Mono>, <Mono>getSignatureStatuses</Mono></>,
          <><Mono>requestAirdrop</Mono> (synthetic, against the sandbox bank)</>,
          <><Mono>getTokenAccountBalance</Mono>, <Mono>getTokenAccountsByOwner</Mono></>,
        ]}
      />

      <Callout>
        Subscription methods (<Mono>accountSubscribe</Mono>,{' '}
        <Mono>signatureSubscribe</Mono>, etc.) over WebSocket are on the
        roadmap. The HTTP surface covers the entire send-and-confirm path used
        by web3.js, Anchor, and most wallet adapters today.
      </Callout>

      <Pager current="/docs/rpc" />
    </article>
  )
}
