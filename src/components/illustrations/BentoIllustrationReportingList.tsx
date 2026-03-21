'use client'

/**
 * BentoIllustrationReportingList
 *
 * contentB visual for the "Powerful reporting" bento row (i === 3).
 * Vertically cycling list of report types — one item highlighted at a time.
 *
 * Layout:
 *   Background layer: two dashed vertical rails + foggy gradient overlay
 *   Foreground layer: 5 report-type rows, active row gets bg + shadow + rounded
 *
 * Animation: cycles through items every 2 s, starts on inView.
 */

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Icons ────────────────────────────────────────────────────────────────────

const S = '#232529' // shared stroke color

function InsightIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8.03571" cy="7.83649" r="6.16071" stroke={S} strokeWidth="1.17857" strokeLinejoin="round" />
      <path d="M7.56152 1.67578L7.56152 4.88182C7.56152 6.08194 7.56152 6.68199 7.79508 7.14038C8.00052 7.54358 8.32834 7.8714 8.73154 8.07684C9.18993 8.3104 9.78998 8.3104 10.9901 8.3104H14.1961" stroke={S} strokeWidth="1.17857" strokeLinejoin="round" />
    </svg>
  )
}

function HistoricalValuesIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M14.4636 6.95647V6.9029C14.4636 5.40276 14.4636 4.65269 14.1716 4.07971C13.9148 3.57571 13.5051 3.16594 13.0011 2.90913C12.4281 2.61719 11.678 2.61719 10.1779 2.61719L5.89219 2.61719C4.39205 2.61719 3.64199 2.61719 3.06901 2.90913C2.56501 3.16593 2.15524 3.5757 1.89843 4.07971C1.60649 4.65268 1.60648 5.40275 1.60647 6.90288L1.60646 9.04574C1.60646 10.5459 1.60645 11.296 1.8984 11.8689C2.1552 12.3729 2.56497 12.7827 3.06898 13.0395C3.64196 13.3315 4.39203 13.3315 5.89218 13.3315L7.23144 13.3315" stroke={S} strokeWidth="1.17857" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.7133 5.28125L8.45906 7.60867C7.99382 8.08901 7.22225 8.08541 6.76152 7.60074C6.29146 7.10626 5.5007 7.11408 5.04051 7.61775L3.74902 9.03125" stroke={S} strokeWidth="1.17857" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11.7852" cy="10.9766" r="3" stroke={S} strokeWidth="1.07143" strokeLinecap="round" />
      <path d="M12.1602 9.85156L12.1602 10.9766L11.0352 10.9766" stroke={S} strokeWidth="1.07143" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FunnelIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.60647 6.62554L1.60646 8.76839C1.60646 10.2685 1.60645 11.0186 1.8984 11.5916C2.1552 12.0956 2.56497 12.5054 3.06898 12.7622C3.64196 13.0541 4.39203 13.0541 5.89218 13.0541L10.1779 13.0541C11.678 13.0541 12.4281 13.0541 13.0011 12.7622C13.5051 12.5054 13.9148 12.0956 14.1716 11.5916C14.4636 11.0186 14.4636 10.2686 14.4636 8.76842L14.4636 6.62556C14.4636 5.12542 14.4636 4.37535 14.1716 3.80237C13.9148 3.29836 13.5051 2.88859 13.0011 2.63179C12.4281 2.33984 11.678 2.33984 10.1779 2.33984L5.89219 2.33984C4.39206 2.33984 3.64199 2.33984 3.06901 2.63179C2.56501 2.88859 2.15524 3.29836 1.89843 3.80236C1.60649 4.37534 1.60648 5.1254 1.60647 6.62554Z" stroke={S} strokeWidth="1.17857" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.36133 10.099L4.36133 5.29495C4.36133 4.77654 4.88375 4.42118 5.36591 4.61162L11.4476 7.01366C12.0673 7.25843 12.0673 8.13554 11.4476 8.38031L5.36591 10.7824C4.88375 10.9728 4.36133 10.6174 4.36133 10.099Z" stroke={S} strokeWidth="1.10204" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.93359 4.83984L6.93359 10.5541" stroke={S} strokeWidth="1.10204" strokeLinejoin="round" />
      <path d="M9.50391 6.26953L9.50391 9.12667" stroke={S} strokeWidth="1.10204" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TimeInStageIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.1416" y="2.37891" width="2.67857" height="8.57143" rx="1.07143" stroke={S} strokeWidth="1.17857" />
      <path d="M9.37388 6.82702V5.32533V3.71819C9.37388 3.46927 9.37388 3.34481 9.3533 3.24131C9.26875 2.81628 8.93651 2.48404 8.51148 2.39949C8.40798 2.37891 8.28352 2.37891 8.0346 2.37891C7.78568 2.37891 7.66121 2.37891 7.55772 2.39949C7.13269 2.48404 6.80044 2.81628 6.7159 3.24131C6.69531 3.34481 6.69531 3.46927 6.69531 3.71819L6.69531 12.8253C6.69531 13.0743 6.69531 13.1987 6.7159 13.3022C6.80044 13.7272 7.13269 14.0595 7.55772 14.144C7.66121 14.1646 7.78568 14.1646 8.0346 14.1646" stroke={S} strokeWidth="1.17857" strokeLinecap="round" />
      <path d="M11.249 3.71819C11.249 3.46927 11.249 3.34481 11.2696 3.24131C11.3542 2.81628 11.6864 2.48404 12.1114 2.39949C12.2149 2.37891 12.3394 2.37891 12.5883 2.37891C12.8372 2.37891 12.9617 2.37891 13.0652 2.39949C13.4902 2.48404 13.8225 2.81628 13.907 3.24131C13.9276 3.34481 13.9276 3.46927 13.9276 3.71819V4.25391C13.9276 4.50283 13.9276 4.62729 13.907 4.73079C13.8225 5.15581 13.4902 5.48806 13.0652 5.5726C12.9617 5.59319 12.8372 5.59319 12.5883 5.59319C12.3394 5.59319 12.2149 5.59319 12.1114 5.5726C11.6864 5.48806 11.3542 5.15581 11.2696 4.73079C11.249 4.62729 11.249 4.50283 11.249 4.25391V3.71819Z" stroke={S} strokeWidth="1.17857" />
      <circle cx="11.7852" cy="11.2695" r="3" stroke={S} strokeWidth="1.07143" strokeLinecap="round" />
      <path d="M12.1602 10.1445L12.1602 11.2695L11.0352 11.2695" stroke={S} strokeWidth="1.07143" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function VariableIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.1416" y="2.51562" width="2.67857" height="8.57143" rx="1.07143" stroke={S} strokeWidth="1.17857" />
      <path d="M9.37388 6.96374V5.46205V3.85491C9.37388 3.60599 9.37388 3.48153 9.3533 3.37803C9.26875 2.953 8.93651 2.62076 8.51148 2.53621C8.40798 2.51563 8.28352 2.51563 8.0346 2.51562C7.78568 2.51562 7.66121 2.51562 7.55772 2.53621C7.13269 2.62076 6.80044 2.953 6.7159 3.37803C6.69531 3.48153 6.69531 3.60599 6.69531 3.85491L6.69531 11.5156C6.69531 12.1157 6.69531 12.4157 6.81209 12.6449C6.91481 12.8465 7.07872 13.0104 7.28032 13.1131C7.50951 13.2299 7.80954 13.2299 8.4096 13.2299H8.84888" stroke={S} strokeWidth="1.17857" strokeLinecap="round" />
      <path d="M11.249 3.85491C11.249 3.60599 11.249 3.48153 11.2696 3.37803C11.3542 2.953 11.6864 2.62076 12.1114 2.53621C12.2149 2.51562 12.3394 2.51562 12.5883 2.51562C12.8372 2.51563 12.9617 2.51563 13.0652 2.53621C13.4902 2.62076 13.8225 2.953 13.907 3.37803C13.9276 3.48153 13.9276 3.60599 13.9276 3.85491V4.39063C13.9276 4.63955 13.9276 4.76401 13.907 4.86751C13.8225 5.29253 13.4902 5.62478 13.0652 5.70932C12.9617 5.72991 12.8372 5.72991 12.5883 5.72991C12.3394 5.72991 12.2149 5.72991 12.1114 5.70932C11.6864 5.62478 11.3542 5.29253 11.2696 4.86751C11.249 4.76401 11.249 4.63955 11.249 4.39062V3.85491Z" stroke={S} strokeWidth="1.17857" />
    </svg>
  )
}

