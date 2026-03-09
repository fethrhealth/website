import { EnrichmentItem } from "@/components/sections/EnrichmentSection";
import { FeatureGridQuote, IconGridItem, NumberedGridItem } from "@/components/sections/FeatureGridSection";
import { ScrollAccordionItem } from "@/components/sections/ScrollAccordionSection";

export const ASK_ATTIO_ITEMS: NumberedGridItem[] = [
    {
      kind: 'numbered',
      number: '[01]',
      image: '/assets/images/platform/ai/ask-attio/every-day-ready.webp',
      imageWidth: 800,
      imageHeight: 480,
      title: 'Start every day ready.',
      description: 'Walk into every meeting prepared, know which deals need attention, and make every minute of your day count.',
    },
    {
      kind: 'numbered',
      number: '[02]',
      image: '/assets/images/platform/ai/ask-attio/end-calls-with-action.webp',
      imageWidth: 800,
      imageHeight: 480,
      title: 'End calls with action.',
      description: 'Draft follow-ups, update records, schedule next steps, create account briefs. Instantly, not eventually.',
    },
    {
      kind: 'numbered',
      number: '[03]',
      image: '/assets/images/platform/ai/ask-attio/context-on-demand.webp',
      imageWidth: 800,
      imageHeight: 480,
      title: 'Context on demand.',
      description: 'Company structure, tech stack, product details, past conversations. One question replaces endless searching.',
    },
    {
      kind: 'numbered',
      number: '[04]',
      image: '/assets/images/platform/ai/ask-attio/customer-insights.webp',
      imageWidth: 800,
      imageHeight: 480,
      title: 'Customer insights, collected.',
      description: 'Surface pain points, requested features, emerging patterns. From thousands of interactions, in seconds.',
    },
  ]

  export const ASK_ATTIO_QUOTE: FeatureGridQuote = {
    text: 'Ask Attio enables us to answer important questions, fast, about key areas like our win rates, pipeline health, and state of play.',
    author: 'Eric Weiss',
    role: 'GTM · Plain',
  }

// ─── Scroll accordion (data sources) ──────────────────────────────────────────

export const AUTONOMOUS_WORK: ScrollAccordionItem[] = [
    {
      title: 'Add AI to any workflow.',
      description: 'Classify records, summarize data, generate text, complete custom prompts. Intelligence as simple workflow steps.',
      image: '/assets/images/platform/ai/autonomous-work/ai-workflow.webp',
      imageWidth: 2264,
      imageHeight: 2080,
    },
    {
      title: 'Automate web research.',
      description: 'Determine ICP fit, find decision-makers, track funding events, spot churn risks. Research runs in your workflows.',
      image: '/assets/images/platform/ai/autonomous-work/automate-web-research.webp',
      imageWidth: 2264,
      imageHeight: 2080,
    },
    {
      title: 'Design your own.',
      description: 'Set conditions, define behaviors, choose actions. Create agents that handle your unique GTM workflows.',
      image: '/assets/images/platform/ai/autonomous-work/design-your-own.webp',
      imageWidth: 2264,
      imageHeight: 2080,
    },
  ]

export const SMARTER_CALLS: EnrichmentItem[] = [
    {
      id: 'enr1',
      image: '/assets/images/platform/ai/smarter-calls/conversation-noted.webp',
      imageWidth: 1472,
      imageHeight: 1008,
      title: 'Every conversation, noted and filed.',
      description: 'AI records, transcribes, and logs every call as you speak.',
    },
    {
      id: 'enr2',
      image: '/assets/images/platform/ai/smarter-calls/signal-spotted.webp',
      imageWidth: 1820,
      imageHeight: 1820,
      title: 'Customer signals spotted for you.',
      description: 'AI picks up buying signals, blockers, or requests during the call, not days later.',
    },
    {
      id: 'enr3',
      image: '/assets/images/platform/ai/smarter-calls/leave-call.webp',
      imageWidth: 2000,
      imageHeight: 2000,
      title: 'Leave every call with a plan.',
      description: 'Track action items and draft next steps before you leave the call.',
    },
  ]

export const ITEMS: IconGridItem[] = [
    {
      kind: 'icon',
      icon: '/assets/images/platform/ai/mcp/customer.webp',
      title: 'Customer context.',
      description: 'Bring insights from your live CRM data into chats with Claude or ChatGPT.',
    },
    {
      kind: 'icon',
      icon: '/assets/images/platform/ai/mcp/tools.webp',
      title: 'Tools for agents.',
      description: 'Enable agent-driven workflows with full read and write access.',
    },
    {
      kind: 'icon',
      icon: '/assets/images/platform/ai/mcp/security.webp',
      title: 'Secure by design.',
      description: 'Authenticate via OAuth with user-scoped permissions.',
    },
  ]