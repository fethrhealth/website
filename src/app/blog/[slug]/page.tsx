/**
 * Individual blog post page — /blog/[slug]
 * Fetches a single published post from Payload CMS.
 * TODO Phase 2: Implement full design with rich text renderer.
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[slug][equals]=${slug}&where[status][equals]=published`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return null
  const data = (await res.json()) as { docs: BlogPost[] }
  return data.docs[0] ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      {/* TODO Phase 2: Render post.content with lexical renderer */}
    </main>
  )
}
