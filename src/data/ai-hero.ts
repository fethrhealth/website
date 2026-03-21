// ─── AI page — Hero section copy ─────────────────────────────────────────────

export const AI_HERO_EYEBROW    = 'Embedded intelligence'
export const AI_HERO_HEADING    = 'The AI CRM for go-to-market.'
export const AI_HERO_SUBHEADING = 'Beautifully intelligent. Designed to help your GTM team do their best work.'
export const AI_HERO_CTA_PRIMARY      = 'Start for free'
export const AI_HERO_CTA_PRIMARY_HREF = '/platform/ai'

// ─── Widget — animated prompt / response pairs ────────────────────────────────
// Each index corresponds to one animation cycle: PROMPTS[i] → PLACEHOLDERS[i] → RESPONSES[i].
// All three arrays must have the same length.

/** Rotating labels shown in the request card (large animated text). */
export const AI_HERO_PROMPTS: string[] = [
  'Automatically qualify leads',
  'Find expansion opportunities',
  'Mitigate potential churn risks',
]

/**
 * Input placeholder shown below the divider in the request card.
 * Swaps in sync with PROMPTS — one placeholder per prompt.
 */
export const AI_HERO_PLACEHOLDERS: string[] = [
  'Does this company match our ICP?',
  'Did any customers raise funding last quarter?',
  'Did any customers appoint new VPs this month?',
]

/** Typewriter response shown in the response card below the request card. */
export const AI_HERO_RESPONSES: string[] = [
  'Company qualified as an ICP lead.',
  '19 new expansion opportunities found.',
  '4 workspaces identified as churn risks.',
]

// ─── Widget — misc labels ─────────────────────────────────────────────────────

/** Small badge rendered inside the request card (top-right corner). */
export const AI_HERO_WIDGET_BADGE = 'AI'
