import type { Metadata } from 'next'
import { LegalShell } from '../legal/legal-shell'

export const metadata: Metadata = {
  title: 'Privacy · Relay',
  description: 'How Relay handles data. Short answer: it does not collect any.',
}

export default function PrivacyPage() {
  return (
    <LegalShell kicker="Legal" title="Privacy policy" effective="2026-06-19">
      <p>
        Relay runs on your machine. No account, no sign-in, no analytics ping.
        This page exists so you do not have to dig through source to confirm
        that.
      </p>

      <h2>What Relay does not collect</h2>
      <ul>
        <li>No telemetry, no analytics, no crash-report uploads.</li>
        <li>No keystrokes, no clipboard, no screen capture.</li>
        <li>No wallet keys, mnemonics, or signed-transaction payloads.</li>
        <li>No account on any backend - Relay has no backend.</li>
      </ul>

      <h2>What stays on your disk</h2>
      <p>
        Project state, cloned program binaries, cloned account blobs, IDLs,
        snapshots, keypairs, and workflow definitions are written under your
        project root. Default location:{' '}
        <code>~/.relay-cli-project</code> for the CLI,{' '}
        <code>{'<projectRoot>/.relay'}</code> for the desktop app.
      </p>
      <p>
        Sandbox keypairs are stored in plaintext by default - they are for
        local test use only. Do not paste a real funded key into Relay.
      </p>

      <h2>Network requests Relay makes</h2>
      <ul>
        <li>
          <strong>Solana RPC.</strong> When you clone a program, account, or
          replay a transaction, Relay calls the RPC endpoint you configured.
          Choose any provider you trust.
        </li>
        <li>
          <strong>App updates (desktop only).</strong> The packaged macOS app
          may check for new versions on launch. Disable this in{' '}
          <code>Settings - Auto-update</code> if you prefer.
        </li>
      </ul>

      <h2>This website</h2>
      <p>
        The marketing site uses no analytics, no cookies, no third-party
        trackers. If the binary download link points to a CDN (R2 / S3 /
        GitHub Releases), that provider may log the request in its own access
        logs - we do not see those logs.
      </p>

      <h2>Children</h2>
      <p>
        Relay is a developer tool. It is not directed at children under 13. We
        do not knowingly collect data from anyone, including children.
      </p>

      <h2>Changes</h2>
      <p>
        If the policy changes, the new effective date appears at the top of
        this page. Material changes are noted in the changelog inside the app.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy go to{' '}
        <a href="https://github.com/hoangtuanictvn/relay">
          github.com/hoangtuanictvn/relay
        </a>
        . Open an issue or a private security advisory.
      </p>
    </LegalShell>
  )
}
