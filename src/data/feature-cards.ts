/**
 * Data types for FeatureCardsSection.
 *
 * A left-aligned heading + 3-column grid of icon + label + description cards.
 * Each card can optionally include a text link (internal or external).
 *
 * Icons → /public/assets/icons/[name].svg
 */

export interface FeatureCardItem {
  /** Path to the icon, e.g. '/assets/icons/key.svg' */
  iconSrc: string
  iconAlt?: string
  /** Card title shown next to the icon */
  label: string
  /** Short description below the label */
  description: string
  /** Optional CTA link label */
  linkLabel?: string
  /** Optional CTA link href */
  linkHref?: string
  /** Open in new tab (default: false) */
  linkExternal?: boolean
}

export interface FeatureCardsContent {
  heading?: string
  subtext?: string
  items: FeatureCardItem[]
}
