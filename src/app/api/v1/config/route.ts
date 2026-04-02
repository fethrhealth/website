import { NextResponse } from 'next/server'

/**
 * GET /api/v1/config
 *
 * Returns PostHog configuration and app metadata. The orchestration engine
 * fetches this at startup to initialise PostHog on the backend and frontend.
 *
 * If the POSTHOG_TOKEN env var is not set, PostHog will remain disabled on
 * the client (the orchestration engine checks for a truthy token before init).
 */
export async function GET() {
  return NextResponse.json({
    posthog: {
      token:   process.env.POSTHOG_TOKEN ?? '',
      apiHost: process.env.POSTHOG_API_HOST ?? 'https://us.i.posthog.com',
    },
    id: 'fethr',
  })
}
