'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { clsx } from './clsx'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Waitlist({
  source = 'cloud',
  compact = false,
}: {
  source?: string
  compact?: boolean
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setStatus({ kind: 'error', message: 'Enter a valid email.' })
      return
    }
    setStatus({ kind: 'submitting' })
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && data.ok) {
        setStatus({ kind: 'success' })
        setEmail('')
      } else if (res.status === 422) {
        setStatus({ kind: 'error', message: 'Enter a valid email.' })
      } else {
        setStatus({ kind: 'error', message: 'Something broke on our end. Try again in a minute.' })
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Try again.' })
    }
  }

  if (status.kind === 'success') {
    return (
      <div
        className={clsx(
          'rounded-[12px] border border-line bg-surface-1 px-5 py-4 inline-flex items-start gap-3 max-w-[480px]',
          compact ? '' : 'mt-2',
        )}
      >
        <CheckCircle size={20} weight="fill" className="text-accent shrink-0 mt-0.5" />
        <div>
          <div className="text-fore text-[14.5px] font-medium">You&apos;re on the list.</div>
          <div className="mt-1 text-soft text-[13px] leading-[1.6]">
            We&apos;ll email you before the cloud version opens. No marketing
            spam, just product news.
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className={clsx('w-full max-w-[480px]', compact ? '' : 'mt-2')}
    >
      <div
        className={clsx(
          'flex items-stretch rounded-[12px] border bg-surface-1 transition-colors',
          status.kind === 'error'
            ? 'border-[#d8a86a]/50'
            : 'border-line focus-within:border-line-strong',
        )}
      >
        <label htmlFor={`waitlist-${source}`} className="sr-only">
          Email
        </label>
        <input
          id={`waitlist-${source}`}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@protocol.dev"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status.kind === 'error') setStatus({ kind: 'idle' })
          }}
          disabled={status.kind === 'submitting'}
          className="flex-1 bg-transparent px-4 py-3 text-[14.5px] text-fore placeholder:text-mute focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className="inline-flex items-center gap-2 px-4 sm:px-5 my-1 mr-1 rounded-[9px] bg-fore text-ink font-medium text-[13.5px] hover:bg-[#f4f6fb] transition-colors active:translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-70"
        >
          {status.kind === 'submitting' ? 'Joining…' : 'Join waitlist'}
          {status.kind !== 'submitting' && (
            <ArrowRight size={14} weight="bold" />
          )}
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3 min-h-[18px] text-[12.5px]">
        {status.kind === 'error' ? (
          <span className="text-[#d8a86a]">{status.message}</span>
        ) : (
          <span className="text-mute">
            Email only. We never share it. Unsubscribe anytime.
          </span>
        )}
      </div>
    </form>
  )
}
