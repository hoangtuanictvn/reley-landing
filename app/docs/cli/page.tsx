import { Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'CLI · Relay docs' }

export default function Cli() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Reference
      </div>
      <H1>CLI</H1>
      <Lead>
        The CLI runs the same dispatcher as the desktop app, in-process.
        Anything the GUI does, the CLI can script. Run via{' '}
        <Mono>pnpm cli &lt;command&gt;</Mono> from the repo, or the built{' '}
        <Mono>relay</Mono> binary.
      </Lead>

      <H2 id="env">Environment</H2>
      <P>
        <Mono>RELAY_PROJECT_ROOT</Mono> selects the workspace directory.
        Defaults to <Mono>~/.relay-cli-project</Mono>.{' '}
        <Mono>RELAY_RPC_URL</Mono> overrides the resolved RPC endpoint for all
        commands.
      </P>

      <H2 id="raw">Raw clone &amp; run</H2>
      <P>
        Stateless commands. No project, no session  -  just clone bytes or
        execute one tx in a throwaway SVM sandbox. Useful for scripting and CI.
      </P>
      <Pre label="clone-program">
{`pnpm cli clone-program <programId> \\
  --rpc <url> --out <dir> \\
  [--network <name>] [--slot <n>] [--cache <dir>]`}
      </Pre>
      <Pre label="clone-account">
{`pnpm cli clone-account <address> \\
  --rpc <url> --out <dir> \\
  [--network <name>] [--slot <n>] [--cache <dir>]`}
      </Pre>
      <Pre label="run">
{`pnpm cli run \\
  --program <programId>:<elfPath> [--program ...] \\
  [--account <pubkey>:<blobPath> ...] \\
  [--payer <secretKeyPath>] \\
  --ix <hex> --ix-program <pubkey> \\
  [--ix-account <pubkey>:<isSigner>:<isWritable> ...] \\
  [--compute-units <n>]

# OR pass a fully-serialized versioned tx:
pnpm cli run --program <pid>:<elf> --tx <base64>`}
      </Pre>

      <H2 id="project">project</H2>
      <Pre label="commands">
{`pnpm cli project create <name> --rpc <url-or-id> \\
  [--network mainnet-beta|devnet|testnet|custom] [--description <text>]
pnpm cli project list
pnpm cli project open <id>
pnpm cli project delete <id>`}
      </Pre>

      <H2 id="session">session</H2>
      <P>
        A session is one SVM sandbox instance hydrated with the project&apos;s
        programs and accounts. Reset to discard mutations and re-hydrate.
      </P>
      <Pre label="commands">
{`pnpm cli session create <name> --project <id>
pnpm cli session list [--project <id>]
pnpm cli session reset <id>
pnpm cli session delete <id>`}
      </Pre>

      <H2 id="program">program</H2>
      <P>Project-scoped program catalog. Clones the Program + IDL on add.</P>
      <Pre label="commands">
{`pnpm cli program add <programId> --project <id> \\
  [--rpc-url <url>] [--slot <n>]
pnpm cli program list   --project <id>
pnpm cli program remove <programId> --project <id>`}
      </Pre>

      <H2 id="account">account</H2>
      <P>Cloned accounts (PDAs, mints, vaults) grouped under a program.</P>
      <Pre label="commands">
{`pnpm cli account add <address> \\
  --project <id> --program <programId> \\
  [--label <text>] [--rpc-url <url>] [--slot <n>]

pnpm cli account list   --project <id> [--program <programId>]
pnpm cli account remove <address> --project <id>`}
      </Pre>

      <H2 id="tx">tx</H2>
      <Pre label="send">
{`pnpm cli tx send --session <id> \\
  --program <programId> --data <hex> \\
  [--account <pubkey>:<isSigner>:<isWritable> ...] \\
  [--payer <keypair.json>] \\
  [--airdrop <lamports>]  # default 10_000_000_000 (10 SOL)
  [--compute-units <n>]`}
      </Pre>
      <Pre label="history">
{`pnpm cli tx history --session <id>`}
      </Pre>
      <Pre label="replay">
{`pnpm cli tx replay <signature> \\
  [--session <id>] [--rpc-url <archive-url>]`}
      </Pre>
      <Callout kind="warn">
        Replay reads cloned account state at <Mono>slot - 1</Mono> to
        reconstruct pre-tx state. The default public RPC drops historical reads
         -  point at an archive RPC (Helius, Triton, QuickNode) via{' '}
        <Mono>--rpc-url</Mono>.
      </Callout>

      <Pager current="/docs/cli" />
    </article>
  )
}
