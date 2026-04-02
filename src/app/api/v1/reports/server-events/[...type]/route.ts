import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * POST /api/v1/reports/server-events/[...type]
 *
 * Receives scheduled backend telemetry reports from orchestration engine
 * installations. The path segment after /server-events/ is the report type
 * (e.g. "usage", "system_information", "plugin_metrics", "service_usage",
 * "plugin_usage") — appended by ServerEventSender.java.
 *
 * Expected body shape (ServerEvent):
 * {
 *   uuid:          "<event-uuid>",
 *   sessionUuid:   "<session-uuid>",
 *   instanceUuid:  "<instance-uuid>",
 *   serverType:    "STANDALONE" | "EXECUTOR" | "SCHEDULER" | "WORKER",
 *   serverVersion: "<version>",
 *   reportedAt:    "<ISO-8601>",
 *   zoneId:        "<timezone>",
 *   ...payload fields (unwrapped via @JsonUnwrapped)
 * }
 *
 * Note: Kestra uses @JsonUnwrapped on the payload field, so the report-
 * specific data is flattened into the root of the JSON body rather than
 * nested under a "payload" key. We store the entire body as the payload.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string[] }> },
) {
  const { type: typeParts } = await params
  const reportType = typeParts.join('/')

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

  const instanceId    = typeof b.instanceUuid  === 'string' ? b.instanceUuid  : ''
  const sessionId     = typeof b.sessionUuid   === 'string' ? b.sessionUuid   : ''
  const serverType    = typeof b.serverType    === 'string' ? b.serverType    : ''
  const serverVersion = typeof b.serverVersion === 'string' ? b.serverVersion : ''
  const zoneId        = typeof b.zoneId        === 'string' ? b.zoneId        : ''
  const reportedAt    = typeof b.reportedAt    === 'string' ? b.reportedAt    : ''

  if (!instanceId) {
    return NextResponse.json({ error: 'Instance UUID (instanceUuid) is required.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'server-reports',
      data: {
        reportType,
        instanceId,
        ...(sessionId     ? { sessionId }     : {}),
        ...(serverType    ? { serverType }    : {}),
        ...(serverVersion ? { serverVersion } : {}),
        ...(zoneId        ? { zoneId }        : {}),
        ...(reportedAt    ? { reportedAt }    : {}),
        payload: body as Record<string, unknown>,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(`[server-reports] Failed to store ${reportType} report:`, err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
