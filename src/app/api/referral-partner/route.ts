import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { logSpam, spamReason } from '@/lib/spamGuard'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** A non-blank string. Blank selects arrive as '' and Payload rejects '' as a select value. */
function filled(v: unknown): v is string {
  return typeof v === 'string' && v.trim() !== ''
}

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
  if (typeof b.email !== 'string' || !EMAIL_RE.test(b.email.trim())) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
  }
  if (typeof b.company !== 'string' || !b.company.trim()) {
    return NextResponse.json({ error: 'Company is required.' }, { status: 400 })
  }
  if (typeof b.region !== 'string' || !b.region.trim()) {
    return NextResponse.json({ error: 'Region is required.' }, { status: 400 })
  }

  const spam = spamReason(b, {
    emails: [b.email as string],
    names:  [b.firstName as string, b.lastName as string],
    text:   [b.company, b.jobTitle, b.referralSource, b.message].filter((v): v is string => typeof v === 'string'),
  })
  if (spam) {
    logSpam('referral-partner', spam, b.email as string)
    return NextResponse.json({ success: true }, { status: 201 })
  }

  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'referral-partners',
    data: {
      firstName:        (b.firstName as string).trim(),
      lastName:         (b.lastName  as string).trim(),
      email:            (b.email     as string).trim().toLowerCase(),
      phone:            typeof b.phone            === 'string' ? b.phone.trim()            : '',
      company:          (b.company   as string).trim(),
      jobTitle:         typeof b.jobTitle         === 'string' ? b.jobTitle.trim()         : '',
      linkedIn:         typeof b.linkedIn         === 'string' ? b.linkedIn.trim()         : '',
      region:           b.region as 'North America' | 'Europe' | 'Rest of World',
      healthcareNetwork:filled(b.healthcareNetwork)        ? b.healthcareNetwork as 'Health Systems' | 'Health IT Vendors' | 'Consulting' | 'Other' : undefined,
      referralSource:   typeof b.referralSource   === 'string' ? b.referralSource.trim()   : '',
      message:          typeof b.message          === 'string' ? b.message.trim()          : '',
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
