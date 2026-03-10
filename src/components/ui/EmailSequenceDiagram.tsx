'use client'

/**
 * EmailSequenceDiagram
 *
 * Animated SVG showing email sequences branching from a central hub circle
 * to three pill-shaped contact cards on the right.
 *
 * Designed to be passed as the `visual` prop of a NumberedGridItem inside
 * <FeatureGridSection>. The SVG fills the parent's aspect-[5/3] relative
 * container via `absolute inset-0 size-full object-contain`.
 *
 * ── Geometry ──────────────────────────────────────────────────────────────────
 *   ViewBox: 0 0 480 200
 *   Circle:  center (82, 100), r=36   ← shifted +5 right to match the
 *                                        original translate(5,0) group
 *   Paths and card positions are taken verbatim from the Attio reference SVG.
 *
 * ── Animation (viewport-triggered, loops indefinitely) ────────────────────────
 *   A short blue pulse travels from the circle to each contact card on repeat,
 *   like feeding/sending data to them. The three branches are staggered so a
 *   pulse is always traveling somewhere. Cards are always visible — no entrance.
 *
 *   Stagger:  middle → 0 s  |  top → 0.5 s  |  bottom → 1.0 s
 *   Cycle:    1.3 s travel + 0.9 s pause = 2.2 s per branch
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Design tokens (must match tailwind.config.ts) ────────────────────────────
const BLUE        = '#709ff5'   // blue-400 — animated pulse stroke
const GRAY        = '#D3D8DF'   // subtle stroke — dashed base + card border
const BLUE_AVATAR = '#266DF0'   // blue-500 — avatar background square

// ─── Layout constants ─────────────────────────────────────────────────────────
/** Circle center (original cx=77 + translate(5,0) = 82) */
const CX = 82
const CY = 100
const CR = 36   // radius

// ─── Types ────────────────────────────────────────────────────────────────────
interface CardData {
  x: number; y: number
  width: number; height: number
  /** Top-left corner of the 21×21 avatar square */
  avatarX: number; avatarY: number
  time: string
  name: string
}

interface BranchData {
  /** SVG path d — copied verbatim from the Attio reference (matches geometry) */
  path: string
  card: CardData
}

