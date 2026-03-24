/**
 * reporting-features.ts — Datos de la sección ImageGrid de /platform/reporting
 *
 * Edita REPORTING_EXAMPLES para cambiar las cards de ejemplo
 * (título, descripción, imagen).
 */

import type { ImageGridItem } from '@/data/image-grid'

export const REPORTING_EXAMPLES: ImageGridItem[] = [
  {
    imageSrc:    '/assets/images/platform/reporting/daily-workspace.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Daily workspace creations',
    title:       'Pass deals to Customer Success',
    description: 'Stay on track and keep a close eye on workspace creations.',
  },
  {
    imageSrc:    '/assets/images/platform/reporting/average-revenue.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Closed-won deal notification workflow',
    title:       'Average revenue per workspace',
    description: 'Understand the revenue each workspace is generating.',
  },
  {
    imageSrc:    '/assets/images/platform/reporting/number-of-users.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Closed won deal Slack message workflow',
    title:       'Number of users per workspace',
    description: 'See how many users are active in each workspace in real-time.',
  },
  {
    imageSrc:    '/assets/images/platform/reporting/monthly-recurring-revenue.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Won and lost deal summary workflow',
    title:       'Monthly recurring revenue',
    description: 'Get a closer look at your MRR to figure out where you can improve.',
  },
  {
    imageSrc:    '/assets/images/platform/reporting/customer-acquisition-cost.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Customer renewal date autofill workflow',
    title:       'Customer acquisition cost',
    description: 'Analyze your CAC figures and shave them down as much as possible.',
  },
  {
    imageSrc:    '/assets/images/platform/reporting/lead-channel-distribution.webp',
    imageWidth:  1920,
    imageHeight: 937,
    imageAlt:    'Stay on top of workflows',
    title:       'Lead channel distribution',
    description: 'Discover which of your lead channels are most effective and reliable.',
  },
]
