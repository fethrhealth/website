import type { AccordionItem } from '@/data/rewards'

// ─── AccordionImageSection — "Keep your leads in the loop." ───────────────────
// ─── /platform/workflows ──────────────────────────────────────────────────────

export const LEADS_HEADING_PRIMARY = 'Keep your leads\n'
export const LEADS_HEADING_MUTED   = 'in the loop.'
export const LEADS_SUBHEADING      =
  'No more manual work. Automate and personalize your emails and follow-ups to close more deals.'

export const LEAD_UPDATES: AccordionItem[] = [
  {
    title:       'Capture high-intent leads.',
    description: 'Engage your leads from the start by setting up personalized nurture and onboarding flows, right inside Attio.',
    imageSrc:    '/assets/images/platform/workflows/leads-in-the-loop/high-intent-leads.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Harness the power of workflows.',
    description: 'Plugged directly into your GTM engine, sequences works seamlessly with workflows to automate your lead routing and more.',
    imageSrc:    '/assets/images/platform/workflows/leads-in-the-loop/power-of-workflows.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Multiple senders, single sequence.',
    description: 'Create, manage, and update a single email sequence with your team in real time. Assign your onboarding specialists or deal owners as email senders effortlessly.',
    imageSrc:    '/assets/images/platform/workflows/leads-in-the-loop/single-sequence.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
]
