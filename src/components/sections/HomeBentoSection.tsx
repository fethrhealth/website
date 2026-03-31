/**
 * HomeBentoSection
 *
 * "Powerful platform" bento — 4 product pillars.
 * Pixel-perfect clone of attio.com/#home-bento adapted for Fethr Health.
 *
 * Layout (outer → inner):
 *   section → outer wrapper (max-w-[1392px], lg:px-6)
 *     → section label [01] (desktop only, pt-[60px])
 *     → main heading (col-span-10 col-start-2, text-heading-sm)
 *     → bento area with diagonal bg
 *       → top spacer row (dashed column dividers, h-5)
 *       → 4 × BentoRow (horizontal divider + .home-bento-grid)
 *       → bottom spacer row (h-[20px] lg:h-[80px] xl:h-[160px])
 *     → left/right absolute border lines
 *
 * Grid areas per row: titleAndDescription | contentA | contentB (xl) + contentC (xl)
 * CSS for .home-bento-grid and .home-bento-spacer lives in globals.css.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'
import { DashedH, DashedV, SolidH, SolidV, BentoArrowIcon } from '@/components/icons/HomeBentoIcons'
import {
  BENTO_SECTION_NUMBER, BENTO_SECTION_LABEL, BENTO_SECTION_COUNTER,
  BENTO_HEADING, BENTO_SUBHEADING,
  BENTO_ITEMS,
} from '@/data/home-bento'
import type { BentoItem } from '@/data/home-bento'
import { BentoIllustrationPipeline } from '@/components/illustrations/BentoIllustrationPipeline'
import { BentoIllustrationStack } from '@/components/illustrations/BentoIllustrationStack'
import { BentoIllustrationCube } from '@/components/illustrations/BentoIllustrationCube'
import { BentoIllustrationAIWorkflow } from '@/components/illustrations/BentoIllustrationAIWorkflow'
import { BentoIllustrationRecord } from '@/components/illustrations/BentoIllustrationRecord'
import { BentoIllustrationAtom } from '@/components/illustrations/BentoIllustrationAtom'
import { BentoIllustrationDataFlow } from '@/components/illustrations/BentoIllustrationDataFlow'
import { BentoIllustrationConnectData } from '@/components/illustrations/BentoIllustrationConnectData'
import { BentoIllustrationNetwork } from '@/components/illustrations/BentoIllustrationNetwork'
import { BentoIllustrationReportingChart } from '@/components/illustrations/BentoIllustrationReportingChart'
import { BentoIllustrationReportingList } from '@/components/illustrations/BentoIllustrationReportingList'
import { BentoIllustrationReporting } from '@/components/illustrations/BentoIllustrationReporting'

// ─── contentA — dot pattern placeholder ───────────────────────────────────────

function DotPatternCell({ patternId }: { patternId: string }): ReactNode {
  return (
    <div
      className="pointer-events-none relative flex w-full select-none items-center justify-center overflow-hidden bg-center bg-primary-background md:min-h-[620px]"
      style={{ gridArea: 'contentA' }}
    >
      {/* 1px dots on a 10×10px grid — matches Attio's contentA placeholder */}
      <svg width="100%" height="100%" className="text-muted-strong-background absolute inset-0" aria-hidden>
        <defs>
          <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

// ─── contentC — graph paper cell (xl only) ─────────────────────────────────────
// 15 rows × 25px dashed H + 16 cols × 25px dashed V + solid crosshair at centre

function GraphPaperCell({ visual }: { visual?: ReactNode }): ReactNode {
  return (
    <div
      className="relative hidden min-h-[240px] w-full overflow-hidden bg-primary-background xl:flex"
      style={{ gridArea: 'contentC' }}
    >
      <div className="pointer-events-none absolute inset-0">

        {/* 15 dashed horizontal lines, 25px pitch */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex h-[25px] w-full shrink-0 flex-col items-center justify-center">
              <DashedH className="text-white-300" />
            </div>
          ))}
        </div>

        {/* 2 solid horizontal lines, 101px apart — form horizontal band */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex h-[101px] w-full flex-col items-center justify-between">
            <SolidH className="text-white-300" />
            <SolidH className="text-white-300" />
          </div>
        </div>

        {/* 16 dashed vertical lines, 25px pitch */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex h-full min-w-[25px] max-w-[25px] shrink-0">
              <DashedV className="-translate-x-[0.5px] text-white-300" />
            </div>
          ))}
        </div>

        {/* 2 solid vertical lines, 101px apart — form vertical band */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-full w-[101px] items-center justify-between">
            <SolidV className="text-white-300" />
            <SolidV className="text-white-300" />
          </div>
        </div>

      </div>

      {/* Per-row visual — rendered after grid lines so it sits on top */}
      {visual}

    </div>
  )
}

