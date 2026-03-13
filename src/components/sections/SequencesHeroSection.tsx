'use client'

/**
 * SequencesHeroSection — Hero for /platform/sequences.
 *
 * Animation sequence (step-based, not continuous):
 *
 *   t=0.1s   EnrollmentHeader + first email card fade in (centered on screen)
 *   t=0–1.0s First card stays visible (pause — nothing else moves)
 *   t=1.0s   SCROLL STEP 1: inner column scrolls up ~80px
 *            → connector line + "After 2 business days" scroll into view
 *   t=1.9s   SCROLL STEP 2: inner column scrolls up ~270px total
 *            → "Next steps" card + "Completed" scroll into view
 *   t=2.8s   Meeting pill fades in IN PLACE (no scroll, it's at the bottom edge)
 *   t=3.1s   Outer block slides up to y=0 → hero text revealed below
 *   t=3.8s+  Badge, h2, description, CTAs stagger in
 */

import { useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.2, 0, 0, 1] as const
const TEXT_DELAY = 3.8

// ─── Scroll steps (inner column translateY targets) ───────────────────────────

/** Step 1 — scrolls connector + "After 2 business days" into view */
const SCROLL_1  = -80
/** Step 2 — scrolls "Next steps" card + "Completed" into view */
const SCROLL_2  = -390

// ─── Animation timeline (ms from mount) ──────────────────────────────────────

const T_STEP1        = 1000  // pause while card 1 is visible, then step 1 scroll
const T_STEP2        = 1900  // after step 1 (500ms) + pause (400ms)
const T_MEETING_PILL = 2800  // after step 2 (700ms) + pause (200ms)
const T_PUSH_UP      = 3100  // 300ms after meeting pill, push outer block up

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SkeletonLine({ width }: { width: number }) {
  return <div className="h-4 max-w-full rounded-full bg-white-300" style={{ width }} />
}

// ─── Email card ───────────────────────────────────────────────────────────────

interface EmailCardProps {
  subject: string
  timestamp: string
  lineGroups: number[][]
  delay: number
}

function EmailCard({ subject, timestamp, lineGroups, delay }: EmailCardProps) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg rounded-xl bg-primary-background transition duration-300"
      style={{
        boxShadow:
          'rgba(24,37,62,0.12) 0px 0px 0px 1px inset,' +
          'rgba(24,37,62,0) 0px 29px 12px 0px,' +
          'rgba(24,37,62,0.01) 0px 16px 10px 0px,' +
          'rgba(24,37,62,0.02) 0px 7px 7px 0px,' +
          'rgba(24,37,62,0.02) 0px 2px 4px 0px',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <div className="px-3 pt-2.5 pb-3">
        <div className="mb-2.5 flex items-center justify-between gap-x-2">
          <span className="text-primary-foreground text-sm">{subject}</span>
          {/* Timestamp — vertical gradient mask, matches Attio */}
          <span
            className="mr-0.5 inline-flex items-center overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom,transparent 0%,black 20%,black 80%,transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,black 20%,black 80%,transparent 100%)',
            }}
          >
            <span className="inline-block text-accent-foreground text-xs">{timestamp}</span>
          </span>
        </div>
        <svg width="100%" height="1" className="text-subtle-stroke">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>
        <div className="mt-3 flex w-full flex-col gap-y-5">
          {lineGroups.map((group, gi) => (
            <div key={gi} className="flex flex-col gap-y-1">
              {group.map((w, li) => <SkeletonLine key={li} width={w} />)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Vertical connector ───────────────────────────────────────────────────────

function Connector({ delay }: { delay: number }) {
  return (
    <motion.span
      className="my-2.5 block h-6.5 w-px origin-top rounded-full bg-white-700"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay, ease: EASE }}
    />
  )
}

// ─── Time delay pill ──────────────────────────────────────────────────────────

function TimePill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-1 px-3 py-1 text-accent-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M6 3.42859V6.42859H8.57143" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      <span className="font-medium text-xs">{label}</span>
    </motion.div>
  )
}

// ─── Status text ──────────────────────────────────────────────────────────────

function StatusPill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-1 px-3 py-1 text-accent-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <span className="font-medium text-xs">{label}</span>
    </motion.div>
  )
}

// ─── Meeting booked pill ──────────────────────────────────────────────────────

interface MeetingPillProps {
  delay: number
  avatar1: string
  avatar2: string
}

