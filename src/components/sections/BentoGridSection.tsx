import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { BentoItem, BentoGridContent } from '@/data/bento-grid'

// ─── Column / row span lookup (static strings so Tailwind JIT picks them up) ──

const COL_SPAN: Record<number, string> = {
  1:  'lg:col-span-1',
  2:  'lg:col-span-2',
  3:  'lg:col-span-3',
  4:  'lg:col-span-4',
  5:  'lg:col-span-5',
  6:  'lg:col-span-6',
  7:  'lg:col-span-7',
  8:  'lg:col-span-8',
  9:  'lg:col-span-9',
  10: 'lg:col-span-10',
}

const ROW_SPAN: Record<number, string> = {
  1: '',
  2: 'lg:row-span-2',
  3: 'lg:row-span-3',
}

// ─── Corner cross marker ──────────────────────────────────────────────────────

function CrossMarker({ className }: { className: string }) {
  return (
    <svg
      width="7" height="7" viewBox="0 0 7 7" fill="none"
      className={cn('text-fg-caption absolute', className)}
      aria-hidden="true"
    >
      <path d="M3.5 0V7M0 3.5H7" stroke="currentColor" />
    </svg>
  )
}

// ─── Bento frame (dashed corner decorations) ──────────────────────────────────
//
// 8 dashed SVG lines — 2 per corner (one horizontal, one vertical).
// They extend 120px outward from the card edges, bleeding into the gap.

function BentoFrame() {
  return (
    <div
      className="bento-frame pointer-events-none absolute text-white-400"
      style={{ inset: 'calc(var(--border-offset) * -1)' }}
      aria-hidden="true"
    >
      {/* Top-left corner */}
      <svg width="1" height="120" viewBox="0 0 1 120" fill="none"
        className="absolute top-0 -translate-x-full"
        style={{ left: 'var(--border-offset)' }}>
        <path d="M0.5 0V120" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
      <svg width="120" height="1" viewBox="0 0 120 1" fill="none"
        className="absolute left-0 -translate-y-full"
        style={{ top: 'var(--border-offset)' }}>
        <path d="M0.5 0.5L120 0.5" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>

      {/* Top-right corner */}
      <svg width="1" height="120" viewBox="0 0 1 120" fill="none"
        className="absolute top-0 translate-x-full"
        style={{ right: 'var(--border-offset)' }}>
        <path d="M0.5 0V120" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
      <svg width="120" height="1" viewBox="0 0 120 1" fill="none"
        className="absolute right-0 -translate-y-full"
        style={{ top: 'var(--border-offset)' }}>
        <path d="M0.5 0.5L120 0.5" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>

      {/* Bottom-right corner */}
      <svg width="1" height="120" viewBox="0 0 1 120" fill="none"
        className="absolute bottom-0 translate-x-full"
        style={{ right: 'var(--border-offset)' }}>
        <path d="M0.5 0V120" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
      <svg width="120" height="1" viewBox="0 0 120 1" fill="none"
        className="absolute right-0 translate-y-full"
        style={{ bottom: 'var(--border-offset)' }}>
        <path d="M0.5 0.5L120 0.5" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>

      {/* Bottom-left corner */}
      <svg width="1" height="120" viewBox="0 0 1 120" fill="none"
        className="absolute bottom-0 -translate-x-full"
        style={{ left: 'var(--border-offset)' }}>
        <path d="M0.5 0V120" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
      <svg width="120" height="1" viewBox="0 0 120 1" fill="none"
        className="absolute left-0 translate-y-full"
        style={{ bottom: 'var(--border-offset)' }}>
        <path d="M0.5 0.5L120 0.5" stroke="currentColor" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
    </div>
  )
}

// ─── Single bento card ────────────────────────────────────────────────────────

