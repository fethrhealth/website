import type { AccordionItem } from '@/data/rewards'

// ─── AccordionImageSection — "Same team. Same page." — /platform/productivity ──

export const SAME_TEAM_HEADING_PRIMARY  = ' Same page.'
export const SAME_TEAM_HEADING_MUTED    = 'Same team.'
export const SAME_TEAM_SUBHEADING       =
  "Attio's next-level notes allow you and your teammates to collaborate in real-time."

export const SAME_TEAM_SAME_PAGE: AccordionItem[] = [
  {
    title:       'Create templates.',
    description: 'Streamline everything from sales calls to customer check-ins and more with custom templates.',
    imageSrc:    '/assets/images/platform/productivity/same-team/create-templates.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Watch your teammates type.',
    description: 'Have a conversation, spitball and share ideas. All in the same note, all in real-time.',
    imageSrc:    '/assets/images/platform/productivity/same-team/teammates-type.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Link with your calendar.',
    description: 'Attach your notes to upcoming events to instantly provide context.',
    imageSrc:    '/assets/images/platform/productivity/same-team/calendar-link.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Collaborate anywhere you go.',
    description: 'Create, edit, and get all the context you need with mobile notes.',
    imageSrc:    '/assets/images/platform/productivity/same-team/collaborate-anywhere.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
]
