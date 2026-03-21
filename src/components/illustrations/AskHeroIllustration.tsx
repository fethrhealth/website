'use client'

/**
 * AskHeroIllustration
 *
 * Animated search-widget illustration for AskHeroSection.
 * Contains all animation state, loop logic, sub-components and demo data.
 * Renders the slide-in wrapper + input bar + result dropdown.
 */

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  IconSend, IconPlay, IconRedirect, IconClock,
  IconTaskAdd, IconVideo, IconVideoSm,
} from '@/components/icons/AskHeroIcons'
import {
  ASK_HERO_QUERIES,
  ASK_HERO_INPUT_PLACEHOLDER,
  ASK_HERO_AVATAR_1,
  ASK_HERO_AVATAR_2,
  ASK_HERO_AVATAR_3,
  ASK_HERO_CARD1_TITLE,
  ASK_HERO_CARD1_PLAY_ALL,
  ASK_HERO_FEATURE_ROW_1,
  ASK_HERO_FEATURE_ROW_2,
  ASK_HERO_FEATURE_ROW_3,
  ASK_HERO_BRIEF_GREETING,
  ASK_HERO_BRIEF_MEETINGS_LABEL,
  ASK_HERO_BRIEF_TASKS_LABEL,
  ASK_HERO_BRIEF_MEETING,
  ASK_HERO_BRIEF_TASK_1,
  ASK_HERO_BRIEF_TASK_2,
  ASK_HERO_EMAIL,
} from '@/data/ask-hero'

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
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(5px)',
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
  label: string
  barLeft: number
  barWidth: string
  avatarSrcs: string[]
  visible: boolean
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
  text: string
  avatar1: string
  avatar2: string
  assignee: string
  assigneeExtra: string
  contact: string
  due: string
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
  typedText: string
  isTyping: boolean
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
          opacity: showCard ? 1 : 0,
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
              {ASK_HERO_CARD1_TITLE}
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
              {ASK_HERO_CARD1_PLAY_ALL}
            </span>
          </button>
        </div>

        <div className="h-px bg-[rgba(0,0,0,0.05)]" />

        <div className="flex flex-col gap-3 px-3 pt-2 pb-3">
          <FeatureRow {...ASK_HERO_FEATURE_ROW_1} visible={visibleItems >= 2} />
          <FeatureRow {...ASK_HERO_FEATURE_ROW_2} visible={visibleItems >= 3} />
          <FeatureRow {...ASK_HERO_FEATURE_ROW_3} visible={visibleItems >= 4} />
        </div>
      </div>
    </div>
  )
}

// ─── Result card 2 — Prepare me for my day ────────────────────────────────────

