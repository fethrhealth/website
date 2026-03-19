import type { Metadata } from 'next'
import type { BlogPost } from '@/types'
import { BlogListingSection } from '@/components/sections/BlogListingSection'
import { BlogArticlesSection } from '@/components/sections/BlogArticlesSection'
import { getPayload } from 'payload'
import config from '@payload-config'

// Revalidate every 60 seconds (replaces fetch revalidate option)
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, updates, and perspectives from the Fethr Health team.',
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      sort: '-publishDate',
      depth: 1,
      limit: 100,
    })
    return result.docs as unknown as BlogPost[]
  } catch {
    return []
  }
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
