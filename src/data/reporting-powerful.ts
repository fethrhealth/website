/**
 * reporting-powerful.ts — Datos de la sección AccordionImage de /platform/reporting
 *
 * Edita REPORTING_POWERFUL_SECTION para cambiar el heading y el subheading.
 * Edita REPORTING_DATA_EXPLORATION para cambiar los items del accordion
 * (título, descripción, imagen).
 */

import type { AccordionItem } from '@/data/rewards'

// ─── Section heading ──────────────────────────────────────────────────────────

export const REPORTING_POWERFUL_SECTION = {
  headerLayout:   'centered' as const,
  headingPrimary: 'Powerful',
  headingMuted:   ' data exploration',
  subheading:     'No matter how large the data set, Fethr makes it easy to deep dive into the details.',
}

// ─── Accordion items ──────────────────────────────────────────────────────────

export const REPORTING_DATA_EXPLORATION: AccordionItem[] = [
  {
    title:       'Group your way.',
    description: 'Understand even the most complex data by categorizing, condensing, and manipulating data points in milliseconds.',
    imageSrc:    '/assets/images/platform/reporting/data-exploration/group-your-way.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Set better targets.',
    description: 'Visualize results, gauge performance and drive sharper decision-making by setting data-driven goals.',
    imageSrc:    '/assets/images/platform/reporting/data-exploration/set-better-targets.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Historical data.',
    description: 'Identify trends and patterns over time and set smarter benchmarks for the future.',
    imageSrc:    '/assets/images/platform/reporting/data-exploration/historical-data.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Drill down into your report data.',
    description: 'Explore the data points behind your reports, down to the most minute level.',
    imageSrc:    '/assets/images/platform/reporting/data-exploration/your-report-data.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
]
