'use client'

/**
 * BentoIllustrationAIWorkflow
 *
 * Pixel-perfect direct HTML→TSX translation of Attio's "Deploy AI" bento visual.
 * Classes, div nesting, styles, and animations match the source HTML 1:1.
 *
 * Key structural differences vs AutomationWorkflowCanvas:
 *   - Connector uses Tailwind row-end-N classes (not inline gridRowEnd style)
 *   - Card wrappers: `relative flex max-w-[328px] flex-col gap-2.5` (Attio-exact)
 *   - AgentCard gradient border: nested opacity wrapper + h-full w-full inner div
 *   - Separator: SVG `bg-origin-padding px-3` approach (not mx-3 h-px div)
 *   - Inner flex wrapper: items-center (not items-start)
 *   - No explicit width on the grid (cards constrain via max-w-[328px])
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

// Exact space formatting from Attio's style attribute
const CARD_SHADOW =
  'drop-shadow(0px 4px 4px rgba(24, 39, 75, 0.04)) drop-shadow(0px 2px 4px rgba(24, 39, 75, 0.02))'

const T = {
  conn1:  { d: 0.20, t: 0.40 },
  badge1: { d: 0.65, t: 0.30 },
  conn2:  { d: 0.95, t: 0.40 },
  badge2: { d: 1.40, t: 0.30 },
  conn3:  { d: 1.70, t: 0.40 },
  badge3: { d: 2.15, t: 0.30 },
} as const

// ─── Gradient text ────────────────────────────────────────────────────────────
// Matches Attio's <span class="bg-center bg-clip-text text-transparent" style="...">
// pos: Tailwind bg-position class ("bg-center" | "bg-left")
// size: background-size value ("400%" | "200%" | "300%")

function G({ children, size, pos }: { children: ReactNode; size: string; pos: string }): ReactNode {
  return (
    <span
      className={`${pos} bg-clip-text text-transparent`}
      style={{
        backgroundAttachment: 'local',
        backgroundImage:      'linear-gradient(131.88deg, #DC8FA5 7.36%, #70A1F0 81.74%)',
        backgroundSize:       size,
        WebkitBackgroundClip: 'text',
      } as CSSProperties}
    >
      {children}
    </span>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function TriggerIcon(): ReactNode {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-[6px] border border-[#D6E5FF] bg-[#E5EEFF]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.4286 0.75H4.45H7.55H7.5714C8.1133 0.749995 8.55037 0.749991 8.90431 0.778909C9.26874 0.808684 9.58883 0.87159 9.88498 1.02248C10.3554 1.26217 10.7378 1.64462 10.9775 2.11502C11.1284 2.41117 11.1913 2.73126 11.2211 3.09569C11.25 3.44961 11.25 3.88667 11.25 4.42853V4.42858V4.45V5C11.25 5.27614 11.0261 5.5 10.75 5.5C10.4739 5.5 10.25 5.27614 10.25 5V4.45C10.25 3.8817 10.2496 3.48554 10.2244 3.17712C10.1997 2.87454 10.1536 2.70069 10.0865 2.56901C9.9427 2.28677 9.71323 2.0573 9.43099 1.91349C9.29931 1.8464 9.12546 1.80031 8.82288 1.77559C8.51446 1.75039 8.1183 1.75 7.55 1.75H4.45C3.8817 1.75 3.48554 1.75039 3.17712 1.77559C2.87454 1.80031 2.70069 1.8464 2.56901 1.91349C2.28677 2.0573 2.0573 2.28677 1.91349 2.56901C1.8464 2.70069 1.80031 2.87454 1.77559 3.17712C1.75039 3.48554 1.75 3.8817 1.75 4.45V7.55C1.75 8.1183 1.75039 8.51446 1.77559 8.82288C1.80031 9.12546 1.8464 9.29931 1.91349 9.43099C2.0573 9.71323 2.28677 9.9427 2.56901 10.0865C2.70069 10.1536 2.87454 10.1997 3.17712 10.2244C3.48554 10.2496 3.8817 10.25 4.45 10.25H5C5.27614 10.25 5.5 10.4739 5.5 10.75C5.5 11.0261 5.27614 11.25 5 11.25H4.45H4.42858H4.42853C3.88667 11.25 3.44961 11.25 3.09569 11.2211C2.73126 11.1913 2.41117 11.1284 2.11502 10.9775C1.64462 10.7378 1.26217 10.3554 1.02248 9.88498C0.87159 9.58883 0.808684 9.26874 0.778909 8.90431C0.749991 8.55037 0.749995 8.1133 0.75 7.5714V7.55V4.45V4.4286V4.42859C0.749995 3.8867 0.749991 3.44963 0.778909 3.09569C0.808684 2.73126 0.87159 2.41117 1.02248 2.11502C1.26217 1.64462 1.64462 1.26217 2.11502 1.02248C2.41117 0.87159 2.73126 0.808684 3.09569 0.778909C3.44963 0.749991 3.8867 0.749995 4.42859 0.75H4.4286ZM4.09284 2.65039L4.10978 2.65039H4.28978L4.30672 2.65039C4.46013 2.65038 4.60387 2.65036 4.72458 2.66023C4.85555 2.67093 5.00276 2.69569 5.14917 2.77028C5.35615 2.87574 5.52443 3.04402 5.62989 3.251C5.70449 3.39741 5.72924 3.54462 5.73995 3.6756C5.74981 3.7963 5.74979 3.94004 5.74978 4.09345L5.74978 4.11039V4.29039L5.74978 4.30733C5.74979 4.46075 5.74981 4.60448 5.73995 4.72519C5.72924 4.85616 5.70449 5.00337 5.62989 5.14978C5.52443 5.35676 5.35615 5.52504 5.14917 5.6305C5.00276 5.7051 4.85555 5.72985 4.72458 5.74056C4.60387 5.75042 4.46014 5.75041 4.30672 5.75039L4.28978 5.75039H4.10978L4.09284 5.75039C3.93943 5.75041 3.79569 5.75042 3.67499 5.74056C3.54401 5.72985 3.3968 5.7051 3.25039 5.6305C3.04341 5.52504 2.87513 5.35676 2.76967 5.14978C2.69508 5.00337 2.67032 4.85616 2.65962 4.72519C2.64975 4.60448 2.64977 4.46075 2.64978 4.30733L2.64978 4.29039V4.11039L2.64978 4.09345C2.64977 3.94004 2.64975 3.7963 2.65962 3.6756C2.67032 3.54462 2.69508 3.39741 2.76967 3.251C2.87513 3.04402 3.04341 2.87574 3.25039 2.77028C3.3968 2.69569 3.54401 2.67093 3.67499 2.66023C3.79569 2.65036 3.93943 2.65038 4.09284 2.65039ZM3.69865 3.66445C3.68433 3.67297 3.67236 3.68494 3.66384 3.69926C3.66221 3.70653 3.65899 3.724 3.65629 3.75703C3.65017 3.832 3.64978 3.93412 3.64978 4.11039V4.29039C3.64978 4.46666 3.65017 4.56879 3.65629 4.64375C3.65899 4.67678 3.66221 4.69425 3.66384 4.70152C3.67236 4.71584 3.68433 4.72781 3.69865 4.73633C3.70592 4.73796 3.72339 4.74118 3.75642 4.74388C3.83139 4.75 3.93351 4.75039 4.10978 4.75039H4.28978C4.46605 4.75039 4.56818 4.75 4.64314 4.74388C4.67617 4.74118 4.69364 4.73796 4.70091 4.73633C4.71523 4.72781 4.7272 4.71584 4.73572 4.70152C4.73735 4.69425 4.74057 4.67678 4.74327 4.64375C4.74939 4.56879 4.74978 4.46666 4.74978 4.29039V4.11039C4.74978 3.93412 4.74939 3.832 4.74327 3.75703C4.74057 3.724 4.73735 3.70653 4.73572 3.69926C4.7272 3.68494 4.71523 3.67297 4.70091 3.66445C4.69364 3.66283 4.67617 3.6596 4.64314 3.6569C4.56818 3.65078 4.46605 3.65039 4.28978 3.65039H4.10978C3.93351 3.65039 3.83139 3.65078 3.75642 3.6569C3.72339 3.6596 3.70592 3.66283 3.69865 3.66445ZM3.14978 6.54981C2.87364 6.54981 2.64978 6.77366 2.64978 7.04981C2.64978 7.32595 2.87364 7.54981 3.14978 7.54981H5.5C5.77614 7.54981 6 7.32595 6 7.04981C6 6.77366 5.77614 6.54981 5.5 6.54981H3.14978ZM2.64978 8.84961C2.64978 8.57347 2.87364 8.34961 3.14978 8.34961H4.5C4.77614 8.34961 5 8.57347 5 8.84961C5 9.12575 4.77614 9.34961 4.5 9.34961H3.14978C2.87364 9.34961 2.64978 9.12575 2.64978 8.84961ZM7.15214 8.40039L8.77302 6.6671V7.96039C8.77302 8.36908 9.10433 8.70039 9.51302 8.70039H10.1913L8.39336 10.4949V9.14039C8.39336 8.7317 8.06205 8.40039 7.65336 8.40039H7.15214ZM9.77302 6.00841C9.77302 5.33712 8.95103 5.01267 8.49253 5.50297L6.01254 8.15495C5.57036 8.62779 5.90564 9.40039 6.55303 9.40039H7.39336V11.1218C7.39336 11.7807 8.18975 12.111 8.65612 11.6455L11.3426 8.96415C11.8094 8.49817 11.4794 7.70039 10.8198 7.70039H9.77302V6.00841Z"
          fill="#266DF0"
        />
      </svg>
    </div>
  )
}

function AgentIcon(): ReactNode {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-[6px] border border-[#D6E5FF] bg-[#E5EEFF]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M10.75 6V4.45C10.75 3.3299 10.75 2.76984 10.532 2.34202C10.3403 1.96569 10.0343 1.65973 9.65798 1.46799C9.23016 1.25 8.67011 1.25 7.55 1.25L4.45 1.25C3.3299 1.25 2.76984 1.25 2.34202 1.46799C1.96569 1.65973 1.65973 1.96569 1.46799 2.34202C1.25 2.76984 1.25 3.32989 1.25 4.45L1.25 7.55C1.25 8.6701 1.25 9.23016 1.46799 9.65798C1.65973 10.0343 1.96569 10.3403 2.34202 10.532C2.76984 10.75 3.32989 10.75 4.45 10.75H6"
          stroke="#266DF0"
          strokeLinecap="round"
        />
        <rect x="3.14978" y="3.1499" width="2.1" height="2.1" rx="0.6" stroke="#266DF0" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.14978 7.0498H5.5" stroke="#266DF0" strokeLinecap="round" />
        <path d="M3.14978 8.8501H5"   stroke="#266DF0" strokeLinecap="round" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 8.75C7.5 8.05964 8.05964 7.5 8.75 7.5C9.44036 7.5 10 8.05964 10 8.75C10 9.44036 9.44036 10 8.75 10C8.05964 10 7.5 9.44036 7.5 8.75ZM8.75 6.5C7.50736 6.5 6.5 7.50736 6.5 8.75C6.5 9.99264 7.50736 11 8.75 11C9.19027 11 9.601 10.8735 9.94786 10.655L10.6465 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6465L10.655 9.94788C10.8735 9.60102 11 9.19028 11 8.75C11 7.50736 9.99264 6.5 8.75 6.5Z"
          fill="#266DF0"
        />
      </svg>
    </div>
  )
}

function SparkleIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.625 0.875C2.34886 0.875 2.1875 1.07292 2.15104 1.12135C2.08854 1.20052 2.04427 1.27969 2.01823 1.33594C1.96615 1.44844 1.92188 1.5849 1.89583 1.6849C1.88281 1.73281 1.875 1.77969 1.86979 1.82135C1.82813 1.82656 1.78125 1.83438 1.73333 1.84740C1.63333 1.87344 1.49688 1.91771 1.38438 1.96979C1.32813 1.99583 1.24896 2.03906 1.16979 2.10156C1.12135 2.13802 0.923958 2.29948 0.923958 2.57552C0.923958 2.85156 1.12135 3.01302 1.16979 3.04948C1.24896 3.11198 1.32813 3.15521 1.38438 3.18125C1.49688 3.23333 1.63333 3.2776 1.73333 3.30365C1.78125 3.31667 1.82813 3.32448 1.86979 3.32969C1.875 3.37135 1.88281 3.41823 1.89583 3.46615C1.92188 3.56615 1.96615 3.70260 2.01823 3.81510C2.04427 3.87135 2.08854 3.95052 2.15104 4.02969C2.1875 4.07813 2.34896 4.27552 2.625 4.27552C2.90104 4.27552 3.0625 4.07813 3.09896 4.02969C3.16146 3.95052 3.20573 3.87135 3.23177 3.81510C3.28385 3.70260 3.32813 3.56615 3.35417 3.46615C3.36719 3.41823 3.375 3.37135 3.38021 3.32969C3.42188 3.32448 3.46875 3.31667 3.51667 3.30365C3.61667 3.2776 3.75313 3.23333 3.86563 3.18125C3.92188 3.15521 4.00104 3.11198 4.08021 3.04948C4.12865 3.01302 4.32604 2.85156 4.32604 2.57552C4.32604 2.29948 4.12865 2.13802 4.08021 2.10156C4.00104 2.03906 3.92188 1.99583 3.86563 1.96979C3.75313 1.91771 3.61667 1.87344 3.51667 1.84740C3.46875 1.83438 3.42188 1.82656 3.38021 1.82135C3.375 1.77969 3.36719 1.73281 3.35417 1.6849C3.32813 1.5849 3.28385 1.44844 3.23177 1.33594C3.20573 1.27969 3.16146 1.20052 3.09896 1.12135C3.0625 1.07292 2.90104 0.875 2.625 0.875Z"
        fill="#5C5E63"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1.16667C6.77083 1.16667 6.60156 1.35417 6.5651 1.40365C6.44271 1.5651 6.32031 1.80729 6.20833 2.07292C5.98438 2.60417 5.78125 3.34896 5.64063 4.27083C5.60417 4.50521 5.41667 4.69271 5.18229 4.72917C4.26042 4.86979 3.51563 5.07292 2.98438 5.29688C2.71875 5.40885 2.47656 5.53125 2.31510 5.65365C2.26563 5.69010 2.07813 5.85938 2.07813 6.08854C2.07813 6.31771 2.26563 6.48698 2.31510 6.52344C2.47656 6.64583 2.71875 6.76823 2.98438 6.88021C3.51563 7.10417 4.26042 7.30729 5.18229 7.44792C5.41667 7.48438 5.60417 7.67188 5.64063 7.90625C5.78125 8.82813 5.98438 9.57292 6.20833 10.10417C6.32031 10.36979 6.44271 10.61198 6.5651 10.77344C6.60156 10.82292 6.77083 11.01042 7 11.01042C7.22917 11.01042 7.39844 10.82292 7.4349 10.77344C7.55729 10.61198 7.67969 10.36979 7.79167 10.10417C8.01563 9.57292 8.21875 8.82813 8.35938 7.90625C8.39583 7.67188 8.58333 7.48438 8.81771 7.44792C9.73958 7.30729 10.48438 7.10417 11.01563 6.88021C11.28125 6.76823 11.52344 6.64583 11.6849 6.52344C11.73438 6.48698 11.92188 6.31771 11.92188 6.08854C11.92188 5.85938 11.73438 5.69010 11.6849 5.65365C11.52344 5.53125 11.28125 5.40885 11.01563 5.29688C10.48438 5.07292 9.73958 4.86979 8.81771 4.72917C8.58333 4.69271 8.39583 4.50521 8.35938 4.27083C8.21875 3.34896 8.01563 2.60417 7.79167 2.07292C7.67969 1.80729 7.55729 1.5651 7.4349 1.40365C7.39844 1.35417 7.22917 1.16667 7 1.16667Z"
        fill="#5C5E63"
      />
    </svg>
  )
}

// ─── Connector ────────────────────────────────────────────────────────────────
// Uses Tailwind row-end-N classes directly (matching Attio's source HTML).
// Two absolute layers per connector: gray base (static) + blue (animated).

const VERT_D = 'M1 0V100'
const CORN_D = 'M1 0V1M1 1C1 9.83656 8.16345 17 17 17H24'
const LAYER  = 'absolute inset-0 flex h-full flex-col items-start pb-[82px]'

interface ConnectorProps {
  readonly rowEndClass: 'row-end-3' | 'row-end-4' | 'row-end-5'
  readonly delay:       number
  readonly dur:         number
  readonly inView:      boolean
}

function Connector({ rowEndClass, delay, dur, inView }: ConnectorProps): ReactNode {
  const vertDur = dur * 0.75
  const cornDur = dur * 0.25
  const cornDel = delay + vertDur

  return (
    <div className={`relative w-6 justify-self-end col-start-1 row-start-1 ${rowEndClass}`}>

      {/* Gray base layer */}
      <div className={LAYER} aria-hidden>
        <svg width="2" height="100%" viewBox="0 0 2 100" fill="none" className="h-full grow" preserveAspectRatio="none">
          <path d={VERT_D} stroke="#E4E7EC" />
        </svg>
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="shrink-0">
          <path d={CORN_D} stroke="#E4E7EC" />
        </svg>
      </div>

      {/* Blue animated layer */}
      <div className={LAYER} aria-hidden>
        <svg width="2" height="100%" viewBox="0 0 2 100" fill="none" className="h-full grow" preserveAspectRatio="none">
          <motion.path
            d={VERT_D}
            stroke="#70A1F0"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: vertDur, delay, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="shrink-0">
          <motion.path
            d={CORN_D}
            stroke="#70A1F0"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: cornDur, delay: cornDel, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
      </div>

    </div>
  )
}

