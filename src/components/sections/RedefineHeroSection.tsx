'use client'

/**
 * RedefineHeroSection
 *
 * Full-viewport hero for /redefine.
 * Reproduces the Attio word-by-word blur-reveal technique:
 *   – Each token (word, SVG, overline) animates from blur(8px) opacity-0
 *     to blur(0px) opacity-1 with staggered delays.
 *   – Text uses bg-clip-text + transparent color so filter:blur works on
 *     the gradient background (the standard CSS trick for blurring clip-text).
 *   – Animation fires once when the header enters the viewport.
 *
 * Layout
 *   min-h: 100vh − navbar (--site-header-height = 60 px)
 *   max-w: 2xl (672 px), left-aligned, px-6 matching container padding
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Design tokens ─────────────────────────────────────────────────────────────
/** Solid gradient — required so filter:blur renders on clip-text properly */
const GRADIENT = 'linear-gradient(to right, #1c1d1f, #1c1d1f)'
const EASE = [0.25, 0.4, 0.25, 1] as const
const DURATION = 0.65

/** Returns Framer Motion props for a single blur-in token */
function blurProps(delay: number, isInView: boolean) {
  return {
    initial: { filter: 'blur(8px)', opacity: 0 },
    animate: isInView ? { filter: 'blur(0px)', opacity: 1 } : {},
    transition: { duration: DURATION, delay, ease: EASE },
  }
}

// ─── Words ─────────────────────────────────────────────────────────────────────
const H1_WORDS = ['Frictionless', 'data', 'exchange']

// ─── Component ─────────────────────────────────────────────────────────────────

export function RedefineHeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <header
      ref={ref}
      className="relative z-[1] flex min-h-[calc(100vh-var(--site-header-height))] w-full max-w-2xl flex-col justify-center px-6 pb-32"
    >
      {/* ── Overline ───────────────────────────────────────────────────────── */}
      <motion.p
        className="text-overline"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0, ease: EASE }}
      >
        / Redefining Integration
      </motion.p>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="pt-20">

        {/* Row 1: "CRM" + "/Si. abbr." ──────────────────────────────────── */}
        <div className="flex flex-wrap xl:flex-nowrap items-baseline gap-x-2">

          {/* "Integration" — gradient-clipped text so filter:blur renders correctly */}
          <motion.p
            className="bg-fixed bg-clip-text text-heading-responsive-md text-transparent"
            style={{ backgroundImage: GRADIENT }}
            {...blurProps(0.08, isInView)}
          >
            Integration
          </motion.p>

          {/* IPA pronunciation mark + "abbr." in serif */}
          <div className="inline-flex items-baseline gap-2 text-heading-responsive-md-serif">
            <motion.p
              className="bg-fixed bg-clip-text text-transparent text-nowrap"
              style={{ backgroundImage: GRADIENT }}
              {...blurProps(0.16, isInView)}
            >
              /ˌɪn-tə-ˈɡrā-shən/
            </motion.p>

            <motion.p {...blurProps(0.24, isInView)}>
              abbr.
            </motion.p>
          </div>
        </div>

        {/* Row 2: h1 — word-by-word blur-in ─────────────────────────────── */}
        <h1 className="pt-2 text-heading-responsive-md max-lg:leading-[1.2]">
          {H1_WORDS.map((word, i) => (
            <motion.span
              key={word}
              className="inline bg-fixed bg-clip-text text-transparent"
              style={{ backgroundImage: GRADIENT }}
              {...blurProps(0.32 + i * 0.08, isInView)}
            >
              {word}{i < H1_WORDS.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </h1>

      </div>
    </header>
  )
}
