import type { CollectionConfig } from 'payload'

/**
 * LegalPages collection — drives /legal/[slug] pages.
 * Create new legal docs here and they automatically appear
 * in the sidebar nav and footer Legal column.
 */
export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: {
    singular: 'Legal Page',
    plural: 'Legal Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'lastUpdated', 'order'],
    description:
      'Legal documents shown on /legal/[slug]. New pages automatically appear in the sidebar and footer.',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    read: () => true, // All legal pages are publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: { description: 'E.g. "Privacy Policy"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL path segment. E.g. "privacy-policy" → /legal/privacy-policy',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        description: 'Short description shown below the title on the page.',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Displayed as "Last updated: Month YYYY".',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sidebar Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first in the sidebar and footer.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
  ],
}
