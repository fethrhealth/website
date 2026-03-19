import type { CollectionConfig } from 'payload'

/**
 * SocialLinks collection — drives the social icons in the footer bottom bar.
 * Add, remove, or reorder social profiles from the admin panel.
 */
export const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  labels: {
    singular: 'Social Link',
    plural: 'Social Links',
  },
  admin: {
    useAsTitle: 'platform',
    defaultColumns: ['platform', 'href', 'order', 'enabled'],
    description: 'Social media icons shown in the footer. Add, remove, or reorder them here.',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      label: 'Platform',
      options: [
        { label: 'LinkedIn',    value: 'linkedin'   },
        { label: 'X (Twitter)', value: 'x'          },
        { label: 'YouTube',     value: 'youtube'    },
        { label: 'Facebook',    value: 'facebook'   },
        { label: 'Instagram',   value: 'instagram'  },
        { label: 'TikTok',      value: 'tiktok'     },
        { label: 'GitHub',      value: 'github'     },
      ],
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      label: 'URL',
      admin: { description: 'Full profile URL including https://' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enabled',
      defaultValue: true,
      admin: { description: 'Uncheck to hide without deleting.' },
    },
  ],
}
