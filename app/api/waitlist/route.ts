import { NextResponse } from 'next/server'

// Optional webhook the email gets forwarded to. Wire to Resend / Loops /
// ConvertKit / your own backend by setting WAITLIST_WEBHOOK_URL.
const WEBHOOK = process.env.WAITLIST_WEBHOOK_URL

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    return NextResponse.json(
      { ok: false, error: 'invalid_email' },
      { status: 422 },
    )
  }

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
  } else if (process.env.NODE_ENV !== 'production') {
    // No webhook configured - in dev/preview just log so the form works locally.
    console.log('[waitlist]', { email, source })
  }

  return NextResponse.json({ ok: true })
}
