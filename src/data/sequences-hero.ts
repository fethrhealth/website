// ─── SequencesHeroSection — /platform/sequences ───────────────────────────────

// ── Hero text ──────────────────────────────────────────────────────────────────

/** Small badge/pill above the main heading. */
export const SEQUENCES_HERO_BADGE       = 'Sequences'
/** Main hero heading. */
export const SEQUENCES_HERO_HEADING     = 'Signal, sequence, success.'
/** Subheading paragraph below the heading. */
export const SEQUENCES_HERO_SUBHEADING  =
  'Go from first touch to final appointment with perfectly crafted outreach delivered right on cue.'

export const SEQUENCES_HERO_CTA_LABEL  = 'Start for free'
export const SEQUENCES_HERO_CTA_HREF   = '/platform/sequences'

/**
 * Source identifier for the desktop "Talk to sales" dialog.
 * Stored on the lead record so the team knows the exact entry point.
 */
export const SEQUENCES_HERO_SALES_SOURCE = 'sequences-hero'

/**
 * Source identifier for the mobile demo-request form.
 * Keep it short, lowercase, and unique across pages.
 */
export const SEQUENCES_HERO_FORM_SOURCE  = 'sequences'

// ── Visualization diagram ──────────────────────────────────────────────────────
// Text shown inside the animated sequence diagram.
// Skeleton line widths and animation timings are structural — edit in the component.

/** Label in the enrollment header ("Enrolled by …"). */
export const SEQUENCES_ENROLLED_BY_LABEL = 'Enrolled by'
/** Workflow name shown next to the workflow icon in the enrollment header. */
export const SEQUENCES_WORKFLOW_NAME     = 'PQL Triage'

/** Subject line and timestamp for the first email card. */
export const SEQUENCES_EMAIL_1_SUBJECT   = 'Welcome Yara'
export const SEQUENCES_EMAIL_1_TIMESTAMP = '5 days ago'

/** Delay pill between the two email cards. */
export const SEQUENCES_TIME_PILL_LABEL   = 'After 2 business days'

/** Subject line and timestamp for the second email card. */
export const SEQUENCES_EMAIL_2_SUBJECT   = 'Next steps'
export const SEQUENCES_EMAIL_2_TIMESTAMP = 'Yesterday'

/** Status label shown after the second email card. */
export const SEQUENCES_STATUS_LABEL      = 'Completed'

/** Main text on the meeting-booked pill at the bottom of the diagram. */
export const SEQUENCES_MEETING_LABEL     = 'Booked meeting'
/** Name highlighted in the meeting pill (e.g. the prospect's first name). */
export const SEQUENCES_MEETING_NAME      = 'Yara'

/** Avatars shown in the meeting pill — rep and prospect. */
export const SEQUENCES_AVATAR_1 = '/assets/images/platform/sequences/hero/sequences-avatar-1.avif'
export const SEQUENCES_AVATAR_2 = '/assets/images/platform/sequences/hero/sequences-avatar-2.avif'
