'use client'

/**
 * AskChatDemoSection
 *
 * Layout: pixel-perfect copy of the Attio HTML structure.
 *   container → border-x → top spacer → horizontal divider
 *   → heading with dashed side lines → chat demo area (gradient bg + dot pattern)
 *   → horizontal divider → 3-column feature card grid
 */

import Image from 'next/image'
import type { ReactNode } from 'react'
import { RealInfoCardVisual }               from '@/components/illustrations/AskRealInfoVisual'
import { PermissionsCardVisual }            from '@/components/illustrations/AskPermissionsVisual'
import { IntelligentSuggestionsCardVisual } from '@/components/illustrations/AskSuggestionsVisual'
import { ChatDemoPanel }                    from '@/components/illustrations/AskChatDemoPanel'

// ─── Card data ────────────────────────────────────────────────────────────────

interface CardData {
  icon:    string
  title:   string
  body:    string
  visual?: ReactNode
}

const CARDS: CardData[] = [
  {
    icon:   '/assets/icons/ask/intelligence-built/real-information.webp',
    title:  'Real information, not AI invention.',
    body:   'Every answer is sourced from your actual CRM records and customer knowledge.',
    visual: <RealInfoCardVisual />,
  },
  {
    icon:   '/assets/icons/ask/intelligence-built/your-permissions.webp',
    title:  'Your permissions, enforced.',
    body:   "Ask Fethr follows your existing permissions, so everyone sees only what they're supposed to.",
    visual: <PermissionsCardVisual />,
  },
  {
    icon:   '/assets/icons/ask/intelligence-built/intelligent-suggestions.webp',
    title:  'Intelligent suggestions. Human decisions.',
    body:   "You're always in command and empowered to approve, modify, or reject any suggestion.",
    visual: <IntelligentSuggestionsCardVisual />,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function AskChatDemoSection(): ReactNode {
  return (
    <section className="container">
      <div className="border-x border-subtle-stroke">

        {/* ── Top spacer ─────────────────────────────────────────────────── */}
        <div className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-30 max-lg:h-25">
          <div className="col-[2/-2] flex justify-between" />
        </div>

        {/* ── Horizontal divider ─────────────────────────────────────────── */}
        <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden>
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
        </svg>

        {/* ── Heading area ────────────────────────────────────────────────── */}
        <div className="relative grid grid-cols-12">
          <div className="relative col-[2/-2]">

            <header className="col-[2/-2] grid grid-cols-12 justify-items-center pb-20 pt-40 max-xl:pb-16 max-xl:pt-30 max-lg:pb-15 max-lg:pt-25">
              <div className="col-[2/-2] max-w-[20em] text-pretty text-center text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
                <h2>Intelligence built for how you work and what you do.</h2>
              </div>
            </header>

            {/* Left dashed vertical line */}
            <svg
              className="pointer-events-none absolute left-0 top-0 h-full w-px mask-t-to-70% text-subtle-stroke"
              aria-hidden
            >
              <line
                x1="0.5" y1="0" x2="0.5" y2="100%"
                stroke="currentColor"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Right dashed vertical line */}
            <svg
              className="pointer-events-none absolute right-0 top-0 h-full w-px mask-t-to-70% text-subtle-stroke"
              aria-hidden
            >
              <line
                x1="0.5" y1="0" x2="0.5" y2="100%"
                stroke="currentColor"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
            </svg>

          </div>
        </div>

        {/* ── Chat demo area ──────────────────────────────────────────────── */}
        <div className="mask-b-from-50% mask-b-to-85% relative grid grid-flow-dense grid-cols-12 bg-gradient-to-b from-primary-background to-secondary-background pt-1">

          {/* Dot pattern background */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full mask-x-from-90%"
            aria-hidden
          >
            <defs>
              <pattern id="ask-demo-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.5" fill="#e4e7ec" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ask-demo-dots)" />
          </svg>

          {/* Top dashed horizontal line */}
          <svg width="100%" height="1" className="absolute top-0 text-subtle-stroke" aria-hidden>
            <line
              x1="0" y1="0.5" x2="100%" y2="0.5"
              stroke="currentColor"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Panel shell — chat demo UI */}
          <div className="relative col-[2/-2] flex flex-col items-center">
            <div className="relative w-full">
              <div className="pointer-events-none relative mb-8 flex h-80 flex-col overflow-hidden rounded-xl border border-subtle-stroke bg-white-100 ring-3 !ring-black-900/[0.2] lg:mb-16 lg:h-160 w-full">
                <ChatDemoPanel />
              </div>
            </div>
          </div>

        </div>

        {/* ── Divider between demo and cards ──────────────────────────────── */}
        <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden>
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
        </svg>

        {/* ── Feature card grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-px bg-subtle-stroke max-lg:grid-cols-1">
          {CARDS.map((card) => (
            <div key={card.title} className="flex flex-col bg-primary-background p-6">

              <Image
                src={card.icon}
                alt=""
                width={96}
                height={96}
                loading="eager"
                className="mb-4 size-6"
              />

              <h3 className="text-lg text-secondary-foreground lg:max-xl:text-base max-md:text-base">
                {card.title}
              </h3>

              <p className="mt-1 max-w-[24em] text-balance text-accent-foreground lg:max-xl:text-sm max-md:text-sm">
                {card.body}
              </p>

              <div className="flex flex-1 items-end">
                <div className="relative mt-8 aspect-[6/5] w-full">
                  {/* container-type:inline-size enables cqw units inside RealInfoCardVisual */}
                  <div
                    className="flex items-center justify-center overflow-hidden bg-secondary-background p-6 absolute inset-0 size-full object-contain"
                    style={{ containerType: 'inline-size' }}
                  >
                    {card.visual}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
