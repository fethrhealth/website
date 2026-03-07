/**
 * Data types and content for the ReportingHeroCards section.
 *
 * Images → /public/assets/images/platform/reporting/hero/[view-slug]/[filename].webp
 *   Slots per view:
 *     chart-1.webp  — leftmost tall card (map / area chart)
 *     chart-2.webp  — second col, staggered-down card
 *     chart-3.webp  — xl-only fifth col card
 *     chart-4.webp  — fourth col top card
 *     chart-5.webp  — third col bottom card
 *     funnel.webp   — bottom-left two-col card (desktop)
 *     funnel-mobile.webp — same card, mobile crop
 */

export interface ReportingHeroCard {
  /** Unique id within a view — used as React key and animation key */
  id: string
  /** Card heading shown at the top of the card */
  title: string
  /** Category badge text (e.g. "Charts", "Metrics") */
  category: string
  /**
   * Tailwind grid-placement classes for the desktop grid.
   * The grid is `grid-cols-4 xl:grid-cols-5 grid-rows-[repeat(10,37px)] gap-3`.
   */
  gridClass: string
  /** Image path relative to /public */
  imageSrc: string
  imageWidth: number
  imageHeight: number
  /** When true, only renders on xl+ breakpoints */
  xlOnly?: boolean
  /** When 'stat', renders a metric number + label instead of an image */
  type?: 'chart' | 'stat' | 'funnel'
  /** Metric value, e.g. "$2.4M" — only used when type === 'stat' */
  statValue?: string
  /** Metric label — only used when type === 'stat' */
  statLabel?: string
  /** Percentage change badge — only used when type === 'stat' */
  statDelta?: string
  /** Whether the delta is positive (green) or negative (red) */
  statDeltaPositive?: boolean
}

export interface ReportingHeroView {
  /** Short name shown in the nav panel */
  name: string
  /** Longer subtitle shown below the name in the nav panel */
  subtitle: string
  /** Dashboard cards for this view */
  cards: ReportingHeroCard[]
}

// ─── Views ────────────────────────────────────────────────────────────────────

