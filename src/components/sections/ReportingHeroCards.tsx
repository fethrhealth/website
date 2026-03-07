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

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// ─── Report list shown in the NAV card ────────────────────────────────────────

const REPORTS = [
  { name: 'Product-led Growth', description: 'Data for our PLG reporting.' },
  { name: 'Revenue Operations', description: 'Dashboard for revenue data.' },
  { name: 'Sales Leads', description: 'An overview of our pipeline.' },
] as const

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

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            Active and Habit
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
            <span className="text-accent-foreground text-xs">Workspaces</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="Active" />
          <LegendDot color="bg-blue-300" label="Habit" />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-product-growth-pie-chart.svg"
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
            Paid Accounts
          </span>
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">Workspaces</span>
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
            US Lead Locations
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
            <span className="text-accent-foreground text-xs">Sales</span>
          </div>
        </div>
      </div>
      {/* Map area */}
      <div className="relative flex-1">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-sales-map.svg"
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

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Seat Counts</span>
          {/* TODO: badge */}
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="1 to 5" />
          <LegendDot color="bg-blue-300" label="6 to 10" />
          <LegendDot color="bg-blue-200" label="11 to 20" />
        </div>
      </div>
      <div className="relative flex-1">
        {/* TODO: stacked bar chart */}
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Cumulative Leads</span>
          {/* TODO: badge */}
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="US" />
          <LegendDot color="bg-blue-300" label="EMEA" />
        </div>
      </div>
      <div className="relative flex-1">
        {/* TODO: line chart SVG */}
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Win / Loss Ratio</span>
          {/* TODO: badge */}
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="Won" />
          <LegendDot color="bg-blue-300" label="Lost" />
        </div>
      </div>
      <div className="relative flex-1">
        {/* TODO: chart */}
      </div>
    </CardShell>
  )
}

// ─── CARD 5 ───────────────────────────────────────────────────────────────────
// col-start-5 · row-start-1 · row-span-5

function Card5({ active }: { active: Active }) {

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Pipeline Funnel</span>
          {/* TODO: badge */}
        </div>
      </div>
      <div className="relative flex-1">
        {/* TODO: funnel image */}
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 pt-[15px] border-b border-subtle-stroke px-[15px] pb-[15px]">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            EU Account Distribution
          </span>
          {/* Badge — workspace */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">Workspaces</span>
          </div>
        </div>
      </div>
      {/* Map area */}
      <div className="relative flex-1">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-sales-map.svg"
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
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Rep Leaderboard</span>
          {/* TODO: badge */}
        </div>
      </div>
      <div className="relative flex-1">
        {/* TODO: leaderboard table or chart */}
      </div>
    </CardShell>
  )
}

// ─── CARD 4 ───────────────────────────────────────────────────────────────────
// col-start-4 · row-start-2 · row-span-6

function Card4({ active }: { active: Active }) {

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">ARR Waterfall</span>
          {/* TODO: badge */}
        </div>
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="New" />
          <LegendDot color="bg-blue-300" label="Expansion" />
          <LegendDot color="bg-blue-200" label="Churn" />
        </div>
      </div>
      <div className="relative flex-1">
        {/* TODO: waterfall chart */}
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell className="items-center justify-center gap-y-4">
      <div className="flex items-center">
        <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
        <span className="py-0.5 text-tertiary-foreground text-xs">Average ARR Contribution</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        US $13,125.00
      </p>
      <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
        <span>Sales</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>ARR Contri...</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>Won</span>
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
            Target Plan Distribution
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
            <span className="text-accent-foreground text-xs">Workspaces</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="Paid" />
          <LegendDot color="bg-blue-300" label="Pro" />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1 flex justify-center items-start">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-sales-pie-chart.svg"
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

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell className="items-center justify-center gap-y-4">
      <div className="flex items-center">
        <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
        <span className="py-0.5 text-tertiary-foreground text-xs">Average Weekly Sessions</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        79 sessions
      </p>
      <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
        <span>Workspaces</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>Session Count</span>
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
            Won Accounts by Plan
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">Sales</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-x-[14px]">
          <LegendDot color="bg-blue-500" label="Pro" />
          <LegendDot color="bg-blue-300" label="Plus" />
          <LegendDot color="bg-blue-100" label="Enterprise" />
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-revenue-operations-pie-chart.svg"
          alt=""
          fill
          className="object-scale-down object-top pb-4"
        />
      </div>
    </CardShell>
  )

  // ── State 2: Sales Leads ──────────────────────────────────────────────────────
  return (
    <CardShell className="items-center justify-center gap-y-4">
      <div className="flex items-center">
        <div className="m-[5px] h-[9px] w-[9px] rounded-[3px] bg-blue-500" />
        <span className="py-0.5 text-tertiary-foreground text-xs">Qualified Leads</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        1,284
      </p>
      {/* TODO: subtitle / context row */}
    </CardShell>
  )
}

