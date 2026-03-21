import type { ContextFeature } from '@/components/sections/HomeContextSection'

// ─── HomeContextSection — Ask AI page ─────────────────────────────────────────

export const ASK_CONTEXT_EYEBROW        = 'Powered by'
export const ASK_CONTEXT_HEADING        = 'Universal'
/** Word that follows the heading and receives the ™ superscript. */
export const ASK_CONTEXT_HEADING_SUFFIX = 'Context'
export const ASK_CONTEXT_TRADEMARK      = true

/**
 * Five feature cards for the Universal Context block on the Ask AI page.
 * Icons go in: /public/assets/icons/ask/universal-context/
 */
export const ASK_CONTEXT_FEATURES: [
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

// CONTEXT_FEATURES kept for back-compat with platform-ask.ts re-export
export { ASK_CONTEXT_FEATURES as CONTEXT_FEATURES }
