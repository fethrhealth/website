/**
 * BentoIllustrationConnectData
 *
 * contentB visual for the "Connect any type of data" bento row (i === 2).
 * 2-column × 4-row grid of integration logo cards, with:
 *   - 2 solid vertical lines spanning all rows (left/right of the logo columns)
 *   - 4 dashed horizontal lines crossing the center gap (one per row)
 *
 * Grid breakdown (10 cols × 4 rows, 50px row height, 14px row gap):
 *   col 3 rows 1–4 → left logo cards   (Logo1, Logo3, Logo5, Logo7)
 *   col 7 rows 1–4 → right logo cards  (Logo2, Logo4, Logo6, Logo8)
 *   col 3 row-span-4 → left vertical line
 *   col 7 row-span-4 → right vertical line
 *   cols 4–7 per row → dashed horizontal line
 */

import Image from 'next/image'
import type { ReactNode } from 'react'

// ─── Logo card positions ───────────────────────────────────────────────────────

const LOGOS = [
  { src: '/assets/icons/home/connect-data/Logo1.svg', col: 3, row: 1 },
  { src: '/assets/icons/home/connect-data/Logo2.svg', col: 7, row: 1 },
  { src: '/assets/icons/home/connect-data/Logo3.svg', col: 3, row: 2 },
  { src: '/assets/icons/home/connect-data/Logo4.svg', col: 7, row: 2 },
  { src: '/assets/icons/home/connect-data/Logo5.svg', col: 3, row: 3 },
  { src: '/assets/icons/home/connect-data/Logo6.svg', col: 7, row: 3 },
  { src: '/assets/icons/home/connect-data/Logo7.svg', col: 3, row: 4 },
  { src: '/assets/icons/home/connect-data/Logo8.svg', col: 7, row: 4 },
] as const

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoIllustrationConnectData(): ReactNode {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="grid w-[250px] place-items-center items-center gap-y-[14px] *:flex *:items-center *:justify-center"
        style={{
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows:    'repeat(4, 50px)',
        }}
      >

        {/* ── Solid vertical line — left (col 3, all 4 rows) ─────────────── */}
        <div
          className="col-span-2 row-span-4 row-start-1 flex items-center justify-center"
          style={{ gridColumnStart: 3 }}
        >
          <svg width="1" height="100%" className="min-h-[400px] text-white-300" aria-hidden>
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Solid vertical line — right (col 7, all 4 rows) ────────────── */}
        <div
          className="col-span-2 row-span-4 row-start-1 flex items-center justify-center"
          style={{ gridColumnStart: 7 }}
        >
          <svg width="1" height="100%" className="min-h-[400px] text-white-300" aria-hidden>
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Dashed horizontal lines — center gap (cols 4–7, rows 1–4) ──── */}
        {([1, 2, 3, 4] as const).map((row) => (
          <div
            key={row}
            className="col-span-4 flex h-full w-full items-center justify-center"
            style={{ gridColumnStart: 4, gridRowStart: row }}
          >
            <svg width="100%" height="1" className="text-white-300" aria-hidden>
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>
        ))}

        {/* ── Logo cards — z-[1] to sit above the spanning line containers ── */}
        {LOGOS.map(({ src, col, row }) => (
          <div
            key={src}
            className="relative z-[1] col-span-2 h-full w-full rounded-[12px] border border-[#EDEFF3] bg-white-0"
            style={{ gridColumnStart: col, gridRowStart: row }}
          >
            <Image
              src={src}
              alt="logo"
              width={30}
              height={30}
              className="h-full w-full object-contain p-[10px]"
            />
          </div>
        ))}

      </div>
    </div>
  )
}
