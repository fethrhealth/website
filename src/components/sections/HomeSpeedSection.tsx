'use client'

/**
 * HomeSpeedSection
 *
 * Section [03] — "data enrichment / speed 1:1"
 * Pixel-perfect clone of the attio.com speed section adapted for Fethr Health.
 *
 * Layout:
 *   outer (overflow-hidden, border-b)
 *     container
 *       lg:border-x inner wrapper
 *         SectionLabel [03] — desktop only
 *         mx-auto centered content area
 *           heading (inline bold) + description (inline)
 *           CTA: desktop → outline button | mobile → email form + primary button
 *           children → visual slot (chart will be passed in a second pass)
 */

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'
import { DemoRequestForm } from '../ui/DemoRequestForm'

// ─── Types ────────────────────────────────────────────────────────────────────

interface HomeSpeedSectionProps {
  /** Section index shown in the desktop label — default 3 → "[03]" */
  index?: number
  /** Left label text — desktop overline */
  sectionLabel?: string
  /** Right tag text — desktop overline */
  sectionTag?: string
  /** Bold inline heading */
  heading: string
  /** Description rendered inline after heading */
  description: string
  /** Desktop CTA button text */
  ctaText?: string
  /** CTA destination href */
  ctaHref?: string
  /** Visual content (chart) passed in a second pass */
  children?: React.ReactNode
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HomeSpeedSection({
  index        = 3,
  sectionLabel = 'data enrichment',
  sectionTag   = '/ speed 1:1',
  heading,
  description,
  ctaText = 'Start for free',
  ctaHref = '/',
  children,
}: HomeSpeedSectionProps) {
  const [email, setEmail] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const dest = email
      ? `${ctaHref}?email=${encodeURIComponent(email)}`
      : ctaHref
    window.location.href = dest
  }

  return (
    <div className="overflow-hidden border-b border-[#E4E7EC]">
      <div className="container">
        <div className="lg:border-x lg:border-subtle-stroke">

          {/* ── Desktop section label — hidden on mobile ──────────────────── */}
          <SectionLabel
            index={index}
            label={sectionLabel}
            tag={sectionTag}
            className="pt-[100px]"
          />

          {/* ── Main centered content ─────────────────────────────────────── */}
          <div className="mx-auto flex flex-col items-center">
            <div className="pt-20 lg:flex lg:flex-col lg:items-center lg:pt-[120px] w-full">

              {/* Heading + description — inline, centered on desktop */}
              <div className="max-w-[830px] text-heading-sm lg:text-center font-display">
                <h3 className="inline font-semibold">
                  <span className="font-semibold text-primary-foreground">
                    {heading}&nbsp;
                  </span>
                </h3>
                <p className="inline font-medium text-black-800">{description}</p>
              </div>

              {/* ── CTA area ──────────────────────────────────────────────── */}
              <div className="mt-7">

                {/* Desktop: outline button, hidden on mobile */}
                <Link
                  href={ctaHref}
                  className={cn(
                    'relative inline-flex cursor-pointer items-center justify-center text-nowrap border',
                    'transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50',
                    'disabled:pointer-events-none disabled:cursor-default',
                    'h-9 gap-x-1.5 rounded-[10px] px-3 text-sm',
                    'max-lg:h-[46px] max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base',
                    'button-outline max-md:hidden',
                  )}
                >
                  {ctaText}
                </Link>

                {/* Mobile: email input + submit button, hidden on md+ */}
                {/* <form
                  className="flex w-full max-w-xs flex-col gap-2 md:hidden"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-y-1.5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      aria-invalid={false}
                      className={cn(
                        'block w-full rounded-[10px] p-[10px_13px] outline-none',
                        'bg-white text-[#232529] placeholder:text-[#a4adba] text-base',
                        'border border-[#cad0d9] transition-all duration-300 ease-out',
                        'hover:border-[#6f7988] hover:shadow-[0px_1px_4px_rgba(56,62,71,0.1)]',
                        'focus:border-[#266df0] focus:ring-[3px] focus:ring-[#266df0]/20',
                        'placeholder:truncate',
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    className={cn(
                      'relative inline-flex cursor-pointer items-center justify-center text-nowrap border',
                      'transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50',
                      'h-[46px] gap-x-2 rounded-xl px-3.5 text-base',
                      'button-primary w-full',
                    )}
                  >
                    {ctaText}
                  </button>
                </form> */}

                <DemoRequestForm
                  source='buildfast'
                  showSales={false}
                />

              </div>


            </div>
              {/* ── Visual slot — chart will be injected in second pass ────── */}
              {children}
          </div>

        </div>
      </div>
    </div>
  )
}
