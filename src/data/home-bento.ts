/**
 * home-bento.ts
 * All hardcoded text strings and item data for HomeBentoSection.
 * Edit this file to update copy, labels, or row data without touching the component.
 */

// ─── Section header ───────────────────────────────────────────────────────────

export const BENTO_SECTION_NUMBER  = '[01]'
export const BENTO_SECTION_LABEL   = 'Powerful platform'
export const BENTO_SECTION_COUNTER = '/ item 1 ⋮ 3'

// ─── Main heading ─────────────────────────────────────────────────────────────
// \u00a0 = non-breaking space (preserves the &nbsp; entities from the original JSX)

export const BENTO_HEADING    = 'Automate\u00a0at\u00a0full\u00a0throttle.\u00a0'
export const BENTO_SUBHEADING = 'Execute your integration strategy with speed. Design powerful workflows, deploy AI, integrate your data and build detailed reports — all in one platform.'

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
    description: 'AI that builds your interfaces, catches issues before they escalate, and keeps your integrations running around the clock. Deploy pre-built agents or create your own — purpose-built for healthcare automation.',
    linkLabel:   'Explore AI',
    linkHref:    '/platform/ask',
    patternId:   'bento-dot-b',
    isLast:      false,
  },
  {
    title:       'Connect any type of data',
    description: "It doesn\u2019t matter where your data lives or what format it\u2019s in. Fethr connects to any data source, normalizes everything and routes it exactly where it needs to go.",
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
