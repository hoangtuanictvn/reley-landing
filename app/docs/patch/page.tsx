import { Bullets, Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'Patch · Relay docs' }

export default function Patch() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Concepts
      </div>
      <H1>Patch</H1>
      <Lead>
        Mutate any field on any cloned account before or between transactions.
        The patch engine is IDL-aware for Anchor and uses native layouts for
        SPL Token and Token-2022.
      </Lead>

      <H2 id="modes">Three modes</H2>
      <Bullets
        items={[
          <><b className="text-fore">IDL field set.</b> Anchor accounts decoded against the stored IDL, field-level setter, re-encoded with discriminator preserved.</>,
          <><b className="text-fore">Native layout.</b> SPL Token mint authority, Token-2022 extensions, lookup table addresses, all addressed by named field.</>,
          <><b className="text-fore">Raw splice.</b> Byte offset + length + new bytes. Final escape hatch for non-Anchor, non-native data.</>,
        ]}
      />

      <H2 id="scope">Scope</H2>
      <P>
        Patches live at two scopes. <Mono>project</Mono> patches auto-apply to
        every session in the project on creation or reset. <Mono>session</Mono>{' '}
        patches apply only to one session and disappear on reset.
      </P>
      <Pre label="terminal">
{`# project-scoped: every session sees this
pnpm cli patch set pool.admin --project <pid> \\
  --account <poolPda> --value <walletPubkey>

# session-scoped: scratch mutation
pnpm cli patch set vault.balance --session <sid> \\
  --account <vaultPda> --value 1000000000`}
      </Pre>

      <H2 id="idl">IDL field example</H2>
      <P>
        Patch a Meteora DLMM pool admin to your local wallet. Relay decodes the
        account, sets <Mono>admin</Mono> to the new pubkey, re-encodes, and
        writes the new buffer back to the SVM sandbox account store.
      </P>
      <Pre label="output">
{`$ relay patch pool --set admin=$W
  using IDL    meteora_dlmm@0.30.1
  field        admin: PublicKey
  encoded      32B
✓ patch staged  ·  scope: project  ·  auto-apply on reset`}
      </Pre>

      <H2 id="native">Native layout example</H2>
      <Pre label="output">
{`$ relay patch mint --set mintAuthority=$W --account <USDC>
  using layout spl_token::Mint  v1
  field        mintAuthority: COption<Pubkey>
✓ USDC mintable to wallet $W in session 'main'`}
      </Pre>

      <Callout>
        Patches are not transactions. They mutate the SVM sandbox account store
        directly. Use them to set up preconditions; use transactions to test
        the code paths your program actually runs.
      </Callout>

      <Pager current="/docs/patch" />
    </article>
  )
}
