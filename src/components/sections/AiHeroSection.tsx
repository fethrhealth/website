'use client'

/**
 * AiHeroSection
 *
 * Hero for /platform/ai — animations match attio.com source exactly:
 * - AttioIcon: animated circle radii via useAnimate sequence
 * - Prompt text: AnimatePresence word swap with per-letter 3D arc (transformTemplate)
 * - Response card: typewriter effect, advances index on completion
 * - State: null (hidden) → 0 → 1 → 2 → 0 ...
 */

import { useCallback, useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { DemoRequestForm } from '@/components/ui/DemoRequestForm'
import { TalkToSalesDialog } from '@/components/ui/TalkToSalesDialog'
import {
  AI_HERO_EYEBROW,
  AI_HERO_HEADING,
  AI_HERO_SUBHEADING,
  AI_HERO_CTA_PRIMARY,
  AI_HERO_CTA_PRIMARY_HREF,
  AI_HERO_PROMPTS,
  AI_HERO_PLACEHOLDERS,
  AI_HERO_RESPONSES,
  AI_HERO_WIDGET_BADGE,
} from '@/data/ai-hero'

// ─── Icons ─────────────────────────────────────────────────────────────────────

function IconBlue() {
  return (
    <svg width="25" height="25" fill="none">
      <rect x=".998" y="1" width="22.8" height="22.8" rx="6.6" fill="#E5EEFF" />
      <rect x=".998" y="1" width="22.8" height="22.8" rx="6.6" stroke="#D6E5FF" strokeWidth="1.2" />
      <path
        d="m10.648 12.718.108.194c.36.65.54.975.778 1.085a.8.8 0 0 0 .657.005c.24-.106.426-.429.795-1.074l1.162-2.028"
        stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round"
      />
      <rect x="7.648" y="7.65" width="9.5" height="9.5" rx="2"
        stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconGreen() {
  const filterId = useId()
  const clipId = useId()
  return (
    <svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={`url(#${filterId})`}>
        <rect x=".398" y=".4" width="24" height="24" rx="5" fill="#DDF9E4" />
        <rect x=".898" y=".9" width="23" height="23" rx="4.5" stroke="#C7F4D3" />
        <g clipPath={`url(#${clipId})`} stroke="#0FC27B" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6.382 12.4 2.254-2.253M6.382 12.4l2.254 2.254m-2.254-2.254h4.016m5.747-2.254 2.253 2.253m-2.253 2.255 2.253-2.253V12.4v0m0 0h-4M12.415 6.39l-2.262 2.248m2.262-2.248 2.248 2.262M12.415 6.39v4.01m-.028 8.01-2.248-2.262m2.248 2.262 2.262-2.248m-2.262 2.248V14.4" />
        </g>
      </g>
      <defs>
        <clipPath id={clipId}>
          <path fill="#fff" transform="translate(5.398 5.4)" d="M0 0h14v14H0z" />
        </clipPath>
        <filter id={filterId} x="-39.602" y="-39.6" width="104" height="104" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="20" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_622_58109" />
          <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_622_58109" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

function IconYellow() {
  const clipId = useId()
  const maskId = useId()
  return (
    <svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x=".998" y="1" width="22.8" height="22.8" rx="6.6" fill="#FFF3CC" />
      <rect x=".998" y="1" width="22.8" height="22.8" rx="6.6" stroke="#FFEBAD" strokeWidth="1.2" />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M8.619 17.5h7.075c1.053 0 1.58 0 1.882-.221a1.15 1.15 0 0 0 .466-.814c.038-.373-.229-.827-.762-1.735l-3.538-6.027c-.521-.89-.782-1.334-1.121-1.484a1.15 1.15 0 0 0-.93 0c-.339.15-.6.595-1.121 1.484L7.032 14.73c-.533.908-.8 1.362-.762 1.735.033.325.202.621.466.814.303.221.83.221 1.883.221ZM12.18 11.32v1.676"
          stroke="#F5B900" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
        />
        <mask id={maskId} fill="#fff">
          <circle cx="12.157" cy="14.809" r=".7" />
        </mask>
        <circle cx="12.157" cy="14.809" fill="#F5B900" r=".7" />
        <path
          d="M12.075 14.809c0-.046.037-.083.082-.083v1.565c.819 0 1.482-.664 1.482-1.482h-1.564Zm.082-.083c.046 0 .082.037.082.083h-1.564c0 .818.663 1.482 1.482 1.482v-1.565Zm.082.083a.082.082 0 0 1-.082.082v-1.565c-.819 0-1.482.664-1.482 1.483h1.564Zm-.082.082a.082.082 0 0 1-.082-.082h1.564c0-.819-.663-1.483-1.482-1.483v1.565Z"
          fill="#F5B900" mask={`url(#${maskId})`}
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <path fill="#fff" transform="translate(5.398 5.4)" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function getIcon(idx: number) {
  if (idx === 0) return <IconBlue />
  if (idx === 1) return <IconGreen />
  return <IconYellow />
}

// ─── Attio animated logo — circle radii cycle via useAnimate sequence ─────────

function AttioIcon({ className }: { className?: string }) {
  const [scope, animate] = useAnimate()

  const runAnimation = useCallback(() => {
    const u = { at: '-0.1', duration: 0.25, ease: 'linear' } as const
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    animate(
      // Each step: [selector, {svgAttr}, timingOptions]
      // 'at: -0.1' overlaps each step 100ms with the previous
      [
        ['#ai-top', { r: 1.465 }, u],
        ['#ai-tr', { r: 2.07 }, u],
        ['#ai-bot', { r: 2.07 }, u],
        ['#ai-tl', { r: 1.465 }, u],
        ['#ai-br', { r: 2.07 }, u],
        ['#ai-bl', { r: 2.795 }, u],
        ['#ai-top', { r: 2.07 }, u],
        ['#ai-tr', { r: 1.465 }, u],
        ['#ai-bot', { r: 1.465 }, u],
        ['#ai-tl', { r: 2.795 }, u],
        ['#ai-bl', { r: 2.07 }, u],
        ['#ai-br', { r: 2.795 }, u],
      ],
      { repeat: Infinity }
    )
  }, [animate])

  useEffect(() => { runAnimation() }, [runAnimation])

  return (
    <motion.svg ref={scope} className={className} width="24" height="24" fill="none">
      <motion.circle id="ai-top" cx={11.86} cy={4.57} fill="#232529" r="2.07" />
      <motion.circle id="ai-tr" cx={18.455} cy={8.435} fill="#232529" r="1.465" />
      <motion.circle id="ai-br" cx={18.705} cy={16.255} fill="#232529" r="2.795" />
      <motion.circle id="ai-bot" cx={11.865} cy={20.035} fill="#232529" r="1.465" />
      <motion.circle id="ai-bl" cx={5.3} cy={16.27} fill="#232529" r="2.07" />
      <motion.circle id="ai-tl" cx={5.295} cy={8.405} fill="#232529" r="2.795" />
      <motion.circle cx={11.92} cy={12.34} fill="#232529" r="1.86" />
    </motion.svg>
  )
}

// ─── Prompt text — AnimatePresence word swap + per-letter 3D arc ──────────────

function PromptText({ index }: { index: number }) {
  return (
    <div className="grid items-center overflow-hidden *:col-start-1 *:row-start-1">
      {/* Invisible spacers reserve max width */}
      {AI_HERO_PROMPTS.map(p => (
        <div key={p} className="invisible whitespace-pre font-medium text-[16px] text-primary-foreground tracking-[-0.32px]">
          {p}
        </div>
      ))}

      {/* Active prompt — keyed so AnimatePresence triggers exit/enter on swap */}
      <AnimatePresence initial={false}>
        <div key={AI_HERO_PROMPTS[index]} className="flex">
          {AI_HERO_PROMPTS[index]!.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block whitespace-pre font-medium text-[16px] text-primary-foreground tracking-[-0.32px]"
              style={{ lineHeight: '20px' }}
              initial={{ opacity: 0, rotateX: -88 }}
              animate={{
                opacity: 1,
                rotateX: 0,
                transition: { delay: 0.02 * i, duration: 0.8, ease: [0.83, 0, 0.17, 1] },
              }}
              exit={{
                opacity: 0,
                rotateX: 88,
                transition: {
                  delay: 0.02 * i,
                  duration: 0.8,
                  ease: [0.83, 0, 0.17, 1],
                  opacity: { delay: 0.02 * i, duration: 0.64, ease: [0.83, 0, 0.17, 1] },
                },
              }}
              // 3D arc: rotateX + sin/cos translateY/Z gives letters a curved path
              transformTemplate={({ rotateX }) => {
                const rx = rotateX == null ? 0
                  : typeof rotateX === 'string'
                    ? parseFloat((rotateX as string).replace('deg', ''))
                    : (rotateX as number)
                if (!rx) return ''
                const ty = 10 * Math.sin(rx * Math.PI / 180)
                const tz = -5 + 10 * Math.cos(rx * Math.PI / 180)
                return `rotateX(${rotateX}${typeof rotateX === 'number' ? 'deg' : ''}) translateY(${ty}px) translateZ(${tz}px)`
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

// ─── Response card — typewriter, calls onEnd when done ───────────────────────

function ResponseCard({
  icon,
  text,
  onEnd,
}: {
  icon: React.ReactNode
  text: string
  onEnd: () => void
}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let cancelled = false
    let id: ReturnType<typeof setTimeout>

    const type = (current: string) => {
      if (cancelled) return
      if (current.length >= text.length) {
        id = setTimeout(() => { if (!cancelled) onEnd() }, 1300)
        return
      }
      // Space after cursor → slightly longer pause (like natural typing)
      const nextChar = text[current.length + 1] ?? ''
      const delay = nextChar === ' ' ? 40 * Math.random() + 40 : 20 * Math.random() + 40
      id = setTimeout(() => {
        if (cancelled) return
        const next = text.slice(0, current.length + 1)
        setDisplayed(next)
        type(next)
      }, delay)
    }

    // Initial delay before typing starts
    id = setTimeout(() => type(''), 1800)
    return () => { cancelled = true; clearTimeout(id) }
  }, [text, onEnd])

  return (
    <>
      <div className="shrink-0">{icon}</div>
      <span className="truncate font-medium text-[15px] text-black-500 leading-[19px] tracking-[-0.24px]">
        {displayed}
      </span>
    </>
  )
}

// ─── Placeholder text below divider — swaps per prompt ───────────────────────

function PlaceholderText({ index }: { index: number }) {
  return (
    <div className="grid items-center overflow-hidden *:col-start-1 *:row-start-1">
      {/* Invisible spacers to reserve max width across all placeholder texts */}
      {AI_HERO_PLACEHOLDERS.map(p => (
        <div
          key={p}
          aria-hidden
          className="invisible truncate font-medium text-[14px] leading-[19px]"
        >
          {p}
        </div>
      ))}

      {/* Active placeholder — fades in/out on prompt change */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={AI_HERO_PLACEHOLDERS[index]}
          initial={{ filter: 'blur(4px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } }}
          exit={{   filter: 'blur(4px)', opacity: 0, transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] } }}
          className="origin-left truncate font-medium text-[#9FA1A7] text-[14px] leading-[19px]"
        >
          {AI_HERO_PLACEHOLDERS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function AiHeroSection() {
  // null = widget hidden (initial state), number = active prompt index
  const [index, setIndex] = useState<number | null>(null)
  // gridReady: true once FlickeringGrid fires its first animation frame
  const [gridReady, setGridReady] = useState(false)

  // Start the animation after 3s
  useEffect(() => {
    const t = setTimeout(() => setIndex(0), 3000)
    return () => clearTimeout(t)
  }, [])

  // Called by ResponseCard when typewriter finishes — advance to next prompt
  const handleEnd = useCallback((current: number) => {
    setIndex((current + 1) % AI_HERO_RESPONSES.length)
  }, [])

  const headerContent = (
    <>
      <div className="inline-block w-fit rounded-[13px] border border-weak-stroke bg-primary-background px-3 py-1.5 font-medium text-[13px]/[1.4em] text-secondary-foreground mb-6">
        <h1>{AI_HERO_EYEBROW}</h1>
      </div>
      <h2 className="max-w-[15em] text-balance text-heading-responsive-lg max-lg:text-center">
        {AI_HERO_HEADING}
      </h2>
      <p className="mt-4 max-w-xl text-balance text-lg text-secondary-foreground lg:text-xl max-lg:text-center">
        {AI_HERO_SUBHEADING}
      </p>
      <div className="flex w-full items-center justify-center lg:justify-start gap-x-2.5 gap-y-2 mt-6 max-lg:justify-center max-md:flex-col max-md:items-center">

        {/* Desktop: Start for free — hidden on mobile */}
        <Link
          href={AI_HERO_CTA_PRIMARY_HREF}
          className="button-primary relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
        >
          {AI_HERO_CTA_PRIMARY}
        </Link>

        {/* Desktop: Talk to sales — hidden on mobile */}
        <TalkToSalesDialog
          source="ai-hero"
          className="button-outline relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
        />

        {/* Mobile: email form + ghost CTA — hidden on md+ */}
        <DemoRequestForm
          source="ai-hero"
          className="max-w-xs md:hidden"
        />

      </div>
    </>
  )

  return (
    <div className="container">
      <div className="grid grid-cols-12 items-center">

        {/* ── Left header — xl only ──────────────────────────────────────── */}
        <header className="flex w-full flex-col pt-30 pb-15 max-xl:pt-25 max-lg:pt-20 max-lg:items-center col-[2/7] pr-6 max-xl:hidden">
          {headerContent}
        </header>

        {/* ── Left header — below xl ─────────────────────────────────────── */}
        <header className="flex w-full flex-col pt-30 pb-15 max-xl:pt-25 max-lg:pt-20 items-center col-[2/-2] xl:hidden">
          {headerContent}
        </header>

        {/* ── Right: animated AI widget panel ───────────────────────────── */}
        <div className="col-[7/-1] xl:py-20 max-xl:col-[2/-2]">
          {/*
            ai-hero-gradient-animate drives --ai-hero-box-gradient-angle for all children.
            Structure matches attio exactly:
              flex center → aspect-square container → gradient+canvas grid (stacked)
              + absolute inset-0 overlay for the cards
          */}
          <div className="ai-hero-gradient-animate relative w-full overflow-hidden rounded-2xl bg-white-0">
            <div className="relative flex w-full items-center justify-center">

              {/* Square canvas area — matches attio's aspect-square lg:w-[586px] */}
              <div className="relative aspect-square w-full md:h-[400px] lg:h-[440px] lg:w-[586px] xl:h-auto">

                {/*
                  Gradient + FlickeringGrid stacked in a CSS grid (both col-start-1 row-start-1).
                  3px inset matches attio's canvas offset (left:3px top:3px).
                */}
                <div
                  className="absolute inset-[3px] grid overflow-hidden *:col-start-1 *:row-start-1"
                  style={{
                    // Two linear gradients intersected: fades all 4 edges.
                    // Tune the % values:
                    //   horizontal: "20%" = how far from left/right edge the fade ends
                    //   vertical:   "25%" = how far from top/bottom edge the fade ends
                    WebkitMaskImage: [
                      'linear-gradient(to right,  transparent 0%, black 20%, black 80%, transparent 100%)',
                      'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
                    ].join(', '),
                    maskImage: [
                      'linear-gradient(to right,  transparent 0%, black 20%, black 80%, transparent 100%)',
                      'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
                    ].join(', '),
                    WebkitMaskComposite: 'destination-in',
                    maskComposite: 'intersect',
                  }}
                >
                  {/*
                    Gradient hidden (opacity-0) until FlickeringGrid fires onReady.
                    Fades in over 700ms so gradient and dots appear together.
                  */}
                  <div className={cn(
                    'm-0.5 h-[calc(100%-4px)] w-[calc(100%-4px)] overflow-hidden transition-opacity duration-700',
                    gridReady ? 'opacity-100' : 'opacity-0',
                  )}>
                    <div className="ai-hero-box-gradient h-full w-full blur-[20px]" />
                  </div>

                  {/* Canvas: starts all-white, dots gradually appear as squares flicker to lower opacity */}
                  <FlickeringGrid
                    className="relative h-full w-full"
                    maskMode
                    maxOpacity={0.95}
                    minOpacity={0.1}
                    flickerChance={0.9}
                    squareSize={4}
                    gridGap={6}
                    onReady={() => setGridReady(true)}
                  />
                </div>
              </div>

              {/* Widget overlay — absolute over the entire flex container */}
              <div className="absolute inset-0 z-10">
              <div className="absolute top-1/2 left-1/2 w-full max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 sm:max-w-[396px]">

                {/*
                  Flex column container.
                  -translate-y-6 only applies once index is set (animated in via CSS transition).
                  position:relative so the absolute response card anchors here.
                */}
                <div
                  className={cn('flex flex-col items-center gap-3', {
                    '-translate-y-6 [transition:transform_700ms_620ms_cubic-bezier(0.65,0,0.35,1)]': index !== null,
                  })}
                >

                  {/* ── Response card — absolute, below request card ── */}
                  <AnimatePresence>
                    {index !== null && (
                      <motion.div
                        key={AI_HERO_RESPONSES[index]}
                        initial={{ filter: 'blur(4px)', opacity: 0, y: -40 }}
                        animate={{
                          filter: 'blur(0px)',
                          opacity: 1,
                          y: 0,
                          transition: {
                            filter: { delay: 0.82, duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                            opacity: { delay: 0.82, duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                            y: { delay: 0.82, duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                          },
                        }}
                        exit={{
                          filter: 'blur(4px)',
                          opacity: 0,
                          scale: 0.8,
                          y: -80,
                          transition: {
                            filter: { delay: 0.2, duration: 0.4, ease: [0.32, 0, 0.67, 0] },
                            opacity: { delay: 0.3, duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                            scale: { duration: 0.5, ease: [0.32, 0, 0.67, 0] },
                            y: { duration: 1, ease: [0.64, -0.37, 0.1, 0.6] },
                          },
                        }}
                        className={cn(
                          'ai-hero-widget-gradient-response',
                          'absolute top-[calc(100%+12px)]',
                          'flex w-full items-center gap-x-[10px] lg:w-[calc(100%-40px)]',
                          'rounded-xl px-3 py-[11px]',
                          'shadow-[0px_4px_4px_-6px_rgba(28,40,64,0.14),0px_8px_8px_-8px_rgba(28,40,64,0.10),0px_10px_30px_-4px_rgba(28,40,64,0.10),0px_0px_6px_12px_rgba(255,255,255,0.74)]',
                        )}
                      >
                        <ResponseCard
                          icon={getIcon(index)}
                          text={AI_HERO_RESPONSES[index]!}
                          onEnd={() => handleEnd(index)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Request card — normal flow (top) ── */}
                  <div
                    className={cn(
                      'ai-hero-widget-gradient-request',
                      'isolate w-full rounded-2xl p-3.5',
                      'shadow-[0px_4px_4px_-6px_rgba(28,40,64,0.14),0px_8px_8px_-8px_rgba(28,40,64,0.10),0px_10px_30px_-4px_rgba(28,40,64,0.10),0px_0px_6px_12px_rgba(255,255,255,0.74)]',
                      '[transition:transform_500ms_ease-out,opacity_500ms_ease-out,filter_400ms_ease-out]',
                      { 'scale-90 opacity-0 blur-[4px]': index === null },
                    )}
                  >
                    <div className="flex items-center justify-between gap-x-6">
                      <div className="flex flex-1 items-center gap-x-[7px] overflow-hidden">
                        <AttioIcon className="shrink-0" />
                        {index !== null && <PromptText index={index} />}
                      </div>
                      <span className="rounded-[9px] border border-[#EEEFF1] bg-[#F4F5F6] px-1.5 pt-px pb-0.5 font-medium text-[#5C5E63] text-[14px] leading-[18px] hidden md:block shrink-0">
                        {AI_HERO_WIDGET_BADGE}
                      </span>
                    </div>

                    <hr className="mt-3.5 mb-[10px] border-[#E6E7EA]" />

                    {index !== null && <PlaceholderText index={index} />}
                  </div>

                </div>{/* /flex flex-col */}
              </div>{/* /absolute center */}
              </div>{/* /absolute inset-0 widget overlay */}

            </div>{/* /relative flex */}
          </div>{/* /ai-hero-gradient-animate */}
        </div>

      </div>
    </div>
  )
}
