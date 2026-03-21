'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Animation constants ───────────────────────────────────────────────────────

const QUERY = 'How do I win my deal with Greenleaf?'
/** Steps: 1=B1 typing, 2=card, 3=B3 typing, 4=B4 typing, 5=B5 typing, 6=buttons */
const TOTAL_STEPS = 6
type Phase = 'idle' | 'typing' | 'sent' | 'thinking' | 'responding' | 'done'

// ─── Text style constants ─────────────────────────────────────────────────────

const T  = 'font-medium text-[#232529] text-[7px] leading-[10px] lg:text-[14px] lg:leading-5'
const TB = 'font-semibold text-[#232529] text-[7px] leading-[10px] lg:text-[14px] lg:leading-5'

// ─── Segment type & block data ────────────────────────────────────────────────

/** Text segment: t = text content, b = bold */
type Seg = { t: string; b?: true }

/** Each Seg[] is one paragraph/line; each block is an array of those. */
const B1: Seg[][] = [
  [{ t: "Based on your recent activity and the upcoming meeting, here\u2019s a focused strategy to help you close the deal." }],
  [{ t: "Strategy to win Greenleaf", b: true }],
  [{ t: "Deal context:", b: true }],
]

const B3: Seg[][] = [
  [{ t: "Key opportunity signals:", b: true }],
  [{ t: "1.\u00a0" }, { t: "Large startup deal",      b: true }, { t: " \u2014 $120K ACV \u2014 top 10% of your pipeline" }],
  [{ t: "2.\u00a0" }, { t: "Active migration intent",  b: true }, { t: " \u2014 Moving from Salesforce, researching CRMs now" }],
  [{ t: "3.\u00a0" }, { t: "Strong ICP fit",           b: true }, { t: " \u2014 Series B, 80-person sales team" }],
  [{ t: "4.\u00a0" }, { t: "Recent engagement",        b: true }, { t: " \u2014 Annie Zhang opened your deck 3x in 48h" }],
]

const B4: Seg[][] = [
  [{ t: "Critical next steps:", b: true }],
  [{ t: "1.\u00a0" }, { t: "Lead with Greenleaf-specific ROI", b: true }],
  [{ t: "    a.\u00a0Reference their current Salesforce pain points" }],
  [{ t: "    b.\u00a0Quantify migration savings" }],
  [{ t: "    c.\u00a0Show similar startup success metrics" }],
  [{ t: "2.\u00a0" }, { t: "Address timeline urgency",  b: true }, { t: " \u2014 propose 2-week pilot to align with their Q1 planning" }],
  [{ t: "3.\u00a0" }, { t: "Mobilize your champion",    b: true }, { t: " \u2014 Dylan has final budget authority; get 1:1 time before the group call" }],
]

const B5: Seg[][] = [
  [{ t: "Would you like me to prepare an agenda with talking points for today\u2019s call?" }],
]

// ─── ThinkingDots ─────────────────────────────────────────────────────────────

