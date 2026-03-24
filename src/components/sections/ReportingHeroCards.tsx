'use client'
/**
 * ReportingHeroCards
 *
 * Grid of dashboard mini-cards for the Reporting page hero.
 * Clicking a report in the NAV card swaps all other cards to that report's content.
 *
 * ─── HOW TO EDIT ──────────────────────────────────────────────────────────────
 *  Each card is its own named function below (Card1, Card2, …, NavCard).
 *  Inside each function there is one `if (active === N) return (...)` block per
 *  report state. Edit the JSX inside that block freely — structure, charts,
 *  images, SVGs, tables — each state is completely independent.
 *
 * ─── GRID MAP ─────────────────────────────────────────────────────────────────
 *  4 cols (lg) / 5 cols (xl) · 10 rows × 37 px · gap-3
 *
 *   Card1   col-start-1  row-start-1  row-span-6
 *   Card2   col-start-2  row-start-2  row-span-8   (xl only)
 *   Card5   col-start-5  row-start-1  row-span-5
 *   NavCard col-start-3  row-start-2  row-span-5   (xl row-start-3)
 *   Card4   col-start-4  row-start-2  row-span-6
 *   Stat    col-start-1  row-start-7  row-span-4
 *   Card7   col-start-5  row-start-6  row-span-5
 *   Card6   col-start-3  col-span-2   row-start-8  row-span-3
 */

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { REPORTING_NAV_REPORTS, REPORTING_CARD_DATA } from '@/data/reporting-hero'

type Active = 0 | 1 | 2

// ─── Shared primitives ────────────────────────────────────────────────────────

function CardShell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(
      'h-full w-full overflow-hidden rounded-2xl',
      'border border-subtle-stroke bg-primary-background shadow-lg',
      'flex flex-col',
      className,
    )}>
      {children}
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-x-2">
      <div className={cn('size-[9px] rounded-[4px]', color)} />
      <span className="text-tertiary-foreground text-xs">{label}</span>
    </div>
  )
}

// ─── CARD 1 ───────────────────────────────────────────────────────────────────
// col-start-1 · row-start-1 · row-span-6

function Card1({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.card1
  const d1 = REPORTING_CARD_DATA.s1.card1
  const d2 = REPORTING_CARD_DATA.s2.card1

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d0.title}
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws0"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d0.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d0.legends[0].color} label={d0.legends[0].text} />
          <LegendDot color={d0.legends[1].color} label={d0.legends[1].text} />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1">
        <Image
          src={d0.image}
          alt=""
          fill
          className="mt-[13px] hidden object-scale-down object-top lg:block"
        />
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d1.title}
          </span>
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d1.badge}</span>
          </div>
        </div>
        {/* No legend in this state — attio removes it */}
      </div>
      {/* Chart area — vertical bar chart with y-axis labels */}
      <div className="flex flex-1 gap-x-[3px]">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pt-3 pl-[15px]">
          {['1000', '800', '600', '400', '0.0'].map((v) => (
            <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
          ))}
        </div>
        {/* Chart + grid lines */}
        <div className="relative mb-[6.5px] flex-1 pr-[15px]">
          <div className="flex h-full w-full flex-col justify-between pt-[17px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-[#EEEFF1] border-t opacity-80 last:border-[#D1D3D6]" />
            ))}
          </div>
          {/* Target line */}
          <svg className="absolute left-0 w-full top-[42%] pr-4" height="2" width="100%" preserveAspectRatio="none" fill="none">
            <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
          </svg>
          {/* Bar chart SVG */}
          <div className="absolute inset-0 mr-[15px]">
            <div className="h-full w-full">
              <svg className="h-full w-full" viewBox="0 0 198 255" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path fill="#266DF0" d="M10 177.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0754.482 1.0754 1.075V255H10v-77.925ZM13.1504 175.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0754.482 1.0754 1.075V255h-2.1509v-79.925ZM16.3027 173.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-81.925ZM19.4531 171.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-83.925ZM22.6035 168.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-86.925ZM25.7539 166.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0755.482 1.0755 1.075V255h-2.151v-88.925ZM28.9062 163.075c0-.593.4816-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-91.925ZM32.0566 161.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-93.925ZM35.207 159.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-95.925ZM38.3594 158.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.1509v-96.925ZM41.5098 157.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.1509v-97.925ZM44.6602 157.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.1509v-97.925ZM47.8105 155.075c0-.593.4816-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151v-99.925ZM50.9629 154.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0754.482 1.0754 1.075V255h-2.1509V154.075ZM54.1133 153.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0754.482 1.0754 1.075V255h-2.1509V153.075ZM57.2637 151.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.1509V151.075ZM60.416 151.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V151.075ZM63.5664 149.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0755.482 1.0755 1.075V255h-2.151V149.075ZM66.7168 148.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0754.482 1.0754 1.075V255h-2.1509V148.075ZM69.8672 148.075c0-.593.4815-1.075 1.0755-1.075.5939 0 1.0754.482 1.0754 1.075V255h-2.1509V148.075ZM73.0195 148.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V148.075ZM76.1699 146.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V146.075ZM79.3203 145.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V145.075ZM82.4727 143.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.1509V143.075ZM85.623 142.075c0-.593.4816-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V142.075ZM88.7734 140.075c0-.594.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V140.075ZM91.9238 137.075c0-.593.4815-1.075 1.0755-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.151V137.075ZM95.0762 134.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.0755.482 1.0755 1.075V255h-2.1509V134.075ZM98.2266 133.075c0-.593.4815-1.075 1.0754-1.075.594 0 1.076.482 1.076 1.075V255h-2.1514V133.075ZM101.377 129.075c0-.593.481-1.075 1.075-1.075s1.076.482 1.076 1.075V255h-2.151V129.075ZM104.527 125.075c0-.593.482-1.075 1.076-1.075.594 0 1.075.482 1.075 1.075V255h-2.151V125.075ZM107.68 121.075c0-.593.481-1.075 1.075-1.075s1.076.482 1.076 1.075V255h-2.151V121.075ZM110.83 119.075c0-.593.482-1.075 1.076-1.075.594 0 1.075.482 1.075 1.075V255h-2.151V119.075ZM113.98 114.075c0-.593.482-1.075 1.076-1.075.594 0 1.075.482 1.075 1.075V255h-2.151V114.075ZM117.133 112.075c0-.593.481-1.075 1.075-1.075s1.076.482 1.076 1.075V255h-2.151V112.075ZM120.283 109.075c0-.593.482-1.075 1.076-1.075.594 0 1.075.482 1.075 1.075V255h-2.151V109.075ZM123.434 105.075c0-.593.481-1.075 1.075-1.075s1.076.482 1.076 1.075V255h-2.151V105.075ZM126.584 103.075c0-.593.481-1.075 1.075-1.075s1.076.482 1.076 1.075V255h-2.151V103.075ZM129.736 100.075c0-.5935.482-1.075 1.076-1.075.594 0 1.075.4815 1.075 1.075V255h-2.151V100.075ZM132.887 98.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V98.0755ZM136.037 95.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V95.0755ZM139.189 92.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V92.0755ZM142.34 88.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V88.0755ZM145.49 82.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V82.0755ZM148.641 78.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V78.0755ZM151.793 72.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V72.0755ZM154.943 65.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V65.0755ZM158.094 60.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V60.0755ZM161.246 54.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V54.0755ZM164.396 48c0-.5523.448-1 1-1 .553 0 1 .4477 1 1v207h-2V48ZM167.396 40c0-.5523.448-1 1-1 .553 0 1 .4477 1 1v215h-2V40ZM170.396 34c0-.5523.448-1 1-1 .553 0 1 .4477 1 1v221h-2V34ZM173.396 30c0-.5523.448-1 1-1 .553 0 1 .4477 1 1v225h-2V30ZM176.396 28.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V28.0755ZM179.547 23.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V23.0755ZM182.697 20.0755c0-.594.482-1.0755 1.076-1.0755.594 0 1.075.4815 1.075 1.0755V255h-2.151V20.0755ZM185.85 16.0755c0-.594.481-1.0755 1.075-1.0755s1.076.4815 1.076 1.0755V255h-2.151V16.0755Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* X-axis labels */}
      <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-14">
        {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'].map((q, i) => (
          <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
        ))}
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell className="overflow-hidden">
      <div className="flex flex-col gap-y-2.5 pt-[15px] border-b border-subtle-stroke px-[15px] pb-[15px]">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d2.title}
          </span>
          {/* Badge — Sales */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Map / pin icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <g clipPath="url(#sales2)">
                <path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round" />
                <path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round" />
                <path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.1475 5.65347H10.2332" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.42822 1.20001H9.51394" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs><clipPath id="sales2"><rect width="12" height="12" fill="white" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d2.badge}</span>
          </div>
        </div>
      </div>
      {/* Map area */}
      <div className="relative flex-1">
        <Image
          src={d2.image}
          alt=""
          fill
          className="object-contain object-center"
        />
      </div>
    </CardShell>
  )
}

// ─── CARD 2 ───────────────────────────────────────────────────────────────────
// col-start-2 · row-start-2 · row-span-8 · xl only

