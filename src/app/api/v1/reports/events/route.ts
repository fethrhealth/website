import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * POST /api/v1/reports/events
 *
 * Receives real-time UI telemetry from orchestration engine installations.
 * Every frontend interaction (page views, editor tab actions, auth events,
 * setup flow steps) is posted here.
 *
 * Expected body shape (varies by event type):
 * {
 *   type: "PAGE" | "EDITOR_TAB_ACTION" | "ossauth" | "setup_flow:*" | ...,
 *   iid:  "<instance-uuid>",
 *   uid:  "<user-id>",
 *   date: "<ISO-8601>",
 *   counter: <number>,
 *   ...additional event-specific fields
 * }
 */
export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Request body must be a JSON object.' }, { status: 400 })
  }

  const b = body as Record<string, unknown>

  const eventType  = typeof b.type === 'string' ? b.type.trim() : ''
  const instanceId = typeof b.iid  === 'string' ? b.iid.trim()  : ''
  const userId     = typeof b.uid  === 'string' ? b.uid.trim()  : ''

  if (!eventType) {
    return NextResponse.json({ error: 'Event type is required.' }, { status: 400 })
  }

  if (!instanceId) {
    return NextResponse.json({ error: 'Instance ID (iid) is required.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'telemetry-events',
      data: {
        eventType,
        instanceId,
        ...(userId ? { userId } : {}),
        eventData: body as Record<string, unknown>,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[telemetry-events] Failed to store event:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
