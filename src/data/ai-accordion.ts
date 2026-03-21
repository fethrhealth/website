import type { ScrollAccordionItem } from '@/components/sections/ScrollAccordionSection'

// ─── ScrollAccordionSection — "Autonomous work" — /platform/ai ───────────────

export const AI_ACCORDION_HEADING    = 'Autonomous work in action.'
export const AI_ACCORDION_SUBHEADING = 'Automate research, enrich records, run custom workflows.'

export const AI_ACCORDION_ITEMS: ScrollAccordionItem[] = [
  {
    title:       'Add AI to any workflow.',
    description: 'Classify records, summarize data, generate text, complete custom prompts. Intelligence as simple workflow steps.',
    image:       '/assets/images/platform/ai/autonomous-work/ai-workflow.webp',
    imageWidth:  2264,
    imageHeight: 2080,
  },
  {
    title:       'Automate web research.',
    description: 'Determine ICP fit, find decision-makers, track funding events, spot churn risks. Research runs in your workflows.',
    image:       '/assets/images/platform/ai/autonomous-work/automate-web-research.webp',
    imageWidth:  2264,
    imageHeight: 2080,
  },
  {
    title:       'Design your own.',
    description: 'Set conditions, define behaviors, choose actions. Create agents that handle your unique GTM workflows.',
    image:       '/assets/images/platform/ai/autonomous-work/design-your-own.webp',
    imageWidth:  2264,
    imageHeight: 2080,
  },
]
