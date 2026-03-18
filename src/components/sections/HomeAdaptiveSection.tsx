import Link from 'next/link'
import { HomeAdaptiveModelVisual } from './HomeAdaptiveModelVisual'

// ─── Types ────────────────────────────────────────────────────────────────────

interface HomeAdaptiveSectionProps {
  /** Section index shown in the desktop label — e.g. 2 → "[02]" */
  index?: number
  /** Left label text in the desktop header */
  sectionLabel?: string
  /** Right tag text in the desktop header */
  sectionTag?: string
  /** Bold heading text */
  heading: string
  /** Description rendered inline after the heading */
  description: string
  /** CTA button text */
  ctaText: string
  /** CTA button href */
  ctaHref: string
  /** Visual content rendered below the heading — passed after this section is complete */
  children?: React.ReactNode
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HomeAdaptiveSection({
  index = 2,
  sectionLabel = 'Adaptive model',
  sectionTag = '/ data ↔ business',
  heading,
  description,
  ctaText,
  ctaHref,
  children,
}: HomeAdaptiveSectionProps) {
  const indexStr = `[${String(index).padStart(2, '0')}]`

  return (
    <div className="container">
      <div className="overflow-hidden">

        {/* ── Desktop section label (hidden on mobile) ──────────────────── */}
        <div className="hidden lg:block pt-[100px] border-subtle-stroke border-x font-display">
          <div className="flex items-center justify-between px-5 text-overline">
            <h2 className="flex gap-x-[6px]">
              <span>{indexStr}</span>
              <span className="text-black-800">{sectionLabel}</span>
            </h2>
            <span>{sectionTag}</span>
          </div>
          <svg width="100%" height="1" className="text-subtle-stroke mt-5 h-px w-full" aria-hidden>
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className="pt-20 lg:flex lg:flex-col lg:items-center lg:border-subtle-stroke lg:border-x lg:pt-[120px]">

          {/* Heading + description */}
          <div className="max-w-[880px] text-heading-sm lg:text-center font-display">
            <h3 className="inline">
              <span className="font-semibold text-primary-foreground">{heading}&nbsp;</span>
            </h3>
            <p className="inline font-medium text-black-800">{description}</p>
          </div>

          {/* CTA */}
          <Link
            href={ctaHref}
            className="relative mt-8 inline-flex cursor-pointer items-center justify-center gap-x-1.5 rounded-[10px] border border-subtle-stroke bg-primary-background px-3 text-sm text-secondary-foreground transition-colors duration-300 ease-in-out hover:bg-muted-strong-bg hover:duration-50 h-9"
          >
            {ctaText}
          </Link>

          {/* Visual slot — populated in a second pass */}
          {children}

        </div>
      </div>
      <HomeAdaptiveModelVisual />
    </div>
  )
}
