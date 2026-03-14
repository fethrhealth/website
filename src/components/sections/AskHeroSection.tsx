'use client'

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { HeroRainGrid } from '@/components/ui/HeroRainGrid'

// ─── Shadows ──────────────────────────────────────────────────────────────────

const INPUT_SHADOW = [
  'rgba(28, 40, 64, 0.04) 0px 0px 0px 1px',
  'rgba(127, 135, 144, 0.01) 0px 9px 4px 0px',
  'rgba(127, 135, 144, 0.05) 0px 5px 3px 0px',
  'rgba(127, 135, 144, 0.09) 0px 2px 2px 0px',
  'rgba(127, 135, 144, 0.1) 0px 1px 1px 0px',
].join(', ')

const DROPDOWN_SHADOW = [
  'rgba(28, 40, 64, 0.04) 0px 0px 0px 1px',
  'rgba(127, 135, 144, 0.01) 0px 9px 4px 0px',
  'rgba(127, 135, 144, 0.05) 0px 5px 3px 0px',
  'rgba(127, 135, 144, 0.09) 0px 2px 2px 0px',
  'rgba(127, 135, 144, 0.1) 0px 1px 1px 0px',
  'rgb(255, 255, 255) 0px 0px 24px 20px',
].join(', ')

const INNER_CARD_SHADOW = '0px 0px 2px 0px rgba(28,40,64,0.18), 0px 1px 3px 0px rgba(0,0,0,0.04)'

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconSend() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M6.52029 1.35461C6.74186 1.09971 7.04291 1.12433 7.23807 1.31949L11.237 5.31852C11.4601 5.54159 11.4601 5.90305 11.237 6.12613C11.014 6.34918 10.6526 6.34918 10.4295 6.12613L7.40604 3.1027V12.007C7.40578 12.3222 7.15002 12.5782 6.83475 12.5783C6.5194 12.5783 6.26371 12.3223 6.26346 12.007V3.1027L3.24002 6.12613C3.01694 6.34918 2.65451 6.34918 2.43143 6.12613C2.20878 5.90304 2.20858 5.54148 2.43143 5.31852L6.43045 1.31949L6.52029 1.35461Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.15692 2.9802C3.86361 2.81399 3.5 3.02587 3.5 3.36301V8.63681C3.5 8.97395 3.86361 9.18584 4.15693 9.01962L8.81028 6.38272C9.10771 6.21418 9.10771 5.78565 8.81028 5.6171L4.15692 2.9802ZM2.5 3.36301C2.5 2.25964 3.68998 1.5662 4.64994 2.11018L9.30329 4.74708C10.2767 5.29868 10.2767 6.70114 9.30329 7.25274L4.64994 9.88964C3.68998 10.4336 2.5 9.74018 2.5 8.63681V3.36301Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconRedirect({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M2.5 2.5C2.22386 2.5 2 2.72386 2 3V6.5C2 7.88071 3.11929 9 4.5 9H9.29297L7.64648 10.6465L7.58203 10.7246C7.45387 10.9187 7.47562 11.1827 7.64648 11.3535C7.81735 11.5244 8.08131 11.5461 8.27539 11.418L8.35352 11.3535L10.8535 8.85352C10.9473 8.75975 11 8.63261 11 8.5C11 8.40056 10.9704 8.30419 10.916 8.22266L10.8535 8.14648L8.35352 5.64648C8.15825 5.45122 7.84175 5.45122 7.64648 5.64648C7.45122 5.84175 7.45122 6.15825 7.64648 6.35352L9.29297 8H4.5C3.67157 8 3 7.32843 3 6.5V3C3 2.72391 2.77607 2.50009 2.5 2.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1ZM2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6ZM6.5 3.5C6.5 3.22386 6.27614 3 6 3C5.72386 3 5.5 3.22386 5.5 3.5V6C5.5 6.27614 5.72386 6.5 6 6.5H8C8.27614 6.5 8.5 6.27614 8.5 6C8.5 5.72386 8.27614 5.5 8 5.5H6.5V3.5Z" fill="currentColor" />
    </svg>
  )
}

function IconTaskAdd({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M11.0005 8.50049C11.2764 8.50072 11.5005 8.72449 11.5005 9.00049V10.5005H13.0005C13.2764 10.5007 13.5005 10.7245 13.5005 11.0005C13.5005 11.2765 13.2764 11.5003 13.0005 11.5005H11.5005V13.0005C11.5005 13.2765 11.2764 13.5003 11.0005 13.5005C10.7243 13.5005 10.5005 13.2766 10.5005 13.0005V11.5005H9.00049C8.72435 11.5005 8.50049 11.2766 8.50049 11.0005C8.50049 10.7243 8.72435 10.5005 9.00049 10.5005H10.5005V9.00049C10.5005 8.72435 10.7243 8.50049 11.0005 8.50049ZM10.0005 1.00049C11.6571 1.00072 13.0005 2.34378 13.0005 4.00049V7.00049C13.0005 7.27649 12.7764 7.50026 12.5005 7.50049C12.2243 7.50049 12.0005 7.27663 12.0005 7.00049V4.00049C12.0005 2.89606 11.1049 2.00072 10.0005 2.00049H4.00049C2.89592 2.00049 2.00049 2.89592 2.00049 4.00049V10.0005C2.00049 11.1051 2.89592 12.0005 4.00049 12.0005H7.00049C7.27643 12.0007 7.50049 12.2245 7.50049 12.5005C7.50049 12.7765 7.27643 13.0003 7.00049 13.0005H4.00049C2.34363 13.0005 1.00049 11.6573 1.00049 10.0005V4.00049C1.00049 2.34363 2.34363 1.00049 4.00049 1.00049H10.0005ZM8.57568 5.23584C8.72198 5.00177 9.03003 4.93054 9.26416 5.07666C9.49827 5.22298 9.56955 5.53099 9.42334 5.76514L7.50342 8.83838C7.03782 9.58216 5.96953 9.62738 5.44287 8.92529L4.59912 7.80029C4.43384 7.57957 4.47935 7.26581 4.69971 7.1001C4.9206 6.93469 5.23429 6.97987 5.3999 7.20068L6.24365 8.32568C6.34893 8.46543 6.56153 8.45602 6.65479 8.30811L8.57568 5.23584Z" fill="currentColor" />
    </svg>
  )
}

