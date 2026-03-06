/**
 * Shared types for ImageGridSection.
 * Define page-specific arrays inline or in separate data files.
 *
 * Images → /public/assets/images/[page]/[slug].webp  (1476×720 or similar 2:1 ratio)
 */

export interface ImageGridItem {
  imageSrc: string
  imageWidth: number
  imageHeight: number
  imageAlt?: string
  title: string
  description: string
}

