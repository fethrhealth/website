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
    <div className="size-10 shrink-0 overflow-hidden rounded-full border border-white-500">
      <Image
        src="/assets/images/build-fast/home-enrichment-avatar.avif"
        alt="SJ"
        width={40}
        height={40}
        className="size-full object-cover"
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
        <span className="text-[5px] font-semibold text-white">MC</span>
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
      {children}
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
        <div className="h-full w-full gap-px grid grid-rows-[auto_244px] lg:grid-cols-[319px_1fr] lg:grid-rows-[auto_1fr]">

          {/* ── Contact card (col 1, row 1) ──────────────────────────── */}
          <div className="relative flex flex-col bg-white-100 p-4">

            {/* Avatar */}
            <motion.div {...fade(0.0)}>
              <AvatarSJ />
            </motion.div>

            {/* Name */}
            <motion.div className="mt-3 flex" {...fade(0.10)}>
              <span className="font-semibold text-[#232529] text-[18px] leading-6 tracking-[-0.36px]">
                Sarah Johnson
              </span>
            </motion.div>

            {/* Title */}
            <motion.div className="mt-0.5 flex" {...fade(0.18)}>
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#75777C]">
                Head of IT at GreenLeaf Inc.
              </span>
            </motion.div>

            {/* Action buttons */}
            <motion.div className="mt-3 flex gap-x-2" {...fade(0.26)}>

              {/* Compose email — wide (with label) */}
              <ActionBtn wide>
                <svg className="shrink-0" width="14" height="14" fill="none">
                  <path d="M7 12H4c-.465 0-.697 0-.891-.03A2.5 2.5 0 0 1 1.03 9.89C1 9.697 1 9.464 1 9V6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C2.9 2 3.6 2 5 2h5.5A2.5 2.5 0 0 1 13 4.5V8" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M12.425 10.975h-3.5M10.675 9.225v3.5" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m3.1 4.6.51.535c1.553 1.63 2.33 2.444 3.314 2.455.984.011 1.779-.786 3.369-2.381l.607-.61" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">Compose email</span>
              </ActionBtn>

              {/* New file */}
              <ActionBtn>
                <svg width="14" height="14" fill="none">
                  <path d="M8.667 1H6c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2 2.9 2 3.6 2 5.002v3.996c0 1.402 0 2.102.273 2.637a2.5 2.5 0 0 0 1.092 1.092C3.9 13 4.6 13 6 13h1M8.667 1v2.095c0 .467 0 .7.09.879.08.156.208.284.365.364.178.09.411.09.878.09h2M8.667 1l1.666 1.714L12 4.43m0 0V8M11.5 10.75H8M9.75 9v3.5" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionBtn>

              {/* Workflow */}
              <ActionBtn>
                <svg width="14" height="14" fill="none">
                  <g stroke="#232529" strokeWidth="1.1" strokeLinecap="round">
                    <path d="M12.5 10.75H9M10.75 9v3.5" strokeLinejoin="round" />
                    <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round" />
                    <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8" />
                  </g>
                </svg>
              </ActionBtn>

              {/* Task */}
              <ActionBtn>
                <svg width="14" height="14" fill="none">
                  <g stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 12.5H5.5c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C1.5 10.6 1.5 9.9 1.5 8.5v-3c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.4 1.5 4.1 1.5 5.5 1.5h3c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C12.5 3.4 12.5 4.1 12.5 5.5V7" />
                    <path d="m4.75 7.045.277.439c.425.67.637 1.006.91 1.124a.96.96 0 0 0 .746.006c.275-.113.492-.446.927-1.11L9.25 5M12.5 10.75H9M10.75 9v3.5" />
                  </g>
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
                    Sarah Johnson, the Head of IT, is leading the initiative to modernize their data infrastructure. A successful demo call on August 29 confirmed the need for solutions, with a 75% confidence level.
                  </span>
                </div>
              </motion.div>

              {/* 2 — LinkedIn */}
              <motion.div
                className="overflow-hidden rounded-xl border transition-colors duration-300 ease-in-out relative border-[#006699]/[0.08]"
                {...fade(0.60)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="absolute inset-0 bg-[linear-gradient(55deg,rgba(0,102,153,0.06)_0%,rgba(0,102,153,0.02)_35.01%)] opacity-100" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">LinkedIn</span>
                    <svg width="14" height="14" fill="none">
                      <path d="M1 1.86c0-.475.398-.86.888-.86h10.226c.49 0 .887.385.887.86v10.28c0 .475-.397.86-.887.86H1.888A.873.873 0 0 1 1 12.14V1.86Z" fill="#069" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.639 11.045V5.626H2.826v5.419H4.64Zm-.907-6.158c.632 0 1.026-.416 1.026-.936-.012-.532-.394-.937-1.014-.937s-1.025.405-1.025.937c0 .52.393.936 1.002.936h.011ZM5.641 11.045h1.813V8.019c0-.162.012-.324.06-.44.13-.323.429-.658.93-.658.655 0 .918.497.918 1.225v2.899h1.812V7.938c0-1.664-.894-2.439-2.087-2.439-.977 0-1.407.543-1.645.913h.012v-.786H5.64c.024.509 0 5.419 0 5.419Z" fill="#fff" />
                    </svg>
                  </div>
                  <div className="relative flex w-fit">
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] text-[#069]">sarahjohnson</span>
                    <div className="absolute bottom-px left-[-0.5px] h-px w-[calc(100%+1px)] rounded-sm bg-[#069]" />
                  </div>
                </div>
              </motion.div>

              {/* 3 — Upcoming */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out"
                {...fade(0.58)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Upcoming</span>
                    <svg className="stroke-[#9FA1A7]" width="12" height="12" fill="none">
                      <rect x=".75" y="1.65" width="10.5" height="9" rx="2" />
                      <path d="M3 4.5h6M3.6.75v1.5M8.4.75v1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">Demo Call</span>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7]">Nov 29, 10:40 AM</span>
                    </div>
                    <div className="flex w-6 flex-col rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] p-0.5">
                      <div className="text-center font-medium text-blue-500 text-[6px] leading-[8px] tracking-[-0.12px]">THU</div>
                      <div className="text-center font-medium text-[#232529] text-[10px] leading-[10px] tracking-[-0.2px]">29</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4 — Company */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out"
                {...fade(0.66)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Company</span>
                    <svg width="12" height="12" fill="none">
                      <path d="M1.5 3.95v4.096c0 1.122 0 1.682.218 2.11a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h2.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-4.1c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C8.98.748 8.42.748 7.3.748H4.7c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.11ZM3.5 3.197h3.4M5.1 5.648h3.4" stroke="#9FA1A7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.285 11.012V9.288c0-.42 0-.63-.081-.79a.75.75 0 0 0-.328-.328c-.16-.082-.37-.082-.791-.082h-.17c-.421 0-.631 0-.792.082a.75.75 0 0 0-.327.328c-.082.16-.082.37-.082.79v1.724" stroke="#9FA1A7" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">GreenLeaf Inc.</span>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7]">San Francisco, CA</span>
                    </div>
                    <LogoGL className="size-6" />
                  </div>
                </div>
              </motion.div>

              {/* 5 — Sales Outreach */}
              <motion.div
                className="overflow-hidden rounded-xl border border-[#EEEFF1] transition-colors duration-300 ease-in-out"
                {...fade(0.74)}
              >
                <div className="flex h-full flex-col justify-between gap-y-4 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium tracking-normal text-[12px] leading-4 text-[#75777C]">Sales Outreach</span>
                    <svg width="12" height="12" fill="none">
                      <path d="M4.25 6 2.406 1.901a.32.32 0 0 1 .45-.409L10.7 6M4.25 6l-1.844 4.099a.32.32 0 0 0 .45.409L10.7 6M4.25 6h6.45" stroke="#9FA1A7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-x-1">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">Step 2</span>
                      <span className="font-medium tracking-normal text-[12px] leading-4 mt-[3px] text-[#75777C]">Automated email</span>
                    </div>
                    <div className="flex gap-x-0.5 pb-[3px]">
                      {[
                        'bg-[#CFF0E3]', 'bg-[#CFF0E3]', 'bg-[#0EB472]',
                        'bg-[#ECECED]', 'bg-[#ECECED]', 'bg-[#ECECED]',
                        'bg-[#ECECED]', 'bg-[#ECECED]', 'bg-[#ECECED]',
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

                    {/* Activity 1 — in-person meeting */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center">
                        <div className="size-5 overflow-hidden rounded-md border border-[#EEEFF1]">
                          <div className="flex h-full w-full items-center justify-center bg-[#F4F5F6]">
                            <svg width="12" height="12" fill="none">
                              <path d="M6 2.743 4.478 4.265a1.116 1.116 0 0 0 0 1.584 1.119 1.119 0 0 0 1.543.036l1.064-.977a1.45 1.45 0 0 1 1.95 0l1.522 1.368m-1.471 1.61L8.057 6.858M7.542 9.43 6.514 8.4M9.6 7.372c.766-.75 1.543-1.65 1.543-2.829a2.828 2.828 0 0 0-2.828-2.828c-.906 0-1.543.257-2.315 1.028-.771-.771-1.409-1.028-2.314-1.028A2.829 2.829 0 0 0 .858 4.543c0 1.183.772 2.083 1.543 2.829l2.691 2.69a1.286 1.286 0 0 0 1.818 0l2.691-2.69Z" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <AvatarMCSmall className="ml-3" />
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-1.5">Michael Chang</span>
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-[#75777C]">
                            attended an <span className="underline">in-person meeting</span>
                          </span>
                        </div>
                      </div>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7] shrink-0 ml-2">6 hours ago</span>
                    </div>

                    <div className="ml-[9.5px] h-[13px] w-px rounded-full bg-[#E6E7EA]" />

                    {/* Activity 2 — event */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center">
                        <div className="size-5 rounded-md border border-[#EEEFF1]">
                          <div className="flex h-full w-full items-center justify-center bg-[#F4F5F6]">
                            <svg className="stroke-[#5C5E63]" width="12" height="12" fill="none">
                              <rect x=".75" y="1.65" width="10.5" height="9" rx="2" />
                              <path d="M3 4.5h6M3.6.75v1.5M8.4.75v1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <AvatarSJSmall className="ml-3" />
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-1.5">Sarah Johnson</span>
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-[#75777C]">
                            attended an <span className="underline">event</span>
                          </span>
                        </div>
                      </div>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7] shrink-0 ml-2">2 days ago</span>
                    </div>

                    <div className="ml-[9.5px] h-[13px] w-px rounded-full bg-[#E6E7EA]" />

                    {/* Activity 3 — outbound call */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center">
                        <div className="relative size-5 rounded-md border border-[#EEEFF1]">
                          <div className="flex h-full w-full items-center justify-center bg-[#F4F5F6]">
                            <svg width="12" height="12" fill="none">
                              <path d="m1.38 1.841.42-.544a1.126 1.126 0 0 1 1.774-.014l1.162 1.464a.862.862 0 0 1-.066 1.146l-.244.244a1.25 1.25 0 0 0-.14 1.598l.123.178a6.783 6.783 0 0 0 1.679 1.679l.177.123a1.25 1.25 0 0 0 1.599-.14l.244-.245a.862.862 0 0 1 1.146-.065l1.463 1.161a1.126 1.126 0 0 1-.013 1.775l-.544.419c-.611.47-1.403.635-2.151.448A9.729 9.729 0 0 1 .933 3.992 2.522 2.522 0 0 1 1.38 1.84Z" stroke="#5C5E63" strokeLinejoin="round" />
                            </svg>
                            {/* Green checkmark badge */}
                            <svg className="absolute -right-1 -bottom-1" width="14" height="14" fill="none">
                              <rect x=".5" y=".5" width="13" height="13" rx="6.5" fill="#fff" />
                              <rect x=".5" y=".5" width="13" height="13" rx="6.5" stroke="#fff" />
                              <circle cx="7" cy="7" r="5.5" fill="#DDF9E4" stroke="#C7F4D3" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="m5 7.318.052.082c.442.699.663 1.048.947 1.17a1 1 0 0 0 .778.007c.285-.118.512-.464.965-1.156L9 5.5" stroke="#075A39" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <AvatarMCSmall className="ml-3" />
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-1.5">Michael Chang</span>
                          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] ml-[3px] text-[#75777C]">
                            made an <span className="underline">outbound phone call</span>
                          </span>
                        </div>
                      </div>
                      <span className="font-medium tracking-normal text-[12px] leading-4 text-[#9FA1A7] shrink-0 ml-2">4 days ago</span>
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
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">Sarah Johnson</span>
                </DetailRow>
              </motion.div>

              {/* Description */}
              <motion.div {...fade(1.18)}>
                <DetailRow
                  label="Description"
                  icon={<svg width="14" height="14" fill="none"><rect x="1" y="2" width="12" height="10" rx="2.5" stroke="#75777C" strokeWidth="1.1" /><path d="M3 9.7 3.618 8M7 9.7 6.382 8m0 0-.215-.592L5 4.199 3.833 7.408l-.215.591m2.764 0H3.618M8.65 6h2.4M8.65 8h2.4" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">Head of IT at GreenLeaf Inc.</span>
                </DetailRow>
              </motion.div>

              {/* Email */}
              <motion.div {...fade(1.24)}>
                <DetailRow
                  label="Email"
                  icon={<svg width="14" height="14" fill="none"><g stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d="M9.466 7a2.466 2.466 0 1 1-4.93 0 2.466 2.466 0 0 1 4.93 0Z" /><path d="M7 12.5a5.5 5.5 0 1 1 0-11c4.41 0 5.5 3.319 5.5 5.5v.948a1.517 1.517 0 0 1-3.034 0V4.534" /></g></svg>}
                >
                  <div className="flex w-fit rounded-lg border border-[#B8D0FF] px-[5px] pb-px">
                    <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate text-[#407FF2]">sarah@greenleaf.com</span>
                  </div>
                </DetailRow>
              </motion.div>

              {/* Location */}
              <motion.div {...fade(1.30)}>
                <DetailRow
                  label="Location"
                  icon={<svg width="14" height="14" fill="none"><path d="M12 6.143C12 9.84 8.928 13 7 13S2 9.84 2 6.143C2 3.303 4.239 1 7 1s5 2.303 5 5.143Z" stroke="#75777C" strokeWidth="1.1" /><circle cx="7" cy="6" r="1.75" stroke="#75777C" strokeWidth="1.1" /></svg>}
                >
                  <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">San Francisco, CA</span>
                </DetailRow>
              </motion.div>

              {/* Company */}
              <motion.div {...fade(1.36)}>
                <DetailRow
                  label="Company"
                  icon={<svg width="14" height="14" fill="none"><path d="M2 5.002v3.993c0 1.401 0 2.102.273 2.637a2.5 2.5 0 0 0 1.092 1.092c.535.273 1.235.273 2.635.273h2c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C12 11.097 12 10.397 12 8.997V5c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.092C10.1 1 9.4 1 8 1H6c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2 2.9 2 3.6 2 5.002ZM4.2 3.799H8M6 6.598h3.8" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.428 12.728v-1.94c0-.491 0-.736-.095-.923a.875.875 0 0 0-.382-.383c-.188-.095-.433-.095-.923-.095h-.056c-.49 0-.736 0-.923.095a.875.875 0 0 0-.382.383c-.096.187-.096.432-.096.922v1.94" stroke="#75777C" strokeWidth="1.1" strokeLinejoin="round" /></svg>}
                >
                  <div className="flex items-center gap-x-1.5">
                    <LogoGL className="size-4 rounded-[5px]" />
                    <div className="relative">
                      <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] truncate">GreenLeaf Inc.</span>
                      <div className="absolute bottom-px left-[-0.5px] h-px w-[calc(100%+1px)] rounded-sm bg-[#232529]" />
                    </div>
                  </div>
                </DetailRow>
              </motion.div>

            </div>
          </div>{/* /details */}
        </div>{/* /inner grid */}

      </div>
    </div>
  )
}
