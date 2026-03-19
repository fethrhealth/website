/**
 * FooterWrapper — async server component.
 * Fetches legal pages from Payload and passes them as props to ClientFooter.
 * Keeps Footer.tsx as a pure presentational component (no async data fetching).
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { ClientFooter } from './ClientFooter'
import type { FooterLegalLink } from './Footer'

export async function FooterWrapper() {
  let legalLinks: FooterLegalLink[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'legal-pages',
      sort: 'order',
      limit: 20,
      depth: 0,
    })
    legalLinks = (result.docs as Array<{ title: string; slug: string }>).map((p) => ({
      label: p.title,
      href:  `/legal/${p.slug}`,
    }))
  } catch {
    // If Payload isn't available at build time, fall back to empty (footer still renders)
  }

  return <ClientFooter legalLinks={legalLinks} />
}
