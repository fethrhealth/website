'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DemoRequestForm } from '../ui/DemoRequestForm'
import { TalkToSalesDialog } from '../ui/TalkToSalesDialog'

// ─── Constants ────────────────────────────────────────────────────────────────

/** Tailwind v3–compatible base classes for buttons (adapted from attio's v4 source) */
const BTN_BASE =
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap border' +
  ' transition-colors duration-300 ease-in-out' +
  ' disabled:pointer-events-none disabled:cursor-default' +
  ' h-9 gap-x-1.5 rounded-[10px] px-3 text-sm' +
  ' max-lg:h-11 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base'

// ─── TickRow ──────────────────────────────────────────────────────────────────

/**
 * Decorative row of dashed-tick SVG lines.
 * Appears at the top and bottom of the section (desktop only).
 */
function TickRow({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      className={cn(
        'relative grid grid-cols-12 gap-x-6',
        position === 'top' ? 'border-b' : 'border-t',
      )}
      style={{ borderColor: 'var(--trial-border)' }}
    >
      <div className="relative col-span-10 col-start-2 grid h-5 gap-px overflow-hidden px-px lg:h-8 grid-cols-[1fr_0.8fr_0.8fr] xl:grid-cols-[1fr_1.6fr_1fr]">

        {/* Tick 1 */}
        <div className="relative hidden lg:block">
          <svg className="top-0 -ml-px h-5 w-px overflow-visible lg:h-8">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--trial-border)" strokeDashoffset="-2" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Tick 2 — also has a solid vertical line at xl */}
        <div className="relative hidden lg:block">
          <svg className="top-0 -ml-px h-5 w-px overflow-visible lg:h-8">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--trial-border)" strokeDashoffset="-2" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>
          <svg width="1" height="100%" className="hidden xl:block absolute top-0 left-1/2 h-8" style={{ color: 'var(--trial-border)' }}>
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>

        {/* Tick 3 */}
        <div className="relative hidden lg:block">
          <svg className="top-0 -ml-px h-5 w-px overflow-visible lg:h-8">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--trial-border)" strokeDashoffset="-2" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Right-edge tick (absolutely positioned) */}
        <svg className="absolute top-0 right-0 -ml-px hidden h-5 w-px overflow-visible lg:block lg:h-8">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--trial-border)" strokeDashoffset="-2" strokeDasharray="4 4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

// ─── HexIllustration ──────────────────────────────────────────────────────────

/**
 * Hexagonal SVG illustration — five interlocking hex shapes with a hatching
 * pattern on the center hex. All colors use CSS variables so dark mode works
 * simply by redefining those vars on `.dark .trial-section`.
 */
