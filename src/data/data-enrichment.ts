import type { EnrichmentItem } from '@/components/sections/EnrichmentSection'

// ─── EnrichmentSection — /platform/data ───────────────────────────────────────

export const DATA_ENRICHMENT_HEADING    = 'Automatic enrichment, automatic advantage.'
export const DATA_ENRICHMENT_SUBHEADING = 'Get the context you need for every prospect, automatically drawn from 100s of sources and pre-analyzed by AI.'

export const DATA_ENRICHMENT_ITEMS: EnrichmentItem[] = [
  {
    id:          'enr1',
    image:       '/assets/images/platform/data/enrichment/record-enriched.webp',
    imageWidth:  1472,
    imageHeight: 1008,
    title:       'Every record, enriched.',
    description: 'Revenue to location, employee count, company size, and more.',
  },
  {
    id:          'enr2',
    image:       '/assets/images/platform/data/enrichment/customer-conversations.webp',
    imageWidth:  1820,
    imageHeight: 1820,
    title:       'Customer conversations in context.',
    description: 'Your team gets live customer context from every email, meeting, record, and more.',
  },
  {
    id:          'enr3',
    image:       '/assets/images/platform/data/enrichment/data-powered.webp',
    imageWidth:  2000,
    imageHeight: 2000,
    title:       'Data-powered workflows.',
    description: 'Automate your go-to-market decisions based on the most reliable dataset in the industry.',
  },
]
