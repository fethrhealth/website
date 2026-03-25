/**
 * Accordion items for the rewards / tier sections on the Refer page.
 *
 * Each item has its own image — shown when the item is open.
 * Images → /public/assets/images/rewards/[tier]-[slug].webp
 *
 * Usage:
 *   <AccordionImageSection items={TIER_1_REWARDS} ... />
 */

export interface AccordionItem {
  title: string
  description: string
  /** Image shown in the right panel when this item is active */
  imageSrc: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
}

// ---------------------------------------------------------------------------
// Add an array for each tier / section used on the page.
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