function IconVideo({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M7 1.5C7.44539 1.5 7.72673 1.49862 7.96973 1.53711C9.25304 1.74056 10.2594 2.74697 10.4629 4.03027C10.4714 4.0841 10.4774 4.1403 10.4824 4.19922L11.1553 3.86328C11.4148 3.73349 11.6403 3.62024 11.8281 3.54688C12.0153 3.47378 12.2363 3.40997 12.4756 3.44531C12.8019 3.49357 13.094 3.67411 13.2832 3.94434C13.4218 4.14253 13.4641 4.36928 13.4824 4.56934C13.5008 4.77004 13.5 5.02245 13.5 5.3125V8.6875C13.5 8.9776 13.5008 9.22994 13.4824 9.43066C13.4641 9.63066 13.4217 9.85653 13.2832 10.0547C13.0941 10.3251 12.8021 10.5064 12.4756 10.5547C12.2363 10.59 12.0153 10.5262 11.8281 10.4531C11.6404 10.3798 11.4148 10.2665 11.1553 10.1367L10.4824 9.7998C10.4774 9.85908 10.4715 9.91561 10.4629 9.96973C10.2594 11.253 9.25305 12.2594 7.96973 12.4629C7.72673 12.5014 7.4454 12.5 7 12.5H5C4.30822 12.5 3.75934 12.5 3.31738 12.4639C2.86958 12.4273 2.48732 12.351 2.1377 12.1729C1.57348 11.8853 1.11472 11.4265 0.827148 10.8623C0.649016 10.5127 0.572719 10.1304 0.536133 9.68262C0.500031 9.24067 0.5 8.69177 0.5 8V6C0.5 5.30823 0.500028 4.75933 0.536133 4.31738C0.572721 3.8696 0.649011 3.48731 0.827148 3.1377C1.11472 2.57348 1.57348 2.11472 2.1377 1.82715C2.48732 1.64901 2.86959 1.57272 3.31738 1.53613C3.75934 1.50003 4.30822 1.5 5 1.5H7ZM5 2.5C4.29169 2.5 3.79023 2.50022 3.39844 2.53223C3.01265 2.56377 2.77691 2.62346 2.5918 2.71777C2.21555 2.9095 1.90951 3.21556 1.71777 3.5918C1.62346 3.7769 1.56377 4.01266 1.53223 4.39844C1.50022 4.79023 1.5 5.2917 1.5 6V8C1.5 8.7083 1.50022 9.20977 1.53223 9.60156C1.56376 9.98735 1.62346 10.2231 1.71777 10.4082C1.90951 10.7845 2.21555 11.0905 2.5918 11.2822C2.77691 11.3765 3.01264 11.4362 3.39844 11.4678C3.79023 11.4998 4.29168 11.5 5 11.5H7C7.48318 11.5 7.66689 11.4986 7.8125 11.4756C8.66828 11.34 9.34004 10.6683 9.47559 9.8125C9.49859 9.6669 9.5 9.48314 9.5 9V5C9.5 4.51685 9.4986 4.3331 9.47559 4.1875C9.34003 3.33173 8.66827 2.65996 7.8125 2.52441C7.66689 2.5014 7.48317 2.5 7 2.5H5ZM12.3291 4.43457C12.3502 4.43769 12.328 4.42556 12.1924 4.47852C12.0573 4.53128 11.8796 4.61926 11.6025 4.75781L10.5 5.30859V8.69043L11.6025 9.24219C11.8796 9.38071 12.0573 9.46873 12.1924 9.52148C12.3279 9.57441 12.3502 9.56231 12.3291 9.56543C12.3835 9.55739 12.4323 9.52652 12.4639 9.48145C12.4516 9.49895 12.473 9.48493 12.4863 9.33984C12.4995 9.19544 12.5 8.99725 12.5 8.6875V5.3125C12.5 5.00281 12.4995 4.80456 12.4863 4.66016C12.4731 4.51577 12.452 4.50047 12.4639 4.51758C12.4323 4.47264 12.3834 4.44259 12.3291 4.43457Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ─── Cursor ───────────────────────────────────────────────────────────────────

function Cursor({ small = false }: { small?: boolean }) {
  return (
    <span
      className={[
        'ml-0.5 inline-block w-px align-middle bg-fg-primary',
        small ? 'h-[13px]' : 'h-[14px] md:h-[18px]',
      ].join(' ')}
      style={{ animation: 'cursor-blink 1s step-end infinite' }}
    />
  )
}

// ─── Avatar stack ─────────────────────────────────────────────────────────────

function AvatarStack({ srcs }: { srcs: string[] }) {
  return (
    <div className="flex -space-x-1.5 pr-1.5">
      {srcs.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          alt=""
          src={src}
          className="size-4.5 rounded-full border border-white-100 object-cover"
        />
      ))}
    </div>
  )
}

