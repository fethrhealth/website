// ─── DataHeroSection — /platform/data ─────────────────────────────────────────
//
// ALL client-editable content for the Data page hero section lives here.
// The ER diagram connectors, grid positions, and icon choices are structural
// and do NOT belong here — only copy, labels, image paths, and badge types.

// ─── Hero copy ─────────────────────────────────────────────────────────────

export const DATA_HERO_BADGE      = 'Data model'
export const DATA_HERO_HEADING    = 'The data model for go-to-market magic.'
export const DATA_HERO_SUBHEADING = 'Attio gives you control and flexibility to build the perfect CRM that drives revenue forward.'
export const DATA_HERO_CTA_LABEL  = 'Start for free'
export const DATA_HERO_CTA_HREF   = '/platform/data'
/** Sent to the talk-to-sales form so the team knows which page drove the conversion. */
export const DATA_HERO_FORM_SOURCE = 'data'

// ─── Tab strip ──────────────────────────────────────────────────────────────
//
// One entry per tab in the navigation strip below the hero copy.
// The 'id' key MUST match the keys used in DATA_HERO_DESKTOP_LABELS and
// DATA_HERO_MOBILE_CARDS — it is the shared identifier between all three tables.

export interface DataHeroTab {
  id: string
  label: string
  /** Screenshot image shown below the ER diagram. Use avif/webp for performance. */
  src: string
}

export const DATA_HERO_TABS: DataHeroTab[] = [
  {
    id:    'marketplaces',
    label: 'Marketplaces',
    src:   '/assets/images/platform/data/hero/marketplaces-screen.avif',
  },
  {
    id:    'plg',
    label: 'Product-led growth',
    src:   '/assets/images/platform/data/hero/product-sales-screen.avif',
  },
  {
    id:    'pls',
    label: 'Product-led sales',
    src:   '/assets/images/platform/data/hero/product-sales-screen.avif',
  },
  {
    id:    'sales',
    label: 'Sales',
    src:   '/assets/images/platform/data/hero/sales-screen.avif',
  },
]

// ─── Desktop ER diagram — entity labels ────────────────────────────────────
//
// Exactly 5 entries per tab (one per entity card in the 118-column grid).
// Slot order matches the SLOTS array in the component — top-left, top-right,
// bottom-left, bottom-center, bottom-right. Only the text changes between tabs;
// layout, icons, and connectors are fixed in the component.

export interface DesktopSlotLabel {
  /** Entity / object name displayed in the card header. */
  name: string
  /** Labels for each field row (1–3 rows visible, matching the card's icons). */
  fieldLabels: string[]
  /** Number shown in the "+N more" badge at the bottom of the card. */
  moreCount: number
}

export const DATA_HERO_DESKTOP_LABELS: Record<string, DesktopSlotLabel[]> = {
  // ── Marketplaces ─────────────────────────────────────────────────────────
  marketplaces: [
    { name: 'Person',      fieldLabels: ['Person name', 'Email address', 'Location'],         moreCount: 16 },
    { name: 'Seller',      fieldLabels: ['Seller ID', 'Stage', 'Estimated ARR'],              moreCount: 11 },
    { name: 'Buyer',       fieldLabels: ['Buyer ID', 'Buyer type'],                           moreCount: 10 },
    { name: 'Company',     fieldLabels: ['Company name', 'Industry'],                         moreCount: 7  },
    { name: 'Transaction', fieldLabels: ['Transaction ID', 'Transaction date'],               moreCount: 5  },
  ],

  // ── Product-led growth ───────────────────────────────────────────────────
  // Note: slot 4 (Event) is hidden on this tab — it exists only to satisfy
  // the 5-entry requirement so array indices stay in sync with SLOTS.
  plg: [
    { name: 'Company',   fieldLabels: ['Person name', 'Email address', 'Last active'], moreCount: 14 },
    { name: 'Person',    fieldLabels: ['Workspace ID', 'Plan', 'MRR'],                 moreCount: 9  },
    { name: 'Workspace', fieldLabels: ['Member ID', 'Role'],                           moreCount: 8  },
    { name: 'User',      fieldLabels: ['Company name', 'Domain'],                      moreCount: 6  },
    { name: 'Event',     fieldLabels: ['Event name', 'Timestamp'],                     moreCount: 4  },
  ],

  // ── Product-led sales ────────────────────────────────────────────────────
  pls: [
    { name: 'Company',   fieldLabels: ['Company name', 'Industry', 'Domain'],                          moreCount: 12 },
    { name: 'Workspace', fieldLabels: ['Billing email address', 'Subscription state', 'Seat count'],   moreCount: 11 },
    { name: 'Deal',      fieldLabels: ['Deal ID', 'Deal stage'],                                       moreCount: 10 },
    { name: 'Person',    fieldLabels: ['Person name', 'Email address'],                                moreCount: 13 },
    { name: 'User',      fieldLabels: ['User ID', 'Email address'],                                    moreCount: 15 },
  ],

  // ── Sales ─────────────────────────────────────────────────────────────────
  sales: [
    { name: 'Partnership', fieldLabels: ['Partnership name', 'Partnership type', 'Location'],    moreCount: 12 },
    { name: 'Invoices',    fieldLabels: ['Billing address', 'Phone number', 'Point of contact'], moreCount: 12 },
    { name: 'Company',     fieldLabels: ['Company name', 'Industry'],                            moreCount: 10 },
    { name: 'Deal',        fieldLabels: ['Deal ID', 'Deal type'],                                moreCount: 8  },
    { name: 'Person',      fieldLabels: ['Person name', 'Email address'],                        moreCount: 12 },
  ],
}

