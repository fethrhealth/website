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

import { FeatureGridSection } from './FeatureGridSection'
import { DATA_CONTEXT_HEADING, DATA_CONTEXT_SUBHEADING, DATA_CONTEXT_ITEMS } from '@/data/data-context'

// ─── Section ──────────────────────────────────────────────────────────────────

export function DataContextSection() {
  return (
    <FeatureGridSection
      heading={DATA_CONTEXT_HEADING}
      subheading={DATA_CONTEXT_SUBHEADING}
      cols={3}
      background="hatching"
      rules="solid"
      items={DATA_CONTEXT_ITEMS}
      divider
    />
  )
}
