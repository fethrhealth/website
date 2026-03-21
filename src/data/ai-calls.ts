import type { EnrichmentItem } from '@/components/sections/EnrichmentSection'

// ─── EnrichmentSection — "Smarter calls" — /platform/ai ──────────────────────

export const AI_CALLS_HEADING    = 'Smarter calls, from kickoff to close.'
export const AI_CALLS_SUBHEADING = 'Every conversation captured, summarized, and synced to your CRM — instantly.'

export const AI_CALLS_ITEMS: EnrichmentItem[] = [
  {
    id:          'enr1',
    image:       '/assets/images/platform/ai/smarter-calls/conversation-noted.webp',
    imageWidth:  1472,
    imageHeight: 1008,
    title:       'Every conversation, noted and filed.',
    description: 'AI records, transcribes, and logs every call as you speak.',
  },
  {
    id:          'enr2',
    image:       '/assets/images/platform/ai/smarter-calls/signal-spotted.webp',
    imageWidth:  1820,
    imageHeight: 1820,
    title:       'Customer signals spotted for you.',
    description: 'AI picks up buying signals, blockers, or requests during the call, not days later.',
  },
  {
    id:          'enr3',
    image:       '/assets/images/platform/ai/smarter-calls/leave-call.webp',
    imageWidth:  2000,
    imageHeight: 2000,
    title:       'Leave every call with a plan.',
    description: 'Track action items and draft next steps before you leave the call.',
  },
]
