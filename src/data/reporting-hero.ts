/**
 * reporting-hero.ts — Datos de la sección hero de /platform/reporting
 *
 * Edita REPORTING_HERO para cambiar el badge, heading, subheading y CTA.
 */

// ─── Hero text ────────────────────────────────────────────────────────────────

export const REPORTING_HERO = {
  badge:      'Reporting',
  heading:    'Real-time reporting, total flexibility.',
  subheading: 'Fethr quickly transforms millions of your data points into insights for your entire GTM team.',
  primaryCta: { label: 'Start for free', href: '/platform/reporting' },
  showSales:       true as const,
  showMobileSales: true as const,
}

// ─── Nav reports + card content ───────────────────────────────────────────────
// This data drives all text visible in ReportingHeroCards.tsx.
// ⚠️  Keep exactly 3 reports — the cards are designed for 3 states.

/** Reports shown in the nav selector card */
export const REPORTING_NAV_REPORTS = [
  { name: 'Product-led Growth', description: 'Data for our PLG reporting.'    },
  { name: 'Revenue Operations', description: 'Dashboard for revenue data.'    },
  { name: 'Sales Leads',        description: 'An overview of our pipeline.'   },
] as const

/**
 * Text content for each dashboard card per state.
 * s0 = Product-led Growth · s1 = Revenue Operations · s2 = Sales Leads
 *
 * Legends: { text: string, color: Tailwind bg class }
 * Stat cards: { label, value, crumbs }
 */
export const REPORTING_CARD_DATA = {

  // ── State 0 — Product-led Growth ────────────────────────────────────────────
  s0: {
    card1: { title: 'Active and Habit',       badge: 'Workspaces', legends: [{ text: 'Active', color: 'bg-blue-500' }, { text: 'Habit', color: 'bg-blue-300' }],                                                  image: '/assets/images/platform/reporting/hero/reporting-hero-product-growth-pie-chart.svg' },
    card2: { title: 'Seat Counts',            badge: 'Workspaces', legends: [{ text: '1 to 5', color: 'bg-blue-500' }, { text: '6 to 10', color: 'bg-[#94B9FF]' }, { text: '11 to 20', color: 'bg-[#C8DCFF]' }] },
    card4: { title: 'Pipeline Funnel',        badge: 'Sales',                                                                                                                                                      image: '/assets/images/platform/reporting/hero/reporting-hero-product-growth-funnel-chart.svg' },
    card5: { title: 'Cumulative Leads',       badge: 'Leads',      legends: [{ text: 'US',     color: 'bg-blue-500' }, { text: 'EMEA',    color: 'bg-[#94B9FF]' }] },
    stat:  { label: 'Average Weekly Sessions', value: '79 sessions', crumbs: ['Workspaces', 'Session Count'] },
    card6: { title: 'New Leads by Source',    badge: 'Leads' },
    card7: { title: 'Workspace Demographics', badge: 'Workspaces',                                                                                                                                                 image: '/assets/images/platform/reporting/hero/reporting-hero-product-growth-map.svg' },
  },

  // ── State 1 — Revenue Operations ────────────────────────────────────────────
  s1: {
    card1: { title: 'Paid Accounts',             badge: 'Workspaces' },
    card2: { title: 'Accounts by Plan',          badge: 'Workspaces', legends: [{ text: 'Pro', color: 'bg-blue-500' }, { text: 'Plus', color: 'bg-[#94B9FF]' }] },
    card4: { label: 'Average ARR Contribution',  value: 'US $13,125.00', crumbs: ['Sales', 'ARR Contri...', 'Won'] },
    card5: { title: 'EU Account Distribution',   badge: 'Workspaces',                                                                                                                                               image: '/assets/images/platform/reporting/hero/reporting-hero-sales-map.svg' },
    stat:  { title: 'Won Accounts by Plan',      badge: 'Sales',      legends: [{ text: 'Pro', color: 'bg-blue-500' }, { text: 'Plus', color: 'bg-[#94B9FF]' }, { text: 'Enterprise', color: 'bg-[#C8DCFF]' }], image: '/assets/images/platform/reporting/hero/reporting-hero-revenue-operations-pie-chart.svg' },
    card6: { title: 'Total ARR',                 badge: 'Workspaces', legends: [{ text: 'US',  color: 'bg-blue-500' }, { text: 'EMEA', color: 'bg-[#94B9FF]' }] },
    card7: { title: 'Pipeline Funnel',           badge: 'Sales',                                                                                                                                                   image: '/assets/images/platform/reporting/hero/reporting-hero-revenue-operations-funnel-chart.svg' },
  },

  // ── State 2 — Sales Leads ────────────────────────────────────────────────────
  s2: {
    card1: { title: 'US Lead Locations',          badge: 'Sales',                                                                                                                                                    image: '/assets/images/platform/reporting/hero/reporting-hero-sales-map.svg' },
    card2: { title: 'Won Deals by Region',        badge: 'Deals',      legends: [{ text: 'US', color: 'bg-blue-500' }, { text: 'EMEA', color: 'bg-[#94B9FF]' }] },
    card4: { title: 'Target Plan Distribution',  badge: 'Workspaces', legends: [{ text: 'Paid', color: 'bg-blue-500' }, { text: 'Pro', color: 'bg-[#94B9FF]' }],                                                  image: '/assets/images/platform/reporting/hero/reporting-hero-sales-pie-chart.svg' },
    card5: { title: 'Average Deal Size',          badge: 'Deals',      legends: [{ text: 'US', color: 'bg-blue-500' }, { text: 'EMEA', color: 'bg-[#94B9FF]' }] },
    stat:  { title: 'Total Pipeline MRR',         badge: 'Workspaces', legends: [{ text: 'Tech', color: 'bg-blue-500' }, { text: 'Finance', color: 'bg-[#94B9FF]' }, { text: 'Agency', color: 'bg-[#C8DCFF]' }] },
    card6: { title: 'Pipeline Funnel',            badge: 'Sales',                                                                                                                                                   image: '/assets/images/platform/reporting/hero/reporting-hero-sales-funnel-chart.svg' },
    card7: { label: 'ARR Contribution',           value: 'US $15,990.00', crumbs: ['Sales', 'Total Pipeline ARR'] },
  },

} as const
