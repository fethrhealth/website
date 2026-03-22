import type { NumberedGridItem, FeatureGridQuote } from '@/components/sections/FeatureGridSection'

// ─── FeatureGridSection — "Blazingly fast" — /platform/data ──────────────────

export const DATA_GRID_HEADING    = 'Blazingly fast, amazingly flexible.'
export const DATA_GRID_SUBHEADING = 'Create the exact data model your business needs with custom objects.'

export const DATA_GRID_ITEMS: NumberedGridItem[] = [
  {
    kind:        'numbered',
    number:      '[01]',
    image:       '/assets/images/platform/data/fast-flexible/business-model.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Build for any business model.',
    description: 'Track investors, partners, products, or anything else unique to how you operate.',
  },
  {
    kind:        'numbered',
    number:      '[02]',
    image:       '/assets/images/platform/data/fast-flexible/iterate-faster.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Iterate faster than ever.',
    description: 'Sort, filter, and utilize millions of records in milliseconds.',
  },
  {
    kind:        'numbered',
    number:      '[03]',
    image:       '/assets/images/platform/data/fast-flexible/fine-tuning.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Fine-tune to your data structure.',
    description: 'Customize fields to capture exactly what you need to track.',
  },
  {
    kind:        'numbered',
    number:      '[04]',
    image:       '/assets/images/platform/data/fast-flexible/associations.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Create associations.',
    description: 'Link objects to make your data actionable and insightful with our powerful graph model.',
  },
]

export const DATA_GRID_QUOTE: FeatureGridQuote = {
  text:   'It finally felt like I could configure our CRM to fit our business needs, rather than the other way around.',
  author: 'Margaret Shen',
  role:   'Head of Business Operations · Modal',
}
