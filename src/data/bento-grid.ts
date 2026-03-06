/**
 * Data types for BentoGridSection.
 *
 * The bento grid uses a 10-column layout on desktop.
 * Column spans per row must add up to 10 (e.g. 4+6, 6+4, 10, etc.).
 *
 * Images → /public/assets/images/[page]/[slug].webp
 * Items with a mobile variant need two image files.
 */

export interface BentoItem {
  /** Columns to span in the 10-col desktop grid (must sum to 10 per row) */
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /** Rows to span — default 1 */
  rows?: 1 | 2 | 3
  title: string
  description: string
  /** Desktop image (always shown unless imageSrcMobile is provided, then lg+ only) */
  imageSrc: string
  imageWidth: number
  imageHeight: number
  imageAlt?: string
  /** Optional mobile-only image (shown below lg, hidden at lg+) */
  imageSrcMobile?: string
  imageMobileWidth?: number
  imageMobileHeight?: number
  /**
   * 'stacked' (default) → text on top, image below (flex-col)
   * 'inline'            → text left, image right side-by-side on desktop (lg:flex-row)
   */
  layout?: 'stacked' | 'inline'
}

export interface BentoGridContent {
  /**
   * 'centered' (default) → heading + subtext centered, max-w-xl
   * 'split'              → heading left (cols 1-5), subtext right (cols 7-11)
   */
  headerLayout?: 'centered' | 'split'
  /** Gray prefix of the heading, e.g. "The reporting engine" */
  headingMuted?: string
  /** Dark part of the heading, e.g. " for go-to-market teams." */
  headingPrimary?: string
  /** Render headingMuted before headingPrimary (default: true) */
  headingMutedFirst?: boolean
  /** Insert a <br> between the two heading parts (default: false) */
  headingLineBreak?: boolean
  subtext?: string
  items: BentoItem[]
}
