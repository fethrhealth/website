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

// PROMPT_CARDS moved to ask-library.ts — re-exported here for back-compat.
export { PROMPT_CARDS } from '@/data/ask-library'

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
