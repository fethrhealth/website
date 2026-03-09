/**
 * /blog/[slug] — individual blog post page
 *
 * Layout mirrors attio.com/blog/[slug]:
 *  - Full-width header block with breadcrumb, date, read-time, title, author
 *  - Two-column body: article content (left) + sticky ToC (right, desktop only)
 *  - Mobile: inline ToC embedded before content
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { BlogPost } from '@/types'
import { LexicalRenderer, extractToc, estimateReadTime } from '@/lib/lexical'
import { TableOfContents } from '@/components/blog/TableOfContents'
import Divider from '@/components/ui/divider'

// ─── Data fetching ─────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return null
  const data = (await res.json()) as { docs: BlogPost[] }
  return data.docs[0] ?? null
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      type: 'article',
      publishedTime: post.publishDate ?? undefined,
    },
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** "January 12, 2025" — used in OpenGraph */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** "Jan '25" — used in the post header UI */
function formatShortDate(iso: string): string {
  const d = new Date(iso)
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = String(d.getFullYear()).slice(2)
  return `${month} '${year}`
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Dashed horizontal rule — SVG so it spans full width regardless of column */
function DashedRule({ className = '' }: { className?: string }) {
  return (
    <svg width="100%" height="1" aria-hidden className={`text-subtle-stroke ${className}`}>
      <line
        x1="0" y1="0.5" x2="100%" y2="0.5"
        stroke="currentColor"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const toc = extractToc(post.content)
  const readTime = estimateReadTime(post.content)
  const shortDate = post.publishDate ? formatShortDate(post.publishDate) : null

  return (
    <>
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="container">
        <div className="border-x border-subtle-stroke">
          <header className="relative grid grid-cols-12 pb-16">

            {/* Col 1 — date (xl+ only, sits at the bottom of the h-28 row) */}
            <div className="flex h-28 items-end justify-center pb-5 max-xl:hidden">
              {shortDate && <time className="text-overline">{shortDate}</time>}
            </div>

            {/* Col 2–11 — breadcrumb + read time (desktop) / date (mobile) */}
            <div className="col-[2/-2] flex h-28 items-end justify-between gap-8 pb-5">
              <nav aria-label="breadcrumbs" className="relative flex">
                <ol className="flex overflow-hidden text-overline">
                  <li>
                    <Link
                      href="/blog"
                      className="whitespace-nowrap text-accent-foreground transition-colors duration-400 ease-in-out hover:text-muted-foreground hover:duration-150 active:text-foreground active:duration-50"
                    >
                      blog
                    </Link>
                  </li>
                  {post.category && (
                    <li className="truncate before:mx-1 before:content-['/']">
                      {post.category}
                    </li>
                  )}
                </ol>
              </nav>

              {/* Read time — desktop (xl+) only */}
              {readTime && (
                <p className="text-overline max-xl:hidden">{readTime}</p>
              )}

              {/* Date — mobile only */}
              {shortDate && (
                <time className="text-overline xl:hidden">{shortDate}</time>
              )}
            </div>

            {/* Full-width dashed rule */}
            <svg width="100%" height="1" aria-hidden className="text-subtle-stroke col-[1/-1]">
              <line
                x1="0" y1="0.5" x2="100%" y2="0.5"
                stroke="currentColor"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Title + author — same col block, flex-col */}
            <div className="col-[2/-2] flex flex-col gap-12 pt-15">

              <h1 className="max-w-[28em] text-balance text-heading-responsive-lg">
                {post.title}
              </h1>

              {/* Author row */}
              {post.author && (
                <div className="grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-2.5 max-lg:gap-x-2">
                  {/* Avatar */}
                  <div className="mt-1 ml-1 flex items-center">
                    <div className="-mt-1 -ml-1 flex size-7 items-center justify-center overflow-hidden rounded-full border border-subtle-stroke lg:size-8">
                      <span className="text-xs font-semibold text-fg-secondary select-none">
                        {post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {/* Name + role */}
                  <p className="max-w-[36em] text-balance text-fg-caption max-lg:text-sm">
                    <span className="whitespace-nowrap text-fg-tertiary ml-2">{post.author}</span>
                    {post.authorRole && (
                      <span className="ml-1">{post.authorRole}</span>
                    )}
                  </p>
                </div>
              )}

            </div>

          </header>
        </div>
        <Divider />
      </div>


      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="container">
        <div className="border-x border-subtle-stroke">
          <div className="relative grid grid-cols-12 py-16 max-xl:py-12 max-lg:py-10">

            {/* Mobile ToC (inline, before content) */}
            {toc.length > 0 && (
              <div className="col-[2/-2] mb-8 xl:hidden">
                <TableOfContents items={toc} inline />
              </div>
            )}

            {/* ── Article content ───────────────────────────────────────── */}
            <article className="col-[2/9] max-xl:col-[2/10] max-lg:col-[2/-2]">
              <LexicalRenderer content={post.content} />
            </article>

            {/* ── Sticky ToC sidebar (desktop only) ─────────────────────── */}
            {toc.length > 0 && (
              <aside className="col-[10/-2] row-[1/4] max-xl:hidden">
                <div className="sticky top-[calc(var(--site-header-height,60px)+2rem)]">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            )}

          </div>

          {/* Bottom dashed rule */}
          <DashedRule />

          {/* Back to blog link */}
          <div className="grid grid-cols-12 py-12">
            <div className="col-[2/-2]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-fg-accent transition-colors duration-150 hover:text-fg-secondary"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.1"
                    d="M11.75 7h-9.5m0 0L5.643 3.5M2.25 7l3.393 3.5"
                  />
                </svg>
                Back to blog
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
