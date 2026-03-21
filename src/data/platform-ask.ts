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

// ASK_TABS moved to ask-tabs.ts — re-exported here for back-compat.
export { ASK_TABS } from '@/data/ask-tabs'

// ─── Universal Context ─────────────────────────────────────────────────────────

// CONTEXT_FEATURES moved to ask-context.ts — re-exported here for back-compat.
export { CONTEXT_FEATURES } from '@/data/ask-context'
