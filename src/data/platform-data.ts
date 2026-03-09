/**
 * Data for /platform/data page sections.
 */

import type { NumberedGridItem, FeatureGridQuote } from '@/components/sections/FeatureGridSection'
import { ScrollAccordionItem } from '@/components/sections/ScrollAccordionSection'

// ─── Numbered grid (2-col, dot bg) ────────────────────────────────────────────

export const DATA_GRID_ITEMS: NumberedGridItem[] = [
  {
    kind: 'numbered',
    number: '[01]',
    image: '/assets/images/platform/data/fast-flexible/business-model.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'Build for any business model.',
    description: 'Track investors, partners, products, or anything else unique to how you operate.',
  },
  {
    kind: 'numbered',
    number: '[02]',
    image: '/assets/images/platform/data/fast-flexible/iterate-faster.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'Iterate faster than ever.',
    description: 'Sort, filter, and utilize millions of records in milliseconds.',
  },
  {
    kind: 'numbered',
    number: '[03]',
    image: '/assets/images/platform/data/fast-flexible/fine-tuning.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'Fine-tune to your data structure.',
    description: 'Customize fields to capture exactly what you need to track.',
  },
  {
    kind: 'numbered',
    number: '[04]',
    image: '/assets/images/platform/data/fast-flexible/associations.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'Create associations.',
    description: 'Link objects to make your data actionable and insightful with our powerful graph model.',
  },
]

export const DATA_GRID_QUOTE: FeatureGridQuote = {
  text: 'It finally felt like I could configure our CRM to fit our business needs, rather than the other way around.',
  author: 'Margaret Shen',
  role: 'Head of Business Operations · Modal',
}


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