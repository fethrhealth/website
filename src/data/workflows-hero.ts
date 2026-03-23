// ─── WorkflowsHeroSection — /platform/workflows ───────────────────────────────

// ── Hero text ──────────────────────────────────────────────────────────────────

/** "New" pill label — left badge inside the announcement chip. */
export const WORKFLOWS_HERO_BADGE_LABEL = 'New'
/** Announcement chip text — right of the "New" pill. */
export const WORKFLOWS_HERO_BADGE_TEXT  = 'Automations library'
/** Link the announcement chip points to. */
export const WORKFLOWS_HERO_BADGE_HREF  = '/platform/workflows'

/** First line of the hero heading. */
export const WORKFLOWS_HERO_HEADING_1   = 'Automate. Iterate.'
/** Second line of the hero heading. */
export const WORKFLOWS_HERO_HEADING_2   = 'Accelerate.'

export const WORKFLOWS_HERO_SUBHEADING  =
  'Workflows turns your GTM strategies into dynamic engines for revenue growth.'

export const WORKFLOWS_HERO_CTA_LABEL  = 'Start for free'
export const WORKFLOWS_HERO_CTA_HREF   = '/platform/workflows'

/**
 * Source identifier for the desktop "Talk to sales" dialog.
 * Stored on the lead record so the team knows the exact entry point.
 */
export const WORKFLOWS_HERO_SALES_SOURCE = 'workflows-hero'

/**
 * Source identifier for the mobile demo-request form.
 * Keep it short, lowercase, and unique across pages.
 */
export const WORKFLOWS_HERO_FORM_SOURCE  = 'workflows'

// ── Workflow diagram cards ─────────────────────────────────────────────────────
// Five cards shown in the animated workflow diagram on the right side.
// Each card has a short title, a category tag, and a one-line description.
// Icons and grid positions are structural — only text is editable here.

export interface WorkflowCardData {
  title: string
  tag:   string
  desc:  string
}

export const WORKFLOW_CARDS: WorkflowCardData[] = [
  // Card 0 — Trigger (always visible, starts the animation)
  {
    title: 'ADT^A01 — Patient admitted',
    tag:   'HL7',
    desc:  'Trigger when a patient admission event is received.',
  },
  // Card 1 — Condition
  {
    title: 'Payer in network?',
    tag:   'Condition',
    desc:  "Continue if the patient's payer is in-network.",
  },
  // Card 2 — Slack action
  {
    title: 'Alert care team via Slack',
    tag:   'Slack',
    desc:  'Send patient summary and action buttons to Slack.',
  },
  // Card 3 — EHR action (in-network branch)
  {
    title: 'Route to Epic EHR',
    tag:   'Epic',
    desc:  'Send HL7 message to Epic for downstream processing.',
  },
  // Card 4 — Queue action (out-of-network branch, always static)
  {
    title: 'Add to care queue',
    tag:   'Queue',
    desc:  'Enqueue patient for priority care follow-up.',
  },
]

// ── Connector branch labels ────────────────────────────────────────────────────
// Small pills shown on the connector lines between cards.

/** Label on the left (in-network) branch connector. */
export const WORKFLOW_CONN_IN_NETWORK = 'In-network'
/** Label on the right (out-of-network) branch connector. */
export const WORKFLOW_CONN_OON        = 'OON patient'
