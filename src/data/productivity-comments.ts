import type { BentoItem } from '@/data/bento-grid'

// ─── BentoGridSection — "Collaborate with comments." — /platform/productivity ──

export const COMMENTS_HEADING_PRIMARY = ' Collaborate with \n'
export const COMMENTS_HEADING_MUTED   = 'comments.'
export const COMMENTS_SUBTEXT         =
  'Access, visualize and explore all your data as quickly as you can think.'

export const COLLABORATE_WITH_COMMENTS: BentoItem[] = [
  {
    columns:          6,
    title:            'Add comments anywhere.',
    description:      "Make sure your teammates always have the right context for any workflow they're collaborating on.",
    imageSrc:         '/assets/images/platform/productivity/add-comments.webp',
    imageSrcMobile:   '/assets/images/platform/productivity/add-comments-mobile.webp',
    imageWidth:       1472,
    imageHeight:      1008,
  },
  {
    columns:          4,
    title:            'Thread commenting.',
    description:      'Have better discussions by creating intuitive threads around single comments.',
    imageSrc:         '/assets/images/platform/productivity/thread-commenting.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/thread-commenting-mobile.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
  {
    columns:          10,
    layout:           'inline',
    title:            'Comment history.',
    description:      'Combine visualizations to instantly understand the full story and make better business decisions.',
    imageSrc:         '/assets/images/platform/productivity/comment-history.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/comment-history-mobile.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
]
