/**
 * Analytics abstraction layer for Fethr Health.
 *
 * Wraps GA4, Meta Pixel, LinkedIn Insight Tag, and Microsoft Clarity
 * behind a single hook so components never import vendor SDKs directly.
 *
 * All tracking calls are no-ops until the user consents (TODO: consent banner).
 * All calls are guarded with typeof window checks for SSR safety.
 */

'use client'

import { useCallback } from 'react'
import type { AnalyticsEvent } from '@/types'

// ---------------------------------------------------------------------------
// Vendor type stubs
// These vendors inject globals onto window — declare minimal shapes here
// rather than installing @types packages that bloat the bundle.
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    // Google Analytics 4
    gtag?: (...args: unknown[]) => void
    // Meta Pixel
    fbq?: (action: string, event: string, properties?: Record<string, unknown>) => void
    // LinkedIn Insight Tag
    lintrk?: (action: string, payload?: Record<string, unknown>) => void
    // Microsoft Clarity
    clarity?: (action: string, ...args: unknown[]) => void
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Fire a GA4 event. No-op if GA4 is not loaded. */
function fireGA4(name: string, properties?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, properties)
}

/** Fire a Meta Pixel custom event. No-op if Pixel is not loaded. */
function fireMeta(name: string, properties?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('trackCustom', name, properties)
}

/** Fire a LinkedIn conversion event. No-op if tag is not loaded. */
function fireLinkedIn(conversionId?: string): void {
  if (typeof window === 'undefined' || !window.lintrk) return
  if (!conversionId) return
  window.lintrk('track', { conversion_id: conversionId })
}

// ---------------------------------------------------------------------------
// Public hook
// ---------------------------------------------------------------------------

interface UseAnalyticsReturn {
  /**
   * Track a page view. Call on route changes via usePathname() + useEffect.
   * GA4 handles page_view automatically, but this lets other vendors know too.
   */
  trackPageView: (path: string) => void

  /**
   * Track a generic named event with optional properties.
   * Properties must be serialisable (no functions, no circular refs).
   */
  trackEvent: (name: string, properties?: AnalyticsEvent['properties']) => void

  /**
   * Convenience wrapper for form submission tracking.
   * Fires on the success path — not on the click.
   */
  trackFormSubmit: (formName: string, extra?: AnalyticsEvent['properties']) => void
}

/**
 * useAnalytics — central hook for all event tracking.
 *
 * @example
 * const { trackEvent, trackFormSubmit } = useAnalytics()
 * trackEvent('cta_clicked', { label: 'hero_get_started' })
 * trackFormSubmit('demo_request')
 */
export function useAnalytics(): UseAnalyticsReturn {
  const trackPageView = useCallback((path: string): void => {
    fireGA4('page_view', { page_path: path })
    // LinkedIn does not have an explicit page_view call — the tag fires automatically
    // Clarity does not require manual page_view calls
  }, [])

  const trackEvent = useCallback(
    (name: string, properties?: AnalyticsEvent['properties']): void => {
      fireGA4(name, properties)
      fireMeta(name, properties)
    },
    [],
  )

  const trackFormSubmit = useCallback(
    (formName: string, extra?: AnalyticsEvent['properties']): void => {
      const properties = { form_name: formName, ...extra }

      // GA4
      fireGA4('form_submit', properties)

      // Meta — standard Lead event for form submissions
      fireMeta('Lead', properties)

      // LinkedIn — requires a pre-configured conversion ID per form
      // Set NEXT_PUBLIC_LINKEDIN_CONVERSION_<FORM_NAME>=<id> per form if needed
      const linkedInConversionId =
        process.env[`NEXT_PUBLIC_LINKEDIN_CONVERSION_${formName.toUpperCase()}`]
      fireLinkedIn(linkedInConversionId)
    },
    [],
  )

  return { trackPageView, trackEvent, trackFormSubmit }
}
