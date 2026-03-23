import type { ScrollAccordionItem } from '@/components/sections/ScrollAccordionSection'

// ─── ScrollAccordionSection — "Handwritten warmth." ───────────────────────────
// ─── /platform/sequences ──────────────────────────────────────────────────────

export const HANDWRITTEN_HEADING    = 'Handwritten warmth.'
export const HANDWRITTEN_SUBHEADING = 'Every touch feels 1-to-1, even when juggling 100 accounts.'

export const HANDWRITTEN_WARMTH_ITEMS: ScrollAccordionItem[] = [
  {
    title:       'Customer details, auto-filled.',
    description: 'Drop in first names, renewal dates, or any field so each contact gets what\u2019s most relevant.',
    image:       '/assets/images/platform/sequences/handwritten-warmth/customer-details.webp',
    imageWidth:  2264,
    imageHeight: 2080,
  },
  {
    title:       'AI assist.',
    description: 'Need a hand? AI riffs the perfect phrase for every message.',
    image:       '/assets/images/platform/sequences/handwritten-warmth/ai-assist.webp',
    imageWidth:  2264,
    imageHeight: 2080,
  },
  {
    title:       'Live accuracy.',
    description: 'Field updates flow straight into drafts, keeping the important details like numbers and dates spot-on.',
    image:       '/assets/images/platform/sequences/handwritten-warmth/live-accuracy.webp',
    imageWidth:  2264,
    imageHeight: 2080,
  },
]
