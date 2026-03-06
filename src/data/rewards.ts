/**
 * Accordion items for the rewards / tier sections on the Refer page.
 *
 * Cada item tiene su propia imagen — se muestra cuando el item está abierto.
 * Imágenes → /public/assets/images/rewards/[tier]-[slug].webp
 *
 * Uso:
 *   <AccordionImageSection items={TIER_1_REWARDS} ... />
 */

export interface AccordionItem {
  title: string
  description: string
  /** Imagen que se muestra en el panel derecho cuando este item está activo */
  imageSrc: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
}

// ---------------------------------------------------------------------------
// Agrega un array por cada tier / sección que uses en la página.
// ---------------------------------------------------------------------------

export const TIER_1_REWARDS: AccordionItem[] = [
  {
    title: 'Exclusive Fethr merch',
    description: 'Premium Fethr-branded gear hand-picked for top referrers.',
    imageSrc: '/assets/images/rewards/tier-1-merch.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Kinto coffee bundle',
    description: 'A curated set of Kinto drinkware and coffee accessories.',
    imageSrc: '/assets/images/rewards/tier-1-kinto.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Sonos audio bundle',
    description: 'For the audiophiles out there — two Sonos Era 100 speakers.',
    imageSrc: '/assets/images/rewards/tier-1-sonos.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Apple Studio Display',
    description: 'A stunning 27-inch Retina 5K display for your workspace.',
    imageSrc: '/assets/images/rewards/tier-1-apple.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]

export const TIER_2_REWARDS: AccordionItem[] = [
  {
    title: 'Exclusive Fethr merch',
    description: 'Premium Fethr-branded gear hand-picked for top referrers.',
    imageSrc: '/assets/images/rewards/tier-2-merch.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Kinto coffee bundle',
    description: 'A curated set of Kinto drinkware and coffee accessories.',
    imageSrc: '/assets/images/rewards/tier-2-kinto.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Sonos audio bundle',
    description: 'For the audiophiles out there — two Sonos Era 100 speakers.',
    imageSrc: '/assets/images/rewards/tier-2-sonos.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Apple Studio Display',
    description: 'A stunning 27-inch Retina 5K display for your workspace.',
    imageSrc: '/assets/images/rewards/tier-2-apple.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]

export const TIER_3_REWARDS: AccordionItem[] = [
  {
    title: 'Exclusive Fethr merch',
    description: 'Premium Fethr-branded gear hand-picked for top referrers.',
    imageSrc: '/assets/images/rewards/tier-3-merch.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Kinto coffee bundle',
    description: 'A curated set of Kinto drinkware and coffee accessories.',
    imageSrc: '/assets/images/rewards/tier-3-kinto.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Sonos audio bundle',
    description: 'For the audiophiles out there — two Sonos Era 100 speakers.',
    imageSrc: '/assets/images/rewards/tier-3-sonos.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Apple Studio Display',
    description: 'A stunning 27-inch Retina 5K display for your workspace.',
    imageSrc: '/assets/images/rewards/tier-3-apple.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]
