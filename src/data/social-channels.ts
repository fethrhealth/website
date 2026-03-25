/**
 * Social / channel cards for the "Keep up to date" section.
 *
 * Usage:
 *   <KeepUpToDateSection channels={DEFAULT_SOCIAL_CHANNELS} />
 *
 * Available icons: 'linkedin' | 'x' | 'blog' | 'changelog'
 */

export type ChannelIcon = 'linkedin' | 'x' | 'blog' | 'changelog'

export interface SocialChannel {
  label: string
  description: string
  href: string
  /** true → opens in a new tab with rel="noopener noreferrer" */
  external?: boolean
  icon: ChannelIcon
}

// ---------------------------------------------------------------------------
// EDIT THIS ARRAY ↓ — add or remove channels freely, you can also create new SocialChannel[] arrays
// ---------------------------------------------------------------------------
export const DEFAULT_SOCIAL_CHANNELS: SocialChannel[] = [
  {
    label: 'LinkedIn',
    description: 'Keep up to date with what the team is building.',
    href: 'https://linkedin.com/company/fethr-health',
    external: true,
    icon: 'linkedin',
  },
  {
    label: 'X',
    description: "Stay in the loop with what we're working on.",
    href: 'https://x.com/fethrhealth',
    external: true,
    icon: 'x',
  },
  {
    label: 'Blog',
    description: 'Be the first to get new Fethr updates.',
    href: '/blog',
    icon: 'blog',
  },
  {
    label: 'Changelog',
    description: "See everything that's new in every Fethr release.",
    href: '#',
    icon: 'changelog',
  },
]
