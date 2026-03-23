import type { ImageGridItem } from '@/data/image-grid'
import { AccordionItem } from './rewards'




export const LEAD_UPDATES: AccordionItem[] = [
  {
    title: 'Capture high-intent leads.',
    description: 'Engage your leads from the start by setting up personalized nurture and onboarding flows, right inside Attio.',
    imageSrc: '/assets/images/platform/workflows/leads-in-the-loop/high-intent-leads.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Harness the power of workflows.',
    description: 'Plugged directly into your GTM engine, sequences works seamlessly with workflows to automate your lead routing and more.',
    imageSrc: '/assets/images/platform/workflows/leads-in-the-loop/power-of-workflows.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Multiple senders, single sequence.',
    description: 'Create, manage, and update a single email sequence with your team in real time. Assign your onboarding specialists or deal owners as email senders effortlessly.',
    imageSrc: '/assets/images/platform/workflows/leads-in-the-loop/single-sequence.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]

export const WORKFLOW_EXAMPLES: ImageGridItem[] = [
  {
    imageSrc: '/assets/images/platform/workflows/pass-deals.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Pass deals to Customer Success workflow',
    title: 'Pass deals to Customer Success',
    description:
      'Seamlessly pass all won deals to your Customer Success team for activation.',
  },
  {
    imageSrc: '/assets/images/platform/workflows/closed-won-notification.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Closed-won deal notification workflow',
    title: 'Closed-won deal notification',
    description:
      'Notify and celebrate your won deals instantly with your team across your workspace.',
  },
  {
    imageSrc: '/assets/images/platform/workflows/closed-won-message.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Closed won deal Slack message workflow',
    title: 'Closed won deal Slack message',
    description:
      'Instantly send an automated Slack message to your team when a deal is won.',
  },
  {
    imageSrc: '/assets/images/platform/workflows/won-and-lost.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Won and lost deal summary workflow',
    title: 'Won and lost deal summary',
    description:
      'Use AI to outline your won or lost deal and provide insights on what did or didn\'t work.',
  },
  {
    imageSrc: '/assets/images/platform/workflows/customer-renewal.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Customer renewal date autofill workflow',
    title: 'Customer renewal date autofill',
    description:
      'Fill in customer renewal dates automatically to keep your customer success efforts on track.',
  },
  {
    imageSrc: '/assets/images/platform/workflows/stay-on-stop.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Stay on top of workflows',
    title: 'Stay on top of customer churn',
    description:
      'Never forget to reach out to customers who have just churned with automated reminders.',
  },
]
