'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { HeroRainGrid } from '@/components/ui/HeroRainGrid'
import { DemoRequestForm } from '../ui/DemoRequestForm'
import { TalkToSalesDialog } from '../ui/TalkToSalesDialog'
import { AskHeroIllustration } from '@/components/illustrations/AskHeroIllustration'
import {
  ASK_HERO_HEADING,
  ASK_HERO_SUBHEADING,
  ASK_HERO_CTA_TAGLINE,
  ASK_HERO_CTA_PRIMARY,
  ASK_HERO_CTA_PRIMARY_HREF,
} from '@/data/ask-hero'

export function AskHeroSection(): ReactNode {
  return (
    <section className="flex min-h-[calc(100svh-var(--site-header-height))] flex-col bg-gradient-to-b from-primary-background to-secondary-background">

      {/* ── Main flex area ───────────────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col overflow-hidden">

        {/* HeroRainGrid canvas — lines rise from bottom, wave + parabola animation */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <HeroRainGrid className="h-full w-full" />
        </div>

        {/* Content grid */}
        <div className="pointer-events-none relative grid flex-1 grid-cols-12">
          <div className="col-[2/-2] flex flex-col items-center justify-center pb-12">

            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="pointer-events-auto">
              <header className="flex w-full flex-col items-center pt-30 pb-15 max-xl:pt-25 max-lg:pt-20">
                <h1 className="max-w-[15em] text-balance text-center text-heading-responsive-lg">
                  {ASK_HERO_HEADING}
                </h1>
                <p className="mt-4 max-w-xl text-balance text-center text-lg text-fg-tertiary lg:text-xl">
                  {ASK_HERO_SUBHEADING}
                </p>
              </header>
            </div>

            {/* ── Animated search widget ───────────────────────────────── */}
            <AskHeroIllustration />

          </div>
        </div>

        {/* Bottom spacer */}
        <div aria-hidden="true" className="h-30 max-lg:h-25" />

      </div>

      {/* Separator */}
      <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden="true">
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Bottom CTA bar ────────────────────────────────────────────── */}
      <div className="container">
        <div className="grid w-full grid-cols-12">
          <div className="col-[2/-2] flex flex-col items-center justify-between gap-6 py-12 max-md:py-10 lg:flex-row lg:gap-0">
            <p className="max-w-md text-balance text-center text-lg text-fg-tertiary lg:text-left">
              {ASK_HERO_CTA_TAGLINE}
            </p>
            <div className="flex items-center gap-2.5">
              {/* Desktop buttons */}
              <TalkToSalesDialog
                source="ask-hero"
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-default-stroke bg-primary-background px-3 text-sm text-fg-primary transition-colors hover:bg-secondary-background max-md:hidden"
              />
              <Link
                href={ASK_HERO_CTA_PRIMARY_HREF}
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-transparent bg-fg-primary px-3 text-sm text-white-100 transition-colors hover:bg-fg-secondary max-md:hidden"
              >
                {ASK_HERO_CTA_PRIMARY}
              </Link>

              <DemoRequestForm
                source="ask-attio"
                className="max-w-xs md:hidden"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
