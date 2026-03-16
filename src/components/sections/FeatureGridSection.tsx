/**
 * FeatureGridSection
 *
 * Reusable feature grid used on multiple platform pages.
 * Supports two card variants and configurable layout/style options.
 *
 * ── Card variants ──────────────────────────────────────────────────────────────
 *
 *   'icon'
 *     Small icon + title + description.
 *     Intended for 3-column layouts with solid rules and hatching background.
 *
 *   'numbered'
 *     [01] overline + visual slot + title + description.
 *     Intended for 2-column layouts with dashed rules and dot-grid background.
 *
 *     The visual slot accepts EITHER:
 *       • image / imageWidth / imageHeight  — a static Next.js <Image>
 *       • visual                            — any React node (Framer Motion
 *           animation, custom SVG, etc.). The node is rendered inside an
 *           aspect-[5/3] container with position:relative, so your component
 *           should use `className="absolute inset-0 size-full"` to fill it.
 *
 * ── Usage examples ─────────────────────────────────────────────────────────────
 *
 *   // Static image card
 *   const ITEMS: NumberedGridItem[] = [
 *     {
 *       kind: 'numbered',
 *       number: '[01]',
 *       image: '/assets/images/bento-1.png',
 *       imageWidth: 2164,
 *       imageHeight: 902,
 *       title: 'Track the journey.',
 *       description: 'See who progresses through each step.',
 *     },
 *   ]
 *
 *   // Animation card — pass a React component as `visual`
 *   const ITEMS: NumberedGridItem[] = [
 *     {
 *       kind: 'numbered',
 *       number: '[04]',
 *       visual: SmartSendingAnimation,   // ← pass the function, NOT <Jsx />
 *       title: 'Smart sending.',
 *       description: 'Land in their inbox when they\'re ready.',
 *     },
 *   ]
 *
 *   // Section usage
 *   <FeatureGridSection
 *     heading="Every interaction in Fethr."
 *     subheading="Track enrollment, replies, meetings, and status for every contact."
 *     cols={2}
 *     background="dots"
 *     rules="dashed"
 *     guideLines
 *     items={ITEMS}
 *     bottomConnector
 *   />
 */

import { createElement, type ComponentType } from 'react'
import Image from 'next/image'
import Divider from '../ui/divider'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IconGridItem {
  kind: 'icon'
  icon: string
  title: string
  description: string
}

/**
 * Visual slot for NumberedGridItem — mutually exclusive:
 *   • Provide `image` + `imageWidth` + `imageHeight` for a static photo/screenshot.
 *   • Provide `visual` for a zero-prop React component (Framer Motion animation,
 *     custom SVG, etc.). Pass the component function itself — NOT pre-rendered JSX.
 *     Example: `visual: MyAnimation`  (not `visual: <MyAnimation />`)
 *     The component renders inside an aspect-[5/3] relative container — use
 *     `className="absolute inset-0 size-full"` inside your component to fill it.
 */
type NumberedGridVisual =
  | { image: string; imageWidth: number; imageHeight: number; visual?: never }
  | { visual: ComponentType; image?: never; imageWidth?: never; imageHeight?: never }

export type NumberedGridItem = {
  kind: 'numbered'
  number: string   // e.g. '[01]'
  title: string
  description: string
} & NumberedGridVisual

export type FeatureGridItem = IconGridItem | NumberedGridItem

export interface FeatureGridQuote {
  text: string
  author: string
  role: string
}

