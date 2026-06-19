import { Bullets, Callout, H1, H2, Lead, Mono, P, Pre, Shot } from '../../prose'
import { Pager } from '../../pager'

export const metadata = { title: 'RPC server (UI) · Relay docs' }

export default function RpcUi() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts · Desktop UI
      </div>
      <H1>RPC server</H1>
      <Lead>
        Publish any session as a Solana-compatible JSON-RPC endpoint without
        leaving the desktop app. Wire-compatible with{' '}
        <Mono>@solana/web3.js</Mono>, Anchor, and wallet adapters.
      </Lead>

      <H2 id="start">Start the server</H2>
      <P>
        Open the right rail Inspector, switch to the <Mono>Details</Mono> tab
        for the active session, find the <Mono>RPC endpoint</Mono> card, hit{' '}
        <Mono>Start</Mono>. Relay binds an HTTP listener and surfaces the URL.
      </P>
      <Pre label="endpoint">
{`http://127.0.0.1:8899/session/<id>`}
      </Pre>
      <P>
        Copy the URL with the inline copy button. Stop via the same card when
        you&apos;re done.
      </P>

      <H2 id="connect">Connect a client</H2>
      <Pre label="@solana/web3.js">
{`import { Connection, Keypair, SystemProgram, Transaction } from '@solana/web3.js'

const connection = new Connection(
  'http://127.0.0.1:8899/session/main',
  'confirmed',
)

const payer = Keypair.generate()
await connection.requestAirdrop(payer.publicKey, 1e9)

const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: Keypair.generate().publicKey,
    lamports: 1000,
  }),
)
await connection.sendTransaction(tx, [payer])`}
      </Pre>

      <H2 id="inspect">Watch traffic</H2>
      <P>
        The history dock at the bottom (<Mono>⌘J</Mono>) shows every tx the
        server accepts  -  same view as txs sent from the Tx Builder. Click a
        row for the decoded instruction tree, CU per frame, logs, and account
        diff.
      </P>
      <Shot
        src="/docs/ui/tx-builder.png"
        alt="Tx Builder with history dock toggle"
        caption="History dock surfaces RPC-submitted txs alongside builder runs"
      />

      <H2 id="phantom">Phantom dev mode</H2>
      <P>
        Phantom&apos;s dev RPC field accepts custom URLs. Point it at your
        session URL, switch the wallet to <Mono>Devnet</Mono> slot, connect any
        dApp running locally. Signing uses the real Phantom keypair; execution
        lands in your SVM sandbox.
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
        WebSocket subscriptions (<Mono>accountSubscribe</Mono>,{' '}
        <Mono>signatureSubscribe</Mono>) are on the roadmap. The HTTP surface
        covers the send-and-confirm path used by web3.js, Anchor, and most
        wallet adapters today.
      </Callout>

      <Pager current="/docs/ui/rpc" />
    </article>
  )
}