// ─── Item data ────────────────────────────────────────────────────────────────

const ITEMS = [
  { label: 'Insight',          icon: <InsightIcon />          },
  { label: 'Historical values', icon: <HistoricalValuesIcon /> },
  { label: 'Funnel',           icon: <FunnelIcon />           },
  { label: 'Time in stage',    icon: <TimeInStageIcon />      },
  { label: 'Variable',         icon: <VariableIcon />         },
] as const

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoIllustrationReportingList(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const [active, setActive] = useState(1)

  // Cycle through items every 2 s while in view
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % ITEMS.length)
    }, 2000)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className="absolute inset-0 grid">

      {/* ── Background layer: dashed vertical rails + foggy gradient ─────── */}
      <div className="relative col-start-1 row-start-1 h-full w-full">
        <div className="absolute left-1/2 flex h-full w-[251px] -translate-x-1/2">

          {/* Left rail */}
          <svg width="1" height="100%" className="relative top-1/2 h-full -translate-y-1/2 text-white-300" aria-hidden>
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>

          {/* Foggy gradient — creates a misty focus in the vertical center */}
          <div
            className="h-full basis-full"
            style={{ background: 'linear-gradient(to bottom, #fbfbfb00 0%, #fbfbfb4d 10%, #fbfbfccc 30%, #fbfbfb33 90%, #fbfbfb00 100%)' }}
          />

          {/* Right rail */}
          <svg width="1" height="100%" className="relative top-1/2 h-full -translate-y-1/2 text-white-300" aria-hidden>
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>

        </div>
      </div>

      {/* ── Foreground layer: report type list ───────────────────────────── */}
      <div className="relative col-start-1 row-start-1 mx-auto flex h-full w-full max-w-[278px] flex-col justify-center gap-y-2 overflow-hidden px-[9px]">
        {ITEMS.map(({ label, icon }, i) => (
          <div
            key={label}
            className={[
              'transition-all duration-500 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]',
              i === active ? 'rounded-lg bg-primary-background shadow-sm' : '',
            ].join(' ')}
          >
            <div className="flex w-full items-center gap-x-[9px] p-[9px]">
              {/* Icon container — gets bg fill when active */}
              <div
                className={[
                  'grid size-[30px] place-items-center rounded-md transition-colors duration-500',
                  i === active ? 'bg-[#FBFBFB]' : '',
                ].join(' ')}
              >
                {icon}
              </div>
              <span className="text-sm font-medium -tracking-[0.02em] text-secondary-foreground">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
