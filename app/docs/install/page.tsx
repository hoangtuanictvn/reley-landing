import { Bullets, Callout, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'Install · Relay docs' }

export default function Install() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Getting started
      </div>
      <H1>Install</H1>
      <Lead>
        Relay ships as an Electron desktop app and a Node CLI. Both link against
        the same core engine, so anything you can do in the GUI you can script.
      </Lead>

      <H2 id="prereq">Prerequisites</H2>
      <Bullets
        items={[
          <>macOS 12 or newer. Apple Silicon and Intel both supported.</>,
          <>Node <Mono>{'>='}</Mono> 22.13 (engines field). Use <Mono>nvm</Mono> if your system has an older Node.</>,
          <>pnpm 11. Corepack will install the right version from the lockfile.</>,
          <>Native modules (<Mono>litesvm</Mono>, <Mono>better-sqlite3</Mono>) load under Electron&apos;s Node ABI.</>,
        ]}
      />

      <H2 id="desktop">Desktop app</H2>
      <P>Download the latest installer from the releases page. macOS is the only supported platform today. Windows and Linux builds land next.</P>
      <Pre label="release/">
{`Relay-1.x.x-arm64.dmg    macOS  (Apple Silicon)
Relay-1.x.x-x64.dmg      macOS  (Intel)`}
      </Pre>
      <Callout>
        Windows and Linux builds are coming. The engine is platform-agnostic;
        what blocks is signed installers and native-module CI. Track progress
        on the changelog.
      </Callout>

      <H2 id="source">From source</H2>
      <Pre label="terminal">
{`git clone https://github.com/hoangtuanictvn/relay
cd relay/relay-app
pnpm install
pnpm build

# Electron dev with HMR
pnpm --filter @relay/desktop dev

# Package DMG / NSIS / AppImage
pnpm --filter @relay/desktop package`}
      </Pre>

      <H2 id="cli">CLI</H2>
      <P>
        The CLI runs the same dispatcher as the desktop app, in-process. State
        lives under <Mono>$RELAY_PROJECT_ROOT</Mono>, defaulting to{' '}
        <Mono>~/.relay-cli-project</Mono>.
      </P>
      <Pre label="terminal">
{`pnpm cli project create "DEX Integration" \\
  --rpc https://api.mainnet-beta.solana.com

pnpm cli program add MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr \\
  --project <pid>

pnpm cli session create main --project <pid>`}
      </Pre>

      <Callout>
        Replay needs an archive RPC for <Mono>slot − 1</Mono> reads. Default
        public mainnet won&apos;t serve historical accounts beyond the retention
        window. Use Helius, Triton, or your own archive node.
      </Callout>

      <Pager current="/docs/install" />
    </article>
  )
}
