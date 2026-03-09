import type { CollectionConfig } from 'payload'

/**
 * BlogPosts collection for Payload CMS.
 * Powers the /blog section of the Fethr Health website.
 * Drafts are enabled so posts can be prepared before going live.
 */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishDate'],
  },
  // Enable draft / publish workflow
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    // Only authenticated users can create / update
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    // Published posts are publicly readable
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier. Must be unique. E.g. "my-blog-post"',
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Author Role',
      admin: {
        description: 'E.g. "Product Marketing", "CEO & Co-founder"',
      },
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'Publish Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      admin: {
        description: 'E.g. "Product", "Healthcare", "Company News"',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      admin: {
        description: 'Short summary shown in blog listing pages and meta descriptions.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      // Uses the Lexical editor installed via @payloadcms/richtext-lexical
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
