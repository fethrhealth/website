'use client'

/**
 * HomeSpeedChartPanel
 *
 * CRM contact record panel inside the HomeSpeedSection chart container.
 * Pixel-perfect clone of Attio's "data enrichment" demo panel.
 *
 * Animation sequence (triggered on scroll into view):
 *   0.00s — panel mounts, contact card avatar appears
 *   0.10s — name, 0.18s — title, 0.26s — action buttons
 *   0.50s — Highlights header + cards stagger in
 *   0.85s — Activity header + feed rows
 *   1.10s — Details header + field rows
 */

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─── Animation helper ──────────────────────────────────────────────────────────

function useFade(delay: number, inView: boolean, base = 0) {
  return {
    initial: { opacity: 0, y: 4 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 },
    transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] as const, delay: base + delay },
  }
}

// ─── Placeholder avatars ───────────────────────────────────────────────────────

function AvatarSJ() {
  return (
    <div className="size-10 shrink-0 overflow-hidden rounded-lg border border-white-500 flex items-center justify-center bg-white">
      <Image
        src="/assets/icons/companies/epic-logo.png"
        alt="Epic"
        width={32}
        height={32}
        className="object-contain"
      />
    </div>
  )
}

function AvatarSJSmall({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="size-4 rounded-full bg-gradient-to-br from-[#b8cce8] to-[#7fa3c8] flex items-center justify-center select-none">
        <span className="text-[5px] font-semibold text-white">SJ</span>
      </div>
      <div className="absolute inset-0 rounded-full border-[0.75px] border-[#232529]/10" />
    </div>
  )
}

function AvatarMCSmall({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="size-4 rounded-full bg-gradient-to-br from-[#b8e8c8] to-[#5fa880] flex items-center justify-center select-none">
        <span className="text-[5px] font-semibold text-white">YM</span>
      </div>
      <div className="absolute inset-0 rounded-full border-[0.75px] border-[#232529]/10" />
    </div>
  )
}

