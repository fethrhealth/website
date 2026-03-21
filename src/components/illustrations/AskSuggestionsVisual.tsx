import Image from 'next/image'
import type { ReactNode } from 'react'
import { ASK_CHAT_DEMO_SUGGESTIONS } from '@/data/ask-chat-demo'

// ─── Sub-components ───────────────────────────────────────────────────────────

function IconInfo(): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-caption-foreground" aria-hidden>
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M5.99996 1.49658C3.51287 1.49658 1.49669 3.51276 1.49669 5.99985C1.49669 8.48694 3.51287 10.5031 5.99996 10.5031C8.48705 10.5031 10.5032 8.48694 10.5032 5.99985C10.5032 3.51276 8.48705 1.49658 5.99996 1.49658ZM0.496689 5.99985C0.496689 2.96048 2.96059 0.496582 5.99996 0.496582C9.03933 0.496582 11.5032 2.96048 11.5032 5.99985C11.5032 9.03922 9.03933 11.5031 5.99996 11.5031C2.96059 11.5031 0.496689 9.03922 0.496689 5.99985ZM5.99998 8.99656C6.27613 8.99656 6.49998 8.7727 6.49998 8.49656V5.99656C6.49998 5.72041 6.27613 5.49656 5.99998 5.49656C5.72384 5.49656 5.49998 5.72041 5.49998 5.99656V8.49656C5.49998 8.7727 5.72384 8.99656 5.99998 8.99656ZM5.99982 4.6284C6.33119 4.6284 6.59982 4.35978 6.59982 4.02843C6.59982 3.69707 6.33119 3.42845 5.99982 3.42845C5.66845 3.42845 5.39982 3.69707 5.39982 4.02843C5.39982 4.35978 5.66845 4.6284 5.99982 4.6284Z"
        fill="currentColor"
      />
    </svg>
  )
}

function AcceptButton(): ReactNode {
  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-md bg-primary-background p-1 py-0.5 pr-1.5 text-primary-foreground shadow-attio-product-e1">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="size-3" aria-hidden>
        <path
          d="M9.33808 2.47095C9.4922 2.24196 9.80332 2.18119 10.0324 2.33521C10.2611 2.4894 10.322 2.80058 10.1682 3.02954L6.53046 8.44067C5.86239 9.43436 4.41535 9.47834 3.68769 8.52759L1.96015 6.26782C1.79281 6.04853 1.83479 5.73529 2.0539 5.56763C2.27321 5.40007 2.58735 5.44121 2.75507 5.6604L4.48261 7.92017C4.79463 8.32699 5.41422 8.30775 5.70039 7.88208L9.33808 2.47095Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-medium text-xs">{ASK_CHAT_DEMO_SUGGESTIONS.acceptLabel}</span>
    </div>
  )
}

function SuggestionCard({ label, children }: { label: string; children: ReactNode }): ReactNode {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-2 rounded-xl bg-primary-background px-2.5 pt-2 pb-2 shadow-attio-product-e1">
      <div className="flex items-center gap-1">
        <span className="font-medium text-accent-foreground text-xs">{label}</span>
        <IconInfo />
      </div>
      <AcceptButton />
      <div className="col-span-2 pt-1">
        {children}
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IntelligentSuggestionsCardVisual(): ReactNode {
  return (
    <div className="mask-b-from-50% mask-b-to-100% flex w-full max-w-74 origin-top scale-[min(1,calc(100cqw/360px))] flex-col gap-4 pt-6">

      {/* ── Drew Houston ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 px-1">
          <div className="relative size-4.5 border border-transparent bg-primary-background rounded-full">
            <Image
              src={ASK_CHAT_DEMO_SUGGESTIONS.drew.src}
              alt={ASK_CHAT_DEMO_SUGGESTIONS.drew.alt}
              width={16}
              height={16}
              loading="lazy"
              className="size-full object-cover rounded-full"
            />
            <div className="absolute inset-0 size-full border border-black-0/10 rounded-full" />
          </div>
          <span className="font-medium text-sm text-primary-foreground underline decoration-caption-foreground">
            {ASK_CHAT_DEMO_SUGGESTIONS.drew.name}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <SuggestionCard label={ASK_CHAT_DEMO_SUGGESTIONS.drew.card1Label}>
            <span className="text-secondary-foreground text-sm">{ASK_CHAT_DEMO_SUGGESTIONS.drew.card1Value}</span>
          </SuggestionCard>
        </div>
      </div>

      {/* ── Greenleaf ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 px-1">
          <div className="relative size-4.5 border border-transparent bg-primary-background rounded-sm">
            <Image
              src={ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.src}
              alt={ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.alt}
              width={16}
              height={16}
              loading="lazy"
              className="size-full object-cover rounded-sm"
            />
            <div className="absolute inset-0 size-full border border-black-0/10 rounded-sm" />
          </div>
          <span className="font-medium text-sm text-primary-foreground underline decoration-caption-foreground">
            {ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.name}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <SuggestionCard label={ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.card1Label}>
            <span className="inline-flex rounded-md border border-[oklch(0.91_0.05_295)] bg-[oklch(0.96_0.03_295)] px-1.5 py-0.5 font-medium text-[13px] text-[oklch(0.42_0.18_295)] leading-tight">
              {ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.card1Badge}
            </span>
          </SuggestionCard>
          <SuggestionCard label={ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.card2Label}>
            <span className="text-secondary-foreground text-sm">{ASK_CHAT_DEMO_SUGGESTIONS.greenleaf.card2Value}</span>
          </SuggestionCard>
        </div>
      </div>

    </div>
  )
}