// ─── Bento row ─────────────────────────────────────────────────────────────────

function BentoRow({ item, contentA, contentB, contentC }: { item: BentoItem; contentA?: ReactNode; contentB?: ReactNode; contentC?: ReactNode }): ReactNode {
  return (
    <div className="container w-full lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-0 relative">

      {/* Full-width dashed divider at row top */}
      <DashedH className="text-subtle-stroke absolute top-0 left-1/2 w-screen -translate-x-1/2 lg:inset-x-0 lg:w-full lg:translate-x-0" />

      {/* Last row also gets a bottom dashed divider */}
      {item.isLast && (
        <DashedH className="text-subtle-stroke absolute bottom-0 left-1/2 w-screen -translate-x-1/2 lg:inset-x-0 lg:w-full lg:translate-x-0" />
      )}

      {/*
       * Bento grid — .home-bento-grid in globals.css drives the responsive layout:
       *   mobile:  1 col, areas: titleAndDescription / contentA (stacked)
       *   lg:      2 cols (280px | 1fr), areas side-by-side
       *   xl:      3 cols (280px | 1fr | 360px), contentB+contentC stacked on right
       *
       * gap-px + bg-[#E4E7EC] = 1px colored gaps acting as borders between cells.
       * *:bg-white-100 = every child cell gets a white background.
       * pb-0 on all but last; last row uses pb-px to close the bottom gap.
       */}
      <div className={`home-bento-grid relative grid w-full gap-px bg-[#E4E7EC] p-px *:bg-white-100 col-span-10 col-start-2${item.isLast ? ' pb-px' : ' pb-0'}`}>

        {/* ── titleAndDescription ────────────────────────────────────────── */}
        <div
          className="flex xl:max-w-[320px]  flex-col items-start bg-primary-background px-[30px] pt-[30px] pb-[22px] lg:px-[36px] lg:pt-[32px] lg:pb-[24px]"
          style={{ gridArea: 'titleAndDescription' }}
        >
          <h2 className="mb-[8px] font-display !font-semibold text-lg xl:py-[2px] xl:text-xl">
            {item.title}
          </h2>
          <p className="mb-[12px] text-accent-foreground">
            {item.description}
          </p>
          {/* TODO: Re-enable these "Explore ..." buttons once each respective page
               (automations, AI, data, reporting) is built with content.
               For now, these sections exist on the landing page with no link. */}
          {/* <Link
            href={item.linkHref}
            className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50 h-10 gap-x-2 rounded-xl px-3.25 pr-2.5 text-base button-ghost group mt-auto -ml-3.5"
          >
            <span>{item.linkLabel}</span>
            <BentoArrowIcon />
          </Link> */}
        </div>

        {/* ── contentA ──────────────────────────────────────────────────── */}
        {contentA ?? <DotPatternCell patternId={item.patternId} />}

        {/* ── contentB — optional visual, visible xl only ─────────────────── */}
        <div
          className="relative hidden w-full items-center justify-center overflow-hidden xl:flex"
          style={{ gridArea: 'contentB' }}
        >
          {contentB}
        </div>

        {/* ── contentC — graph paper cell, visible xl only ───────────────── */}
        <GraphPaperCell visual={contentC} />

      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function HomeBentoSection(): ReactNode {
  return (
    <section id="home-bento" className="flex w-full max-w-[100vw] flex-col items-center justify-center overflow-x-clip overflow-hidden font-display">
      <div className="relative flex w-full max-w-full flex-col items-center lg:px-6">
        <div className="relative flex w-full max-w-[1392px] flex-col">

          {/* ── Section label — desktop only ──────────────────────────────── */}
          <div className="hidden lg:block pt-[60px]">
            <div className="flex items-center justify-between px-5 text-overline font-display">
              <h2 className="flex gap-x-[6px]">
                <span>{BENTO_SECTION_NUMBER}</span>
                <span className="text-black-800">{BENTO_SECTION_LABEL}</span>
              </h2>
              <span>{BENTO_SECTION_COUNTER}</span>
            </div>
            <DashedH className="text-subtle-stroke mt-5 h-px w-full" />
          </div>

          {/* ── Main heading ──────────────────────────────────────────────── */}
          <div className="container relative w-full lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-0">
            <div className="col-span-10 col-start-2 max-w-[28em] text-balance pt-20 pb-16 text-heading-sm lg:pt-[120px] overflow-hidden">
              <h3 className="inline">
                <span className="font-semibold text-[#1c1d1f]">
                  {BENTO_HEADING}
                </span>
              </h3>
              <p className="sm:inline font-medium text-black-800">
                {BENTO_SUBHEADING}
              </p>
            </div>
          </div>

          {/* ── Bento area ────────────────────────────────────────────────── */}
          <div className="relative flex flex-col items-center px-0">

            {/*
             * Diagonal hatch background — 1px lines every 7px at 125°.
             * text-surface-subtle = #f3f4f6 → used as currentcolor in the gradient.
             * Inset shrinks at larger breakpoints to reveal more of the bento border.
             */}
            <div
              className="text-surface-subtle absolute inset-x-0 top-[20px] bottom-[20px] size-auto lg:bottom-[80px] xl:bottom-[160px]"
              style={{ backgroundImage: 'repeating-linear-gradient(125deg, transparent, transparent 6px, currentcolor 6px, currentcolor 7px)' }}
            />

            <div className="w-full px-0">

              {/* ── Top spacer — dashed vertical column dividers ─────────── */}
              <div className="container relative w-full lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-0">
                {/*
                 * .home-bento-spacer now uses 3 proportional columns (1fr 0.8fr 0.8fr at lg,
                 * 1fr 1.6fr 1fr at xl) matching the next section's grid so the vertical
                 * lines track together as the viewport scales.
                 * Children:
                 *   div 1 — always visible (left column border)
                 *   div 2 — lg+ (second column border)
                 *   div 3 — lg+ (third column border)
                 *   absolute SVG — right edge border
                 */}
                <div className="home-bento-spacer relative grid w-full gap-px p-px *:bg-white-100 col-span-10 col-start-2 h-5 bg-white-100 py-0">
                  <div>
                    <DashedV className="text-subtle-stroke -ml-px" />
                  </div>
                  <div className="hidden lg:block">
                    <DashedV className="text-subtle-stroke -ml-px" />
                  </div>
                  <div className="hidden lg:block">
                    <DashedV className="text-subtle-stroke -ml-px" />
                  </div>
                  <DashedV className="text-subtle-stroke absolute right-0 bottom-0" />
                </div>
              </div>

              {/* ── 4 bento rows ──────────────────────────────────────────── */}
              {BENTO_ITEMS.map((item, i) => (
                <BentoRow
                  key={item.title}
                  item={item}
                  contentA={
                    i === 0 ? <BentoIllustrationPipeline /> :
                      i === 1 ? <BentoIllustrationAIWorkflow /> :
                        i === 2 ? <BentoIllustrationDataFlow /> :
                          i === 3 ? <BentoIllustrationReportingChart /> :
                            undefined
                  }
                  contentB={
                    i === 0 ? <BentoIllustrationStack /> :
                      i === 1 ? <BentoIllustrationRecord /> :
                        i === 2 ? <BentoIllustrationConnectData /> :
                          i === 3 ? <BentoIllustrationReportingList /> :
                            undefined
                  }
                  contentC={
                    i === 0 ? <BentoIllustrationCube /> :
                      i === 1 ? <BentoIllustrationAtom /> :
                        i === 2 ? <BentoIllustrationNetwork /> :
                          <BentoIllustrationReporting />
                  }
                />
              ))}

              {/* ── Bottom spacer — dashed vertical column dividers ──────── */}
              <div className="container relative w-full lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-0">
                <div className="home-bento-spacer relative grid w-full gap-px p-px pb-0 *:bg-white-100 col-span-10 col-start-2 h-[20px] bg-white-100 lg:h-[80px] xl:h-[160px]">
                  <div>
                    <DashedV className="text-subtle-stroke -ml-px" />
                  </div>
                  <div className="hidden lg:block">
                    <DashedV className="text-subtle-stroke -ml-px" />
                  </div>
                  <div className="hidden lg:block">
                    <DashedV className="text-subtle-stroke -ml-px" />
                  </div>
                  <DashedV className="text-subtle-stroke absolute inset-y-0 right-0" />
                </div>
              </div>

            </div>
          </div>

          {/* Left/right outer vertical border lines — div+bg avoids SVG height:100% resolution issues */}
          <div className="absolute inset-y-0 left-0 w-px !bg-subtle-stroke" />
          <div className="absolute inset-y-0 right-0 w-px !bg-subtle-stroke" />
        </div>


      </div>
    </section>
  )
}