// ─── CARD 7 ───────────────────────────────────────────────────────────────────
// col-start-5 · row-start-6 · row-span-5

function Card7({ active }: { active: Active }) {

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 pt-[15px] border-b border-subtle-stroke px-[15px] pb-[15px]">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">
            Workspace Demographics
          </span>
          {/* Badge — workspace */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <g clipPath="url(#ws1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.185547 4.38773C0.185547 2.88321 0.185547 2.13095 0.478346 1.5563C0.735899 1.05083 1.14686 0.639861 1.65234 0.382307C2.22699 0.0895081 2.97925 0.0895081 4.48377 0.0895081H6.63289C8.13741 0.0895081 8.88967 0.0895081 9.46432 0.382307C9.96979 0.639861 10.3808 1.05083 10.6383 1.5563C10.9311 2.13095 10.9311 2.88321 10.9311 4.38773V6.53685C10.9311 8.04137 10.9311 8.79363 10.6383 9.36828C10.3808 9.87375 9.96979 10.2847 9.46432 10.5423C8.88967 10.8351 8.13741 10.8351 6.63289 10.8351H4.48377C2.97925 10.8351 2.22699 10.8351 1.65234 10.5423C1.14686 10.2847 0.735899 9.87375 0.478346 9.36828C0.185547 8.79363 0.185547 8.04137 0.185547 6.53685V4.38773Z" fill="#14AED6" />
              </g>
              <defs><clipPath id="ws1"><rect width="10.7456" height="10.7456" fill="white" transform="translate(0.185547 0.0893173)" /></clipPath></defs>
            </svg>
            <span className="text-accent-foreground text-xs">Workspaces</span>
          </div>
        </div>
      </div>
      {/* Map area */}
      <div className="relative flex-1">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-product-growth-map.svg"
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
            Pipeline Funnel
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">Sales</span>
          </div>
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1 px-3 pb-2">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-revenue-operations-funnel-chart.svg"
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
        <span className="py-0.5 text-tertiary-foreground text-xs">ARR Contribution</span>
      </div>
      <p className="font-semibold text-[28px] text-primary-foreground leading-[36px] -tracking-[0.56px]">
        US $15,990.00
      </p>
      <div className="flex items-center text-accent-foreground text-sm -tracking-[0.28px]">
        <span>Sales</span>
        <svg className="h-4 w-4 -rotate-90 text-disabled-foreground" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
        </svg>
        <span>Total Pipeline ARR</span>
      </div>
    </CardShell>
  )
}

// ─── CARD 6 ───────────────────────────────────────────────────────────────────
// col-start-3 · col-span-2 · row-start-8 · row-span-3

