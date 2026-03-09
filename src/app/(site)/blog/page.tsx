import type { Metadata } from 'next'
import type { BlogPost } from '@/types'
import { BlogListingSection } from '@/components/sections/BlogListingSection'
import { BlogArticlesSection } from '@/components/sections/BlogArticlesSection'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, updates, and perspectives from the Fethr Health team.',
}

async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[status][equals]=published&sort=-publishDate&depth=1&limit=100`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return []
  const data = (await res.json()) as { docs: BlogPost[] }
  return data.docs
}

export default async function BlogPage(): Promise<React.ReactElement> {
  const posts = await getPosts()
  return (
    <>
      {/* Section 1: featured + 3 secondary cards */}
      <BlogListingSection posts={posts} />
      {/* Section 2: category filter + full post list */}
      <BlogArticlesSection posts={posts} />
    </>
  )
}
