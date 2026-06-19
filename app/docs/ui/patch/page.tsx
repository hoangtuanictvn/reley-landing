import { Bullets, Callout, H1, H2, Lead, Mono, P, Shot } from '../../prose'
import { Pager } from '../../pager'

export const metadata = { title: 'Patch (UI) · Relay docs' }

export default function PatchUi() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts · Desktop UI
      </div>
      <H1>Patch</H1>
      <Lead>
        Mutate any field on any cloned account through the Patch editor. Anchor
        accounts decoded against the IDL, SPL Token / Token-2022 against native
        layouts, raw splice for everything else.
      </Lead>

      <H2 id="open">Open the Patch editor</H2>
      <P>
        Sidebar <Mono>PATCHES</Mono> → pick a scope (<Mono>Project</Mono>{' '}
        applies to every session in the project; <Mono>Sandbox</Mono> applies
        only to the active session). Hit <Mono>+</Mono> on an account row to
        stage a new patch.
      </P>
      <Shot
        src="/docs/ui/project-shell.png"
        alt="Patches sidebar group with Project and Sandbox scopes"
        caption="Sidebar — Patches with Project + Sandbox scopes"
      />

      <H2 id="modes">Three modes</H2>
      <Bullets
        items={[
          <><b className="text-fore">IDL field set.</b> Anchor accounts open with a typed field tree. Pick a field, type a new value, save. Discriminator preserved.</>,
          <><b className="text-fore">Native layout.</b> SPL Token mint authority, Token-2022 extensions, lookup table addresses — all surfaced as named fields.</>,
          <><b className="text-fore">Raw splice.</b> Byte-offset editor for accounts with no decoder. Pick offset, supply hex bytes, save.</>,
        ]}
      />

      <H2 id="example">Example — flip a pool admin</H2>
      <P>
        Open the Patch editor on a Meteora DLMM pool PDA. Find <Mono>admin</Mono>{' '}
        in the field tree, click the value, paste your wallet pubkey, save.
        Choose <Mono>Project</Mono> scope so every session in the project will
        boot with the patched admin.
      </P>

      <H2 id="reset">Reset behavior</H2>
      <Bullets
        items={[
          <><Mono>Project</Mono> patches re-apply on every session reset and on every new session.</>,
          <><Mono>Sandbox</Mono> patches are wiped by a session reset — useful for scratch experiments you don&apos;t want to keep.</>,
        ]}
      />

      <Callout>
        Patches are not transactions. They mutate the LiteSVM account store
        directly. Use them to set up preconditions; use transactions to test
        the code paths your program actually runs.
      </Callout>

      <Pager current="/docs/ui/patch" />
    </article>
  )
}
