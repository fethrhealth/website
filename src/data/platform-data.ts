/**
 * Data for /platform/data page sections.
 * FeatureGridSection data  → @/data/data-grid-section
 * EnrichmentSection data   → @/data/data-enrichment
 */

import type { ScrollAccordionItem } from '@/components/sections/ScrollAccordionSection'

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