function Card6({ active }: { active: Active }) {

  // ── State 0: Product-led Growth ──────────────────────────────────────────────
  if (active === 0) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">New Leads by Source</span>
          {/* TODO: badge */}
        </div>
      </div>
      <div className="relative flex-1 px-[15px]">
        {/* TODO: grouped bar chart SVG */}
      </div>
    </CardShell>
  )

  // ── State 1: Revenue Operations ──────────────────────────────────────────────
  if (active === 1) return (
    <CardShell>
      <div className="flex flex-col gap-y-2.5 px-[15px] pt-[15px] pb-4">
        <div className="flex items-center justify-between gap-x-1 overflow-hidden">
          <span className="truncate text-primary-foreground text-sm -tracking-[0.28px]">Lead → Closed-Won Funnel</span>
          {/* TODO: badge */}
        </div>
      </div>
      <div className="relative flex-1 px-[15px]">
        {/* TODO: funnel chart */}
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
            Pipeline Funnel
          </span>
          {/* Badge — Workspaces */}
          <div className="hidden lg:flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-[1px]">
            {/* Workspaces icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_907_98105)"><path d="M6.857 8.91379C5.99986 8.91379 3.94272 8.48522 2.57129 6.77094" stroke="#75777C" strokeLinejoin="round"></path><path d="M4.71387 9.77094C4.14244 9.77094 2.74244 9.5138 1.71387 8.48523" stroke="#75777C" strokeLinejoin="round"></path><path d="M3.72611 3.87933L0.935767 9.78462C0.639406 10.3634 1.23169 10.9946 1.82978 10.7374L7.6923 8.67036" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M6.80197 5.05579C7.94081 6.36838 8.4537 7.90537 7.94755 8.48874C7.4414 9.07211 6.10788 8.48097 4.96905 7.16838C3.83021 5.85579 3.31732 4.3188 3.82347 3.73543C4.32962 3.15206 5.66314 3.7432 6.80197 5.05579Z" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M6.77523 1.25149C7.38752 1.73641 7.53705 2.4673 7.47727 3.08235" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M8.86183 3.93946C9.49134 3.57601 10.1208 3.21256 11.1424 3.52822" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M10.1475 5.65347H10.2332" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path><path d="M9.42822 1.20001H9.51394" stroke="#75777C" stroke-linecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_907_98105"><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg>
            <span className="text-accent-foreground text-xs">Sales</span>
          </div>
        </div>
      </div>
      {/* Chart area */}
      <div className="relative flex-1 px-3 pb-2">
        <Image
          src="/assets/images/platform/reporting/hero/reporting-hero-sales-funnel-chart.svg"
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
          {REPORTS[active].name}
        </span>
      </div>

      {/* Report buttons */}
      <div className="flex flex-1 flex-col mt-5 xl:mt-4 gap-y-2 xl:gap-y-[4px]">
        {REPORTS.map((report, i) => (
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

export function ReportingHeroCards() {
  const [active, setActive] = useState<Active>(0)

  return (
    <section>
      <div className="container">
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

          {/* Card 5 — col 5, rows 1–5 */}
          <div className="col-start-5 row-start-1 row-span-6">
            <Card5 active={active} />
          </div>

          {/* Nav card — col 3, rows 2–6 (xl: rows 3–7) */}
          <div className="col-start-3 row-start-2 row-span-5 xl:row-start-3 xl:row-span-4 relative">
            <NavCard active={active} onSelect={setActive} />
          </div>

          {/* Card 4 — col 4, rows 2–7 */}
          <div className="col-start-4 row-start-2 row-span-5">
            <Card4 active={active} />
          </div>

          {/* Stat — col 1, rows 7–10 */}
          <div className="col-start-1 row-start-7 row-span-4">
            <StatCard active={active} />
          </div>

          {/* Card 7 — col 5, rows 6–10 */}
          <div className="col-start-5 row-start-7 row-span-4">
            <Card7 active={active} />
          </div>

          {/* Card 6 — cols 3–4, rows 8–10 */}
          <div className="col-start-3 col-span-2 row-start-7 row-span-3">
            <Card6 active={active} />
          </div>

        </div>
      </div>
    </section>
  )
}