// ─── Branch data ──────────────────────────────────────────────────────────────
const BRANCHES: BranchData[] = [
  {
    path: 'M102 100H264.5',
    card: {
      x: 209.5, y: 80.5, width: 200, height: 39,
      avatarX: 276.5, avatarY: 89.5,
      time: '1:15 PM', name: 'James Wilson',
    },
  },
  {
    path: 'M116 100V100C121.944 100 124.915 100 127.602 99.5391C136.708 97.9765 144.694 92.5543 149.507 84.6672C150.926 82.3406 152.023 79.5785 154.216 74.0544L162.849 52.3081C167.479 40.6449 169.794 34.8133 173.679 30.5228C177.111 26.7318 181.402 23.8187 186.192 22.0274C191.613 20.0001 197.887 20.0001 210.436 20.0001L276 20',
    card: {
      x: 177.5, y: 0.5, width: 192, height: 39,
      avatarX: 244.5, avatarY: 9.5,
      time: '9:15 AM', name: 'Maria Garcia',
    },
  },
  {
    path: 'M116 99.9585V99.9585C121.944 99.9585 124.915 99.9585 127.602 100.419C136.708 101.982 144.694 107.404 149.507 115.291C150.926 117.618 152.023 120.38 154.216 125.904L162.849 147.65C167.479 159.314 169.794 165.145 173.679 169.436C177.111 173.227 181.402 176.14 186.192 177.931C191.613 179.958 197.887 179.958 210.436 179.958L293 179.958',
    card: {
      x: 241.5, y: 160.5, width: 197, height: 39,
      avatarX: 312.5, avatarY: 169.5,
      time: '3:30 PM', name: 'Priya Patel',
    },
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * User avatar — 21×21 blue rounded square with white head + body paths.
 * Rendered with native SVG paths (no foreignObject) for cross-browser reliability.
 * Paths are in local [0 0 21 21] space; positioned via `transform="translate"`.
 */
function UserAvatar({ x, y, isActive, index }: { x: number; y: number; isActive: boolean; index: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Blue rounded square — opacity animates with the brush, white paths stay on top */}
      <motion.rect
        width="21" height="21" rx="5.25" fill={BLUE_AVATAR}
        animate={isActive ? { opacity: [0.3, 0.3, 1, 1, 0.3, 0.3] } : { opacity: 0.3 }}
        transition={{
          duration: 1.2 + 1.5,
          delay: index * 1.2,
          times: [0, 0.15, 0.22, 0.44, 0.58, 1],
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      {/* Head */}
      <path
        d="M10.5 9.75C12.157 9.75 13.5 8.407 13.5 6.75C13.5 5.093 12.157 3.75 10.5 3.75C8.843 3.75 7.5 5.093 7.5 6.75C7.5 8.407 8.843 9.75 10.5 9.75Z"
        fill="white"
      />
      {/* Body */}
      <path
        d="M16.5 14.956C16.5 15.809 15.809 16.5 14.956 16.5H6.044C5.191 16.5 4.5 15.809 4.5 14.956C4.5 12.909 6.159 11.25 8.206 11.25H12.794C14.841 11.25 16.5 12.909 16.5 14.956Z"
        fill="white"
      />
    </g>
  )
}

/**
 * One branch: static dashed gray base + looping blue pulse + always-visible card.
 *
 * The pulse uses strokeDashoffset animation (not Framer Motion's pathLength)
 * so it travels as a short segment rather than drawing the full path.
 */
function Branch({ data, index, isInView }: { data: BranchData; index: number; isInView: boolean }) {
  const { card } = data
  const textY = card.y + card.height * 0.65

  return (
    <g>
      {/* Gray dashed base — always visible, shows the full path */}
      <path
        d={data.path}
        stroke={GRAY}
        strokeWidth={1.5}
        strokeDasharray="4 4"
        strokeLinecap="round"
        fill="none"
      />

      {/*
       * Blue traveling brush — Attio technique:
       *   pathLength={1} normalises the path to 1 unit for all dash calculations.
       *   strokeDasharray="0.15px 1px" → brush = 15% of path, gap = 100% (one brush).
       *   strokeDashoffset: 1.15 → brush is fully before the path start (invisible).
       *   strokeDashoffset: -0.15 → brush is fully past the path end (invisible).
       *   Only strokeDashoffset is animated — the brush enters, travels, and exits
       *   cleanly with no jump on reset.
       *   Stagger: middle 0 s, top 0.5 s, bottom 1.0 s.
       */}
      {/*
       * pathLength={1} → normalises path to 1 unit for dash calculations.
       * strokeDasharray="1 1" → dash = full path length, gap = full path length.
       * offset  1 → brush is one full length BEFORE the path (invisible).
       * offset -1 → brush is one full length PAST  the path (invisible).
       * As offset goes 1 → -1 the brush sweeps left-to-right across the full path
       * like a current, entering from one side and exiting cleanly the other.
       */}
      <motion.path
        d={data.path}
        stroke="#266df0"
        fill="none"
        strokeWidth={1.5}
        pathLength={1}
        strokeDasharray="1 1"
        initial={{ strokeDashoffset: 1 }}
        animate={
          isInView
            ? { strokeDashoffset: -1 }
            : { strokeDashoffset: 1 }
        }
        transition={{
          duration: 1.2,
          delay: index * 1.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.5,
          repeatType: 'loop',
        }}
      />

      {/* Pill card — solid white bg always blocks the line, border/text animate */}
      <g>
        {/* Solid white background — always fully opaque, always covers the line */}
        <rect
          x={card.x} y={card.y}
          width={card.width} height={card.height}
          rx={19.5} fill="white"
        />
        {/* Border — tint in rest, full gray when brush arrives */}
        <motion.rect
          x={card.x} y={card.y}
          width={card.width} height={card.height}
          rx={19.5} fill="none"
          animate={
            isInView
              ? { stroke: [GRAY+'40', GRAY+'40', GRAY, GRAY, GRAY+'40', GRAY+'40'] }
              : { stroke: GRAY + '40' }
          }
          transition={{
            duration: 1.2 + 1.5,
            delay: index * 1.2,
            times: [0, 0.15, 0.22, 0.44, 0.58, 1],
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
        {/* Timestamp */}
        <motion.text
          x={card.x + 14} y={textY} fontSize={12}
          animate={
            isInView
              ? { fill: ['#9fa1a740', '#9fa1a740', '#9fa1a7', '#9fa1a7', '#9fa1a740', '#9fa1a740'] }
              : { fill: '#9fa1a740' }
          }
          transition={{
            duration: 1.2 + 1.5, delay: index * 1.2,
            times: [0, 0.15, 0.22, 0.44, 0.58, 1], repeat: Infinity, repeatType: 'loop',
          }}
        >
          {card.time}
        </motion.text>

        <UserAvatar x={card.avatarX} y={card.avatarY} isActive={isInView} index={index} />

        {/* Contact name */}
        <motion.text
          x={card.avatarX + 27} y={textY} fontSize={13} fontWeight="500"
          animate={
            isInView
              ? { fill: ['#23252940', '#23252940', '#232529', '#232529', '#23252940', '#23252940'] }
              : { fill: '#23252940' }
          }
          transition={{
            duration: 1.2 + 1.5, delay: index * 1.2,
            times: [0, 0.15, 0.22, 0.44, 0.58, 1], repeat: Infinity, repeatType: 'loop',
          }}
        >
          {card.name}
        </motion.text>
      </g>
    </g>
  )
}

// ─── Exported component ────────────────────────────────────────────────────────

export function EmailSequenceDiagram() {
  const ref = useRef<SVGSVGElement>(null)
  // once: true — pulses start looping the first time the component enters viewport
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <svg
      ref={ref}
      viewBox="0 0 480 200"
      fill="none"
      className="absolute inset-0 size-full object-contain"
      aria-hidden
    >
      {/*
       * Branches render BEFORE the circle so the circle's white fill
       * paints over the path segments that pass inside it.
       */}
      {BRANCHES.map((branch, i) => (
        <Branch key={i} data={branch} index={i} isInView={isInView} />
      ))}

      {/* ── Central email circle ─────────────────────────────────────────── */}
      <circle cx={CX} cy={CY} r={CR} fill="white" stroke={BLUE} />

      {/*
       * Mail icon — Lucide Mail (24×24 viewBox) scaled to 26×26 SVG units
       * and centered inside the circle at (CX, CY).
       *
       * scale(26/24) ≈ 1.083  |  translate: center icon at (CX-13, CY-13)
       */}
      <g
        transform={`translate(${CX - 13}, ${CY - 13}) scale(${26 / 24})`}
        stroke="#5089F3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Envelope rectangle */}
        <rect x="2" y="4" width="20" height="16" rx="2" />
        {/* V-flap */}
        <polyline points="22,4 12,13 2,4" />
      </g>
    </svg>
  )
}