function Card2({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.card2
  const d1 = REPORTING_CARD_DATA.s1.card2
  const d2 = REPORTING_CARD_DATA.s2.card2

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d0.title}
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws0"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d0.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d0.legends[0].color} label={d0.legends[0].text} />
          <LegendDot color={d0.legends[1].color} label={d0.legends[1].text} />
          <LegendDot color={d0.legends[2].color} label={d0.legends[2].text} />
        </div>
      </div>

      {/* ── Stacked bar chart (lg+ only) ──────────────────────────────── */}
      <div className="hidden flex-col flex-1 lg:flex">

        {/* Y-axis + bars */}
        <div className="flex flex-1 gap-x-[3px]">

          {/* Y-axis labels */}
          <div className="flex flex-col justify-between pt-3 pl-[15px]">
            {['50.0', '40.0', '30.0', '20.0', '0.0'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* Horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Average / target dashed line */}
            <svg className="absolute left-0 top-[23.5%] w-full pr-[15px]" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Stacked bars */}
            <div className="absolute inset-0">
              <div className="h-full w-full">
                <svg className="h-full w-full pr-[15px]" viewBox="0 0 198 373" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* ─ Bar 1 ─ */}
                  <path fill="#C8DCFF" d="M10 236.6c0-3.4 0-5 .7-6.3a6 6 0 0 1 2.6-2.6c1.3-.7 3-.7 6.3-.7h10c3.4 0 5 0 6.3.7a6 6 0 0 1 2.6 2.6c.7 1.3.7 3 .7 6.3V251H10v-14.4Z" />
                  <path fill="#94B9FF" d="M10 252h29.2v60H10z" />
                  <path fill="#266DF0" d="M10 313h29.2v60H10z" />
                  {/* ─ Bar 2 ─ */}
                  <path fill="#C8DCFF" d="M47.2 21.6c0-3.4 0-5 .7-6.3a6 6 0 0 1 2.6-2.6c1.3-.7 3-.7 6.3-.7h10c3.4 0 5 0 6.3.7a6 6 0 0 1 2.6 2.6c.7 1.3.7 3 .7 6.3V84H47.2V21.6Z" />
                  <path fill="#94B9FF" d="M47.2 85h29.2v101H47.2z" />
                  <path fill="#266DF0" d="M47.2 187h29.2v186H47.2z" />
                  {/* ─ Bar 3 ─ */}
                  <path fill="#C8DCFF" d="M84.4 62.6c0-3.4 0-5 .7-6.3a6 6 0 0 1 2.6-2.6c1.3-.7 3-.7 6.3-.7h10c3.4 0 5 0 6.3.7a6 6 0 0 1 2.6 2.6c.7 1.3.7 3 .7 6.3V129H84.4V62.6Z" />
                  <path fill="#94B9FF" d="M84.4 130h29.2v25H84.4z" />
                  <path fill="#266DF0" d="M84.4 156h29.2v217H84.4z" />
                  {/* ─ Bar 4 ─ */}
                  <path fill="#C8DCFF" d="M121.6 196.6c0-3.4 0-5 .7-6.3a6 6 0 0 1 2.6-2.6c1.3-.7 3-.7 6.3-.7h10c3.4 0 5 0 6.3.7a6 6 0 0 1 2.6 2.6c.7 1.3.7 3 .7 6.3V226h-29.2v-29.4Z" />
                  <path fill="#94B9FF" d="M121.6 227h29.2v35h-29.2z" />
                  <path fill="#266DF0" d="M121.6 263h29.2v110h-29.2z" />
                  {/* ─ Bar 5 ─ */}
                  <path fill="#C8DCFF" d="M158.8 127.6c0-3.4 0-5 .7-6.3a6 6 0 0 1 2.6-2.6c1.3-.7 3-.7 6.3-.7h10c3.4 0 5 0 6.3.7a6 6 0 0 1 2.6 2.6c.7 1.3.7 3 .7 6.3V142h-29.2v-14.4Z" />
                  <path fill="#94B9FF" d="M158.8 143H188v63h-29.2z" />
                  <path fill="#266DF0" d="M158.8 207H188v166h-29.2z" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis month labels */}
        <div className="-mt-[8px] flex justify-around pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].map((m) => (
            <span key={m} className="inline-block px-1 py-[3px]">{m}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d1.title}
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws0"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d1.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d1.legends[0].color} label={d1.legends[0].text} />
          <LegendDot color={d1.legends[1].color} label={d1.legends[1].text} />
        </div>
      </div>

      {/* ── Grouped bar chart (lg+ only) ────────────────────────────── */}
      <div className="hidden flex-col flex-1 lg:flex">

        {/* Y-axis + bars */}
        <div className="flex flex-1 gap-x-[3px]">

          {/* Y-axis labels (5 ticks) */}
          <div className="flex flex-col justify-between pt-3 pl-[15px]">
            {['500', '400', '300', '200', '0'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 5 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at 40% */}
            <svg className="absolute left-0 top-[40%] w-full pr-[15px]" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Grouped bar chart — 11 pairs, blue (US) + green (EMEA) */}
            <div className="absolute inset-0">
              <div className="h-full w-full pr-[15px]">
                <svg className="h-full w-full" viewBox="0 0 198 352" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* Pair 1 */}
                  <path fill="#266DF0" d="M10 228.004c0-1.242 0-1.863.1809-2.36.3033-.833.9597-1.489 1.793-1.793.4971-.181 1.1179-.181 2.3594-.181 1.2416 0 1.8623 0 2.3594.181.8333.304 1.4897.96 1.793 1.793.181.497.181 1.118.181 2.36V351.67H10V228.004Z" />
                  <path fill="#54D490" d="M22.666 256.004c0-1.242 0-1.863.1809-2.36.3033-.833.9598-1.489 1.7931-1.793.497-.181 1.1178-.181 2.3593-.181 1.2416 0 1.8624 0 2.3594.181.8333.304 1.4898.96 1.7931 1.793.1809.497.1809 1.118.1809 2.36v95.666H22.666v-95.666Z" />
                  {/* Pair 2 */}
                  <path fill="#266DF0" d="M41.334 211.004c0-1.242 0-1.863.1809-2.36.3033-.833.9597-1.489 1.793-1.793.4971-.181 1.1179-.181 2.3594-.181 1.2416 0 1.8623 0 2.3594.181.8333.304 1.4897.96 1.793 1.793.181.497.181 1.118.181 2.36V351.67H41.334V211.004Z" />
                  <path fill="#54D490" d="M54 237.004c0-1.242 0-1.863.1809-2.36.3033-.833.9597-1.489 1.793-1.793.4971-.181 1.1179-.181 2.3594-.181 1.2416 0 1.8623 0 2.3594.181.8333.304 1.4897.96 1.793 1.793.181.497.181 1.118.181 2.36V351.67H54V237.004Z" />
                  {/* Pair 3 */}
                  <path fill="#266DF0" d="M72.666 188.004c0-1.242 0-1.863.1809-2.36.3033-.833.9598-1.489 1.7931-1.793.497-.181 1.1178-.181 2.3593-.181 1.2416 0 1.8624 0 2.3594.181.8333.304 1.4898.96 1.7931 1.793.1809.497.1809 1.118.1809 2.36V351.67H72.666V188.004Z" />
                  <path fill="#54D490" d="M85.332 172.004c0-1.242 0-1.863.181-2.36.3032-.833.9597-1.489 1.793-1.793.4971-.181 1.1178-.181 2.3594-.181 1.2415 0 1.8623 0 2.3594.181.8333.304 1.4897.96 1.793 1.793.1809.497.1809 1.118.1809 2.36V351.67H85.332V172.004Z" />
                  {/* Pair 4 */}
                  <path fill="#266DF0" d="M104 204.004c0-1.242 0-1.863.181-2.36.303-.833.96-1.489 1.793-1.793.497-.181 1.118-.181 2.359-.181 1.242 0 1.863 0 2.36.181.833.304 1.489.96 1.793 1.793.181.497.181 1.118.181 2.36V351.67H104V204.004Z" />
                  <path fill="#54D490" d="M116.666 188.004c0-1.242 0-1.863.181-2.36.303-.833.96-1.489 1.793-1.793.497-.181 1.118-.181 2.359-.181 1.242 0 1.863 0 2.36.181.833.304 1.489.96 1.793 1.793.181.497.181 1.118.181 2.36V351.67h-8.667V188.004Z" />
                  {/* Pair 5 */}
                  <path fill="#266DF0" d="M135.334 96.0037c0-1.2415 0-1.8623.181-2.3594.303-.8332.96-1.4897 1.793-1.793.497-.1809 1.118-.1809 2.359-.1809 1.242 0 1.863 0 2.36.1809.833.3033 1.489.9598 1.793 1.793.181.4971.181 1.1179.181 2.3594V351.67h-8.667V96.0037Z" />
                  <path fill="#54D490" d="M148 151.004c0-1.242 0-1.863.181-2.36.303-.833.96-1.489 1.793-1.793.497-.181 1.118-.181 2.359-.181 1.242 0 1.863 0 2.36.181.833.304 1.489.96 1.793 1.793.181.497.181 1.118.181 2.36V351.67H148V151.004Z" />
                  {/* Pair 6 */}
                  <path fill="#266DF0" d="M166.666 92.0037c0-1.2415 0-1.8623.181-2.3594.303-.8332.96-1.4897 1.793-1.793.497-.1809 1.118-.1809 2.359-.1809 1.242 0 1.863 0 2.36.1809.833.3033 1.489.9598 1.793 1.793.181.4971.181 1.1179.181 2.3594V351.67h-8.667V92.0037Z" />
                  <path fill="#54D490" d="M179.332 38.0038c0-1.2416 0-1.8624.181-2.3595.303-.8332.96-1.4897 1.793-1.793.497-.1809 1.118-.1809 2.359-.1809 1.242 0 1.863 0 2.36.1809.833.3033 1.489.9598 1.793 1.793.181.4971.181 1.1179.181 2.3594V351.67h-8.667V38.0038Z" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis quarter labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'].map((q, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">{d2.title}</span>
          {/* Badge — Deals */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_921_281063)"><path fillRule="evenodd" clipRule="evenodd" d="M0.768994 1.83044C0.476074 2.40533 0.476074 3.1579 0.476074 4.66304V6.81304C0.476074 8.31818 0.476074 9.07075 0.768994 9.64564C1.02665 10.1513 1.43779 10.5625 1.94347 10.8201C2.51836 11.113 3.27093 11.113 4.77607 11.113H6.92607C8.43121 11.113 9.18379 11.113 9.75867 10.8201C10.2644 10.5625 10.6755 10.1513 10.9332 9.64564C11.2261 9.07075 11.2261 8.31818 11.2261 6.81304V4.66304C11.2261 3.1579 11.2261 2.40533 10.9332 1.83044C10.6755 1.32475 10.2644 0.913617 9.75867 0.655957C9.18379 0.363037 8.43122 0.363037 6.92607 0.363037H4.77607C3.27093 0.363037 2.51836 0.363037 1.94347 0.655957C1.43779 0.913617 1.02665 1.32475 0.768994 1.83044ZM2.95643 6.39946L2.95642 5.07647V5.07646C2.95642 4.1502 2.95641 3.68708 3.13667 3.3333C3.29523 3.02211 3.54824 2.7691 3.85943 2.61054C4.21321 2.43028 4.67633 2.43028 5.60257 2.43028H6.09873C7.02497 2.43028 7.48809 2.43028 7.84186 2.61054C8.15305 2.7691 8.40606 3.0221 8.56462 3.33329C8.74488 3.68707 8.74488 4.15019 8.74488 5.07643V6.39951C8.74488 7.32575 8.74488 7.78887 8.56462 8.14265C8.40606 8.45384 8.15305 8.70684 7.84186 8.8654C7.48809 9.04566 7.02497 9.04566 6.09872 9.04566H5.6026C4.67636 9.04566 4.21323 9.04566 3.85946 8.86541C3.54827 8.70685 3.29526 8.45384 3.1367 8.14265C2.95644 7.78888 2.95644 7.32574 2.95643 6.39946ZM6.26451 3.50565C6.26451 3.2773 6.0794 3.09218 5.85105 3.09218C5.6227 3.09218 5.43759 3.2773 5.43759 3.50565V3.56521C5.18416 3.57489 4.93984 3.67497 4.75449 3.85149C4.55858 4.03806 4.44452 4.29555 4.44452 4.56855C4.44452 4.84155 4.55858 5.09904 4.75449 5.28561C4.94972 5.47154 5.21038 5.57267 5.47819 5.57267H6.22243C6.2836 5.57267 6.33844 5.596 6.37584 5.63161C6.41255 5.66657 6.42917 5.70956 6.42917 5.74986C6.42917 5.79016 6.41255 5.83315 6.37584 5.86811C6.33844 5.90372 6.2836 5.92705 6.22243 5.92705H5.03963C4.81129 5.92705 4.62617 6.11217 4.62617 6.34051C4.62617 6.56886 4.81129 6.75398 5.03963 6.75398H5.43759V6.81368C5.43759 7.04203 5.6227 7.22714 5.85105 7.22714C6.0794 7.22714 6.26451 7.04203 6.26451 6.81368V6.75314C6.51741 6.74313 6.76114 6.64309 6.94612 6.46692C7.14204 6.28035 7.2561 6.02286 7.2561 5.74986C7.2561 5.47686 7.14204 5.21937 6.94612 5.0328C6.7509 4.84687 6.49024 4.74574 6.22243 4.74574H5.47819C5.41702 4.74574 5.36217 4.72241 5.32478 4.6868C5.28807 4.65184 5.27144 4.60885 5.27144 4.56855C5.27144 4.52825 5.28807 4.48526 5.32478 4.4503C5.36217 4.41469 5.41702 4.39136 5.47819 4.39136H5.83585L5.85105 4.39163L5.86625 4.39136H6.64417C6.87252 4.39136 7.05763 4.20624 7.05763 3.9779C7.05763 3.74955 6.87252 3.56443 6.64417 3.56443H6.26451V3.50565ZM3.78355 7.88749C3.78355 7.65914 3.96866 7.47403 4.19701 7.47403H7.5047C7.73305 7.47403 7.91817 7.65914 7.91817 7.88749C7.91817 8.11584 7.73305 8.30095 7.5047 8.30095H4.19701C3.96866 8.30095 3.78355 8.11584 3.78355 7.88749Z" fill="#FD9038"></path></g><defs><clipPath id="clip0_921_281063"><rect width="10.75" height="10.75" fill="white" transform="translate(0.476074 0.362915)"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d2.badge}</span>
          </div>
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color={d2.legends[0].color} label={d2.legends[0].text} />
          <LegendDot color={d2.legends[1].color} label={d2.legends[1].text} />
        </div>
      </div>

      {/* ── Dual line chart (always visible) ────────────────────────── */}
      <div className="flex flex-col flex-1">

        {/* Y-axis + chart */}
        <div className="flex flex-1 gap-x-[3px] px-[15px]">

          {/* Y-axis labels (6 ticks) */}
          <div className="flex flex-col justify-between pt-3">
            {['70.0', '50.0', '40.0', '30.0', '20.0', '0.0'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 6 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at 1/3 */}
            <svg className="absolute left-0 top-1/3 w-full" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Dual line chart SVG */}
            <div className="absolute inset-0">
              <div className="h-full w-full">
                <svg className="h-full w-full" viewBox="0 0 199 352" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* Blue (#266DF0) — area fill + line */}
                  <path opacity="0.1" d="M29.544 258.093L0.976562 279.632V351.67H199.023V32L170.731 43.4008L142.439 98.9846L114.146 147.62L85.8537 189.308L57.5613 224.048L29.544 258.093Z" fill="#266DF0" />
                  <path d="M0.976562 280.003L29.5142 258.433L57.5022 224.338L85.765 189.547L114.028 147.799L142.291 99.0916L170.554 43.4266L199.023 32" stroke="#266DF0" strokeWidth="1.6648" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Green (#54D490) — area fill + line */}
                  <path opacity="0.1" d="M29.3135 311.056L1 322.202V350.864H199.195V149.438L170.881 116L142.568 288.764L114.254 260.898L85.9405 299.91L57.627 283.191L29.3135 311.056Z" fill="#54D490" />
                  <path d="M1.45312 322.745L29.6628 311.57L57.8725 283.631L86.0821 300.394L114.292 261.28L142.501 289.219L170.711 116L198.921 149.526" stroke="#54D490" strokeWidth="1.6648" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis quarter labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )
}

