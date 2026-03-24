import type { CollectionConfig } from 'payload'

/**
 * Media collection — required by BlogPosts for featuredImage uploads.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // Vercel Blob handles storage — disable local filesystem entirely.
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true, // Media is always publicly readable
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Accessibility text for screen readers and SEO.',
      },
    },
  ],
}
