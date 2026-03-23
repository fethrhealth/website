/**
 * Platform feature navigation items.
 * Used by PlatformNavSection on every /platform/* page.
 *
 * To mark the current page, pass `currentHref` to the component.
 */

export interface PlatformFeature {
  /** Zero-padded number label, e.g. "01" */
  number: string
  /** Display label shown on the card */
  label: string
  /** Internal href */
  href: string
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  { number: '01', label: 'Ask Fethr',    href: '/platform/ask' },
  { number: '02', label: 'AI',           href: '/platform/ai' },
  { number: '03', label: 'Data',         href: '/platform/data' },
  { number: '04', label: 'Developers',   href: '/platform/developers' },
  { number: '05', label: 'Productivity', href: '/platform/productivity' },
  { number: '06', label: 'Workflows',    href: '/platform/workflows' },
  { number: '07', label: 'Sequences',    href: '/platform/sequences' },
  { number: '08', label: 'Reporting',    href: '/platform/reporting' },
]