// ─── CARD 5 ───────────────────────────────────────────────────────────────────
// col-start-5 · row-start-1 · row-span-5

function Card5({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.card5
  const d1 = REPORTING_CARD_DATA.s1.card5
  const d2 = REPORTING_CARD_DATA.s2.card5

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">{d0.title}</span>
          {/* Badge — Leads */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Leads icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_921_281063)"><path fillRule="evenodd" clipRule="evenodd" d="M0.768994 1.83044C0.476074 2.40533 0.476074 3.1579 0.476074 4.66304V6.81304C0.476074 8.31818 0.476074 9.07075 0.768994 9.64564C1.02665 10.1513 1.43779 10.5625 1.94347 10.8201C2.51836 11.113 3.27093 11.113 4.77607 11.113H6.92607C8.43121 11.113 9.18379 11.113 9.75867 10.8201C10.2644 10.5625 10.6755 10.1513 10.9332 9.64564C11.2261 9.07075 11.2261 8.31818 11.2261 6.81304V4.66304C11.2261 3.1579 11.2261 2.40533 10.9332 1.83044C10.6755 1.32475 10.2644 0.913617 9.75867 0.655957C9.18379 0.363037 8.43122 0.363037 6.92607 0.363037H4.77607C3.27093 0.363037 2.51836 0.363037 1.94347 0.655957C1.43779 0.913617 1.02665 1.32475 0.768994 1.83044ZM2.95643 6.39946L2.95642 5.07647V5.07646C2.95642 4.1502 2.95641 3.68708 3.13667 3.3333C3.29523 3.02211 3.54824 2.7691 3.85943 2.61054C4.21321 2.43028 4.67633 2.43028 5.60257 2.43028H6.09873C7.02497 2.43028 7.48809 2.43028 7.84186 2.61054C8.15305 2.7691 8.40606 3.0221 8.56462 3.33329C8.74488 3.68707 8.74488 4.15019 8.74488 5.07643V6.39951C8.74488 7.32575 8.74488 7.78887 8.56462 8.14265C8.40606 8.45384 8.15305 8.70684 7.84186 8.8654C7.48809 9.04566 7.02497 9.04566 6.09872 9.04566H5.6026C4.67636 9.04566 4.21323 9.04566 3.85946 8.86541C3.54827 8.70685 3.29526 8.45384 3.1367 8.14265C2.95644 7.78888 2.95644 7.32574 2.95643 6.39946ZM6.26451 3.50565C6.26451 3.2773 6.0794 3.09218 5.85105 3.09218C5.6227 3.09218 5.43759 3.2773 5.43759 3.50565V3.56521C5.18416 3.57489 4.93984 3.67497 4.75449 3.85149C4.55858 4.03806 4.44452 4.29555 4.44452 4.56855C4.44452 4.84155 4.55858 5.09904 4.75449 5.28561C4.94972 5.47154 5.21038 5.57267 5.47819 5.57267H6.22243C6.2836 5.57267 6.33844 5.596 6.37584 5.63161C6.41255 5.66657 6.42917 5.70956 6.42917 5.74986C6.42917 5.79016 6.41255 5.83315 6.37584 5.86811C6.33844 5.90372 6.2836 5.92705 6.22243 5.92705H5.03963C4.81129 5.92705 4.62617 6.11217 4.62617 6.34051C4.62617 6.56886 4.81129 6.75398 5.03963 6.75398H5.43759V6.81368C5.43759 7.04203 5.6227 7.22714 5.85105 7.22714C6.0794 7.22714 6.26451 7.04203 6.26451 6.81368V6.75314C6.51741 6.74313 6.76114 6.64309 6.94612 6.46692C7.14204 6.28035 7.2561 6.02286 7.2561 5.74986C7.2561 5.47686 7.14204 5.21937 6.94612 5.0328C6.7509 4.84687 6.49024 4.74574 6.22243 4.74574H5.47819C5.41702 4.74574 5.36217 4.72241 5.32478 4.6868C5.28807 4.65184 5.27144 4.60885 5.27144 4.56855C5.27144 4.52825 5.28807 4.48526 5.32478 4.4503C5.36217 4.41469 5.41702 4.39136 5.47819 4.39136H5.83585L5.85105 4.39163L5.86625 4.39136H6.64417C6.87252 4.39136 7.05763 4.20624 7.05763 3.9779C7.05763 3.74955 6.87252 3.56443 6.64417 3.56443H6.26451V3.50565ZM3.78355 7.88749C3.78355 7.65914 3.96866 7.47403 4.19701 7.47403H7.5047C7.73305 7.47403 7.91817 7.65914 7.91817 7.88749C7.91817 8.11584 7.73305 8.30095 7.5047 8.30095H4.19701C3.96866 8.30095 3.78355 8.11584 3.78355 7.88749Z" fill="#FD9038"></path></g><defs><clipPath id="clip0_921_281063"><rect width="10.75" height="10.75" fill="white" transform="translate(0.476074 0.362915)"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d0.badge}</span>
          </div>
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color={d0.legends[0].color} label={d0.legends[0].text} />
          <LegendDot color={d0.legends[1].color} label={d0.legends[1].text} />
        </div>
      </div>

      {/* ── Dual line chart (lg+ only) ──────────────────────────────── */}
      <div className="hidden flex-col flex-1 lg:flex">

        {/* Y-axis + chart */}
        <div className="flex flex-1 gap-x-[3px]">

          {/* Y-axis labels (6 ticks) */}
          <div className="flex flex-col justify-between pt-3 pl-[15px]">
            {['700', '500', '400', '300', '200', '0.0'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 6 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at mid-point */}
            <svg className="absolute left-0 top-1/2 w-full" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Dual line chart SVG */}
            <div className="absolute inset-0">
              <div className="h-full w-full pr-[15px]">
                <svg className="h-full w-full" viewBox="0 0 199 229" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* Blue (#266DF0) — area fill + line */}
                  <path fill="#266DF0" opacity=".05" d="M29.5441 138.732.976685 147.139v81.531H199.023V30l-28.292 8.1553L142.439 48l-28.293 4.707-28.2922 39.8207-28.2923 24.8503-28.0174 21.354Z" />
                  <path stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6648" d="m.976685 147.404 28.537615-8.43 27.988-21.389 28.2629-24.8864 28.2628-39.8642L142.291 48.5l28.263-10.3262L199.023 30" />
                  {/* Cyan (#14AED6) — area fill + line */}
                  <path fill="#14AED6" opacity=".05" d="M29.3135 172.261 1 219.509v8.637h198.195V67.1707l-28.314 38.2573L142 114l-27.746 5.647L85.9405 153 57.627 164.142l-28.3135 8.119Z" />
                  <path stroke="#14AED6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6648" d="m1.45312 219.862 28.20968-47.267 28.2097-8.167L86.0821 152.5l28.2099-32.605L142.501 114l28.21-8.572 28.21-38.2" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis quarter labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'].map((q, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 pt-[15px] border-b border-subtle-stroke px-[15px] pb-[15px]">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d1.title}
          </span>
          {/* Badge — workspace */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d1.badge}</span>
          </div>
        </div>
      </div>
      {/* Map area */}
      <div className="relative flex-1">
        <Image
          src={d1.image}
          alt=""
          fill
          className="object-contain object-center"
        />
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">{d2.title}</span>
          {/* Badge — Sales */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_921_281063)"><path fillRule="evenodd" clipRule="evenodd" d="M0.768994 1.83044C0.476074 2.40533 0.476074 3.1579 0.476074 4.66304V6.81304C0.476074 8.31818 0.476074 9.07075 0.768994 9.64564C1.02665 10.1513 1.43779 10.5625 1.94347 10.8201C2.51836 11.113 3.27093 11.113 4.77607 11.113H6.92607C8.43121 11.113 9.18379 11.113 9.75867 10.8201C10.2644 10.5625 10.6755 10.1513 10.9332 9.64564C11.2261 9.07075 11.2261 8.31818 11.2261 6.81304V4.66304C11.2261 3.1579 11.2261 2.40533 10.9332 1.83044C10.6755 1.32475 10.2644 0.913617 9.75867 0.655957C9.18379 0.363037 8.43122 0.363037 6.92607 0.363037H4.77607C3.27093 0.363037 2.51836 0.363037 1.94347 0.655957C1.43779 0.913617 1.02665 1.32475 0.768994 1.83044ZM2.95643 6.39946L2.95642 5.07647V5.07646C2.95642 4.1502 2.95641 3.68708 3.13667 3.3333C3.29523 3.02211 3.54824 2.7691 3.85943 2.61054C4.21321 2.43028 4.67633 2.43028 5.60257 2.43028H6.09873C7.02497 2.43028 7.48809 2.43028 7.84186 2.61054C8.15305 2.7691 8.40606 3.0221 8.56462 3.33329C8.74488 3.68707 8.74488 4.15019 8.74488 5.07643V6.39951C8.74488 7.32575 8.74488 7.78887 8.56462 8.14265C8.40606 8.45384 8.15305 8.70684 7.84186 8.8654C7.48809 9.04566 7.02497 9.04566 6.09872 9.04566H5.6026C4.67636 9.04566 4.21323 9.04566 3.85946 8.86541C3.54827 8.70685 3.29526 8.45384 3.1367 8.14265C2.95644 7.78888 2.95644 7.32574 2.95643 6.39946ZM6.26451 3.50565C6.26451 3.2773 6.0794 3.09218 5.85105 3.09218C5.6227 3.09218 5.43759 3.2773 5.43759 3.50565V3.56521C5.18416 3.57489 4.93984 3.67497 4.75449 3.85149C4.55858 4.03806 4.44452 4.29555 4.44452 4.56855C4.44452 4.84155 4.55858 5.09904 4.75449 5.28561C4.94972 5.47154 5.21038 5.57267 5.47819 5.57267H6.22243C6.2836 5.57267 6.33844 5.596 6.37584 5.63161C6.41255 5.66657 6.42917 5.70956 6.42917 5.74986C6.42917 5.79016 6.41255 5.83315 6.37584 5.86811C6.33844 5.90372 6.2836 5.92705 6.22243 5.92705H5.03963C4.81129 5.92705 4.62617 6.11217 4.62617 6.34051C4.62617 6.56886 4.81129 6.75398 5.03963 6.75398H5.43759V6.81368C5.43759 7.04203 5.6227 7.22714 5.85105 7.22714C6.0794 7.22714 6.26451 7.04203 6.26451 6.81368V6.75314C6.51741 6.74313 6.76114 6.64309 6.94612 6.46692C7.14204 6.28035 7.2561 6.02286 7.2561 5.74986C7.2561 5.47686 7.14204 5.21937 6.94612 5.0328C6.7509 4.84687 6.49024 4.74574 6.22243 4.74574H5.47819C5.41702 4.74574 5.36217 4.72241 5.32478 4.6868C5.28807 4.65184 5.27144 4.60885 5.27144 4.56855C5.27144 4.52825 5.28807 4.48526 5.32478 4.4503C5.36217 4.41469 5.41702 4.39136 5.47819 4.39136H5.83585L5.85105 4.39163L5.86625 4.39136H6.64417C6.87252 4.39136 7.05763 4.20624 7.05763 3.9779C7.05763 3.74955 6.87252 3.56443 6.64417 3.56443H6.26451V3.50565ZM3.78355 7.88749C3.78355 7.65914 3.96866 7.47403 4.19701 7.47403H7.5047C7.73305 7.47403 7.91817 7.65914 7.91817 7.88749C7.91817 8.11584 7.73305 8.30095 7.5047 8.30095H4.19701C3.96866 8.30095 3.78355 8.11584 3.78355 7.88749Z" fill="#FD9038"></path></g><defs><clipPath id="clip0_921_281063"><rect width="10.75" height="10.75" fill="white" transform="translate(0.476074 0.362915)"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d2.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d2.legends[0].color} label={d2.legends[0].text} />
          <LegendDot color={d2.legends[1].color} label={d2.legends[1].text} />
        </div>
      </div>

      {/* ── Grouped bar chart (always visible) ──────────────────────── */}
      <div className="flex flex-col flex-1">

        {/* Y-axis + bars */}
        <div className="flex flex-1 gap-x-[3px]">

          {/* Y-axis labels (5 ticks) */}
          <div className="flex flex-col justify-between pt-3 pl-[15px]">
            {['25k', '20k', '15k', '10k', '0k'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 5 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at 42% */}
            <svg className="absolute left-0 top-[42%] w-full" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Grouped bar chart — 11 pairs, blue (Target) + green (Actual) */}
            <div className="absolute inset-0">
              <div className="h-full w-full pr-[15px]">
                <svg className="h-full w-full" viewBox="0 0 198 229" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M10 153.8C10 152.12 10 151.28 10.327 150.639C10.6146 150.074 11.0735 149.615 11.638 149.327C12.2798 149 13.131 149 14.8333 149V149C16.5357 149 17.3869 149 18.0286 149.327C18.5931 149.615 19.0521 150.074 19.3397 150.639C19.6667 151.28 19.6667 152.12 19.6667 153.8V229H10V153.8Z" fill="#266DF0"></path><path d="M21.667 93.8005C21.667 92.1203 21.667 91.2803 21.994 90.6385C22.2816 90.074 22.7405 89.6151 23.305 89.3275C23.9468 89.0005 24.7979 89.0005 26.5003 89.0005V89.0005C28.2027 89.0005 29.0539 89.0005 29.6956 89.3275C30.2601 89.6151 30.7191 90.074 31.0067 90.6385C31.3337 91.2803 31.3337 92.1203 31.3337 93.8005V229H21.667V93.8005Z" fill="#54D490"></path><path d="M41.333 143.8C41.333 142.12 41.333 141.28 41.66 140.639C41.9476 140.074 42.4066 139.615 42.971 139.327C43.6128 139 44.464 139 46.1663 139V139C47.8687 139 48.7199 139 49.3616 139.327C49.9261 139.615 50.3851 140.074 50.6727 140.639C50.9997 141.28 50.9997 142.12 50.9997 143.8V229H41.333V143.8Z" fill="#266DF0"></path><path d="M53 83.8005C53 82.1203 53 81.2803 53.327 80.6385C53.6146 80.074 54.0735 79.6151 54.638 79.3275C55.2798 79.0005 56.131 79.0005 57.8333 79.0005V79.0005C59.5357 79.0005 60.3869 79.0005 61.0286 79.3275C61.5931 79.6151 62.0521 80.074 62.3397 80.6385C62.6667 81.2803 62.6667 82.1203 62.6667 83.8005V229H53V83.8005Z" fill="#54D490"></path><path d="M72.667 138.8C72.667 137.12 72.667 136.28 72.994 135.639C73.2816 135.074 73.7405 134.615 74.305 134.327C74.9468 134 75.7979 134 77.5003 134V134C79.2027 134 80.0539 134 80.6956 134.327C81.2601 134.615 81.7191 135.074 82.0067 135.639C82.3337 136.28 82.3337 137.12 82.3337 138.8V229H72.667V138.8Z" fill="#266DF0"></path><path d="M84.334 73.8005C84.334 72.1203 84.334 71.2803 84.661 70.6385C84.9486 70.074 85.4075 69.6151 85.972 69.3275C86.6137 69.0005 87.4649 69.0005 89.1673 69.0005V69.0005C90.8697 69.0005 91.7209 69.0005 92.3626 69.3275C92.9271 69.6151 93.386 70.074 93.6737 70.6385C94.0007 71.2803 94.0007 72.1203 94.0007 73.8005V229H84.334V73.8005Z" fill="#54D490"></path><path d="M104 133.8C104 132.12 104 131.28 104.327 130.639C104.615 130.074 105.074 129.615 105.638 129.327C106.28 129 107.131 129 108.833 129V129C110.536 129 111.387 129 112.029 129.327C112.593 129.615 113.052 130.074 113.34 130.639C113.667 131.28 113.667 132.12 113.667 133.8V229H104V133.8Z" fill="#266DF0"></path><path d="M115.667 63.8005C115.667 62.1203 115.667 61.2803 115.994 60.6385C116.282 60.074 116.741 59.6151 117.305 59.3275C117.947 59.0005 118.798 59.0005 120.5 59.0005V59.0005C122.203 59.0005 123.054 59.0005 123.696 59.3275C124.26 59.6151 124.719 60.074 125.007 60.6385C125.334 61.2803 125.334 62.1203 125.334 63.8005V229H115.667V63.8005Z" fill="#54D490"></path><path d="M135.333 123.8C135.333 122.12 135.333 121.28 135.66 120.639C135.948 120.074 136.407 119.615 136.971 119.327C137.613 119 138.464 119 140.166 119V119C141.869 119 142.72 119 143.362 119.327C143.926 119.615 144.385 120.074 144.673 120.639C145 121.28 145 122.12 145 123.8V229H135.333V123.8Z" fill="#266DF0"></path><path d="M147 53.8005C147 52.1203 147 51.2803 147.327 50.6385C147.615 50.074 148.074 49.6151 148.638 49.3275C149.28 49.0005 150.131 49.0005 151.833 49.0005V49.0005C153.536 49.0005 154.387 49.0005 155.029 49.3275C155.593 49.6151 156.052 50.074 156.34 50.6385C156.667 51.2803 156.667 52.1203 156.667 53.8005V229H147V53.8005Z" fill="#54D490"></path><path d="M166.667 113.8C166.667 112.12 166.667 111.28 166.994 110.639C167.282 110.074 167.741 109.615 168.305 109.327C168.947 109 169.798 109 171.5 109V109C173.203 109 174.054 109 174.696 109.327C175.26 109.615 175.719 110.074 176.007 110.639C176.334 111.28 176.334 112.12 176.334 113.8V229H166.667V113.8Z" fill="#266DF0"></path><path d="M178.334 43.8005C178.334 42.1203 178.334 41.2803 178.661 40.6385C178.949 40.074 179.408 39.6151 179.972 39.3275C180.614 39.0005 181.465 39.0005 183.167 39.0005V39.0005C184.87 39.0005 185.721 39.0005 186.363 39.3275C186.927 39.6151 187.386 40.074 187.674 40.6385C188.001 41.2803 188.001 42.1203 188.001 43.8005V229H178.334V43.8005Z" fill="#54D490"></path></svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis quarter labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'].map((q, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )
}

// ─── CARD 4 ───────────────────────────────────────────────────────────────────
// col-start-4 · row-start-2 · row-span-6

function Card4({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.card4
  const d1 = REPORTING_CARD_DATA.s1.card4
  const d2 = REPORTING_CARD_DATA.s2.card4

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d0.title}
          </span>
          {/* Badge — Sales */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Sales icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d0.badge}</span>
          </div>
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1">
        <Image
          src={d0.image}
          alt=""
          fill
          className="object-contain object-center"
        />
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell className="items-center justify-center gap-y-4">
      <div className="flex items-center">
        <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
        <span className="py-0.5 text-tertiary-foreground text-xs">{d1.label}</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        {d1.value}
      </p>
      <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
        <span>{d1.crumbs[0]}</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>{d1.crumbs[1]}</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>{d1.crumbs[2]}</span>
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d2.title}
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws0"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d2.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d2.legends[0].color} label={d2.legends[0].text} />
          <LegendDot color={d2.legends[1].color} label={d2.legends[1].text} />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1 flex justify-center items-start">
        <Image
          src={d2.image}
          alt=""
          width={160}
          height={160}
          className="mt-[13px]"
        />
      </div>
    </CardShell>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
// col-start-1 · row-start-7 · row-span-4

function StatCard({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.stat
  const d1 = REPORTING_CARD_DATA.s1.stat
  const d2 = REPORTING_CARD_DATA.s2.stat

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell className="items-center justify-center gap-y-4">
      <div className="flex items-center">
        <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
        <span className="py-0.5 text-tertiary-foreground text-xs">{d0.label}</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        {d0.value}
      </p>
      <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
        <span>{d0.crumbs[0]}</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>{d0.crumbs[1]}</span>
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d1.title}
          </span>
          {/* Badge — Sales */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Sales icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d1.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d1.legends[0].color} label={d1.legends[0].text} />
          <LegendDot color={d1.legends[1].color} label={d1.legends[1].text} />
          <LegendDot color={d1.legends[2].color} label={d1.legends[2].text} />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1">
        <Image
          src={d1.image}
          alt=""
          fill
          className="object-scale-down object-top pb-4"
        />
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">{d2.title}</span>
          {/* Badge — workspace */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d2.badge}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color={d2.legends[0].color} label={d2.legends[0].text} />
          <LegendDot color={d2.legends[1].color} label={d2.legends[1].text} />
          <LegendDot color={d2.legends[2].color} label={d2.legends[2].text} />
        </div>
      </div>

      {/* ── Stacked bar chart (always visible) ──────────────────────── */}
      <div className="flex flex-col flex-1">

        {/* Y-axis + chart */}
        <div className="flex flex-1 gap-x-[3px] px-[15px]">

          {/* Y-axis labels (5 ticks) */}
          <div className="flex flex-col justify-between pt-3">
            {['50k', '40k', '30k', '20k', '0k'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 5 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at 23.5% */}
            <svg className="absolute left-0 top-[23.5%] w-full pr-[15px]" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Stacked bar chart SVG */}
            <div className="absolute inset-0">
              <div className="h-full w-full">
                <svg className="h-full w-full" viewBox="0 0 198 130" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* Bar 1 (Q1) */}
                  <path d="M10 116C10 113.239 12.2386 111 15 111H26C28.7614 111 31 113.239 31 116V118H10V116Z" fill="#266DF0" />
                  <rect x="10" y="118" width="21" height="1" fill="white" />
                  <rect x="10" y="119" width="21" height="5" fill="#14AED6" />
                  <rect x="10" y="124" width="21" height="1" fill="white" />
                  <rect x="10" y="125" width="21" height="5" fill="#54D490" />
                  {/* Bar 2 (Q2) */}
                  <path d="M41 96C41 93.2386 43.2386 91 46 91H57C59.7614 91 62 93.2386 62 96V110H41V96Z" fill="#266DF0" />
                  <rect x="41" y="110" width="21" height="1" fill="white" />
                  <rect x="41" y="111" width="21" height="13" fill="#14AED6" />
                  <rect x="41" y="124" width="21" height="1" fill="white" />
                  <rect x="41" y="125" width="21" height="5" fill="#54D490" />
                  {/* Bar 3 (Q3) */}
                  <path d="M72 70C72 67.2386 74.2386 65 77 65H88C90.7614 65 93 67.2386 93 70V96H72V70Z" fill="#266DF0" />
                  <rect x="72" y="96" width="21" height="1" fill="white" />
                  <rect x="72" y="97" width="21" height="20" fill="#14AED6" />
                  <rect x="72" y="117" width="21" height="1" fill="white" />
                  <rect x="72" y="118" width="21" height="12" fill="#54D490" />
                  {/* Bar 4 (Q4) */}
                  <path d="M103 52C103 49.2386 105.239 47 108 47H119C121.761 47 124 49.2386 124 52V69H103V52Z" fill="#266DF0" />
                  <rect x="103" y="69" width="21" height="1" fill="white" />
                  <rect x="103" y="70" width="21" height="38" fill="#14AED6" />
                  <rect x="103" y="108" width="21" height="1" fill="white" />
                  <rect x="103" y="109" width="21" height="21" fill="#54D490" />
                  {/* Bar 5 (Q1) */}
                  <path d="M134 34C134 31.2386 136.239 29 139 29H150C152.761 29 155 31.2386 155 34V50H134V34Z" fill="#266DF0" />
                  <rect x="134" y="50" width="21" height="1" fill="white" />
                  <rect x="134" y="51" width="21" height="38" fill="#14AED6" />
                  <rect x="134" y="89" width="21" height="1" fill="white" />
                  <rect x="134" y="90" width="21" height="40" fill="#54D490" />
                  {/* Bar 6 (Q2) */}
                  <path d="M165 13C165 10.2386 167.239 8 170 8H181C183.761 8 186 10.2386 186 13V50H165V13Z" fill="#266DF0" />
                  <rect x="165" y="50" width="21" height="1" fill="white" />
                  <rect x="165" y="51" width="21" height="38" fill="#14AED6" />
                  <rect x="165" y="89" width="21" height="1" fill="white" />
                  <rect x="165" y="90" width="21" height="40" fill="#54D490" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis quarter labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'].map((q, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )
}

// ─── CARD 7 ───────────────────────────────────────────────────────────────────
// col-start-5 · row-start-6 · row-span-5

function Card7({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.card7
  const d1 = REPORTING_CARD_DATA.s1.card7
  const d2 = REPORTING_CARD_DATA.s2.card7

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 pt-[15px] border-b border-subtle-stroke px-[15px] pb-[15px]">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d0.title}
          </span>
          {/* Badge — workspace */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d0.badge}</span>
          </div>
        </div>
      </div>
      {/* Map area */}
      <div className="relative flex-1">
        <Image
          src={d0.image}
          alt=""
          fill
          className="object-contain object-center"
        />
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d1.title}
          </span>
          {/* Badge — Sales */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Sales icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d1.badge}</span>
          </div>
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1 px-3 pb-2">
        <Image
          src={d1.image}
          alt=""
          fill
          className="object-contain object-center"
        />
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell className='items-center justify-center gap-y-4'>
      <div className="flex items-center">
        <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
        <span className="py-0.5 text-tertiary-foreground text-xs">{d2.label}</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        {d2.value}
      </p>
      <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
        <span>{d2.crumbs[0]}</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>{d2.crumbs[1]}</span>
      </div>
    </CardShell>
  )
}

