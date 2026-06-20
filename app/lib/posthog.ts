'use client'

import posthog, { type PostHog } from 'posthog-js'

let initialized = false

export function getPosthog(): PostHog | null {
  if (typeof window === 'undefined') return null

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return null

  if (!initialized) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      // 'history_change' makes PostHog auto-fire $pageview on SPA route
      // changes (App Router uses history.pushState). The provider also fires
      // a manual $pageview as a belt-and-suspenders backup.
      capture_pageview: 'history_change',
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage+cookie',
      respect_dnt: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-ph-mask]',
      },
      loaded: (ph) => {
        // Fire the very first pageview immediately so the onboarding
        // check at app.posthog.com sees the event without waiting on a
        // history change.
        ph.capture('$pageview')
        if (process.env.NODE_ENV !== 'production') ph.debug(false)
      },
    })
    initialized = true
  }
  return posthog
}

export function capture(event: string, props?: Record<string, unknown>): void {
  getPosthog()?.capture(event, props)
}

export function identify(id: string, props?: Record<string, unknown>): void {
  getPosthog()?.identify(id, props)
}
