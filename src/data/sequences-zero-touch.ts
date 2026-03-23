// ─── ZeroTouchSection — /platform/sequences ───────────────────────────────────

// ── Section header ─────────────────────────────────────────────────────────────

export const ZERO_TOUCH_HEADING    = 'Zero-touch follow-ups.'
export const ZERO_TOUCH_SUBHEADING = 'Fethr keeps patients moving forward while your team focuses on care.'

// ── Panel cards ────────────────────────────────────────────────────────────────
// Three feature cards shown in the animated grid.
// Animation visuals are structural — only titles and descriptions are editable.

export interface ZeroTouchPanel {
  title:       string
  description: string
}

export const ZERO_TOUCH_PANELS: ZeroTouchPanel[] = [
  {
    title:       'Signal based enrollment.',
    description: 'Pick the cues—appointment booked, form filled, intake submitted—to enroll the patient.',
  },
  {
    title:       'One sequence, any sender.',
    description: 'Set up a single email sequence and auto-assign the right care provider.',
  },
  {
    title:       'Automate scheduled sending.',
    description: 'Skip the manual syncs. Reclaim hours every week for what matters most.',
  },
]

// ── Panel 1 — enrollment card texts ───────────────────────────────────────────

/** Bold status label on the green-dot enrollment card. */
export const ZERO_TOUCH_ENROLLED_LABEL  = 'Enrolled in onboarding'
/** Secondary detail line below the enrollment label. */
export const ZERO_TOUCH_ENROLLED_DETAIL = '3 emails · 7-day cadence'

// ── Panel 2 — provider badges ──────────────────────────────────────────────────
// Floating cursor badges that orbit the center card.
// `angle` controls position on the outer circle (degrees from top, clockwise) —
// change it only if you want to reposition a badge on the ring.

export interface ProviderBadge {
  label: string
  team:  string
  color: string
  /** Degrees from top, clockwise — controls badge position on the outer ring. */
  angle: number
}

export const PROVIDER_BADGES: ProviderBadge[] = [
  { label: 'John',  team: 'Support', color: '#0DA669', angle: 30  },
  { label: 'Ethan', team: 'Product', color: '#F97316', angle: 120 },
  { label: 'Roza',  team: 'Sales',   color: '#9162F9', angle: 250 },
]

// ── Panel 3 — contact list ─────────────────────────────────────────────────────
// Infinite-scrolling list of contacts shown in the third panel.
// The list is duplicated automatically for the seamless scroll loop.

export interface ZeroTouchContact {
  name:        string
  avatar:      string
  enrolledAgo: string
  nextEmail:   string
}

export const ZERO_TOUCH_CONTACTS: ZeroTouchContact[] = [
  { name: 'Bridget Moore',  avatar: '/assets/images/platform/sequences/zero-touch/bridget.avif', enrolledAgo: '3 days ago',  nextEmail: '2 days' },
  { name: 'Cody Fisher',    avatar: '/assets/images/platform/sequences/zero-touch/cody.avif',    enrolledAgo: '2 days ago',  nextEmail: '3 days' },
  { name: 'Esther Howard',  avatar: '/assets/images/platform/sequences/zero-touch/esther.avif',  enrolledAgo: 'yesterday',   nextEmail: '1 day'  },
  { name: 'Jessica Miles',  avatar: '/assets/images/platform/sequences/zero-touch/jessica.avif', enrolledAgo: '6 hours ago', nextEmail: '2 days' },
  { name: 'Steve Martin',   avatar: '/assets/images/platform/sequences/zero-touch/steve.avif',   enrolledAgo: '1 hour ago',  nextEmail: '2 days' },
]