// ─── CARD 6 ───────────────────────────────────────────────────────────────────
// col-start-3 · col-span-2 · row-start-8 · row-span-3

function Card6({ active }: { active: Active }) {
  const d0 = REPORTING_CARD_DATA.s0.card6
  const d1 = REPORTING_CARD_DATA.s1.card6
  const d2 = REPORTING_CARD_DATA.s2.card6

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-3">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">{d0.title}</span>
          {/* Badge — Leads */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Leads icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_921_281063)"><path fillRule="evenodd" clipRule="evenodd" d="M0.768994 1.83044C0.476074 2.40533 0.476074 3.1579 0.476074 4.66304V6.81304C0.476074 8.31818 0.476074 9.07075 0.768994 9.64564C1.02665 10.1513 1.43779 10.5625 1.94347 10.8201C2.51836 11.113 3.27093 11.113 4.77607 11.113H6.92607C8.43121 11.113 9.18379 11.113 9.75867 10.8201C10.2644 10.5625 10.6755 10.1513 10.9332 9.64564C11.2261 9.07075 11.2261 8.31818 11.2261 6.81304V4.66304C11.2261 3.1579 11.2261 2.40533 10.9332 1.83044C10.6755 1.32475 10.2644 0.913617 9.75867 0.655957C9.18379 0.363037 8.43122 0.363037 6.92607 0.363037H4.77607C3.27093 0.363037 2.51836 0.363037 1.94347 0.655957C1.43779 0.913617 1.02665 1.32475 0.768994 1.83044ZM2.95643 6.39946L2.95642 5.07647V5.07646C2.95642 4.1502 2.95641 3.68708 3.13667 3.3333C3.29523 3.02211 3.54824 2.7691 3.85943 2.61054C4.21321 2.43028 4.67633 2.43028 5.60257 2.43028H6.09873C7.02497 2.43028 7.48809 2.43028 7.84186 2.61054C8.15305 2.7691 8.40606 3.0221 8.56462 3.33329C8.74488 3.68707 8.74488 4.15019 8.74488 5.07643V6.39951C8.74488 7.32575 8.74488 7.78887 8.56462 8.14265C8.40606 8.45384 8.15305 8.70684 7.84186 8.8654C7.48809 9.04566 7.02497 9.04566 6.09872 9.04566H5.6026C4.67636 9.04566 4.21323 9.04566 3.85946 8.86541C3.54827 8.70685 3.29526 8.45384 3.1367 8.14265C2.95644 7.78888 2.95644 7.32574 2.95643 6.39946ZM6.26451 3.50565C6.26451 3.2773 6.0794 3.09218 5.85105 3.09218C5.6227 3.09218 5.43759 3.2773 5.43759 3.50565V3.56521C5.18416 3.57489 4.93984 3.67497 4.75449 3.85149C4.55858 4.03806 4.44452 4.29555 4.44452 4.56855C4.44452 4.84155 4.55858 5.09904 4.75449 5.28561C4.94972 5.47154 5.21038 5.57267 5.47819 5.57267H6.22243C6.2836 5.57267 6.33844 5.596 6.37584 5.63161C6.41255 5.66657 6.42917 5.70956 6.42917 5.74986C6.42917 5.79016 6.41255 5.83315 6.37584 5.86811C6.33844 5.90372 6.2836 5.92705 6.22243 5.92705H5.03963C4.81129 5.92705 4.62617 6.11217 4.62617 6.34051C4.62617 6.56886 4.81129 6.75398 5.03963 6.75398H5.43759V6.81368C5.43759 7.04203 5.6227 7.22714 5.85105 7.22714C6.0794 7.22714 6.26451 7.04203 6.26451 6.81368V6.75314C6.51741 6.74313 6.76114 6.64309 6.94612 6.46692C7.14204 6.28035 7.2561 6.02286 7.2561 5.74986C7.2561 5.47686 7.14204 5.21937 6.94612 5.0328C6.7509 4.84687 6.49024 4.74574 6.22243 4.74574H5.47819C5.41702 4.74574 5.36217 4.72241 5.32478 4.6868C5.28807 4.65184 5.27144 4.60885 5.27144 4.56855C5.27144 4.52825 5.28807 4.48526 5.32478 4.4503C5.36217 4.41469 5.41702 4.39136 5.47819 4.39136H5.83585L5.85105 4.39163L5.86625 4.39136H6.64417C6.87252 4.39136 7.05763 4.20624 7.05763 3.9779C7.05763 3.74955 6.87252 3.56443 6.64417 3.56443H6.26451V3.50565ZM3.78355 7.88749C3.78355 7.65914 3.96866 7.47403 4.19701 7.47403H7.5047C7.73305 7.47403 7.91817 7.65914 7.91817 7.88749C7.91817 8.11584 7.73305 8.30095 7.5047 8.30095H4.19701C3.96866 8.30095 3.78355 8.11584 3.78355 7.88749Z" fill="#FD9038"></path></g><defs><clipPath id="clip0_921_281063"><rect width="10.75" height="10.75" fill="white" transform="translate(0.476074 0.362915)"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d0.badge}</span>
          </div>
        </div>
      </div>

      {/* ── Grouped bar chart ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1">

        {/* Y-axis + bars */}
        <div className="flex flex-1 gap-x-[3px]">

          {/* Y-axis labels (3 ticks) */}
          <div className="flex flex-col justify-between pt-3 pl-[15px]">
            {['40.0', '20.0', '0.0'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 3 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at 1/3 */}
            <svg className="absolute left-0 top-1/3 w-full pr-[15px]" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Grouped bar chart — 14 pairs, blue + green */}
            <div className="absolute inset-0">
              <div className="h-full w-full pr-[15px]">
                <svg className="h-full w-full" viewBox="0 0 483 71" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* Pair 1 */}
                  <path fill="#266DF0" d="M10 49.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v21.2H10V49.5Z" />
                  <path fill="#54D490" d="M23.9 55.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.1.3.6.3 1 .7 1.4 1.3.3.7.3 1.5.3 3.2v15.2h-10V55.5Z" />
                  {/* Pair 2 */}
                  <path fill="#266DF0" d="M43.8 30.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.1.3.6.3 1 .7 1.4 1.3.3.7.3 1.5.3 3.2v40.2h-10V30.5Z" />
                  <path fill="#54D490" d="M57.7 38.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v32.2h-10V38.5Z" />
                  {/* Pair 3 */}
                  <path fill="#266DF0" d="M77.6 56.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.6 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v14.2h-10V56.5Z" />
                  <path fill="#54D490" d="M91.5 54.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.2-.3h.3c1.6 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v16.2h-10V54.5Z" />
                  {/* Pair 4 */}
                  <path fill="#266DF0" d="M111.4 27.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.2-.3h.3c1.6 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v43.2h-9.8V27.5Z" />
                  <path fill="#54D490" d="M125.3 23.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.2-.3h.2c1.7 0 2.6 0 3.2.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v47.2h-9.8V23.5Z" />
                  {/* Pair 5 */}
                  <path fill="#266DF0" d="M145.1 45.5c0-1.7 0-2.5.4-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.1-.3h.3c1.7 0 2.6 0 3.2.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v25.2h-9.9V45.5Z" />
                  <path fill="#54D490" d="M159 51.5c0-1.7 0-2.5.4-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v19.2H159V51.5Z" />
                  {/* Pair 6 */}
                  <path fill="#266DF0" d="M179 45.5c0-1.7 0-2.5.3-3.2.2-.6.7-1 1.3-1.3.6-.3 1.4-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v25.2H179V45.5Z" />
                  <path fill="#54D490" d="M192.8 51.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.4-1.3.6-.3 1.4-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v19.2h-9.9V51.5Z" />
                  {/* Pair 7 */}
                  <path fill="#266DF0" d="M212.7 45.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.4-1.3.6-.3 1.4-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v25.2h-9.9V45.5Z" />
                  <path fill="#54D490" d="M226.6 41.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v29.2h-9.9V41.5Z" />
                  {/* Pair 8 */}
                  <path fill="#266DF0" d="M246.5 28.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v42.2h-9.9V28.5Z" />
                  <path fill="#54D490" d="M260.4 19.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.1.3.6.3 1 .7 1.4 1.3.3.7.3 1.5.3 3.2v51.2h-10V19.5Z" />
                  {/* Pair 9 */}
                  <path fill="#266DF0" d="M280.3 31.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.1.3.6.3 1 .7 1.4 1.3.3.7.3 1.5.3 3.2v39.2h-10V31.5Z" />
                  <path fill="#54D490" d="M294.2 22.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v48.2h-10V22.5Z" />
                  {/* Pair 10 */}
                  <path fill="#266DF0" d="M314 40.5c0-1.7 0-2.5.4-3.2.3-.6.7-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.6 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v30.2h-10V40.5Z" />
                  <path fill="#54D490" d="M328 33.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.2-.3h.3c1.6 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v37.2h-10V33.5Z" />
                  {/* Pair 11 */}
                  <path fill="#266DF0" d="M347.9 40.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.2-.3h.3c1.6 0 2.5 0 3.1.3.6.3 1 .7 1.3 1.3.4.7.4 1.5.4 3.2v30.2h-10V40.5Z" />
                  <path fill="#54D490" d="M361.8 33.5c0-1.7 0-2.5.3-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.2-.3h.2c1.7 0 2.6 0 3.2.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v37.2h-9.9V33.5Z" />
                  {/* Pair 12 */}
                  <path fill="#266DF0" d="M381.6 33.5c0-1.7 0-2.5.4-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.1-.3h.3c1.7 0 2.6 0 3.2.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v37.2h-9.9V33.5Z" />
                  <path fill="#54D490" d="M395.5 25.5c0-1.7 0-2.5.4-3.2.3-.6.7-1 1.3-1.3.6-.3 1.5-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.6.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v45.2h-9.9V25.5Z" />
                  {/* Pair 13 */}
                  <path fill="#266DF0" d="M415.4 40.5c0-1.7 0-2.5.4-3.2.2-.6.7-1 1.3-1.3.6-.3 1.4-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v30.2h-9.9V40.5Z" />
                  <path fill="#54D490" d="M429.3 33.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.4-1.3.6-.3 1.4-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v37.2h-9.9V33.5Z" />
                  {/* Pair 14 */}
                  <path fill="#266DF0" d="M449.2 35.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.4-1.3.6-.3 1.4-.3 3.1-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v35.2h-9.9V35.5Z" />
                  <path fill="#54D490" d="M463.1 27.5c0-1.7 0-2.5.3-3.2.3-.6.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h.3c1.7 0 2.5 0 3.2.3.5.3 1 .7 1.3 1.3.3.7.3 1.5.3 3.2v43.2h-9.9V27.5Z" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis month labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Jan'].map((m, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{m}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-3">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">{d1.title}</span>
          {/* Badge — workspace */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">{d1.badge}</span>
          </div>
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color={d1.legends[0].color} label={d1.legends[0].text} />
          <LegendDot color={d1.legends[1].color} label={d1.legends[1].text} />
        </div>
      </div>

      {/* ── Dual line chart ──────────────────────────────────────────── */}
      <div className="hidden flex-col flex-1 lg:flex">

        {/* Y-axis + chart */}
        <div className="flex flex-1 gap-x-[3px]">

          {/* Y-axis labels (3 ticks) */}
          <div className="flex flex-col justify-between pt-3 pl-[15px]">
            {['1.4m', '0.7m', '0.0m'].map((v) => (
              <span key={v} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{v}</span>
            ))}
          </div>

          {/* Chart area */}
          <div className="relative mb-[6.5px] flex-1">

            {/* 3 horizontal grid lines */}
            <div className="flex h-full w-full flex-col justify-between pt-[17px]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border-t border-[#EEEFF1] opacity-80 last:border-[#D1D3D6]" />
              ))}
            </div>

            {/* Target dashed line at 55% */}
            <svg className="absolute left-0 top-[55%] w-full pr-[15px]" height="2" width="100%" preserveAspectRatio="none" fill="none">
              <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2" strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
            </svg>

            {/* Dual line chart SVG */}
            <div className="absolute inset-0">
              <div className="h-full w-full pr-[15px]">
                <svg className="h-full w-full" viewBox="0 0 483 45" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {/* Blue (#266DF0) — area fill + line */}
                  <path fill="#266DF0" opacity=".1" d="M69.6708 31.8272 0 34.8592V45h483V0l-69 4.5-69 4.92942-69 6.84648-69 5.8684-69 4.8903-68.3292 4.7926Z" />
                  <path stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6648" d="m0 34.9113 69.598-3.0364 68.258-4.7995 68.928-4.8975 68.928-5.877 68.927-6.85642L413.567 4.5 483 1" />
                  {/* Green (#54D490) — area fill + line */}
                  <path fill="#54D490" opacity=".1" d="M69.0678 39.3573 0 40.9083v3.9885h483.474V16.8674l-69.067-4.653-69.339 2.2857-69.068 16h-69.5l-68.364 4.9796-69.0682 3.8776Z" />
                  <path stroke="#54D490" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6648" d="m0 41.0001 69.9198-1.5713 68.8142-3.8878 68.815-5.0409h68.814l68.815-16.3737 68.814-1.912 68.815 4.6653" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* X-axis quarter labels */}
        <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal lg:pr-6 lg:pl-12">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3'].map((q, i) => (
            <span key={i} className="inline-block px-1 py-[3px]">{q}</span>
          ))}
        </div>

      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            {d2.title}
          </span>
          {/* Badge — Sales */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Sales icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">{d2.badge}</span>
          </div>
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1 px-3 pb-2">
        <Image
          src={d2.image}
          alt=""
          fill
          className="object-scale-down object-top pb-2 px-3"
        />
      </div>
    </CardShell>
  )
}

