import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const b = body as Record<string, unknown>

  if (typeof b.firstName !== 'string' || !b.firstName.trim()) {
    return NextResponse.json({ error: 'First name is required.' }, { status: 400 })
  }
  if (typeof b.lastName !== 'string' || !b.lastName.trim()) {
    return NextResponse.json({ error: 'Last name is required.' }, { status: 400 })
  }
  if (typeof b.companyEmail !== 'string' || !EMAIL_RE.test(b.companyEmail.trim())) {
    return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'sales-leads',
    data: {
      firstName:   (b.firstName   as string).trim(),
      lastName:    (b.lastName    as string).trim(),
      companyEmail:(b.companyEmail as string).trim().toLowerCase(),
      phone:       typeof b.phone       === 'string' ? b.phone.trim()       : '',
      region:      typeof b.region      === 'string' ? b.region             : '',
      companySize: typeof b.companySize === 'string' ? b.companySize        : '',
      details:     typeof b.details     === 'string' ? b.details.trim()     : '',
      source:      typeof b.source      === 'string' ? b.source.trim()      : '',
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