export interface FeatureGridSectionProps {
  /** Inline h2 heading text */
  heading: string
  /** Inline p subheading text */
  subheading: string
  /** Number of columns (default: 3) */
  cols?: 2 | 3
  /** Section background fill style (default: 'hatching') */
  background?: 'hatching' | 'dots'
  /** Horizontal rule style (default: 'solid') */
  rules?: 'dashed' | 'solid'
  /** Show dashed vertical guide lines above the grid (default: false) */
  guideLines?: boolean
  /** Card data array */
  items: FeatureGridItem[]
  /** Optional full-width quote panel — inserted after the first row of cards */
  quote?: FeatureGridQuote
  /** After which item index to insert the quote (default: cols value) */
  quoteInsertAfter?: number
  /** Show dashed vertical connector below the grid (default: false) */
  bottomConnector?: boolean
  /** Append <Divider /> after the section (default: false) */
  divider?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function HRule({ dashed }: { dashed: boolean }) {
  return (
    <svg width="100%" height="1" className="absolute top-0 text-subtle-stroke" aria-hidden>
      <line
        x1="0" y1="0.5" x2="100%" y2="0.5"
        stroke="currentColor"
        strokeLinecap="round"
        {...(dashed ? { strokeDasharray: '4 6' } : {})}
      />
    </svg>
  )
}

function BRule({ dashed }: { dashed: boolean }) {
  return (
    <svg width="100%" height="1" className="absolute bottom-0 text-subtle-stroke" aria-hidden>
      <line
        x1="0" y1="0.5" x2="100%" y2="0.5"
        stroke="currentColor"
        strokeLinecap="round"
        {...(dashed ? { strokeDasharray: '4 6' } : {})}
      />
    </svg>
  )
}

function DotGridSvg({ id }: { id: string }) {
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

// ─── Card renderers ───────────────────────────────────────────────────────────

function IconCard({ item }: { item: IconGridItem }) {
  return (
    <div className="grid grid-cols-12 bg-primary-background">
      <div className="col-[2/-2] flex flex-col py-7">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image
              src={item.icon}
              alt=""
              width={18}
              height={18}
              loading="eager"
              className="size-5 object-contain"
            />
            <h3 className="text-balance font-semibold text-lg text-secondary-foreground lg:max-xl:text-base max-md:text-base">
              {item.title}
            </h3>
          </div>
          <p className="mt-1.5 text-balance text-accent-foreground lg:max-xl:text-sm max-md:text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function NumberedCard({ item }: { item: NumberedGridItem }) {
  return (
    <div className="grid grid-cols-12 bg-primary-background">
      <div className="col-[2/-2] flex flex-col gap-4 py-7">
        <span className="text-overline text-accent-foreground">{item.number}</span>

        {/* Visual slot — static image or custom animation component */}
        <div className="relative aspect-[5/3] w-full">
          {item.visual ? (
            createElement(item.visual)
          ) : (
            <Image
              src={item.image}
              alt=""
              width={item.imageWidth}
              height={item.imageHeight}
              loading="eager"
              className="absolute inset-0 size-full object-contain"
            />
          )}
        </div>

        <div>
          <h3 className="text-balance font-semibold text-lg text-secondary-foreground lg:max-xl:text-base max-md:text-base">
            {item.title}
          </h3>
          <p className="mt-1.5 text-balance text-accent-foreground lg:max-xl:text-sm max-md:text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function renderCard(item: FeatureGridItem, index: number) {
  if (item.kind === 'icon') return <IconCard key={item.title} item={item} />
  return <NumberedCard key={item.number ?? index} item={item} />
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeatureGridSection({
  heading,
  subheading,
  cols = 3,
  background = 'hatching',
  rules = 'solid',
  guideLines = false,
  items,
  quote,
  quoteInsertAfter,
  bottomConnector = false,
  divider = false,
}: FeatureGridSectionProps) {
  const splitAt = quoteInsertAfter ?? cols
  const dashed = rules === 'dashed'
  const colsClass = cols === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className="container flex flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="grid grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15">
          <div className="col-[2/-2] max-w-[20em] text-pretty text-start text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
            <h2 className="inline text-pretty">{heading}</h2>{' '}
            <p className="inline text-pretty font-medium text-black-800">{subheading}</p>
          </div>
        </header>

        {/* ── Feature grid ────────────────────────────────────────────────── */}
        <div className="relative grid grid-cols-12">

          {/* Dashed vertical guide lines above the grid */}
          {guideLines && (
            <div
              aria-hidden
              className="absolute -top-5 h-5 w-full overflow-hidden grid grid-cols-12"
            >
              <div className="col-[2/-2] flex justify-between">
                <svg width="1" height="100%" className="text-subtle-stroke">
                  <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                </svg>
                <svg width="1" height="100%" className="text-subtle-stroke">
                  <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          )}

          {/* Top rule */}
          <HRule dashed={dashed} />

          {/* Section background */}
          {background === 'dots' ? (
            <DotGridSvg id="fg-section-dots" />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 size-full text-surface-subtle"
              style={{ backgroundImage: 'repeating-linear-gradient(125deg, transparent, transparent 6px, currentColor 6px, currentColor 7px)' }}
            />
          )}

          {/* Cards */}
          <div className="relative col-[2/-2]">
            <div className={`grid ${colsClass} gap-px bg-subtle-stroke p-px max-lg:grid-cols-1`}>

              {/* First slice of cards (before quote) */}
              {items.slice(0, splitAt).map((item, i) => renderCard(item, i))}

              {/* Optional full-width quote panel */}
              {quote && (
                <div className="relative col-[1/-1] grid grid-cols-12 bg-primary-background">
                  <div className="absolute inset-0 overflow-hidden">
                    <DotGridSvg id="fg-quote-dots" />
                  </div>
                  <div className="relative col-[2/-2] flex flex-col items-center text-center py-32 gap-4">
                    <blockquote className="text-quote-responsive text-secondary-foreground">
                      &quot;{quote.text}&quot;
                    </blockquote>
                    <cite className="not-italic text-sm flex flex-col items-center gap-0.5">
                      <span className="mt-10 font-semibold text-secondary-foreground text-sm">{quote.author}</span>
                      <span className="text-accent-foreground">{quote.role}</span>
                    </cite>
                  </div>
                </div>
              )}

              {/* Remaining cards (after quote) */}
              {items.slice(splitAt).map((item, i) => renderCard(item, splitAt + i))}

            </div>
          </div>

          {/* Bottom rule */}
          <BRule dashed={dashed} />

        </div>

        {/* ── Bottom connector ────────────────────────────────────────────── */}
        {bottomConnector && (
          <div
            aria-hidden
            className="grid h-40 w-full overflow-hidden grid-cols-12 max-xl:h-30 max-lg:h-25"
          >
            <div className="col-[2/-2] flex justify-between">
              <svg width="1" height="100%" className="text-subtle-stroke">
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="1" height="100%" className="text-subtle-stroke">
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

      </div>
      {divider && <Divider />}
    </div>
  )
}
