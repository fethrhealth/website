import type { BentoItem } from '@/data/bento-grid'
import type { FeatureCardItem } from '@/data/feature-cards'

// ─── BentoGridSection + FeatureCardsSection — "Make every email relevant." ────
// ─── /platform/productivity ───────────────────────────────────────────────────

// ── Section header ─────────────────────────────────────────────────────────────

export const EMAIL_RELEVANT_HEADING_PRIMARY = 'Make every email\n'
export const EMAIL_RELEVANT_HEADING_MUTED   = 'relevant.'
export const EMAIL_RELEVANT_SUBTEXT         =
  'Use your business, customer and product data to craft emails that resonate with your prospects.'

// ── Bento grid items ───────────────────────────────────────────────────────────

export const BENTO_EMAIL_RELEVANT: BentoItem[] = [
  {
    columns:     4,
    title:       'Automated, personalized outreach.',
    description: 'Pull attributes and enriched data with variables and make your email feel personal, even at scale.',
    imageSrc:    '/assets/images/platform/productivity/email-relevant/automated.webp',
    imageWidth:  1472,
    imageHeight: 1008,
  },
  {
    columns:          6,
    title:            'Email templates.',
    description:      'Streamline outreach for your entire team with custom templates built for any situation.',
    imageSrc:         '/assets/images/platform/productivity/email-relevant/email-templates.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/email-relevant/email-templates-mobile.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
  {
    columns:          10,
    layout:           'inline',
    title:            'Send emails at scale.',
    description:      'Send personalized emails to everyone all at once, without missing a beat.',
    imageSrc:         '/assets/images/platform/productivity/email-relevant/emails-at-scale.webp',
    imageWidth:       2416,
    imageHeight:      1008,
    imageSrcMobile:   '/assets/images/platform/productivity/email-relevant/emails-at-scale-mobile.webp',
    imageMobileWidth:  1472,
    imageMobileHeight: 1008,
  },
]

// ── Feature cards (shown below the bento grid) ─────────────────────────────────

export const EMAIL_RELEVANT: FeatureCardItem[] = [
  {
    iconSrc:     '/assets/icons/productivity/email-relevant/rich-text.webp',
    label:       'Rich text formatting',
    description: 'Create emails as elegant as they are effective with painless formatting.',
  },
  {
    iconSrc:     '/assets/icons/productivity/email-relevant/clip.webp',
    label:       'Add attachments',
    description: 'Attach files to emails directly within Attio with just a single click.',
  },
  {
    iconSrc:     '/assets/icons/productivity/email-relevant/share.webp',
    label:       'Easily shared',
    description: 'Share entire email threads with your team, with just a link.',
  },
]
