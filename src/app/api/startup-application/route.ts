import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Body = {
  firstName?: unknown
  lastName?: unknown
  companyEmail?: unknown
  yearFounded?: unknown
  latestFundingRound?: unknown
  totalAmountRaised?: unknown
  teamSize?: unknown
  useCase?: unknown
}

export async function POST(request: NextRequest) {
  let body: Body

  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const firstName    = typeof body.firstName    === 'string' ? body.firstName.trim()    : ''
  const lastName     = typeof body.lastName     === 'string' ? body.lastName.trim()     : ''
  const companyEmail = typeof body.companyEmail === 'string' ? body.companyEmail.trim().toLowerCase() : ''

  if (!firstName)                    return NextResponse.json({ error: 'First name is required.'    }, { status: 400 })
  if (!lastName)                     return NextResponse.json({ error: 'Last name is required.'     }, { status: 400 })
  if (!EMAIL_RE.test(companyEmail))  return NextResponse.json({ error: 'A valid company email is required.' }, { status: 400 })

  let payload: Awaited<ReturnType<typeof getPayload>>

  try {
    payload = await getPayload({ config: configPromise })
  } catch (err) {
    console.error('[startup-application] Payload init error:', err)
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  try {
    await payload.create({
      collection: 'startup-applications',
      data: {
        firstName,
        lastName,
        companyEmail,
        yearFounded:         typeof body.yearFounded         === 'string' ? body.yearFounded         : undefined,
        latestFundingRound:  typeof body.latestFundingRound  === 'string' ? body.latestFundingRound  : undefined,
        totalAmountRaised:   typeof body.totalAmountRaised   === 'string' ? body.totalAmountRaised   : undefined,
        teamSize:            typeof body.teamSize            === 'string' ? body.teamSize            : undefined,
        useCase:             typeof body.useCase             === 'string' ? body.useCase             : undefined,
      },
    })
  } catch (err) {
    console.error('[startup-application] payload.create error:', err)
    return NextResponse.json({ error: 'Could not save your application. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
