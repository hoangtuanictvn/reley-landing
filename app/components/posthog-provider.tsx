'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { capture, getPosthog } from '../lib/posthog'

export function PosthogProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialise on mount so subsequent capture() calls work.
  useEffect(() => {
    getPosthog()
  }, [])

  // Fire $pageview on every route change (App Router doesn't trigger a full
  // navigation event so we have to do it manually).
  useEffect(() => {
    if (!pathname) return
    const url =
      typeof window === 'undefined'
        ? pathname
        : window.location.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    capture('$pageview', { $current_url: url, path: pathname })
  }, [pathname, searchParams])

  return null
}
