/**
 * reporting-engine.ts — Datos de la sección BentoGrid de /platform/reporting
 *
 * Edita REPORTING_ENGINE_SECTION para cambiar el heading y el subtexto.
 * Edita REPORTING_ENGINE para cambiar las cards (título, descripción, imagen).
 *
 * ─── Columnas ────────────────────────────────────────────────────────────────
 *  Las columnas de cada fila deben sumar 10 (ej. 4+6, 6+4, 10…).
 */

import type { BentoItem } from '@/data/bento-grid'

// ─── Section heading ──────────────────────────────────────────────────────────

export const REPORTING_ENGINE_SECTION = {
  headingMuted:   'The reporting engine',
  headingPrimary: ' for \ngo-to-market teams.',
  subtext:        'Access, visualize and explore all your data as quickly as you can think.',
}

// ─── Bento items ──────────────────────────────────────────────────────────────

export const REPORTING_ENGINE: BentoItem[] = [
  {
    columns:     4,
    title:       'Drill down to the metrics that matter.',
    description: 'Analyze live data any way you like, from line charts and bar graphs to geospatial mapping.',
    imageSrc:    '/assets/images/platform/reporting/reporting-engine/metrics-that-matter.webp',
    imageWidth:  1472,
    imageHeight: 1008,
  },
  {
    columns:          6,
    title:            'Customize reports with unprecedented flexibility.',
    description:      "Fethr's powerful engine allows you to find whichever insights you're looking for.",
    imageSrc:         '/assets/images/platform/reporting/reporting-engine/customize-reports.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/reporting/reporting-engine/customize-reports-mobile.webp',
    imageMobileWidth: 1472,
    imageMobileHeight:1008,
  },
  {
    columns:          6,
    title:            'Build powerful dashboards.',
    description:      'Combine visualizations to instantly understand the full story and make better business decisions.',
    imageSrc:         '/assets/images/platform/reporting/reporting-engine/build-powerful-dashboards.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/reporting/reporting-engine/build-powerful-dashboards-mobile.webp',
    imageMobileWidth: 1472,
    imageMobileHeight:1008,
  },
  {
    columns:     4,
    title:       'Collaborate on the fly.',
    description: 'Work with your teammates to build the dashboards and reports you need in true real-time.',
    imageSrc:    '/assets/images/platform/reporting/reporting-engine/collaborate-on-the-fly.webp',
    imageWidth:  1472,
    imageHeight: 1008,
  },
]
