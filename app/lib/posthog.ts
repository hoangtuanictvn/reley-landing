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
      capture_pageview: false, // wired manually via PosthogProvider
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage+cookie',
      respect_dnt: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-ph-mask]',
      },
      loaded: (ph) => {
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