function MeetingPill({ delay, avatar1, avatar2 }: MeetingPillProps) {
  return (
    <motion.div
      className="relative mx-auto flex items-center gap-x-4 rounded-full border border-default-stroke bg-primary-background p-2 pr-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {/* Expanding rings — asymmetric pulse matching Attio's scaleX/Y targets */}
      <div className="absolute -inset-px rounded-full border border-default-stroke animate-ring-pulse-inner" />
      <div className="absolute -inset-2 rounded-full border border-subtle-stroke   animate-ring-pulse-outer" />
      <div className="flex items-center">
        <div className="relative size-10 rounded-full outline-2 outline-white-100 overflow-hidden bg-white-300">
          <Image src={avatar1} alt="" fill sizes="40px" className="object-cover" />
        </div>
        <div className="relative -ml-2 size-10 rounded-full outline-2 outline-white-100 overflow-hidden bg-white-300">
          <Image src={avatar2} alt="" fill sizes="40px" className="object-cover" />
        </div>
      </div>
      <span className="text-base text-primary-foreground lg:text-lg">
        Booked meeting <span className="text-accent-foreground">with</span> Yara
      </span>
    </motion.div>
  )
}

// ─── Enrollment header ────────────────────────────────────────────────────────

function EnrollmentHeader({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-x-2 px-3 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <span className="text-tertiary-foreground text-xs">Enrolled by</span>
      <div className="flex items-center gap-x-2">
        <div className="flex size-4.5 items-center justify-center rounded-md border border-[#D6E5FF] bg-[#E5EEFF] text-[#183C81]">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1.25" y="1.25012" width="4" height="4" rx="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="6.75" y="6.75" width="4" height="4" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75" stroke="currentColor" strokeLinecap="round" />
            <path d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-primary-foreground text-sm">PQL Triage</span>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SequencesHeroSection() {
  /**
   * outerY: visual Y of the entire 400px visualization block.
   *   Initial → vh/2 - 200  (centers the block on screen)
   *   Final   → 0           (natural top position, hero text revealed below)
   *
   * innerY: Y of the card column inside the 400px clipping window.
   *   Initial → 0    (first card at top of window)
   *   Step 1  → -80  (connector + timepill scroll into view)
   *   Step 2  → -270 (next steps + completed scroll into view)
   */
  const outerY = useMotionValue(350) // SSR-safe default (≈900px screen)
  const innerY = useMotionValue(0)

  useEffect(() => {
    // Snap outer to exact center before first paint
    outerY.set(Math.max(0, window.innerHeight / 2 - 200))

    // Step 1: small scroll — connector + timepill enter the window
    const t1 = setTimeout(() => {
      animate(innerY, SCROLL_1, { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] })
    }, T_STEP1)

    // Step 2: larger scroll — next steps card + completed enter the window
    const t2 = setTimeout(() => {
      animate(innerY, SCROLL_2, { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] })
    }, T_STEP2)

    // Push outer up to y=0 (meeting pill has faded in; now reveal hero text)
    const t3 = setTimeout(() => {
      animate(outerY, 0, { duration: 0.6, ease: [0.37, 0, 0.63, 1] })
    }, T_PUSH_UP)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="overflow-hidden">
      <div className="container flex flex-1 flex-col">
        <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">
          <div className="grid grid-cols-12">
            <div className="relative col-span-full lg:col-[2/-2] lg:border-x lg:border-subtle-stroke">

              {/* ── Visualization block (400px clipping window) ────────── */}
              <motion.div
                className="pointer-events-none h-[400px] w-full overflow-hidden"
                style={{
                  y: outerY,
                  maskImage:
                    'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,0.5) 10%,black 92%,transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,0.5) 10%,black 92%,transparent 100%)',
                }}
              >
                {/* Ambient blue glow */}
                <div
                  className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-[120px]"
                  style={{ opacity: 0.25 }}
                />

                {/* ── Inner scrolling column ──────────────────────────── */}
                <motion.div
                  className="absolute inset-x-0 top-0 flex w-full flex-col items-center pt-8"
                  style={{ y: innerY }}
                >
                  {/* ① Enrollment header + first email card
                        Appears immediately (t≈0.1–0.2s), stays put until t=1.0s */}
                  <div className="relative w-full px-8">
                    <div className="mx-auto mb-2 flex w-full max-w-lg flex-col items-start">
                      <EnrollmentHeader delay={0.1} />
                    </div>
                    <EmailCard
                      subject="Welcome Yara"
                      timestamp="5 days ago"
                      delay={0.2}
                      lineGroups={[
                        [240],
                        [460, 148],
                        [460, 496, 300],
                        [128, 64],
                      ]}
                    />
                  </div>

                  {/* ② Connector + time pill
                        Scroll step 1 starts at t=1.0s → these scroll into view */}
                  <Connector delay={T_STEP1 / 1000 + 0.1} />
                  <TimePill label="After 2 business days" delay={T_STEP1 / 1000 + 0.2} />
                  <Connector delay={T_STEP1 / 1000 + 0.4} />

                  {/* ③ Next steps card + Completed
                        Scroll step 2 at t=1.9s → these scroll into view */}
                  <div className="relative w-full px-8">
                    <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 top-px pointer-events-none">
                      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                    </svg>
                    <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 bottom-px pointer-events-none">
                      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                    </svg>
                    <EmailCard
                      subject="Next steps"
                      timestamp="Yesterday"
                      delay={T_STEP2 / 1000 + 0.1}
                      lineGroups={[[140, 300]]}
                    />
                  </div>

                  <Connector delay={T_STEP2 / 1000 + 0.2} />
                  <StatusPill label="Completed" delay={T_STEP2 / 1000 + 0.3} />
                  <Connector delay={T_STEP2 / 1000 + 0.4} />

                  {/* ④ Meeting pill — fades in at t=2.8s with no scroll
                        It sits at the bottom edge of the 400px window after step 2 */}
                  <div className="relative flex w-full flex-col items-center px-8">
                    <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 top-px pointer-events-none">
                      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                    </svg>
                    <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 bottom-px pointer-events-none">
                      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
                    </svg>
                    <MeetingPill
                      delay={T_MEETING_PILL / 1000}
                      avatar1="/assets/images/platform/sequences/hero/sequences-avatar-1.avif"
                      avatar2="/assets/images/platform/sequences/hero/sequences-avatar-2.avif"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Hero text ────────────────────────────────────────────
               * Normal document flow, below the 400px viz block.
               * opacity:0 during animation; fades in at TEXT_DELAY.
               */}
              <header className="flex w-full flex-col items-center pt-12 pb-24 max-xl:pt-25 max-lg:pt-20 lg:pb-28 xl:pb-32">

                <motion.div
                  className="mb-6 inline-block w-fit rounded-[13px] border border-weak-stroke bg-primary-background px-3 py-1.5 font-medium text-[13px]/[1.4em] text-secondary-foreground"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: TEXT_DELAY + 0.1, ease: EASE }}
                >
                  <h1>Sequences</h1>
                </motion.div>

                <motion.h2
                  className="max-w-[15em] text-balance text-center text-heading-responsive-lg"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: TEXT_DELAY + 0.2, ease: EASE }}
                >
                  Signal, sequence, success.
                </motion.h2>

                <motion.p
                  className="mt-4 max-w-xl text-balance text-center text-lg text-secondary-foreground lg:text-xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: TEXT_DELAY + 0.3, ease: EASE }}
                >
                  Go from first touch to final appointment with perfectly crafted outreach delivered right on cue.
                </motion.p>

                <motion.div
                  className="mt-6 flex w-full items-center justify-center gap-x-2.5 gap-y-2 max-md:flex-col max-md:items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: TEXT_DELAY + 0.4, ease: EASE }}
                >
                  <Link
                    href="/signup"
                    className="button-primary relative inline-flex h-9 cursor-pointer items-center justify-center text-nowrap rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
                  >
                    Start for free
                  </Link>
                  <Link
                    href="/contact"
                    className="button-outline border relative inline-flex h-9 cursor-pointer items-center justify-center text-nowrap rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
                  >
                    Talk to sales
                  </Link>
                  <form className="flex w-full max-w-xs flex-col gap-2 md:hidden">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      className="block w-full rounded-[10px] border border-default-stroke bg-primary-background p-[10px_13px] text-base text-secondary-foreground placeholder:text-muted-foreground outline-none transition-all duration-300 ease-out focus:border-blue-500 focus:ring-[3px] focus:ring-blue-300"
                    />
                    <button type="submit" className="button-primary h-[46px] rounded-xl px-3.5 text-base">
                      Send me a demo
                    </button>
                  </form>
                </motion.div>

              </header>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
