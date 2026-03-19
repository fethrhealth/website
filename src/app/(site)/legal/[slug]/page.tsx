/**
 * /legal/[slug] — individual legal document page.
 *
 * Layout mirrors attio.com/legal/[slug]:
 *  - Title + subtitle + "Last updated" header
 *  - Two-column body: sticky sidebar (all legal pages) + rich-text content
 *  - Mobile: sidebar stacks above content
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LegalPage } from '@/types'
import { LexicalRenderer } from '@/lib/lexical'
import { LegalSidebar } from '@/components/legal/LegalSidebar'

// Revalidate every hour — legal pages change rarely
export const revalidate = 3600

// ─── Data fetching ─────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getLegalData(slug: string) {
  const payload = await getPayload({ config })

  // Fetch the requested page and all pages (for sidebar) in parallel
  const [pageResult, allResult] = await Promise.all([
    payload.find({
      collection: 'legal-pages',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    }),
    payload.find({
      collection: 'legal-pages',
      sort: 'order',
      depth: 0,
      limit: 50,
    }),
  ])

  return {
    page: (pageResult.docs[0] ?? null) as unknown as LegalPage | null,
    all:  allResult.docs as unknown as LegalPage[],
  }
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { page } = await getLegalData(slug)
  if (!page) return {}
  return {
    title:       page.title,
    description: page.subtitle,
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** "March 2025" */
function formatLastUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function LegalPageRoute({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params
  const { page, all } = await getLegalData(slug)
  if (!page) notFound()

  const sidebarLinks = all.map((p) => ({
    label: p.title,
    href:  `/legal/${p.slug}`,
  }))

  return (
    <main className="container pt-10 pb-20 lg:pt-32 xl:pt-40 xl:pb-40">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <h1 className="max-w-5xl text-balance text-heading-lg">{page.title}</h1>

      {page.subtitle && (
        <p className="mt-5 max-w-2xl text-balance text-xl text-secondary-foreground">
          {page.subtitle}
        </p>
      )}

      {page.lastUpdated && (
        <p className="mt-6 text-accent-foreground">
          Last updated: {formatLastUpdated(page.lastUpdated)}
        </p>
      )}

      {/* ── Body: sidebar + content ─────────────────────────────────────── */}
      <div className="mt-[72px] flex flex-col gap-x-6 gap-y-[72px] lg:mt-[120px] lg:flex-row">

        {/* Sidebar nav — all legal pages */}
        <LegalSidebar links={sidebarLinks} />

        {/* Rich-text content */}
        <div
          id="content"
          className="legal-prose font-normal leading-[1.625] lg:max-w-[826px] lg:px-20"
        >
          {page.content
            ? <LexicalRenderer content={page.content} />
            : <p className="text-accent-foreground">Content coming soon.</p>
          }
        </div>

      </div>
    </main>
  )
}
