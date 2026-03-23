import type { BentoItem } from '@/data/bento-grid'

// ─── BentoGridSection — "Make every email relevant." ──────────────────────────
// ─── /platform/workflows ──────────────────────────────────────────────────────

export const EMAIL_HEADING_PRIMARY = 'Make every email\n'
export const EMAIL_HEADING_MUTED   = 'relevant.'
export const EMAIL_SUBTEXT         =
  'Use your business, customer and product data to craft emails that resonate with your prospects.'

export const AUTOMATION_WITH_AI: BentoItem[] = [
  {
    columns:    4,
    title:      'Classify any data.',
    description: 'Produce actionable insights from any data you can use to reference, summarize and extract key findings.',
    imageSrc:    '/assets/images/platform/workflows/automations/classify-any-data.webp',
    imageWidth:  1472,
    imageHeight: 1008,
  },
  {
    columns:        6,
    title:          'Generate in-depth summaries.',
    description:    'Transform complex customer data streams into insightful analysis and use them in any GTM process workflow.',
    imageSrc:       '/assets/images/platform/workflows/automations/in-depth-summaries.webp',
    imageWidth:     2416,
    imageHeight:    1008,
    imageSrcMobile: '/assets/images/platform/workflows/automations/in-depth-summaries-mobile.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
  {
    columns:        10,
    layout:         'inline',
    title:          'Research at scale.',
    description:    "Use Attio's research agent to automate tasks that require human judgment, like prospecting and lead qualification.",
    imageSrc:       '/assets/images/platform/workflows/automations/research-at-scale.webp',
    imageWidth:     2416,
    imageHeight:    1008,
    imageSrcMobile: '/assets/images/platform/workflows/automations/research-at-scale-mobile.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
]
