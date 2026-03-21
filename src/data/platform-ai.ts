import { EnrichmentItem } from "@/components/sections/EnrichmentSection";
import { IconGridItem } from "@/components/sections/FeatureGridSection";

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