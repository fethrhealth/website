/**
 * DataContextSection
 *
 * Three-column icon + title + description grid for /platform/data.
 * Wrapper around <FeatureGridSection> with the context-card data baked in.
 *
 * Icons (18 × 18) — place in public/:
 *   public/assets/images/platform/data/context/attributes.webp
 *   public/assets/images/platform/data/context/activity.webp
 *   public/assets/images/platform/data/context/status.webp
 */

import { FeatureGridSection, type IconGridItem } from './FeatureGridSection'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS: IconGridItem[] = [
  {
    kind: 'icon',
    icon: '/assets/images/platform/data/context/attributes.webp',
    title: 'Custom attributes',
    description: 'Track, enrich, and update any data your business needs.',
  },
  {
    kind: 'icon',
    icon: '/assets/images/platform/data/context/activity.webp',
    title: 'Activity timelines',
    description: 'Get instant visibility into the full history of every interaction.',
  },
  {
    kind: 'icon',
    icon: '/assets/images/platform/data/context/status.webp',
    title: 'Detailed views',
    description: 'From kanbans to tables, visualize your data the way that works for you.',
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────

export function DataContextSection() {
  return (
    <FeatureGridSection
      heading="Context that stays current."
      subheading="Your team always has the latest customer intelligence, automatically."
      cols={3}
      background="hatching"
      rules="solid"
      items={ITEMS}
      divider
    />
  )
}
