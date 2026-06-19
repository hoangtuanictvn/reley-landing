import { Callout, H1, H2, Lead, Mono, P, Shot } from '../../prose'
import { Pager } from '../../pager'

export const metadata = { title: 'First session (UI) · Relay docs' }

export default function FirstSessionUi() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts · Desktop
      </div>
      <H1>First session</H1>
      <Lead>
        Five minutes from launching the app to a running LiteSVM that thinks
        it&apos;s mainnet. Create a project, clone a program, patch a field,
        send a tx.
      </Lead>

      <H2 id="launch">Launch + create a project</H2>
      <P>
        Open Relay. The Welcome screen offers <Mono>Open project…</Mono>,{' '}
        <Mono>New project…</Mono>, recent projects, and use-case shortcuts.
        Click <Mono>New project…</Mono>, pick a folder, name it, choose an RPC.
      </P>
      <Shot
        src="/docs/ui/welcome.png"
        alt="Welcome screen — open / new project, recent projects, use-case cards"
        caption="Welcome — pick a project or create one"
      />

      <H2 id="clone">Clone a program</H2>
      <P>
        Inside the project, expand <Mono>PROGRAMS</Mono> in the sidebar, hit{' '}
        <Mono>+</Mono>, paste a program id (e.g. SPL Memo:{' '}
        <Mono>MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr</Mono>). Relay pulls
        the ELF and any registered Anchor IDL.
      </P>
      <Shot
        src="/docs/ui/project-shell.png"
        alt="Project shell with sidebar groups expanded"
        caption="Project shell — sidebar drives everything"
      />

      <H2 id="session">Pick a session</H2>
      <P>
        Sessions live under <Mono>SESSIONS</Mono> in the sidebar. Click one to
        load it. Patches apply on creation; <Mono>Reset</Mono> via the session
        row context menu discards mutations and re-hydrates.
      </P>

      <H2 id="tx">Send a transaction</H2>
      <P>
        Switch to the Tx Builder pane (default for new sessions, or via{' '}
        <Mono>⌘K → Open Tx Builder</Mono>). Pick a program, fill the IDL form,
        attach accounts, choose a payer. <Mono>Simulate</Mono> runs without
        commit; <Mono>Submit</Mono> lands the tx.
      </P>
      <Shot
        src="/docs/ui/tx-builder.png"
        alt="Tx Builder pane with program picker and Simulate/Submit actions"
        caption="Tx Builder — pick, fill, submit"
      />

      <H2 id="serve">Publish as JSON-RPC</H2>
      <P>
        Open the right rail Inspector → <Mono>Details</Mono> → find the{' '}
        <Mono>RPC endpoint</Mono> card → <Mono>Start</Mono>. The session URL
        appears — copy it and point any Solana client at it.
      </P>

      <Callout>
        Session URL is wire-compatible with <Mono>@solana/web3.js</Mono>,
        Anchor, and Phantom dev mode. No mock layer, no proxy. The bytes are
        the bytes.
      </Callout>

      <Pager current="/docs/ui/first-session" />
    </article>
  )
}
