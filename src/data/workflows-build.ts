import type { ImageGridItem } from '@/data/image-grid'

// ─── ImageGridSection — "Build faster to go further." ─────────────────────────
// ─── /platform/workflows ──────────────────────────────────────────────────────

export const BUILD_HEADING_MUTED   = 'Build'
export const BUILD_HEADING_PRIMARY = ' faster to go further.'
export const BUILD_SUBTEXT         =
  'Get up and running instantly with customizable, out-of-the-box templates.'
export const BUILD_CTA_LABEL       = 'See templates library'
export const BUILD_CTA_HREF        = '/platform/workflows'

export const WORKFLOW_EXAMPLES: ImageGridItem[] = [
  {
    imageSrc:    '/assets/images/platform/workflows/pass-deals.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Pass deals to Customer Success workflow',
    title:       'Pass deals to Customer Success',
    description: 'Seamlessly pass all won deals to your Customer Success team for activation.',
  },
  {
    imageSrc:    '/assets/images/platform/workflows/closed-won-notification.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Closed-won deal notification workflow',
    title:       'Closed-won deal notification',
    description: 'Notify and celebrate your won deals instantly with your team across your workspace.',
  },
  {
    imageSrc:    '/assets/images/platform/workflows/closed-won-message.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Closed won deal Slack message workflow',
    title:       'Closed won deal Slack message',
    description: 'Instantly send an automated Slack message to your team when a deal is won.',
  },
  {
    imageSrc:    '/assets/images/platform/workflows/won-and-lost.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Won and lost deal summary workflow',
    title:       'Won and lost deal summary',
    description: "Use AI to outline your won or lost deal and provide insights on what did or didn't work.",
  },
  {
    imageSrc:    '/assets/images/platform/workflows/customer-renewal.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Customer renewal date autofill workflow',
    title:       'Customer renewal date autofill',
    description: 'Fill in customer renewal dates automatically to keep your customer success efforts on track.',
  },
  {
    imageSrc:    '/assets/images/platform/workflows/stay-on-stop.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Stay on top of workflows',
    title:       'Stay on top of customer churn',
    description: 'Never forget to reach out to customers who have just churned with automated reminders.',
  },
]
