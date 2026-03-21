import type { TabItem } from '@/data/platform-ask'

// ─── TabsSection heading ───────────────────────────────────────────────────────

export const ASK_TABS_HEADING = 'Simply powerful customer intelligence.'

// ─── Tab strip data ────────────────────────────────────────────────────────────

/**
 * Tabs for the TabsSection on the Ask AI page.
 * Moved here from platform-ask.ts; re-exported from there for back-compat.
 */
export const ASK_TABS: TabItem[] = [
  {
    label:       'Marketing',
    icon:        '/assets/icons/ask/tabs/meeting-prep.webp',
    heading:     'Turn every customer touchpoint into competitive advantage.',
    description: 'Analyze conversion, validate messaging, and gather content for campaigns.',
  },
  {
    label:       'Success',
    icon:        '/assets/icons/ask/tabs/patient-brief.webp',
    heading:     'Retain and expand more accounts when review is effortless.',
    description: 'Hand off accounts, check customer health, and run business reviews.',
  },
  {
    label:       'Sales',
    icon:        '/assets/icons/ask/tabs/care-gaps.webp',
    heading:     'Win faster when every call is perfectly prepped.',
    description: 'Prepare for meetings, update deals, and review pipeline.',
  },
  {
    label:       'Founders',
    icon:        '/assets/icons/ask/tabs/outreach.webp',
    heading:     'Build product and revenue wins with real customer insights.',
    description: 'Run customer discovery, track deals, and gather product feedback.',
  },
  {
    label:       'Venture Capital',
    icon:        '/assets/icons/ask/tabs/daily-brief.webp',
    heading:     'Turn portfolio intelligence into perfectly timed investment edge.',
    description: 'Research founders, leverage networks, and manage deal flow.',
  },
]

// ─── Per-visual copy ───────────────────────────────────────────────────────────

export const TAB_VISUAL_MARKETING = {
  bubble:          'any open requests with greenleaf?',
  responseText:    'Here are 2 open tasks to look into:',
  card1Title:      'Share 1-pager with the team',
  card1Due:        'Today',
  card2Title:      'Create case study with Sarah',
  card2Due:        'Tomorrow',
  suggestionLabel: 'Suggested action',
  suggestionText:  'Draft follow-up email to Greenleaf',
} as const

export const TAB_VISUAL_SUCCESS = {
  bubble:           'write a follow-up email',
  responseLine1:    'Your draft is ready.',
  responseLine2:    'Review and customise if needed:',
  draftLabel:       'Draft email',
  draftSubject:     'RE: Follow-Up on Initial Discussion',
  draftPreview:     'Hi everyone, thanks for the productive check-in...',
  avatarOverflow:   '+2',
  suggestionLabel:  'Suggested action',
  suggestionText:   'Send follow-up to Greenleaf team',
} as const

export const TAB_VISUAL_SALES = {
  bubble:         'update this deal pls',
  acceptLabel:    'Accept',
  // Deal record
  dealName:       'Basepoint // Greenleaf',
  card1Label:     'Update Deal Stage',
  card1Value:     'Negotiation',
  card2Label:     'Update Next Step',
  card2Value:     'Joshua to send documentation on\u2026',
  // Person record
  personName:     'Drew Houston',
  personAlt:      'Drew Houston',
  card3Label:     'Updated Role',
  card3Value:     'Head of IT',
  // Company record
  companyName:    'Greenleaf',
  companyAlt:     'Greenleaf',
  card4Label:     'Funding Raised',
  card4Value:     '$12.5M',
} as const

export const TAB_VISUAL_FOUNDERS = {
  bubble:          'tell me what users want most',
  responseText:    'Three features are often mentioned:',
  cardTitle:       'Customer feedback',
  playAll:         'Play all',
  feature1:        'Agents',
  feature2:        'Mobile app',
  feature3:        'Advanced reporting',
  suggestionLabel: 'Suggested action',
  suggestionText:  'Draft summary of feedback to share with product',
} as const

export const TAB_VISUAL_VC = {
  bubble:         'what do you know about the founders of Greenleaf?',
  searchedWeb:    'Searched web:',
  searchResults:  '6 results',
  favicon1Alt:    'X',
  favicon2Alt:    'Vox',
  favicon3Alt:    'CNET',
  faviconOverflow: '+3 more',
  faviconOverflowLabel: '3',
  para1:          "Here's what you should know:",
  para2:          "Greenleaf was founded by Alex Kowalski and Sarah Johnson, who met while working at Stripe. Alex was one of the early engineers who helped build Stripe's money movement platform, while Sarah led product and partnerships for startups.",
  para3:          "The two realized there was a gap in the market for developer-friendly sustainability tools, and launched Greenleaf to help companies track and reduce their carbon footprint at scale.",
} as const
