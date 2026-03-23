'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { FeatureTabsContent } from '@/data/data-decisions'

// ─── Dashed SVG helpers ───────────────────────────────────────────────────────

function DashedVLine({ className }: { className?: string }) {
  return (
    <svg width="1" height="100%" className={cn('text-subtle-stroke', className)} aria-hidden="true">
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

/** Full-viewport-width dashed horizontal rule (bleeds past container edges). */
function DashedHLine({ className }: { className?: string }) {
  return (
    <svg
      width="100%" height="1"
      className={cn('text-subtle-stroke absolute left-1/2 w-screen -translate-x-1/2', className)}
      aria-hidden="true"
    >
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

// ─── Tab button ───────────────────────────────────────────────────────────────

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={isActive ? 'true' : 'false'}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center text-nowrap',
        'h-8 rounded-[10px] px-2.5 text-xs lg:text-sm',
        'border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50',
        'button-outline',
        '!border-subtle-stroke hover:!border-subtle-stroke hover:!bg-secondary-background',
        isActive
          ? '!border-strong-stroke pointer-events-none'
          : '!text-tertiary-foreground lg:!text-secondary-foreground',
      )}
    >
      {label}
    </button>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function FeatureTabsSection({
  heading,
  subtext,
  learnMoreLabel = 'Learn more',
  learnMoreHref,
  tabs,
}: FeatureTabsContent) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = tabs[activeIndex]

  return (
    <div className="container">
      <div className="flex w-full flex-col border-x border-subtle-stroke">

        {/* ── Header (desktop — left-aligned) ─────────────────────── */}
        <header className="grid grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-[120px] max-xl:pb-16 max-lg:pt-[100px] max-lg:pb-[60px] max-lg:hidden">
          <div className="col-start-2 col-end-[-2] max-w-[20em] text-pretty text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
            <h2 className="inline text-pretty">{heading}</h2>
            {' '}
            <p className="inline text-pretty font-medium text-black-800">{subtext}</p>
          </div>
        </header>

        {/* ── Header (mobile — centered) ───────────────────────────── */}
        <header className="grid grid-cols-12 justify-items-center pt-40 pb-20 max-xl:pt-[120px] max-xl:pb-16 max-lg:pt-[100px] max-lg:pb-[60px] lg:hidden">
          <div className="col-start-2 col-end-[-2] max-w-[20em] text-center text-pretty text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
            <h2 className="inline text-pretty">{heading}</h2>
            {' '}
            <p className="inline text-pretty font-medium text-black-800">{subtext}</p>
          </div>
        </header>

        {/* ── Tab buttons ─────────────────────────────────────────── */}
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-end-[-2] pb-5">
            <div className="flex flex-wrap gap-2 max-lg:justify-center max-lg:gap-1.5">

              {tabs.map((tab, i) => (
                <TabButton
                  key={tab.id}
                  label={tab.label}
                  isActive={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              ))}

              {/* Learn more link */}
              {learnMoreHref && (
                <Link
                  href={learnMoreHref}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-1',
                    'h-8 rounded-[10px] px-2.5 text-xs lg:text-sm',
                    'button-ghost !text-tertiary-foreground hover:!bg-secondary-background',
                    'transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50',
                  )}
                >
                  <span>{learnMoreLabel}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      fillRule="evenodd" clipRule="evenodd"
                      d="M10.3536 6.35356C10.5488 6.1583 10.5488 5.84171 10.3536 5.64645L7.85355 3.14645C7.65829 2.95118 7.34171 2.95118 7.14645 3.14645C6.95118 3.34171 6.95118 3.65829 7.14645 3.85355L8.79289 5.5L2 5.50001C1.72386 5.50001 1.5 5.72386 1.5 6.00001C1.5 6.27615 1.72386 6.50001 2 6.50001L8.79289 6.5L7.14645 8.14645C6.95118 8.34171 6.95118 8.65829 7.14645 8.85355C7.34171 9.04882 7.65829 9.04882 7.85355 8.85355L10.3536 6.35356Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              )}

            </div>
          </div>
        </div>

        {/* ── Content panel ────────────────────────────────────────── */}
        <div className="relative mt-5 grid w-full grid-cols-12 max-lg:mt-0">

          {/* Dashed column lines above panel (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute -top-5 grid h-5 w-full grid-cols-12 overflow-hidden max-lg:hidden"
          >
            <div className="col-start-2 col-end-[-2] flex justify-between">
              <DashedVLine />
              <DashedVLine />
            </div>
          </div>

          {/* Top + bottom full-bleed dashed borders */}
          <DashedHLine className="top-0" />
          <DashedHLine className="bottom-0" />

          {/* Panel (left text + right image) */}
          <div
            className={cn(
              'relative col-start-2 col-end-[-2] flex w-full',
              'border border-subtle-stroke',
              'max-lg:col-span-full max-lg:aspect-video max-lg:border-x-0',
              'max-md:aspect-[5/4]',
            )}
          >
            {/* Left text panel (desktop only) */}
            <div className="relative my-px w-[30%] max-lg:hidden">
              {/* Vertical separator */}
              <svg width="1" height="100%" className="text-subtle-stroke absolute inset-y-0 right-0" aria-hidden="true">
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {/* Heading */}
              <div className="absolute top-12 left-10 max-xl:top-12 max-xl:left-[30px]">
                <h3 className="max-w-[20em] text-balance pr-6 font-semibold text-2xl">
                  {activeTab?.heading}
                </h3>
              </div>

              {/* Description */}
              <div className="absolute inset-x-10 bottom-10 max-xl:inset-x-[30px] max-xl:bottom-[30px]">
                <p className="max-w-sm text-balance text-tertiary-foreground">
                  {activeTab?.description}
                </p>
              </div>
            </div>

            {/* Right image panel */}
            <div
              className={cn(
                'relative flex overflow-hidden bg-secondary-background',
                'w-[70%] aspect-[1.618/1]',
                'max-lg:aspect-video max-lg:w-full max-lg:justify-center',
                'max-md:aspect-square',
              )}
            >
              {/* Dot pattern with radial fade */}
              <svg
                width="100%" height="100%"
                className="text-muted-strong-background absolute inset-0"
                aria-hidden="true"
                style={{ mask: 'radial-gradient(circle, transparent 0%, black 100%)', WebkitMask: 'radial-gradient(circle, transparent 0%, black 100%)' }}
              >
                <defs>
                  <pattern id="feature-tabs-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#feature-tabs-dots)" />
              </svg>

              {/* Product images — all pre-rendered so they load in the background;
                  only the active tab is visible. This avoids a cold-load on every
                  tab switch. */}
              <div className="absolute inset-0">
                {tabs.map((tab, i) => (
                  <div
                    key={tab.id}
                    className={cn(
                      'absolute inset-0 transition-opacity duration-200',
                      i === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    )}
                  >
                    <Image
                      src={tab.imageSrc}
                      alt={tab.imageAlt ?? ''}
                      width={tab.imageWidth}
                      height={tab.imageHeight}
                      className="size-full object-contain"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom decorative column lines ──────────────────────── */}
        <div
          aria-hidden="true"
          className="grid h-[120px] w-full grid-cols-12 overflow-hidden max-lg:hidden"
        >
          <div className="col-start-2 col-end-[-2] flex justify-between">
            <DashedVLine />
            <DashedVLine />
          </div>
        </div>

      </div>
    </div>
  )
}
