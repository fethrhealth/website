import type { BentoGridContent } from '@/data/bento-grid'
import type { FeatureCardItem } from '@/data/feature-cards'

// ─── BentoGridSection + FeatureCardsSection — "Create better systems." — /platform/workflows ───

export const BETTER_SYSTEMS_HEADING_PRIMARY = 'Create better '
export const BETTER_SYSTEMS_HEADING_MUTED   = 'systems.'
export const BETTER_SYSTEMS_SUBTEXT =
  "Fethr's powerful building blocks and intuitive visual canvas make it easier than ever to accelerate your healthcare GTM strategy."

export const BETTER_SYSTEM_FEATURES: FeatureCardItem[] = [
  {
    iconSrc:     '/assets/icons/workflows/dashboard.webp',
    label:       'Triggers',
    description: 'Trigger actions inside Fethr or from any external input.',
  },
  {
    iconSrc:     '/assets/icons/workflows/arrow.webp',
    label:       'Actions',
    description: 'Get precise by customizing every actionable step of your process.',
  },
  {
    iconSrc:     '/assets/icons/workflows/thunder.webp',
    label:       'Artificial intelligence',
    description: 'Use AI to even automate tasks that require unstructured data.',
  },
]

export const BETTER_SYSTEMS_BENTO: BentoGridContent = {
  headerLayout:     'centered',
  headingPrimary:   BETTER_SYSTEMS_HEADING_PRIMARY,
  headingMuted:     BETTER_SYSTEMS_HEADING_MUTED,
  headingMutedFirst: false,
  subtext:          BETTER_SYSTEMS_SUBTEXT,
  items: [
    {
      // 4 cols × 2 rows — tall card, single image (vertical screenshot)
      columns:     4,
      rows:        2,
      title:       'Create with our visual canvas.',
      description: "No matter how complex your processes are, Fethr's beautiful interface makes automating them a cinch.",
      imageSrc:    '/assets/images/platform/workflows/better-systems/create-with-visual-canvas.avif',
      imageWidth:  1472,
      imageHeight: 2560,
      imageAlt:    'Visual workflow canvas',
    },
    {
      // 3 cols × 1 row — separate mobile/desktop images
      columns:          3,
      title:            'Build with powerful blocks.',
      description:      'Turn ideas into real-life systems with precise, step-by-step control.',
      imageSrc:         '/assets/images/platform/workflows/better-systems/build-w-powerful-blocks.avif',
      imageWidth:       1000,
      imageHeight:      1008,
      imageAlt:         'Workflow building blocks',
      imageSrcMobile:   '/assets/images/platform/workflows/better-systems/build-w-powerful-blocks-mobile.avif',
      imageMobileWidth:  1472,
      imageMobileHeight: 1008,
    },
    {
      // 3 cols × 1 row
      columns:          3,
      title:            "Extend Fethr's functionality.",
      description:      'Build new features, calculations, formulas, and more.',
      imageSrc:         '/assets/images/platform/workflows/better-systems/extend-functionality.avif',
      imageWidth:       1000,
      imageHeight:      1008,
      imageAlt:         'Extended functionality builder',
      imageSrcMobile:   '/assets/images/platform/workflows/better-systems/extend-functionality-mobile.avif',
      imageMobileWidth:  1472,
      imageMobileHeight: 1008,
    },
    {
      // 6 cols × 1 row — inline (text left, image right)
      columns:          6,
      layout:           'inline',
      title:            'Automate the impossible with AI.',
      description:      'Manage processes that were impossible before with complete, step-by-step control.',
      imageSrc:         '/assets/images/platform/workflows/better-systems/automate-the-impossible-with-ai.avif',
      imageWidth:       1320,
      imageHeight:      1360,
      imageAlt:         'AI-powered workflow automation',
      imageSrcMobile:   '/assets/images/platform/workflows/better-systems/automate-the-impossible-mobile.avif',
      imageMobileWidth:  1472,
      imageMobileHeight: 1008,
    },
  ],
}