function HexIllustration() {
  // Diagonal hatch line transforms (45° stripe fill inside the center hex mask)
  const HATCH_TRANSFORMS: string[] = [
    'scale(-1.02975 -.96934) rotate(-45 -13.924 264.465)',
    'scale(-1.02975 -.96934) rotate(-45 -17.347 272.73)',
    'scale(-1.02975 -.96934) rotate(-45 -20.768 280.988)',
    'scale(-1.02975 -.96934) rotate(-45 -24.192 289.253)',
    'scale(-1.02975 -.96934) rotate(-45 -27.615 297.519)',
    'scale(-1.02975 -.96934) rotate(-45 -31.035 305.775)',
    'scale(-1.02975 -.96934) rotate(-45 -34.457 314.035)',
    'scale(-1.02975 -.96934) rotate(-45 -37.88 322.3)',
    'scale(-1.02975 -.96934) rotate(-45 -41.3 330.556)',
    'scale(-1.02975 -.96934) rotate(-45 -44.722 338.819)',
    'scale(-1.02975 -.96934) rotate(-45 -48.147 347.086)',
    'scale(-1.02975 -.96934) rotate(-45 -51.57 355.35)',
    'scale(-1.02975 -.96934) rotate(-45 -54.987 363.6)',
    'scale(-1.02975 -.96934) rotate(-45 -58.413 371.871)',
    'scale(-1.02975 -.96934) rotate(-45 -61.832 380.125)',
    'scale(-1.02975 -.96934) rotate(-45 -65.253 388.384)',
    'scale(-1.02975 -.96934) rotate(-45 -68.677 396.65)',
    'scale(-1.02975 -.96934) rotate(-45 -72.096 404.906)',
    'scale(-1.02975 -.96934) rotate(-45 -75.518 413.166)',
    'scale(-1.02975 -.96934) rotate(-45 -78.946 421.441)',
    'scale(-1.02975 -.96934) rotate(-45 -82.364 429.693)',
    'scale(-1.02975 -.96934) rotate(-45 -85.786 437.956)',
    'scale(-1.02975 -.96934) rotate(-45 -89.21 446.22)',
    'scale(-1.02975 -.96934) rotate(-45 -92.633 454.485)',
    'scale(-1.02975 -.96934) rotate(-45 -96.05 462.737)',
    'scale(-1.02975 -.96934) rotate(-45 -99.474 471.002)',
    'scale(-1.02975 -.96934) rotate(-45 -102.898 479.267)',
    'scale(-1.02975 -.96934) rotate(-45 -106.32 487.528)',
    'scale(-1.02975 -.96934) rotate(-45 -109.742 495.789)',
    'scale(-1.02975 -.96934) rotate(-45 -113.164 504.05)',
    'scale(-1.02975 -.96934) rotate(-45 -116.585 512.312)',
    'scale(-1.02975 -.96934) rotate(-45 -120.007 520.572)',
    'scale(-1.02975 -.96934) rotate(-45 -123.429 528.833)',
    'scale(-1.02975 -.96934) rotate(-45 -126.85 537.091)',
    'scale(-1.02975 -.96934) rotate(-45 -130.272 545.354)',
    'scale(-1.02975 -.96934) rotate(-45 -133.695 553.618)',
    'scale(-1.02975 -.96934) rotate(-45 -137.116 561.877)',
    'scale(-1.02975 -.96934) rotate(-45 -140.538 570.138)',
    'scale(-1.02975 -.96934) rotate(-45 -143.963 578.408)',
    'scale(-1.02975 -.96934) rotate(-45 -147.381 586.66)',
    'scale(-1.02975 -.96934) rotate(-45 -150.804 594.922)',
    'scale(-1.02975 -.96934) rotate(-45 -154.229 603.19)',
    'scale(-1.02975 -.96934) rotate(-45 -157.65 611.452)',
    'scale(-1.02975 -.96934) rotate(-45 -161.07 619.708)',
    'scale(-1.02975 -.96934) rotate(-45 -164.49 627.964)',
    'scale(-1.02975 -.96934) rotate(-45 -167.916 636.234)',
    'scale(-1.02975 -.96934) rotate(-45 -171.336 644.49)',
    'scale(-1.02975 -.96934) rotate(-45 -174.758 652.753)',
    'scale(-1.02975 -.96934) rotate(-45 -178.18 661.014)',
    'scale(-1.02975 -.96934) rotate(-45 -181.602 669.275)',
    'scale(-1.02975 -.96934) rotate(-45 -185.023 677.534)',
    'scale(-1.02975 -.96934) rotate(-45 -188.445 685.795)',
    'scale(-1.02975 -.96934) rotate(-45 -191.865 694.053)',
    'scale(-1.02975 -.96934) rotate(-45 -195.29 702.321)',
    'scale(-1.02975 -.96934) rotate(-45 -198.716 710.591)',
    'scale(-1.02975 -.96934) rotate(-45 -202.134 718.845)',
    'scale(-1.02975 -.96934) rotate(-45 -205.554 727.101)',
    'scale(-1.02975 -.96934) rotate(-45 -208.981 735.375)',
    'scale(-1.02975 -.96934) rotate(-45 -212.4 743.63)',
    'scale(-1.02975 -.96934) rotate(-45 -215.82 751.884)',
    'scale(-1.02975 -.96934) rotate(-45 -219.246 760.157)',
    'scale(-1.02975 -.96934) rotate(-45 -222.665 768.41)',
    'scale(-1.02975 -.96934) rotate(-45 -226.089 776.676)',
    'scale(-1.02975 -.96934) rotate(-45 -229.512 784.94)',
    'scale(-1.02975 -.96934) rotate(-45 -232.934 793.2)',
    'scale(-1.02975 -.96934) rotate(-45 -236.353 801.457)',
    'scale(-1.02975 -.96934) rotate(-45 -239.777 809.722)',
    'scale(-1.02975 -.96934) rotate(-45 -243.198 817.98)',
    'scale(-1.02975 -.96934) rotate(-45 -246.62 826.241)',
    'scale(-1.02975 -.96934) rotate(-45 -250.043 834.507)',
  ]

  return (
    <svg
      className="h-auto w-full max-w-[360px] md:max-w-[488px]"
      viewBox="0 0 475 152"
      fill="none"
      aria-hidden="true"
    >
      {/* ── Rightmost hex — light fill ─────────────────────────────────────── */}
      <path
        d="m391.957 146.204-35.176-65.911a8.743 8.743 0 0 1 0-8.281l35.176-65.911c1.663-3.116 5.051-5.083 8.756-5.083h28.012c3.705 0 7.092 1.967 8.756 5.083l35.176 65.911a8.743 8.743 0 0 1 0 8.28l-35.176 65.912c-1.663 3.116-5.051 5.083-8.756 5.083h-28.012c-3.705 0-7.092-1.967-8.756-5.083Z"
        style={{ fill: 'var(--trial-hex-light)', stroke: 'var(--trial-hex-stroke)' }}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="m395.445 149.833 39.724-73.683-39.724-73.683m77.347 73.68h-37.625"
        style={{ stroke: 'var(--trial-hex-stroke)' }}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4"
      />

      {/* ── Right-center hex — muted fill ─────────────────────────────────── */}
      <path
        d="m316.99 146.204-35.176-65.911a8.743 8.743 0 0 1 0-8.281L316.99 6.101c1.663-3.116 5.051-5.083 8.756-5.083h28.013c3.704 0 7.092 1.967 8.755 5.083l35.176 65.911a8.738 8.738 0 0 1 0 8.28l-35.176 65.912c-1.663 3.116-5.051 5.083-8.755 5.083h-28.013c-3.705 0-7.092-1.967-8.756-5.083Z"
        style={{ fill: 'var(--trial-hex-muted)', stroke: 'var(--trial-hex-stroke)' }}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="m320.473 149.833 39.724-73.683-39.724-73.683m77.346 73.68h-37.625"
        style={{ stroke: 'var(--trial-hex-stroke)' }}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4"
      />

      {/* ── Center hex — light fill + diagonal hatching ───────────────────── */}
      <path
        d="m187.149 146.187-35.176-65.912a8.738 8.738 0 0 1 0-8.28l35.176-65.912C188.811 2.967 192.2 1 195.904 1h82.052c3.705 0 7.092 1.967 8.755 5.083l35.176 65.911a8.738 8.738 0 0 1 0 8.281l-35.176 65.912c-1.662 3.116-5.05 5.083-8.755 5.083h-82.052c-3.704 0-7.092-1.967-8.755-5.083Z"
        style={{ fill: 'var(--trial-hex-light)', stroke: 'var(--trial-hex-stroke)' }}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Mask: bottom-right quadrant of center hex (receives the hatching) */}
      <mask id="trial-hex-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="191" y="76" width="133" height="76">
        <path
          d="m230.357 76.14-38.243 70.927c-1.078 1.998.37 4.423 2.64 4.423h81.741a13 13 0 0 0 11.52-6.976l34.988-66.916a1 1 0 0 0-.886-1.463l-91.76.004Z"
          fill="#967E7E"
        />
      </mask>

      {/* Diagonal hatch lines inside the mask */}
      <g mask="url(#trial-hex-mask)" style={{ stroke: 'var(--trial-hatch)' }}>
        {HATCH_TRANSFORMS.map((transform, i) => (
          <path key={i} transform={transform} d="M0-.5h497.768" />
        ))}
      </g>

      {/* Center hex dashed cross lines + second stroke outline */}
      <path
        d="m190.631 149.822 39.724-73.684-39.724-73.683M322.76 76.134h-92.408"
        style={{ stroke: 'var(--trial-hex-stroke)' }}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4"
      />
      <path
        d="m187.149 146.187-35.176-65.912a8.738 8.738 0 0 1 0-8.28l35.176-65.912C188.811 2.967 192.2 1 195.904 1h82.052c3.705 0 7.092 1.967 8.755 5.083l35.176 65.911a8.738 8.738 0 0 1 0 8.281l-35.176 65.912c-1.662 3.116-5.05 5.083-8.755 5.083h-82.052c-3.704 0-7.092-1.967-8.755-5.083Z"
        style={{ stroke: 'var(--trial-hex-stroke)' }}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── Left-center hex — muted fill ──────────────────────────────────── */}
      <path
        d="M112.184 146.204 77.008 80.293a8.74 8.74 0 0 1 0-8.281l35.176-65.911c1.662-3.116 5.051-5.083 8.755-5.083h28.013c3.704 0 7.092 1.967 8.755 5.083l35.177 65.911a8.743 8.743 0 0 1 0 8.28l-35.177 65.912c-1.662 3.116-5.051 5.083-8.755 5.083h-28.013c-3.704 0-7.092-1.967-8.755-5.083Z"
        style={{ fill: 'var(--trial-hex-muted)', stroke: 'var(--trial-hex-stroke)' }}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M115.666 149.833 155.39 76.15 115.666 2.467m77.346 73.68h-37.625"
        style={{ stroke: 'var(--trial-hex-stroke)' }}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4"
      />

      {/* ── Leftmost hex — light fill ──────────────────────────────────────── */}
      <path
        d="M37.219 146.204 2.043 80.293a8.74 8.74 0 0 1 0-8.281L37.219 6.101c1.663-3.116 5.051-5.083 8.755-5.083h28.013c3.705 0 7.092 1.967 8.756 5.083l35.176 65.911a8.743 8.743 0 0 1 0 8.28l-35.176 65.912c-1.663 3.116-5.051 5.083-8.756 5.083H45.975c-3.705 0-7.093-1.967-8.756-5.083Z"
        style={{ fill: 'var(--trial-hex-light)', stroke: 'var(--trial-hex-stroke)' }}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="m40.707 149.829 39.724-73.683L40.707 2.463m77.346 73.68H80.428"
        style={{ stroke: 'var(--trial-hex-stroke)' }}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4"
      />
    </svg>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface TrialSectionProps {
  /** First line of the heading. Default: "Start with a 14-day". Pass '' to hide. */
  heading?: string
  /** Second line (serif span). Default: "free trial of Fethr.". Pass '' to hide. */
  headingSerif?: string
  /** Show the hex illustration on mobile. Desktop always shows it. Default: false. */
  showImageMobile?: boolean
  /** Show the "See our plans" outline link. Default: false. */
  showPlansLink?: boolean
  // ── DemoRequestForm forwarded props ──────────────────────────────────────
  /** Label for the submit button. Default: "Send me a demo". */
  submitLabel?: string
  /** Show ghost "Talk to sales" dialog button in the mobile form. Default: false. */
  showSales?: boolean
  /** Source identifier stored on the demo request record. Default: 'trial'. */
  source?: string
  /**
   * Heading layout. Default: 'stacked' — two lines, serif is larger (text-heading-md-serif).
   * 'inline' — continuous sentence, both at text-heading-responsive-md, serif is font-normal font-serif.
   */
  headingLayout?: 'stacked' | 'inline'
  /** Optional custom primary CTA — replaces the default "Talk to Sales" button when provided. */
  customCta?: React.ReactNode
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TrialSection({
  heading      = 'Start with a 14-day',
  headingSerif = 'free trial of Fethr.',
  showImageMobile = false,
  showPlansLink   = false,
  submitLabel,
  showSales     = true,
  source        = 'trial',
  headingLayout = 'stacked',
  customCta,
}: TrialSectionProps) {
  return (
    <section className="trial-section" style={{ backgroundColor: 'var(--trial-bg)' }}>
      <div className="container">
        <div className="relative" style={{ backgroundColor: 'var(--trial-bg)' }}>

          {/* ── Top decorative tick row ────────────────────────────────────── */}
          <TickRow position="top" />

          {/* ── Main content wrapper ──────────────────────────────────────── */}
          <div className="relative">
            <div className="relative lg:grid lg:grid-cols-12 lg:gap-x-6">

              {/* Content area — columns 2–11, split into 2 equal halves */}
              <div className="lg:col-span-10 lg:col-start-2 lg:grid lg:grid-cols-2">

                {/* ── Left panel: heading + CTAs ───────────────────────── */}
                <div className={cn('text-balance px-10 lg:py-10 lg:flex lg:flex-col lg:items-start lg:justify-center lg:px-0 max-w-[460px] mx-auto lg:mx-0', showImageMobile ? 'py-10' : 'py-20')}>

                  {headingLayout === 'inline' ? (
                    /* Inline: continuous sentence, both spans same size */
                    <h2 className="text-balance text-heading-responsive-md text-foreground text-center lg:text-left">
                      {heading && <span>{heading}</span>}
                      {heading && headingSerif && ' '}
                      {headingSerif && (
                        <span className="font-normal font-serif">{headingSerif}</span>
                      )}
                    </h2>
                  ) : (
                    /* Stacked (default): two lines, serif is larger */
                    <h2 className="text-center text-heading-responsive-md lg:text-left text-foreground">
                      {heading}
                      {heading && headingSerif && <br />}
                      {headingSerif && (
                        <span className="text-heading-md-serif">{headingSerif}</span>
                      )}
                    </h2>
                  )}

                  {/* CTA row — stacks vertically on mobile */}
                  <div className="mt-6 flex w-full items-center justify-center gap-x-2.5 gap-y-2 max-md:flex-col lg:justify-start">

                    {/* Primary CTA — desktop only */}
                    {customCta ?? (
                      <TalkToSalesDialog
                        source={source}
                        label="Talk to Sales"
                        className={cn(BTN_BASE, 'button-primary max-md:hidden')}
                      />
                    )}

                    {/* "Talk to sales" dialog — desktop only */}
                    {showSales && (
                      <TalkToSalesDialog
                        source={source}
                        className={cn(BTN_BASE, 'button-outline max-md:hidden')}
                      />
                    )}

                    <DemoRequestForm
                      source={source}
                      showSales={showSales}
                      submitLabel={submitLabel}
                    />

                    {/* TODO: Re-enable "See our plans" once pricing page is built */}
                    {/* {showPlansLink && (
                      <Link
                        href="/pricing"
                        className={cn(BTN_BASE, 'button-outline')}
                      >
                        See our plans
                      </Link>
                    )} */}
                  </div>
                </div>

                {/* ── Right panel: grid background + hex illustration ──── */}
                <div
                  className={cn(
                    'trial-grid-bg',
                    'flex items-center justify-center px-3',
                    'w-full border-t',
                    'aspect-[2/1]',
                    '[background-size:9.1%_11.5%] [background-position:center]',
                    'lg:aspect-auto lg:h-[338px] lg:border-x lg:border-t-0',
                    'lg:[background-position:right] lg:[background-size:10.3%_9.15%]',
                    'xl:[background-size:11.14%_9.15%]',
                    !showImageMobile && 'max-lg:hidden',
                  )}
                  style={{ borderColor: 'var(--trial-border)' }}
                >
                  <HexIllustration />
                </div>
              </div>

              {/* ── Side column decoration — two dashed horizontal lines ── */}
              {/* Positioned in the 12th column, runs across the right panel */}
              <div className="hidden lg:block absolute top-0 bottom-0 -left-6 col-start-12 col-end-13 w-[calc(100%+23px)]">
                <svg width="100%" height="1" className="absolute top-[calc(50%-22.9%)]" style={{ color: 'var(--trial-border)' }}>
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                </svg>
                <svg width="100%" height="1" className="absolute bottom-[calc(50%-23.1%)]" style={{ color: 'var(--trial-border)' }}>
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>
            {/* Absolute left/right 1 px border lines */}
            <div className="absolute top-0 right-0 h-full w-px" style={{ backgroundColor: 'var(--trial-border)' }} />
            <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: 'var(--trial-border)' }} />

          {/* ── Bottom decorative tick row ─────────────────────────────────── */}
          <TickRow position="bottom" />
        </div>
      </div>
    </section>
  )
}
