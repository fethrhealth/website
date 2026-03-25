/**
 * partners-updates.ts — Datos de la sección "Keep up to date" en /partners
 *
 * Edita PARTNERS_UPDATES para cambiar el heading, subheading y canales.
 * Los iconos disponibles son: 'linkedin' | 'x' | 'blog' | 'changelog'
 */

import { type SocialChannel } from '@/data/social-channels'

export const PARTNERS_UPDATES: {
  heading: string
  subheading: string
  channels: SocialChannel[]
} = {
  heading:    'Keep up to date.',
  subheading: "Get the latest updates on what we're building.",
  channels: [
    {
      label:       'LinkedIn',
      description: 'Keep up to date with what the team is building.',
      href:        'https://linkedin.com/company/fethr-health',
      external:    true,
      icon:        'linkedin',
    },
    {
      label:       'X',
      description: "Stay in the loop with what we're working on.",
      href:        'https://x.com/fethrhealth',
      external:    true,
      icon:        'x',
    },
    {
      label:       'Blog',
      description: 'Be the first to get new Fethr updates.',
      href:        '/blog',
      icon:        'blog',
    },
    {
      label:       'Changelog',
      description: "See everything that's new in every Fethr release.",
      href:        '#',
      icon:        'changelog',
    },
  ],
}
