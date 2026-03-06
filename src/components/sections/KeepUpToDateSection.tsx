import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DEFAULT_SOCIAL_CHANNELS, type SocialChannel, type ChannelIcon } from '@/data/social-channels'

// ─── Icons (20×20) ────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.304h.039c.397-.75 1.364-1.54 2.808-1.54 3.001 0 3.556 1.974 3.556 4.542v4.237zM4.447 6.194a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44zm1.484 10.85H2.961V7.5h2.97v9.543zM18.521 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.045c.817 0 1.479-.645 1.479-1.44V1.44C20 .645 19.338 0 18.521 0z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M11.905 8.465 19.338 0h-1.764l-6.465 7.35L6.044 0H0l7.796 11.114L0 19.99h1.764l6.817-7.75 5.443 7.75H20L11.905 8.465zm-2.413 2.744-.79-1.106L2.4 1.3h2.71l5.07 7.094.79 1.106 6.594 9.23H14.85l-5.358-7.52z" />
    </svg>
  )
}

function BlogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 5h8m-8 3h8m-8 3h5"
      />
    </svg>
  )
}

function ChangelogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 10h3l2 3h6l2-3h3M2 10V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5M2 10v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"
      />
    </svg>
  )
}

const ICONS: Record<ChannelIcon, () => React.JSX.Element> = {
  linkedin:  LinkedInIcon,
  x:         XIcon,
  blog:      BlogIcon,
  changelog: ChangelogIcon,
}

// ─── Arrow (external = diagonal ↗, internal = right →) ───────────────────────

function ArrowIcon({ external }: { external?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn(
        'relative shrink-0 text-secondary-foreground',
        'opacity-0 -translate-x-[1px]',
        'transition-[opacity,transform] duration-400 ease-in-out',
        'group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-150',
        'group-active:translate-x-0 group-active:opacity-100 group-active:duration-50',
        external && '-rotate-45',
      )}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.1"
        d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5"
      />
    </svg>
  )
}

// ─── Single card ──────────────────────────────────────────────────────────────

function ChannelCard({ channel }: { channel: SocialChannel }) {
  const Icon = ICONS[channel.icon]

  const cls =
    'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-subtle-stroke p-6 pt-[22px] ' +
    'transition-colors duration-400 ease-in-out ' +
    'hover:border-white-800 hover:duration-150 ' +
    'active:border-white-800 active:duration-50'

  const inner = (
    <>
      {/* Hover/active background overlay */}
      <div className="pointer-events-none absolute inset-0 bg-secondary-background opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80 group-hover:duration-50 group-active:opacity-100 group-active:duration-50" />

      {/* Icon + arrow row */}
      <div className="relative flex items-center justify-between">
        <Icon />
        <ArrowIcon external={channel.external} />
      </div>

      {/* Label + description */}
      <div className="relative flex flex-col gap-1">
        <h3 className="font-semibold text-secondary-foreground">{channel.label}</h3>
        <p className="text-balance text-sm text-tertiary-foreground">{channel.description}</p>
      </div>
    </>
  )

  if (channel.external) {
    return (
      <a href={channel.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={channel.href} className={cls}>
      {inner}
    </Link>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function KeepUpToDateSection({
  heading = 'Keep up to date.',
  subheading = "Get the latest updates on what we're building.",
  channels = DEFAULT_SOCIAL_CHANNELS,
}: {
  heading?: string
  subheading?: string
  channels?: SocialChannel[]
}) {
  return (
    <section className="container">
      <div className="border-x border-subtle-stroke">

        {/* Header */}
        <header className="grid grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-[120px] max-xl:pb-16 max-lg:pt-[100px] !pb-[60px]">
          <div className="col-start-2 col-end-[-2] max-w-[20em] text-pretty text-heading-responsive-sm text-start mix-blend-multiply dark:mix-blend-screen">
            <h2 className="text-pretty inline">{heading}</h2>
          </div>
          <div className="col-start-2 col-end-[-2]">
            <p className="mt-5 text-balance text-lg text-secondary-foreground lg:text-xl">
              {subheading}
            </p>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-12 pb-20 max-xl:pb-16 max-lg:pb-[60px]">
          <div className="col-start-2 col-end-[-2] grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {channels.map((channel) => (
              <ChannelCard key={channel.label} channel={channel} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
