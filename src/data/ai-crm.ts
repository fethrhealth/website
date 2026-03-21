import type { IconGridItem } from '@/components/sections/FeatureGridSection'

// ─── FeatureGridSection — "CRM, meet MCP" — /platform/ai ─────────────────────

export const AI_CRM_HEADING    = 'CRM, meet MCP.'
export const AI_CRM_SUBHEADING = 'Connect to Attio in AI tools and get work done anywhere, anytime.'

export const AI_CRM_ITEMS: IconGridItem[] = [
  {
    kind:        'icon',
    icon:        '/assets/images/platform/ai/mcp/customer.webp',
    title:       'Customer context.',
    description: 'Bring insights from your live CRM data into chats with Claude or ChatGPT.',
  },
  {
    kind:        'icon',
    icon:        '/assets/images/platform/ai/mcp/tools.webp',
    title:       'Tools for agents.',
    description: 'Enable agent-driven workflows with full read and write access.',
  },
  {
    kind:        'icon',
    icon:        '/assets/images/platform/ai/mcp/security.webp',
    title:       'Secure by design.',
    description: 'Authenticate via OAuth with user-scoped permissions.',
  },
]
