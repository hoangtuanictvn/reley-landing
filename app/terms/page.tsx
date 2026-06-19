import type { Metadata } from 'next'
import { LegalShell } from '../legal/legal-shell'

export const metadata: Metadata = {
  title: 'Terms · Relay',
  description: 'The agreement for using Relay. Plain language, short.',
}

export default function TermsPage() {
  return (
    <LegalShell kicker="Legal" title="Terms of use" effective="2026-06-19">
      <p>
        Using Relay (the desktop app, CLI, examples, and this website) means
        you agree to the terms below. They are short on purpose.
      </p>

      <h2>License</h2>
      <p>
        Relay source code is released under{' '}
        <a href="https://polyformproject.org/licenses/noncommercial/1.0.0/">
          PolyForm Noncommercial 1.0.0
        </a>
        . You can use, modify, and redistribute Relay for any noncommercial
        purpose - research, personal projects, education, internal tooling at
        a noncommercial organization.
      </p>
      <p>
        Commercial use needs a separate license. Open an issue on the
        repository if you need one.
      </p>

      <h2>What you may do</h2>
      <ul>
        <li>Run Relay on your own machines, as many times as you want.</li>
        <li>Fork, modify, and re-publish for noncommercial use, with credit.</li>
        <li>Connect Relay to any RPC endpoint you have legal access to.</li>
        <li>Use the cloned mainnet state strictly for local testing.</li>
      </ul>

      <h2>What you may not do</h2>
      <ul>
        <li>Resell Relay or use it inside a paid product without a commercial license.</li>
        <li>
          Use Relay to attack production systems, extract data you are not
          authorized to access, or run unauthorized load against mainnet RPC
          providers.
        </li>
        <li>
          Hold yourself out as affiliated with, sponsored by, or endorsed by
          the Solana Foundation or any protocol Relay clones.
        </li>
      </ul>

      <h2>No warranty</h2>
      <p>
        Relay is provided <strong>as is</strong>, without any warranty. Local
        simulation results are not a guarantee of mainnet behavior. Do not use
        Relay output as the sole basis for any production deploy, audit
        sign-off, or financial decision.
      </p>

      <h2>Liability</h2>
      <p>
        To the maximum extent allowed by law, the maintainers are not liable
        for any indirect, incidental, or consequential damages arising from
        using Relay. Total liability is capped at the amount you paid for
        Relay, which is zero.
      </p>

      <h2>Third-party services</h2>
      <p>
        Relay talks to RPC endpoints, IDL registries, and (optionally) update
        servers you configure. Those services have their own terms. You are
        responsible for complying with them.
      </p>

      <h2>Trademarks</h2>
      <p>
        Solana, Anchor, Phantom, Meteora, Kamino, Jupiter, Drift, and any other
        protocol names referenced are trademarks of their respective owners.
        References are nominative, for compatibility documentation only.
      </p>

      <h2>Changes</h2>
      <p>
        Material changes appear with a new effective date at the top of this
        page. Continued use after a change means you accept it.
      </p>

      <h2>Contact</h2>
      <p>
        Open an issue at{' '}
        <a href="https://github.com/hoangtuanictvn/relay">
          github.com/hoangtuanictvn/relay
        </a>{' '}
        for anything related to these terms.
      </p>
    </LegalShell>
  )
}
