/**
 * Data types for IntegrationCardsSection.
 *
 * A grid of integration cards — icon + name + description.
 * Icons → /public/assets/icons/integrations/[name].webp
 */

export interface IntegrationCard {
  /** Path to the integration icon, e.g. '/assets/icons/integrations/slack.webp' */
  iconSrc: string
  iconAlt?: string
  name: string
  description: string
}

export interface IntegrationCardsContent {
  /**
   * 'split'    (default) → heading left (cols 1-5), subtext right (cols 7-11)
   * 'centered'           → both centered, max-w-xl
   */
  headerLayout?: 'split' | 'centered'
  /** Gray part of the heading */
  headingMuted?: string
  /** Dark part of the heading */
  headingPrimary?: string
  /** Render headingMuted before headingPrimary (default: true) */
  headingMutedFirst?: boolean
  /** Insert a <br> between the two heading parts (default: false) */
  headingLineBreak?: boolean
  subtext?: string
  items: IntegrationCard[]
}
