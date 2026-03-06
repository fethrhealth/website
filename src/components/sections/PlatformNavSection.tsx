import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PLATFORM_FEATURES, type PlatformFeature } from '@/data/platform-nav'

// ─── Dashed SVG lines ─────────────────────────────────────────────────────────

function DashedVLine({ className }: { className?: string }) {
  return (
    <svg
      width="1"
      height="100%"
      className={cn('text-subtle-stroke', className)}
      aria-hidden="true"
    >
      <line
        x1="0.5" y1="0" x2="0.5" y2="100%"
        stroke="currentColor"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DashedHLine({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="1"
      className={cn('text-subtle-stroke absolute inset-x-0', className)}
      aria-hidden="true"
    >
      <line
        x1="0" y1="0.5" x2="100%" y2="0.5"
        stroke="currentColor"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Five dashed vertical column-separator lines.
 * They map to the 4-col / 2-col / 1-col card grid breakpoints.
 */
function ColumnLines() {
  return (
    <div className="col-start-2 col-end-[-2] flex justify-between">
      <DashedVLine />
      {/* Show only at xl (4-col grid) */}
      <DashedVLine className="hidden xl:block" />
      {/* Show at md+ (2-col and 4-col grids) */}
      <DashedVLine className="hidden md:block" />
      <DashedVLine className="hidden xl:block" />
      <DashedVLine />
    </div>
  )
}

// ─── Arrow icon (slides in on hover) ──────────────────────────────────────────

function ArrowRight() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      aria-hidden="true"
      className={cn(
        'relative mb-1 shrink-0 text-fg-caption',
        'opacity-0 -translate-x-[1px]',
        'transition-[opacity,transform] duration-400 ease-in-out',
        'group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-150',
        'group-active:translate-x-0 group-active:opacity-100 group-active:duration-50',
      )}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.1"
        d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5"
      />
    </svg>
  )
}

// ─── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({
  feature,
  isCurrent,
}: {
  feature: PlatformFeature
  isCurrent: boolean
}) {
  return (
    <Link
      href={feature.href}
      className={cn(
        'group relative flex h-[120px] flex-col justify-between bg-primary-background p-5',
        'max-md:h-24',
        isCurrent && 'pointer-events-none opacity-80',
      )}
    >
      {/* Hover / active overlay */}
      <div className="pointer-events-none absolute inset-0 bg-secondary-background opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80 group-hover:duration-50 group-active:opacity-100 group-active:duration-50" />

      <p className="relative text-overline">[{feature.number}]</p>

      <div className="relative flex items-end justify-between">
        <h3 className="relative text-balance text-base font-medium">{feature.label}</h3>
        <ArrowRight />
      </div>
    </Link>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function PlatformNavSection({
  heading = 'Fethr adapts to you.',
  subheading = 'Everything you need, built for how you work.',
  items = PLATFORM_FEATURES,
  currentHref,
}: {
  heading?: string
  subheading?: string
  items?: PlatformFeature[]
  currentHref?: string
}) {
  return (
    <div className="container">
      <div className="flex w-full flex-col border-x border-subtle-stroke">

        {/* ── Header ────────────────────────────────────────────────── */}
        <header className="grid grid-cols-12 justify-items-center pt-40 pb-20 max-xl:pt-[120px] max-xl:pb-16 max-lg:pt-[100px] max-lg:pb-[60px]">
          <div className="col-start-2 col-end-[-2] flex max-w-lg flex-col gap-3 text-center mix-blend-multiply dark:mix-blend-screen lg:gap-4">
            <h2 className="text-pretty text-heading-responsive-md">{heading}</h2>
            <p className="text-pretty text-xl text-tertiary-foreground">{subheading}</p>
          </div>
        </header>

        {/* ── Cards ─────────────────────────────────────────────────── */}
        <section className="relative grid grid-cols-12">

          {/* Decorative 5px strip of dashed column lines above cards */}
          <div
            aria-hidden="true"
            className="absolute -top-5 grid h-5 w-full grid-cols-12 overflow-hidden"
          >
            <ColumnLines />
          </div>

          {/* Top border */}
          <DashedHLine className="top-0" />

          {/* Dot pattern fill */}
          <svg
            width="100%" height="100%"
            className="text-muted-strong-background absolute inset-0"
            aria-hidden="true"
          >
            <defs>
              <pattern id="platform-nav-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#platform-nav-dots)" />
          </svg>

          {/* 4-col card grid (2-col at md, 1-col at mobile) */}
          <div className="relative col-start-2 col-end-[-2]">
            <div className="grid grid-cols-1 gap-px bg-subtle-stroke p-px md:grid-cols-2 xl:grid-cols-4">
              {items.map((feature) => (
                <FeatureCard
                  key={feature.href}
                  feature={feature}
                  isCurrent={feature.href === currentHref}
                />
              ))}
            </div>
          </div>

          {/* Bottom border */}
          <DashedHLine className="bottom-0" />

        </section>

        {/* ── Decorative column lines below cards ───────────────────── */}
        <div
          aria-hidden="true"
          className="grid h-[120px] w-full grid-cols-12 overflow-hidden max-lg:h-[100px]"
        >
          <ColumnLines />
        </div>

      </div>
    </div>
  )
}
