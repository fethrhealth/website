// ─── FeatureTabsSection — "From data to decisions" — /platform/data ──────────

export interface FeatureTab {
  id: string
  /** Short label shown on the tab button */
  label: string
  /** Heading shown in the left panel (desktop) */
  heading: string
  /** Description shown in the left panel (desktop) */
  description: string
  imageSrc: string
  imageWidth: number
  imageHeight: number
  imageAlt?: string
}

export interface FeatureTabsContent {
  /** Inline heading shown above the tabs */
  heading: string
  subtext: string
  learnMoreLabel?: string
  learnMoreHref?: string
  tabs: FeatureTab[]
}

export const DATA_DECISIONS: FeatureTabsContent = {
  heading:        'From data to decisions, instantly.',
  subtext:        'Surface insights fast with reports built for how your business works.',
  learnMoreLabel: 'Learn more',
  learnMoreHref:  '/platform/reporting',
  tabs: [
    {
      id:          'sales-pipeline',
      label:       'Sales pipeline',
      heading:     'Sales pipeline',
      description: 'Stages, forecasts, win rates, and time to close—all tracked.',
      imageSrc:    '/assets/images/platform/data/sales-pipeline.webp',
      imageWidth:  2264,
      imageHeight: 2080,
      imageAlt:    'Sales pipeline dashboard',
    },
    {
      id:          'revenue-metrics',
      label:       'Revenue metrics',
      heading:     'Revenue metrics',
      description: 'Track MRR, ARR, churn, and expansion revenue in real time.',
      imageSrc:    '/assets/images/platform/data/revenue-metrics.webp',
      imageWidth:  2264,
      imageHeight: 2080,
      imageAlt:    'Revenue metrics dashboard',
    },
    {
      id:          'product-growth',
      label:       'Product growth',
      heading:     'Product growth',
      description: 'Understand activation, retention, and feature adoption at a glance.',
      imageSrc:    '/assets/images/platform/data/product-growth.webp',
      imageWidth:  2264,
      imageHeight: 2080,
      imageAlt:    'Product growth dashboard',
    },
  ],
}
