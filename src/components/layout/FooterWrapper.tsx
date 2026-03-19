/**
 * FooterWrapper — async server component.
 * Fetches legal pages and social links from Payload and passes them as props to ClientFooter.
 * Keeps Footer.tsx as a pure presentational component (no async data fetching).
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { ClientFooter } from './ClientFooter'
import type { FooterLegalLink } from './Footer'
import type { SocialLinkEntry } from '@/types'

export async function FooterWrapper() {
  let legalLinks: FooterLegalLink[] = []
  let socialLinks: SocialLinkEntry[] = []

  try {
    const payload = await getPayload({ config })

    const [legalResult, socialResult] = await Promise.all([
      payload.find({
        collection: 'legal-pages',
        sort: 'order',
        limit: 20,
        depth: 0,
      }),
      payload.find({
        collection: 'social-links',
        where: { enabled: { equals: true } },
        sort: 'order',
        limit: 20,
        depth: 0,
      }),
    ])

    legalLinks = (legalResult.docs as unknown as Array<{ title: string; slug: string }>).map((p) => ({
      label: p.title,
      href:  `/legal/${p.slug}`,
    }))

    socialLinks = socialResult.docs as unknown as SocialLinkEntry[]
  } catch {
    // If Payload isn't available at build time, fall back to empty (footer still renders)
  }

  return <ClientFooter legalLinks={legalLinks} socialLinks={socialLinks} />
}
