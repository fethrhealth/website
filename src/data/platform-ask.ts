import type { ContextFeature } from '@/components/sections/HomeContextSection'

// ─── Prompt Library ───────────────────────────────────────────────────────────

/**
 * A single card in the PromptLibrarySection scrolling rows.
 * Add / edit cards below; the component accepts two arrays (row1, row2).
 * Icons go in:       /public/assets/icons/ask/prompts/
 * Author logos go in: /public/assets/icons/ask/prompts/sources/
 */
export interface PromptCard {
  /** Small prompt/tool icon (20 × 20 px) */
  icon:       string
  /** Short card heading — the prompt template name */
  title:      string
  /** One-line description of what the prompt does */
  description: string
  /** Tiny author or source logo (16 × 16 px) */
  authorLogo: string
  /** Author or source label shown next to the logo */
  authorName: string
}

/**
 * Cards used in PromptLibrarySection.
 * Pass a slice to `row1` and another slice to `row2` in the page component,
 * or use all of them on both rows (they're duplicated inside the component
 * to fill the viewport width).
 */
export const PROMPT_CARDS: PromptCard[] = [
  {
    icon:        '/assets/icons/ask/prompt-library/meeting-prep.webp',
    title:       'Meeting prep',
    description: 'Get the full context on your next meeting so you can show up prepared.',
    authorLogo:  '/assets/icons/ask/prompt-library/attio.webp',
    authorName:  'Attio',
  },
  {
    icon:        '/assets/icons/ask/prompt-library/shipped-feature-outreach.webp',
    title:       'Shipped feature outreach',
    description: 'Find customers who requested a specific feature and draft individualize email to them.',
    authorLogo:  '/assets/icons/ask/prompt-library/attio.webp',
    authorName:  'Attio',
  },
  {
    icon:        '/assets/icons/ask/prompt-library/daily-brief.webp',
    title:       'Daily brief',
    description: 'Prepare for your day with a daily briefing of your meetings.',
    authorLogo:  '/assets/icons/ask/prompt-library/attio.webp',
    authorName:  'Attio',
  },
  {
    icon:        '/assets/icons/ask/prompt-library/product-feedback.webp',
    title:       'Product feedback',
    description: 'Extract product feedback from a call recording.',
    authorLogo:  '/assets/icons/ask/prompt-library/attio.webp',
    authorName:  'Attio',
  },
  {
    icon:        '/assets/icons/ask/prompt-library/objection-handling.webp',
    title:       'Objection handling',
    description: 'Prepare targeted responses to anticipated objections in your next call.',
    authorLogo:  '/assets/icons/ask/prompt-library/attio.webp',
    authorName:  'Attio',
  }
]

// ─── Tabs section ─────────────────────────────────────────────────────────────

/**
 * A single tab entry in TabsSection.
 * Icons go in: /public/assets/icons/ask/tabs/
 */
export interface TabItem {
  /** Short tab label — shown in the tab strip */
  label:       string
  /** Small icon (16 × 16 px) shown next to the label */
  icon:        string
  /** Content panel heading */
  heading:     string
  /** Content panel description paragraph */
  description: string
}

/**
 * Tabs for the TabsSection on the Ask AI page.
 * 5 healthcare-focused AI workflow tabs.
 */
export const ASK_TABS: TabItem[] = [
  {
    label:       'Marketing',
    icon:        '/assets/icons/ask/tabs/meeting-prep.webp',
    heading:     'Turn every customer touchpoint into competitive advantage.',
    description: 'Analyze conversion, validate messaging, and gather content for campaigns.',
  },
  {
    label:       'Success',
    icon:        '/assets/icons/ask/tabs/patient-brief.webp',
    heading:     'Retain and expand more accounts when review is effortless.',
    description: 'Hand off accounts, check customer health, and run business reviews.',
  },
  {
    label:       'Sales',
    icon:        '/assets/icons/ask/tabs/care-gaps.webp',
    heading:     'Win faster when every call is perfectly prepped.',
    description: 'Prepare for meetings, update deals, and review pipeline.',
  },
  {
    label:       'Founders',
    icon:        '/assets/icons/ask/tabs/outreach.webp',
    heading:     'Build product and revenue wins with real customer insights.',
    description: "Run customer discovery, track deals, and gather product feedback.",
  },
  {
    label:       'Venture Capital',
    icon:        '/assets/icons/ask/tabs/daily-brief.webp',
    heading:     'Turn portfolio intelligence into perfectly timed investment edge.',
    description: 'Research founders, leverage networks, and manage deal flow.',
  },
]

// ─── Universal Context ─────────────────────────────────────────────────────────

/**
 * Data for HomeContextSection — "Universal Context" block on the homepage.
 * 5 feature cards shown in a horizontal row (desktop) or stacked (mobile).
 *
 * Icons go in: /public/assets/icons/context/
 */
export const CONTEXT_FEATURES: [
  ContextFeature,
  ContextFeature,
  ContextFeature,
  ContextFeature,
  ContextFeature,
] = [
  {
    icon:   '/assets/icons/ask/universal-context/semantic-search.webp',
    title:  'Semantic search',
    accent: 'delivers instant retrieval even as your patient data scales.',
  },
  {
    icon:   '/assets/icons/ask/universal-context/grounded-in-your-context.webp',
    title:  'Grounded in patient context',
    accent: 'like call recordings, care notes, and product usage.',
  },
  {
    icon:   '/assets/icons/ask/universal-context/understand-patterns.webp',
    title:  'Understand patterns',
    accent: 'across patient signals, not just individual interactions.',
  },
  {
    icon:   '/assets/icons/ask/universal-context/granola-notes.webp',
    title:  'EHR notes. Slack threads.',
    accent: 'Your favorite tools, connected and searchable.',
  },
  {
    icon:   '/assets/icons/ask/universal-context/say-hello.webp',
    title:  'Say hello.',
    accent: 'Hola. Olá. Bonjour. Works in any language your patients speak.',
  },
]
