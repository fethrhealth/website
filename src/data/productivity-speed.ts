import type { AccordionItem } from '@/data/rewards'
import type { FeatureCardItem } from '@/data/feature-cards'

// ─── AccordionImageSection + FeatureCardsSection — "The need for speed" ────────
// ─── /platform/productivity ───────────────────────────────────────────────────

// ── Section header ─────────────────────────────────────────────────────────────

export const SPEED_HEADING_PRIMARY = ' for speed'
export const SPEED_HEADING_MUTED   = 'The need'
export const SPEED_SUBHEADING      =
  "Search through records, notes, and tasks and take actions at the speed of lightning with Attio's command palette."

// ── Accordion items ────────────────────────────────────────────────────────────

export const NEED_FOR_SPEED: AccordionItem[] = [
  {
    title:       'Blazingly fast.',
    description: 'Comb through all your records in milliseconds and see results in real-time.',
    imageSrc:    '/assets/images/platform/productivity/need-for-speed/blazingly-fast.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Perform quick actions.',
    description: 'Create records, notes, and tasks, add items to lists, and draft emails with intuitive keyboard shortcuts.',
    imageSrc:    '/assets/images/platform/productivity/need-for-speed/perform-quick-actions.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Search with natural language.',
    description: "Find exactly what you're looking for using semantic language that just makes sense.",
    imageSrc:    '/assets/images/platform/productivity/need-for-speed/search-with-natural-language.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
]

// ── Feature cards (shown below the accordion) ──────────────────────────────────

export const NEED_FOR_SPEED_FEATURES: FeatureCardItem[] = [
  {
    iconSrc:     '/assets/icons/productivity/need-for-speed/user.webp',
    label:       'Preview contacts',
    description: 'Quickly get an overview of contacts directly from the command palette.',
  },
  {
    iconSrc:     '/assets/icons/productivity/need-for-speed/connection.webp',
    label:       'Find connection strengths',
    description: 'Understand the strength of each and every connection at a glance.',
  },
  {
    iconSrc:     '/assets/icons/productivity/need-for-speed/file-ai.webp',
    label:       'See event information',
    description: 'Pre-populated info for each important event you have coming up.',
  },
]
