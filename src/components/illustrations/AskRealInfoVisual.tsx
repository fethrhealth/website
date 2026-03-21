import Image from 'next/image'
import type { ReactNode } from 'react'

// ─── Row data ──────────────────────────────────────────────────────────────────

const REAL_INFO_ROWS = [
  {
    src:    '/assets/icons/ask/intelligence-built/cursor.avif',
    alt:    'Cursor',
    name:   'Cursor',
    status: 'Waiting for feedback on proposal',
    shape:  'rounded-sm',
  },
  {
    src:    '/assets/icons/ask/intelligence-built/mailchimp.avif',
    alt:    'Mailchimp',
    name:   'Mailchimp',
    status: 'Awaiting reply on pricing offer',
    shape:  'rounded-sm',
  },
  {
    src:    '/assets/icons/ask/intelligence-built/pablo-hernandez.avif',
    alt:    'Pablo Hernandez',
    name:   'Pablo Hernandez',
    status: 'No response for 2 weeks',
    shape:  'rounded-full',
  },
  {
    src:    '/assets/icons/ask/intelligence-built/dropbox.avif',
    alt:    'Dropbox',
    name:   'Dropbox',
    status: 'Monthly report not submitted',
    shape:  'rounded-sm',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function RealInfoCardVisual(): ReactNode {
  return (
    <div className="flex w-full max-w-70 origin-center scale-[min(1,calc(100cqw/360px))] flex-col gap-2">
      {REAL_INFO_ROWS.map((row) => (
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
