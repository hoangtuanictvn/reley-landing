// Confirmation email for waitlist signups. Inline CSS + table layout so it
// renders the same in Gmail, Apple Mail, Outlook web/desktop, Spark, etc.
// Brand: cobalt accent (#5d83ff) on near-black (#08090c) with paper foreground.

interface EmailContent {
  subject: string
  html: string
  text: string
}

export function waitlistConfirmEmail({
  site = 'https://www.reley.xyz',
  email,
}: { site?: string; email: string }): EmailContent {
  const subject = "You're on the Reley Cloud waitlist"
  const unsubUrl = `${site}/api/unsubscribe?email=${encodeURIComponent(email)}`

  const text = [
    "You're in.",
    '',
    "Thanks for joining the Reley Cloud waitlist. We'll email you the moment",
    'the next wave opens - one email per launch, nothing else.',
    '',
    'While you wait:',
    `- Read the docs: ${site}/docs`,
    `- See what people build: ${site}/use-cases`,
    `- Grab the local desktop app today: ${site}/download`,
    '',
    "If you didn't request this, you can ignore the email - we'll never",
    'reach out again.',
    '',
    `Unsubscribe: ${unsubUrl}`,
    '',
    'Reley',
    site.replace(/^https?:\/\//, ''),
  ].join('\n')

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <meta name="supported-color-schemes" content="dark light" />
  <title>${subject}</title>
  <style>
    @media (max-width: 620px) {
      .container { width: 100% !important; padding: 24px 18px !important; }
      .h1 { font-size: 28px !important; line-height: 1.15 !important; }
      .cta { display: block !important; width: 100% !important; box-sizing: border-box; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#08090c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,sans-serif;color:#e8eaf0;-webkit-font-smoothing:antialiased;">
  <span style="display:none;font-size:1px;color:#08090c;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    You're in. We'll email you the moment the next Reley Cloud wave opens.
  </span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#08090c;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;background:#0c0e13;border:1px solid #1c2230;border-radius:14px;padding:40px;">

          <!-- Brand -->
          <tr>
            <td style="padding-bottom:32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="40" height="40" style="background:#11141b;border:1px solid #2a3142;border-radius:10px;">
                      <tr>
                        <td align="center" valign="middle" height="40" style="font-family:'SF Mono',Menlo,monospace;font-size:22px;font-weight:700;color:#e8eaf0;line-height:1;letter-spacing:-0.02em;">
                          R
                          <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#5d83ff;vertical-align:top;margin-left:1px;margin-top:2px;"></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align:middle;font-family:'SF Mono',Menlo,monospace;font-size:17px;color:#e8eaf0;letter-spacing:-0.01em;">
                    reley
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Eyebrow -->
          <tr>
            <td style="padding-bottom:14px;font-family:'SF Mono',Menlo,monospace;font-size:11px;color:#5d83ff;letter-spacing:0.22em;text-transform:uppercase;">
              <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#5d83ff;vertical-align:middle;margin-right:8px;"></span>
              Reley Cloud · waitlist
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td class="h1" style="font-size:36px;line-height:1.05;letter-spacing:-0.028em;font-weight:600;color:#e8eaf0;padding-bottom:18px;">
              You're in.
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="font-size:15.5px;line-height:1.6;color:#9ba2b1;padding-bottom:28px;">
              Thanks for joining the Reley Cloud waitlist. We'll email you the moment the next wave opens - one email per launch, never anything else.
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#5d83ff;border-radius:9px;">
                    <a class="cta" href="${site}/docs" style="display:inline-block;padding:13px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.005em;">
                      Read the docs &nbsp;&rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- While you wait -->
          <tr>
            <td style="padding-bottom:6px;font-family:'SF Mono',Menlo,monospace;font-size:10.5px;color:#6c7385;letter-spacing:0.22em;text-transform:uppercase;">
              While you wait
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${[
                  { label: 'Use cases', path: '/use-cases', hint: 'What people build with Reley' },
                  { label: 'Desktop app', path: '/download', hint: 'Run a sandbox on your laptop today' },
                  { label: 'CLI', path: '/docs/cli', hint: 'Script everything' },
                ]
                  .map(
                    (link) => `
                <tr>
                  <td style="border-top:1px solid #1c2230;padding:14px 0;">
                    <a href="${site}${link.path}" style="text-decoration:none;color:#e8eaf0;display:block;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="font-size:14.5px;color:#e8eaf0;font-weight:500;">
                            ${link.label}
                          </td>
                          <td align="right" style="font-family:'SF Mono',Menlo,monospace;font-size:11.5px;color:#6c7385;">
                            ${link.path}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="font-size:13px;color:#9ba2b1;line-height:1.5;padding-top:2px;">
                            ${link.hint}
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                </tr>`,
                  )
                  .join('')}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1c2230;padding-top:24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'SF Mono',Menlo,monospace;font-size:11px;color:#6c7385;letter-spacing:0.18em;text-transform:uppercase;line-height:1.6;">
                    Reley · ${site.replace(/^https?:\/\//, '')}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#6c7385;padding-top:10px;line-height:1.6;">
                    Didn't sign up? Ignore this email - we won't reach out again.
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#6c7385;padding-top:14px;line-height:1.6;">
                    Not interested anymore?
                    <a href="${unsubUrl}" style="color:#aeb9f0;text-decoration:underline;">
                      Unsubscribe from the waitlist
                    </a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html, text }
}
