import type { BentoItem } from '@/data/bento-grid'

// ─── BentoGridSection — "Your calls, made intelligent" — /platform/productivity ─

export const INTELLIGENT_CALLS_HEADING_PRIMARY = 'Your calls,\n'
export const INTELLIGENT_CALLS_HEADING_MUTED   = 'made intelligent.'
export const INTELLIGENT_CALLS_SUBTEXT         =
  'Focus on your conversations while AI surfaces insights in real-time.'

export const BENTO_INTELLIGENT_CALLS: BentoItem[] = [
  {
    columns:     4,
    title:       'Everything in one place.',
    description: 'Your customer calls live where they should — in your CRM, not scattered across tools.',
    imageSrc:    '/assets/images/platform/productivity/intelligent-calls/everything-in-one-place.webp',
    imageWidth:  1472,
    imageHeight: 1008,
  },
  {
    columns:          6,
    title:            'Personalize your insights.',
    description:      'From discovery calls to product feedback, build personalized templates to capture the insights you need, how you need it.',
    imageSrc:         '/assets/images/platform/productivity/intelligent-calls/personalize-your-insights.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/intelligent-calls/personalize-your-insights.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
  {
    columns:          10,
    layout:           'inline',
    title:            'Real-time intelligence during conversations.',
    description:      'Let AI surface insights during your calls while you focus on building the relationship.',
    imageSrc:         '/assets/images/platform/productivity/intelligent-calls/real-time-intelligence.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/intelligent-calls/real-time-intelligence.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
  {
    columns:          6,
    title:            'Review your way.',
    description:      'Jump to key moments, focus on specific speakers, and find what you need fast.',
    imageSrc:         '/assets/images/platform/productivity/intelligent-calls/review-your-way.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/intelligent-calls/review-your-way.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
  {
    columns:     4,
    title:       'Works where you do.',
    description: 'Your customer calls live where they should — in your CRM, not scattered across tools.',
    imageSrc:    '/assets/images/platform/productivity/intelligent-calls/works-where-you-do.webp',
    imageWidth:  1472,
    imageHeight: 1008,
  },
]
