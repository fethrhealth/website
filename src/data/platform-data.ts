/**
 * Data for /platform/data page sections.
 * FeatureGridSection data has been moved to @/data/data-grid-section.
 */

import type { ScrollAccordionItem } from '@/components/sections/ScrollAccordionSection'
import type { EnrichmentItem } from '@/components/sections/EnrichmentSection'

// ─── Enrichment grid (3-col, image cards) ─────────────────────────────────────

export const DATA_ENRICHMENT_ITEMS: EnrichmentItem[] = [
  {
    id: 'enr1',
    image: '/assets/images/platform/data/enrichment/record-enriched.webp',
    imageWidth: 1472,
    imageHeight: 1008,
    title: 'Every record, enriched.',
    description: 'Revenue to location, employee count, company size, and more.',
  },
  {
    id: 'enr2',
    image: '/assets/images/platform/data/enrichment/customer-conversations.webp',
    imageWidth: 1820,
    imageHeight: 1820,
    title: 'Customer conversations in context.',
    description: 'Your team gets live customer context from every email, meeting, record, and more.',
  },
  {
    id: 'enr3',
    image: '/assets/images/platform/data/enrichment/data-powered.webp',
    imageWidth: 2000,
    imageHeight: 2000,
    title: 'Data-powered workflows.',
    description: 'Automate your go-to-market decisions based on the most reliable dataset in the industry.',
  },
]

// ─── Scroll accordion (data sources) ──────────────────────────────────────────

export const DATA_SOURCES_ITEMS: ScrollAccordionItem[] = [
  {
    title: 'Data warehouses.',
    description: 'No silos. Collate your product, user & billing data in real-time via reverse ETL and CDPs.',
    image: '/assets/images/platform/data/data-sources/data-warehouses.webp',
    imageWidth: 2264,
    imageHeight: 2080,
  },
  {
    title: 'Email and calendar sync.',
    description: 'Sync your email and calendar to build a full-fledged CRM in a matter of minutes.',
    image: '/assets/images/platform/data/data-sources/email-and-calendar.webp',
    imageWidth: 2264,
    imageHeight: 2080,
  },
  {
    title: 'Sales engagement tools.',
    description: 'Power up your GTM team with instant connections to sales engagement tools.',
    image: '/assets/images/platform/data/data-sources/engagement-tools.webp',
    imageWidth: 2264,
    imageHeight: 2080,
  },
]