// ─── NAV CARD ─────────────────────────────────────────────────────────────────
// col-start-3 · row-start-2 · row-span-5 (xl: row-start-3)
// Uses absolute inset-0 so the card body fills the grid cell exactly.

function NavCard({
  active,
  onSelect,
}: {
  active: Active
  onSelect: (i: Active) => void
}) {
  return (
    <div className="absolute inset-0 flex flex-col rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg p-[15px]">

      {/* Breadcrumb: Reports › {active name} */}
      <div className="flex items-center text-disabled-foreground text-xs -tracking-[0.24px]">
        <div className="inline-flex items-center gap-1.5 py-px pr-[3px] pl-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" aria-hidden="true">
            <g stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
              <rect width="11" height="11" x="1.5" y="1.5" rx="2.5" />
              <path d="M4.46143 5.30768v4.23077M7 4.46155v5.07692M9.53857 7v2.53846" />
            </g>
          </svg>
          <span className="text-tertiary-foreground">Reports</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" aria-hidden="true">
          <path stroke="currentColor" strokeLinecap="round" d="m6.5 13 3-10" />
        </svg>
        <span className="truncate py-[1px] pr-[3px] pl-0.5 text-primary-foreground">
          {REPORTING_NAV_REPORTS[active].name}
        </span>
      </div>

      {/* Report buttons */}
      <div className="flex flex-1 flex-col mt-5 xl:mt-4 gap-y-2 xl:gap-y-[4px]">
        {REPORTING_NAV_REPORTS.map((report, i) => (
          <button
            key={report.name}
            type="button"
            onClick={() => onSelect(i as Active)}
            className={cn(
              'flex flex-1 cursor-pointer flex-col justify-center rounded-xl px-4 py-1.5 text-left',
              'transition-[background-color,box-shadow] duration-200 ease-out',
              'hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              active === i && 'bg-surface',
            )}
          >
            <div className={cn(
              'text-sm -tracking-[0.28px]',
              active === i ? 'text-primary-foreground' : 'text-tertiary-foreground',
            )}>
              {report.name}
            </div>
            <div className="max-w-full text-xs xl:truncate text-tertiary-foreground">
              {report.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

// ─── MOBILE SLIDES ────────────────────────────────────────────────────────────
// Each slide mirrors the desktop card content for one report state.
// Add MobileSlide1 / MobileSlide2 when their content is ready.

// Reusable mini chart primitives ─────────────────────────────────────────────

function ChartGridLines({ count }: { count: number }) {
  return (
    <div className="flex h-full w-full flex-col justify-between pt-[17px]">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-[#EEEFF1] border-t opacity-80 last:border-[#D1D3D6]" />
      ))}
    </div>
  )
}

function DashedLine({ top }: { top: string }) {
  return (
    <svg
      className={`absolute left-0 w-full ${top}`}
      height="2" width="100%" preserveAspectRatio="none"
      fill="none"
    >
      <line opacity="0.8" x1="0" y1="1" x2="100%" y2="1" stroke="#17BDE9" strokeWidth="2"
        strokeLinecap="round" strokeDasharray="1px 8px" strokeDashoffset="8px" />
    </svg>
  )
}

function YAxisLabels({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-col justify-between pt-3">
      {labels.map((l, i) => (
        <span key={i} className="inline-block min-w-[26px] pr-1 text-[#9FA1A7] text-[10px] leading-[13px] tracking-normal">{l}</span>
      ))}
    </div>
  )
}

function XAxisLabels({ labels }: { labels: string[] }) {
  return (
    <div className="-mt-[8px] flex justify-between pt-1 pr-1 pb-[15px] pl-[33px] text-[#75777C] text-[10px] leading-[13px] tracking-normal">
      {labels.map((l, i) => (
        <span key={i} className="inline-block px-1 py-[3px]">{l}</span>
      ))}
    </div>
  )
}

// ── Shared badge icons ────────────────────────────────────────────────────────

function DealsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <g clipPath="url(#deals-m)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.768994 1.83044C0.476074 2.40533 0.476074 3.1579 0.476074 4.66304V6.81304C0.476074 8.31818 0.476074 9.07075 0.768994 9.64564C1.02665 10.1513 1.43779 10.5625 1.94347 10.8201C2.51836 11.113 3.27093 11.113 4.77607 11.113H6.92607C8.43121 11.113 9.18379 11.113 9.75867 10.8201C10.2644 10.5625 10.6755 10.1513 10.9332 9.64564C11.2261 9.07075 11.2261 8.31818 11.2261 6.81304V4.66304C11.2261 3.1579 11.2261 2.40533 10.9332 1.83044C10.6755 1.32475 10.2644 0.913617 9.75867 0.655957C9.18379 0.363037 8.43122 0.363037 6.92607 0.363037H4.77607C3.27093 0.363037 2.51836 0.363037 1.94347 0.655957C1.43779 0.913617 1.02665 1.32475 0.768994 1.83044ZM2.95643 6.39946L2.95642 5.07647V5.07646C2.95642 4.1502 2.95641 3.68708 3.13667 3.3333C3.29523 3.02211 3.54824 2.7691 3.85943 2.61054C4.21321 2.43028 4.67633 2.43028 5.60257 2.43028H6.09873C7.02497 2.43028 7.48809 2.43028 7.84186 2.61054C8.15305 2.7691 8.40606 3.0221 8.56462 3.33329C8.74488 3.68707 8.74488 4.15019 8.74488 5.07643V6.39951C8.74488 7.32575 8.74488 7.78887 8.56462 8.14265C8.40606 8.45384 8.15305 8.70684 7.84186 8.8654C7.48809 9.04566 7.02497 9.04566 6.09872 9.04566H5.6026C4.67636 9.04566 4.21323 9.04566 3.85946 8.86541C3.54827 8.70685 3.29526 8.45384 3.1367 8.14265C2.95644 7.78888 2.95644 7.32574 2.95643 6.39946ZM6.26451 3.50565C6.26451 3.2773 6.0794 3.09218 5.85105 3.09218C5.6227 3.09218 5.43759 3.2773 5.43759 3.50565V3.56521C5.18416 3.57489 4.93984 3.67497 4.75449 3.85149C4.55858 4.03806 4.44452 4.29555 4.44452 4.56855C4.44452 4.84155 4.55858 5.09904 4.75449 5.28561C4.94972 5.47154 5.21038 5.57267 5.47819 5.57267H6.22243C6.2836 5.57267 6.33844 5.596 6.37584 5.63161C6.41255 5.66657 6.42917 5.70956 6.42917 5.74986C6.42917 5.79016 6.41255 5.83315 6.37584 5.86811C6.33844 5.90372 6.2836 5.92705 6.22243 5.92705H5.03963C4.81129 5.92705 4.62617 6.11217 4.62617 6.34051C4.62617 6.56886 4.81129 6.75398 5.03963 6.75398H5.43759V6.81368C5.43759 7.04203 5.6227 7.22714 5.85105 7.22714C6.0794 7.22714 6.26451 7.04203 6.26451 6.81368V6.75314C6.51741 6.74313 6.76114 6.64309 6.94612 6.46692C7.14204 6.28035 7.2561 6.02286 7.2561 5.74986C7.2561 5.47686 7.14204 5.21937 6.94612 5.0328C6.7509 4.84687 6.49024 4.74574 6.22243 4.74574H5.47819C5.41702 4.74574 5.36217 4.72241 5.32478 4.6868C5.28807 4.65184 5.27144 4.60885 5.27144 4.56855C5.27144 4.52825 5.28807 4.48526 5.32478 4.4503C5.36217 4.41469 5.41702 4.39136 5.47819 4.39136H5.83585L5.85105 4.39163L5.86625 4.39136H6.64417C6.87252 4.39136 7.05763 4.20624 7.05763 3.9779C7.05763 3.74955 6.87252 3.56443 6.64417 3.56443H6.26451V3.50565ZM3.78355 7.88749C3.78355 7.65914 3.96866 7.47403 4.19701 7.47403H7.5047C7.73305 7.47403 7.91817 7.65914 7.91817 7.88749C7.91817 8.11584 7.73305 8.30095 7.5047 8.30095H4.19701C3.96866 8.30095 3.78355 8.11584 3.78355 7.88749Z" fill="#FD9038" />
      </g>
      <defs><clipPath id="deals-m"><rect width="10.75" height="10.75" fill="white" transform="translate(0.476074 0.362915)" /></clipPath></defs>
    </svg>
  )
}

// ── Slide 0: Product-led Growth ───────────────────────────────────────────────

function MobileSlide0() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:px-4 pb-8">

      {/* ── Card: Cumulative Leads (full width) ── */}
      <div className="flex flex-col px-[15px] col-span-2 h-[280px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Cumulative Leads</span>
            <div className="flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
              <DealsIcon />
              <span className="text-accent-foreground text-xs">Deals</span>
            </div>
          </div>
          <div className="flex gap-x-[14px]">
            <LegendDot color="bg-blue-500" label="US" />
            <LegendDot color="bg-blue-300" label="EMEA" />
          </div>
        </div>
        {/* Chart */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 gap-x-[3px]">
            <YAxisLabels labels={['700', '500', '400', '300', '200', '0.0']} />
            <div className="relative mb-[6.5px] flex-1">
              <ChartGridLines count={6} />
              <DashedLine top="top-[37%]" />
              <div className="absolute inset-0">
                <div className="h-full w-full">
                  <svg className="h-full w-full" viewBox="0 0 285 165" fill="none" preserveAspectRatio="none">
                    <path fill="#266DF0" d="m42 93.1-41 7v63.6h284V3l-40.6 6.8-40.5 8.1-40.6 4-40.6 33-40.6 20.5L42 93.1Z" opacity=".05" />
                    <path stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m1 100.3 41-7 40-17.7L122.7 55 163 22l40.5-3.6 40.6-8.6L285 3" />
                    <path fill="#14AED6" d="M41.6 125 1 159v4.2h284V49.3l-40.6 27.5L203 83l-39.7 4-40.6 24.1-40.6 8-40.5 5.9Z" opacity=".05" />
                    <path stroke="#14AED6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m1.6 159.3 40.5-34 40.4-6 40.4-8.6 40.4-23.4 40.5-4.3 40.4-6.2 40.4-27.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <XAxisLabels labels={['Q2', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2']} />
        </div>
      </div>

      {/* ── Card: Seat Counts (full → half on xs+) ── */}
      <div className="flex flex-col px-[15px] col-span-2 xs:col-span-1 min-h-[240px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Seat Counts</span>
          </div>
          <div className="flex gap-x-[14px]">
            <LegendDot color="bg-blue-500" label="1 to 5" />
            <LegendDot color="bg-blue-300" label="6 to 10" />
          </div>
        </div>
        {/* Chart */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 gap-x-[3px]">
            <YAxisLabels labels={['50.0', '40.0', '30.0', '20.0', '0.0']} />
            <div className="relative mb-[6.5px] flex-1">
              <ChartGridLines count={5} />
              <DashedLine top="top-[23.5%]" />
              <div className="absolute inset-0">
                <div className="h-full w-full">
                  <svg className="h-full w-full" viewBox="0 0 105 162" fill="none" preserveAspectRatio="none">
                    <path fill="#94B9FF" d="M4 110.8c0-1.7 0-2.5.3-3.2.3-.5.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3h11.6c1.7 0 2.6 0 3.2.3.6.3 1 .8 1.3 1.3.4.7.4 1.5.4 3.2V123H4v-12.2Z" />
                    <path fill="#266DF0" d="M4 124h21.3v38H4z" />
                    <path fill="#94B9FF" d="M29.3 20.8c0-1.7 0-2.5.3-3.2.3-.5.7-1 1.3-1.3.6-.3 1.5-.3 3.1-.3h11.7c1.7 0 2.5 0 3.2.3.5.3 1 .8 1.3 1.3.3.7.3 1.5.3 3.2V60H29.2V20.8Z" />
                    <path fill="#266DF0" d="M29.3 61h21.2v101H29.2z" />
                    <path fill="#94B9FF" d="M54.5 44.8c0-1.7 0-2.5.3-3.2.3-.5.8-1 1.3-1.3.7-.3 1.5-.3 3.2-.3H71c1.6 0 2.5 0 3.1.3.6.3 1 .8 1.3 1.3.3.7.3 1.5.3 3.2V83H54.5V44.8Z" />
                    <path fill="#266DF0" d="M54.5 84h21.3v78H54.5z" />
                    <path fill="#94B9FF" d="M79.8 95.8c0-1.7 0-2.5.3-3.2.3-.5.7-1 1.3-1.3.6-.3 1.5-.3 3.1-.3h11.7c1.7 0 2.5 0 3.2.3.5.3 1 .8 1.3 1.3.3.7.3 1.5.3 3.2V118H79.7V95.8Z" />
                    <path fill="#266DF0" d="M79.8 119H101v43H79.8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <XAxisLabels labels={['Q1', 'Q2', 'Q3', 'Q4']} />
        </div>
      </div>

      {/* ── Card: Active and Habit (half width, hidden below xs) ── */}
      <div className="hidden xs:flex flex-col px-[15px] col-span-1 min-h-[240px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Active and Habit</span>
          </div>
          <div className="flex gap-x-[14px]">
            <LegendDot color="bg-blue-500" label="Active" />
            <LegendDot color="bg-blue-300" label="Habit" />
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            src="/assets/images/platform/reporting/hero/reporting-hero-product-growth-pie-chart.svg"
            alt=""
            fill
            className="object-scale-down object-top"
          />
        </div>
      </div>

    </div>
  )
}

// ── Slide 1: Revenue Operations ──────────────────────────────────────────────

function WorkspacesIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773ZM2.4183 3.15997C2.4183 2.69754 2.79318 2.32266 3.25562 2.32266H4.27236C4.73479 2.32266 5.10967 2.69754 5.10967 3.15997V4.83461C5.10967 5.29704 4.73479 5.67192 4.27236 5.67192H3.25562C2.79318 5.67192 2.4183 5.29704 2.4183 4.83461V3.15997ZM6.84343 5.25302C6.38099 5.25302 6.00611 5.6279 6.00611 6.09033V7.76497C6.00611 8.2274 6.38099 8.60228 6.84343 8.60228H7.86017C8.32261 8.60228 8.69749 8.2274 8.69749 7.76497V6.09033C8.69749 5.6279 8.32261 5.25302 7.86017 5.25302H6.84343ZM6.00611 3.16021C6.00611 2.69777 6.38099 2.32289 6.84343 2.32289H7.86017C8.32261 2.32289 8.69749 2.69777 8.69749 3.16021V3.52026C8.69749 3.98269 8.32261 4.35757 7.86017 4.35757H6.84343C6.38099 4.35757 6.00611 3.98269 6.00611 3.52026V3.16021ZM3.25546 6.56824C2.79302 6.56824 2.41814 6.94312 2.41814 7.40556V7.7656C2.41814 8.22804 2.79302 8.60292 3.25546 8.60292H4.2722C4.73464 8.60292 5.10952 8.22804 5.10952 7.7656V7.40556C5.10952 6.94312 4.73464 6.56824 4.2722 6.56824H3.25546Z" fill="#14AED6" />
    </svg>
  )
}