function BentoCard({ item }: { item: BentoItem }) {
  const hasMobileVariant = !!item.imageSrcMobile
  const inline = item.layout === 'inline'

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between gap-8 bg-primary-background p-10',
        inline && 'lg:flex-row lg:items-center lg:p-5',
        COL_SPAN[item.columns],
        ROW_SPAN[item.rows ?? 1],
      )}
    >
      <BentoFrame />

      {/* Text */}
      <div
        className={cn(
          'flex flex-col gap-1 text-base',
          inline ? 'lg:min-w-[min(360px,50%)] lg:p-5' : 'lg:max-w-[480px]',
        )}
      >
        <p className="font-semibold text-secondary-foreground">{item.title}</p>
        <p className="text-pretty text-tertiary-foreground">{item.description}</p>
      </div>

      {/* Image */}
      <div className="mx-auto max-w-sm lg:mx-0 lg:max-w-none">
        {hasMobileVariant ? (
          <>
            {/* Mobile image */}
            <Image
              src={item.imageSrcMobile!}
              alt={item.imageAlt ?? ''}
              width={item.imageMobileWidth ?? item.imageWidth}
              height={item.imageMobileHeight ?? item.imageHeight}
              className="max-h-80 object-contain lg:hidden"
              loading="lazy"
            />
            {/* Desktop image */}
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? ''}
              width={item.imageWidth}
              height={item.imageHeight}
              className="hidden object-contain lg:block"
              loading="lazy"
            />
          </>
        ) : (
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? ''}
            width={item.imageWidth}
            height={item.imageHeight}
            className="object-contain"
            loading="lazy"
          />
        )}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function BentoGridSection({
  headerLayout = 'centered',
  headingMuted,
  headingPrimary,
  headingMutedFirst = true,
  headingLineBreak = false,
  subtext,
  items,
}: BentoGridContent) {
  const hasHeader = !!(headingMuted || headingPrimary)

  // ── Heading parts ──────────────────────────────────────────────────────────
  const mutedEl = headingMuted
    ? <span style={{ color: '#727b84' }}>{headingMuted}</span>
    : null

  const primaryEl = headingPrimary
    ? headingPrimary.split(/\n|\\n/).map((part, i) => (
        <span key={i}>{i > 0 && <br />}{part}</span>
      ))
    : null

  const sep = headingLineBreak ? <br /> : null

  // ── Shared heading element ─────────────────────────────────────────────────
  const heading = hasHeader && (
    <h2 className="text-pretty text-heading-responsive-md">
      {headingMutedFirst
        ? <>{mutedEl}{sep}{primaryEl}</>
        : <>{primaryEl}{sep}{mutedEl}</>
      }
    </h2>
  )

  return (
    <section>
      <div className="container">
        <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pt-16 pb-16 lg:pt-24 lg:pb-24 xl:pt-32 xl:pb-32">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* ── Optional header ───────────────────────────────── */}
            {hasHeader && (
              <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
                {headerLayout === 'split' ? (

                  /* Split: heading left (cols 1-5), subtext right (cols 7-11) */
                  <div className="flex flex-col items-start">
                    <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                      <div className="col-span-full lg:col-span-5">{heading}</div>
                      {subtext && (
                        <p className="col-span-full text-pretty text-lg lg:col-start-7 lg:col-end-11 lg:text-xl">
                          {subtext}
                        </p>
                      )}
                    </div>
                  </div>

                ) : (

                  /* Centered (default) */
                  <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                    <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                      <div className="col-span-full">{heading}</div>
                      {subtext && (
                        <p className="col-span-full text-pretty text-lg lg:text-xl">{subtext}</p>
                      )}
                    </div>
                  </div>

                )}
              </div>
            )}

            {/* ── Bento grid ───────────────────────────────────── */}
            <div className="relative my-8 grid gap-[1px] border border-subtle-stroke bg-white-500 lg:auto-rows-fr lg:grid-cols-10">

              {items.map((item, i) => (
                <BentoCard key={i} item={item} />
              ))}

              {/* Corner cross markers */}
              <CrossMarker className="top-[-4px] left-[-4px]" />
              <CrossMarker className="bottom-[-4px] left-[-4px]" />
              <CrossMarker className="top-[-4px] right-[-4px]" />
              <CrossMarker className="right-[-4px] bottom-[-4px]" />

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
