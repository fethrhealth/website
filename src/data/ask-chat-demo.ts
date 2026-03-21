// ─── AskChatDemoSection — data ─────────────────────────────────────────────────
// Edit this file to change any visible text in the AskChatDemoSection,
// ChatDemoPanel, and the three intelligence-built card visuals.

// ─── Section shell ────────────────────────────────────────────────────────────

export const ASK_CHAT_DEMO_HEADING =
  'Intelligence built for how you work and what you do.'

/** icon, title, body for each of the three feature cards (no visual — that stays in the component). */
export const ASK_CHAT_DEMO_CARDS = [
  {
    icon:  '/assets/icons/ask/intelligence-built/real-information.webp',
    title: 'Real information, not AI invention.',
    body:  'Every answer is sourced from your actual CRM records and customer knowledge.',
  },
  {
    icon:  '/assets/icons/ask/intelligence-built/your-permissions.webp',
    title: 'Your permissions, enforced.',
    body:  "Ask Fethr follows your existing permissions, so everyone sees only what they're supposed to.",
  },
  {
    icon:  '/assets/icons/ask/intelligence-built/intelligent-suggestions.webp',
    title: 'Intelligent suggestions. Human decisions.',
    body:  "You're always in command and empowered to approve, modify, or reject any suggestion.",
  },
] as const

// ─── Chat panel — navigation labels ──────────────────────────────────────────

export const ASK_CHAT_DEMO_NAV = {
  home:      'Home',
  newThread: 'New',
  auto:      'Auto',
} as const

// ─── Chat panel — home screen ─────────────────────────────────────────────────

export const ASK_CHAT_DEMO_GREETING    = 'Good morning, Alex'
export const ASK_CHAT_DEMO_PLACEHOLDER = 'Ask anything...'

/** Two suggestion chips shown on the home screen. */
export const ASK_CHAT_DEMO_CHIPS = [
  'Prep for next meeting',
  'Recap last call',
] as const

/** Meetings section — header label + date badge. */
export const ASK_CHAT_DEMO_MEETINGS_LABEL = 'Meetings'

export const ASK_CHAT_DEMO_MEETINGS = {
  date: 'Today, Mar 13',

  /** Two completed (struck-through) meetings. */
  past1: { title: 'Basepoint x Stripe', time: '10:00 - 11:00 AM', color: '#F5A300' },
  past2: { title: 'Ashley & Martin',    time: '10:20 - 10:40 AM', color: '#CDCED2' },

  /** The active/highlighted meeting with its full detail panel. */
  active: {
    title: 'Greenleaf // Basepoint',
    time:  '2:30 - 3:00 PM',
    color: '#00D17E',

    detailsLabel:       'Details',
    description:        'Demo call with Greenleaf team to help them get the most out of their PRO trial.',
    link:               'https://meet.google.com/psn-zfzb-yaw',
    participantsLabel:  'Participants',
    participantsCount:  '8',

    participants: [
      { src: '/avatars/ask/ask-tab-success/avatar-1.avif', name: 'Dylan Parker', role: 'CEO of Basepoint'             },
      { src: '/avatars/ask/ask-tab-success/avatar-2.avif', name: 'Annie Zhang',  role: 'Product Manager at Greenleaf' },
    ],
  },
} as const

// ─── Chat panel — AI conversation ────────────────────────────────────────────

/** The animated query typed into the input bar. */
export const ASK_CHAT_DEMO_QUERY = 'How do I win my deal with Greenleaf?'

/** Meeting-note card that appears inline in the AI response. */
export const ASK_CHAT_DEMO_INTRO_CARD = {
  title:          'Greenleaf Intro',
  date:           'Dec 12, 10:40 \u2013 11:32 AM',
  notes:          '3',
  attachments:    '2',
  files:          '2',
  recordedLabel:  'Recorded',
  duration:       ' 48m',
  avatars: [
    '/avatars/ask/ask-tab-success/avatar-1.avif',
    '/avatars/ask/ask-tab-success/avatar-2.avif',
  ],
} as const

/** Text segment: t = text content, b = bold. Used in the AI response blocks below. */
export type Seg = { t: string; b?: true }