function MobileSlide1() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:px-4 pb-8">

      {/* ── Card: Accounts by Plan (full width) ── */}
      <div className="flex flex-col px-[15px] col-span-2 h-[280px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Accounts by Plan</span>
            <div className="flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
              <WorkspacesIcon />
              <span className="text-accent-foreground text-xs">Workspaces</span>
            </div>
          </div>
          <div className="flex gap-x-[14px]">
            <LegendDot color="bg-blue-500" label="Pro" />
            <LegendDot color="bg-green-500" label="Plus" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 gap-x-[3px]">
            <YAxisLabels labels={['250', '200', '150', '100', '0.0']} />
            <div className="relative mb-[6.5px] flex-1">
              <ChartGridLines count={5} />
              <DashedLine top="top-[44%]" />
              <div className="absolute inset-0">
                <div className="h-full w-full">
                  <svg className="h-full w-full" viewBox="0 0 284 165" fill="none" preserveAspectRatio="none">
                    <path fill="#266DF0" d="M10 104.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v60.5H10v-60.5Z" />
                    <path fill="#54D490" d="M20.1 93.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v71.5h-9.1V93.2Z" />
                    <path fill="#266DF0" d="M37.2 100.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v64.5h-9.1v-64.5Z" />
                    <path fill="#54D490" d="M47.3 84.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v80.5h-9.1V84.2Z" />
                    <path fill="#266DF0" d="M64.4 96.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.7-.2 1.5 0 2.2 0 2.8.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v68.5h-9.1V96.2Z" />
                    <path fill="#54D490" d="M74.5 73.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v91.5h-9.1V73.2Z" />
                    <path fill="#266DF0" d="M91.6 89.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v75.5h-9.1V89.2Z" />
                    <path fill="#54D490" d="M101.7 66.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v98.5h-9.1V66.2Z" />
                    <path fill="#266DF0" d="M118.8 80.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v84.5h-9.1V80.2Z" />
                    <path fill="#54D490" d="M128.9 53.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v111.5h-9.1V53.2Z" />
                    <path fill="#266DF0" d="M146 76.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v88.5H146V76.2Z" />
                    <path fill="#54D490" d="M156.1 43.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v121.5h-9.1V43.2Z" />
                    <path fill="#266DF0" d="M173.2 72.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v92.5h-9.1V72.2Z" />
                    <path fill="#54D490" d="M183.3 31.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v133.5h-9.1V31.2Z" />
                    <path fill="#266DF0" d="M200.4 57.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v107.5h-9.1V57.2Z" />
                    <path fill="#54D490" d="M210.5 17.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v147.5h-9.1V17.2Z" />
                    <path fill="#266DF0" d="M227.6 44.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v120.5h-9.1V44.2Z" />
                    <path fill="#54D490" d="M237.7 13.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v151.5h-9.1V13.2Z" />
                    <path fill="#266DF0" d="M254.8 38.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v126.5h-9.1V38.2Z" />
                    <path fill="#54D490" d="M264.9 9.2c0-1.4 0-2.1.2-2.7a3 3 0 0 1 1.6-1.6c.6-.2 1.3-.2 2.8-.2 1.4 0 2.1 0 2.7.2a3 3 0 0 1 1.6 1.6c.2.6.2 1.3.2 2.7v155.5h-9.1V9.2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <XAxisLabels labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2']} />
        </div>
      </div>

      {/* ── Card: Paid Accounts (full → half on xs+) ── */}
      <div className="flex flex-col px-[15px] col-span-2 xs:col-span-1 h-[240px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Paid Accounts</span>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 gap-x-[3px]">
            <YAxisLabels labels={['500', '400', '300', '200', '0.0']} />
            <div className="relative mb-[6.5px] flex-1">
              <ChartGridLines count={5} />
              <DashedLine top="top-[23.5%]" />
              <div className="absolute inset-0">
                <div className="h-full w-full">
                  <svg className="h-full w-full" viewBox="0 0 105 144" fill="none" preserveAspectRatio="none">
                    <path fill="#266DF0" d="M1 80.5a1.9 1.9 0 0 1 3.8 0v63.2H1V80.5ZM5.8 80.5a1.9 1.9 0 0 1 3.7 0v63.2H5.7V80.5ZM10.5 79.5a1.9 1.9 0 0 1 3.8 0v64.2h-3.8V79.5ZM15.3 77.5a1.9 1.9 0 0 1 3.7 0v66.2h-3.8V77.5ZM20 77.5a1.9 1.9 0 0 1 3.8 0v66.2H20V77.5ZM24.8 75.5a1.9 1.9 0 0 1 3.7 0v68.2h-3.8V75.5ZM29.5 73.5a1.9 1.9 0 0 1 3.8 0v70.2h-3.8V73.5ZM34.3 70.5a1.9 1.9 0 0 1 3.7 0v73.2h-3.8V70.5ZM39 68.5a1.9 1.9 0 0 1 3.8 0v75.2H39V68.5ZM43.8 63.5a1.9 1.9 0 0 1 3.7 0v80.2h-3.8V63.5ZM48.5 59.5a1.9 1.9 0 0 1 3.8 0v84.2h-3.8V59.5ZM53.3 54.5a1.9 1.9 0 0 1 3.7 0v89.2h-3.8V54.5ZM58 50.5a1.9 1.9 0 0 1 3.8 0v93.2H58V50.5ZM62.8 47.5a1.9 1.9 0 0 1 3.7 0v96.2h-3.8V47.5ZM67.5 44.5a1.9 1.9 0 0 1 3.8 0v99.2h-3.8V44.5ZM72.3 39.5a1.9 1.9 0 0 1 3.7 0v104.2h-3.8V39.5ZM77 33.5a1.9 1.9 0 0 1 3.8 0v110.2H77V33.5ZM81.8 25.5a1.9 1.9 0 0 1 3.7 0v118.2h-3.8V25.5ZM86.5 18.5a1.9 1.9 0 0 1 3.8 0v125.2h-3.8V18.5ZM91.3 9.5a1.9 1.9 0 0 1 3.7 0v134.2h-3.8V9.5ZM96 6.5a1.9 1.9 0 0 1 3.8 0v137.2H96V6.5ZM100.8 3.5a1.9 1.9 0 1 1 3.7 0v140.2h-3.8V3.5Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <XAxisLabels labels={['Q1', 'Q2', 'Q3', 'Q4']} />
        </div>
      </div>

      {/* ── Card: Total ARR (half width, hidden below xs) ── */}
      <div className="hidden xs:flex flex-col px-[15px] col-span-1 h-[240px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Total ARR</span>
          </div>
          <div className="flex gap-x-[14px]">
            <LegendDot color="bg-blue-500" label="US" />
            <LegendDot color="bg-green-500" label="EMEA" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 gap-x-[3px]">
            <YAxisLabels labels={['1.4m', '0.7m', '0.0m']} />
            <div className="relative mb-[6.5px] flex-1">
              <ChartGridLines count={3} />
              <DashedLine top="top-[35%]" />
              <div className="absolute inset-0">
                <div className="h-full w-full">
                  <svg className="h-full w-full" viewBox="0 0 105 124" fill="none" preserveAspectRatio="none">
                    <path fill="#54D490" d="m15 104.1-15 5.6v14.4h105.1V23l-15-16.8-15 8.3L60 72.2H44.9L30 90.2l-15 14Z" opacity=".1" />
                    <path stroke="#54D490" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m0 110 15.2-5.6 15-14 15-18.2H60l15-59L90 6.3l15 16.8" />
                    <path fill="#266DF0" d="m15.1 110.6-15.1 3v10h105V79l-15 4.5-15 4.9-15 6.8-15 5.8-15 4.8-14.9 4.8Z" opacity=".1" />
                    <path stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m0 113.7 15.1-3 14.9-4.8 15-4.9 15-5.8 15-6.8 15-5 15-3.4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <XAxisLabels labels={['Q1', 'Q2', 'Q3', 'Q4']} />
        </div>
      </div>

    </div>
  )
}

