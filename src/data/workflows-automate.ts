import type { AccordionItem } from '@/data/rewards'

// ─── AccordionImageSection — "Automate your way to GTM success." ───────────────
// ─── /platform/workflows ──────────────────────────────────────────────────────

export const AUTOMATE_HEADING_PRIMARY = 'Automate your way to\n'
export const AUTOMATE_HEADING_MUTED   = 'GTM success.'
export const AUTOMATE_SUBHEADING      =
  'No matter your GTM motion or strategy, Attio is the perfect way to drive it forward.'

export const AUTOMATE_YOUR_WAY: AccordionItem[] = [
  {
    title:       'Product-led growth.',
    description: 'Get full context on users across your whole organization by automatically combining product and CRM data.',
    imageSrc:    '/assets/images/platform/workflows/automate-your-way/product-led-growth.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Product-led sales.',
    description: 'Engage PQLs, nurture leads, and upsell to your existing users thanks to in-depth product data.',
    imageSrc:    '/assets/images/platform/workflows/automate-your-way/product-led-sales.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'Sales-led growth.',
    description: 'Automate your CRM to perfectly run your sales team processes, freeing your reps to close high-value deals.',
    imageSrc:    '/assets/images/platform/workflows/automate-your-way/sales-led-growth.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
  {
    title:       'RevOps.',
    description: 'Fine-tune your RevOps efforts and extract more MRR from every automation you build.',
    imageSrc:    '/assets/images/platform/workflows/automate-your-way/revops.webp',
    imageWidth:  2272,
    imageHeight: 1704,
  },
]