// ─── Answer badge ─────────────────────────────────────────────────────────────

function AnswerBadge({
  children, delay, inView,
}: {
  children: ReactNode; delay: number; inView: boolean
}): ReactNode {
  return (
    <motion.div
      className="flex w-fit max-w-full items-center gap-1.5 rounded-[12px] border border-white-300 bg-[#FFFFFF] p-2 pr-2.5 [&>*:first-child]:shrink-0"
      initial={{ opacity: 0, y: 4 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      transition={{ duration: 0.3, delay }}
    >
      <SparkleIcon />
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-[#5C5E63] text-[12px] leading-4">
        {children}
      </p>
    </motion.div>
  )
}

// ─── Gradient border helpers ───────────────────────────────────────────────────

/** Blue-only border (TriggerCard) */
function BlueBorder(): ReactNode {
  return (
    <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-[#E6E7EA]">
      <div className="absolute inset-0" style={{ background: 'rgb(112, 161, 240)', opacity: 1 }} />
    </div>
  )
}

/** Blue + gradient border (AgentCards) — matches Attio's nested opacity wrapper */
function GradientBorder(): ReactNode {
  return (
    <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-[#E6E7EA]">
      <div className="absolute inset-0" style={{ background: 'rgb(112, 161, 240)', opacity: 1 }} />
      <div className="absolute inset-0" style={{ opacity: 1 }}>
        <div
          className="h-full w-full"
          style={{
            background:  'linear-gradient(131.88deg, rgb(220, 143, 165) -2.1%, rgb(112, 161, 240) 74.48%)',
            transform:   'rotate(0deg)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Trigger card ─────────────────────────────────────────────────────────────

function TriggerCard(): ReactNode {
  return (
    <div className="relative flex max-w-[328px] flex-col gap-2.5 col-span-2 col-start-1 row-start-1 w-fit">
      <div className="relative overflow-hidden rounded-[12px] p-px" style={{ filter: CARD_SHADOW }}>
        <BlueBorder />
        <div className="relative rounded-[11px] bg-[#FFFFFF]">
          <div className="flex items-center gap-2 p-2.5 pr-3">
            <TriggerIcon />
            <p className="font-medium text-[14px] text-primary-foreground leading-5 tracking-[-0.02em]">
              New interface request
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Agent card row ───────────────────────────────────────────────────────────

interface AgentCardProps {
  readonly rowStartClass: 'row-start-2' | 'row-start-3' | 'row-start-4'
  readonly title:         string
  readonly question:      string
  readonly answer:        ReactNode
  readonly badgeDelay:    number
  readonly inView:        boolean
}

function AgentCardRow({ rowStartClass, title, question, answer, badgeDelay, inView }: AgentCardProps): ReactNode {
  return (
    <div className={`relative flex max-w-[328px] flex-col gap-2.5 col-start-2 ${rowStartClass}`}>

      {/* Card */}
      <div className="relative overflow-hidden rounded-[12px] p-px" style={{ filter: CARD_SHADOW }}>
        <GradientBorder />
        <div className="relative rounded-[11px] bg-[#FFFFFF]">

          {/* Header */}
          <div className="flex items-center gap-2 p-3">
            <AgentIcon />
            <p className="font-medium text-[14px] text-primary-foreground leading-5 tracking-[-0.02em]">
              {title}
            </p>
            <div className="ml-auto rounded-[8px] border border-[#EEEFF1] bg-[#F4F5F6] px-1.5 py-0.5 font-medium text-[#75777C] text-[12px] leading-3">
              AI
            </div>
          </div>

          {/* Separator — exact Attio SVG approach */}
          <svg width="100%" height="1" className="bg-origin-padding px-3 text-[#EEEFF1]">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
          </svg>

          {/* Question */}
          <div className="p-3">
            <p className="pr-1 font-medium text-[#75777C] text-[12px] leading-4">
              {question}
            </p>
          </div>

        </div>
      </div>

      {/* Answer badge — sibling outside card */}
      <AnswerBadge delay={badgeDelay} inView={inView}>
        {answer}
      </AnswerBadge>

    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoIllustrationAIWorkflow(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="pointer-events-none relative flex w-full select-none items-center justify-center overflow-hidden bg-primary-background md:min-h-[620px]"
      style={{ gridArea: 'contentA' }}
    >

      {/* ── Dot pattern background ─────────────────────────────────────────── */}
      <svg
        width="100%" height="100%"
        className="text-muted-strong-background absolute inset-0"
        aria-hidden
      >
        <defs>
          <pattern id="bento-dot-deploy-ai-2" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-dot-deploy-ai-2)" />
      </svg>

      {/* ── Workflow canvas (matches Attio's data-visual-test wrapper) ─────── */}
      <div className="relative flex scale-[85%] items-center justify-center md:scale-100">
        <div className="grid auto-rows-min grid-cols-[43px_auto] gap-y-10">

          {/*
           * Connectors — longest first in DOM (Attio order) so TriggerCard
           * (later) paints on top, covering the row-1 overlap.
           * Animation sequence: shortest animates first (delay 0.20s → 0.95s → 1.70s).
           */}
          <Connector rowEndClass="row-end-5" delay={T.conn3.d} dur={T.conn3.t} inView={inView} />
          <Connector rowEndClass="row-end-4" delay={T.conn2.d} dur={T.conn2.t} inView={inView} />
          <Connector rowEndClass="row-end-3" delay={T.conn1.d} dur={T.conn1.t} inView={inView} />

          {/* Row 1: trigger */}
          <TriggerCard />

          {/* Row 2: Activate PLG motion */}
          <AgentCardRow
            rowStartClass="row-start-2"
            title="Build interface"
            question="What interfaces do I need to build?"
            answer={
              <>Based on the spec document, an{' '}
                <G size="400%" pos="bg-center">ADT</G>
                {' '}and{' '}
                <G size="400%" pos="bg-center">ORM</G>
                {' '}feed
              </>
            }
            badgeDelay={T.badge1.d}
            inView={inView}
          />

          {/* Row 3: Evaluate size of opportunity */}
          <AgentCardRow
            rowStartClass="row-start-3"
            title="Self-heal failed connector"
            question="Why did the diet interface stop?"
            answer={
              <>Invalid supplement sent —{' '}
                <G size="400%" pos="bg-center">skipped message</G>
              </>
            }
            badgeDelay={T.badge2.d}
            inView={inView}
          />

          {/* Row 4: Identify key stakeholders */}
          <AgentCardRow
            rowStartClass="row-start-4"
            title="Scrape payer portal updates"
            question="What changed on the Aetna eligibility portal?"
            answer={
              <G size="300%" pos="bg-center">
                3 new denial codes added
              </G>
            }
            badgeDelay={T.badge3.d}
            inView={inView}
          />

        </div>
      </div>

    </div>
  )
}