export const REPORTING_HERO_VIEWS: ReportingHeroView[] = [
  {
    name: 'PLG dashboard',
    subtitle: 'Track product-led growth and activation',
    cards: [
      {
        id: 'plg-chart-1',
        title: 'New signups by region',
        category: 'Charts',
        gridClass: 'lg:col-start-1 lg:row-start-1 lg:row-span-7',
        imageSrc: '/assets/images/platform/reporting/hero/plg/chart-1.webp',
        imageWidth: 400,
        imageHeight: 680,
      },
      {
        id: 'plg-chart-2',
        title: 'Weekly active users',
        category: 'Charts',
        gridClass: 'lg:col-start-2 lg:row-start-3 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/plg/chart-2.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'plg-chart-3',
        title: 'Activation rate',
        category: 'Metrics',
        gridClass: 'hidden xl:flex xl:col-start-5 xl:row-start-1 xl:row-span-8',
        imageSrc: '/assets/images/platform/reporting/hero/plg/chart-3.webp',
        imageWidth: 400,
        imageHeight: 760,
        xlOnly: true,
      },
      {
        id: 'plg-chart-4',
        title: 'Conversion to paid',
        category: 'Charts',
        gridClass: 'lg:col-start-4 lg:row-start-1 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/plg/chart-4.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'plg-stat',
        title: 'MRR growth',
        category: 'Metrics',
        gridClass: 'lg:col-start-4 lg:row-start-6 lg:row-span-4',
        imageSrc: '',
        imageWidth: 0,
        imageHeight: 0,
        type: 'stat',
        statValue: '+34%',
        statLabel: 'Month-over-month',
        statDelta: '+12%',
        statDeltaPositive: true,
      },
      {
        id: 'plg-chart-5',
        title: 'Feature adoption',
        category: 'Charts',
        gridClass: 'lg:col-start-3 lg:row-start-6 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/plg/chart-5.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'plg-funnel',
        title: 'Signup → activated funnel',
        category: 'Funnels',
        gridClass: 'lg:col-start-1 lg:col-span-2 lg:row-start-8 lg:row-span-3',
        imageSrc: '/assets/images/platform/reporting/hero/plg/funnel.webp',
        imageWidth: 800,
        imageHeight: 280,
        type: 'funnel',
      },
    ],
  },
  {
    name: 'Revenue ops',
    subtitle: 'Monitor pipeline health and forecast',
    cards: [
      {
        id: 'rev-chart-1',
        title: 'Pipeline by stage',
        category: 'Charts',
        gridClass: 'lg:col-start-1 lg:row-start-1 lg:row-span-7',
        imageSrc: '/assets/images/platform/reporting/hero/revenue-ops/chart-1.webp',
        imageWidth: 400,
        imageHeight: 680,
      },
      {
        id: 'rev-chart-2',
        title: 'Win/loss ratio',
        category: 'Charts',
        gridClass: 'lg:col-start-2 lg:row-start-3 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/revenue-ops/chart-2.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'rev-chart-3',
        title: 'ARR waterfall',
        category: 'Charts',
        gridClass: 'hidden xl:flex xl:col-start-5 xl:row-start-1 xl:row-span-8',
        imageSrc: '/assets/images/platform/reporting/hero/revenue-ops/chart-3.webp',
        imageWidth: 400,
        imageHeight: 760,
        xlOnly: true,
      },
      {
        id: 'rev-chart-4',
        title: 'Quota attainment',
        category: 'Charts',
        gridClass: 'lg:col-start-4 lg:row-start-1 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/revenue-ops/chart-4.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'rev-stat',
        title: 'Closed ARR',
        category: 'Metrics',
        gridClass: 'lg:col-start-4 lg:row-start-6 lg:row-span-4',
        imageSrc: '',
        imageWidth: 0,
        imageHeight: 0,
        type: 'stat',
        statValue: '$2.4M',
        statLabel: 'This quarter',
        statDelta: '+18%',
        statDeltaPositive: true,
      },
      {
        id: 'rev-chart-5',
        title: 'Deal velocity',
        category: 'Charts',
        gridClass: 'lg:col-start-3 lg:row-start-6 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/revenue-ops/chart-5.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'rev-funnel',
        title: 'Lead → closed-won funnel',
        category: 'Funnels',
        gridClass: 'lg:col-start-1 lg:col-span-2 lg:row-start-8 lg:row-span-3',
        imageSrc: '/assets/images/platform/reporting/hero/revenue-ops/funnel.webp',
        imageWidth: 800,
        imageHeight: 280,
        type: 'funnel',
      },
    ],
  },
  {
    name: 'Sales leads',
    subtitle: 'Analyze inbound quality and rep performance',
    cards: [
      {
        id: 'leads-chart-1',
        title: 'Leads by source',
        category: 'Charts',
        gridClass: 'lg:col-start-1 lg:row-start-1 lg:row-span-7',
        imageSrc: '/assets/images/platform/reporting/hero/sales-leads/chart-1.webp',
        imageWidth: 400,
        imageHeight: 680,
      },
      {
        id: 'leads-chart-2',
        title: 'Response time',
        category: 'Charts',
        gridClass: 'lg:col-start-2 lg:row-start-3 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/sales-leads/chart-2.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'leads-chart-3',
        title: 'Lead score distribution',
        category: 'Charts',
        gridClass: 'hidden xl:flex xl:col-start-5 xl:row-start-1 xl:row-span-8',
        imageSrc: '/assets/images/platform/reporting/hero/sales-leads/chart-3.webp',
        imageWidth: 400,
        imageHeight: 760,
        xlOnly: true,
      },
      {
        id: 'leads-chart-4',
        title: 'Rep leaderboard',
        category: 'Charts',
        gridClass: 'lg:col-start-4 lg:row-start-1 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/sales-leads/chart-4.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'leads-stat',
        title: 'Qualified leads',
        category: 'Metrics',
        gridClass: 'lg:col-start-4 lg:row-start-6 lg:row-span-4',
        imageSrc: '',
        imageWidth: 0,
        imageHeight: 0,
        type: 'stat',
        statValue: '1,284',
        statLabel: 'This month',
        statDelta: '+9%',
        statDeltaPositive: true,
      },
      {
        id: 'leads-chart-5',
        title: 'Call activity',
        category: 'Charts',
        gridClass: 'lg:col-start-3 lg:row-start-6 lg:row-span-5',
        imageSrc: '/assets/images/platform/reporting/hero/sales-leads/chart-5.webp',
        imageWidth: 400,
        imageHeight: 480,
      },
      {
        id: 'leads-funnel',
        title: 'MQL → SQL funnel',
        category: 'Funnels',
        gridClass: 'lg:col-start-1 lg:col-span-2 lg:row-start-8 lg:row-span-3',
        imageSrc: '/assets/images/platform/reporting/hero/sales-leads/funnel.webp',
        imageWidth: 800,
        imageHeight: 280,
        type: 'funnel',
      },
    ],
  },
]