// ── Slide 2: Sales Leads ─────────────────────────────────────────────────────

function SalesIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round" />
      <path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round" />
      <path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.1475 5.65347H10.2332" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.42822 1.20001H9.51394" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MobileSlide2() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:px-4 pb-8">

      {/* ── Card: Pipeline Funnel (full width, image) ── */}
      <div className="flex flex-col col-span-2 h-[280px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] pb-4 px-[15px]">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Pipeline Funnel</span>
            <div className="flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
              <SalesIcon />
              <span className="text-accent-foreground text-xs">Sales</span>
            </div>
          </div>
        </div>
        <div className="flex-1 px-3 pb-2">
          <div className="relative h-full">
            <Image
              src="/assets/images/platform/reporting/hero/reporting-hero-sales-funnel-chart-mobile.svg"
              alt=""
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* ── Card: US Lead Locations (half width, hidden below xs) ── */}
      <div className="hidden xs:flex flex-col overflow-hidden col-span-1 h-[240px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex flex-col gap-y-2.5 pt-[15px] border-subtle-stroke border-b px-[15px] pb-[15px]">
          <div className="flex items-center justify-between gap-x-1 overflow-hidden">
            <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">US Lead Locations</span>
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            src="/assets/images/platform/reporting/hero/reporting-hero-sales-map.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Card: ARR Contribution stat (full → half on xs+) ── */}
      <div className="flex flex-col items-center justify-center gap-y-4 col-span-2 xs:col-span-1 h-[240px] w-full rounded-2xl border border-subtle-stroke bg-primary-background shadow-lg">
        <div className="flex items-center">
          <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
          <span className="py-0.5 text-tertiary-foreground text-xs">ARR Contribution</span>
        </div>
        <p className="font-semibold text-[26px] text-primary-foreground leading-[36px] -tracking-[0.52px]">
          US $15.9k
        </p>
        <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
          <span>Sales</span>
          <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function ReportingHeroCards() {
  const [active, setActive] = useState<Active>(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1 },
    slideChanged(slider) {
      setActive(slider.track.details.rel as Active)
    },
  })

  // Tab nav slider — free-scroll, auto-sized slides
  const [tabSliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 'auto' },
    mode: 'free',
  })

  const handleSelect = (i: Active) => {
    setActive(i)
    instanceRef.current?.moveToIdx(i)
  }

  return (
    <section>
      <div className="container lg:pb-16 xl:pb-24">

        {/* ── Desktop grid (lg+) ──────────────────────────────── */}
        <div className={cn(
          'hidden lg:grid',
          'grid-cols-4 xl:grid-cols-5',
          'grid-rows-[repeat(10,37px)]',
          'gap-6 lg:mt-16 xl:mt-[46px]',
        )}>

          {/* Card 1 — col 1, rows 1–6 */}
          <div className="col-start-1 row-start-1 row-span-6">
            <Card1 active={active} />
          </div>

          {/* Card 2 — col 2, rows 2–9, xl only */}
          <div className="hidden xl:block col-start-2 row-start-2 row-span-8">
            <Card2 active={active} />
          </div>

          {/* Card 5 — col 5, rows 1–5 (xl only) */}
          <div className="xl:block col-start-4 xl:col-start-5 row-start-1 row-span-6">
            <Card5 active={active} />
          </div>

          {/* Nav card — col 3, rows 2–6 (xl: rows 3–7) */}
          <div className="col-star-2 xl:col-start-3 row-start-2 row-span-5 xl:row-start-3 xl:row-span-4 relative">
            <NavCard active={active} onSelect={handleSelect} />
          </div>

          {/* Card 4 — col 4, rows 2–7 */}
          <div className="col-start-3 xl:col-start-4 row-start-2 row-span-5">
            <Card4 active={active} />
          </div>

          {/* Stat — col 1, rows 7–10 */}
          <div className="col-start-1 row-start-7 row-span-4">
            <StatCard active={active} />
          </div>

          {/* Card 7 — col 5, rows 6–10 (xl only) */}
          <div className="xl:block col-start-4 xl:col-start-5 row-start-7 row-span-4">
            <Card7 active={active} />
          </div>

          {/* Card 6 — cols 3–4, rows 8–10 */}
          <div className="col-start-2 xl:col-start-3 col-span-2 row-start-7 row-span-3">
            <Card6 active={active} />
          </div>

        </div>

        {/* ── Mobile slider (below lg) ─────────────────────────── */}
        <div className="mt-8 flex w-full flex-col lg:hidden">

          {/* Tab navigation — scrollable pill tabs */}
          <ul className="scrollbar-none flex w-full justify-start overflow-x-auto overflow-y-hidden sm:justify-center">
            <div ref={tabSliderRef} className="keen-slider justify-start sm:justify-center">
              {REPORTING_NAV_REPORTS.map((report, i) => (
                <li
                  key={i}
                  className="keen-slider__slide px-1 py-1 first:pl-4 xs:first:pl-6 last:pr-4 xs:last:pr-6"
                  style={{ maxWidth: 'fit-content', minWidth: 'fit-content' }}
                >
                  <button
                    onClick={() => handleSelect(i as Active)}
                    className={cn(
                      'flex shrink-0 cursor-pointer flex-col gap-x-1 whitespace-nowrap rounded-xl border border-subtle-stroke px-4 py-2.5 text-left text-sm',
                      'transition-[background-color,box-shadow] duration-200 ease-out',
                      'focus-visible:outline-hidden focus-visible:ring-3 focus-visible:active:ring-2',
                      active === i ? 'bg-surface' : 'bg-primary-background',
                    )}
                  >
                    <div className="text-sm text-tertiary-foreground -tracking-[0.28px]">{report.name}</div>
                    <div className="text-caption-foreground text-xs">{report.description}</div>
                  </button>
                </li>
              ))}
            </div>
          </ul>

          {/* Content slides */}
          <div ref={sliderRef} className="keen-slider mt-6 mx-auto max-w-[448px] lg:max-w-none">
            <div className="keen-slider__slide">
              <MobileSlide0 />
            </div>
            <div className="keen-slider__slide">
              <MobileSlide1 />
            </div>
            <div className="keen-slider__slide">
              <MobileSlide2 />
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-x-2 mt-4 pb-2">
            {([0, 1, 2] as Active[]).map((i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  'h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-200 ease-out',
                  'focus-visible:outline-hidden focus-visible:ring-3 focus-visible:active:ring-2',
                  active === i ? 'bg-slate-300' : 'bg-slate-100',
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
