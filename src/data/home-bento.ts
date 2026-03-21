/**
 * home-bento.ts
 * All hardcoded text strings and item data for HomeBentoSection.
 * Edit this file to update copy, labels, or row data without touching the component.
 */

// ─── Section header ───────────────────────────────────────────────────────────

export const BENTO_SECTION_NUMBER  = '[01]'
export const BENTO_SECTION_LABEL   = 'Powerful platform'
export const BENTO_SECTION_COUNTER = '/ item 1 ⋮ 4'

// ─── Main heading ─────────────────────────────────────────────────────────────
// \u00a0 = non-breaking space (preserves the &nbsp; entities from the original JSX)

export const BENTO_HEADING    = 'GTM\u00a0at\u00a0full\u00a0throttle.\u00a0'
export const BENTO_SUBHEADING = 'Execute your revenue strategy with precision. Design powerful workflows, deploy AI, integrate your data and build detailed reports — all in one platform.'

// ─── Row item data ────────────────────────────────────────────────────────────

export interface BentoItem {
  readonly title:       string
  readonly description: string
  readonly linkLabel:   string
  readonly linkHref:    string
  /** Unique SVG pattern id — prevents duplicate IDs in the DOM */
  readonly patternId:   string
  readonly isLast:      boolean
}

export const BENTO_ITEMS: readonly BentoItem[] = [
  {
    title:       'Automate everything',
    description: "You're in control. Automate even the most complex business processes with our powerful, intelligent automation engine.",
    linkLabel:   'Explore automations',
    linkHref:    '/platform/automations',
    patternId:   'bento-dot-a',
    isLast:      false,
  },
  {
    title:       'Deploy AI',
    description: 'Search and create with Ask Fethr, connect your stack with MCP, or put agents to work on complex tasks like prospecting and lead scoring.',
    linkLabel:   'Explore AI',
    linkHref:    '/platform/ask',
    patternId:   'bento-dot-b',
    isLast:      false,
  },
  {
    title:       'Connect any type of data',
    description: 'Sync product data, billing data, and everything in between, for a real-time single source of truth for your business.',
    linkLabel:   'Explore data',
    linkHref:    '/platform/data',
    patternId:   'bento-dot-c',
    isLast:      false,
  },
  {
    title:       'Powerful reporting',
    description: "Create real-time, detailed reports that scale with your data. Visualize, customize, and get deep insights in seconds — not hours.",
    linkLabel:   'Explore reporting',
    linkHref:    '/platform/reporting',
    patternId:   'bento-dot-d',
    isLast:      true,
  },
]
