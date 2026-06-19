import { Bullets, Callout, H1, H2, Lead, Mono, P, Shot } from '../../prose'
import { Pager } from '../../pager'

export const metadata = { title: 'Clone (UI) · Relay docs' }

export default function CloneUi() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts · Desktop UI
      </div>
      <H1>Clone</H1>
      <Lead>
        Bring on-chain programs and their account graph into the local sandbox
        through the desktop UI. ELF, IDL, transitive accounts — all driven from
        the sidebar.
      </Lead>

      <H2 id="add-program">Add a program</H2>
      <P>
        In the project sidebar, expand <Mono>PROGRAMS</Mono> and click the{' '}
        <Mono>+</Mono>. Paste a program id, pick the source RPC, optionally pin
        a slot, and confirm. The ELF and any registered Anchor IDL stream in
        while Relay caches the blob under the project root.
      </P>
      <Shot
        src="/docs/ui/project-shell.png"
        alt="Project shell with Programs sidebar group"
        caption="Sidebar — Programs group with add (+) action"
      />

      <H2 id="add-account">Add an account</H2>
      <P>
        Accounts live under a program for organization. Right-click a program
        row → <Mono>Add account</Mono>, or use the inline <Mono>+</Mono>. Paste
        the address, give it a human label, confirm. The blob is fetched and
        cached.
      </P>
      <Bullets
        items={[
          <>Anchor PDAs decode against the program&apos;s IDL automatically.</>,
          <>Native (SPL Token, Token-2022, lookup table) accounts are decoded against built-in layouts.</>,
          <>Unknown layouts still clone — Relay stores the raw buffer and shows it as hex.</>,
        ]}
      />

      <H2 id="auto-clone">Auto-clone during a tx</H2>
      <P>
        When you build or replay a tx that touches an account Relay hasn&apos;t
        seen, the runtime asks the project&apos;s RPC for it and caches the
        result. Toggle this in <Mono>Settings → Auto-clone</Mono> if you want
        every account explicit.
      </P>

      <Callout>
        Public mainnet RPC keeps account state for roughly two epochs. For
        replay or historical clone — set the project RPC to an archive endpoint
        (Helius, Triton, QuickNode).
      </Callout>

      <Pager current="/docs/ui/clone" />
    </article>
  )
}