function ThinkingDots(): ReactNode {
  return (
    <div className="flex items-center gap-[3px] lg:gap-[6px] py-[3px] lg:py-[6px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block size-[3px] lg:size-[6px] rounded-full bg-[#505155]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── GreenleafIntroCard ────────────────────────────────────────────────────────

function GreenleafIntroCard(): ReactNode {
  return (
    <div className="flex max-w-96 overflow-hidden bg-white rounded-[5px] border-[0.33px] border-[rgba(56,62,71,0.01)] shadow-[0px_0.8px_0.8px_0px_rgba(127,135,144,0.09),0px_0px_0px_0.5px_rgba(0,0,0,0.04)] lg:max-w-92 lg:rounded-[10px] lg:border-[0.66px] lg:shadow-[0px_1.6px_1.6px_0px_rgba(127,135,144,0.09),0px_0px_0px_1px_rgba(0,0,0,0.04)]">
      {/* Green left accent bar */}
      <div className="relative shrink-0 w-[6.5px] lg:w-[13px]">
        <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#00D17E] top-[5px] bottom-[5px] w-[1.5px] lg:top-[10px] lg:bottom-[10px] lg:w-[3px] ml-0.5 lg:ml-1" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Row: thumbnail + title/date + avatars */}
        <div className="flex items-start">
          <div className="flex shrink-0 items-center justify-center py-[6px] pl-[4px] lg:py-[12px] lg:pl-[8px]">
            <div className="relative shrink-0 overflow-hidden h-[16px] w-[22px] rounded-[2.5px] lg:h-[32px] lg:w-[44px] lg:rounded-[5px] bg-emerald-400">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.11)] to-[rgba(0,0,0,0.22)]" />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col pt-[5px] pr-[6px] pb-[4px] pl-[4px] lg:pt-[10px] lg:pr-[12px] lg:pb-[8px] lg:pl-[8px]">
            <span className="truncate font-medium text-[#242629] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">Greenleaf Intro</span>
            <span className="truncate font-medium text-[rgba(0,0,0,0.55)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">Dec 12, 10:40 – 11:32 AM</span>
          </div>
          <div className="flex shrink-0 items-start pt-[6px] pr-[8px] pl-[6px] lg:pt-[12px] lg:pr-[16px] lg:pl-[12px]">
            <div className="flex">
              {['/avatars/ask/ask-tab-success/avatar-1.avif', '/avatars/ask/ask-tab-success/avatar-2.avif'].map((src, i) => (
                <div key={i} className={`rounded-full border border-white ${i > 0 ? '-ml-[2px] lg:-ml-[4px]' : ''}`}>
                  <Image src={src} alt="" width={16} height={16} loading="lazy" className="rounded-full object-cover ring-1 ring-[rgba(0,0,0,0.05)] size-[8px] lg:size-[16px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Metadata badges */}
        <div className="flex items-center pr-[5px] pb-[5px] pl-[4px] lg:pr-[10px] lg:pb-[10px] lg:pl-[8px]">
          <div className="flex flex-1 items-center gap-[3px] lg:gap-[6px]">
            <div className="flex items-center gap-[2px] lg:gap-[4px]">
              {/* Notes: 3 */}
              <div className="flex items-center bg-[#F8F9FA] ring-1 ring-[#EEEFF1] h-[10px] min-w-[10px] gap-[2px] rounded-[3px] px-[2px] lg:h-[20px] lg:min-w-[20px] lg:gap-[4px] lg:rounded-[6px] lg:px-[4px]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 size-[6px] lg:size-[12px]"><path d="M5.98132 0.819336C6.43313 0.819336 6.79699 0.819791 7.0907 0.84375C7.38921 0.868139 7.65181 0.919422 7.89441 1.04297C8.27988 1.23938 8.59351 1.55301 8.78992 1.93848C8.91344 2.18106 8.96475 2.4437 8.98914 2.74219C9.01309 3.03589 9.01355 3.39979 9.01355 3.85156V5.98242C9.01355 6.4342 9.01311 6.79812 8.98914 7.0918C8.96473 7.39017 8.91345 7.653 8.78992 7.89551C8.59349 8.28075 8.27971 8.59469 7.89441 8.79102C7.65191 8.91443 7.38907 8.96586 7.0907 8.99023C6.797 9.01419 6.43309 9.01465 5.98132 9.01465H5.27234C5.04637 9.01444 4.86242 8.83045 4.86218 8.60449C4.86218 8.37834 5.04623 8.19454 5.27234 8.19434H5.98132C6.44668 8.19434 6.77164 8.19444 7.02429 8.17383C7.2718 8.1536 7.41451 8.11538 7.52234 8.06055C7.75346 7.94279 7.94159 7.75449 8.05945 7.52344C8.11437 7.41562 8.15246 7.27298 8.17273 7.02539C8.19337 6.77276 8.19324 6.4478 8.19324 5.98242V3.85156C8.19324 3.3862 8.19334 3.06124 8.17273 2.80859C8.15248 2.56087 8.11436 2.41841 8.05945 2.31055C7.9416 2.07926 7.75362 1.89128 7.52234 1.77344C7.41447 1.71851 7.27207 1.6804 7.02429 1.66016C6.77163 1.63954 6.44672 1.63965 5.98132 1.63965H3.85046C3.38506 1.63965 3.06013 1.63951 2.80749 1.66016C2.55988 1.68042 2.41728 1.71851 2.30945 1.77344C2.07838 1.8913 1.8901 2.07942 1.77234 2.31055C1.71752 2.41837 1.67928 2.5611 1.65906 2.80859C1.63845 3.06123 1.63855 3.38623 1.63855 3.85156V4.58887C1.63821 4.81486 1.45447 4.99805 1.22839 4.99805C1.00249 4.99784 0.818575 4.81474 0.818237 4.58887V3.85156C0.818237 3.39982 0.818702 3.03588 0.842651 2.74219C0.867028 2.44383 0.91846 2.18097 1.04187 1.93848C1.2382 1.55316 1.55212 1.23939 1.93738 1.04297C2.1799 0.919432 2.4427 0.868157 2.74109 0.84375C3.03478 0.819771 3.39866 0.819336 3.85046 0.819336H5.98132ZM1.69226 5.87402L3.14148 6.16406C3.30335 6.19663 3.42928 6.32347 3.46179 6.48535L3.75183 7.93359C3.7962 8.15545 3.65238 8.3716 3.43054 8.41602C3.2088 8.46022 2.99352 8.31644 2.9491 8.09473L2.80945 7.39551L1.32214 8.88379C1.16219 9.04346 0.902979 9.04348 0.743042 8.88379C0.583055 8.72378 0.583042 8.46371 0.743042 8.30371L2.22937 6.81738L1.5321 6.67773C1.31026 6.63335 1.1665 6.41716 1.21082 6.19531C1.25542 5.97379 1.47062 5.82982 1.69226 5.87402Z" fill="#505154" /></svg>
                <span className="font-medium text-[#505154] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">3</span>
              </div>
              {/* Attachment: 2 */}
              <div className="flex items-center bg-[#F8F9FA] ring-1 ring-[#EEEFF1] h-[10px] min-w-[10px] gap-[2px] rounded-[3px] px-[2px] lg:h-[20px] lg:min-w-[20px] lg:gap-[4px] lg:rounded-[6px] lg:px-[4px]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 size-[6px] lg:size-[12px]"><path d="M3.97656 0.492676C5.22107 0.492735 6.23047 1.50206 6.23047 2.74658V6.43408C6.23041 7.22599 5.5878 7.86762 4.7959 7.86768C4.00399 7.86762 3.36236 7.22599 3.3623 6.43408V3.13818C3.3623 2.91197 3.5453 2.72814 3.77148 2.72803C3.99772 2.72809 4.18164 2.91194 4.18164 3.13818V6.43408C4.1817 6.77342 4.45656 7.04828 4.7959 7.04834C5.13524 7.04828 5.4101 6.77342 5.41016 6.43408V2.74658C5.41016 1.95463 4.7685 1.31305 3.97656 1.31299C3.18457 1.31299 2.54297 1.95459 2.54297 2.74658V6.43408C2.54303 7.67855 3.55143 8.68793 4.7959 8.68799C6.04037 8.68793 7.04975 7.67856 7.0498 6.43408V2.13232C7.0498 1.90611 7.2328 1.72229 7.45898 1.72217C7.68522 1.72223 7.86914 1.90608 7.86914 2.13232V6.43408C7.86908 8.13112 6.49294 9.50727 4.7959 9.50732C3.09886 9.50727 1.72272 8.13112 1.72266 6.43408V2.74658C1.72266 1.50202 2.732 0.492676 3.97656 0.492676Z" fill="#505154" /></svg>
                <span className="font-medium text-[#505154] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">2</span>
              </div>
            </div>
            <div className="shrink-0 bg-[#EEEFF1] h-[6px] w-px lg:h-[12px]" />
            <div className="flex items-center gap-[2px] lg:gap-[4px]">
              {/* Files: 2 */}
              <div className="flex items-center bg-[#F8F9FA] ring-1 ring-[#EEEFF1] h-[10px] min-w-[10px] gap-[2px] rounded-[3px] px-[2px] lg:h-[20px] lg:min-w-[20px] lg:gap-[4px] lg:rounded-[6px] lg:px-[4px]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 size-[6px] lg:size-[12px]"><path d="M5.84961 0.491943C5.96496 0.493429 6.07213 0.499113 6.17676 0.52417C6.30218 0.55424 6.42223 0.604276 6.53223 0.671631C6.66591 0.753546 6.77538 0.866924 6.90332 0.994873L8.1836 2.27515C8.31148 2.40303 8.42495 2.51262 8.50684 2.64624C8.57412 2.75612 8.62422 2.87643 8.6543 3.00171C8.67999 3.10904 8.68427 3.21888 8.68555 3.33765C8.68589 3.34443 8.6875 3.35128 8.6875 3.35815V6.47534C8.6875 6.92727 8.68806 7.29098 8.66406 7.58472C8.63967 7.88326 8.58844 8.14581 8.46485 8.38843C8.26844 8.77386 7.95477 9.08753 7.56934 9.28394C7.32672 9.40753 7.06416 9.45876 6.76563 9.48315C6.47189 9.50714 6.10818 9.50659 5.65625 9.50659H4.34473C3.89281 9.50659 3.5291 9.50713 3.23535 9.48315C2.93685 9.45877 2.67423 9.40747 2.43164 9.28394C2.04621 9.08755 1.73255 8.77384 1.53613 8.38843C1.41253 8.1458 1.36132 7.88327 1.33692 7.58472C1.31292 7.29098 1.3125 6.92728 1.3125 6.47534V3.52319C1.3125 3.07146 1.31294 2.70743 1.33692 2.41382C1.36131 2.11556 1.41267 1.85353 1.53613 1.61108C1.73239 1.22573 2.04543 0.912069 2.43067 0.715576C2.67302 0.591981 2.93518 0.540931 3.2334 0.516357C3.52701 0.492204 3.89103 0.492214 4.34277 0.491943H5.84961ZM4.34375 1.31128C3.87837 1.31156 3.55336 1.31199 3.30078 1.33276C3.0532 1.35316 2.91053 1.39107 2.80274 1.44604C2.57176 1.56395 2.3843 1.75206 2.2666 1.98315C2.21168 2.09102 2.17356 2.23345 2.15332 2.4812C2.13272 2.73371 2.13281 3.05809 2.13281 3.52319V6.47534C2.13282 6.94082 2.13268 7.26565 2.15332 7.51831C2.17359 7.76608 2.21165 7.9085 2.2666 8.01636C2.38445 8.24757 2.57248 8.43565 2.80371 8.55347C2.91158 8.60838 3.05402 8.6465 3.30176 8.66675C3.55444 8.68738 3.87921 8.68726 4.34473 8.68726H5.65625C6.12174 8.68726 6.44655 8.68739 6.69922 8.66675C6.947 8.64649 7.0894 8.60842 7.19727 8.55347C7.42852 8.43563 7.61654 8.24761 7.73438 8.01636C7.78933 7.90849 7.82739 7.76609 7.84766 7.51831C7.8683 7.26565 7.86817 6.94083 7.86817 6.47534V3.76831H7.13086C6.90834 3.76831 6.71569 3.76845 6.5586 3.75562C6.39697 3.74236 6.23575 3.71326 6.08106 3.63452C5.85005 3.51674 5.66175 3.3284 5.54395 3.09741C5.465 2.94243 5.43511 2.78082 5.42188 2.6189C5.40905 2.46179 5.40918 2.27013 5.40918 2.04761V1.3103L4.34375 1.31128Z" fill="#505154" /></svg>
                <span className="font-medium text-[#505154] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">2</span>
              </div>
            </div>
            <div className="shrink-0 bg-[#EEEFF1] h-[6px] w-px lg:h-[12px]" />
            <div className="flex items-center gap-[2px] lg:gap-[4px]">
              {/* Recorded: 48m */}
              <div className="flex items-center bg-[#F8F9FA] ring-1 ring-[#EEEFF1] h-[10px] min-w-[10px] gap-[2px] rounded-[3px] px-[2px] lg:h-[20px] lg:min-w-[20px] lg:gap-[4px] lg:rounded-[6px] lg:px-[4px]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 size-[6px] lg:size-[12px]">
                  <path d="M4.91309 1.2256C5.27653 1.2256 5.51933 1.22378 5.72852 1.26564C6.53874 1.42805 7.17252 2.06187 7.33496 2.87208C7.3484 2.93916 7.35541 3.01018 7.36133 3.08693L7.96191 2.84669C8.10501 2.78945 8.23827 2.73572 8.35059 2.70216C8.46402 2.66831 8.61099 2.63783 8.77051 2.67091C8.95535 2.70939 9.12099 2.81 9.23926 2.95509C9.38849 3.22726 9.40503 3.33243 9.41309 3.42091C9.42368 3.53768 9.42285 3.68171 9.42285 3.83595V5.99708C9.42285 6.15102 9.42363 6.29451 9.41309 6.41114C9.40238 6.52908 9.37618 6.67664 9.28613 6.81251C9.16685 6.99234 8.98178 7.11816 8.77051 7.16212C8.61095 7.19524 8.46404 7.16375 8.35059 7.12989C8.23833 7.09633 8.10488 7.04255 7.96191 6.98536L7.36035 6.74513C7.3546 6.81785 7.34854 6.8853 7.33594 6.94923C7.17499 7.76408 6.5375 8.40157 5.72266 8.56251C5.51625 8.60323 5.27737 8.6006 4.91895 8.6006H3.85059C3.39871 8.6006 3.03493 8.60114 2.74121 8.57716C2.44276 8.55276 2.18006 8.50149 1.9375 8.37794C1.55215 8.18153 1.23835 7.86782 1.04199 7.48243C0.918467 7.23985 0.867161 6.97721 0.842773 6.67872C0.8188 6.385 0.818359 6.02121 0.818359 5.56935V4.25782C0.818359 3.80595 0.818791 3.44217 0.842773 3.14845C0.867174 2.84997 0.918428 2.58731 1.04199 2.34474C1.23839 1.95934 1.5521 1.64562 1.9375 1.44923C2.18008 1.32566 2.44273 1.27441 2.74121 1.25001C3.03493 1.22603 3.3987 1.2256 3.85059 1.2256H4.91309Z" fill="url(#rec-grad)" />
                  <defs>
                    <linearGradient id="rec-grad" x1="0.818359" y1="1.22559" x2="10.6134" y2="6.30467" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#85AFF2" /><stop offset="1" stopColor="#E2A3B5" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="font-medium text-[#505154] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">Recorded<span className="text-[#898A8D]"> 48m</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ResponseBlock — fade+slide in when visible ───────────────────────────────

function RBlock({ show, children }: { show: boolean; children: ReactNode }): ReactNode {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── TypedContent — character-by-character reveal ─────────────────────────────

function TypedContent({
  show, def, speed = 5, onDone, onTick,
}: {
  show: boolean
  def: Seg[][]
  speed?: number
  onDone?: () => void
  onTick?: () => void
}): ReactNode {
  const totalChars = def.reduce((acc, para) => acc + para.reduce((a, s) => a + s.t.length, 0), 0)
  const [count, setCount] = useState(0)
  const twRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!show) { setCount(0); doneRef.current = false; return }
    const clear = (): void => { if (twRef.current) clearTimeout(twRef.current) }
    if (count < totalChars) {
      twRef.current = setTimeout(() => { setCount(c => c + 1); onTick?.() }, speed)
    } else if (!doneRef.current) {
      doneRef.current = true
      onDone?.()
    }
    return clear
  }, [show, count, totalChars, speed, onDone, onTick])

  if (!show) return null

  let remaining = count
  const paraNodes: ReactNode[] = []

  for (let pi = 0; pi < def.length; pi++) {
    if (remaining <= 0) break
    const para = def[pi]!
    const paraLen = para.reduce((a, s) => a + s.t.length, 0)
    const paraVisible = Math.min(remaining, paraLen)
    remaining -= paraLen

    let segRem = paraVisible
    const segNodes: ReactNode[] = []
    for (let si = 0; si < para.length; si++) {
      if (segRem <= 0) break
      const seg = para[si]!
      const chars = Math.min(segRem, seg.t.length)
      segRem -= seg.t.length
      segNodes.push(
        seg.b
          ? <span key={si} className={TB}>{seg.t.slice(0, chars)}</span>
          : <span key={si}>{seg.t.slice(0, chars)}</span>
      )
    }

    const isLast = remaining <= 0
    paraNodes.push(
      <p key={pi} className={T}>
        {segNodes}
        {isLast && count < totalChars && (
          <span className="ml-px inline-block h-[1em] w-px translate-y-[1px] bg-[#266DF0] lg:translate-y-[2px]" />
        )}
      </p>
    )
  }

  return <div className="flex flex-col gap-[3px] lg:gap-[6px]">{paraNodes}</div>
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatDemoPanel(): ReactNode {
  const [phase, setPhase]    = useState<Phase>('idle')
  const [charIndex, setChar] = useState(0)
  const [step, setStep]      = useState(0)
  const timerRef             = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollRef            = useRef<HTMLDivElement>(null)

  // ── phase-based state machine ──────────────────────────────────────────────
  useEffect(() => {
    const clear = (): void => { if (timerRef.current) clearTimeout(timerRef.current) }
    if (phase === 'idle') {
      clear(); setChar(0); setStep(0)
      timerRef.current = setTimeout(() => setPhase('typing'), 1000)
    } else if (phase === 'sent') {
      clear()
      timerRef.current = setTimeout(() => setPhase('thinking'), 200)
    } else if (phase === 'thinking') {
      clear()
      timerRef.current = setTimeout(() => setPhase('responding'), 1500)
    } else if (phase === 'responding') {
      clear()
      // Block chaining is driven by TypedContent onDone callbacks.
      // We just kick off block 1 here.
      timerRef.current = setTimeout(() => setStep(1), 300)
    } else if (phase === 'done') {
      clear()
      timerRef.current = setTimeout(() => setPhase('idle'), 3000)
    }
    return clear
  }, [phase])

  // ── typing animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'typing') return
    const clear = (): void => { if (timerRef.current) clearTimeout(timerRef.current) }
    if (charIndex < QUERY.length) {
      timerRef.current = setTimeout(() => setChar(c => c + 1), 45)
    } else {
      timerRef.current = setTimeout(() => setPhase('sent'), 600)
    }
    return clear
  }, [phase, charIndex])

  // ── step watcher: card delay (2→3) and sequence end (6→done) ─────────────
  useEffect(() => {
    if (phase !== 'responding') return
    if (step === 2) {
      // Card just appeared — wait a beat then start block 3
      timerRef.current = setTimeout(() => setStep(3), 500)
    } else if (step >= TOTAL_STEPS) {
      // All blocks shown, wrap up
      timerRef.current = setTimeout(() => setPhase('done'), 800)
    }
  }, [step, phase])

  // ── auto-scroll as blocks reveal ──────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [step, phase])

  const isChat    = phase === 'sent' || phase === 'thinking' || phase === 'responding' || phase === 'done'
  const isHome    = phase === 'idle' || phase === 'typing'
  const inputText = phase === 'typing' ? QUERY.slice(0, charIndex) : ''

  const scrollToBottom = (): void => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }

  return (
    <>
      {/* ── Header bar — "Home" state ────────────────────────────────────────────── */}
      <div className="flex w-full items-center border-[#EEEFF1] h-[20px] border-b-[0.5px] lg:h-[40px] lg:border-b shrink-0">
        <div className="flex h-full w-full items-center">
          <div className="flex w-full items-center justify-between gap-[4px] px-[6px] lg:gap-[8px] lg:px-[12px]">

            {/* Left: Home breadcrumb with house icon */}
            <div className="flex min-h-px min-w-px flex-1 flex-col items-start">
              <div className="flex h-[11px] w-full items-center lg:h-[22px]">
                <div className="flex shrink-0 items-center gap-[2px] rounded-[3px] px-[2px] py-[0.5px] lg:gap-[4px] lg:rounded-[6px] lg:px-[4px] lg:py-px">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] text-[#242629] lg:size-[14px]" aria-hidden>
                    <path d="M5.41699 1.14917C6.33787 0.395804 7.66213 0.395804 8.58301 1.14917L11.8994 3.86304C12.5957 4.43275 12.9999 5.28467 13 6.18433V9.99976C13 11.6566 11.6569 12.9998 10 12.9998H4C2.34315 12.9998 1 11.6566 1 9.99976V6.18433C1.0001 5.28467 1.40429 4.43275 2.10059 3.86304L5.41699 1.14917ZM7.9502 1.92261C7.39768 1.47063 6.60232 1.47063 6.0498 1.92261L2.7334 4.63647C2.26924 5.01626 2.0001 5.5846 2 6.18433V9.99976C2 11.1043 2.89543 11.9998 4 11.9998H10C11.1046 11.9998 12 11.1043 12 9.99976V6.18433C11.9999 5.5846 11.7308 5.01626 11.2666 4.63647L7.9502 1.92261ZM9.5 8.99976C9.77607 8.99976 9.99989 9.22371 10 9.49976C10 9.7759 9.77614 9.99976 9.5 9.99976H4.5C4.22386 9.99976 4 9.7759 4 9.49976C4.00011 9.22371 4.22393 8.99976 4.5 8.99976H9.5Z" fill="currentColor" />
                  </svg>
                  <div className="flex shrink-0 items-center justify-center px-[1px] lg:px-[2px]">
                    <span className="font-medium text-[#242629] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">Home</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: New thread button */}
            <div className="flex shrink-0 items-center gap-[4px] lg:gap-[8px]">
              <div className="flex shrink-0 items-center justify-center overflow-clip h-[14px] w-[33px] gap-[2px] rounded-[4px] pr-[3px] pl-[4px] lg:h-[28px] lg:w-[66px] lg:gap-[4px] lg:rounded-[8px] lg:pr-[6px] lg:pl-[8px]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] text-[#5C5E63] lg:size-[14px]" aria-hidden>
                  <path d="M7 1.75V12.25M1.75 7H12.25" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex shrink-0 items-center justify-center px-[0.5px] lg:px-px">
                  <span className="font-medium text-[rgba(0,0,0,0.55)] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">New</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Main scrollable area ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className={`mx-auto flex h-full w-full max-w-[360px] flex-col lg:max-w-[720px] px-3 lg:px-6 transition-transform duration-500${isChat ? '' : ' -translate-y-48 lg:-translate-y-96'}`}>

          {/* AI response scroll area — sits above the greeting, masked at top */}
          <div ref={scrollRef} className="scrollbar-none flex shrink-0 grow-0 basis-48 flex-col gap-2 overflow-y-auto px-px lg:basis-96 lg:gap-4[mask-image:linear-gradient(to_bottom,transparent,black_24px,black_100%)]">

            {/* User bubble */}
            <AnimatePresence>
              {isChat && (
                <motion.div key="user-bubble" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-end">
                  <div className="flex bg-gray-100 rounded-sm px-1 py-0.5 lg:rounded-lg lg:px-2 lg:py-1 mt-3 lg:mt-6">
                    <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] text-[rgba(0,0,0,0.55)]">{QUERY}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thinking dots */}
            <AnimatePresence>
              {phase === 'thinking' && (
                <motion.div key="thinking-dots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <ThinkingDots />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Block 1: intro + strategy headings — typing effect */}
            <TypedContent
              show={step >= 1}
              def={B1}
              onTick={scrollToBottom}
              onDone={() => { timerRef.current = setTimeout(() => setStep(2), 300) }}
            />

            {/* Block 2: meeting card — enters whole */}
            <RBlock show={step >= 2}>
              <GreenleafIntroCard />
            </RBlock>

            {/* Block 3: key opportunity signals — typing effect */}
            <TypedContent
              show={step >= 3}
              def={B3}
              onTick={scrollToBottom}
              onDone={() => { timerRef.current = setTimeout(() => setStep(4), 300) }}
            />

            {/* Block 4: critical next steps — typing effect */}
            <TypedContent
              show={step >= 4}
              def={B4}
              onTick={scrollToBottom}
              onDone={() => { timerRef.current = setTimeout(() => setStep(5), 300) }}
            />

            {/* Block 5: closing question — typing effect, then buttons */}
            <TypedContent
              show={step >= 5}
              def={B5}
              onTick={scrollToBottom}
              onDone={() => { timerRef.current = setTimeout(() => setStep(6), 300) }}
            />

            {/* Block 5 buttons — appear after typing finishes */}
            <RBlock show={step >= 6}>
              <div className="flex items-center gap-[2px] lg:gap-[4px]">
                  {/* copy */}
                  <button className="flex shrink-0 items-center justify-center size-[14px] rounded-[3px] lg:size-[28px] lg:rounded-[6px] hover:bg-black/5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M5 2.5C4.17157 2.5 3.5 3.17157 3.5 4V10.5C3.5 11.3284 4.17157 12 5 12H10C10.8284 12 11.5 11.3284 11.5 10.5V4C11.5 3.17157 10.8284 2.5 10 2.5H5ZM4.5 4C4.5 3.72386 4.72386 3.5 5 3.5H10C10.2761 3.5 10.5 3.72386 10.5 4V10.5C10.5 10.7761 10.2761 11 10 11H5C4.72386 11 4.5 10.7761 4.5 10.5V4ZM2 4.5C2.27614 4.5 2.5 4.72386 2.5 5V11C2.5 11.2761 2.72386 11.5 3 11.5H8.5C8.77614 11.5 9 11.7239 9 12C9 12.2761 8.77614 12.5 8.5 12.5H3C2.17157 12.5 1.5 11.8284 1.5 11V5C1.5 4.72386 1.72386 4.5 2 4.5Z" fill="#6D6E72" />
                    </svg>
                  </button>
                  {/* thumbs up */}
                  <button className="flex shrink-0 items-center justify-center size-[14px] rounded-[3px] lg:size-[28px] lg:rounded-[6px] hover:bg-black/5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M5.15234 2.17578C5.53614 1.26697 6.68415 1.01255 7.39648 1.70508L7.75 2.04883C8.36491 2.64429 8.68408 3.47701 8.63574 4.32812L8.61914 4.61914H10.3057C11.3056 4.61914 12.0764 5.52021 11.9199 6.50781L11.3809 9.88477C11.2567 10.6581 10.5894 11.2305 9.80664 11.2305H5.84277C5.25497 11.2305 4.72861 10.9058 4.47168 10.3965L2.94043 7.36426C2.64853 6.78741 2.64856 6.10491 2.94043 5.52807C3.2323 4.95122 3.82024 4.59473 4.46289 4.59473H5.11621L5.04492 3.97754C4.97979 3.40735 5.03095 2.83369 5.15234 2.17578ZM6.73047 2.42285C6.42126 2.12253 5.90951 2.2422 5.76953 2.64551C5.68266 2.90141 5.6165 3.30543 5.63379 3.78613L5.76074 6.09473H4.46289C4.13232 6.09473 3.83133 6.27283 3.67773 6.5625C3.52411 6.85217 3.52411 7.21015 3.67773 7.5L5.20898 10.5322C5.29434 10.7028 5.46117 10.7305 5.84277 10.7305H9.80664C10.1344 10.7305 10.4159 10.4989 10.4678 10.1758L11.0068 6.79883C11.077 6.36839 10.7448 5.96914 10.3057 5.96914H7.61523L7.6416 4.62598C7.6748 3.97266 7.38184 3.34277 6.88574 2.86133L6.73047 2.42285Z" fill="#6D6E72" />
                    </svg>
                  </button>
                  {/* thumbs down */}
                  <button className="flex shrink-0 items-center justify-center size-[14px] rounded-[3px] lg:size-[28px] lg:rounded-[6px] hover:bg-black/5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M8.84766 11.8242C8.46386 12.733 7.31585 12.9875 6.60352 12.2949L6.25 11.9512C5.63509 11.3557 5.31592 10.523 5.36426 9.67188L5.38086 9.38086H3.69434C2.6944 9.38086 1.92358 8.47979 2.08008 7.49219L2.61914 4.11523C2.74328 3.34187 3.41063 2.76953 4.19336 2.76953H8.15723C8.74503 2.76953 9.27139 3.09424 9.52832 3.60352L11.0596 6.63574C11.3515 7.21259 11.3514 7.89509 11.0596 8.47193C10.7677 9.04878 10.1798 9.40527 9.53711 9.40527H8.88379L8.95508 10.0225C9.02021 10.5927 8.96905 11.1663 8.84766 11.8242ZM7.26953 11.5771C7.57874 11.8775 8.09049 11.7578 8.23047 11.3545C8.31734 11.0986 8.3835 10.6946 8.36621 10.2139L8.23926 7.90527H9.53711C9.86768 7.90527 10.1687 7.72717 10.3223 7.4375C10.4759 7.14783 10.4759 6.78985 10.3223 6.5L8.79102 3.46777C8.70566 3.29721 8.53883 3.26953 8.15723 3.26953H4.19336C3.86558 3.26953 3.58408 3.50107 3.53223 3.82422L2.99316 7.20117C2.92296 7.63161 3.25519 8.03086 3.69434 8.03086H6.38477L6.3584 9.37402C6.3252 10.0273 6.61816 10.6572 7.11426 11.1387L7.26953 11.5771Z" fill="#6D6E72" />
                    </svg>
                  </button>
                  {/* retry */}
                  <button className="flex shrink-0 items-center justify-center size-[14px] rounded-[3px] lg:size-[28px] lg:rounded-[6px] hover:bg-black/5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M7.5 2C6.17392 2 4.90215 2.52678 3.96447 3.46447C3.57771 3.85122 3.27152 4.30339 3.0537 4.8H4C4.27614 4.8 4.5 5.02386 4.5 5.3C4.5 5.57614 4.27614 5.8 4 5.8H2C1.72386 5.8 1.5 5.57614 1.5 5.3V3.3C1.5 3.02386 1.72386 2.8 2 2.8C2.27614 2.8 2.5 3.02386 2.5 3.3V4.14143C2.77716 3.63878 3.1322 3.1832 3.55025 2.79289C4.73858 1.67893 6.32044 1 8 1C11.3137 1 14 3.68629 14 7C14 10.3137 11.3137 13 8 13C4.68629 13 2 10.3137 2 7C2 6.72386 2.22386 6.5 2.5 6.5C2.77614 6.5 3 6.72386 3 7C3 9.76142 5.23858 12 8 12C10.7614 12 13 9.76142 13 7C13 4.23858 10.7614 2 8 2H7.5Z" fill="#6D6E72" />
                    </svg>
                  </button>
                </div>
            </RBlock>

          </div>

          {/* Greeting */}
          <AnimatePresence>
            {isHome && (
              <motion.div key="greeting" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex items-center mt-6 mb-[12px] px-[4px] lg:mt-12 lg:mb-[24px] lg:px-[8px]">
                <span className="font-semibold text-[#242629] text-[10px] leading-[12px] tracking-[-0.1px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.2px]">Good morning, Alex</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Input box — exact Attio structure ──────────────────────────────────── */}
          {/* Outer: flex-col box split into text-area (top) + action-bar (bottom)   */}
          <div className={`flex w-full flex-col bg-white h-[58px] rounded-[7px] border-[0.5px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.04)] lg:h-[116px] lg:rounded-[14px] lg:border lg:shadow-[0px_12px_30px_0px_rgba(0,0,0,0.04)] transition-colors duration-200 mt-[6px] lg:mt-[12px] ${phase === 'typing' && charIndex > 0 ? 'border-[rgba(38,109,240,0.32)]' : 'border-[#E5E7EB]'}`}>

            {/* Top: typed text with cursor, or placeholder */}
            <div className="flex flex-1 items-start h-[36px] rounded-[5px] px-[6px] py-[4.5px] lg:h-[72px] lg:rounded-[10px] lg:px-[12px] lg:py-[9px]">
              <div className="flex h-[11px] flex-1 items-center overflow-clip lg:h-[22px]">
                {inputText ? (
                  <span className="overflow-hidden text-ellipsis font-medium text-[#242629] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">
                    {inputText}<span className="ml-px inline-block h-[1em] w-px translate-y-[1px] bg-[#266DF0] lg:translate-y-[2px]" />
                  </span>
                ) : (
                  <span className="overflow-hidden text-ellipsis font-medium text-[rgba(0,0,0,0.3)] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">
                    Ask anything...
                  </span>
                )}
              </div>
            </div>

            {/* Bottom: Auto label + slash icon + send button */}
            <div className="flex items-end gap-[6px] p-[4px] lg:gap-[12px] lg:p-[8px]">
              <div className="flex flex-1 items-center justify-end gap-px">

                {/* "Auto" text badge */}
                <div className="flex items-center justify-center h-[14px] min-w-[14px] gap-[2px] rounded-[4px] px-[3.5px] lg:h-[28px] lg:min-w-[28px] lg:gap-[4px] lg:rounded-[8px] lg:px-[7px]">
                  <div className="flex shrink-0 items-center justify-center px-[0.5px] lg:px-px">
                    <span className="font-medium text-[rgba(0,0,0,0.55)] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">Auto</span>
                  </div>
                </div>

                {/* Slash + send — grouped together as in Attio */}
                <div className="flex shrink-0 items-center gap-[2px] lg:gap-[4px]">
                  <div className="flex shrink-0 items-center justify-center overflow-clip size-[14px] min-w-[14px] rounded-[4px] lg:size-[28px] lg:min-w-[28px] lg:rounded-[8px]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M8.5 1C9.19178 1 9.74066 1.00003 10.1826 1.03613C10.6304 1.07272 11.0127 1.14901 11.3623 1.32715C11.9265 1.61472 12.3853 2.07347 12.6729 2.6377C12.851 2.98732 12.9273 3.36958 12.9639 3.81738C13 4.25934 13 4.80822 13 5.5V8.5C13 9.19178 13 9.74066 12.9639 10.1826C12.9273 10.6304 12.851 11.0127 12.6729 11.3623C12.3853 11.9265 11.9265 12.3853 11.3623 12.6729C11.0127 12.851 10.6304 12.9273 10.1826 12.9639C9.74066 13 9.19178 13 8.5 13H5.5C4.80822 13 4.25934 13 3.81738 12.9639C3.36958 12.9273 2.98732 12.851 2.6377 12.6729C2.07347 12.3853 1.61472 11.9265 1.32715 11.3623C1.14901 11.0127 1.07272 10.6304 1.03613 10.1826C1.00003 9.74066 1 9.19178 1 8.5V5.5C1 4.80822 1.00003 4.25934 1.03613 3.81738C1.07272 3.36958 1.14901 2.98732 1.32715 2.6377C1.61472 2.07347 2.07347 1.61472 2.6377 1.32715C2.98732 1.14901 3.36958 1.07272 3.81738 1.03613C4.25934 1.00003 4.80822 1 5.5 1H8.5ZM5.5 2C4.79168 2 4.29023 2.00022 3.89844 2.03223C3.51264 2.06377 3.27691 2.12345 3.0918 2.21777C2.71554 2.40951 2.40951 2.71554 2.21777 3.0918C2.12345 3.27691 2.06377 3.51264 2.03223 3.89844C2.00022 4.29023 2 4.79168 2 5.5V8.5C2 9.20832 2.00022 9.70977 2.03223 10.1016C2.06377 10.4874 2.12345 10.7231 2.21777 10.9082C2.40951 11.2845 2.71554 11.5905 3.0918 11.7822C3.27691 11.8765 3.51264 11.9362 3.89844 11.9678C4.29023 11.9998 4.79168 12 5.5 12H8.5C9.20832 12 9.70977 11.9998 10.1016 11.9678C10.4874 11.9362 10.7231 11.8765 10.9082 11.7822C11.2845 11.5905 11.5905 11.2845 11.7822 10.9082C11.8765 10.7231 11.9362 10.4874 11.9678 10.1016C11.9998 9.70977 12 9.20832 12 8.5V5.5C12 4.79168 11.9998 4.29023 11.9678 3.89844C11.9362 3.51264 11.8765 3.27691 11.7822 3.0918C11.5905 2.71554 11.2845 2.40951 10.9082 2.21777C10.7231 2.12345 10.4874 2.06377 10.1016 2.03223C9.70977 2.00022 9.20832 2 8.5 2H5.5ZM7.52539 3.8418C7.61271 3.57983 7.89623 3.43807 8.1582 3.52539C8.42017 3.61271 8.56193 3.89623 8.47461 4.1582L6.47461 10.1582C6.38729 10.4202 6.10377 10.5619 5.8418 10.4746C5.57983 10.3873 5.43807 10.1038 5.52539 9.8418L7.52539 3.8418Z" fill="black" fillOpacity="0.55" />
                    </svg>
                  </div>

                  {/* Send button — blue square with arrow-up */}
                  <div className="flex shrink-0 items-center justify-center overflow-clip bg-[#266DF0] text-white size-[14px] min-w-[14px] rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.1)] shadow-[0px_1px_2px_-1px_rgba(15,107,233,0.12),0px_1.5px_3px_-1px_rgba(15,107,233,0.08)] lg:size-[28px] lg:min-w-[28px] lg:rounded-[8px] lg:border lg:shadow-[0px_2px_4px_-2px_rgba(15,107,233,0.12),0px_3px_6px_-2px_rgba(15,107,233,0.08)]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M6.72461 2.08154C6.91862 1.9537 7.18277 1.97532 7.35352 2.146L10.8535 5.646C11.0487 5.84114 11.0484 6.15774 10.8535 6.35303C10.6583 6.54829 10.3417 6.54829 10.1465 6.35303L7.5 3.70654V11.4995C7.5 11.7756 7.27601 11.9994 7 11.9995C6.72386 11.9995 6.5 11.7757 6.5 11.4995V3.70654L3.85352 6.35303C3.65825 6.54829 3.34175 6.54829 3.14648 6.35303C2.95129 6.15776 2.95125 5.84123 3.14648 5.646L6.64648 2.146L6.72461 2.08154Z" fill="white" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Suggestion chips — exact Attio structure ────────────────────────────── */}
          <AnimatePresence>
            {isHome && (
              <motion.div key="chips" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="flex items-center justify-center gap-[5px] lg:gap-[10px] pt-2">

            {/* Prep for next meeting — calendar icon, blue palette */}
            <div className="flex shrink-0 items-center justify-center h-[14px] min-w-[14px] gap-[2px] rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.05)] pr-[3.5px] pl-[3px] lg:h-[28px] lg:min-w-[28px] lg:gap-[4px] lg:rounded-[8px] lg:border lg:pr-[7px] lg:pl-[6px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[8px] lg:size-[16px]" aria-hidden>
                <g clipPath="url(#chip-calendar)">
                  <rect x="0.5" y="0.5" width="15" height="15" rx="4.3" fill="#E5EEFF" />
                  <rect x="0.5" y="0.5" width="15" height="15" rx="4.3" stroke="#D6E5FF" />
                  <path d="M10 3.5C10.2761 3.5 10.5 3.72386 10.5 4V4.5C10.7969 4.51905 11.0068 4.60541 11.1855 4.69727C11.4664 4.84158 11.695 5.07101 11.8379 5.35254C12.0002 5.67254 12 6.09081 12 6.92676V9.62695C12 10.4703 12.0002 10.8923 11.8359 11.2139C11.6913 11.4967 11.4603 11.7268 11.1768 11.8701C11.0156 11.9516 10.8293 11.9914 10.5781 12.0107C10.3269 12.0301 10.0106 12.0294 9.58887 12.0273L6.38867 12.0117C5.55235 12.0077 5.13373 12.0058 4.81445 11.8418C4.5336 11.6975 4.30507 11.4681 4.16211 11.1865C3.9996 10.8664 4 10.4478 4 9.61133V6.91113C4 6.06777 3.99966 5.6458 4.16406 5.32422C4.30872 5.04132 4.53965 4.81127 4.82324 4.66797C5.0007 4.5783 5.20856 4.5169 5.5 4.5V4C5.5 3.72386 5.72386 3.5 6 3.5C6.27614 3.5 6.5 3.72386 6.5 4V4.5H9.5V4C9.5 3.72386 9.72386 3.5 10 3.5ZM6 6C5.72386 6 5.5 6.22386 5.5 6.5C5.5 6.77614 5.72386 7 6 7H10C10.2761 7 10.5 6.77614 10.5 6.5C10.5 6.22386 10.2761 6 10 6H6Z" fill="#215BC4" />
                </g>
                <defs>
                  <clipPath id="chip-calendar"><rect width="16" height="16" fill="white" /></clipPath>
                </defs>
              </svg>
              <div className="flex shrink-0 items-center justify-center px-[0.5px] lg:px-px">
                <span className="font-medium text-[rgba(0,0,0,0.55)] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">Prep for next meeting</span>
              </div>
            </div>

            {/* Recap last call — microphone icon, pink palette */}
            <div className="flex shrink-0 items-center justify-center h-[14px] min-w-[14px] gap-[2px] rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.05)] pr-[3.5px] pl-[3px] lg:h-[28px] lg:min-w-[28px] lg:gap-[4px] lg:rounded-[8px] lg:border lg:pr-[7px] lg:pl-[6px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[8px] lg:size-[16px]" aria-hidden>
                <g clipPath="url(#chip-microphone)">
                  <rect x="0.5" y="0.5" width="15" height="15" rx="4.3" fill="#FEECF3" />
                  <rect x="0.5" y="0.5" width="15" height="15" rx="4.3" stroke="#FDDDEA" />
                  <path d="M11.5 6.34473C11.8616 6.34486 12.1553 6.63833 12.1553 7V7.5C12.1553 9.45726 10.8015 11.0976 8.97949 11.5381C8.99186 11.5902 9 11.6443 9 11.7002V12.2998C9 12.6863 8.68629 12.9999 8.2998 13H7.7002C7.31362 13 7 12.6864 7 12.2998V11.7002C7 11.6443 7.00815 11.5902 7.02051 11.5381C5.19861 11.0976 3.84473 9.45718 3.84473 7.5V7C3.84473 6.63833 4.13837 6.34486 4.5 6.34473C4.86163 6.34486 5.15527 6.63833 5.15527 7V7.5C5.15527 9.07117 6.42886 10.3446 8 10.3447C9.57114 10.3446 10.8447 9.07117 10.8447 7.5V7C10.8447 6.63833 11.1384 6.34486 11.5 6.34473ZM8 3C9.10446 3 10 3.89554 10 5V7.5C10 8.60446 9.10446 9.5 8 9.5C6.89554 9.5 6 8.60446 6 7.5V5C6 3.89554 6.89554 3 8 3Z" fill="#C0246B" />
                </g>
                <defs>
                  <clipPath id="chip-microphone"><rect width="16" height="16" fill="white" /></clipPath>
                </defs>
              </svg>
              <div className="flex shrink-0 items-center justify-center px-[0.5px] lg:px-px">
                <span className="font-medium text-[rgba(0,0,0,0.55)] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">Recap last call</span>
              </div>
            </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Meetings section ────────────────────────────────────────────────────── */}
          <AnimatePresence>
            {isHome && (
              <motion.div key="meetings" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, delay: 0.05 }} className="flex w-full flex-col mt-[8px] lg:mt-[16px]">

            {/* Header: "Meetings" label + date + prev/next chevrons */}
            <div className="flex items-center justify-between mb-[6px] lg:mb-[12px]">
              <span className="font-medium text-[rgba(0,0,0,0.55)] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px] ml-1 lg:ml-2">Meetings</span>
              <div className="flex items-center gap-[2px] lg:gap-[4px]">
                <span className="font-medium text-[rgba(0,0,0,0.55)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">Today, Mar 13</span>
                <div className="flex items-center">
                  <div className="flex shrink-0 items-center justify-center h-[10px] min-w-[10px] rounded-[3px] px-[2px] lg:h-[20px] lg:min-w-[20px] lg:rounded-[6px] lg:px-[4px]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M8.14648 3.14673C8.34175 2.95147 8.65825 2.95147 8.85352 3.14673C9.04863 3.342 9.04873 3.65855 8.85352 3.85376L5.70703 7.00024L8.85352 10.1467C9.04863 10.342 9.04873 10.6585 8.85352 10.8538C8.6583 11.049 8.34176 11.0489 8.14648 10.8538L4.64648 7.35376C4.45122 7.1585 4.45122 6.84199 4.64648 6.64673L8.14648 3.14673Z" fill="black" fillOpacity="0.55" />
                    </svg>
                  </div>
                  <div className="flex shrink-0 items-center justify-center h-[10px] min-w-[10px] rounded-[3px] px-[2px] lg:h-[20px] lg:min-w-[20px] lg:rounded-[6px] lg:px-[4px]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[7px] lg:size-[14px]" aria-hidden>
                      <path d="M5.14648 3.14673C5.34175 2.95147 5.65825 2.95147 5.85352 3.14673L9.35352 6.64673C9.54863 6.842 9.54873 7.15855 9.35352 7.35376L5.85352 10.8538C5.6583 11.049 5.34176 11.0489 5.14648 10.8538C4.95122 10.6585 4.95122 10.342 5.14648 10.1467L8.29297 7.00024L5.14648 3.85376C4.95122 3.6585 4.95122 3.34199 5.14648 3.14673Z" fill="black" fillOpacity="0.55" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting list */}
            <div className="flex flex-col">

              {/* Past: Basepoint x Stripe — orange dot, line-through */}
              <div className="rounded-[5px] p-[1px] lg:rounded-[10px] lg:p-[2px]">
                <div className="flex items-center justify-between gap-[6px] rounded-[5px] py-[3px] pr-[5px] pl-[3px] lg:gap-[12px] lg:rounded-[10px] lg:py-[6px] lg:pr-[10px] lg:pl-[6px]">
                  <div className="flex items-center gap-[2px] lg:gap-[4px]">
                    <div className="flex shrink-0 items-center justify-center size-[10px] min-w-[10px] rounded-[3px] lg:size-[20px] lg:min-w-[20px] lg:rounded-[6px]">
                      <div className="rounded-full size-[4px] lg:size-[8px]" style={{ backgroundColor: '#F5A300' }} />
                    </div>
                    <span className="font-medium text-[#242629] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px] line-through opacity-30">Basepoint x Stripe</span>
                  </div>
                  <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">10:00 - 11:00 AM</span>
                </div>
              </div>

              {/* Past: Ashley & Martin — gray dot, line-through */}
              <div className="rounded-[5px] p-[1px] lg:rounded-[10px] lg:p-[2px]">
                <div className="flex items-center justify-between gap-[6px] rounded-[5px] py-[3px] pr-[5px] pl-[3px] lg:gap-[12px] lg:rounded-[10px] lg:py-[6px] lg:pr-[10px] lg:pl-[6px]">
                  <div className="flex items-center gap-[2px] lg:gap-[4px]">
                    <div className="flex shrink-0 items-center justify-center size-[10px] min-w-[10px] rounded-[3px] lg:size-[20px] lg:min-w-[20px] lg:rounded-[6px]">
                      <div className="rounded-full size-[4px] lg:size-[8px]" style={{ backgroundColor: '#CDCED2' }} />
                    </div>
                    <span className="font-medium text-[#242629] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px] line-through opacity-30">Ashley &amp; Martin</span>
                  </div>
                  <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">10:20 - 10:40 AM</span>
                </div>
              </div>

              {/* Active: Greenleaf // Basepoint — white card with shadow + full details */}
              <div className="p-[1px] lg:p-[2px] rounded-[7px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.10)] lg:rounded-[14px]">

                {/* Title row */}
                <div className="flex items-center justify-between gap-[6px] rounded-[5px] py-[3px] pr-[5px] pl-[3px] lg:gap-[12px] lg:rounded-[10px] lg:py-[6px] lg:pr-[10px] lg:pl-[6px]">
                  <div className="flex items-center gap-[2px] lg:gap-[4px]">
                    <div className="flex shrink-0 items-center justify-center size-[10px] min-w-[10px] rounded-[3px] lg:size-[20px] lg:min-w-[20px] lg:rounded-[6px]">
                      <div className="rounded-full size-[4px] lg:size-[8px]" style={{ backgroundColor: '#00D17E' }} />
                    </div>
                    <span className="font-medium text-[#242629] text-[7px] leading-[10px] tracking-[-0.07px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">Greenleaf // Basepoint</span>
                  </div>
                  <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">2:30 - 3:00 PM</span>
                </div>

                {/* Details body */}
                <div className="px-[5px] pb-[3px] lg:px-[10px] lg:pb-[6px]">
                  <div className="flex flex-col gap-[4px] lg:gap-[8px]">
                    <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">Details</span>

                    {/* Description with notes icon */}
                    <div className="flex items-start gap-[4px] text-[#505155] lg:gap-[8px]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-[1px] size-[6px] lg:mt-[2px] lg:size-[12px]" aria-hidden>
                        <path d="M9 1.5C9.69178 1.5 10.2407 1.50003 10.6826 1.53613C11.1304 1.57272 11.5127 1.64901 11.8623 1.82715C12.4265 2.11472 12.8853 2.57347 13.1729 3.1377C13.351 3.48732 13.4273 3.86958 13.4639 4.31738C13.5 4.75934 13.5 5.30822 13.5 6V8C13.5 8.69178 13.5 9.24066 13.4639 9.68262C13.4273 10.1304 13.351 10.5127 13.1729 10.8623C12.8853 11.4265 12.4265 11.8853 11.8623 12.1729C11.5127 12.351 11.1304 12.4273 10.6826 12.4639C10.2407 12.5 9.69178 12.5 9 12.5H5C4.30822 12.5 3.75934 12.5 3.31738 12.4639C2.86958 12.4273 2.48732 12.351 2.1377 12.1729C1.57347 11.8853 1.11472 11.4265 0.827148 10.8623C0.649006 10.5127 0.57272 10.1304 0.536133 9.68262C0.500028 9.24066 0.5 8.69178 0.5 8V6C0.5 5.30822 0.500028 4.75934 0.536133 4.31738C0.57272 3.86958 0.649006 3.48732 0.827148 3.1377C1.11472 2.57347 1.57347 2.11472 2.1377 1.82715C2.48732 1.64901 2.86958 1.57272 3.31738 1.53613C3.75934 1.50003 4.30822 1.5 5 1.5H9ZM5 2.5C4.29168 2.5 3.79023 2.50022 3.39844 2.53223C3.01264 2.56377 2.77691 2.62345 2.5918 2.71777C2.21554 2.90951 1.90951 3.21554 1.71777 3.5918C1.62345 3.77691 1.56377 4.01264 1.53223 4.39844C1.50022 4.79023 1.5 5.29168 1.5 6V8C1.5 8.70832 1.50022 9.20977 1.53223 9.60156C1.56377 9.98736 1.62345 10.2231 1.71777 10.4082C1.90951 10.7845 2.21554 11.0905 2.5918 11.2822C2.77691 11.3765 3.01264 11.4362 3.39844 11.4678C3.79023 11.4998 4.29168 11.5 5 11.5H9C9.70832 11.5 10.2098 11.4998 10.6016 11.4678C10.9874 11.4362 10.7231 11.3765 11.4082 11.2822C11.7845 11.0905 12.0905 10.7845 12.2822 10.4082C12.3765 10.2231 12.4362 9.98736 12.4678 9.60156C12.4998 9.20977 12.5 8.70832 12.5 8V6C12.5 5.29168 12.4998 4.79023 12.4678 4.39844C12.4362 4.01264 12.3765 3.77691 12.2822 3.5918C12.0905 3.21554 11.7845 2.90951 11.4082 2.71777C11.2231 2.62345 10.9874 2.56377 10.6016 2.53223C10.2098 2.50022 9.70832 2.5 9 2.5H5ZM4.82031 3.5C5.10596 3.5 5.35068 3.49928 5.55078 3.51562C5.75655 3.53246 5.959 3.57 6.15332 3.66895C6.44497 3.81755 6.68245 4.05503 6.83105 4.34668C6.93 4.541 6.96754 4.74345 6.98438 4.94922C7.00072 5.14932 7 5.39404 7 5.67969V8.32031C7 8.60596 7.00072 8.85068 6.98438 9.05078C6.96754 9.25655 6.93 9.459 6.83105 9.65332C6.68245 9.94497 6.44497 10.1825 6.15332 10.3311C5.959 10.43 5.75655 10.4675 5.55078 10.4844C5.35068 10.5007 5.10596 10.5 4.82031 10.5H4.67969C4.39404 10.5 4.14932 10.5007 3.94922 10.4844C3.74345 10.4675 3.541 10.43 3.34668 10.3311C3.05503 10.1825 2.81755 9.94497 2.66895 9.65332C2.57 9.459 2.53246 9.25655 2.51562 9.05078C2.49928 8.85068 2.5 8.60596 2.5 8.32031V5.67969C2.5 5.39404 2.49928 5.14932 2.51562 4.94922C2.53246 4.74345 2.57 4.541 2.66895 4.34668C2.81755 4.05503 3.05503 3.81755 3.34668 3.66895C3.541 3.57 3.74345 3.53246 3.94922 3.51562C4.14932 3.49928 4.39404 3.5 4.67969 3.5H4.82031ZM4.67969 4.5C4.3777 4.5 4.18118 4.50046 4.03125 4.5127C3.88792 4.52441 3.83098 4.54428 3.80078 4.55957C3.69729 4.6123 3.6123 4.69729 3.55957 4.80078C3.54428 4.83098 3.52441 4.88792 3.5127 5.03125C3.50046 5.18118 3.5 5.3777 3.5 5.67969V8.32031C3.5 8.6223 3.50046 8.81882 3.5127 8.96875C3.52441 9.11208 3.54428 9.16901 3.55957 9.19922C3.6123 9.30271 3.69729 9.3877 3.80078 9.44043C3.83098 9.45572 3.88792 9.47559 4.03125 9.4873C4.18118 9.49954 4.3777 9.5 4.67969 9.5H4.82031C5.1223 9.5 5.31882 9.49954 5.46875 9.4873C5.61208 9.47559 5.66902 9.45572 5.69922 9.44043C5.80271 9.3877 5.8877 9.30271 5.94043 9.19922C5.95572 9.16901 5.97559 9.11208 5.9873 8.96875C5.99954 8.81882 6 8.6223 6 8.32031V5.67969C6 5.3777 5.99954 5.18118 5.9873 5.03125C5.97559 4.88792 5.95572 4.83098 5.94043 4.80078C5.8877 4.69729 5.80271 4.6123 5.69922 4.55957C5.66902 4.54428 5.61208 4.52441 5.46875 4.5127C5.31882 4.50046 5.1223 4.5 4.82031 4.5H4.67969ZM11 7.5C11.2761 7.5 11.5 7.72386 11.5 8C11.5 8.27614 11.2761 8.5 11 8.5H8.5C8.22386 8.5 8 8.27614 8 8C8 7.72386 8.22386 7.5 8.5 7.5H11ZM11 5.5C11.2761 5.5 11.5 5.72386 11.5 6C11.5 6.27614 11.2761 6.5 11 6.5H8.5C8.22386 6.5 8 6.27614 8 6C8 5.72386 8.22386 5.5 8.5 5.5H11Z" fill="currentColor" />
                      </svg>
                      <p className="font-medium text-[#505155] text-[6.5px] leading-[8px] lg:text-[13px] lg:leading-[16px]">Demo call with Greenleaf team to help them get the most out of their PRO trial.</p>
                    </div>

                    {/* Link with link icon */}
                    <div className="flex items-center gap-[4px] text-[#505155] lg:gap-[8px]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-[6px] lg:size-[12px]" aria-hidden>
                        <path d="M3.38306 5.9104C4.75706 4.53659 6.99219 4.61514 8.26978 6.04517L8.39087 6.18774L8.44556 6.27271C8.55146 6.47973 8.50139 6.73993 8.31274 6.89087C8.12421 7.0417 7.85964 7.03348 7.68091 6.88501L7.60962 6.81274L7.43579 6.61841C6.52607 5.70494 5.02475 5.68296 4.09009 6.61743L2.85376 7.85376C1.94445 8.76307 1.94445 10.2374 2.85376 11.1467C3.76308 12.0558 5.23749 12.056 6.14673 11.1467L7.14673 10.1467C7.34199 9.95147 7.6585 9.95147 7.85376 10.1467C8.04881 10.342 8.04895 10.6586 7.85376 10.8538L6.85376 11.8538C5.554 13.1535 3.44658 13.1534 2.14673 11.8538C0.846897 10.5539 0.846897 8.44656 2.14673 7.14673L3.38306 5.9104ZM7.14673 2.14673C8.44656 0.846898 10.5539 0.846897 11.8538 2.14673C13.1534 3.44658 13.1535 5.554 11.8538 6.85376L10.6174 8.09009C9.2435 9.46382 7.00834 9.38513 5.73071 7.95532L5.60962 7.81274L5.55493 7.72778C5.44885 7.52071 5.499 7.26062 5.68774 7.10962C5.87636 6.95875 6.14085 6.96683 6.31958 7.11548L6.39087 7.18774L6.5647 7.38208C7.47444 8.29534 8.97581 8.31745 9.9104 7.38306L11.1467 6.14673C12.056 5.23749 12.0558 3.76308 11.1467 2.85376C10.2374 1.94445 8.76307 1.94445 7.85376 2.85376L6.85376 3.85376C6.65857 4.04895 6.34201 4.04881 6.14673 3.85376C5.95147 3.6585 5.95147 3.34199 6.14673 3.14673L7.14673 2.14673Z" fill="currentColor" />
                      </svg>
                      <p className="font-medium text-[#505155] underline text-[6.5px] leading-[8px] lg:text-[13px] lg:leading-[16px]">https://meet.google.com/psn-zfzb-yaw</p>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mt-[8px] flex flex-col gap-[4px] lg:mt-[16px] lg:gap-[8px]">
                    <div className="flex items-center gap-[4px] lg:gap-[8px]">
                      <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">Participants</span>
                      <span className="font-medium text-[rgba(0,0,0,0.55)] rounded-[2.5px] border-[0.5px] border-black/5 bg-[#F8F9FA] px-[1.5px] text-[5.5px] leading-[8px] lg:rounded-[5px] lg:border lg:px-[3px] lg:text-[11px] lg:leading-[16px]">8</span>
                    </div>
                    {/* Dylan Parker */}
                    <div className="flex items-center gap-[4px] lg:gap-[8px]">
                      <Image
                        src="/avatars/ask/ask-tab-success/avatar-1.avif"
                        alt="Dylan Parker"
                        width={16}
                        height={16}
                        loading="lazy"
                        className="shrink-0 rounded-full size-[8px] lg:size-[16px]"
                      />
                      <span className="font-medium text-[#505155] text-[6.5px] leading-[8px] lg:text-[13px] lg:leading-[16px]">Dylan Parker</span>
                      <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">CEO of Basepoint</span>
                    </div>
                    {/* Annie Zhang */}
                    <div className="flex items-center gap-[4px] lg:gap-[8px]">
                      <Image
                        src="/avatars/ask/ask-tab-success/avatar-2.avif"
                        alt="Annie Zhang"
                        width={16}
                        height={16}
                        loading="lazy"
                        className="shrink-0 rounded-full size-[8px] lg:size-[16px]"
                      />
                      <span className="font-medium text-[#505155] text-[6.5px] leading-[8px] lg:text-[13px] lg:leading-[16px]">Annie Zhang</span>
                      <span className="font-medium text-[rgba(0,0,0,0.4)] text-[6px] leading-[8px] lg:text-[12px] lg:leading-[16px]">Product Manager at Greenleaf</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
