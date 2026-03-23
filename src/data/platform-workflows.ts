import type { ImageGridItem } from '@/data/image-grid'
import { AccordionItem } from './rewards'
import { BentoItem } from './bento-grid'
import { FeatureCardItem } from './feature-cards'
import type { IntegrationCard } from '@/data/integration-cards'



export const BETTER_SYSTEM_FEATURES: FeatureCardItem[] = [
  {
    iconSrc: '/assets/icons/workflows/dashboard.webp',
    label: 'Triggers',
    description:
      'Trigger actions inside Attio or from any external input.',
  },
  {
    iconSrc: '/assets/icons/workflows/arrow.webp',
    label: 'Actions',
    description:
      'Get precise by customizing every actionable step of your process.',
  },
  {
    iconSrc: '/assets/icons/workflows/thunder.webp',
    label: 'Artificial intelligence',
    description:
      'Use AI to even automate tasks that require unstructured data.',
  },
]

export const WORKFLOW_INTEGRATIONS: IntegrationCard[] = [
  {
    iconSrc: '/assets/icons/workflows/integrate-automation/outreach.webp',
    name: 'Outreach',
    description: 'Auto-add contacts to email sequences and trigger CRM actions via contact interactions.',
  },
  {
    iconSrc: '/assets/icons/workflows/integrate-automation/typeform.webp',
    name: 'Typeform',
    description: 'Use Typeform submission data to trigger automations right inside of Attio.',
  },
  {
    iconSrc: '/assets/icons/workflows/integrate-automation/slack.webp',
    name: 'Slack',
    description: 'CRM automations in Slack. Share context, assign tasks and make decisions in real-time.',
  },
  {
    iconSrc: '/assets/icons/workflows/integrate-automation/mailchimp.webp',
    name: 'Mailchimp',
    description: 'Auto-add contacts to email sequences and trigger CRM actions via contact interactions.',
  },
  {
    iconSrc: '/assets/icons/workflows/integrate-automation/mixmax.webp',
    name: 'Mixmax',
    description: 'Use Typeform submission data to trigger automations right inside of Attio.',
  },
  {
    iconSrc: '/assets/icons/workflows/integrate-automation/webhooks.webp',
    name: 'Webhooks',
    description: 'CRM automations in Slack. Share context, assign tasks and make decisions in real-time.',
  },
]

export const AUTOMATION_WITH_AI: BentoItem[] = [
  {
    columns: 4,
    title: 'Classify any data.',
    description: 'Produce actionable insights from any data you can use to reference, summarize and extract key findings.',
    imageSrc: '/assets/images/platform/workflows/automations/classify-any-data.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
  {
    columns: 6,
    title: 'Generate in-depth summaries.',
    description: "Transform complex customer data streams into insightful analysis and use them in any GTM process workflow.",
    imageSrc: '/assets/images/platform/workflows/automations/in-depth-summaries.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/workflows/automations/in-depth-summaries-mobile.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 10,
    layout: 'inline',
    title: 'Research at scale.',
    description: "Use Attio’s research agent to automate tasks that require human judgment, like prospecting and lead qualification.",
    imageSrc: '/assets/images/platform/workflows/automations/research-at-scale.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/workflows/automations/research-at-scale-mobile.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
]

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
