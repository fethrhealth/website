import type { PromptCard } from '@/data/platform-ask'

// ─── PromptLibrarySection — Ask AI page ───────────────────────────────────────

export const ASK_LIBRARY_HEADING    = 'From one expert to everyone.'
export const ASK_LIBRARY_SUBHEADING = 'Best practice becomes standard practice with the prompt library.'

/**
 * Cards shown in the two scrolling rows of the prompt library.
 * Icons go in:        /public/assets/icons/ask/prompt-library/
 * Author logos go in: /public/assets/icons/ask/prompt-library/sources/
 *
 * row1 = PROMPT_CARDS (left-to-right order)
 * row2 = [...PROMPT_CARDS].reverse() (right-to-left order) — set in the page
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
  },
]
