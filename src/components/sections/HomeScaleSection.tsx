import { SectionLabel } from '@/components/ui/SectionLabel'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScaleStatItem {
  /** Main number text — e.g. "200,000,000" or "99.9%" */
  value: string
  /** Optional suffix rendered after the value — e.g. "+" */
  suffix?: string
  /** Label below the number — e.g. "Customer records" */
  label: string
}

interface HomeScaleSectionProps {
  /** Section index for SectionLabel (default 4) */
  index?: number
  /** Left label text for SectionLabel */
  sectionLabel?: string
  /** Right tag text for SectionLabel */
  sectionTag?: string
  /** Bold heading — rendered inline before description */
  heading: string
  /** Description paragraph — rendered inline after heading */
  description: string
  /** 4 stat items rendered in a 2×2 grid on desktop */
  stats: [ScaleStatItem, ScaleStatItem, ScaleStatItem, ScaleStatItem]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DESKTOP_LINES = 15
const MOBILE_LINES  = 11
const LINE_DELAY_START = 0.04
const LINE_DELAY_STEP  = 0.09
const STAT_DELAY_START = 320
const STAT_DELAY_STEP  = 160

// ─── Vertical dashed grid line ────────────────────────────────────────────────

function GridLine({ delay }: { delay: number }) {
  return (
    <svg
      className="mask-reveal-to-bottom h-full w-[1px]"
      style={{ animationDelay: `${delay}s` }}
    >
      <line
        x1="50%" y1="0" x2="50%" y2="100%"
        strokeWidth="2"
        stroke="#E4E7EC"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HomeScaleSection({
  index       = 4,
  sectionLabel = 'Built for scale',
  sectionTag   = '/ growth + security',
  heading,
  description,
  stats,
}: HomeScaleSectionProps) {
  return (
    <section>
      <div className="container">
        <div className="lg:border-x lg:border-subtle-stroke">

          <SectionLabel
            index={index}
            label={sectionLabel}
            tag={sectionTag}
            className="pt-[100px]"
          />

          <div className="grid grid-rows-[auto_1fr]">

            {/* ── Chart visualization ────────────────────────────────────────
             * Mobile  → row 2 (below heading text)
             * Desktop → row 1 with mt-[172px] so it visually sits behind the heading
             */}
            <div className="relative col-start-1 row-start-2 row-end-3 w-full lg:row-start-1 lg:mt-[172px]">
              <div className="relative grid h-[380px] w-full overflow-x-hidden lg:h-[600px]">

                {/* Gradient fill — area below the curve, fades to transparent at bottom */}
                <svg
                  className="mask-to-right col-start-1 row-start-1 h-full w-full lg:-mx-[1px] lg:w-[calc(100%+2px)] mask-reveal-to-right"
                  style={{ animationDelay: '0.6s' }}
                  viewBox="0 0 1400 600"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="scale-chart-gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%"   stopColor="rgba(250,250,251,1)" />
                      <stop offset="50%"  stopColor="rgba(250,250,251,1)" />
                      <stop offset="100%" stopColor="rgba(250,250,251,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 509.387C547.585 495.033 1040.74 302.924 1400 0V600H0V509.387Z"
                    fill="url(#scale-chart-gradient)"
                  />
                </svg>

                {/* Vertical dashed grid lines — staggered reveal from top */}
                <div className="col-start-1 row-start-1 grid grid-cols-12 gap-x-6">

                  {/* Desktop: 15 lines spanning col 2–12 */}
                  <div className="hidden lg:col-span-11 lg:col-start-2 lg:flex">
                    {Array.from({ length: DESKTOP_LINES }, (_, i) => (
                      <div key={i} className="flex flex-1 items-stretch">
                        <GridLine delay={LINE_DELAY_START + i * LINE_DELAY_STEP} />
                        <div className="flex-1" />
                      </div>
                    ))}
                  </div>

                  {/* Mobile: 11 lines full width */}
                  <div className="col-span-12 flex lg:hidden">
                    <div className="flex-1" />
                    {Array.from({ length: MOBILE_LINES }, (_, i) => (
                      <div key={i} className="flex flex-1 items-stretch">
                        <GridLine delay={LINE_DELAY_START + i * LINE_DELAY_STEP} />
                        <div className="flex-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* White triangle fill — area above the curve (masks the grid lines above it) */}
                <svg
                  className="relative col-start-1 row-start-1 h-full w-full lg:-mx-[1px] lg:w-[calc(100%+2px)]"
                  preserveAspectRatio="none"
                  viewBox="0 0 1400 600"
                >
                  <path
                    d="M0 509.387C547.585 495.033 1040.74 302.923 1400 0H0V509.387Z"
                    fill="#fff"
                  />
                </svg>

                {/* Blue curve stroke — desktop */}
                <svg
                  className="mask-to-right col-start-1 row-start-1 -mx-[1px] hidden h-full w-[calc(100%+2px)] lg:block mask-reveal-to-right"
                  style={{ animationDelay: '0.6s' }}
                  preserveAspectRatio="none"
                  viewBox="0 0 1400 600"
                >
                  <path
                    d="M1400 1C1040.74 302.923 548.585 495.033 1 509.387"
                    fill="none"
                    stroke="#266DF0"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Blue curve stroke — mobile */}
                <svg
                  className="mask-to-right col-start-1 row-start-1 h-full w-full lg:hidden mask-reveal-to-right"
                  style={{ animationDelay: '0.6s' }}
                  preserveAspectRatio="none"
                  viewBox="0 0 600 600"
                >
                  <path
                    d="M600 1C447.032 302.923 235.679 495.033 1 509.387"
                    fill="none"
                    stroke="#266DF0"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>

              </div>
            </div>

            {/* ── Heading + description ──────────────────────────────────────
             * Always row 1 — overlays the chart on desktop.
             */}
            <div className="relative col-start-1 row-start-1 mt-[80px] mb-[60px] lg:mt-[120px] lg:mb-[100px] lg:grid lg:grid-cols-12 lg:gap-x-6">
              <div className="lg:col-span-11 lg:col-start-2 lg:grid lg:grid-cols-[repeat(15,minmax(0,1fr))]">
                <div className="text-heading-sm lg:col-span-9">
                  <h3 className="inline font-semibold text-primary-foreground">{heading}&nbsp;</h3>
                  <p className="inline font-medium text-black-800">{description}</p>
                </div>
              </div>
            </div>

            {/* ── Stats 2×2 grid ────────────────────────────────────────────
             * Row 2 on both mobile and desktop.
             * Left border accent on each stat value via before: pseudo-element.
             */}
            <div className="relative col-start-1 row-start-2 border-x border-subtle-stroke lg:grid lg:grid-cols-12 lg:gap-x-6 lg:border-0">
              <div className="relative left-[-1px] grid grid-cols-1 grid-rows-4 gap-4 self-start lg:left-0 lg:col-span-11 lg:col-start-2 lg:grid lg:grid-cols-[repeat(15,minmax(0,1fr))] lg:grid-rows-2 lg:gap-x-0 lg:gap-y-8">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 lg:col-span-4 lg:gap-2 2xl:col-span-3 animate-in fade-in-0 fill-mode-both duration-300"
                    style={{
                      animationDelay: `${STAT_DELAY_START + i * STAT_DELAY_STEP}ms`,
                      /* Place first two stats in row 1, last two in row 2 on desktop */
                      ...(i >= 2 ? { gridRowStart: 2 } : {}),
                    }}
                  >
                    {/* Value with left accent bar */}
                    <span className="relative pl-3 before:absolute before:left-0 before:h-full before:w-[1px] before:bg-black-800 lg:pl-5 text-heading-sm text-secondary-foreground tabular-nums">
                      <span>{stat.value}</span>
                      {stat.suffix && <span>{stat.suffix}</span>}
                    </span>
                    {/* Label */}
                    <span
                      className="pl-3 text-black-800 text-sm lg:pl-5 lg:text-base animate-in slide-in-from-top-2 fill-mode-both duration-300"
                      style={{ animationDelay: `${STAT_DELAY_START + i * STAT_DELAY_STEP}ms` }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
