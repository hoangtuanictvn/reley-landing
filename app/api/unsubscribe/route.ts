import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const RESEND_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.reley.xyz'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null

async function unsubscribe(email: string): Promise<'ok' | 'invalid' | 'failed'> {
  const trimmed = email.trim().toLowerCase()
  if (!EMAIL_RE.test(trimmed)) return 'invalid'
  if (!resend || !AUDIENCE_ID) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[unsubscribe]', trimmed)
      return 'ok'
    }
    return 'failed'
  }
  try {
    const res = await resend.contacts.update({
      audienceId: AUDIENCE_ID,
      email: trimmed,
      unsubscribed: true,
    })
    if (res.error && !/not found/i.test(String(res.error.message ?? res.error))) {
      console.error('[unsubscribe:resend.contacts]', res.error)
      return 'failed'
    }
    return 'ok'
  } catch (e) {
    console.error('[unsubscribe:resend]', e)
    return 'failed'
  }
}

function htmlPage(state: 'ok' | 'invalid' | 'failed', email: string): string {
  const title = state === 'ok' ? 'Unsubscribed' : 'Something went wrong'
  const body =
    state === 'ok'
      ? `<p>You won't get any more waitlist emails. If you change your mind, you can rejoin from <a href="${SITE}/waitlist">${SITE.replace(/^https?:\/\//, '')}/waitlist</a>.</p>`
      : state === 'invalid'
        ? '<p>That link is malformed. Email yourself a fresh confirmation from the waitlist page and use the unsubscribe link there.</p>'
        : '<p>We could not reach the mailing backend just now. Try again in a minute, or reply to any Reley email and we will remove you manually.</p>'
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title} - Reley</title>
  <style>
    html,body{margin:0;padding:0;background:#08090c;color:#e8eaf0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,sans-serif;-webkit-font-smoothing:antialiased;}
    .card{max-width:540px;margin:96px auto;padding:40px;background:#0c0e13;border:1px solid #1c2230;border-radius:14px;}
    .kicker{font-family:'SF Mono',Menlo,monospace;font-size:11px;color:#5d83ff;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:14px;}
    h1{font-size:28px;line-height:1.1;letter-spacing:-0.025em;font-weight:600;margin:0 0 18px;}
    p{color:#9ba2b1;font-size:15px;line-height:1.6;margin:0 0 14px;}
    a{color:#aeb9f0;text-decoration:underline;}
    .meta{margin-top:24px;font-family:'SF Mono',Menlo,monospace;font-size:11.5px;color:#6c7385;}
  </style>
</head>
<body>
  <main class="card">
    <div class="kicker">Reley Cloud</div>
    <h1>${title}</h1>
    ${body}
    <div class="meta">${email}</div>
  </main>
</body>
</html>`
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const email = url.searchParams.get('email') ?? ''
  const state = await unsubscribe(email)
  return new NextResponse(htmlPage(state, email), {
    status: state === 'invalid' ? 422 : state === 'failed' ? 502 : 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

// Required for one-click unsubscribe (Gmail / Apple Mail native "Unsubscribe" button).
export async function POST(req: Request) {
  const url = new URL(req.url)
  const email = url.searchParams.get('email') ?? ''
  const state = await unsubscribe(email)
  return NextResponse.json(
    { ok: state === 'ok' },
    { status: state === 'invalid' ? 422 : state === 'failed' ? 502 : 200 },
  )
}
