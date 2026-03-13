import Image from 'next/image'
import { RainGrid } from '@/components/ui/RainGrid'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContextFeature {
  /** Small icon shown above the description (20 × 20 px) */
  icon: string
  /** Bold part of the feature text */
  title: string
  /** Accent-colored part rendered after the title */
  accent: string
}

interface HomeContextSectionProps {
  /** Small eyebrow above the heading — default "Powered by" */
  eyebrow?: string
  /** Main heading — e.g. "Universal Context" */
  heading: string
  /** Whether to show the ™ superscript after the heading */
  trademark?: boolean
  /** Exactly 5 feature cards */
  features: [ContextFeature, ContextFeature, ContextFeature, ContextFeature, ContextFeature]
}

// ─── Card borders helper ──────────────────────────────────────────────────────
// Each feature card has 4 edge lines + 4 corner dots rendered as SVGs/divs
// positioned on the card boundary so adjacent cards share the same stroke.

function CardBorders() {
  return (
    <>
      {/* Horizontal top edge */}
      <svg width="100%" height="1" className="absolute inset-x-0 top-0 -translate-y-1/2 text-weak-stroke">
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Horizontal bottom edge */}
      <svg width="100%" height="1" className="absolute inset-x-0 bottom-0 translate-y-1/2 text-weak-stroke">
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Vertical left edge */}
      <svg width="1" height="100%" className="absolute inset-y-0 left-0 -translate-x-1/2 text-weak-stroke">
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Vertical right edge */}
      <svg width="1" height="100%" className="absolute inset-y-0 right-0 translate-x-1/2 text-weak-stroke">
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Corner dots */}
      <div className="absolute top-0    left-0  size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" />
      <div className="absolute bottom-0 left-0  size-1 -translate-x-1/2  translate-y-1/2 bg-default-stroke" />
      <div className="absolute top-0    right-0 size-1  translate-x-1/2 -translate-y-1/2 bg-default-stroke" />
      <div className="absolute bottom-0 right-0 size-1  translate-x-1/2  translate-y-1/2 bg-default-stroke" />
    </>
  )
}

// ─── Dashed full-width separator line ─────────────────────────────────────────

function DashedRow() {
  return (
    <svg
      width="100%"
      height="1"
      className="text-subtle-stroke mask-x-from-95% absolute left-1/2 w-screen -translate-x-1/2"
    >
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

// ─── Single feature card ──────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: ContextFeature }) {
  return (
    <div className="relative bg-primary-background">
      <div className="flex flex-col justify-between gap-3 p-6">
        <Image
          src={feature.icon}
          alt=""
          width={20}
          height={20}
          className="size-5 object-contain max-xl:size-4"
        />
        <p className="text-balance text-base text-primary-foreground max-2xl:text-sm">
          {feature.title}
          <span className="text-accent-foreground"> {feature.accent}</span>
        </p>
      </div>
      <CardBorders />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HomeContextSection({
  eyebrow  = 'Powered by',
  heading,
  trademark = true,
  features,
}: HomeContextSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-primary-background">

      {/* ── RainGrid canvas — absolute, covers top 60 % (desktop) / 50 % (xl) / 33 % (mobile) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-3/5 max-lg:h-1/3 max-xl:h-1/2"
        aria-hidden="true"
      >
        <RainGrid variant="light" fillHeight className="absolute inset-x-0 top-0" />
      </div>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="relative flex flex-col gap-3 pt-[23rem] text-center">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-[2/-2] flex flex-col items-center gap-3">
              <p className="text-lg text-muted-foreground">{eyebrow}</p>
              <h2 className="relative w-fit text-heading-responsive-lg text-primary-foreground">
                {heading}{' '}
                {trademark && (
                  <span className="relative whitespace-nowrap">
                    Context
                    <span className="absolute inline-block origin-bottom-left -translate-y-3/5 scale-[0.28] pl-[0.15em] font-bold tracking-tight">
                      TM
                    </span>
                  </span>
                )}
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* ── Spacer above cards */}
      <div aria-hidden="true" className="h-40 max-xl:h-30 max-lg:h-25" />

      {/* ── Feature cards ───────────────────────────────────────────────────── */}
      <div className="relative">
        <div className="container">
          <div className="relative isolate grid grid-cols-12">

            {/* Desktop: 5 cards horizontal, aspect-ratio 5:1 */}
            <div
              className="relative col-[2/-2] grid w-full items-center max-xl:hidden"
              style={{
                aspectRatio: '5 / 1',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridTemplateRows:    'repeat(1, 1fr)',
              }}
            >
              {/* Outer dashed border lines spanning full viewport width */}
              <svg width="100%" height="1" className="text-subtle-stroke mask-x-from-95% absolute top-0 left-1/2 w-screen -translate-x-1/2">
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="100%" height="1" className="text-subtle-stroke mask-x-from-95% absolute bottom-0 left-1/2 w-screen -translate-x-1/2">
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {features.map((feature, i) => (
                <div key={i} className="relative h-full">
                  <FeatureCard feature={feature} />
                </div>
              ))}
            </div>

            {/* Mobile / tablet: 5 cards stacked vertically */}
            <div
              className="relative col-[2/-2] grid w-full max-lg:col-[2/-2] xl:hidden"
              style={{
                gridTemplateColumns: 'repeat(1, 1fr)',
                gridTemplateRows:    'repeat(5, 1fr)',
              }}
            >
              {features.map((feature, i) => (
                <div key={i} className="relative">
                  <DashedRow />
                  <FeatureCard feature={feature} />
                </div>
              ))}
              {/* Bottom dashed border */}
              <div className="relative h-px">
                <DashedRow />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Spacer below cards */}
      <div aria-hidden="true" className="h-40 max-xl:h-30 max-lg:h-25" />

    </section>
  )
}