// ─── Fade-in item wrapper ──────────────────────────────────────────────────────
// Wraps each animated row inside the result cards.

function FadeItem({ visible, className, children }: { visible: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'none' : 'translateY(5px)',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
      }}
    >
      {children}
    </div>
  )
}

// ─── Feature row (result card 1) ──────────────────────────────────────────────

function FeatureRow({
  label,
  barLeft,
  barWidth,
  avatarSrcs,
  visible,
}: {
  label:      string
  barLeft:    number
  barWidth:   string
  avatarSrcs: string[]
  visible:    boolean
}) {
  return (
    <FadeItem visible={visible} className="flex flex-col gap-1.5">
      <div className="flex h-5 items-center justify-between">
        <span className="font-medium text-[11px] text-fg-primary leading-[14px] tracking-[-0.12px] underline decoration-black/10 md:text-[12px] md:leading-[16px]">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <AvatarStack srcs={avatarSrcs} />
          <button
            type="button"
            tabIndex={-1}
            className="flex size-5 items-center justify-center rounded-md bg-white-100"
            style={{ boxShadow: 'inset 0px 0px 0px 1px rgba(0,0,0,0.07), 0px 1px 2px -1px rgba(0,0,0,0.04)' }}
          >
            <IconPlay className="text-fg-primary" />
          </button>
        </div>
      </div>
      <div className="px-px">
        <div className="h-1 w-full rounded-full bg-[#f8f9fa]">
          <div
            className="relative h-full rounded-full bg-black-100/25"
            style={{ left: barLeft, width: barWidth }}
          />
        </div>
      </div>
    </FadeItem>
  )
}

// ─── Task card (result card 2) ────────────────────────────────────────────────

function TaskCard({
  text, avatar1, avatar2, assignee, assigneeExtra, contact, due,
}: {
  text:          string
  avatar1:       string
  avatar2:       string
  assignee:      string
  assigneeExtra: string
  contact:       string
  due:           string
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-lg py-2 pr-2 pl-2.5 md:rounded-xl bg-white-100"
      style={{ boxShadow: INNER_CARD_SHADOW }}
    >
      <div className="flex items-start gap-2">
        <div className="flex shrink-0 items-start py-0.5">
          <IconTaskAdd className="size-4 text-[#999999]" />
        </div>
        <p className="flex-1 whitespace-pre-wrap font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.28px] md:text-[14px] md:leading-[18px]">
          {text}
        </p>
      </div>
      <div className="flex items-center gap-1 pb-1 pl-[22px] text-[10px] leading-[14px] tracking-[-0.12px] md:text-[12px] md:leading-[16px]">
        <div className="flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={avatar1} className="size-3 rounded-full border border-[rgba(0,0,0,0.05)] object-cover" />
          <div className="flex items-center gap-0.5 font-medium">
            <span className="text-[#505155]">{assignee}</span>
            <span className="text-muted-foreground">{assigneeExtra}</span>
          </div>
        </div>
        <span className="font-medium text-muted-foreground">·</span>
        <div className="flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={avatar2} className="size-3 rounded-full border border-[rgba(0,0,0,0.05)] object-cover" />
          <span className="font-medium text-[#505155]">{contact}</span>
        </div>
        <span className="font-medium text-muted-foreground">·</span>
        <span className="font-medium text-[#cf8300]">{due}</span>
      </div>
    </div>
  )
}

// ─── Result props ─────────────────────────────────────────────────────────────
// All three result cards share this interface.
// visibleItems: 0=nothing, 1=card frame, 2=item1, 3=item2, 4=item3

interface ResultProps {
  typedText:    string
  isTyping:     boolean
  visibleItems: number
}

// ─── Result card 1 — Recap feature requests ───────────────────────────────────

