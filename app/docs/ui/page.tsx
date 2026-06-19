import { Callout, H1, H2, H3, Lead, Mono, P, Shot } from '../prose'
import { Pager } from '../pager'

export const metadata = { title: 'Desktop UI · Reley docs' }

export default function Ui() {
  return (
    <article>
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute mb-4">
        Reference
      </div>
      <H1>Desktop UI</H1>
      <Lead>
        Every Reley project opens in its own window. The shell stays the same:
        left sidebar for project assets, center pane for the active panel, right
        rail for shortcuts and the inspector. Everything below talks to the
        same dispatcher the CLI does  -  no GUI-only state.
      </Lead>

      <H2 id="welcome">Welcome</H2>
      <P>
        Launching Reley drops you on the Welcome screen. Open or create a
        project, pick a recent one, or jump straight into a guided tour from
        the use-case cards.
      </P>
      <Shot
        src="/docs/ui/welcome.png"
        alt="Welcome screen showing Open / New project actions, recent projects, and use-case cards"
        caption="Welcome  -  entry point for projects"
      />

      <H2 id="project-shell">Project shell</H2>
      <P>
        Inside a project: the sidebar lists{' '}
        <Mono>Automations</Mono> (workflows + test suites), <Mono>Tx Templates</Mono>,{' '}
        <Mono>Programs</Mono>, and <Mono>Patches</Mono>. The center pane swaps
        between Tx Builder, Workflow editor, Patch editor, Inspector, and so on.
        A goal picker prompts you to start a workflow or test suite  -  dismiss
        with <Mono>Just let me explore</Mono>.
      </P>
      <Shot
        src="/docs/ui/project-shell.png"
        alt="Project shell with sidebar groups expanded and goal picker dismissed"
        caption="Project shell  -  sidebar + main pane"
      />

      <H3 id="help">Help panel</H3>
      <P>
        The right rail&apos;s <Mono>?</Mono> icon opens the orientation help  - 
        on-disk layout, anatomy of a project, where each piece lives. Toggle off
        with the same icon or <Mono>Esc</Mono>.
      </P>
      <Shot
        src="/docs/ui/help-panel.png"
        alt="Help panel docked on the right with project orientation copy and on-disk layout"
        caption="Help  -  orientation + on-disk layout"
      />

      <H2 id="tx-builder">Tx Builder</H2>
      <P>
        Build an instruction by picking a program, filling the IDL-derived
        argument form, attaching accounts (with signer/writable flags), and
        choosing a payer. <Mono>Prepend</Mono> / <Mono>Append</Mono> stacks more
        instructions into the same tx. <Mono>Simulate</Mono> runs without
        commit; <Mono>Submit</Mono> lands the tx in the active session.
      </P>
      <Shot
        src="/docs/ui/tx-builder.png"
        alt="Tx Builder pane with program picker, advanced signing/budget section, and Simulate/Submit actions"
        caption="Tx Builder  -  build, simulate, submit"
      />
      <Callout>
        Templates save the current tx (instructions + form state) under a
        name so you can reload it across sessions. <Mono>Save as new
        template</Mono> top-right.
      </Callout>

      <H2 id="workflows">Workflows</H2>
      <P>
        A workflow chains steps that run in order against the active session:
        airdrop, warp slot/time, expire blockhash, reset sandbox, build &amp;
        send tx, run a script. Open a workflow to see its step list, run-order
        notes, total CU, last run, and duration.
      </P>
      <Shot
        src="/docs/ui/workflows-list.png"
        alt="Sidebar with Workflows group expanded showing 8 workflows"
        caption="Workflows  -  grouped under Automations"
      />
      <Shot
        src="/docs/ui/workflow-detail.png"
        alt="Workflow detail showing steps 1-9 with airdrop and reset-sandbox actions"
        caption="Workflow detail  -  steps run in order"
      />

      <H2 id="palette">Command palette</H2>
      <P>
        <Mono>⌘K</Mono> opens the command palette  -  every navigation target,
        workspace command, and project action in one fuzzy-search list. View
        section jumps to Workspace / Keypairs / Snapshots; Workspace section
        switches the center pane; Command section creates new things or toggles
        UI chrome.
      </P>
      <Shot
        src="/docs/ui/command-palette.png"
        alt="Command palette open with View, Workspace, and Command sections listed"
        caption="⌘K  -  palette"
      />

      <H2 id="status">Status bar</H2>
      <P>
        Bottom strip shows the active project, network, RPC endpoint, and the
        selected session. Click the session pill to switch sessions without
        leaving the current panel.
      </P>

      <H2 id="shortcuts">Keyboard shortcuts</H2>
      <P>
        A few that matter:
      </P>
      <div className="mt-4 max-w-[68ch] rounded-[10px] border border-line overflow-hidden">
        <table className="w-full text-[13.5px]">
          <tbody>
            {[
              ['⌘K', 'Command palette'],
              ['⌘O', 'Open project'],
              ['⌘J', 'Toggle history dock'],
              ['⌘0', 'Toggle sidebar'],
              ['Esc', 'Dismiss palette / help / modal'],
            ].map(([k, label]) => (
              <tr key={k} className="border-t border-line first:border-t-0">
                <td className="px-4 py-2.5 font-mono text-[12.5px] text-fore w-[120px]">{k}</td>
                <td className="px-4 py-2.5 text-soft">{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pager current="/docs/ui" variant="ui" />
    </article>
  )
}
