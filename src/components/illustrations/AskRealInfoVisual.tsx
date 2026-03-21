import Image from 'next/image'
import type { ReactNode } from 'react'
import { ASK_CHAT_DEMO_REAL_INFO_ROWS } from '@/data/ask-chat-demo'

// ─── Component ────────────────────────────────────────────────────────────────

export function RealInfoCardVisual(): ReactNode {
  return (
    <div className="flex w-full max-w-70 origin-center scale-[min(1,calc(100cqw/360px))] flex-col gap-2">
      {ASK_CHAT_DEMO_REAL_INFO_ROWS.map((row) => (
        <div
          key={row.name}
          className="grid grid-cols-[auto_1fr] items-center gap-x-1.5 gap-y-1 rounded-xl bg-primary-background px-3 py-2.5 shadow-attio-product-e1 border border-black-0/10"
        >
          {/* Avatar / logo */}
          <div className={`relative size-4.5 border border-transparent bg-primary-background ${row.shape}`}>
            <Image
              src={row.src}
              alt={row.alt}
              width={16}
              height={16}
              loading="lazy"
              className={`size-full object-cover ${row.shape}`}
            />
            <div className={`absolute inset-0 size-full border border-black-0/10 ${row.shape}`} />
          </div>

          <span className="truncate font-medium text-sm text-primary-foreground">{row.name}</span>
          <span className="col-span-full truncate text-xs text-accent-foreground">{row.status}</span>
        </div>
      ))}
    </div>
  )
}