function LogoGL({ className = '' }: { className?: string }) {
  return (
    <div className={`shrink-0 overflow-hidden rounded-lg bg-[#2d7a4f] flex items-center justify-center ${className}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2.5L4.5 6.5h5L7 2.5ZM4.5 6.5L7 11.5 9.5 6.5H4.5Z" fill="rgba(255,255,255,0.9)" />
      </svg>
    </div>
  )
}

// ─── Action button ─────────────────────────────────────────────────────────────

function ActionBtn({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className="rounded-lg bg-primary-background ring-1 ring-inset ring-[#EEEFF1]"
      style={{ boxShadow: 'rgb(224,224,224) 0px 0px 2px 0px, rgba(24,39,75,0.02) 0px 2px 4px -2px, rgba(24,39,75,0.06) 0px 4px 4px -2px' }}
    >
      <div className={`flex h-[28px] items-center gap-x-1.5 px-[7px] ${wide ? 'pr-[13px] pl-[11px]' : ''}`}>
        {children}
      </div>
    </div>
  )
}

// ─── Detail row ────────────────────────────────────────────────────────────────

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid origin-left auto-rows-[32px] grid-cols-[124px_1fr] items-center lg:grid-cols-[100px_1fr]">
      <div className="flex items-center gap-x-1.5">
        {icon}
        <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">{label}</span>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  )
}

// ─── Panel ─────────────────────────────────────────────────────────────────────

export function HomeSpeedChartPanel({ baseDelay = 0 }: { baseDelay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  /** Shorthand: fade-in with baseDelay offset so panel builds after first pulse. */
  const fade = (d: number) => useFade(d, inView, baseDelay)

  return (
    <div ref={ref} className="relative">
      <div>

        {/* ═══════════════════════════════════════════════════════════════
            INNER GRID — contact card + highlights panel
            Mobile:  grid-rows-[auto_244px] (single column, row 2 hidden)
            Desktop: grid-cols-[319px_1fr] grid-rows-[auto_1fr]
            ═══════════════════════════════════════════════════════════════ */}
        <div className="h-full w-full gap-px grid grid-rows-[auto_auto] lg:grid-cols-[319px_1fr] lg:grid-rows-[auto_1fr]">

          {/* ── Contact card (col 1, row 1) ──────────────────────────── */}
          <div className="relative flex flex-col bg-white-100 p-4">

            {/* Avatar */}
            <motion.div {...fade(0.0)}>
              <AvatarSJ />
            </motion.div>

            {/* Name */}
            <motion.div className="mt-3 flex" {...fade(0.10)}>
              <span className="font-semibold text-[#232529] text-[18px] leading-6 tracking-[-0.36px]">
                Epic ADT Inbound
              </span>
            </motion.div>

            {/* Title */}
            <motion.div className="mt-0.5 flex" {...fade(0.18)}>
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C]">
                Inbound ADT from Epic
              </span>
            </motion.div>

            {/* Action buttons */}
            <motion.div className="mt-3 flex gap-x-2" {...fade(0.26)}>

              {/* View messages — wide (with label) */}
              <ActionBtn wide>
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1.5 4.5C1.5 3.4 2.4 2.5 3.5 2.5h7c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-5Z" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m3.5 5 2.776 2.164a1.25 1.25 0 0 0 1.448 0L10.5 5" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">View messages</span>
              </ActionBtn>

              {/* Start */}
              <ActionBtn>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4.5 3v8l6.5-4L4.5 3Z" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionBtn>

              {/* Stop */}
              <ActionBtn>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4.5 3v8M9.5 3v8" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionBtn>

              {/* Edit */}
              <ActionBtn>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.5 2.5l3 3M2.5 8.5l6-6 3 3-6 6H2.5v-3Z" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionBtn>

              {/* More */}
              <ActionBtn>
                <svg width="14" height="14" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 7a1.25 1.25 0 1 1-2.5 0A1.25 1.25 0 0 1 4 7Zm4.25 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm3 1.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#232529" />
                </svg>
              </ActionBtn>

            </motion.div>
          </div>

          {/* ── Highlights + Activity (col 2, row-span-2) — desktop only ── */}
          <div className="bg-white-100 px-6 pt-6 pb-4 hidden lg:row-span-2 lg:block">

            {/* Highlights header */}
            <motion.div {...fade(0.44)}>
              <div className="flex items-center gap-x-1.5 pl-1">
                <svg width="14" height="14" fill="none">
                  <rect x="1.75" y="1.75" width="4.2" height="5.5" rx="1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="1.75" y="9.25" width="4.2" height="3" rx="1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="8.05" y="1.65" width="4.2" height="3" rx="1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="8.05" y="6.75" width="4.2" height="5.5" rx="1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-semibold text-[#232529] text-[14px] leading-5 tracking-[-0.28px]">Highlights</span>
              </div>
            </motion.div>

            {/* Highlights cards — 3 cols × 2 rows */}
            <div className="mt-3 grid grid-cols-[176fr_176fr_218fr] grid-rows-[99px_99px] gap-[7px]">

              {/* 1 — Summary (col-span-2) */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out col-span-2"
                {...fade(0.52)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Summary</span>
                    {/* AI sparkle icon with gradient */}
                    <svg width="12" height="12" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M6 .57c-.192 0-.338.099-.42.167a1.523 1.523 0 0 0-.253.278 4.432 4.432 0 0 0-.451.831 10.134 10.134 0 0 0-.662 2.366c-.94.15-1.758.4-2.366.662-.337.145-.622.3-.83.45-.104.076-.202.16-.279.253A.669.669 0 0 0 .572 6c0 .192.099.339.167.421.077.093.175.177.278.252.21.152.494.307.831.452.608.262 1.426.512 2.366.661.15.94.4 1.758.662 2.366.145.337.3.622.45.83.076.104.16.203.253.28a.669.669 0 0 0 .421.167c.192 0 .339-.1.421-.168.093-.076.177-.175.252-.278.152-.209.307-.494.452-.83.262-.609.512-1.427.661-2.367.94-.15 1.758-.4 2.366-.661.337-.145.622-.3.83-.452.104-.075.203-.16.28-.252a.669.669 0 0 0 .167-.42c0-.193-.1-.34-.168-.422a1.524 1.524 0 0 0-.278-.252 4.43 4.43 0 0 0-.83-.451 10.134 10.134 0 0 0-2.367-.662c-.15-.94-.4-1.758-.661-2.366a4.432 4.432 0 0 0-.452-.83 1.523 1.523 0 0 0-.252-.279.669.669 0 0 0-.42-.167Z" fill="url(#sparkle-grad)" />
                      <defs>
                        <linearGradient id="sparkle-grad" x1="-.269" y1=".178" x2="11.808" y2="11.005" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#DC8FA5" />
                          <stop offset=".75" stopColor="#70A1F0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] line-clamp-2 text-[#232529]">
                    Inbound ADT from Epic that is sent outbound to all downstream systems. Processing an average of 14,832 messages daily with 99.97% uptime and 0.02% error rate across all connected systems.
                  </span>
                </div>
              </motion.div>

              {/* 2 — Uptime */}
              <motion.div
                className="overflow-hidden rounded-xl border transition-colors duration-300 ease-in-out relative border-[#075A39]/[0.08]"
                {...fade(0.60)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="absolute inset-0 bg-[linear-gradient(55deg,rgba(7,90,57,0.06)_0%,rgba(7,90,57,0.02)_35.01%)] opacity-100" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Uptime</span>
                    <svg width="12" height="12" fill="none">
                      <path d="M6 1v2M6 9v2M1 6h2M9 6h2M2.465 2.465l1.414 1.414M8.121 8.121l1.414 1.414M9.535 2.465 8.121 3.879M3.879 8.121 2.465 9.535" stroke="#075A39" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="relative flex w-fit">
                    <span className="font-semibold text-[18px] leading-5 tracking-[-0.28px] text-[#075A39]">99.97%</span>
                  </div>
                </div>
              </motion.div>

              {/* 3 — Avg Latency */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out"
                {...fade(0.58)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Avg Latency</span>
                    <svg width="12" height="12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#9FA1A7" strokeWidth="1.1" />
                      <path d="M6 3v3l2 1.5" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">120ms</span>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7]">Last 24 hours</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4 — Support Contact */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out"
                {...fade(0.66)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Support</span>
                    <svg width="12" height="12" fill="none">
                      <path d="M1.5 3.95v4.096c0 1.122 0 1.682.218 2.11a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h2.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-4.1c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C8.98.748 8.42.748 7.3.748H4.7c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.11ZM3.5 3.197h3.4M5.1 5.648h3.4" stroke="#9FA1A7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.285 11.012V9.288c0-.42 0-.63-.081-.79a.75.75 0 0 0-.328-.328c-.16-.082-.37-.082-.791-.082h-.17c-.421 0-.631 0-.792.082a.75.75 0 0 0-.327.328c-.082.16-.082.37-.082.79v1.724" stroke="#9FA1A7" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">Fethr Health, Inc.</span>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7]">Santa Monica, CA</span>
                    </div>
                    <div className="shrink-0 overflow-hidden rounded-lg flex items-center justify-center size-6">
                      <Image src="/assets/icons/home/connect-data/fethr.svg" alt="Fethr" width={20} height={20} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 5 — Error Rate */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out"
                {...fade(0.74)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Error Rate</span>
                    <svg width="12" height="12" fill="none">
                      <path d="M6 4v3M6 8.5v.5" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" />
                      <circle cx="6" cy="6" r="5" stroke="#9FA1A7" strokeWidth="1.1" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-x-1">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">0.02%</span>
                      <span className="font-medium tracking-normal text-[12px] leading-4 mt-[3px] text-[#75777C]">Last 30 days</span>
                    </div>
                    <div className="flex gap-x-0.5 pb-[3px]">
                      {[
                        'bg-[#CFF0E3]', 'bg-[#CFF0E3]', 'bg-[#CFF0E3]',
                        'bg-[#CFF0E3]', 'bg-[#CFF0E3]', 'bg-[#CFF0E3]',
                        'bg-[#CFF0E3]', 'bg-[#CFF0E3]', 'bg-[#0EB472]',
                      ].map((bg, i) => (
                        <div key={i} className={`h-1 w-1.5 flex-1 rounded-full ${bg}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>{/* /highlights grid */}

            {/* Activity header */}
            <motion.div className="mt-8" {...fade(0.86)}>
              <div className="flex items-center gap-x-1.5 pl-1">
                <svg width="14" height="14" fill="none">
                  <path d="M1.5 6.81h2.353a.4.4 0 0 0 .385-.29l1.017-3.56c.113-.395.677-.384.774.016l1.93 7.993c.096.403.668.41.774.01l1.033-3.872a.4.4 0 0 1 .386-.297H12.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-semibold text-[#232529] text-[14px] leading-5 tracking-[-0.28px]">Activity</span>
                <svg width="14" height="14" fill="none">
                  <path d="m5.5 4 3 3-3 3" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            {/* Activity feed — 3 stacked cards with depth shadow */}
            <motion.div className="relative mt-3" {...fade(0.92)}>
              {/* Depth layers */}
              <div className="absolute right-5 -bottom-1 left-5 h-10 rounded-lg border border-[#EEEFF1]" />
              <div className="absolute right-3 -bottom-0.5 left-3 h-10 rounded-lg border border-[#EEEFF1] bg-white-100" />

              {/* Main activity card */}
              <div className="overflow-hidden rounded-xl border border-[#EEEFF1] bg-white-100 relative">
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex flex-col gap-y-[1.5px]">

                    {/* Activity 1 — updated description */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center">
                        <div className="size-5 overflow-hidden rounded-md border border-[#EEEFF1]">
                          <div className="flex h-full w-full items-center justify-center bg-[#F4F5F6]">
                            <svg width="12" height="12" fill="none">
                              <path d="M7.5 2.5l2 2M3 7l4.5-4.5 2 2L5 9l-2.5.5L3 7Z" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <AvatarMCSmall className="ml-3" />
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-1.5">Yitzhak Magoon</span>
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-[#75777C]">
                            <span className="underline">updated description</span>
                          </span>
                        </div>
                      </div>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7] shrink-0 ml-2">6 hours ago</span>
                    </div>

                    <div className="ml-[9.5px] h-[13px] w-px rounded-full bg-[#E6E7EA]" />

                    {/* Activity 2 — cycled interface */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center">
                        <div className="size-5 rounded-md border border-[#EEEFF1]">
                          <div className="flex h-full w-full items-center justify-center bg-[#F4F5F6]">
                            <svg width="12" height="12" fill="none">
                              <path d="M1.5 6a4.5 4.5 0 0 1 7.5-3.35M10.5 6a4.5 4.5 0 0 1-7.5 3.35" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" />
                              <path d="M9 1v2h2M3 9v2H1" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <AvatarSJSmall className="ml-3" />
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-1.5">Sarah Johnson</span>
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-[#75777C]">
                            <span className="underline">cycled interface</span>
                          </span>
                        </div>
                      </div>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7] shrink-0 ml-2">2 days ago</span>
                    </div>

                    <div className="ml-[9.5px] h-[13px] w-px rounded-full bg-[#E6E7EA]" />

                    {/* Activity 3 — built interface */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center">
                        <div className="relative size-5 rounded-md border border-[#EEEFF1]">
                          <div className="flex h-full w-full items-center justify-center bg-[#F4F5F6]">
                            <svg width="12" height="12" fill="none">
                              <path d="M3 6l2 2 4-4" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <AvatarMCSmall className="ml-3" />
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-1.5">Yitzhak Magoon</span>
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-[#75777C]">
                            <span className="underline">built interface</span>
                          </span>
                        </div>
                      </div>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7] shrink-0 ml-2">15 days ago</span>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          </div>{/* /highlights + activity */}
          {/* ═══════════════════════════════════════════════════════════════
            DETAILS SECTION — below the grid, full width
            ═══════════════════════════════════════════════════════════════ */}
          <div className="border-t border-white-500 bg-white-100 px-4 pt-1.5 pb-3.5">
            <div className="flex flex-col gap-x-4">

              {/* Details header (collapsible label) */}
              <motion.div
                className="grid origin-left auto-rows-[32px] grid-cols-[124px_1fr] items-center lg:grid-cols-[100px_1fr]"
                {...fade(1.06)}
              >
                <div className="col-span-2 flex items-center gap-x-1.5">
                  <svg width="14" height="14" fill="none">
                    <path d="m4 5.5 3 3 3-3" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Details</span>
                </div>
              </motion.div>

              {/* Name */}
              <motion.div {...fade(1.12)}>
                <DetailRow
                  label="Name"
                  icon={<svg width="14" height="14" fill="none"><rect x="1" y="2" width="12" height="10" rx="2.5" stroke="#75777C" strokeWidth="1.1" /><path d="M3 9.7 3.618 8M7 9.7 6.382 8m0 0-.215-.592L5 4.199 3.833 7.408l-.215.591m2.764 0H3.618M8.65 6h2.4M8.65 8h2.4" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">Epic ADT Inbound</span>
                </DetailRow>
              </motion.div>

              {/* Description */}
              <motion.div {...fade(1.18)}>
                <DetailRow
                  label="Description"
                  icon={<svg width="14" height="14" fill="none"><rect x="1" y="2" width="12" height="10" rx="2.5" stroke="#75777C" strokeWidth="1.1" /><path d="M3 9.7 3.618 8M7 9.7 6.382 8m0 0-.215-.592L5 4.199 3.833 7.408l-.215.591m2.764 0H3.618M8.65 6h2.4M8.65 8h2.4" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">Inbound ADT from Epic</span>
                </DetailRow>
              </motion.div>

              {/* Hostname / Port */}
              <motion.div {...fade(1.24)}>
                <DetailRow
                  label="Host / Port"
                  icon={<svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#75777C" strokeWidth="1.1" /><path d="M1.5 7h11M7 1.5c-2.5 2-3.5 3.5-3.5 5.5s1 3.5 3.5 5.5M7 1.5c2.5 2 3.5 3.5 3.5 5.5s-1 3.5-3.5 5.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">10.0.4.128 / 5892</span>
                </DetailRow>
              </motion.div>

              {/* Last Message */}
              <motion.div {...fade(1.30)}>
                <DetailRow
                  label="Last message"
                  icon={<svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#75777C" strokeWidth="1.1" /><path d="M7 4v3l2 1.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">3s ago</span>
                </DetailRow>
              </motion.div>

              {/* Total Messages */}
              <motion.div {...fade(1.36)}>
                <DetailRow
                  label="Total msgs"
                  icon={<svg width="14" height="14" fill="none"><path d="M1.5 6.81h2.353a.4.4 0 0 0 .385-.29l1.017-3.56c.113-.395.677-.384.774.016l1.93 7.993c.096.403.668.41.774.01l1.033-3.872a.4.4 0 0 1 .386-.297H12.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">2,847,391</span>
                </DetailRow>
              </motion.div>

              {/* Support Email */}
              <motion.div {...fade(1.42)}>
                <DetailRow
                  label="Email"
                  icon={<svg width="14" height="14" fill="none"><g stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d="M9.466 7a2.466 2.466 0 1 1-4.93 0 2.466 2.466 0 0 1 4.93 0Z" /><path d="M7 12.5a5.5 5.5 0 1 1 0-11c4.41 0 5.5 3.319 5.5 5.5v.948a1.517 1.517 0 0 1-3.034 0V4.534" /></g></svg>}
                >
                  <div className="flex w-fit rounded-lg border border-[#B8D0FF] px-[5px] pb-px">
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate text-[#407FF2]">support@fethrhealth.com</span>
                  </div>
                </DetailRow>
              </motion.div>

              {/* Support Phone */}
              <motion.div {...fade(1.48)}>
                <DetailRow
                  label="Phone"
                  icon={<svg width="14" height="14" fill="none"><path d="m1.38 1.841.42-.544a1.126 1.126 0 0 1 1.774-.014l1.162 1.464a.862.862 0 0 1-.066 1.146l-.244.244a1.25 1.25 0 0 0-.14 1.598l.123.178a6.783 6.783 0 0 0 1.679 1.679l.177.123a1.25 1.25 0 0 0 1.599-.14l.244-.245a.862.862 0 0 1 1.146-.065l1.463 1.161a1.126 1.126 0 0 1-.013 1.775l-.544.419c-.611.47-1.403.635-2.151.448A9.729 9.729 0 0 1 .933 3.992 2.522 2.522 0 0 1 1.38 1.84Z" stroke="#75777C" strokeWidth="1.1" strokeLinejoin="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">1-800-383-3384</span>
                </DetailRow>
              </motion.div>

            </div>
          </div>{/* /details */}
        </div>{/* /inner grid */}

      </div>
    </div>
  )
}
