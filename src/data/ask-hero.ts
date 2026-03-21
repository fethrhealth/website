// ─── Ask page — Hero section copy ────────────────────────────────────────────

export const ASK_HERO_HEADING          = 'Ask Fethr.'
export const ASK_HERO_SUBHEADING       = 'Search, update, and create with AI.'
export const ASK_HERO_CTA_TAGLINE      = 'Engineered for performance. Unified by design. Powered by Universal Context.'
export const ASK_HERO_CTA_PRIMARY      = 'Start for free'
export const ASK_HERO_CTA_PRIMARY_HREF = '/plataform/ask'

// ─── Illustration — shared assets ─────────────────────────────────────────────

export const ASK_HERO_AVATAR_1          = '/assets/icons/ask/hero/avatar-1.jpg'
export const ASK_HERO_AVATAR_2          = '/assets/icons/ask/hero/avatar-2.jpg'
export const ASK_HERO_AVATAR_3          = '/assets/icons/ask/hero/avatar-3.jpg'
export const ASK_HERO_INPUT_PLACEHOLDER = 'Ask anything...'

// ─── Illustration — demo queries (the three looping animations) ───────────────

export interface AskHeroDemoQuery {
  /** Text typed into the input bar */
  text:         string
  /** Badge label while the AI is searching — e.g. "Searching calls" */
  badge:        string
  /** Badge label once results are found — e.g. "Searched calls: 1 result" */
  badgeDone:    string
  /** Text typed out above the inner result card */
  responseText: string
  /** Suggestion chip shown at the bottom of the result panel */
  suggestion:   string
}

export const ASK_HERO_QUERIES: AskHeroDemoQuery[] = [
  {
    text:         'Recap feature requests',
    badge:        'Searching calls',
    badgeDone:    'Searched calls: 1 result',
    responseText: 'There were three feature requests mentioned in your latest customer feedback call with Acme Health:',
    suggestion:   'Draft summary of feature requests to share with product',
  },
  {
    text:         'Prepare me for my day',
    badge:        'Thinking',
    badgeDone:    'Thought for 3s',
    responseText: "Here's your daily brief for Thursday, March 13:",
    suggestion:   'Set a reminder for my Acme Health QBR at 11:30 AM',
  },
  {
    text:         'Draft a follow-up email',
    badge:        'Searching records',
    badgeDone:    'Searched records: 4 results',
    responseText: "Based on your latest call with Richard, I've summarized the main points and drafted a follow-up email:",
    suggestion:   'Send this draft to sarah@acmehealth.com',
  },
]

// ─── Illustration — result card 1: Recap feature requests ────────────────────

export const ASK_HERO_CARD1_TITLE    = 'Customer feedback'
export const ASK_HERO_CARD1_PLAY_ALL = 'Play all'

/** Each row in the feature-requests result card */
export const ASK_HERO_FEATURE_ROW_1 = { label: 'EHR integration',    barLeft: 40,  barWidth: '25%', avatarSrcs: [ASK_HERO_AVATAR_1, ASK_HERO_AVATAR_2] }
export const ASK_HERO_FEATURE_ROW_2 = { label: 'Mobile companion',   barLeft: 140, barWidth: '25%', avatarSrcs: [ASK_HERO_AVATAR_1, ASK_HERO_AVATAR_2, ASK_HERO_AVATAR_3] }
export const ASK_HERO_FEATURE_ROW_3 = { label: 'Billing automation', barLeft: 230, barWidth: '30%', avatarSrcs: [ASK_HERO_AVATAR_3] }

// ─── Illustration — result card 2: Daily brief ───────────────────────────────

export const ASK_HERO_BRIEF_GREETING       = 'Good morning, Alex!'
export const ASK_HERO_BRIEF_MEETINGS_LABEL = 'Upcoming meetings:'
export const ASK_HERO_BRIEF_TASKS_LABEL    = 'Suggested follow-up tasks:'

export const ASK_HERO_BRIEF_MEETING = {
  title:    'Greenleaf Onboarding',
  dateTime: 'Dec 12, 10:40 – 11:40 AM',
  duration: '22 min',
  status:   'Starts in 6 mins',
  cta:      'Join meeting',
}

export const ASK_HERO_BRIEF_TASK_1 = {
  text:          "Proposal Review: Send proposal\nto Sarah Johnson",
  avatar1:       ASK_HERO_AVATAR_1,
  avatar2:       ASK_HERO_AVATAR_3,
  assignee:      'You',
  assigneeExtra: '+3',
  contact:       'Sarah Johnson',
  due:           'Today',
}

export const ASK_HERO_BRIEF_TASK_2 = {
  text:          "Contract Signed: Follow up\nwith Greenleaf team",
  avatar1:       ASK_HERO_AVATAR_2,
  avatar2:       ASK_HERO_AVATAR_3,
  assignee:      'You',
  assigneeExtra: '+1',
  contact:       'Greenleaf Team',
  due:           'Tomorrow',
}

// ─── Illustration — result card 3: Email draft ───────────────────────────────

export const ASK_HERO_EMAIL = {
  label:    'Draft email',
  subject:  'RE: Follow-Up on Initial Discussion',
  preview:  'Hi everyone, thanks for the productive check-in...',
  overflow: '2',
}