// ─── Mobile card text ──────────────────────────────────────────────────────
//
// Each tab defines its own set of mobile entity cards (shown at < lg breakpoint).
// Mobile cards have their own layout, icon choices, and field selections —
// they are NOT derived from the desktop slots above.
//
// fieldLabels: exactly 3 strings (always 3 field rows are shown on mobile).
// moreCount: the "+N more" badge at the bottom of the card.

export interface MobileCardText {
  entityName: string
  badge: 'Standard' | 'Custom'
  fieldLabels: [string, string, string]
  moreCount: number
}

export const DATA_HERO_MOBILE_CARDS: Record<string, MobileCardText[]> = {
  // ── Marketplaces ─────────────────────────────────────────────────────────
  marketplaces: [
    { entityName: 'Person',      badge: 'Standard', fieldLabels: ['Person name',      'Email address',      'Location'],             moreCount: 16 },
    { entityName: 'Buyer',       badge: 'Custom',   fieldLabels: ['Buyer ID',          'Buyer type',         'Last transaction date'], moreCount: 10 },
    { entityName: 'Seller',      badge: 'Custom',   fieldLabels: ['Seller ID',         'Stage',              'Estimated ARR'],         moreCount: 11 },
    { entityName: 'Company',     badge: 'Standard', fieldLabels: ['Company name',      'Industry',           'Domain'],               moreCount: 7  },
    { entityName: 'Transaction', badge: 'Custom',   fieldLabels: ['Transaction ID',    'Transaction date',   'Purchased plan'],        moreCount: 5  },
  ],

  // ── Product-led growth ───────────────────────────────────────────────────
  plg: [
    { entityName: 'Person',    badge: 'Custom',   fieldLabels: ['Record name',          'Email address',       'Location'],              moreCount: 14 },
    { entityName: 'Company',   badge: 'Standard', fieldLabels: ['Company name',          'Industry',            'Domain'],               moreCount: 7  },
    { entityName: 'Workspace', badge: 'Standard', fieldLabels: ['Billing email address', 'Subscription state',  'Seat count'],           moreCount: 11 },
    { entityName: 'User',      badge: 'Custom',   fieldLabels: ['User ID',               'Workspace',           'Renewal date'],          moreCount: 15 },
  ],

  // ── Product-led sales ────────────────────────────────────────────────────
  pls: [
    { entityName: 'Workspace', badge: 'Standard', fieldLabels: ['Billing email address', 'Subscription state', 'Seat count'], moreCount: 11 },
    { entityName: 'Company',   badge: 'Custom',   fieldLabels: ['Company name',           'Industry',           'Domain'],    moreCount: 12 },
    { entityName: 'User',      badge: 'Standard', fieldLabels: ['Record name',            'Email address',      'Platform'],  moreCount: 15 },
    { entityName: 'Deal',      badge: 'Custom',   fieldLabels: ['Deal ID',                'Deal stage',         'Deal Value'], moreCount: 8  },
    { entityName: 'Person',    badge: 'Standard', fieldLabels: ['Record name',            'Email address',      'Location'],  moreCount: 12 },
  ],

  // ── Sales ─────────────────────────────────────────────────────────────────
  sales: [
    { entityName: 'Partnership', badge: 'Custom',   fieldLabels: ['Record name',     'Email address',       'Location'],          moreCount: 12 },
    { entityName: 'Invoices',    badge: 'Custom',   fieldLabels: ['Billing address', 'Phone number',        'Point of contact'],  moreCount: 12 },
    { entityName: 'Company',     badge: 'Standard', fieldLabels: ['Company name',    'Industry',            'Domain'],            moreCount: 10 },
    { entityName: 'Person',      badge: 'Standard', fieldLabels: ['Record name',     'Email address',       'Location'],          moreCount: 12 },
    { entityName: 'Deal',        badge: 'Standard', fieldLabels: ['Record name',     'Deal type',           'Potential value'],   moreCount: 16 },
  ],
}
