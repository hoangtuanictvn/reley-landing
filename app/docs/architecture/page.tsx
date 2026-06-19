import { Bullets, H1, H2, Lead, Mono, P, Pre } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'Architecture · Relay docs' }

export default function Arch() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Reference
      </div>
      <H1>Architecture</H1>
      <Lead>
        Relay is a monorepo: a shared schema package, a headless core engine,
        a Commander CLI, and an Electron + React shell. Every feature flows
        through one RPC seam.
      </Lead>

      <H2 id="layout">Layout</H2>
      <Pre label="packages/">
{`@relay/shared      types, zod schemas, IPC method names, errors
@relay/core        headless engine (no DOM, no Electron)
@relay/core-cli    Commander CLI, constructs Core in-process
@relay/desktop     Electron + Vite + React renderer + worker thread`}
      </Pre>

      <H2 id="seam">The dispatcher seam</H2>
      <P>
        Renderer and CLI never talk to engine code directly. Everything goes
        through one shape:
      </P>
      <Pre label="flow">
{`renderer / CLI
   │   RpcRequest { method, params, id }
   ▼
Dispatcher  →  HandlerMap[method]  →  RpcResponse { result | error }`}
      </Pre>
      <Bullets
        items={[
          <>Method names: <Mono>packages/shared/src/ipc/methods.ts</Mono></>,
          <>Schemas: <Mono>packages/shared/src/schemas/</Mono></>,
          <>Handlers: <Mono>packages/core/src/rpc/handlers.ts</Mono></>,
          <>Renderer call: <Mono>{'api.call(\'your.method\', params)'}</Mono></>,
        ]}
      />

      <H2 id="worker">Desktop worker bridge</H2>
      <P>
        In the Electron app the engine runs in a Node worker thread. The main
        process forwards renderer IPC into a <Mono>MessagePort</Mono>. The
        worker constructs <Mono>CoreContext</Mono>, calls <Mono>ctx.load()</Mono>,
        and a <Mono>Dispatcher</Mono> drains the buffered IPC once load resolves.
        Don&apos;t reorder the buffer attach.
      </P>

      <H2 id="modules">Core engine modules</H2>
      <Pre label="packages/core/src/">
{`svm/        LiteSVM wrapper (NAPI native; Electron Node ABI)
cloner/     RPC clone (ELF + accounts + blob cache)
patcher/    Anchor IDL coder + IDL store + setField
trace/      execution log → instruction tree parser
replayer/   historical tx hydrate + execute + diff
runtime/    per-session lifecycle, tx-builder, workflow-runner
snapshot/   deterministic state snapshots + fork + diff
keypair/    sandbox vault with optional safeStorage seal
scripting/  vm.Context sandbox with network allowlist
rpc-server/ Solana JSON-RPC HTTP server (mirrors wire shape)
store/      CoreContext, project + session catalogs, blob store`}
      </Pre>

      <Pager current="/docs/architecture" />
    </article>
  )
}