function ResultFeatureRequests({ typedText, isTyping, visibleItems }: ResultProps) {
  const showCard = visibleItems >= 1
  return (
    <div className="flex flex-col items-start gap-3.5 md:gap-4">
      {/* Response text — types out above the card */}
      <div className="px-0.5">
        <p className="font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.07px] md:text-[14px] md:leading-[20px]">
          {typedText}
          {isTyping && <Cursor small />}
        </p>
      </div>

      {/* Inner card */}
      <div
        className="mb-8 flex w-full flex-col overflow-hidden rounded-lg md:rounded-xl bg-white-100"
        style={{
          boxShadow: INNER_CARD_SHADOW,
          opacity:   showCard ? 1 : 0,
          transform: showCard ? 'none' : 'translateY(6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between px-2 py-2 md:pr-2.5">
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-md border border-[#d6e5ff] bg-[#e5eeff]">
              <IconVideo className="size-3.5 text-[#3b82f6]" />
            </div>
            <span className="font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.14px] underline decoration-[rgba(0,0,0,0.1)] md:text-[14px] md:leading-[20px]">
              Customer feedback
            </span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="flex h-5 items-center gap-[3px] rounded-md px-1 md:h-5 md:px-1.5 bg-white-100"
            style={{ boxShadow: INNER_CARD_SHADOW }}
          >
            <IconPlay className="size-3 text-fg-primary" />
            <span className="px-px font-medium text-[11px] text-fg-primary leading-[14px] md:text-[12px] md:leading-[16px]">
              Play all
            </span>
          </button>
        </div>

        <div className="h-px bg-[rgba(0,0,0,0.05)]" />

        <div className="flex flex-col gap-3 px-3 pt-2 pb-3">
          <FeatureRow label="EHR integration"    barLeft={40}  barWidth="25%" avatarSrcs={['/assets/icons/ask/hero/avatar-1.jpg', '/assets/icons/ask/hero/avatar-2.jpg']}                                                                        visible={visibleItems >= 2} />
          <FeatureRow label="Mobile companion"   barLeft={140} barWidth="25%" avatarSrcs={['/assets/icons/ask/hero/avatar-1.jpg', '/assets/icons/ask/hero/avatar-2.jpg', '/assets/icons/ask/hero/avatar-3.jpg']} visible={visibleItems >= 3} />
          <FeatureRow label="Billing automation" barLeft={230} barWidth="30%" avatarSrcs={['/assets/icons/ask/hero/avatar-3.jpg']}                                                                                visible={visibleItems >= 4} />
        </div>
      </div>
    </div>
  )
}

// ─── Result card 2 — Prepare me for my day ────────────────────────────────────

// Shared 12×12 video icon used in the meeting card (different path from IconVideo)
function IconVideoSm({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M6.5 1.5H4.5C3.11929 1.5 2 2.61929 2 4V8C2 9.38071 3.11929 10.5 4.5 10.5H6.5C7.88071 10.5 9 9.38071 9 8V4C9 2.61929 7.88071 1.5 6.5 1.5ZM8 4V8C8 8.82843 7.32843 9.5 6.5 9.5H4.5C3.67157 9.5 3 8.82843 3 8V4C3 3.17157 3.67157 2.5 4.5 2.5H6.5C7.32843 2.5 8 3.17157 8 4ZM9.5 4.30902L10.691 3.71353C10.8647 3.62667 11.0708 3.65033 11.2191 3.77399C11.3674 3.89765 11.4289 4.09661 11.3763 4.28284L11.3536 4.34549L11.5 8.5C11.5 8.77614 11.2761 9 11 9C10.7545 9 10.5504 8.82312 10.5081 8.58988L10.5 8.5L10.3536 4.34549L9.5 4.69098V7.30902L10.3536 7.65451L10.5 3.5C10.5 3.22386 10.7239 3 11 3C11.2455 3 11.4496 3.17688 11.4919 3.41012L11.5 3.5L11.3536 7.65451L11.3763 7.71716C11.4289 7.90339 11.3674 8.10235 11.2191 8.22601C11.0708 8.34967 10.8647 8.37333 10.691 8.28647L9.5 7.69098V4.30902Z" fill="currentColor" />
    </svg>
  )
}

function ResultDailyBrief({ typedText, isTyping, visibleItems }: ResultProps) {
  return (
    <div className="flex flex-col items-start gap-3.5 md:gap-4">

      {/* ── Header — greeting + typed response ── */}
      <div className="flex h-8 flex-col md:h-10">
        <span className="font-medium text-[12px] text-fg-primary leading-[16px] tracking-[-0.07px] md:text-[14px] md:leading-[20px]">
          Good morning, Alex!
        </span>
        <p className="font-medium text-[12px] text-fg-primary leading-[16px] tracking-[-0.07px] md:text-[14px] md:leading-[20px]">
          {typedText}
          {isTyping && <Cursor small />}
        </p>
      </div>

      {/* ── Section 1 — Upcoming meetings ── */}
      <FadeItem visible={visibleItems >= 1} className="flex w-full flex-col gap-3 md:gap-3.5">
        <p className="font-medium text-[12px] text-accent-foreground leading-[16px] md:text-[13px] md:leading-[18px]">
          Upcoming meetings:
        </p>

        {/* Meeting card */}
        <div
          className="flex max-w-80 flex-col overflow-hidden rounded-lg md:rounded-xl bg-white-100"
          style={{ boxShadow: INNER_CARD_SHADOW }}
        >
          <div className="flex items-center">
            {/* Left accent bar */}
            <div className="h-full w-[13px] overflow-hidden">
              <div className="mx-2.5 my-2.5 h-8 w-[3px] rounded-full bg-[#00d17e]" />
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col py-2 pr-3 pl-2 md:py-2.5 md:pr-4 md:pl-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.14px] md:text-[14px] md:leading-[20px]">
                    Greenleaf Onboarding
                  </span>
                  <div className="flex items-center gap-0.5 text-[11px] leading-[14px] md:text-[12px] md:leading-[16px]">
                    <span className="text-accent-foreground">Dec 12, 10:40 – 11:40 AM</span>
                    <span className="text-muted-foreground">·</span>
                    <div className="flex items-center gap-1">
                      <IconVideoSm className="size-3 text-accent-foreground" />
                      <span className="text-accent-foreground">22 min</span>
                    </div>
                  </div>
                </div>
                {/* Avatars */}
                <div className="flex -space-x-1 pt-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/assets/icons/ask/hero/avatar-1.jpg" className="size-4 rounded-full border border-white-100 object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/assets/icons/ask/hero/avatar-2.jpg" className="size-4 rounded-full border border-white-100 object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[rgba(0,0,0,0.05)]" />

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2 md:py-2.5">
            <div className="flex items-center gap-1">
              <IconClock className="size-3 text-accent-foreground" />
              <span className="font-medium text-[11px] text-accent-foreground leading-[14px] md:text-[12px] md:leading-[16px]">
                Starts in 6 mins
              </span>
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="flex h-5 items-center gap-[3px] rounded-md px-1 md:h-[22px] md:px-1.5 bg-white-100"
              style={{ boxShadow: INNER_CARD_SHADOW }}
            >
              <IconVideoSm className="size-3 text-fg-primary" />
              <span className="px-px font-medium text-[11px] text-fg-primary leading-[14px] md:text-[12px] md:leading-[16px]">
                Join meeting
              </span>
            </button>
          </div>
        </div>
      </FadeItem>

      {/* ── Section 2 — Suggested follow-up tasks ── */}
      <FadeItem visible={visibleItems >= 2} className="flex w-full flex-col gap-3 md:gap-3.5">
        <p className="font-medium text-[12px] text-accent-foreground leading-[16px] md:text-[13px] md:leading-[18px]">
          Suggested follow-up tasks:
        </p>
        <div className="flex flex-col gap-3">
          <TaskCard
            text={"Proposal Review: Send proposal\nto Sarah Johnson"}
            avatar1="/assets/icons/ask/hero/avatar-1.jpg"
            avatar2="/assets/icons/ask/hero/avatar-3.jpg"
            assignee="You"
            assigneeExtra="+3"
            contact="Sarah Johnson"
            due="Today"
          />
          <FadeItem visible={visibleItems >= 3}>
            <TaskCard
              text={"Contract Signed: Follow up\nwith Greenleaf team"}
              avatar1="/assets/icons/ask/hero/avatar-2.jpg"
              avatar2="/assets/icons/ask/hero/avatar-3.jpg"
              assignee="You"
              assigneeExtra="+1"
              contact="Greenleaf Team"
              due="Tomorrow"
            />
          </FadeItem>
        </div>
      </FadeItem>

    </div>
  )
}

// ─── Result card 3 — Draft a follow-up email ──────────────────────────────────

function ResultEmailDraft({ typedText, isTyping, visibleItems }: ResultProps) {
  const showCard = visibleItems >= 1
  return (
    <div className="flex flex-col items-start gap-3.5 md:gap-4">

      {/* Response text */}
      <div className="px-0.5">
        <p className="font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.07px] md:text-[14px] md:leading-[20px]">
          {typedText}
          {isTyping && <Cursor small />}
        </p>
      </div>

      {/* Email draft card */}
      <div
        className="mb-8 flex w-full flex-col rounded-lg md:rounded-xl bg-white-100"
        style={{
          boxShadow:  INNER_CARD_SHADOW,
          opacity:    showCard ? 1 : 0,
          transform:  showCard ? 'none' : 'translateY(6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <div className="flex items-start px-3 py-2.5">
          {/* Left — email header info */}
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="font-medium text-[11px] text-muted-foreground leading-[14px] md:text-[12px] md:leading-[16px]">
              Draft email
            </span>
            <span className="font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.14px] md:text-[14px] md:leading-[20px]">
              RE: Follow-Up on Initial Discussion
            </span>
            <span className="truncate font-medium text-[11px] text-accent-foreground leading-[14px] md:text-[12px] md:leading-[16px]">
              Hi everyone, thanks for the productive check-in...
            </span>
          </div>

          {/* Right — avatar stack + overflow count */}
          <div className="flex items-start pt-0.5 pr-1">
            <div className="flex -space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src="/assets/icons/ask/hero/avatar-1.jpg" className="size-4 rounded-full border border-white-100 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src="/assets/icons/ask/hero/avatar-2.jpg" className="size-4 rounded-full border border-white-100 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src="/assets/icons/ask/hero/avatar-3.jpg" className="size-4 rounded-full border border-white-100 object-cover" />
              <div className="flex size-4 items-center justify-center rounded-full border border-[#e6e7ea] bg-[#f8f9fa]">
                <span className="font-medium text-[9px] text-accent-foreground leading-[12px] md:text-[10px] md:leading-[14px]">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Demo queries ──────────────────────────────────────────────────────────────

interface DemoQuery {
  text:         string   // text typed in the input
  badge:        string   // label while searching  — e.g. "Searching calls"
  badgeDone:    string   // label after found      — e.g. "Searched calls: 1 result"
  responseText: string   // text typed above the inner card
  suggestion:   string   // bottom chip
}

const QUERIES: DemoQuery[] = [
  {
    text:         'Recap feature requests',
    badge:        'Searching calls',
    badgeDone:    'Searched calls: 1 result',
    responseText: 'There were three feature requests mentioned in your latest customer feedback call with Acme Health:',
    suggestion:   'Draft summary of feature requests to share with product',
  },
  {
    text:         'Prepare me for my day',
    badge:        'Thinking',
    badgeDone:    'Thought for 3s',
    responseText: "Here's your daily brief for Thursday, March 13:",
    suggestion:   'Set a reminder for my Acme Health QBR at 11:30 AM',
  },
  {
    text:         'Draft a follow-up email',
    badge:        'Searching records',
    badgeDone:    'Searched records: 4 results',
    responseText: "Based on your latest call with Richard, I\u2019ve summarized the main points and drafted a follow-up email:",
    suggestion:   'Send this draft to sarah@acmehealth.com',
  },
]

// ─── Send button state ────────────────────────────────────────────────────────

type SendState = 'dim' | 'active' | 'badge'

// ─── Section ──────────────────────────────────────────────────────────────────

export function AskHeroSection(): ReactNode {
  // Widget enter animation (slide up on first render)
  const [entered,       setEntered]       = useState(false)
  // Active query
  const [queryIndex,    setQueryIndex]    = useState(0)
  // Text typed into the input bar
  const [typedQuery,    setTypedQuery]    = useState('')
  // Right-side of the input bar: dim button / active button / searching badge
  const [sendState,     setSendState]     = useState<SendState>('dim')
  // Whether the badge shows the "found" (done) state vs the "searching" state
  const [badgeFound,    setBadgeFound]    = useState(false)
  // Whether the result dropdown is mounted/visible
  const [showCard,      setShowCard]      = useState(false)
  // Text typed above the inner card
  const [typedResponse, setTypedResponse] = useState('')
  const [isTypingResp,  setIsTypingResp]  = useState(false)
  // How many items are visible inside the inner card (0–4)
  const [visibleItems,  setVisibleItems]  = useState(0)

  // ── Animation loop ──────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    async function run() {
      // ── Entry — widget slides up ──
      setEntered(true)
      await sleep(900) // wait for slide + initial pause

      let qi = 0

      while (!cancelled) {
        const q = QUERIES[qi]!

        // ── Reset ──
        setQueryIndex(qi)
        setTypedQuery('')
        setTypedResponse('')
        setVisibleItems(0)
        setShowCard(false)
        setSendState('dim')
        setBadgeFound(false)
        setIsTypingResp(false)

        await sleep(350)

        // ── Phase 1: Type query — button activates on first char ──
        for (let i = 1; i <= q.text.length; i++) {
          if (cancelled) return
          setTypedQuery(q.text.slice(0, i))
          if (i === 1) setSendState('active')
          await sleep(52 + Math.random() * 22)
        }

        // ── Phase 2: Brief pause before sending ──
        await sleep(380)

        // ── Phase 3a: Replace button with "Searching…" badge ──
        if (cancelled) return
        setTypedQuery(q.text)
        setSendState('badge')
        setBadgeFound(false)
        await sleep(1500)

        // ── Phase 3b: Badge switches to "found" state ──
        if (cancelled) return
        setBadgeFound(true)
        await sleep(700)

        // ── Phase 4: Result panel slides down ──
        if (cancelled) return
        setShowCard(true)
        await sleep(200)

        // ── Phase 5: Type response text ──
        setIsTypingResp(true)
        for (let i = 1; i <= q.responseText.length; i++) {
          if (cancelled) return
          setTypedResponse(q.responseText.slice(0, i))
          await sleep(14 + Math.random() * 8)
        }
        setIsTypingResp(false)

        // ── Phase 6: Inner card frame appears ──
        await sleep(180)
        if (cancelled) return
        setVisibleItems(1)

        // ── Phase 7: Items stagger in ──
        for (let i = 2; i <= 4; i++) {
          await sleep(190)
          if (cancelled) return
          setVisibleItems(i)
        }

        // ── Phase 8: Hold ──
        await sleep(2000)

        // ── Phase 9: Input clears, badge resets ──
        if (cancelled) return
        setTypedQuery('')
        setSendState('dim')
        await sleep(700) // card still showing while input is empty

        // ── Phase 10: Dismiss card ──
        setShowCard(false)
        await sleep(420)

        qi = (qi + 1) % QUERIES.length
      }
    }

    void run()
    return () => { cancelled = true }
  }, [])

  const query = QUERIES[queryIndex]!

  // ── Dynamic max-height during response typing ─────────────────────────────────
  // Cards 1 & 3 have free-flowing response text (no fixed-height header).
  // Start tight and grow by ~18px (1 line) per ~42 characters typed so the panel
  // doesn't show a large empty gap while the first few words are still appearing.
  const typingMaxH = `${Math.min(90, Math.max(46, 36 + Math.ceil(typedResponse.length / 42) * 18))}px`

  // ── Render result based on active query ──────────────────────────────────────

  const resultProps: ResultProps = {
    typedText:    typedResponse,
    isTyping:     isTypingResp,
    visibleItems,
  }

  const resultNode =
    queryIndex === 0 ? <ResultFeatureRequests {...resultProps} /> :
    queryIndex === 1 ? <ResultDailyBrief      {...resultProps} /> :
                       <ResultEmailDraft      {...resultProps} />

  return (
    <section className="flex min-h-[calc(100svh-var(--site-header-height))] flex-col bg-gradient-to-b from-primary-background to-secondary-background">

      {/* ── Main flex area ───────────────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col overflow-hidden">

        {/* HeroRainGrid canvas — lines rise from bottom, wave + parabola animation */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <HeroRainGrid className="h-full w-full" />
        </div>

        {/* Content grid */}
        <div className="pointer-events-none relative grid flex-1 grid-cols-12">
          <div className="col-[2/-2] flex flex-col items-center justify-center pb-12">

            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="pointer-events-auto">
              <header className="flex w-full flex-col items-center pt-30 pb-15 max-xl:pt-25 max-lg:pt-20">
                <h1 className="max-w-[15em] text-balance text-center text-heading-responsive-lg">
                  Ask Fethr.
                </h1>
                <p className="mt-4 max-w-xl text-balance text-center text-lg text-fg-tertiary lg:text-xl">
                  Search, update, and create with AI.
                </p>
              </header>
            </div>

            {/* ── Search widget ────────────────────────────────────────── */}
            {/*
             * Slides up on first render (entered state).
             * aria-hidden — decorative animation, not a real interactive input.
             */}
            <div
              className="pointer-events-auto w-full max-w-md origin-bottom"
              style={{
                opacity:    entered ? 1 : 0,
                transform:  entered ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <div aria-hidden="true" className="relative w-full">

                {/* ── Input bar ─────────────────────────────────────── */}
                <div
                  className="relative z-10 flex items-center justify-between rounded-lg pl-3 backdrop-blur-[2px] bg-white-100 md:rounded-xl md:pl-4"
                  style={{ boxShadow: INPUT_SHADOW }}
                >
                  {/* Query text / placeholder */}
                  <span className="min-w-0 flex-1 py-2.5 font-medium text-[13px] leading-[18px] md:text-[15px] md:leading-5">
                    {typedQuery ? (
                      <span className="text-fg-primary">
                        {typedQuery}
                        {/* Cursor disappears once button becomes active */}
                        {sendState === 'dim' && <Cursor />}
                      </span>
                    ) : (
                      <span className="text-accent-foreground">
                        Ask anything<span>...</span>
                      </span>
                    )}
                  </span>

                  {/* Right area — send button */}
                  <div className="flex shrink-0 items-center p-1.5 md:p-[9px]">

                    {/* Send button — dim → active → invisible */}
                    <div
                      className="flex size-7 items-center justify-center rounded-lg border border-black/10 bg-[#266df0] text-white-100 md:size-8 md:rounded-[9px]"
                      style={{
                        boxShadow:  'rgba(15,107,233,0.12) 0px 2px 4px -2px, rgba(15,107,233,0.08) 0px 3px 6px -2px',
                        opacity:    sendState === 'badge' ? 0 : sendState === 'active' ? 1 : 0.35,
                        transform:  sendState === 'badge' ? 'scale(0.85)' : 'none',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                      }}
                    >
                      <IconSend />
                    </div>

                  </div>

                  {/* Searching badge — absolute within input bar, right-aligned, expands left freely */}
                  <div
                    className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 md:right-[9px]"
                    style={{
                      opacity:    sendState === 'badge' ? 1 : 0,
                      transform:  sendState === 'badge' ? 'translateY(-50%)' : 'translateY(calc(-50% + 4px))',
                      transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
                    }}
                  >
                      <span className="relative flex h-5 items-center justify-center gap-1.5 rounded-md border border-[#666666]/20 px-1.5 py-0.5 font-medium text-[#666666]/60 text-[11px] leading-[14px] md:h-[22px] md:px-2 md:text-[13px] md:leading-[18px]">
                        {/* Search-in-records icon — matches Attio's badge icon */}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5 text-[#666666]/40">
                          <g clipPath="url(#badge-clip)">
                            {/* Magnifying glass circle */}
                            <path d="M10.3755 7.90283C11.7406 7.90306 12.8472 9.01028 12.8472 10.3755C12.8471 10.8607 12.7039 11.3111 12.4624 11.6929L13.6528 12.8843C13.8645 13.0966 13.8649 13.4407 13.6528 13.6528C13.4407 13.8649 13.0966 13.8645 12.8843 13.6528L11.6929 12.4624C11.3111 12.7039 10.8607 12.8471 10.3755 12.8472C9.01028 12.8472 7.90306 11.7406 7.90283 10.3755C7.90283 9.01014 9.01014 7.90283 10.3755 7.90283Z" fill="currentColor" />
                            {/* Document frame */}
                            <path d="M9.89307 1.15283C11.5246 1.15298 12.8472 2.47638 12.8472 4.10791V6.51807C12.847 6.81798 12.6041 7.06171 12.3042 7.06201C12.0041 7.06201 11.7604 6.81817 11.7603 6.51807V4.10791C11.7603 3.07683 10.9241 2.24087 9.89307 2.24072H4.10791C3.07674 2.24072 2.24072 3.07674 2.24072 4.10791V9.89307C2.24087 10.9241 3.07683 11.7603 4.10791 11.7603H6.51807C6.81817 11.7604 7.06201 12.0041 7.06201 12.3042C7.06171 12.6041 6.81798 12.847 6.51807 12.8472H4.10791C2.47638 12.8472 1.15298 11.5246 1.15283 9.89307V4.10791C1.15283 2.47628 2.47628 1.15283 4.10791 1.15283H9.89307Z" fill="currentColor" />
                            {/* Inner lens circle */}
                            <path d="M10.3755 8.99072C9.6106 8.99072 8.99072 9.6106 8.99072 10.3755C8.99095 11.1402 9.61073 11.7603 10.3755 11.7603C11.14 11.76 11.76 11.14 11.7603 10.3755C11.7603 9.61073 11.1402 8.99095 10.3755 8.99072Z" fill="currentColor" />
                            {/* Row lines in document */}
                            <path d="M6.51807 9.34912C6.8181 9.34935 7.06104 9.59298 7.06104 9.89307C7.06096 10.1931 6.81806 10.4368 6.51807 10.437H4.10693C3.80688 10.4369 3.56306 10.1931 3.56299 9.89307C3.56299 9.59293 3.80683 9.34927 4.10693 9.34912H6.51807Z" fill="currentColor" />
                            <path d="M7.48193 7.42041C7.78216 7.42041 8.02588 7.66413 8.02588 7.96436C8.02588 8.26458 7.78216 8.5083 7.48193 8.5083H4.10693C3.80683 8.50815 3.56299 8.26449 3.56299 7.96436C3.56299 7.66422 3.80683 7.42056 4.10693 7.42041H7.48193Z" fill="currentColor" />
                          </g>
                          <defs>
                            <clipPath id="badge-clip">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="whitespace-nowrap">{badgeFound ? query.badgeDone : query.badge}</span>
                      </span>
                    </div>

                </div>

                {/* ── Result dropdown ───────────────────────────────── */}
                <div className="relative mt-1.5 h-[256px] md:mt-2 md:h-[304px]">

                  {/* Panel — grows downward as content fills in */}
                  <div
                    className="relative z-[1] overflow-hidden rounded-lg p-2.5 backdrop-blur-xs bg-white-100/90 md:rounded-xl md:p-3.5"
                    style={{
                      boxShadow:  DROPDOWN_SHADOW,
                      opacity:    showCard ? 1 : 0,
                      maxHeight: !showCard ? '0px'
                                // Card 1 — typing phase grows with text, then 4 stagger steps
                                : queryIndex === 0
                                  ? (visibleItems < 1 ? typingMaxH
                                  :  visibleItems < 2 ? '150px'
                                  :  visibleItems < 3 ? '195px'
                                  :  visibleItems < 4 ? '240px'
                                  :                     '304px')
                                // Card 2 — header (fixed h-8) → meeting card → task cards
                                : queryIndex === 1
                                  ? (visibleItems < 1 ? '65px'
                                  :  visibleItems < 2 ? '185px'
                                  :                     '304px')
                                // Card 3 — typing phase grows with text, then email card
                                : (visibleItems < 1 ? typingMaxH : '220px'),
                      transition: showCard
                        ? 'opacity 0.3s ease, max-height 0.38s cubic-bezier(0.2,0,0,1)'
                        : 'opacity 0.2s ease, max-height 0.2s ease',
                    }}
                  >
                    {resultNode}

                    {/* Bottom gradient + suggestion chip — appears after all items have staggered in */}
                    <div
                      className="absolute inset-x-0 bottom-0 flex h-20 items-end px-3.5 pb-3 md:h-24 md:px-5 md:pb-4 bg-gradient-to-b from-transparent via-white-100/80 to-[50%] to-white-100"
                      style={{
                        opacity:    visibleItems >= 4 ? 1 : 0,
                        transform:  visibleItems >= 4 ? 'none' : 'translateY(4px)',
                        transition: 'opacity 0.28s ease, transform 0.28s ease',
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <IconRedirect className="size-3 text-accent-foreground md:size-3.5" />
                        <span className="text-[11px] text-accent-foreground leading-[14px] md:text-[13px] md:leading-[18px]">
                          {query.suggestion}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom spacer */}
        <div aria-hidden="true" className="h-30 max-lg:h-25" />

      </div>

      {/* Separator */}
      <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden="true">
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Bottom CTA bar ────────────────────────────────────────────── */}
      <div className="container">
        <div className="grid w-full grid-cols-12">
          <div className="col-[2/-2] flex flex-col items-center justify-between gap-6 py-12 max-md:py-10 lg:flex-row lg:gap-0">
            <p className="max-w-md text-balance text-center text-lg text-fg-tertiary lg:text-left">
              Engineered for performance. Unified by design. Powered by Universal Context.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-default-stroke bg-primary-background px-3 text-sm text-fg-primary transition-colors hover:bg-secondary-background max-md:hidden"
              >
                Talk to sales
              </button>
              <Link
                href="/get-started"
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-transparent bg-fg-primary px-3 text-sm text-white-100 transition-colors hover:bg-fg-secondary max-md:hidden"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
