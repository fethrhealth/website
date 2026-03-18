import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Basic email regex — intentionally simple; full validation lives on the client
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as Record<string, unknown>).email !== 'string'
  ) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const email  = ((body as Record<string, unknown>).email  as string).trim().toLowerCase()
  const source = ((body as Record<string, unknown>).source as string | undefined)?.trim() ?? ''

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'demo-requests',
    data: {
      email,
      ...(source ? { source } : {}),
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
