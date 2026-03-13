'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { PromptCard } from '@/data/platform-ask'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PromptLibrarySectionProps {
  /** Main heading — default shown below */
  heading?:    string
  /** Paragraph below the heading */
  subheading?: string
  /**
   * Cards for the first row (slides LEFT as user scrolls down).
   * Pass a slice of PROMPT_CARDS or the full array — cards are duplicated
   * internally to fill the viewport width.
   */
  row1: PromptCard[]
  /**
   * Cards for the second row (slides RIGHT as user scrolls down).
   * Can overlap with row1 or be a different set.
   */
  row2: PromptCard[]
}

// ─── Background grid lines ────────────────────────────────────────────────────
// ~100 vertical 1-px SVG lines spanning full section height,
// faded out at the top via mask-t-to-80% so they don't compete with the heading.

function GridLines() {
  return (
    <div
      className="container pointer-events-none absolute inset-0 flex justify-around mask-t-to-80%"
      aria-hidden="true"
    >
      {Array.from({ length: 100 }, (_, i) => (
        <svg key={i} width="1" height="100%" className="shrink-0 opacity-60">
          <line
            x1="0.5" y1="0" x2="0.5" y2="100%"
            stroke="#e4e7ec"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  )
}

// ─── Single prompt card ───────────────────────────────────────────────────────

function PromptCardItem({ card }: { card: PromptCard }) {
  return (
    <div className="w-64 shrink-0 rounded-xl border border-black-100/5 backdrop-blur-xs">
      <div className="flex flex-col overflow-hidden rounded-[calc(12px-1px)] bg-white-100 shadow-attio-4">

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 p-3">

          {/* Icon */}
          <Image
            src={card.icon}
            alt=""
            width={80}
            height={80}
            className="size-5 object-contain"
          />

          {/* Title + description — fixed h-13 keeps all cards the same height */}
          <div className="flex h-13 flex-col gap-0.5 pr-9">
            <p className="truncate text-sm font-medium leading-5 tracking-[-0.14px] text-[#242629]">
              {card.title}
            </p>
            <p className="line-clamp-2 text-xs leading-4 text-[rgba(0,0,0,0.4)]">
              {card.description}
            </p>
          </div>

        </div>

        {/* ── Author / source footer ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 px-3 py-2">
          <Image
            src={card.authorLogo}
            alt=""
            width={16}
            height={16}
            className="size-4 rounded-[30%] object-cover"
          />
          <span className="text-xs text-accent-foreground">{card.authorName}</span>
        </div>

      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function PromptLibrarySection({
  heading    = 'From one expert to everyone.',
  subheading = 'Best practice becomes standard practice with the prompt library.',
  row1,
  row2,
}: PromptLibrarySectionProps) {

  const sectionRef = useRef<HTMLElement>(null)

  // Track scroll progress while the section is visible in the viewport.
  // offset: ['start end', 'end start'] → 0 when section bottom hits viewport top,
  //                                       1 when section top hits viewport bottom.
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })

  // Smooth the raw scroll value with a spring so the rows lag behind scroll
  // and ease in/out naturally instead of moving in direct lockstep.
  // stiffness↓ = more lag, damping↑ = less overshoot.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping:   25,
    restDelta: 0.001,
  })

  // Row 1 slides LEFT as user scrolls down (0 → -200px).
  // Row 2 slides RIGHT as user scrolls down (-400px → -200px).
  // Row 2 starts pre-offset so the left edge always has cards (never blank space).
  const row1X = useTransform(smoothProgress, [0, 1], ['0px',    '-200px'])
  const row2X = useTransform(smoothProgress, [0, 1], ['-400px', '-200px'])

  // Duplicate each row's cards so there are enough to fill any viewport width.
  const row1Cards = [...row1, ...row1]
  const row2Cards = [...row2, ...row2]

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-1 flex-col overflow-hidden bg-primary-background"
    >
      {/* ── Decorative background grid lines ─────────────────────────────── */}
      <GridLines />

      {/* ── Container ────────────────────────────────────────────────────── */}
      <div className="container relative border-x border-subtle-stroke overflow-hidden">

          {/* ── Header ───────────────────────────────────────────────────── */}
          <header className="relative grid grid-cols-12 justify-items-center pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15">
            <div className="col-[2/-2] flex max-w-lg flex-col gap-4 text-center mix-blend-multiply dark:mix-blend-screen max-lg:gap-3">
              <h2 className="text-pretty text-heading-responsive-md">
                {heading}
              </h2>
              <p className="text-pretty text-xl text-tertiary">
                {subheading}
              </p>
            </div>
          </header>

          {/* ── Scrolling card rows ───────────────────────────────────────── */}
          {/*
           * Both rows extend far beyond the viewport width (cards × 2).
           * overflow-hidden on the <section> clips the excess.
           * The translateX values are driven by scroll position via Framer Motion:
           *   Row 1 → moves LEFT  on scroll-down, RIGHT on scroll-up
           *   Row 2 → moves RIGHT on scroll-down, LEFT  on scroll-up
           */}
          <div className="flex flex-col gap-y-5 pb-40 max-lg:pb-20">

            {/* Row 1 — slides left ─────────────────────────────────────── */}
            <motion.div
              className="flex flex-row gap-x-5"
              style={{ x: row1X }}
            >
              {row1Cards.map((card, i) => (
                <PromptCardItem key={i} card={card} />
              ))}
            </motion.div>

            {/* Row 2 — slides right ────────────────────────────────────── */}
            <motion.div
              className="flex flex-row gap-x-5"
              style={{ x: row2X }}
            >
              {row2Cards.map((card, i) => (
                <PromptCardItem key={i} card={card} />
              ))}
            </motion.div>

          </div>

      </div>

    </section>
  )
}