function ResultDailyBrief({ typedText, isTyping, visibleItems }: ResultProps) {
  return (
    <div className="flex flex-col items-start gap-3.5 md:gap-4">

      {/* ── Header — greeting + typed response ── */}
      <div className="flex h-8 flex-col md:h-10">
        <span className="font-medium text-[12px] text-fg-primary leading-[16px] tracking-[-0.07px] md:text-[14px] md:leading-[20px]">
          {ASK_HERO_BRIEF_GREETING}
        </span>
        <p className="font-medium text-[12px] text-fg-primary leading-[16px] tracking-[-0.07px] md:text-[14px] md:leading-[20px]">
          {typedText}
          {isTyping && <Cursor small />}
        </p>
      </div>

      {/* ── Section 1 — Upcoming meetings ── */}
      <FadeItem visible={visibleItems >= 1} className="flex w-full flex-col gap-3 md:gap-3.5">
        <p className="font-medium text-[12px] text-accent-foreground leading-[16px] md:text-[13px] md:leading-[18px]">
          {ASK_HERO_BRIEF_MEETINGS_LABEL}
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
                    {ASK_HERO_BRIEF_MEETING.title}
                  </span>
                  <div className="flex items-center gap-0.5 text-[11px] leading-[14px] md:text-[12px] md:leading-[16px]">
                    <span className="text-accent-foreground">{ASK_HERO_BRIEF_MEETING.dateTime}</span>
                    <span className="text-muted-foreground">·</span>
                    <div className="flex items-center gap-1">
                      <IconVideoSm className="size-3 text-accent-foreground" />
                      <span className="text-accent-foreground">{ASK_HERO_BRIEF_MEETING.duration}</span>
                    </div>
                  </div>
                </div>
                {/* Avatars */}
                <div className="flex -space-x-1 pt-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={ASK_HERO_AVATAR_1} className="size-4 rounded-full border border-white-100 object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={ASK_HERO_AVATAR_2} className="size-4 rounded-full border border-white-100 object-cover" />
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
                {ASK_HERO_BRIEF_MEETING.status}
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
                {ASK_HERO_BRIEF_MEETING.cta}
              </span>
            </button>
          </div>
        </div>
      </FadeItem>

      {/* ── Section 2 — Suggested follow-up tasks ── */}
      <FadeItem visible={visibleItems >= 2} className="flex w-full flex-col gap-3 md:gap-3.5">
        <p className="font-medium text-[12px] text-accent-foreground leading-[16px] md:text-[13px] md:leading-[18px]">
          {ASK_HERO_BRIEF_TASKS_LABEL}
        </p>
        <div className="flex flex-col gap-3">
          <TaskCard {...ASK_HERO_BRIEF_TASK_1} />
          <FadeItem visible={visibleItems >= 3}>
            <TaskCard {...ASK_HERO_BRIEF_TASK_2} />
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
          boxShadow: INNER_CARD_SHADOW,
          opacity: showCard ? 1 : 0,
          transform: showCard ? 'none' : 'translateY(6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <div className="flex items-start px-3 py-2.5">
          {/* Left — email header info */}
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="font-medium text-[11px] text-muted-foreground leading-[14px] md:text-[12px] md:leading-[16px]">
              {ASK_HERO_EMAIL.label}
            </span>
            <span className="font-medium text-[13px] text-fg-primary leading-[18px] tracking-[-0.14px] md:text-[14px] md:leading-[20px]">
              {ASK_HERO_EMAIL.subject}
            </span>
            <span className="truncate font-medium text-[11px] text-accent-foreground leading-[14px] md:text-[12px] md:leading-[16px]">
              {ASK_HERO_EMAIL.preview}
            </span>
          </div>

          {/* Right — avatar stack + overflow count */}
          <div className="flex items-start pt-0.5 pr-1">
            <div className="flex -space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={ASK_HERO_AVATAR_1} className="size-4 rounded-full border border-white-100 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={ASK_HERO_AVATAR_2} className="size-4 rounded-full border border-white-100 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={ASK_HERO_AVATAR_3} className="size-4 rounded-full border border-white-100 object-cover" />
              <div className="flex size-4 items-center justify-center rounded-full border border-[#e6e7ea] bg-[#f8f9fa]">
                <span className="font-medium text-[9px] text-accent-foreground leading-[12px] md:text-[10px] md:leading-[14px]">{ASK_HERO_EMAIL.overflow}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Demo queries ──────────────────────────────────────────────────────────────
// Data lives in @/data/ask-hero — imported above.

// ─── Send button state ────────────────────────────────────────────────────────

type SendState = 'dim' | 'active' | 'badge'

// ─── Main export ──────────────────────────────────────────────────────────────

export function AskHeroIllustration(): ReactNode {
  // Widget enter animation (slide up on first render)
  const [entered, setEntered] = useState(false)
  // Active query
  const [queryIndex, setQueryIndex] = useState(0)
  // Text typed into the input bar
  const [typedQuery, setTypedQuery] = useState('')
  // Right-side of the input bar: dim button / active button / searching badge
  const [sendState, setSendState] = useState<SendState>('dim')
  // Whether the badge shows the "found" (done) state vs the "searching" state
  const [badgeFound, setBadgeFound] = useState(false)
  // Whether the result dropdown is mounted/visible
  const [showCard, setShowCard] = useState(false)
  // Text typed above the inner card
  const [typedResponse, setTypedResponse] = useState('')
  const [isTypingResp, setIsTypingResp] = useState(false)
  // How many items are visible inside the inner card (0–4)
  const [visibleItems, setVisibleItems] = useState(0)

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
        const q = ASK_HERO_QUERIES[qi]!

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

        qi = (qi + 1) % ASK_HERO_QUERIES.length
      }
    }

    void run()
    return () => { cancelled = true }
  }, [])

  const query = ASK_HERO_QUERIES[queryIndex]!

  // ── Dynamic max-height during response typing ─────────────────────────────────
  // Cards 1 & 3 have free-flowing response text (no fixed-height header).
  // Start tight and grow by ~18px (1 line) per ~42 characters typed so the panel
  // doesn't show a large empty gap while the first few words are still appearing.
  const typingMaxH = `${Math.min(90, Math.max(46, 36 + Math.ceil(typedResponse.length / 42) * 18))}px`

  // ── Render result based on active query ──────────────────────────────────────

  const resultProps: ResultProps = {
    typedText: typedResponse,
    isTyping: isTypingResp,
    visibleItems,
  }

  const resultNode =
    queryIndex === 0 ? <ResultFeatureRequests {...resultProps} /> :
      queryIndex === 1 ? <ResultDailyBrief      {...resultProps} /> :
        <ResultEmailDraft      {...resultProps} />

  return (
    <div
      className="pointer-events-auto w-full max-w-md origin-bottom"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? 'none' : 'translateY(20px)',
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
                {ASK_HERO_INPUT_PLACEHOLDER}
              </span>
            )}
          </span>

          {/* Right area — send button */}
          <div className="flex shrink-0 items-center p-1.5 md:p-[9px]">

            {/* Send button — dim → active → invisible */}
            <div
              className="flex size-7 items-center justify-center rounded-lg border border-black/10 bg-[#266df0] text-white-100 md:size-8 md:rounded-[9px]"
              style={{
                boxShadow: 'rgba(15,107,233,0.12) 0px 2px 4px -2px, rgba(15,107,233,0.08) 0px 3px 6px -2px',
                opacity: sendState === 'badge' ? 0 : sendState === 'active' ? 1 : 0.35,
                transform: sendState === 'badge' ? 'scale(0.85)' : 'none',
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
              opacity: sendState === 'badge' ? 1 : 0,
              transform: sendState === 'badge' ? 'translateY(-50%)' : 'translateY(calc(-50% + 4px))',
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
              boxShadow: DROPDOWN_SHADOW,
              opacity: showCard ? 1 : 0,
              maxHeight: !showCard ? '0px'
                // Card 1 — typing phase grows with text, then 4 stagger steps
                : queryIndex === 0
                  ? (visibleItems < 1 ? typingMaxH
                    : visibleItems < 2 ? '150px'
                      : visibleItems < 3 ? '195px'
                        : visibleItems < 4 ? '240px'
                          : '304px')
                  // Card 2 — header (fixed h-8) → meeting card → task cards
                  : queryIndex === 1
                    ? (visibleItems < 1 ? '65px'
                      : visibleItems < 2 ? '185px'
                        : '304px')
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
                opacity: visibleItems >= 4 ? 1 : 0,
                transform: visibleItems >= 4 ? 'none' : 'translateY(4px)',
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
  )
}
