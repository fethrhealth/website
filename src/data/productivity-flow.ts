import type { AccordionItem } from '@/data/rewards'

// ─── AccordionImageSection — "Stay in the flow" — /platform/productivity ───────

export const FLOW_HEADING_PRIMARY = 'Stay in the'
export const FLOW_HEADING_MUTED   = ' flow'
export const FLOW_SUBHEADING      =
  "Attio's browser extension allows you to prospect, have context and keep your CRM up-to-date at all times."

export const STAY_IN_THE_FLOW: AccordionItem[] = [
  {
    title:       'Bring in data from everywhere.',
    description: 'Add leads from X, Google Meets, and more with just a single click.',
    imageSrc:    '/assets/images/platform/productivity/flow/bring-data.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Run workflows anywhere on the web.',
    description: 'Run your automations on leads from anywhere on the web.',
    imageSrc:    '/assets/images/platform/productivity/flow/run-workflows.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Understand context for every lead and prospect.',
    description: 'See all the relevant data about your customer as you interact with them.',
    imageSrc:    '/assets/images/platform/productivity/flow/understand-context.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
]
