'use client'

/**
 * ScrollAccordionSection
 *
 * Scroll-driven sticky accordion. The outer container is N×100svh tall so
 * that each item gets one full viewport-height of scroll distance.
 *
 * Desktop: sticky panel — left side shows heading + accordion list with a
 *   fill-progress bar on the active item; right side shows the active image.
 *
 * Mobile: sticky panel — full-width image above, segmented progress bars
 *   below, active title + description beneath those.
 */

import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent, animate } from 'framer-motion'
import { cn } from '@/lib/utils'
import Divider from '../ui/divider'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScrollAccordionItem {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
}

export interface ScrollAccordionSectionProps {
  heading: string
  subheading: string
  items: ScrollAccordionItem[]
}

// ─── Shared SVG helpers ───────────────────────────────────────────────────────

function HDash() {
  return (
    <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

function VDash({ className }: { className?: string }) {
  return (
    <svg width="1" height="100%" className={`text-subtle-stroke ${className ?? ''}`} aria-hidden>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

function DotGrid({ id }: { id: string }) {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 size-full text-muted-strong-bg" aria-hidden>
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

export function ScrollAccordionSection({
  heading,
  subheading,
  items,
}: ScrollAccordionSectionProps) {
  const n = items.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [barProgress, setBarProgress] = useState(0) // 0–100
  // Holds the in-progress framer-motion scroll animation so we can cancel it
  // before starting a new one (prevents browser smooth-scroll race conditions).
  const scrollAnimRef = useRef<ReturnType<typeof animate> | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const scaled = latest * n
    const idx = Math.min(Math.floor(scaled), n - 1)
    setActiveIndex(idx)
    // Last item stays at 100% so the bar stays filled at the end
    setBarProgress(idx === n - 1 ? 100 : (scaled - idx) * 100)
  })

  /**
   * Scroll to the position where item `index` becomes active.
   *
   * Uses framer-motion's `animate()` instead of `window.scrollTo({ behavior:'smooth' })`
   * so the animation is cancellable — calling scrollToItem() a second time while
   * the first is still running stops the first immediately and starts fresh.
   * This prevents the race condition where the browser blends two smooth-scrolls
   * and lands at the wrong scroll position.
   *
   * Container absolute offset is computed via offsetTop traversal (not
   * getBoundingClientRect) so it is stable regardless of current scroll state.
   */
  const scrollToItem = useCallback((index: number) => {
    if (!containerRef.current) return

    // Stop any in-flight animation before reading layout — ensures scrollY and
    // getBoundingClientRect() are in a consistent, stable state.
    scrollAnimRef.current?.stop()

    const rect = containerRef.current.getBoundingClientRect()

    // rect.top + scrollY = absolute document offset (stable; the two cancel out
    // as scroll changes, so this is safe to read immediately after .stop()).
    const containerAbsTop = rect.top + window.scrollY

    // Use getBoundingClientRect().height (fractional pixels) so our scroll range
    // matches exactly what framer-motion uses for scrollYProgress.  offsetHeight
    // rounds to an integer, which makes targetY land 0.5–1 px short of the item
    // boundary — enough for Math.floor(progress * n) to stay on the previous item.
    const range = rect.height - window.innerHeight

    // +2 px buffer: even with exact float height, progress = index/n can round to
    // 0.9999… * index/n due to IEEE-754, causing Math.floor to return index-1.
    // Two pixels is imperceptible in barProgress (< 0.2% for typical page heights).
    const targetY = containerAbsTop + (index / n) * range + 2

    scrollAnimRef.current = animate(window.scrollY, targetY, {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => window.scrollTo(0, v),
    })
  }, [n])

  const activeItem = items[activeIndex] ?? items[0]!

  return (
    <div className="container flex flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">
        <div
          ref={containerRef}
          className="relative flex w-full flex-col"
          style={{ height: `${n * 100}svh` }}
        >

          {/* ── DESKTOP sticky panel (lg+) ─────────────────────────────────── */}
          <div className="sticky top-[var(--site-header-height)] flex w-full flex-col items-center justify-between h-[calc(100svh-var(--site-header-height))] py-[clamp(40px,5svh,160px)] max-lg:hidden">

            <HDash />

            <VDash className="min-h-10 flex-1" />

            {/* Content: left accordion + right image */}
            <div className="relative grid h-[540px] w-full grid-cols-12">

              {/* Left: heading + animated accordion */}
              <div className="col-[2/6] flex flex-col h-full overflow-hidden">
                <div className="max-w-[20em] text-pretty text-heading-responsive-sm text-start mix-blend-multiply dark:mix-blend-screen">
                  <h2 className="inline text-pretty">{heading}</h2>{' '}
                  <p className="inline text-pretty font-medium text-black-800">{subheading}</p>
                </div>

                {/* Spacer — pushes accordion to bottom without absolute positioning */}
                <div className="flex-1" />

                <div className="flex flex-col">
                  {items.map((item, i) => {
                    const isActive = i === activeIndex
                    return (
                      <div key={item.title} className="flex flex-col pt-7">
                        <button
                          type="button"
                          onClick={() => scrollToItem(i)}
                          className={cn(
                            'group w-fit cursor-pointer text-left transition-colors duration-200',
                            isActive ? 'text-fg-primary' : 'text-fg-tertiary hover:text-fg-primary',
                          )}
                        >
                          <h3 className="font-semibold text-lg lg:max-xl:text-base">
                            <span className="attio-group-hover-underline">{item.title}</span>
                          </h3>
                        </button>

                        {/* Animated description + progress bar */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
                              animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                              exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 text-balance text-accent-foreground lg:max-xl:text-sm">
                                {item.description}
                              </p>

                              {/* Fill bar */}
                              <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-subtle-stroke">
                                <div
                                  className="size-full bg-accent-foreground"
                                  style={{ transform: `translateX(-${100 - barProgress}%)` }}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right: image panel */}
              <div className="relative col-[7/-1] overflow-hidden border-y border-subtle-stroke">
                <DotGrid id="scroll-acc-desktop" />

                {/* Crossfading image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="absolute inset-0 flex items-center justify-center p-6"
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image
                      src={activeItem.image}
                      alt=""
                      width={activeItem.imageWidth}
                      height={activeItem.imageHeight}
                      loading="eager"
                      className="max-h-[560px] max-w-[560px] size-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Center vertical rule */}
                <svg width="1" height="100%" className="text-subtle-stroke absolute inset-y-0 left-1/2 -translate-x-1/2" aria-hidden>
                  <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
                </svg>

                {/* Small connector dashes at left edge of center rule */}
                <div className="absolute inset-y-0 right-1/2 flex w-5 flex-col justify-between" aria-hidden>
                  <svg width="100%" height="1" className="text-subtle-stroke">
                    <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                  </svg>
                  <svg width="100%" height="1" className="text-subtle-stroke">
                    <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <VDash className="min-h-10 flex-1" />

            <HDash />
          </div>

          {/* ── MOBILE: static header — only on short screens ──────────────── */}
          <header className="grid grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15 lg:hidden [@media(min-height:1000px)]:hidden">
            <div className="col-[2/-2] max-w-[20em] text-pretty text-heading-responsive-sm text-start mix-blend-multiply dark:mix-blend-screen">
              <h2 className="inline text-pretty">{heading}</h2>{' '}
              <p className="inline text-pretty font-medium text-black-800">{subheading}</p>
            </div>
          </header>

          {/* ── MOBILE sticky panel ─────────────────────────────────────────── */}
          <div className="sticky top-[var(--site-header-height)] flex w-full flex-col items-center justify-between h-[calc(100svh-var(--site-header-height))] py-[clamp(40px,5svh,160px)] lg:hidden">

            {/* Heading — only on tall screens */}
            <header className="grid w-full grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15 [@media(max-height:1000px)]:hidden">
              <div className="col-[2/-2] max-w-[20em] text-pretty text-heading-responsive-sm text-start mix-blend-multiply dark:mix-blend-screen">
                <h2 className="inline text-pretty">{heading}</h2>{' '}
                <p className="inline text-pretty font-medium text-black-800">{subheading}</p>
              </div>
            </header>

            <HDash />

            {/* Image */}
            <div className="relative mt-8 aspect-square w-full flex-1 overflow-hidden">
              <DotGrid id="scroll-acc-mobile" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={activeItem.image}
                    alt=""
                    width={activeItem.imageWidth}
                    height={activeItem.imageHeight}
                    loading="eager"
                    className="size-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Segmented progress bars + active item text */}
            <div className="relative grid w-full grid-cols-12">
              <div className="relative col-[2/-2]">
                <div className="flex flex-col pb-8">

                  {/* Progress bars row — also act as click targets to jump to each item */}
                  <div className="flex gap-1.5 pt-8">
                    {items.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => scrollToItem(i)}
                        aria-label={`Go to ${item.title}`}
                        className="h-3 w-full cursor-pointer -my-1.5 py-1.5"
                      >
                        <div
                          className="h-0.5 w-full overflow-hidden rounded-full bg-subtle-stroke"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={i < activeIndex ? 100 : i === activeIndex ? Math.round(barProgress) : 0}
                        >
                          <div
                            className="size-full bg-accent-foreground"
                            style={{
                              transform:
                                i < activeIndex
                                  ? 'translateX(0%)'
                                  : i === activeIndex
                                  ? `translateX(-${100 - barProgress}%)`
                                  : 'translateX(-100%)',
                            }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Active item text */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      className="w-full pt-5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold text-lg text-secondary-foreground">
                        {activeItem.title}
                      </h3>
                      <p className="mt-1 text-sm text-accent-foreground">
                        {activeItem.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Divider/>
    </div>
  )
}
