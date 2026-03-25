/**
 * Edit this file to add, remove, or modify navbar items.
 * No need to touch any other file.
 *
 * ─── Entry Types ─────────────────────────────────────────────────────────────
 *
 *  { type: 'link', label: '...', href: '...' }
 *    → Simple link in the navbar, no dropdown.
 *
 *  { type: 'dropdown', label: '...', sections: [...] }
 *    → Button that opens a dropdown with one or more grouped sections.
 *
 * ─── Available Icons ─────────────────────────────────────────────────────────
 *
 *  'ask' | 'ai' | 'data' | 'productivity' | 'workflows' |
 *  'sequences' | 'reporting' | 'developers' | 'blog' | 'startup' | 'partners'
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type NavIcon =
  | 'ask'
  | 'ai'
  | 'data'
  | 'productivity'
  | 'workflows'
  | 'sequences'
  | 'reporting'
  | 'developers'
  | 'blog'
  | 'startup'
  | 'partners'

export interface NavLinkItem {
  title: string
  href: string
  description: string
  icon: NavIcon
}

export interface NavSection {
  heading: string
  items: NavLinkItem[]
}

export type NavEntry =
  | { type: 'link';     label: string; href: string }
  | { type: 'dropdown'; label: string; sections: NavSection[] }

// ─── Menu data ────────────────────────────────────────────────────────────────

export const NAV_MENU: NavEntry[] = [
  {
    type: 'dropdown',
    label: 'Platform',
    sections: [
      {
        heading: 'Platform',
        items: [
          { title: 'Ask Fethr',    href: '/platform/ask',          description: 'Get instant answers from your data',        icon: 'ask'          },
          { title: 'AI',           href: '/platform/ai',           description: 'AI-native features built for your team',    icon: 'ai'           },
          { title: 'Data model',   href: '/platform/data',         description: 'Flexible, real-time data infrastructure',   icon: 'data'         },
          { title: 'Productivity', href: '/platform/productivity', description: 'Stay focused on what matters most',         icon: 'productivity' },
        ],
      },
      {
        heading: 'Automations',
        items: [
          { title: 'Workflows',  href: '/platform/workflows', description: 'Automate your most critical processes', icon: 'workflows'  },
          { title: 'Sequences',  href: '/platform/sequences', description: 'Run personalized outreach at scale',    icon: 'sequences'  },
        ],
      },
      {
        heading: 'Insights',
        items: [
          { title: 'Reporting',          href: '/platform/reporting',   description: 'Track performance with live dashboards', icon: 'reporting'   },
          { title: 'Developer Platform', href: '/platform/developers',  description: 'Build with powerful APIs and webhooks',  icon: 'developers'  },
        ],
      },
    ],
  },

  {
    type: 'dropdown',
    label: 'Resources',
    sections: [
      {
        heading: 'Company',
        items: [
          { title: 'Blog',             href: '/blog',     description: 'Insights on healthcare CRM strategy', icon: 'blog'     },
          { title: 'Startup Program',  href: '/startups', description: 'Get Fethr free for up to 3 years',    icon: 'startup'  },
          { title: 'Become a Partner', href: '/partners', description: 'Join our partner ecosystem',          icon: 'partners' },
        ],
      },
    ],
  },
  
  // ── Simple link (no dropdown) — uncomment to add ──────────────────
  // { type: 'link', label: 'Blog', href: '/blog' },
]
