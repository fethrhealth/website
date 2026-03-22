// ─── TrialSection — /platform/data ────────────────────────────────────────────

/**
 * Source identifier attached to every demo-request and "Talk to sales" submission
 * that originates from this page.  It is stored on the lead record so the team
 * can see exactly which page triggered the conversion.
 *
 * Keep it short, lowercase, and unique across pages
 * (e.g. 'data', 'ai', 'home', 'pricing').
 */
export const DATA_CTA_SOURCE = 'data'

/**
 * Controls whether the heading reads as a continuous sentence ('inline')
 * or as two stacked lines where the serif part is larger ('stacked').
 */
export const DATA_CTA_HEADING_LAYOUT = 'inline' as const
