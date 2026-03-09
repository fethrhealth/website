/**
 * BlogListingSection
 *
 * Pixel-perfect clone of attio.com/blog listing layout:
 *  1. h-28 top spacer with column-ruler guides
 *  2. Dashed horizontal rule (desktop only)
 *  3. Featured post — mobile stack / desktop 24-col meta row + full-bleed image
 *  4. Secondary posts — 3-col grid (2 on xl, 1 on mobile), text-only cards
 */
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Current year → "Feb 04"  ·  older year → "Feb '24" */
function formatDate(iso: string): string {
  const d = new Date(iso)
  const month = d.toLocaleString('en-US', { month: 'short' })
  const day   = String(d.getDate()).padStart(2, '0')
  const year  = d.getFullYear()
  return year === new Date().getFullYear()
    ? `${month} ${day}`
    : `${month} '${String(year).slice(2)}`
}

// ─── SVG primitives ───────────────────────────────────────────────────────────

function SolidHLine({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="1"
      aria-hidden
      className={`relative text-subtle-stroke${className ? ` ${className}` : ''}`}
    >
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

function DashedHLine({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="1"
      aria-hidden
      className={`text-subtle-stroke${className ? ` ${className}` : ''}`}
    >
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

function DashedVLine() {
  return (
    <svg width="1" height="100%" aria-hidden className="text-subtle-stroke">
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

// ─── Author line ──────────────────────────────────────────────────────────────

function AuthorLine({
  name,
  role,
  className,
}: {
  name?: string
  role?: string
  className?: string
}) {
  if (!name && !role) return null
  return (
    <p className={`whitespace-nowrap text-fg-caption${className ? ` ${className}` : ''}`}>
      {name && <span className="text-fg-tertiary">{name}</span>}
      {name && role && <br className="sm:max-lg:hidden xl:hidden" />}
      {role && <span className={name ? 'ml-2' : ""}>{role}</span>}
    </p>
  )
}

// ─── Featured post ────────────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: BlogPost }) {
  const date = post.publishDate ? formatDate(post.publishDate) : undefined
  const img  = post.featuredImage

  return (
    <Link href={`/blog/${post.slug}`} className="group relative block">

      {/* Hover overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-secondary-background opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80 group-hover:duration-50 group-active:opacity-100 group-active:duration-50"
      />

      {/* ── Mobile: lines + image ─────────────────────────────────────────── */}
      <div className="contents lg:hidden">
        <SolidHLine />
        {img?.url && (
          <Image
            src={img.url}
            alt={img.alt ?? ''}
            width={img.width ?? 1161}
            height={img.height ?? 652}
            className="relative aspect-video w-full"
            sizes="100vw"
          />
        )}
        <SolidHLine />
      </div>

      {/* ── Mobile: text content ──────────────────────────────────────────── */}
      <div className="relative grid grid-cols-12 py-11 lg:hidden">
        <div className="col-[2/-2]">
          <div className="flex justify-between gap-8">
            {post.category && <p className="text-overline">[{post.category}]</p>}
            {date          && <p className="text-overline">{date}</p>}
          </div>
          <h2 className="relative mt-8 text-balance text-heading-responsive-lg">
            <span className="attio-group-hover-underline">{post.title}</span>
          </h2>
          {post.excerpt && (
            <p className="mt-5 line-clamp-3 max-w-[28em] text-pretty text-accent-foreground text-sm">
              {post.excerpt}
            </p>
          )}
          <div className="mt-5 text-sm">
            <AuthorLine name={post.author} role={post.authorRole} />
          </div>
        </div>
      </div>

      {/* ── Desktop: 24-col meta row ──────────────────────────────────────── */}
      <div className="contents max-lg:hidden">
        <div className="relative grid grid-cols-24 gap-y-8 pt-8 pb-12">
          {/* Date — far left, hidden on xl and below */}
          {date && (
            <p className="text-overline col-[1/3] justify-self-center max-xl:hidden">{date}</p>
          )}
          {/* Category */}
          {post.category && (
            <p className="text-overline col-[3/10]">[{post.category}]</p>
          )}
          {/* Date fallback on xl (replaces the far-left slot) */}
          {date && (
            <p className="text-overline col-[21/23] justify-self-end xl:hidden">{date}</p>
          )}
          {/* Title + author */}
          <div className="col-[3/-3] flex items-end justify-between gap-8">
            <h2 className="relative text-balance text-heading-responsive-lg">
              <span className="attio-group-hover-underline">{post.title}</span>
            </h2>
            <div className="text-end max-xl:text-sm">
              <AuthorLine name={post.author} role={post.authorRole} />
            </div>
          </div>
        </div>
        <SolidHLine />
      </div>

      {/* ── Desktop: full-width image with dashed vertical guides ─────────── */}
      <div className="contents max-lg:hidden">
        <div className="relative grid grid-cols-12">
          {/* Decorative dashed verticals */}
          <div
            aria-hidden
            className="absolute -top-5 bottom-0 grid w-full grid-cols-24"
          >
            <div className="col-[2/-2] flex justify-between">
              <DashedVLine />
              <DashedVLine />
            </div>
          </div>
          {img?.url && (
            <div className="col-[2/-2]">
              <Image
                src={img.url}
                alt={img.alt ?? ''}
                width={img.width ?? 1161}
                height={img.height ?? 652}
                className="aspect-video w-full"
                sizes="(max-width: 1440px) 80vw, 1160px"
              />
            </div>
          )}
        </div>
      </div>

    </Link>
  )
}

// ─── Secondary post card ──────────────────────────────────────────────────────

function SecondaryCard({ post }: { post: BlogPost }) {
  const date = post.publishDate ? formatDate(post.publishDate) : undefined

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid grid-cols-8 bg-primary-background py-11 max-xl:grid-cols-12 max-lg:grid-cols-12"
    >
      {/* Hover overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-secondary-background opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80 group-hover:duration-50 group-active:opacity-100 group-active:duration-50"
      />

      <div className="relative col-[2/-2] flex h-full w-full flex-col justify-between">
        <div>
          <div className="flex justify-between">
            {post.category && <p className="text-overline">[{post.category}]</p>}
            {date          && <time className="text-overline">{date}</time>}
          </div>
          <h3 className="relative mt-8 w-fit text-balance font-semibold text-2xl">
            <span className="attio-group-hover-underline">{post.title}</span>
          </h3>
          {post.excerpt && (
            <p className="mt-4 line-clamp-2 max-w-[28em] text-pretty text-accent-foreground text-sm max-lg:line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>
        <div className="mt-5">
          <AuthorLine name={post.author} role={post.authorRole} className="truncate text-sm" />
        </div>
      </div>
    </Link>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BlogListingSection({ posts }: { posts: BlogPost[] }) {
  const featured  = posts[0]
  const secondary = posts.slice(1, 4) // Attio shows exactly 3 secondary cards here

  return (
    <div className="container">
      <div className="border-x border-subtle-stroke">

        {/* Featured post section */}
        <div>
          {/* Top spacer */}
          <div
            aria-hidden
            className="grid h-28 w-full grid-cols-12 overflow-hidden max-md:h-15 max-lg:h-20"
          >
            <div className="col-[2/-2] flex justify-between" />
          </div>

          {/* Dashed horizontal rule — desktop only */}
          <DashedHLine className="max-lg:hidden" />

          {/* Featured post */}
          {featured != null && <FeaturedPost post={featured} />}

          {/* Post-featured spacer with dashed verticals — desktop only */}
          <div className="contents max-lg:hidden">
            <SolidHLine />
            <div
              aria-hidden
              className="relative grid h-25 w-full grid-cols-24"
            >
              <div className="col-[2/-2] flex justify-between">
                <DashedVLine />
                <DashedVLine />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary posts grid */}
        {secondary.length > 0 && (
          <div className="grid grid-cols-3 gap-px bg-subtle-stroke py-px max-xl:grid-cols-2 max-lg:grid-cols-1">
            {secondary.map((post) => (
              <SecondaryCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-sm text-fg-tertiary">No posts yet. Check back soon.</p>
          </div>
        )}

      </div>
    </div>
  )
}
