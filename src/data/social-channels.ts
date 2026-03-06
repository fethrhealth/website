/**
 * Social / channel cards for the "Keep up to date" section.
 *
 * Uso:
 *   <KeepUpToDateSection channels={DEFAULT_SOCIAL_CHANNELS} />
 *
 * Los iconos disponibles son: 'linkedin' | 'x' | 'blog' | 'changelog'
 */

export type ChannelIcon = 'linkedin' | 'x' | 'blog' | 'changelog'

export interface SocialChannel {
  label: string
  description: string
  href: string
  /** true → abre en nueva pestaña con rel="noopener noreferrer" */
  external?: boolean
  icon: ChannelIcon
}

// ---------------------------------------------------------------------------
// EDIT THIS ARRAY ↓ — agrega o quita canales libremente, tambien puedes crear nuevos SocialChannel[]=
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
