'use client'

/**
 * BlogArticlesSection
 *
 * Pixel-perfect clone of attio.com/blog "Latest articles" section:
 *  - bg-secondary-background full-width wrapper
 *  - "Latest articles" header
 *  - Left sidebar: category filter (vertical desktop / horizontal-scroll mobile)
 *  - Right column: all posts as compact rows with dashed separators
 *  - Client-side category filtering (no pagination — all posts loaded at once)
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d     = new Date(iso)
  const month = d.toLocaleString('en-US', { month: 'short' })
  const day   = String(d.getDate()).padStart(2, '0')
  const year  = d.getFullYear()
  return year === new Date().getFullYear()
    ? `${month} ${day}`
    : `${month} '${String(year).slice(2)}`
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="relative top-0.5 col-[-3/-2] justify-self-end text-fg-caption max-lg:hidden transition-[translate,color] duration-400 ease-in-out group-hover:translate-x-0.5 group-hover:duration-150 group-active:translate-x-0.5 group-active:duration-50"
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

// ─── Single post row ──────────────────────────────────────────────────────────

function PostRow({ post }: { post: BlogPost }) {
  const date = post.publishDate ? formatDate(post.publishDate) : undefined

  return (
    <div className="relative z-10 bg-secondary-background">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative grid grid-cols-16 items-baseline py-7 max-lg:grid-cols-12 transition-[opacity,filter,background-color] duration-500 ease-in-out"
      >
        {/* Hover overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-surface-subtle opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80 group-hover:duration-50 group-active:opacity-100 group-active:duration-50"
        />

        {/* Title */}
        <h3 className="relative col-[2/10] text-balance text-lg max-lg:pt-6">
          <span className="attio-group-hover-underline">{post.title}</span>
        </h3>

        {/* Date */}
        {date && (
          <p className="relative col-[11/13] text-overline max-lg:col-[-6/-2] max-lg:row-start-1 max-lg:justify-self-end">
            {date}
          </p>
        )}

        {/* Category */}
        {post.category && (
          <p className="relative col-[13/15] truncate text-overline max-lg:col-[2/6] max-lg:row-start-1">
            [{post.category}]
          </p>
        )}

        {/* Arrow — desktop only */}
        <ArrowRight />

        {/* Excerpt */}
        {post.excerpt && (
          <p className="relative col-[2/-2] line-clamp-2 max-w-[28em] text-pretty pt-2 text-accent-foreground text-sm">
            {post.excerpt}
          </p>
        )}
      </Link>

      {/* Dashed separator */}
      <svg width="100%" height="1" aria-hidden className="text-subtle-stroke">
        <line
          x1="0" y1="0.5" x2="100%" y2="0.5"
          stroke="currentColor"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BlogArticlesSection({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Compute unique categories and their counts from all posts
  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      if (post.category) {
        counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
      }
    }
    return Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [posts])

  // Filter posts by selected category
  const filtered = useMemo(
    () =>
      activeCategory == null
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [posts, activeCategory],
  )

  return (
    <section className="bg-secondary-background">
      <div className="container">
        <div className="border-x border-subtle-stroke">

          {/* Header */}
          <header className="grid grid-cols-12 justify-items-start pb-12 pt-40 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15 lg:grid-cols-24">
            <div className="col-[2/-2] max-w-[20em] text-pretty text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
              <h2 className="inline text-pretty">Latest articles</h2>
            </div>
          </header>

          {/* Solid rule — desktop */}
          <svg width="100%" height="1" aria-hidden className="text-subtle-stroke max-lg:hidden">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
          </svg>
          {/* Dashed rule — mobile */}
          <svg width="100%" height="1" aria-hidden className="text-subtle-stroke lg:hidden">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>

          {/* Body: sidebar + posts */}
          <div className="relative grid grid-cols-24 max-lg:grid-cols-12">

            {/* ── Category sidebar ──────────────────────────────────────── */}
            <div className="scrollbar-none relative col-[2/9] py-12 max-xl:col-[2/7] max-lg:col-[1/-1] max-lg:overflow-x-scroll max-lg:px-[8.3333%] max-lg:py-6">
              <ul className="-mx-3.25 flex w-full flex-col gap-0.5 max-lg:flex-row">

                {/* All articles */}
                <li>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={[
                      'relative inline-flex w-full cursor-pointer items-center gap-1 rounded-xl border border-transparent px-3.25 h-10 text-xl max-lg:text-lg max-xl:w-full justify-start text-nowrap transition-colors duration-300 ease-in-out hover:duration-50',
                      activeCategory === null
                        ? 'pointer-events-none text-fg-primary'
                        : 'text-fg-accent hover:bg-surface-subtle',
                    ].join(' ')}
                  >
                    <span className="shrink truncate">All articles</span>
                    <span className="align-super text-overline">[{posts.length}]</span>
                  </button>
                </li>

                {/* Per-category buttons */}
                {categories.map(([cat, count]) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={[
                        'relative inline-flex w-full cursor-pointer items-center gap-1 rounded-xl border border-transparent px-3.25 h-10 text-xl max-lg:text-lg max-xl:w-full justify-start text-nowrap transition-colors duration-300 ease-in-out hover:duration-50',
                        activeCategory === cat
                          ? 'pointer-events-none text-fg-primary'
                          : 'text-fg-accent hover:bg-surface-subtle',
                      ].join(' ')}
                    >
                      <span className="shrink truncate">{cat}</span>
                      <span className="align-super text-overline">[{count}]</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Right border — desktop only */}
              <svg
                width="1"
                height="100%"
                aria-hidden
                className="text-subtle-stroke absolute inset-y-0 right-0 max-lg:hidden"
              >
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </div>

            {/* Mobile divider between sidebar and posts */}
            <svg width="100%" height="1" aria-hidden className="text-subtle-stroke col-[1/-1] lg:hidden">
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
            </svg>

            {/* ── Posts list ────────────────────────────────────────────── */}
            <div className="relative isolate col-[9/-1] max-xl:col-[7/-1] max-lg:col-[1/-1]">
              {filtered.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}

              {filtered.length === 0 && (
                <p className="py-12 text-center text-sm text-fg-accent">
                  No articles in this category yet.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
