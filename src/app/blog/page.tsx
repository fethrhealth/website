/**
 * Blog listing page — /blog
 * Fetches published posts from Payload CMS via REST API.
 * TODO Phase 2: Implement full design.
 */
import type { BlogPost } from '@/types'

async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[status][equals]=published&sort=-publishDate`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return []
  const data = (await res.json()) as { docs: BlogPost[] }
  return data.docs
}

export default async function BlogPage(): Promise<React.ReactElement> {
  const posts = await getPosts()

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
