'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface TestimonialFeature {
  label: string
}

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  avatarSrc: string
  logoSrc: string
  logoWidth: number
  logoHeight: number
  quote: string
  features: TestimonialFeature[]
}

// ─── Data ────────────────────────────────────────────────────────────────────
// Avatares → public/assets/images/testimonials/[id]-avatar.png
// Logos   → public/assets/logos/testimonials/[id].svg

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'bravado',
    name: 'Sahil Mansuri',
    title: 'CEO & Co-founder',
    company: 'Bravado',
    avatarSrc: '/assets/images/testimonials/bravado-avatar.png',
    logoSrc: '/assets/logos/testimonials/bravado.svg',
    logoWidth: 168,
    logoHeight: 36,
    quote:
      '"Fethr is the first healthcare CRM that feels truly modern. It\'s powerful, flexible, and fast to build with. There\'s nothing like it on the market."',
    features: [{ label: 'Workflows' }, { label: 'Deals' }, { label: 'Reports' }],
  },
  {
    id: 'flatfile',
    name: 'David Boskovic',
    title: 'CEO & Founder',
    company: 'Flatfile',
    avatarSrc: '/assets/images/testimonials/flatfile-avatar.png',
    logoSrc: '/assets/logos/testimonials/flatfile.svg',
    logoWidth: 124,
    logoHeight: 36,
    quote:
      '"We tried five different CRMs before Fethr. Nothing came close to this level of flexibility and automation for our healthcare workflows."',
    features: [{ label: 'Custom objects' }, { label: 'Integrations' }, { label: 'Reports' }],
  },
  {
    id: 'snackpass',
    name: 'Jamie Marshall',
    title: 'COO & Co-founder',
    company: 'Snackpass',
    avatarSrc: '/assets/images/testimonials/snackpass-avatar.png',
    logoSrc: '/assets/logos/testimonials/snackpass.svg',
    logoWidth: 158,
    logoHeight: 36,
    quote:
      '"Fethr completely replaced our spreadsheets and three other tools. Our patient outreach is now automated and our team saves hours every week."',
    features: [{ label: 'Lists' }, { label: 'Workflows' }, { label: 'API' }],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Dashed SVG line — horizontal or vertical */
function DashedLine({ direction }: { direction: 'h' | 'v' }) {
  if (direction === 'v') {
    return (
      <svg
        width="1"
        height="100%"
        className="absolute right-px bottom-0"
        aria-hidden="true"
      >
        <line
          x1="0.5" y1="0" x2="0.5" y2="100%"
          stroke="#E4E7EC"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg
      width="100%"
      height="1"
      className="absolute inset-x-0 bottom-[52px] hidden h-px xl:block"
      aria-hidden="true"
    >
      <line
        x1="0" y1="0.5" x2="100%" y2="0.5"
        stroke="#E4E7EC"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Quote text with word-by-word reveal animation */
function AnimatedQuote({ quote, isActive }: { quote: string; isActive: boolean }) {
  const words = quote.split(' ')
  return (
    <p
      className={cn(
        'relative flex w-full flex-wrap text-quote-responsive',
        'lg:min-w-[320px] lg:max-w-[320px] lg:text-[24px]',
        'min-[1078px]:min-w-[400px] min-[1078px]:max-w-[400px]',
        'xl:min-w-[520px] xl:max-w-[520px] xl:text-[28px]',
        'min-[1360px]:min-w-[600px] min-[1360px]:max-w-[600px]',
        '2xl:min-w-[700px] 2xl:max-w-[700px]',
      )}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="relative block overflow-clip pb-0.5 text-foreground"
        >
          <motion.span
            className="inline-block will-change-transform"
            animate={
              isActive
                ? { y: 0, opacity: 1 }
                : { y: '100%', opacity: 0 }
            }
            transition={{
              delay: isActive ? i * 0.025 : 0,
              duration: 0.25,
              ease: [0.2, 0, 0, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </p>
  )
}

/** Single testimonial card */
function TestimonialCard({
  t,
  isActive,
  onActivate,
}: {
  t: Testimonial
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <div
      className={cn(
        'group relative flex min-w-[132px] overflow-hidden lg:flex-row',
        // Mobile: active = auto height | inactive = 60px
        isActive ? 'h-auto w-full' : 'h-[60px] w-full cursor-pointer',
        // Desktop: active = fill | inactive = 132px sidebar
        isActive ? 'lg:h-auto' : 'lg:h-auto lg:w-[132px] lg:cursor-pointer',
      )}
      style={{
        backgroundColor: isActive ? '#ffffff' : '#fafafb',
        transition: 'background-color 0.125s, width 0.125s',
        width: isActive ? '100%' : undefined,
      }}
      onClick={() => !isActive && onActivate()}
      role={isActive ? undefined : 'button'}
      tabIndex={isActive ? undefined : 0}
      onKeyDown={(e) => {
        if (!isActive && (e.key === 'Enter' || e.key === ' ')) onActivate()
      }}
      aria-label={isActive ? undefined : `View ${t.name}'s testimonial`}
    >
      {/* Inner flex wrapper */}
      <div
        className="relative flex w-full flex-col gap-y-6 lg:flex-row lg:gap-y-[60px]"
        style={{ transitionDuration: '0.125s' }}
      >

        {/* ── Left panel: avatar + "favorite features" label ─────────── */}
        {/* NOTE: NO display:none — igual que attio. El overflow-hidden del card
            recorta el desbordamiento. Así funciona la animación fade/slide. */}
        <div
          className="w-[288px] shrink-0 items-center mix-blend-darken lg:grid xl:grid-rows-[1fr_52px] xl:items-start"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'none' : 'translateX(-80px)',
            transition: 'opacity 0.125s, transform 0.125s',
          }}
        >
          {/* Avatar */}
          <div className="flex pt-10 pl-5 lg:justify-center lg:px-0 lg:pt-0 xl:pt-[120px]">
            <div className="flex items-center justify-center size-[120px] lg:size-[220px] lg:pt-2 xl:pt-0">
              <Image
                src={t.avatarSrc}
                alt={t.name}
                width={220}
                height={220}
                className={cn(
                  'transition-transform ease-in-out',
                  isActive ? '' : 'group-hover:scale-[1.05]',
                )}
                style={{ transitionDuration: '0.25s' }}
              />
            </div>
          </div>

          {/* "Company's favorite features" — xl only */}
          <div
            className="relative hidden h-full items-center justify-center xl:flex"
            style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.125s' }}
          >
            <p className="whitespace-nowrap font-semibold text-[#8f99a8] text-sm">
              {t.company}&apos;s favorite features
            </p>
            <DashedLine direction="v" />
          </div>
        </div>

        {/* ── Right panel: logo + quote + features ───────────────────── */}
        <div className="relative flex h-fit w-full flex-col overflow-hidden pb-[92px] lg:h-[402px] lg:py-[60px] xl:h-[460px] xl:pb-0">

          {/* Company logo — desktop only */}
          <div className="mx-11 mb-8 hidden h-9 w-full shrink-0 items-center lg:flex xl:mb-12">
            <Image
              src={t.logoSrc}
              alt={t.company}
              width={t.logoWidth}
              height={t.logoHeight}
              className="h-9 w-fit shrink-0"
              style={{ fill: '#2e3238' }}
            />
          </div>

          {/* Quote + attribution */}
          <div className="flex w-full flex-col gap-6 px-5 lg:gap-7 lg:px-11">
            <AnimatedQuote quote={t.quote} isActive={isActive} />
            <p
              className="w-full whitespace-nowrap text-sm"
              style={{ color: isActive ? '#232529' : '#ffffff' }}
            >
              <span className="font-bold">{t.name}</span>, {t.title}
            </p>
          </div>

          {/* Feature chips — xl only */}
          <div className="mt-auto hidden h-[52px] w-full flex-nowrap items-center gap-7 px-11 xl:flex">
            {t.features.map((f) => (
              <div
                key={f.label}
                className="flex shrink-0 items-center gap-1.5"
                style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.2s' }}
              >
                <p className="line-clamp-1 whitespace-nowrap text-[#2e3238] text-sm">
                  {f.label}
                </p>
              </div>
            ))}
          </div>

          {/* Dashed line above feature chips — xl only */}
          <DashedLine direction="h" />

          {/* Company logo — mobile bottom bar */}
          <div className="absolute inset-x-0 bottom-0 flex h-[60px] w-full items-center justify-start px-5 lg:hidden">
            <Image
              src={t.logoSrc}
              alt={t.company}
              width={t.logoWidth}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="border-[#E4E7EC] border-y bg-[#FAFAFB]">
      <div className="container mx-auto">

        {/* Mobile top decorative border */}
        <div className="h-5 border-[#E4E7EC] border-x border-b lg:hidden" />

        {/* Cards wrapper — reversed on desktop so first card appears rightmost */}
        <div className="flex flex-col items-stretch border-[#E4E7EC] border-x lg:flex-row-reverse">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="contents">
              <TestimonialCard
                t={t}
                isActive={activeIndex === i}
                onActivate={() => setActiveIndex(i)}
              />
              {/* Separator — horizontal on mobile, vertical on desktop, hidden after last */}
              {i < TESTIMONIALS.length - 1 && (
                <div className="h-px shrink-0 bg-[#E4E7EC] lg:h-auto lg:w-px" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
