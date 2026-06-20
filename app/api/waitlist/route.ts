import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { waitlistConfirmEmail } from './email-template'

const RESEND_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const RAW_FROM = process.env.RESEND_FROM // optional confirmation sender
const WEBHOOK = process.env.WAITLIST_WEBHOOK_URL // legacy / non-resend fallback
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.reley.xyz'

// Build the From header. If the env value is a bare email ("hi@x.dev"),
// prepend a friendly display name so the inbox shows "Reley Newsletter"
// instead of a raw address. If the value already contains "Name <addr>",
// respect what the user set.
const FROM = RAW_FROM
  ? RAW_FROM.includes('<')
    ? RAW_FROM
    : `Reley Newsletter <${RAW_FROM.trim()}>`
  : undefined

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null

export async function POST(req: Request) {
  let body: { email?: unknown; source?: unknown }
  try {
    body = (await req.json()) as { email?: unknown; source?: unknown }
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const source = typeof body.source === 'string' ? body.source.slice(0, 64) : 'cloud'

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 })
  }

  // Path 1: Resend Audiences - persist the contact in a managed list.
  if (resend && AUDIENCE_ID) {
    try {
      const add = await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email,
        unsubscribed: false,
      })
      // Treat "already in audience" as success (idempotent signup).
      const alreadyIn =
        add.error && /already/i.test(String(add.error.message ?? add.error))
      if (add.error && !alreadyIn) {
        console.error('[waitlist:resend.contacts]', add.error)
        return NextResponse.json(
          { ok: false, error: 'resend_failed' },
          { status: 502 },
        )
      }

      // Optional confirmation email.
      if (FROM) {
        try {
          const tmpl = waitlistConfirmEmail({ site: SITE, email })
          const unsubUrl = `${SITE}/api/unsubscribe?email=${encodeURIComponent(email)}`
          await resend.emails.send({
            from: FROM,
            to: email,
            subject: tmpl.subject,
            html: tmpl.html,
            text: tmpl.text,
            // RFC 8058 one-click unsubscribe (Gmail / Apple Mail show native
            // Unsubscribe button when both headers are present).
            headers: {
              'List-Unsubscribe': `<${unsubUrl}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
          })
        } catch (e) {
          // Confirmation is best-effort - signup itself already succeeded.
          console.error('[waitlist:resend.send]', e)
        }
      }

      return NextResponse.json({ ok: true })
    } catch (e) {
      console.error('[waitlist:resend]', e)
      return NextResponse.json(
        { ok: false, error: 'resend_failed' },
        { status: 502 },
      )
    }
  }

  // Path 2: Generic webhook fallback.
  if (WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source, ts: new Date().toISOString() }),
      })
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: 'forward_failed' },
          { status: 502 },
        )
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: 'forward_failed' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  }

  // Path 3: Dev fallback - log and accept.
  if (process.env.NODE_ENV !== 'production') {
    console.log('[waitlist]', { email, source })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: false, error: 'no_backend' }, { status: 503 })
}
