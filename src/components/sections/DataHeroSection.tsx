'use client'

/**
 * DataHeroSection
 *
 * Hero for /platform/data — pixel-faithful to attio.com.
 *
 * ER diagram: 118-column CSS grid (--row-height: 11.3px) with 5 entity cards
 * positioned exactly as attio does it, plus SVG connector paths between cards.
 *
 * Only the text labels (entity names, field labels, "more" count) change per
 * active tab. The grid structure, icons, badges, and connectors are invariant.
 */

import { useState, useId, useRef, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PageHero } from './PageHero'

const EASE_OUT = [0.2, 0, 0, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// Entity icon SVGs — 20×20 colored rounded-square, copied from attio.com
// ─────────────────────────────────────────────────────────────────────────────

function PersonEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <g fillRule="evenodd" clipRule="evenodd">
        <path fill="#266DF0" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005ZM13.2189 13.6803c.04.2094.0609.4254.0609.6463 0 .2269-.053.4416-.1473.6326-.2369.4795-.7346.8097-1.3102.8097H8.13914c-.78549-.0128-1.4183-.6536-1.4183-1.4421 0-1.8454 1.44417-3.3536 3.26401-3.456.15285.0087.30305.0271.45005.0545 1.4082.2632 2.5181 1.3615 2.784 2.755ZM9.16504 6.85956c0 .75418.32092 1.43419.83496 1.9136.5142-.47942.8352-1.1595.8352-1.91377 0-.75418-.3209-1.43419-.835-1.91359-.51416.47941-.83516 1.15949-.83516 1.91376Zm2.98196-.00017c0 .97563-.3595 1.86815-.9546 2.55492.2017.0485.4125.07421.6293.07421 1.4673 0 2.6567-1.17702 2.6567-2.62896 0-1.45193-1.1894-2.62895-2.6567-2.62895-.2167 0-.4274.02569-.6291.07415.595.68673.9544 1.57914.9544 2.55463Zm2.4445 7.46721c0-1.3637-.5796-2.5935-1.5083-3.4613h.3786c1.9117 0 3.4615 1.5498 3.4615 3.4615 0 .7966-.6458 1.4423-1.4423 1.4423h-1.3037c.2626-.419.4142-.9132.4142-1.4425Z" />
        <path fill="#fff" d="M8.17802 9.4885c1.46726 0 2.65668-1.17702 2.65668-2.62895 0-1.45194-1.18942-2.62896-2.65668-2.62896-1.46725 0-2.6567 1.17702-2.6567 2.62896 0 1.45193 1.18945 2.62895 2.6567 2.62895Zm3.64378 6.2806H4.53433c-.80495 0-1.45749-.6458-1.45749-1.4423 0-1.9118 1.5661-3.4615 3.49798-3.4615H9.7813c1.9319 0 3.498 1.5497 3.498 3.4615 0 .7965-.6526 1.4423-1.4575 1.4423Z" />
      </g>
    </svg>
  )
}

function SellerEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#FD9038" fillRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005ZM3.84584 8.24871v1.79469c0 .7262.47506 1.3668 1.1699 1.5778l4.36164 1.324c.52952.1608 1.06392-.2355 1.06392-.7888V6.13576c0-.55338-.5344-.94963-1.06392-.78888L5.01574 6.67095c-.69484.21094-1.1699.85161-1.1699 1.57776Zm11.54266-2.7631v7.32099c0 .8216-.7863 1.4147-1.5763 1.189l-1.0519-.3005c-.3963-.1132-.6695-.4754-.6695-.8875V5.48466c0-.41212.2732-.77432.6695-.88755l1.0518-.30056c.79-.22573 1.5764.36744 1.5764 1.18906ZM6.00703 13.3964c-.26017-.065-.51219.1317-.51219.3999v1.5331c0 .4554.36911.8245.82443.8245h1.64886c.45532 0 .82443-.3691.82443-.8245v-.9148c0-.1891-.12873-.354-.31224-.3999l-2.47329-.6183Z" clipRule="evenodd" />
    </svg>
  )
}

function BuyerEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#266DF0" fillRule="evenodd" d="M1.04497 2.73005C.5 3.79961.5 5.19974.5 8v4c0 2.8003 0 4.2004.54497 5.27.47936.9408 1.24427 1.7057 2.18508 2.185C4.29961 20 5.69974 20 8.5 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185.545-1.0696.545-2.4697.545-5.27V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.7004 0 15.3003 0 12.5 0h-4C5.69974 0 4.29961 0 3.23005.544967 2.28924 1.02433 1.52433 1.78924 1.04497 2.73005ZM17.4246 9.99988c0 3.82352-3.0996 6.92312-6.9231 6.92312-3.82353 0-6.9231-3.0996-6.9231-6.92312 0-3.82351 3.09957-6.92308 6.9231-6.92308 3.8235 0 6.9231 3.09957 6.9231 6.92308Zm-6.9229-5.38469c.4248 0 .7692.34439.7692.76923v.54947h1.4464c.4248 0 .7692.3444.7692.76924 0 .42483-.3444.76923-.7692.76923H9.46327c-.26683 0-.51563.10129-.6934.2706-.17651.16808-.26822.38781-.26822.60851 0 .22069.09171.44042.26822.6085.17777.16931.42657.2706.6934.2706h2.07703c.6513 0 1.283.24603 1.7544.69498.4727.45015.7457 1.06895.7457 1.72255 0 .6537-.273 1.2725-.7457 1.7226-.4714.449-1.1031.695-1.7544.695h-.2694v.5496c0 .4249-.3444.7693-.7692.7693-.4249 0-.76926-.3444-.76926-.7693v-.5496H8.23938c-.42484 0-.76923-.3444-.76923-.7692 0-.4249.34439-.7692.76923-.7692h3.30092c.2668 0 .5156-.1013.6934-.2706.1765-.1681.2682-.3879.2682-.6086s-.0917-.4404-.2682-.6085c-.1778-.1693-.4266-.2706-.6934-.2706H9.46327c-.65127 0-1.28297-.246-1.75438-.6949-.4727-.4502-.7457-1.069-.7457-1.72263 0-.65364.273-1.27244.7457-1.7226.47141-.44894 1.10311-.69498 1.75438-.69498h.26917v-.54947c0-.42484.34436-.76923.76926-.76923Z" clipRule="evenodd" />
    </svg>
  )
}

function CompanyEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#14AED6" fillRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005ZM4.61469 8.76949l.00002 2.46141c.00001 1.7233.00001 2.5849.33538 3.2431.295.579.7657 1.0497 1.34466 1.3447.43853.2234.96735.298 1.78114.3229V15c0-.6458 0-.9687.11817-1.2185.12174-.2574.32898-.4646.58638-.5864.24984-.1182.57274-.1182 1.21853-.1182.64583 0 .96873 0 1.21853.1182.2574.1218.4646.329.5864.5864.1181.2498.1181.5727.1181 1.2185v1.1416c.8142-.0249 1.3432-.0994 1.7819-.3229.5789-.295 1.0496-.7657 1.3446-1.3447.3354-.6582.3354-1.5198.3354-3.243V8.76942c0-1.72323 0-2.58484-.3354-3.24303-.295-.57896-.7657-1.04968-1.3446-1.34467-.6582-.33537-1.5198-.33537-3.2431-.33537l-.92304-.00001c-1.72324 0-2.58486 0-3.24306.33536-.57896.295-1.04967.76572-1.34467 1.34468-.33536.65819-.33535 1.51983-.33534 3.24309v.00002ZM6.23802 6.71812c0-.42483.3444-.76923.76923-.76923h4.06835c.4249 0 .7693.3444.7693.76923 0 .42484-.3444.76923-.7693.76923H7.00725c-.42483 0-.76923-.34439-.76923-.76923Zm2.68469 2.10326c-.42483 0-.76923.3444-.76923.76923 0 .42479.3444.76919.76923.76919h4.06839c.4248 0 .7692-.3444.7692-.76919 0-.42483-.3444-.76923-.7692-.76923H8.92271Z" clipRule="evenodd" />
    </svg>
  )
}

function TransactionEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#DBA600" fillRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005Zm10.886533.75794c.2066-.10051.4557-.03378.5843.15657l.7659 1.13311c.0794.11744.2084.1919.3498.20192l1.3642.09672c.2292.01625.4115.19857.4278.42774l.0967 1.36425c.01.1414.0844.27036.2019.34974l1.1331.76588c.1903.12866.2571.37772.1566.58431l-.5984 1.22983c-.062.12747-.062.27634 0 .40384l.5984 1.2298c.1005.2066.0337.4557-.1566.5843l-1.1331.7659c-.1175.0794-.1919.2084-.2019.3498l-.0967 1.3642c-.0163.2292-.1986.4115-.4278.4278l-1.3642.0967c-.1414.01-.2704.0844-.3498.2019l-.7659 1.1331c-.1286.1903-.3777.2571-.5843.1566l-1.2298-.5984c-.1275-.062-.27637-.062-.40385 0l-1.22982.5984c-.2066.1005-.45566.0337-.58431-.1566l-.76589-1.1331c-.07938-.1175-.20833-.1919-.34974-.2019l-1.36424-.0967c-.22917-.0163-.4115-.1986-.42774-.4278l-.09672-1.3642c-.01003-.1414-.08448-.2704-.20193-.3498l-1.13311-.7659c-.19034-.1286-.25708-.3777-.15656-.5843l.59836-1.2298c.06202-.1275.06202-.27637 0-.40384l-.59836-1.22983c-.10052-.20659-.03378-.45565.15656-.58431l1.13311-.76588c.11745-.07938.1919-.20834.20193-.34975l.09672-1.36424c.01624-.22917.19857-.41149.42774-.42774l1.36424-.09672c.14141-.01002.27036-.08448.34974-.20192l.76589-1.13311c.12865-.19035.37771-.25708.58431-.15657l1.22982.59836c.12748.06202.27635.06202.40385 0l1.2298-.59836Zm1.482 3.71491c.3554.23274.4548.70953.2221 1.06494l-1.8405 2.81046c-.2259.3449-.4234.6466-.6044.8747-.1862.2346-.4224.4816-.75672.6197-.45807.1892-.97318.1852-1.42824-.0112-.33212-.1433-.56444-.394-.74691-.6315-.17738-.2308-.37021-.5356-.59059-.884l-.01813-.0286-.30808-.487c-.22716-.359-.12027-.83414.23874-1.0613.359-.22715.83418-.12026 1.06133.23874l.30809.48696c.24389.3854.39925.6295.52859.7979.08751.1139.13267.151.14349.1592.06963.0279.14729.0285.21736.0017.01094-.008.05668-.0444.14595-.157.13197-.1663.29113-.4079.54103-.7895l1.8219-2.78211c.2328-.35541.7096-.45484 1.065-.22209Z" clipRule="evenodd" />
    </svg>
  )
}

function WorkspaceEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#D4BD07" fillRule="evenodd" clipRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005Z" />
      <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.2" fill="white" />
      <rect x="11" y="3.5" width="5.5" height="5.5" rx="1.2" fill="white" />
      <rect x="3.5" y="11" width="5.5" height="5.5" rx="1.2" fill="white" />
      <rect x="11" y="11" width="5.5" height="5.5" rx="1.2" fill="white" />
    </svg>
  )
}

function UserEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#0FC27B" fillRule="evenodd" clipRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005Z" />
      <circle cx="10" cy="7.5" r="2.5" fill="white" />
      <path d="M5 16.5c0-2.761 2.239-5 5-5s5 2.239 5 5H5Z" fill="white" />
    </svg>
  )
}

function DealEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#9162F9" fillRule="evenodd" clipRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005Z" />
      <circle cx="10" cy="10" r="5.5" fill="white" fillOpacity=".95" />
      <path stroke="#9162F9" strokeLinecap="round" strokeWidth="1.15" d="M10 5.5v.8M10 13.7v.8M7.9 12.7h2.6c.8 0 1.5-.72 1.5-1.6s-.7-1.6-1.5-1.6H9.5c-.8 0-1.5-.72-1.5-1.6s.7-1.6 1.5-1.6h2.6" />
    </svg>
  )
}

function PartnershipEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path fill="#0EB472" fillRule="evenodd" clipRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005Z" />
      <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 10.5c-.35-.47-.5-1.05-.5-1.5 0-1.66 1.34-3 3-3h2c1.66 0 3 1.34 3 3s-1.34 3-3 3H9M14 9.5c.35.47.5 1.05.5 1.5 0 1.66-1.34 3-3 3H9c-1.66 0-3-1.34-3-3s1.34-3 3-3h1.5" />
    </svg>
  )
}

function InvoicesEntityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill="#DBA600" fillRule="evenodd" clipRule="evenodd" d="M.544967 2.73005C0 3.79961 0 5.19974 0 8v4c0 2.8003 0 4.2004.544967 5.27.479363.9408 1.244273 1.7057 2.185083 2.185C3.79961 20 5.19974 20 8 20h4c2.8003 0 4.2004 0 5.27-.545.9408-.4793 1.7057-1.2442 2.185-2.185C20 16.2004 20 14.8003 20 12V8c0-2.80026 0-4.20039-.545-5.26995-.4793-.94081-1.2442-1.70572-2.185-2.185083C16.2004 0 14.8003 0 12 0H8C5.19974 0 3.79961 0 2.73005.544967 1.78924 1.02433 1.02433 1.78924.544967 2.73005Z" />
      <rect x="5.5" y="4" width="9" height="12" rx="1.5" fill="white" fillOpacity=".95" />
      <path stroke="#DBA600" strokeLinecap="round" strokeWidth="1.1" d="M7.5 7.5h5M7.5 9.5h5M7.5 11.5h3" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Field icon SVGs — 14×14 stroke-based, copied from attio.com
// ─────────────────────────────────────────────────────────────────────────────

function FiText() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <g stroke="#5C5E63" strokeWidth="1.1">
        <path d="M1.50006 5.5c0-1.40013 0-2.1002.27248-2.63498.23969-.4704.62214-.85285 1.09254-1.09254C3.39986 1.5 4.09993 1.5 5.50006 1.5h3c1.40013 0 2.10024 0 2.63494.27248.4704.23969.8529.62214 1.0926 1.09254.2725.53478.2725 1.23485.2725 2.63498v3c0 1.40013 0 2.1002-.2725 2.635-.2397.4704-.6222.8528-1.0926 1.0925-.5347.2725-1.23481.2725-2.63494.2725h-3c-1.40013 0-2.1002 0-2.63498-.2725-.4704-.2397-.85285-.6221-1.09254-1.0925-.27248-.5348-.27248-1.23487-.27248-2.635v-3Z" />
        <rect width="2.36923" height="2.36923" x="3.78454" y="3.78467" strokeLinecap="round" strokeLinejoin="round" rx=".676923" />
        <path strokeLinecap="round" d="M3.78454 8.18457h6.43076M3.78454 10.2153h3.72308" />
      </g>
    </svg>
  )
}

function FiEmail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeWidth="1.1" d="m3.10001 4.6001.50995.5349C5.16379 6.76484 5.9407 7.57976 6.92465 7.59068c.98395.01091 1.77875-.78657 3.36835-2.38153l.607-.60905" />
    </svg>
  )
}

function FiLocation() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path stroke="#5C5E63" strokeWidth="1.1" d="M12 6.14286C12 9.84032 8.92809 13 7 13S2 9.84032 2 6.14286C2 3.30254 4.23858 1 7 1s5 2.30254 5 5.14286Z" />
      <circle cx="7" cy="6" r="1.75" stroke="#5C5E63" strokeWidth="1.1" />
    </svg>
  )
}

function FiId() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path stroke="#5C5E63" strokeWidth="1.05" d="M1 6c0-1.40013 0-2.1002.27248-2.63498.23969-.4704.62214-.85285 1.09254-1.09254C2.8998 2 3.59987 2 5 2h4c1.4001 0 2.1002 0 2.635.27248.4704.23969.8528.62214 1.0925 1.09254C13 3.8998 13 4.59987 13 6v2c0 1.40013 0 2.1002-.2725 2.635-.2397.4704-.6221.8528-1.0925 1.0925C11.1002 12 10.4001 12 9 12H5c-1.40013 0-2.1002 0-2.63498-.2725-.4704-.2397-.85285-.6221-1.09254-1.0925C1 10.1002 1 9.40013 1 8V6Z" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" d="M4.77141 7.8335h-.52707c-.65568 0-1.18721.53153-1.18721 1.18721 0 .26479.21466.47945.47945.47945h2.46967c.26479 0 .47945-.21466.47945-.47945 0-.65568-.53153-1.18721-1.18721-1.18721h-.52708Z" />
      <ellipse cx="4.77149" cy="5.5" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" rx="1.02857" ry="1" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" d="M8.54297 6H10.943M8.54297 8H10.943" />
    </svg>
  )
}

function FiPipeline() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
      <rect width="2.5" height="8" x="2" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="1" />
      <rect width="2.5" height="11" x="6.25" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="1" />
      <rect width="2.5" height="5" x="10.5" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="1" />
    </svg>
  )
}

function FiCurrency() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.25" stroke="#505967" strokeLinecap="round" strokeWidth="1.2" />
      <path stroke="#505967" strokeLinecap="round" strokeWidth="1.2" d="M9.00015 4.70374v1.2275M8.99991 12.0688v1.2276M6.89403 12.0687h3.07256c.42731 0 .83711-.1617 1.13921-.4494.3022-.2878.4719-.678.4719-1.085 0-.4069-.1697-.7972-.4719-1.08495-.3021-.28775-.7119-.44941-1.13921-.44941H8.03326c-.42729 0-.83708-.16165-1.13923-.44941-.30214-.28775-.47188-.67802-.47188-1.08497 0-.40694.16974-.79722.47188-1.08497.30215-.28775.71194-.44941 1.13923-.44941h3.02884" />
    </svg>
  )
}

function FiTag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path stroke="#5C5E63" strokeWidth="1.1" d="m1.80591 5.25441 3.54861-3.54862c.29073-.29073.69455-.43896 1.10432-.40538l5.05236.41413c.3415.02799.6125.29901.6405.64047l.4141 5.05236c.0336.40977-.1146.81359-.4054 1.10432L8.61181 12.0603c-.97631.9763-2.55922.9763-3.53553 0L1.80591 8.78994c-.976309-.97631-.976311-2.55922 0-3.53553Z" />
      <circle cx="9.13965" cy="4.72527" r=".7875" fill="#5C5E63" transform="rotate(45 9.13965 4.72527)" />
    </svg>
  )
}

function FiCard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5" />
      <rect width="3.65" height="6" x="3" y="4" stroke="#5C5E63" strokeWidth="1.1" rx="1.05" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M8.6499 6h2.4M8.6499 8h2.4" />
    </svg>
  )
}

function FiDate() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5" />
      <rect width="2" height="2" x="3.5" y="7.6001" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" rx=".7" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M3.5 5.25h7M4.19971 1v1.75M9.80029 1v1.75" />
    </svg>
  )
}

function FiPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path stroke="#9FA1A7" strokeLinecap="round" strokeLinejoin="round" d="M6 3v6M9 6H3" />
    </svg>
  )
}

function FiGlobe() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="#5C5E63" strokeWidth="1.1" />
      <path stroke="#5C5E63" strokeWidth="1.1" d="M7 1.5C5.6 3.3 4.7 5 4.7 7s.9 3.7 2.3 5.5C8.4 10.7 9.3 9 9.3 7s-.9-3.7-2.3-5.5Z" />
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" d="M1.7 7h10.6M2.3 4.5h9.4M2.3 9.5h9.4" />
    </svg>
  )
}

function FiBuilding() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinejoin="round" d="M1.5 12V5l5.5-3.5L12.5 5v7H1.5Z" />
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" d="M5 12V9h4v3" />
      <rect x="3.5" y="6" width="2" height="1.5" rx=".35" stroke="#5C5E63" strokeWidth="1.1" />
      <rect x="8.5" y="6" width="2" height="1.5" rx=".35" stroke="#5C5E63" strokeWidth="1.1" />
    </svg>
  )
}

function FiSeat() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" d="M3 12V7.5M11 12V7.5" />
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinejoin="round" d="M2 7.5h10v-1c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v1Z" />
      <rect x="3.5" y="2" width="7" height="4" rx="1" stroke="#5C5E63" strokeWidth="1.1" />
    </svg>
  )
}

function FiPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" d="M2 3.5A1.5 1.5 0 0 1 3.5 2H5l1.5 3L5 6.5c.5 1 1.5 2.5 2.5 2.5L9 7.5l3 1.5v1.5A1.5 1.5 0 0 1 10.5 12C5.8 12 2 8.2 2 3.5Z" />
    </svg>
  )
}

function FiContact() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="5.5" cy="4.5" r="1.8" stroke="#5C5E63" strokeWidth="1.1" />
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" d="M2 12.5c0-1.93 1.57-3.5 3.5-3.5" />
      <path stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" d="M10.5 5.5 9 8.5h2L9.5 11.5" />
    </svg>
  )
}

function FiCalendar() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5"></rect><rect width="2" height="2" x="3.5" y="7.6001" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" rx=".7"></rect><path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M3.5 5.25h7M4.19971 1v1.75M9.80029 1v1.75"></path></svg>
  )
}

function FiWorld() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g stroke="#5C5E63" strokeLinejoin="round" strokeWidth="1.1"><circle cx="7" cy="7" r="5.75"></circle><path d="M7 1.25c-3.17564 3.17564-3.17564 8.32436 0 11.5M7 1.25c3.1756 3.17564 3.1756 8.32436 0 11.5M1.69238 7H12.3078"></path></g></svg>
  )
}

function FiDollar() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none"><path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="m2.50001 5.00171.00002 3.99673c.00001 1.40116.00001 2.10176.2725 2.63656.23968.4704.62213.8528 1.09254 1.0925C4.39984 13 5.09991 13 6.50005 13H8.5c1.40013 0 2.1002 0 2.635-.2725.4704-.2397.8528-.6221 1.0925-1.0925C12.5 11.1002 12.5 10.4001 12.5 9V4.33334c0-.77486 0-1.1623-.0852-1.48017-.2311-.86283-.9051-1.53676-1.7679-1.76789-.3179-.08515-.70533-.08514-1.48021-.08512h-2.6667c-1.40013 0-2.10019 0-2.63497.27249-.47041.23968-.85286.62214-1.09254 1.09254C2.5 2.89997 2.5 3.60054 2.50001 5.00167v.00004Z"></path><path stroke="#5C5E63" strokeLinecap="round" strokeWidth="1.1" d="M7.50012 2.68018v.98199M7.5 8.57227v.98199M5.81525 8.57304H8.2733c.34184 0 .66967-.12933.91139-.35953.24171-.23019.3775-.54241.3775-.86796s-.13579-.63777-.3775-.86797c-.24172-.23019-.56955-.35952-.91139-.35952H6.72663c-.34183 0-.66966-.12932-.91138-.35952-.24171-.2302-.37751-.54242-.37751-.86797s.1358-.63776.37751-.86796c.24172-.2302.56955-.35952.91138-.35952h2.42312"></path><path stroke="#5C5E63" strokeWidth="1.1" d="M2.50391 11.1997h9.99619"></path></svg>
  )
}

function FiStar() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g><path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M6.43326 1.38043c.18678-.537335.9467-.537334 1.13348 0l1.00075 2.87905c.0824.23704.30362.39776.55452.40288l3.04739.0621c.5688.01159.8036.73432.3503 1.078l-2.4289 1.84145c-.20001.15161-.2845.41167-.21183.65187l.88263 2.91742c.1647.5445-.4501.9912-.917.6662l-2.50189-1.7409c-.20599-.14336-.47943-.14336-.68542 0L4.1554 11.8794c-.46694.325-1.08173-.1217-.917-.6662l.88263-2.91742c.07267-.2402-.01182-.50026-.2118-.65187L1.48034 5.80246c-.45332-.34368-.21849-1.06641.35027-1.078l3.04738-.0621c.25091-.00512.47212-.16584.55452-.40288l1.00075-2.87905Z"></path></g></svg>
  )
}

function FiUser() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M6.36009 8.30005H4.59188c-1.65232 0-2.99178 1.33946-2.99178 2.99175v0c0 .6673.54094 1.2082 1.20822 1.2082h4.55177"></path><circle cx="6.20068" cy="3.75" r="2.25" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1"></circle><path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="m7.92995 9.91524 2.75555-2.94669c.1652-.17669.4614-.05977.4614.18214v2.1689c0 .14727.1194.26667.2667.26667h1.452c.2377 0 .3566.28749.1884.45544l-2.985 2.9793c-.16803.1678-.45502.0487-.45502-.1887v-2.2016c0-.1473-.11939-.2667-.26666-.2667H8.12473c-.2333 0-.35412-.2784-.19478-.44876Z"></path></svg>
  )
}

function FiBank() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1"><path d="M8.79688 5.5625h3.23432v5.0314H8.79688m0-5.0314H5.20312m3.59376 0v5.0314M5.20312 5.5625H1.96875v5.0314h3.23437m0-5.0314v5.0314m0 0h3.59376"></path><rect width="11.5" height="2.1563" x="1.25" y="10.5938" rx=".862509"></rect><path d="M1.25 4.67415c0-.10127 0-.15191.00613-.19854.02681-.20396.13972-.38665.31015-.50184.03897-.02633.08426-.04898.17483-.09427l4.23027-2.11518c.37716-.18858.56574-.28287.76354-.31999.17519-.03286.35497-.03286.53016 0 .1978.03712.38638.13141.76354.31999L12.2589 3.8795c.0906.04529.1359.06794.1748.09427.1705.11519.2834.29788.3102.50184.0061.04663.0061.09727.0061.19854v0c0 .15767 0 .23651-.0123.3022-.0547.29135-.2826.51927-.5739.57392-.0657.01232-.1446.01232-.3022.01232H2.13845c-.15768 0-.23652 0-.3022-.01232-.29136-.05465-.51928-.28257-.57393-.57392C1.25 4.91066 1.25 4.83182 1.25 4.67415v0Z"></path></g></svg>
  )
}

function FiGrid() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1"><path d="M7 12.5h1.5c1.40013 0 2.1002 0 2.635-.2725.4704-.2397.8528-.6222 1.0925-1.0926.2725-.5347.2725-1.23481.2725-2.63494V5.5c0-1.40013 0-2.1002-.2725-2.63498-.2397-.4704-.6221-.85285-1.0925-1.09254C10.6002 1.5 9.90013 1.5 8.5 1.5H7m0 11H5.5c-1.40013 0-2.1002 0-2.63498-.2725-.4704-.2397-.85285-.6222-1.09254-1.0926C1.5 10.6002 1.5 9.90009 1.5 8.49996V5.5c0-1.40013 0-2.1002.27248-2.63498.23969-.4704.62214-.85285 1.09254-1.09254C3.3998 1.5 4.09987 1.5 5.5 1.5H7m0 11v-11M7 5.625h5.5M1.5 8.375H7"></path></g></svg>
  )
}

