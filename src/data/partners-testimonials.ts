/**
 * partners-testimonials.ts — Testimonios de la sección /partners
 *
 * Edita PARTNERS_TESTIMONIALS para cambiar o agregar testimonios.
 * Cada testimonio tiene: nombre, cargo, empresa, avatar, logo text, quote y features.
 */

import type { Testimonial } from '@/data/home-testimonials'

export const PARTNERS_TESTIMONIALS: Testimonial[] = [
  {
    id:        'expert-partner',
    name:      'Giacomo Caranese',
    title:     'Co-founder',
    company:   'Giacomo',
    avatarSrc: '/assets/images/testimonials/giacomo.webp',
    logoText:  'Expert Partners',
    quote:     '"Fethr connects me with teams that value speed, structure, and scale. Building flexible, high-impact systems on such a powerful product is a pleasure."',
    features:  [{ label: 'Email & calendar sync' }, { label: 'API' }, { label: 'Mobile app' }],
  },
  {
    id:        'creator-partner',
    name:      'Daniel Hull',
    title:     'Founder, 80x',
    company:   'Daniel',
    avatarSrc: '/assets/images/testimonials/daniel.webp',
    logoText:  'Creator Partners',
    quote:     '"The Fethr creator program is a wellspring of new connections, genuine inspiration, and next-gen GTM insight I haven\'t found elsewhere."',
    features:  [{ label: 'Workflows' }, { label: 'Integrations' }, { label: 'Communication intelligence' }],
  },
  {
    id:        'app-partner',
    name:      'Riya Grover',
    title:     'Co-founder & CEO, Sequience',
    company:   'Riya',
    avatarSrc: '/assets/images/testimonials/riya.webp',
    logoText:  'APP PARTNERS',
    quote:     '"Fethr\'s developer experience is a breath of fresh air. The team is outstanding to work with - we\'re thrilled for Sequence to be part of the Fethr App store."',
    features:  [{ label: 'Deals' }, { label: 'Workflows' }, { label: 'Notes' }],
  },
]
