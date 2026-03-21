import type { NumberedGridItem, FeatureGridQuote } from '@/components/sections/FeatureGridSection'

// ─── FeatureGridSection — "Ask Attio" — /platform/ai ─────────────────────────

export const AI_GRID_HEADING    = 'Ask Attio.'
export const AI_GRID_SUBHEADING = 'Search, update, and create with AI.'

export const AI_GRID_ITEMS: NumberedGridItem[] = [
  {
    kind:        'numbered',
    number:      '[01]',
    image:       '/assets/images/platform/ai/ask-attio/every-day-ready.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Start every day ready.',
    description: 'Walk into every meeting prepared, know which deals need attention, and make every minute of your day count.',
  },
  {
    kind:        'numbered',
    number:      '[02]',
    image:       '/assets/images/platform/ai/ask-attio/end-calls-with-action.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'End calls with action.',
    description: 'Draft follow-ups, update records, schedule next steps, create account briefs. Instantly, not eventually.',
  },
  {
    kind:        'numbered',
    number:      '[03]',
    image:       '/assets/images/platform/ai/ask-attio/context-on-demand.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Context on demand. hola',
    description: 'Company structure, tech stack, product details, past conversations. One question replaces endless searching.',
  },
  {
    kind:        'numbered',
    number:      '[04]',
    image:       '/assets/images/platform/ai/ask-attio/customer-insights.webp',
    imageWidth:  800,
    imageHeight: 480,
    title:       'Customer insights, collected.',
    description: 'Surface pain points, requested features, emerging patterns. From thousands of interactions, in seconds.',
  },
]

export const AI_GRID_QUOTE: FeatureGridQuote = {
  text:   'Ask Attio enables us to answer important questions, fast, about key areas like our win rates, pipeline health, and state of play.',
  author: 'Eric Weiss',
  role:   'GTM · Plain',
}