/** Block 1 — opening line + section headings. */
export const ASK_CHAT_DEMO_B1: Seg[][] = [
  [{ t: "Based on your recent activity and the upcoming meeting, here\u2019s a focused strategy to help you close the deal." }],
  [{ t: "Strategy to win Greenleaf", b: true }],
  [{ t: "Deal context:", b: true }],
]

/** Block 3 — key opportunity signals (typed after the intro card). */
export const ASK_CHAT_DEMO_B3: Seg[][] = [
  [{ t: "Key opportunity signals:", b: true }],
  [{ t: "1.\u00a0" }, { t: "Large startup deal",     b: true }, { t: " \u2014 $120K ACV \u2014 top 10% of your pipeline" }],
  [{ t: "2.\u00a0" }, { t: "Active migration intent", b: true }, { t: " \u2014 Moving from Salesforce, researching CRMs now" }],
  [{ t: "3.\u00a0" }, { t: "Strong ICP fit",          b: true }, { t: " \u2014 Series B, 80-person sales team" }],
  [{ t: "4.\u00a0" }, { t: "Recent engagement",       b: true }, { t: " \u2014 Annie Zhang opened your deck 3x in 48h" }],
]

/** Block 4 — critical next steps. */
export const ASK_CHAT_DEMO_B4: Seg[][] = [
  [{ t: "Critical next steps:", b: true }],
  [{ t: "1.\u00a0" }, { t: "Lead with Greenleaf-specific ROI", b: true }],
  [{ t: "    a.\u00a0Reference their current Salesforce pain points" }],
  [{ t: "    b.\u00a0Quantify migration savings" }],
  [{ t: "    c.\u00a0Show similar startup success metrics" }],
  [{ t: "2.\u00a0" }, { t: "Address timeline urgency", b: true }, { t: " \u2014 propose 2-week pilot to align with their Q1 planning" }],
  [{ t: "3.\u00a0" }, { t: "Mobilize your champion",  b: true }, { t: " \u2014 Dylan has final budget authority; get 1:1 time before the group call" }],
]

/** Block 5 — closing question. */
export const ASK_CHAT_DEMO_B5: Seg[][] = [
  [{ t: "Would you like me to prepare an agenda with talking points for today\u2019s call?" }],
]

// ─── Card visual — "Real information" rows ────────────────────────────────────

export const ASK_CHAT_DEMO_REAL_INFO_ROWS = [
  { src: '/assets/icons/ask/intelligence-built/cursor.avif',          alt: 'Cursor',          name: 'Cursor',          status: 'Waiting for feedback on proposal', shape: 'rounded-sm'   },
  { src: '/assets/icons/ask/intelligence-built/mailchimp.avif',       alt: 'Mailchimp',       name: 'Mailchimp',       status: 'Awaiting reply on pricing offer',  shape: 'rounded-sm'   },
  { src: '/assets/icons/ask/intelligence-built/pablo-hernandez.avif', alt: 'Pablo Hernandez', name: 'Pablo Hernandez', status: 'No response for 2 weeks',          shape: 'rounded-full' },
  { src: '/assets/icons/ask/intelligence-built/dropbox.avif',         alt: 'Dropbox',         name: 'Dropbox',         status: 'Monthly report not submitted',     shape: 'rounded-sm'   },
] as const

// ─── Card visual — "Intelligent suggestions" ──────────────────────────────────

export const ASK_CHAT_DEMO_SUGGESTIONS = {
  acceptLabel: 'Accept',

  drew: {
    src:   '/assets/icons/ask/intelligence-built/drew-houston.avif',
    alt:   'Drew Houston',
    name:  'Drew Houston',
    card1Label: 'Update Role',
    card1Value: 'Head of IT',
  },

  greenleaf: {
    src:   '/assets/icons/ask/intelligence-built/greenleaf.avif',
    alt:   'Greenleaf',
    name:  'Greenleaf',
    card1Label: 'Funding raised',
    card1Badge: '$100M - $250M',
    card2Label: 'Update Next step',
    card2Value: 'Schedule a demo',
  },
} as const
