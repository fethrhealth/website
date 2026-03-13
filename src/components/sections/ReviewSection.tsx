'use client'

import { useId, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReviewSectionProps {
  /**
   * The testimonial quote — include surrounding " " characters in the string.
   * Each word is revealed progressively as the user scrolls.
   */
  quote:  string
  /** Author display name */
  author: string
  /** Author title and company — e.g. "Head of Sales · Lightdash" */
  role:   string
}

// ─── Color constants ──────────────────────────────────────────────────────────

/** Unrevealed word color — matches the dot background (#d3d8df / white-700) */
const COLOR_UNREVEALED = '#d3d8df'
/** Revealed word color — primary text (#1c1d1f / black-100) */
const COLOR_REVEALED   = '#1c1d1f'

// ─── Dot pattern background ───────────────────────────────────────────────────
// 1 × 1 px dot on a 10 × 10 grid — same density as attio.com

function DotBackground({ id }: { id: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      className="text-muted-strong-background absolute inset-0"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ReviewSection({ quote, author, role }: ReviewSectionProps) {
  const innerRef = useRef<HTMLDivElement>(null)

  // useId → unique SVG pattern id so multiple instances on the same page don't clash
  const uid       = useId()
  const patternId = `review-dots${uid.replace(/:/g, '-')}`

  // Words array — split on whitespace, punctuation stays attached to each word
  const words = quote.trim().split(/\s+/)

  const [revealedCount, setRevealedCount] = useState(0)

  // Track scroll while the inner section div is visible.
  // offset: 'start end' → scrollYProgress = 0 when section bottom enters viewport bottom
  //         'end start' → scrollYProgress = 1 when section top leaves viewport top
  const { scrollYProgress } = useScroll({
    target:  innerRef,
    offset:  ['start end', 'end start'],
  })

  // Normalize so all words are revealed at 50 % scroll progress
  // (roughly when the section is centered in the viewport).
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const normalized = Math.min(latest * 2, 1)
    setRevealedCount(Math.round(normalized * words.length))
  })

  return (
    <div className="container flex flex-1 flex-col max-lg:contents">
      <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke max-lg:border-none">

        <div
          ref={innerRef}
          className="relative flex min-h-[62svh] flex-col justify-center"
        >

          {/* ── Dot pattern background ──────────────────────────────────── */}
          <DotBackground id={patternId} />

          {/* ── Top spacer ──────────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-30 max-lg:h-25"
          >
            <div className="col-[2/-2] flex justify-between" />
          </div>

          {/* ── Quote + author ──────────────────────────────────────────── */}
          <div className="relative grid flex-1 grid-cols-12 items-center">
            <div className="col-[2/-2] flex flex-col items-center">

              {/* Word-by-word reveal — each word fades from light gray to dark */}
              <p className="max-w-[20em] text-pretty text-center text-heading-responsive-md-serif">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="transition-colors duration-600 ease-in-out"
                    style={{
                      color: i < revealedCount ? COLOR_REVEALED : COLOR_UNREVEALED,
                    }}
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>

              {/* Author name */}
              <p className="mt-12 text-center text-sm font-semibold text-secondary-foreground">
                {author}
              </p>
              {/* Author role / company */}
              <p className="mt-0.5 text-center text-sm text-secondary-foreground">
                {role}
              </p>

            </div>
          </div>

          {/* ── Bottom spacer ───────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-30 max-lg:h-25"
          >
            <div className="col-[2/-2] flex justify-between" />
          </div>

        </div>

      </div>
    </div>
  )
}
