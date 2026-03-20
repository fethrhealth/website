'use client'

/**
 * PageViewTracker — client component.
 *
 * Listens for Next.js route changes (via usePathname) and fires a page_view
 * event through the useAnalytics hook on every navigation.
 *
 * We set `send_page_view: false` in the GA4 init script so that GA4 does NOT
 * auto-fire on load — this component owns all page-view reporting instead.
 *
 * VENDOR COVERAGE:
 *   ✅ GA4       — trackPageView calls fireGA4('page_view', ...)
 *   ⚠️  Meta Pixel — NOT tracked here. fbq('track', 'PageView') needs to be
 *                   added to trackPageView in src/lib/analytics.ts when ready.
 *   ✅ LinkedIn  — Insight Tag fires page views automatically via its own script.
 *
 * Mount once inside the site layout. No visible UI is rendered.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalytics } from '@/lib/analytics'

export function PageViewTracker(): null {
  const pathname = usePathname()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname, trackPageView])

  return null
}
