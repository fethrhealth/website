'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AccordionItem } from '@/data/rewards'

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        'mt-1 shrink-0 transition-transform duration-200 ease-in-out',
        open && 'rotate-180',
      )}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M5.25 7.125 9 10.875l3.75-3.75"
      />
    </svg>
  )
}

// ─── Single accordion row ─────────────────────────────────────────────────────

function AccordionRow({
  item,
  isOpen,
  onToggle,
  isLast,
}: {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
}) {
  return (
    <div
      className={cn(
        'border-weak-stroke border-t pt-[23px] pb-[21px]',
        isLast && 'border-b',
      )}
    >
      <div className="-m-4 p-4">
        <h3>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            // Visually disable closing the active item (matches attio pattern)
            aria-disabled={isOpen ? 'true' : undefined}
            className="-mx-2 flex w-[calc(100%+16px)] cursor-pointer justify-between space-x-5 rounded-xl px-2 pt-[7px] pb-[7px] text-left text-lg outline-none transition-shadow duration-200 ease-in-out focus-visible:ring-[3px]"
          >
            <span>{item.title}</span>
            <ChevronIcon open={isOpen} />
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden will-change-[height]"
            >
              <div className="pt-[5px] pb-[7px] text-tertiary-foreground">
                {item.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Heading helper ───────────────────────────────────────────────────────────

/**
 * Renders "primary [break] muted" or "muted [break] primary" depending on props.
 * The muted part always renders in #727b84.
 */
// Splits a string on actual \n (from JS {}) or literal \n (from JSX "")
function splitLines(text: string) {
  return text.split(/\n|\\n/).map((part, i) => (
    <span key={i}>{i > 0 && <br />}{part}</span>
  ))
}

function HeadingContent({
  primary,
  muted,
  mutedFirst = false,
  lineBreak = false,
}: {
  primary: string
  muted?: string
  mutedFirst?: boolean
  lineBreak?: boolean
}) {
  const primaryEl = splitLines(primary)
  const mutedEl = muted
    ? <span style={{ color: '#727b84' }}>{splitLines(muted)}</span>
    : null
  const sep = lineBreak ? <br /> : null

  if (!muted) return <>{primaryEl}</>
  if (mutedFirst) return <>{mutedEl}{sep}{primaryEl}</>
  return <>{primaryEl}{sep}{mutedEl}</>
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function AccordionImageSection({
  // Header
  headerLayout = 'split',
  headingPrimary,
  headingMuted,
  headingMutedFirst = false,
  headingLineBreak = false,
  subheading,
  // Accordion
  items,
  defaultOpenIndex = 0,
  imagePosition = 'right',
}: {
  /**
   * 'split'    → heading left (col 1-5/10), subheading right (col 7-11/10)
   * 'centered' → both centered, max-w-xl
   */
  headerLayout?: 'split' | 'centered'
  /** Dark-colored part of the heading */
  headingPrimary: string
  /** Gray-colored part of the heading (#727b84) */
  headingMuted?: string
  /** Put the muted part before the primary (default: false) */
  headingMutedFirst?: boolean
  /** Insert a <br> between the two heading parts (default: false) */
  headingLineBreak?: boolean
  subheading: string
  items: AccordionItem[]
  /** Index of the item that starts open (default: 0) */
  defaultOpenIndex?: number
  /** Side the image appears on (default: 'right') */
  imagePosition?: 'left' | 'right'
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)
  const activeItem = items[openIndex]

  function handleToggle(i: number) {
    // Don't allow closing the active item (always one open)
    if (i !== openIndex) setOpenIndex(i)
  }

  return (
    <section>
      <div className="container">
        <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pt-16 lg:pt-24 xl:pt-32 pb-16 lg:pb-24 xl:pb-32">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
              {headerLayout === 'centered' ? (

                /* Centered layout */
                <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                  <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                    <div className="col-span-full">
                      <h2 className="text-pretty text-heading-responsive-md">
                        <HeadingContent
                          primary={headingPrimary}
                          muted={headingMuted}
                          mutedFirst={headingMutedFirst}
                          lineBreak={headingLineBreak}
                        />
                      </h2>
                    </div>
                    <p className="col-span-full text-pretty text-lg lg:text-xl">
                      {subheading}
                    </p>
                  </div>
                </div>

              ) : (

                /* Split layout */
                <div className="flex flex-col items-start">
                  <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                    <div className="col-span-full lg:col-span-5">
                      <h2 className="text-pretty text-heading-responsive-md">
                        <HeadingContent
                          primary={headingPrimary}
                          muted={headingMuted}
                          mutedFirst={headingMutedFirst}
                          lineBreak={headingLineBreak}
                        />
                      </h2>
                    </div>
                    <p className="col-span-full text-pretty text-lg lg:text-xl lg:col-start-7 lg:col-end-11">
                      {subheading}
                    </p>
                  </div>
                </div>

              )}
            </div>

            {/* ── Accordion + Image ───────────────────────────────────── */}
            <div className="grid grid-cols-12 gap-x-6 gap-y-10 xl:grid-cols-10">

              {/* Accordion column */}
              <div
                className={cn(
                  'col-span-full lg:col-span-6',
                  imagePosition === 'right'
                    ? 'xl:col-span-4'
                    : 'xl:col-start-7 xl:col-span-4 lg:order-last',
                )}
              >
                {items.map((item, i) => (
                  <AccordionRow
                    key={item.title}
                    item={item}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                    isLast={i === items.length - 1}
                  />
                ))}
              </div>

              {/* Image column — all images stay in the DOM; only the active one
                  is in flow (sizes the container). Inactive ones are absolute
                  so they never collapse the container during transitions. */}
              <div
                className={cn(
                  'relative col-span-full lg:col-span-6',
                  imagePosition === 'right'
                    ? 'xl:col-start-6 xl:col-end-11'
                    : 'xl:col-start-1 xl:col-span-5 lg:order-first',
                )}
              >
                {items.map((item, i) => (
                  <div
                    key={item.imageSrc}
                    aria-hidden={i !== openIndex}
                    className={cn(
                      'transition-opacity duration-200 ease-in-out',
                      i === openIndex
                        ? 'opacity-100'
                        : 'pointer-events-none absolute inset-0 opacity-0',
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={i === openIndex ? (item.imageAlt ?? '') : ''}
                      width={item.imageWidth ?? 2272}
                      height={item.imageHeight ?? 1704}
                      className="rounded-3xl w-full"
                    />
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
