import type { IconGridItem } from '@/components/sections/FeatureGridSection'

// ─── DataContextSection — /platform/data ──────────────────────────────────────

export const DATA_CONTEXT_HEADING    = 'Context that stays current.'
export const DATA_CONTEXT_SUBHEADING = 'Your team always has the latest customer intelligence, automatically.'

export const DATA_CONTEXT_ITEMS: IconGridItem[] = [
  {
    kind:        'icon',
    icon:        '/assets/images/platform/data/context/attributes.webp',
    title:       'Custom attributes',
    description: 'Track, enrich, and update any data your business needs.',
  },
  {
    kind:        'icon',
    icon:        '/assets/images/platform/data/context/activity.webp',
    title:       'Activity timelines',
    description: 'Get instant visibility into the full history of every interaction.',
  },
  {
    kind:        'icon',
    icon:        '/assets/images/platform/data/context/status.webp',
    title:       'Detailed views',
    description: 'From kanbans to tables, visualize your data the way that works for you.',
  },
]
