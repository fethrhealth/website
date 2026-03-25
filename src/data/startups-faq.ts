/**
 * startups-faq.ts — Preguntas frecuentes de /startups
 *
 * Edita STARTUPS_FAQ para agregar, quitar o modificar preguntas.
 * El campo `answer` acepta texto plano o HTML simple (<strong>, <a>, <br>).
 * El `id` debe ser único — se usa como anchor en la URL.
 */

import type { FaqItem } from '@/data/faq'

export const STARTUPS_FAQ: FaqItem[] = [
  {
    id:       'startup-eligibility',
    question: 'Who is eligible for the Fethr startup program?',
    answer:
      'Early-stage healthcare startups with fewer than 50 employees and pre-Series B funding are eligible. We focus on companies building tools for clinicians, patients, or healthcare operations.',
  },
  {
    id:       'startup-apply',
    question: 'How do I apply to the startup program?',
    answer:
      'Fill out the short application on this page. Our team reviews applications within 2 business days and will reach out to schedule a quick intro call.',
  },
]
