import type { IntegrationCard } from '@/data/integration-cards'

// ─── IntegrationCardsSection — "Integrate automations with your stack." ────────
// ─── /platform/workflows ──────────────────────────────────────────────────────

export const AUTOMATIONS_HEADING_MUTED   = 'Integrate '
export const AUTOMATIONS_HEADING_PRIMARY = 'automations with your stack.'
export const AUTOMATIONS_SUBTEXT         =
  'Connect the best tools in your stack with Workflows to orchestrate your GTM efforts.'

export const WORKFLOW_INTEGRATIONS: IntegrationCard[] = [
  {
    iconSrc:     '/assets/icons/workflows/integrate-automation/outreach.webp',
    name:        'Outreach',
    description: 'Auto-add contacts to email sequences and trigger CRM actions via contact interactions.',
  },
  {
    iconSrc:     '/assets/icons/workflows/integrate-automation/typeform.webp',
    name:        'Typeform',
    description: 'Use Typeform submission data to trigger automations right inside of Attio.',
  },
  {
    iconSrc:     '/assets/icons/workflows/integrate-automation/slack.webp',
    name:        'Slack',
    description: 'CRM automations in Slack. Share context, assign tasks and make decisions in real-time.',
  },
  {
    iconSrc:     '/assets/icons/workflows/integrate-automation/mailchimp.webp',
    name:        'Mailchimp',
    description: 'Auto-add contacts to email sequences and trigger CRM actions via contact interactions.',
  },
  {
    iconSrc:     '/assets/icons/workflows/integrate-automation/mixmax.webp',
    name:        'Mixmax',
    description: 'Use Typeform submission data to trigger automations right inside of Attio.',
  },
  {
    iconSrc:     '/assets/icons/workflows/integrate-automation/webhooks.webp',
    name:        'Webhooks',
    description: 'CRM automations in Slack. Share context, assign tasks and make decisions in real-time.',
  },
]