function FiCoin() {
  return (
    <svg className="basis-[11px] lg:basis-[auto]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.25" stroke="#505967" strokeLinecap="round" strokeWidth="1.2"></circle><path stroke="#505967" strokeLinecap="round" strokeWidth="1.2" d="M9.00015 4.70374v1.2275M8.99991 12.0688v1.2276M6.89403 12.0687h3.07256c.42731 0 .83711-.1617 1.13921-.4494.3022-.2878.4719-.678.4719-1.085 0-.4069-.1697-.7972-.4719-1.08495-.3021-.28775-.7119-.44941-1.13921-.44941H8.03326c-.42729 0-.83708-.16165-1.13923-.44941-.30214-.28775-.47188-.67802-.47188-1.08497 0-.40694.16974-.79722.47188-1.08497.30215-.28775.71194-.44941 1.13923-.44941h3.02884"></path></svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slot configs — fixed structure, independent of active tab
// ─────────────────────────────────────────────────────────────────────────────

interface SlotConfig {
  entityIcon: React.ReactNode
  badge: 'Standard' | 'Custom'
  fieldIcons: React.ReactNode[]
  /** Tailwind grid placement classes (base < xl) */
  gridClass: string
  /** Tailwind grid overrides for xl */
  xlGridClass: string
}

const SLOTS: SlotConfig[] = [
  {
    // 0 — top-left (Person / Patient)
    entityIcon: <PersonEntityIcon />,
    badge: 'Standard',
    fieldIcons: [<FiText key={0} />, <FiEmail key={1} />, <FiLocation key={2} />],
    gridClass: 'col-[span_27/span_27] row-span-6',
    xlGridClass: 'xl:col-[span_22/span_22]',
  },
  {
    // 1 — top-right (Seller / Provider)
    entityIcon: <SellerEntityIcon />,
    badge: 'Custom',
    fieldIcons: [<FiId key={0} />, <FiPipeline key={1} />, <FiCurrency key={2} />],
    gridClass: 'col-[span_27/span_27] col-start-[92] row-span-6',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[97]',
  },
  {
    // 2 — bottom-left (Buyer / Payer)
    entityIcon: <BuyerEntityIcon />,
    badge: 'Custom',
    fieldIcons: [<FiId key={0} />, <FiTag key={1} />],
    gridClass: 'col-[span_27/span_27] col-start-[11] row-span-5 row-start-[8]',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[21]',
  },
  {
    // 3 — bottom-center (Company / Organization)
    entityIcon: <CompanyEntityIcon />,
    badge: 'Standard',
    fieldIcons: [<FiCard key={0} />, <FiTag key={1} />],
    gridClass: 'col-[span_27/span_27] col-start-[47] row-span-5 row-start-[8]',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[49]',
  },
  {
    // 4 — bottom-right (Transaction / Claim)
    entityIcon: <TransactionEntityIcon />,
    badge: 'Standard',
    fieldIcons: [<FiCard key={0} />, <FiDate key={1} />],
    gridClass: 'col-[span_27/span_27] col-start-[82] row-span-5 row-start-[8]',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[77]',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TAB_SLOT_GRID — per-tab grid position overrides for each of the 5 slots.
// null = keep the default from SLOTS. hidden:true = don't render that card.
//
// Bottom-row centering reference (base grid, 118 cols):
//   3-card group spans col 11→109. Center = col 60.
//   2 cards centered: A at col-start-[29], B at col-start-[65] (span 27, gap 9)
//   xl: A at xl:col-start-[35], B at xl:col-start-[63]  (span 22, gap 6)
// ─────────────────────────────────────────────────────────────────────────────

interface SlotGridOverride {
  gridClass: string
  xlGridClass: string
  hidden?: boolean
}

type FiveGridOverrides = [
  SlotGridOverride | null,
  SlotGridOverride | null,
  SlotGridOverride | null,
  SlotGridOverride | null,
  SlotGridOverride | null,
]

const TAB_SLOT_GRID: Partial<Record<string, FiveGridOverrides>> = {
  // plg: 2 top (unchanged) + 2 bottom centered + slot 4 hidden
  plg: [
    null,
    null,
    { gridClass: 'col-[span_27/span_27] col-start-[29] row-span-5 row-start-[8]', xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[35]' },
    { gridClass: 'col-[span_27/span_27] col-start-[65] row-span-5 row-start-[8]', xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[63]' },
    { gridClass: '', xlGridClass: '', hidden: true },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab-specific labels — only text changes between tabs
// ─────────────────────────────────────────────────────────────────────────────

interface SlotLabels {
  name: string
  fieldLabels: string[]
  moreCount: number
}

type FiveLabels = [SlotLabels, SlotLabels, SlotLabels, SlotLabels, SlotLabels]

const TAB_LABELS: Record<string, FiveLabels> = {
  marketplaces: [
    { name: 'Person', fieldLabels: ['Person name', 'Email address', 'Location'], moreCount: 16 },
    { name: 'Seller', fieldLabels: ['Seller ID', 'Stage', 'Estimated ARR'], moreCount: 11 },
    { name: 'Buyer', fieldLabels: ['Buyer ID', 'Buyer type'], moreCount: 10 },
    { name: 'Company', fieldLabels: ['Company name', 'Industry'], moreCount: 7 },
    { name: 'Transaction', fieldLabels: ['Transaction ID', 'Transaction date'], moreCount: 5 },
  ],
  plg: [
    { name: 'Company', fieldLabels: ['Person name', 'Email address', 'Last active'], moreCount: 14 },
    { name: 'Person', fieldLabels: ['Workspace ID', 'Plan', 'MRR'], moreCount: 9 },
    { name: 'Workspace', fieldLabels: ['Member ID', 'Role'], moreCount: 8 },
    { name: 'User', fieldLabels: ['Company name', 'Domain'], moreCount: 6 },
    { name: 'Event', fieldLabels: ['Event name', 'Timestamp'], moreCount: 4 },
  ],
  pls: [
    { name: 'Company', fieldLabels: ['Company name', 'Industry', 'Domain'], moreCount: 12 },
    { name: 'Workspace', fieldLabels: ['Billing email address', 'Subscription state', 'Seat count'], moreCount: 11 },
    { name: 'Deal', fieldLabels: ['Deal ID', 'Deal stage'], moreCount: 10 },
    { name: 'Person', fieldLabels: ['Person name', 'Email address'], moreCount: 13 },
    { name: 'User', fieldLabels: ['User ID', 'Email address'], moreCount: 15 },
  ],
  sales: [
    { name: 'Partnership', fieldLabels: ['Partnership name', 'Partnership type', 'Location'], moreCount: 12 },
    { name: 'Invoices', fieldLabels: ['Billing address', 'Phone number', 'Point of contact'], moreCount: 12 },
    { name: 'Company', fieldLabels: ['Company name', 'Industry'], moreCount: 10 },
    { name: 'Deal', fieldLabels: ['Deal ID', 'Deal type'], moreCount: 8 },
    { name: 'Person', fieldLabels: ['Person name', 'Email address'], moreCount: 12 },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Connector building blocks — named constants for every connector shape.
// Each is a single absolutely-positioned grid item. Combine them freely in
// TAB_CONNECTORS below to create per-tab layouts.
// ─────────────────────────────────────────────────────────────────────────────

/** Person → Buyer: left curved arc (xl viewport only) */
const C_LeftArcXl = (
  <div key="left-arc-xl" className="absolute top-[var(--row-height)] bottom-0 left-0 col-start-[12] col-end-[21] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H107" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 14 17)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Person → Buyer: left elbow (non-xl viewports) */
const C_LeftElbow = (
  <div key="left-elbow" className="absolute top-[var(--row-height)] col-start-[14] col-end-[25] row-start-[6] row-end-[8] block h-[calc(100%+var(--row-height))] w-full xl:hidden">
    <svg className="w-[calc(100%+2px)] -translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 84 49">
      <path d="M1 0L1 4.5C1 15.5457 9.95431 24.5 21 24.5L63 24.5C74.0457 24.5 83 33.4543 83 44.5L83 49" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Center forked connector — top entity splits down to 3 bottom entities */
const C_CenterFork = (
  <div key="center-fork" className="absolute top-[calc(var(--row-height)-3px)] col-start-[60] col-end-[88] row-span-2 row-start-[6] h-[calc(100%+var(--row-height))] w-full">
    <svg className="translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 331 50">
      <path d="M330 49L330 31C330 14.4315 316.569 1 300 0.999999L31 0.999987C14.4315 0.999986 1.00003 14.4314 1.00003 31L1.00003 50" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[2px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    {/* Three-branch endpoint */}
    <svg className="absolute right-0 bottom-0" style={{ transform: 'translate(19px, 3px)' }} width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37 13V13C37 9.27247 37 7.4087 36.391 5.93853C35.5791 3.97831 34.0217 2.42092 32.0615 1.60896C30.5913 1 28.7275 1 25 1L15 1C11.2725 1 9.4087 1 7.93853 1.60896C5.97831 2.42092 4.42091 3.97831 3.60896 5.93853C3 7.4087 3 9.27247 3 13V13" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 22 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 39 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 5 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Seller → Transaction: right curved arc (xl viewport only) */
const C_RightArcXl = (
  <div key="right-arc-xl" className="absolute top-[var(--row-height)] bottom-0 left-0 col-start-[99] col-end-[108] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M106 0V52C106 74.4021 106 85.6031 101.64 94.1596C97.8053 101.686 91.6861 107.805 84.1596 111.64C75.6032 116 64.4021 116 42 116H-5.94008e-07" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    {/* Three-branch start */}
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 39)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 5)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Seller → Transaction: right elbow (non-xl viewports) */
const C_RightElbow = (
  <div key="right-elbow" className="absolute top-[var(--row-height)] col-start-[95] col-end-[106] row-start-[6] row-end-[8] block h-[calc(100%+var(--row-height))] w-full xl:hidden">
    <svg className="w-[calc(100%+2px)] -translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 84 49">
      <path d="M83 0L83 4.5C83 15.5457 74.0457 24.5 63 24.5L21 24.5C9.9543 24.5 0.999996 33.4543 0.999996 44.5L0.999996 49" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-px" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37 13V13C37 9.27247 37 7.4087 36.391 5.93853C35.5791 3.97831 34.0217 2.42092 32.0615 1.60896C30.5913 1 28.7275 1 25 1L15 1C11.2725 1 9.4087 1 7.93853 1.60896C5.97831 2.42092 4.42091 3.97831 3.60896 5.93853C3 7.4087 3 9.27247 3 13V13" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 22 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 39 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 5 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 17 1)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Person → Seller: big arc spanning the full top row */
const C_TopArc = (
  <div key="top-arc" className="absolute top-[calc(var(--row-height)/2)] col-start-[32] col-end-[92] row-span-4 row-start-[4] h-[calc(100%+var(--row-height)*1.2)] w-full xl:col-end-[97]">
    <svg className="-translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 766 115">
      <path d="M0.999995 115L0.999996 96C0.999997 79.4315 14.4315 66 31 66L630 66C646.569 66 660 52.5686 660 36L660 31C660 14.4315 673.431 1 690 1L766 1" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Vertical drop below the grid — decorative tail */
const C_BottomLine = (
  <div key="deal-to-image-s" className="absolute top-0 left-0 col-start-[60] row-start-[13]">
    <svg className="-translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="2" height="80" viewBox="0 0 2 80">
      <path d="M1 0v80" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path></svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(0 1 1 0 17 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToPerson_PLG = (
  <div key="company-to-person-plg" className="absolute top-[calc(2*var(--row-height))] col-start-[23] col-end-[97] row-span-3 row-start-3 h-[calc(100%-(var(--row-height)/2))] w-full xl:top-[calc(var(--row-height)/2)] xl:col-start-23 xl:col-end-97 xl:row-start-4">
    <svg className="-translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 871 67">
      <path d="M0 1L76 1C92.5685 1 106 14.4315 106 31L106 36C106 52.5686 119.431 66 136 66L735 66C751.569 66 765 52.5686 765 36L765 31C765 14.4315 778.431 1 795 1L871 1" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 -translate-x-[3px] -translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle><circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToDeal_PLS = (
  <div key="company-to-deal-pls" className="absolute top-(--row-height) bottom-0 left-0 col-start-[12] col-end-[21] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H107" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path></g>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle><circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToPerson_PLS = (
  <div key="deal-to-person-pls" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[43] col-end-[49] row-start-10 row-end-11 xl:col-start-43 xl:col-end-49">
    <svg className="translate-y-[0.5px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 39)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 5)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg><svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_PersonToUser_PLS = (
  <div key="person-to-user-pls" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[71] col-end-[77] row-start-10 row-end-11 xl:col-start-71 xl:col-end-77">
    <svg className="translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="20" r="2" transform="rotate(-180 13 20)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_UserToWorkspace_PLS = (
  <div key="user-to-workspace-pls" className="absolute top-(--row-height) bottom-0 left-0 col-start-[99] col-end-[108] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M106 0V52C106 74.4021 106 85.6031 101.64 94.1596C97.8053 101.686 91.6861 107.805 84.1596 111.64C75.6032 116 64.4021 116 42 116H-5.94008e-07" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 21)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3V3C3 6.72753 3 8.5913 3.60896 10.0615C4.42092 12.0217 5.97831 13.5791 7.93853 14.391C9.4087 15 11.2725 15 15 15L25 15C28.7275 15 30.5913 15 32.0615 14.391C34.0217 13.5791 35.5791 12.0217 36.391 10.0615C37 8.5913 37 6.72753 37 3V3" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 18 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 1 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 35 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToImage_PLS = (
  <div key="deal-to-image-pls" className="absolute col-start-[-95] col-end-[-60] row-start-[13] h-[calc(100%+7*var(--row-height))] w-full xl:col-start-[-88] xl:col-end-[-60]">
    <svg className="h-[calc(100%+3px)] -translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 331 81">
      <path d="M1 0L1 10.5C0.999999 27.0685 14.4315 40.5 31 40.5L300 40.5C316.569 40.5 330 53.9315 330 70.5L330 81" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path>
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_PartnershipToCompany_S = (
  <div key="partnership-to-company-s" className="absolute top-[var(--row-height)] bottom-0 left-0 col-start-[12] col-end-[21] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H107" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px">
      </path>
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M3 3C3 6.72753 3 8.5913 3.60896 10.0615C4.42092 12.0217 5.97831 13.5791 7.93853 14.391C9.4087 15 11.2725 15 15 15H25C28.7275 15 30.5913 15 32.0615 14.391C34.0217 13.5791 35.5791 12.0217 36.391 10.0615C37 8.5913 37 6.72753 37 3" stroke="#E4E7EC"></path><path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path>
        <path d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path>
        <path d="M39 3C39 4.10457 38.1046 5 37 5C35.8954 5 35 4.10457 35 3C35 1.89543 35.8954 1 37 1C38.1046 1 39 1.89543 39 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path></g>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToNull_S = (
  <div key="company-to-null-s" className="absolute top-[calc(var(--row-height)/2)] left-0 col-start-[28] col-end-[44] row-start-[4] row-end-[7] h-[calc(100%-var(--row-height)/2)] w-full xl:col-start-[23] xl:col-end-[39]">
    <svg className="h-[calc(100%+3px)] translate-x-0.5 -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 191 68">
      <path d="M0 1L76 1C92.5685 1 106 14.4315 106 31L106 37C106 53.5685 119.431 67 136 67L191 67" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="@-translate-x-[3px] absolute top-0 left-0 -translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC"></path>
      <circle cx="3" cy="3" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="3" cy="20" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle><circle cx="3" cy="37" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToPerson_S = (
  <div key="company-to-person-s" className="absolute top-[var(--row-height)] left-0 col-start-[32] col-end-[-32] row-start-[6] row-end-[8] w-full">
    <svg className="w-[calc(100%+2px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 661 50">
      <path d="M660 50L660 49C660 32.1984 660 23.7976 656.73 17.3803C653.854 11.7354 649.265 7.14598 643.62 4.26978C637.202 0.999972 628.802 0.999973 612 0.999973L49 0.999998C32.1984 0.999999 23.7976 0.999999 17.3803 4.2698C11.7354 7.14601 7.14601 11.7354 4.26981 17.3803C1 23.7976 1 32.1984 1 49L1 50" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2 translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37 13V13C37 9.27247 37 7.4087 36.391 5.93853C35.5791 3.97831 34.0217 2.42092 32.0615 1.60896C30.5913 1 28.7275 1 25 1L15 1C11.2725 1 9.4087 1 7.93853 1.60896C5.97831 2.42092 4.42091 3.97831 3.60896 5.93853C3 7.4087 3 9.27247 3 13V13" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 22 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 39 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 5 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_NullToInvoices_S = (
  <div key="null-to-invoices-s" className="absolute col-start-[55] col-end-[92] row-span-[4] row-start-[4] w-full xl:col-end-[97]">
    <svg className="-translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="75" viewBox="0 0 429 75">
      <path d="M0.5 75L0.500001 57.7013L0.500002 36.7987L0.500002 31C0.500003 14.4315 13.9315 1.00001 30.5 1.00002L429 1.00002" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_PersonToInvoices_S = (
  <div key="person-to-invoices_S" className="absolute top-(--row-height) bottom-0 left-0 col-start-[99] col-end-[108] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M106 0V52C106 74.4021 106 85.6031 101.64 94.1596C97.8053 101.686 91.6861 107.805 84.1596 111.64C75.6032 116 64.4021 116 42 116H-5.94008e-07" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path></g>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToPerson_S = (
  <div key="deal-to-person-s" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[71] col-end-[77] row-start-[10] row-end-[11] xl:col-start-[71] xl:col-end-[77]">
    <svg className="translate-y-[0.5px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 39)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 5)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg><svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToDeal_S = (
  <div key="company-to-deal-s" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[38] col-end-[47] row-start-[10] row-end-[11] xl:col-start-[43] xl:col-end-[49]">
    <svg className="translate-y-[0.5px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToImage_S = (
  <div key="deal-to-image-s" className="absolute top-0 left-0 col-start-[60] row-start-[13]">
    <svg className="-translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="2" height="80" viewBox="0 0 2 80">
      <path d="M1 0v80" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path></svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(0 1 1 0 17 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToWorkspace_plg = (
  <div key="company-to-workspace-plg" className="absolute top-[var(--row-height)] col-start-[10] col-end-[29] row-span-5 row-start-[6] h-[calc(100%-var(--row-height)*1.5)] w-full xl:col-start-[12] xl:col-end-[35]">
    <svg className="-translate-x-px translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 272 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H272" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 37V37C9.27247 37 7.4087 37 5.93853 36.391C3.97831 35.5791 2.42092 34.0217 1.60896 32.0615C1 30.5913 1 28.7275 1 25L1 15C1 11.2725 1 9.4087 1.60896 7.93853C2.42092 5.97831 3.97831 4.42092 5.93853 3.60896C7.4087 3 9.27247 3 13 3V3" stroke="#E4E7EC" />
      <circle cx="13" cy="20" r="2" transform="rotate(-180 13 20)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="37" r="2" transform="rotate(-180 13 37)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="3" r="2" transform="rotate(-180 13 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_WorkspaceToUser_plg = (
  <div key="workspace-to-user-plg" className="absolute top-[calc(var(--row-height)/2)] col-start-[56] col-end-[64] row-span-1 row-start-[10] xl:col-start-[57] xl:col-end-[63]">
    <svg className="translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M70 1L1.19209e-06 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 37V37C9.27247 37 7.4087 37 5.93853 36.391C3.97831 35.5791 2.42092 34.0217 1.60896 32.0615C1 30.5913 1 28.7275 1 25L1 15C1 11.2725 1 9.4087 1.60896 7.93853C2.42092 5.97831 3.97831 4.42092 5.93853 3.60896C7.4087 3 9.27247 3 13 3V3" stroke="#E4E7EC" />
      <circle cx="13" cy="20" r="2" transform="rotate(-180 13 20)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="37" r="2" transform="rotate(-180 13 37)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="3" r="2" transform="rotate(-180 13 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_PersonToUser_plg = (
  <div key="person-to-user-plg" className="absolute top-[var(--row-height)] col-start-[91] col-end-[110] row-span-5 row-start-[6] h-[calc(100%-var(--row-height)*1.5)] w-full xl:col-start-[85] xl:col-end-[108]">
    <svg className="translate-x-px translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 272 117">
      <path d="M271 0V52C271 74.4021 271 85.6031 266.64 94.1596C262.805 101.686 256.686 107.805 249.16 111.64C240.603 116 229.402 116 207 116H5.4551e-06" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="20" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_UserToImage_plg = (
  <div key="user-to-image-plg" className="absolute col-start-[-60] col-end-[-42] row-start-[13] h-[calc(100%+7*var(--row-height))] w-full xl:col-end-[-46]">
    <svg className="h-[calc(100%+3px)] translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 167 81">
      <path d="M166 0L166 10.5C166 27.0685 152.569 40.5 136 40.5L31 40.5C14.4315 40.5 0.999994 53.9315 0.999993 70.5L0.999993 81" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// TAB_CONNECTORS — pick which connectors (and in what order) appear per tab.
// Add new C_* blocks above and reference them here to customise each tab.
// ─────────────────────────────────────────────────────────────────────────────

const TAB_CONNECTORS: Record<string, React.ReactNode[]> = {
  marketplaces: [C_LeftArcXl, C_LeftElbow, C_CenterFork, C_RightArcXl, C_RightElbow, C_TopArc, C_BottomLine],
  plg: [C_CompanyToWorkspace_plg, C_WorkspaceToUser_plg, C_CompanyToPerson_PLG, C_PersonToUser_plg, C_UserToImage_plg],
  pls: [C_CompanyToDeal_PLS, C_DealToPerson_PLS, C_PersonToUser_PLS, C_UserToWorkspace_PLS, C_CompanyToPerson_PLG, C_DealToImage_PLS],
  sales: [C_PartnershipToCompany_S, C_CompanyToNull_S, C_CompanyToPerson_S, C_NullToInvoices_S, C_PersonToInvoices_S, C_DealToPerson_S, C_CompanyToDeal_S, C_DealToImage_S],
}


// ─────────────────────────────────────────────────────────────────────────────
// Connector building blocks — named constants for every connector shape.
// Each is a single absolutely-positioned grid item. Combine them freely in
// TAB_CONNECTORS below to create per-tab layouts.
// ─────────────────────────────────────────────────────────────────────────────

const MC_PersonToBuyer_M = (
  <div key="mc-person-to-buyer-m" className="absolute -top-[calc(var(--row-height)/4)] col-start-[10] col-end-[21] row-start-[5] row-end-[6] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+2px)] -translate-x-px -translate-y-[2px] md:w-[calc(100%+3.5px)] md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 97 42" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M96 0L96 7C96 14.732 89.732 21 82 21L15 21C7.26801 21 0.999997 27.268 0.999997 35L0.999997 42" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_SellerToTransaction_M = (
  <div key="mc-seller-to-transaction-m" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-1 row-start-[10] w-full">
    <svg className="-translate-x-px" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 42L1 1.3113e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.421 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_BuyerToSeller_M = (
  <div key="mc-buyer-to-seller" className="absolute -top-[calc(var(--row-height)/5)] col-start-[19] col-end-[23] row-start-[8] row-end-[9] w-full">
    <svg className="absolute" width="100%" height="2" viewBox="0 0 33 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0.562012L33 0.562015" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.57901" cy="15.5619" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToTransaction_M = (
  <div key="mc-company-to-transaction" className="absolute -top-[calc(var(--row-height)/5)] col-start-[19] col-end-[23] row-start-[13] row-end-[14] w-full">
    <svg className="absolute" width="100%" height="2" viewBox="0 0 33 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0.562012L33 0.562015" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.57901" cy="15.5619" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToPerson_PLG = (
  <div key="mc-company-to-person-plg" className="absolute col-start-[19] col-end-[32] row-span-1 row-start-2 h-[calc(100%+var(--row-height)/3)] w-full">
    <svg className="translate-x-px -translate-y-px md:translate-x-[2px]" height="100%" width="100%" viewBox="0 0 112 34" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M111 34L111 21.0001C111 9.95434 102.046 0.999998 90.9999 0.999998L7.21619e-06 1" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-[3px] -translate-y-1/2" width="13" height="32" viewBox="0 0 13 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.57895 2.5791V2.5791C5.52174 2.5791 6.99313 2.5791 8.15379 3.05986C9.70134 3.70088 10.9309 4.9304 11.5719 6.47794C12.0526 7.6386 12.0526 9.11 12.0526 12.0528L12.0526 19.9475C12.0526 22.8903 12.0526 24.3617 11.5719 25.5224C10.9309 27.0699 9.70134 28.2994 8.15379 28.9404C6.99313 29.4212 5.52174 29.4212 2.57895 29.4212V29.4212" stroke="#E4E7EC" />
      <circle cx="2.57889" cy="15.9998" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57889" cy="2.57895" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57889" cy="29.4212" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 16.579 11.5264)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PersonToUser_PLG = (
  <div key="mc-person-to-user-plg" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-8 row-span-6 row-start-5 w-full">
    <svg className="-translate-x-px translate-y-px" width="2" height="212" viewBox="0 0 2 212" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 210L1.00001 9.53674e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.4211 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[4px]" width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="10.9474" r="1.57895" transform="rotate(-90 16 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToWorkspace_PLG = (
  <div key="mc-company-to-workspace-plg" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-2 row-start-7 w-full">
    <svg className="-translate-x-px -translate-y-[2px]" width="2" height="76" viewBox="0 0 2 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 76L1 9.53674e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.421 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.57895 10.4209V10.4209C2.57895 7.47811 2.57895 6.00672 3.05971 4.84606C3.70072 3.29851 4.93024 2.06899 6.47779 1.42798C7.63845 0.947216 9.10984 0.947216 12.0526 0.947216L19.9474 0.947216C22.8902 0.947216 24.3615 0.947216 25.5222 1.42798C27.0698 2.06899 28.2993 3.29851 28.9403 4.84606C29.421 6.00672 29.421 7.47811 29.421 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="16" cy="10.4211" r="1.57895" transform="rotate(-90 16 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="10.4211" r="1.57895" transform="rotate(-90 2.57895 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.421" cy="10.4211" r="1.57895" transform="rotate(-90 29.421 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_WorkspaceToUser_PLG = (
  <div key="mc-workspace-to-user-plg" className="absolute -top-[calc(var(--row-height)/4)] col-start-[13] col-end-[23] row-span-1 row-start-[10] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="-translate-x-px -translate-y-px md:-translate-x-[2px]" height="100%" width="100%" viewBox="0 0 92 37" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1.00008 37L1.00004 21C1.00002 9.95433 9.95433 0.999995 21 0.999996L92 0.999999" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 11.0528 13.4209)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.57895 10.9473V10.9473C2.57895 8.00448 2.57895 6.53308 3.05971 5.37242C3.70072 3.82488 4.93024 2.59536 6.47779 1.95434C7.63845 1.47358 9.10984 1.47358 12.0526 1.47358L19.9474 1.47358C22.8902 1.47358 24.3615 1.47358 25.5222 1.95434C27.0698 2.59536 28.2993 3.82488 28.9403 5.37242C29.421 6.53308 29.4211 8.00448 29.4211 10.9473V10.9473" stroke="#E4E7EC" />
      <circle cx="16" cy="10.9474" r="1.57895" transform="rotate(-90 16 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="10.9474" r="1.57895" transform="rotate(-90 2.57895 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.421" cy="10.9474" r="1.57895" transform="rotate(-90 29.421 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToWorkspace_PLS = (
  <div key="mc-company-to-workspace-pls" className="absolute col-start-10 col-end-[23] row-span-1 row-start-2 h-[calc(100%+var(--row-height)/3)] w-full">
    <svg className="-translate-x-px -translate-y-px md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 112 34" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 34L1 15C1 7.26801 7.26802 0.999997 15 0.999997L112 1" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_UserToWorkspace_PLS = (
  <div key="mc-user-to-workspace-pls" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-1 row-start-5 w-full">
    <svg className="-translate-x-px" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 42L1 1.3113e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToDeal_PLS = (
  <div key="mc-company-to-deal-pls" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-10 row-span-2 row-start-7 w-full">
    <svg className="-translate-x-px" width="2" height="76" viewBox="0 0 2 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 76L1 9.53674e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_UserToPerson_PLS = (
  <div key="mc-user-to-person-pls" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-1 row-start-[10] w-full">
    <svg className="-translate-x-px" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 42L1 1.3113e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.421 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_DealToPerson_PLS = (
  <div key="mc-deal-to-person-pls" className="absolute -top-[calc(var(--row-height)/3)] col-start-10 col-end-[23] row-span-1 row-start-[13] h-[calc(100%+var(--row-height)/3)] w-full">
    <svg className="-translate-x-px translate-y-px md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 112 34" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 0L1 19C1 26.732 7.26802 33 15 33L112 33" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PartnershipToCompany_S = (
  <div key="mc-partnership-to-company-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-1 col-start-7 row-start-5 row-end-6 h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute -translate-x-px -translate-y-[2px]" width="2" height="43" viewBox="0 0 2 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 43L1 -7.15256e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_InvoiceToPerson_S = (
  <div key="mc-invoice-to-person-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-1 col-start-[35] row-start-5 row-end-6 h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute -translate-x-px -translate-y-[2px]" width="2" height="43" viewBox="0 0 2 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 43L1 -7.15256e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PartnershipToPerson_S = (
  <div key="mc-partnership-to-person-s" className="absolute -top-[calc(var(--row-height)/4)] col-start-[13] col-end-[29] row-start-5 row-end-6 h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+3px)] -translate-x-[2px] -translate-y-[2px] md:w-[calc(100%+3.5px)]" width="100%" height="100%" viewBox="0 0 138 43" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 0L1 7.5C1 15.232 7.26802 21.5 15 21.5L123 21.5C130.732 21.5 137 27.768 137 35.5L137 43" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToPerson_S = (
  <div key="mc-company-to-person-s" className="absolute -top-[calc(var(--row-height)/5)] col-start-[19] col-end-[23] row-start-[8] row-end-[9] w-full">
    <svg className="absolute" width="100%" height="2" viewBox="0 0 33 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0.562012L33 0.562015" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.57901" cy="15.5619" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToDeal_S = (
  <div key="mc-company-to-deal-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-8 col-start-[10] row-start-[10] row-end-[11] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+2px)] -translate-x-px -translate-y-[2px] md:w-[calc(100%+3.5px)] md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 70 43" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 0L1 7.5C1 15.232 7.26802 21.5 15 21.5L55 21.5C62.732 21.5 69 27.768 69 35.5L69 43" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PersonToDeal_S = (
  <div key="mc-person-to-deal-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-8 col-start-[24] row-start-[10] row-end-[11] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+2px)] -translate-x-px -translate-y-[2px] md:w-[calc(100%+3.5px)] md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 70 43" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M69 0L69 7.5C69 15.232 62.732 21.5 55 21.5L15 21.5C7.26801 21.5 0.999997 27.768 0.999997 35.5L0.999997 43" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute right-0 translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)


// ─────────────────────────────────────────────────────────────────────────────
// MOBILE_TAB_CONNECTORS — add MC_* connector blocks above and reference here.
// Grid: 40 cols × 14 rows, --row-height: 26px, gap-y-2.
// ─────────────────────────────────────────────────────────────────────────────

const MOBILE_TAB_CONNECTORS: Record<string, React.ReactNode[]> = {
  marketplaces: [MC_PersonToBuyer_M, MC_SellerToTransaction_M, MC_BuyerToSeller_M, MC_CompanyToTransaction_M],
  plg:          [MC_CompanyToPerson_PLG, MC_PersonToUser_PLG,MC_CompanyToWorkspace_PLG, MC_WorkspaceToUser_PLG],
  pls:          [MC_CompanyToWorkspace_PLS, MC_UserToWorkspace_PLS, MC_CompanyToDeal_PLS, MC_UserToPerson_PLS, MC_DealToPerson_PLS],
  sales:        [MC_PartnershipToCompany_S, MC_InvoiceToPerson_S, MC_PartnershipToPerson_S, MC_CompanyToPerson_S, MC_CompanyToDeal_S, MC_PersonToDeal_S],
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile ER grid — 40-column grid, one card set per tab (lg:hidden)
// Connectors are intentionally omitted — added separately by the team.
// ─────────────────────────────────────────────────────────────────────────────
1
interface MobileCardDef {
  entityIcon: React.ReactNode
  entityName: string
  badge: 'Standard' | 'Custom'
  /** Tailwind grid placement classes for the 40-col mobile grid */
  gridClass: string
  fieldIcons: React.ReactNode[]
  fieldLabels: string[]
  moreCount: number
}

const MOBILE_CARDS: Record<string, MobileCardDef[]> = {
  marketplaces: [
    {
      entityIcon: <PersonEntityIcon size={15} />,
      entityName: 'Person',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[12] row-span-4',
      fieldIcons: [<FiText key={0} />, <FiEmail key={1} />, <FiLocation key={2} />],
      fieldLabels: ['Person name', 'Email address', 'Location'],
      moreCount: 16,
    },
    {
      entityIcon: <BuyerEntityIcon size={15} />,
      entityName: 'Buyer',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] row-span-4 row-start-6',
      fieldIcons: [<FiId key={0} />, <FiTag key={1} />, <FiCalendar key={2} />],
      fieldLabels: ['Buyer ID', 'Buyer type', 'Last transaction date'],
      moreCount: 10,
    },
    {
      entityIcon: <SellerEntityIcon size={15} />,
      entityName: 'Seller',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-6',
      fieldIcons: [<FiId key={0} />, <FiPipeline key={1} />, <FiCurrency key={2} />],
      fieldLabels: ['Seller ID', 'Stage', 'Estimated ARR'],
      moreCount: 11,
    },
    {
      entityIcon: <CompanyEntityIcon size={15} />,
      entityName: 'Company',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] row-span-4 row-start-[11]',
      fieldIcons: [<FiCard key={0} />, <FiTag key={1} />, <FiWorld key={2} />],
      fieldLabels: ['Company name', 'Industry', 'Domain'],
      moreCount: 7,
    },
    {
      entityIcon: <TransactionEntityIcon size={15} />,
      entityName: 'Transaction',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-[11]',
      fieldIcons: [<FiId key={0} />, <FiDate key={1} />, <FiDollar key={2} />],
      fieldLabels: ['Transaction ID', 'Transaction date', 'Purchased plan'],
      moreCount: 5,
    },
  ],
  plg: [
    {
      entityIcon: <PersonEntityIcon size={15} />,
      entityName: 'Person',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] row-span-4',
      fieldIcons: [<FiId key={0} />, <FiEmail key={1} />, <FiEmail key={2} />],
      fieldLabels: ['Record name', 'Email address', 'Location'],
      moreCount: 14,
    },
    {
      entityIcon: <CompanyEntityIcon size={15} />,
      entityName: 'Company',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-3',
      fieldIcons: [<FiTag key={0} />, <FiStar key={1} />, <FiUser key={2} />],
      fieldLabels: ['Company name', 'Industry', 'Domain'],
      moreCount: 7,
    },
    {
      entityIcon: <WorkspaceEntityIcon size={15} />,
      entityName: 'Workspace',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-[9]',
      fieldIcons: [<FiBank key={0} />, <FiCalendar key={1} />, <FiBuilding key={2} />],
      fieldLabels: ['Billing email address', 'Subscription state', 'Seat count'],
      moreCount: 11,
    },
    {
      entityIcon: <UserEntityIcon size={15} />,
      entityName: 'User',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] row-span-4 row-start-[11]',
      fieldIcons: [<FiCard key={0} />, <FiGrid key={1} />, <FiCalendar key={2} />],
      fieldLabels: ['User ID', 'Workspace', 'Renewal date'],
      moreCount: 15,
    },
  ],
  pls: [
    {
      entityIcon: <WorkspaceEntityIcon size={15} />,
      entityName: 'Workspace',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4',
      fieldIcons: [<FiBank key={0} />, <FiCalendar key={1} />, <FiBuilding key={2} />],
      fieldLabels: ['Billing email address', 'Subscription state', 'Seat count'],
      moreCount: 11,
    },
    {
      entityIcon: <CompanyEntityIcon size={15} />,
      entityName: 'Company',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] row-span-4 row-start-3',
      fieldIcons: [<FiCard key={0} />, <FiTag key={1} />, <FiGlobe key={2} />],
      fieldLabels: ['Company name', 'Industry', 'Domain'],
      moreCount: 12,
    },
    {
      entityIcon: <UserEntityIcon size={15} />,
      entityName: 'User',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-6',
      fieldIcons: [<FiText key={0} />, <FiEmail key={1} />, <FiGlobe key={2} />],
      fieldLabels: ['Record name', 'Email address', 'Platform'],
      moreCount: 15,
    },
    {
      entityIcon: <DealEntityIcon size={15} />,
      entityName: 'Deal',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] row-span-4 row-start-[9]',
      fieldIcons: [<FiId key={0} />, <FiPipeline key={1} />, <FiDollar key={2} />],
      fieldLabels: ['Deal ID', 'Deal stage', 'Deal Value'],
      moreCount: 8,
    },
    {
      entityIcon: <PersonEntityIcon size={15} />,
      entityName: 'Person',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-[11]',
      fieldIcons: [<FiText key={0} />, <FiEmail key={1} />, <FiLocation key={2} />],
      fieldLabels: ['Record name', 'Email address', 'Location'],
      moreCount: 12,
    },
  ],
  sales: [
    {
      entityIcon: <PartnershipEntityIcon size={15} />,
      entityName: 'Partnership',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] row-span-4',
      fieldIcons: [<FiId key={0} />, <FiEmail key={1} />, <FiLocation key={2} />],
      fieldLabels: ['Record name', 'Email address', 'Location'],
      moreCount: 12,
    },
    {
      entityIcon: <InvoicesEntityIcon size={15} />,
      entityName: 'Invoices',
      badge: 'Custom',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4',
      fieldIcons: [<FiBuilding key={0} />, <FiPhone key={1} />, <FiContact key={2} />],
      fieldLabels: ['Billing address', 'Phone number', 'Point of contact'],
      moreCount: 12,
    },
    {
      entityIcon: <CompanyEntityIcon size={15} />,
      entityName: 'Company',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] row-span-4 row-start-6',
      fieldIcons: [<FiCard key={0} />, <FiTag key={1} />, <FiWorld key={2}/>],
      fieldLabels: ['Company name', 'Industry', 'Domain'],
      moreCount: 10,
    },
    {
      entityIcon: <PersonEntityIcon size={15} />,
      entityName: 'Person',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-6',
      fieldIcons: [<FiText key={0} />, <FiEmail key={1} />, <FiLocation key={2} />],
      fieldLabels: ['Record name', 'Email address', "Location"],
      moreCount: 12,
    },
    {
      entityIcon: <DealEntityIcon size={15} />,
      entityName: 'Deal',
      badge: 'Standard',
      gridClass: 'col-[span_18/span_18] col-start-[12] row-span-4 row-start-11',
      fieldIcons: [<FiId key={0} />, <FiTag key={1} />, <FiCoin key={2} />],
      fieldLabels: ['Record name', 'Deal type', 'Potential value'],
      moreCount: 16,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// GridConnectors — renders the active tab's connector set
// ─────────────────────────────────────────────────────────────────────────────

function GridConnectors({ connectors }: { connectors: React.ReactNode[] }) {
  return <>{connectors}</>
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab icons
// ─────────────────────────────────────────────────────────────────────────────

function IconMarketplaces() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="3.5" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14.5" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.3 6.2 5 12M10.7 6.2 13 12M5.5 13.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconPlg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 16c0-2.761 2.239-5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="10" y="7.5" width="6" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11.5 10.5h3M11.5 12.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconPls() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" d="M9.0002 4.70374v1.2275M8.99991 12.0688v1.2276M6.89403 12.0687h3.07256c.42731 0 .83711-.1617 1.13921-.4494.3022-.2878.4719-.678.4719-1.085 0-.4069-.1697-.7972-.4719-1.08495-.3021-.28775-.7119-.44941-1.13921-.44941H8.03326c-.42729 0-.83708-.16165-1.13923-.44941-.30214-.28775-.47188-.67802-.47188-1.08497 0-.40694.16974-.79722.47188-1.08497.30215-.28775.71194-.44941 1.13923-.44941h3.02884" />
    </svg>
  )
}

function IconSales() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2.5" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 6.5h5M4.5 9.5h5M4.5 12.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13.5 7l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab definitions
// ─────────────────────────────────────────────────────────────────────────────

interface TabDef {
  id: string
  label: string
  src: string
  Icon: () => React.ReactElement
}

const TABS: TabDef[] = [
  { id: 'marketplaces', label: 'Marketplaces', src: '/assets/images/platform/data/hero/marketplaces-screen.avif', Icon: IconMarketplaces },
  { id: 'plg', label: 'Product-led growth', src: '/assets/images/platform/data/hero/product-sales-screen.avif', Icon: IconPlg },
  { id: 'pls', label: 'Product-led sales', src: '/assets/images/platform/data/hero/product-sales-screen.avif', Icon: IconPls },
  { id: 'sales', label: 'Sales', src: '/assets/images/platform/data/hero/sales-screen.avif', Icon: IconSales },
]

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

/** Slide variants for the mobile ER grid swipe transition */
const mobileSlideVariants = {
  enter: (dir: 'left' | 'right') => ({ x: dir === 'left' ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: 'left' | 'right') => ({ x: dir === 'left' ? '-100%' : '100%', opacity: 0 }),
}

export function DataHeroSection() {
  const dotPatternId = useId()
  const [activeTab, setActiveTab] = useState<string>(TABS[0]!.id)
  const [swipeDir, setSwipeDir] = useState<'left' | 'right'>('left')
  const touchStartX = useRef(0)
  const tabBarRef = useRef<HTMLUListElement>(null)

  // Auto-scroll active tab button into view when activeTab changes
  useEffect(() => {
    const ul = tabBarRef.current
    if (!ul) return
    const btn = ul.querySelector<HTMLElement>(`[data-tab="${activeTab}"]`)
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeTab])

  const labels = TAB_LABELS[activeTab] ?? TAB_LABELS['marketplaces']!
  const connectors = TAB_CONNECTORS[activeTab] ?? TAB_CONNECTORS['marketplaces']!
  const slotGridOverrides = TAB_SLOT_GRID[activeTab] ?? null

  /** Tab change with explicit direction (for tab-bar clicks) */
  function changeTab(id: string) {
    const currentIdx = TABS.findIndex(t => t.id === activeTab)
    const nextIdx = TABS.findIndex(t => t.id === id)
    setSwipeDir(nextIdx > currentIdx ? 'left' : 'right')
    setActiveTab(id)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]!.clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = e.changedTouches[0]!.clientX - touchStartX.current
    if (Math.abs(delta) < 50) return
    const currentIdx = TABS.findIndex(t => t.id === activeTab)
    if (delta < 0 && currentIdx < TABS.length - 1) {
      setSwipeDir('left')
      setActiveTab(TABS[currentIdx + 1]!.id)
    } else if (delta > 0 && currentIdx > 0) {
      setSwipeDir('right')
      setActiveTab(TABS[currentIdx - 1]!.id)
    }
  }

  return (
    <section className="relative bg-primary-background">

      {/* ── 1. Dotted background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <svg className="h-full w-full">
          <defs>
            <pattern id={dotPatternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.75" fill="#d4d8de" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${dotPatternId})`} />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-background via-transparent to-primary-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-background via-transparent to-primary-background" />
      </div>

      {/* ── 2. PageHero ── */}
      <div className="relative z-20">
        <PageHero
          badge="Data model"
          heading="The data model for go-to-market magic."
          subheading="Attio gives you control and flexibility to build the perfect CRM that drives revenue forward."
          primaryCta={{ label: 'Start for free', href: '/platform/data' }}
          showSales
          mobileFormSource='data'
          showMobileSales
          paddingBottom="pb-10 lg:pb-14"
        />
      </div>

      {/* ── 3. ER diagram (attio 118-column CSS grid) — desktop only ── */}
      <div className="relative z-10 overflow-x-none -mt-[120px] max-lg:hidden">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/*
            CSS custom property --row-height drives both the grid row sizing and
            the connector height calculations (h-[calc(100%-var(--row-height)*1.5)] etc.)
          */}
          <div
            className="[--row-height:11.3px]"
            style={{ '--row-height': '11.3px' } as React.CSSProperties}
          >
            <div className="relative grid grid-cols-[repeat(118,1fr)] grid-rows-[repeat(12,var(--row-height))] gap-y-[19px]">

              {/* Connector paths — absolutely positioned inside the grid */}
              <GridConnectors connectors={connectors} />

              {/* Entity cards */}
              {SLOTS.map((slot, i) => {
                const override = slotGridOverrides?.[i] ?? null
                if (override?.hidden) return null
                const gridClass = override?.gridClass ?? slot.gridClass
                const xlGridClass = override?.xlGridClass ?? slot.xlGridClass
                return (
                  <div
                    key={i}
                    className={cn(
                      'relative flex flex-col rounded-[9.5px] border border-weak-stroke bg-primary-background p-[7px] shadow-xs',
                      'lg:rounded-xl lg:p-[11px]',
                      gridClass,
                      xlGridClass,
                    )}
                  >
                    {/* Card header: icon + entity name + badge */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-[7px] lg:pb-3">
                      <div className="flex items-center gap-x-[4.5px] font-semibold text-[10.9px] leading-[15.5px] -tracking-[0.22px] text-fg-primary lg:gap-x-1.5 lg:text-sm">
                        {slot.entityIcon}
                        <motion.span
                          key={activeTab + '-name-' + i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                        >
                          {labels[i]!.name}
                        </motion.span>
                      </div>
                      {slot.badge === 'Standard' ? (
                        <div className="rounded-[6.5px] border border-subtle-stroke bg-surface-subtle px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-accent-foreground lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Standard
                        </div>
                      ) : (
                        <div className="rounded-[6.5px] border border-[#D6E5FF] bg-[#E5EEFF] px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-[#183C81] lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Custom
                        </div>
                      )}
                    </div>

                    {/* Field rows */}
                    <ul>
                      {slot.fieldIcons.map((icon, fi) => (
                        <li
                          key={fi}
                          className="flex w-full items-center gap-x-[4.5px] border-b border-weak-stroke px-[9.5px] pt-[4.5px] pb-[3.5px] text-[9.5px] text-fg-tertiary max-lg:leading-[12.5px] lg:gap-x-1.5 lg:px-3 lg:pt-1.5 lg:pb-[5px] lg:text-xs"
                        >
                          {icon}
                          <motion.span
                            key={activeTab + '-field-' + i + '-' + fi}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, ease: EASE_OUT, delay: fi * 0.03 }}
                            className="truncate"
                          >
                            {labels[i]!.fieldLabels[fi]}
                          </motion.span>
                        </li>
                      ))}
                    </ul>

                    {/* More attributes footer */}
                    <div className="flex w-full items-center gap-x-1.5 px-[9.5px] pt-[4.5px] font-medium text-[8.5px] leading-[12.5px] -tracking-[0.22px] text-fg-caption lg:gap-x-2 lg:px-3 lg:pt-1.5 lg:text-[11px] lg:leading-4">
                      <FiPlus />
                      <motion.span
                        key={activeTab + '-more-' + i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                        className="truncate"
                      >
                        {labels[i]!.moreCount} More Attributes
                      </motion.span>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>

      {/* ── 3b. Mobile: tab bar + swipeable ER grid (hidden above lg) ── */}
      <div className="relative z-10 mt-6 lg:hidden">

        {/* Tab bar */}
        <ul ref={tabBarRef} className="scrollbar-none flex w-full justify-start overflow-x-auto overflow-y-hidden sm:justify-center">
          <div className="flex justify-start py-3 sm:justify-center">
            {TABS.map((tab) => (
              <li
                key={tab.id}
                className="px-1 py-1 first:pl-4 last:pr-4"
                style={{ maxWidth: 'fit-content', minWidth: 'fit-content' }}
              >
                <button
                  data-tab={tab.id}
                  type="button"
                  onClick={() => changeTab(tab.id)}
                  className={cn(
                    'flex shrink-0 cursor-pointer items-center gap-x-1 whitespace-nowrap rounded-[10px] border border-subtle-stroke py-[9px] pl-[9px] pr-[11px] text-sm text-tertiary-foreground',
                    'transition-[background-color,box-shadow] duration-200 ease-out',
                    'hover:bg-secondary-background',
                    'focus-visible:outline-none focus-visible:ring-3 focus-visible:active:ring-2',
                    activeTab === tab.id ? 'bg-surface-subtle' : 'bg-primary-background',
                  )}
                >
                  <tab.Icon />
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </div>
        </ul>

        {/* Swipeable ER grid */}
        <div
          className="mt-4 overflow-hidden flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={swipeDir}>
            <motion.div
              key={activeTab}
              custom={swipeDir}
              variants={mobileSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="[--row-height:26px] w-full"
              style={{ '--row-height': '26px', 'maxWidth': '400px' } as React.CSSProperties}
            >
              <div className="relative grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(14,var(--row-height))] gap-y-2 px-4 sm:px-0">
                <GridConnectors connectors={MOBILE_TAB_CONNECTORS[activeTab] ?? []} />
                {(MOBILE_CARDS[activeTab] ?? MOBILE_CARDS['marketplaces']!).map((card, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative flex flex-col rounded-[9.5px] border border-weak-stroke bg-primary-background p-[7px] shadow-xs lg:rounded-xl lg:p-[11px]',
                      card.gridClass,
                    )}
                  >
                    {/* Card header: icon + entity name + badge */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-[7px] lg:pb-3">
                      <div className="flex items-center gap-x-[4.5px] font-semibold text-[10.9px] leading-[15.5px] -tracking-[0.22px] text-fg-primary lg:gap-x-1.5 lg:text-sm">
                        <span className="shrink-0 basis-[15.5px] lg:basis-auto">{card.entityIcon}</span>
                        <span>{card.entityName}</span>
                      </div>
                      {card.badge === 'Standard' ? (
                        <div className="rounded-[6.5px] border border-subtle-stroke bg-surface-subtle px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-accent-foreground lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Standard
                        </div>
                      ) : (
                        <div className="rounded-[6.5px] border border-[#D6E5FF] bg-[#E5EEFF] px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-[#183C81] lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Custom
                        </div>
                      )}
                    </div>

                    {/* Field rows */}
                    <ul>
                      {card.fieldIcons.map((icon, fi) => (
                        <li
                          key={fi}
                          className="flex w-full items-center gap-x-[4.5px] border-b border-weak-stroke px-[9.5px] pt-[4.5px] pb-[3.5px] text-[9.5px] text-fg-tertiary max-lg:leading-[12.5px] lg:gap-x-1.5 lg:px-3 lg:pt-1.5 lg:pb-[5px] lg:text-xs"
                        >
                          <span className="shrink-0 basis-[11px] lg:basis-auto">{icon}</span>
                          <span className="truncate">{card.fieldLabels[fi]}</span>
                        </li>
                      ))}
                    </ul>

                    {/* More attributes footer */}
                    <div className="flex w-full items-center gap-x-1.5 px-[9.5px] pt-[4.5px] font-medium text-[8.5px] leading-[12.5px] -tracking-[0.22px] text-fg-caption lg:gap-x-2 lg:px-3 lg:pt-1.5 lg:text-[11px] lg:leading-4">
                      <FiPlus />
                      <span className="truncate">{card.moreCount} More Attributes</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="mt-6 flex justify-center gap-x-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-200',
                activeTab === tab.id ? 'bg-slate-400' : 'bg-slate-200',
              )}
              aria-label={tab.label}
            />
          ))}
        </div>

      </div>

      {/* ── 5. Tab switcher + screenshot (desktop only, lg+) ── */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 pt-20 sm:px-6 lg:px-8 max-lg:hidden">

        {/* Screenshot frame */}
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            {TABS.map((tab) =>
              activeTab === tab.id ? (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="rounded-[20px] border border-white/50 bg-[linear-gradient(199deg,#EDEFF3_11.23%,#E4E7EC_87.61%)] p-[9px] shadow-[0px_10px_30px_-4px_rgba(28,40,64,0.10),0px_8px_8px_-8px_rgba(28,40,64,0.10),0px_4px_4px_-6px_rgba(28,40,64,0.14),0px_0px_0px_1px_#EDEFF3]"
                >
                  <div className="overflow-hidden rounded-[11px] shadow-[0px_2px_6px_0px_rgba(28,40,64,0.04)]">
                    <Image
                      src={tab.src}
                      alt={tab.label}
                      width={4536}
                      height={2252}
                      className="w-full rounded-[inherit] bg-primary-background"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority={tab.id === TABS[0]!.id}
                    />
                  </div>
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </div>

        {/* Tab bar — sticky to viewport bottom while hero is in view */}
        <ul className="sticky bottom-5 mt-[52px] flex gap-x-2 rounded-[15px] bg-primary-background p-2.5 shadow-xl xl:mt-[37px]">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => changeTab(tab.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-x-1 rounded-[10px] border border-weak-stroke py-[5px] pl-[9px] pr-[11px] text-sm text-muted-foreground',
                  'transition-[background-color,box-shadow] duration-200 ease-out',
                  'hover:bg-secondary-background',
                  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:active:ring-2',
                  activeTab === tab.id && 'bg-secondary-background',
                )}
              >
                <tab.Icon />
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>

      </div>

      {/* Bottom spacer */}
      <div
        aria-hidden="true"
        className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-[7.5rem] max-lg:h-[6.25rem]"
      >
        <div className="col-[2/-2] flex justify-between" />
      </div>

    </section>
  )
}
