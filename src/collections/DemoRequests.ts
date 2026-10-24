import type { CollectionConfig } from 'payload'
import { sendLeadNotification } from '@/lib/lead-notification'

/**
 * DemoRequests collection — stores every "request a demo" form submission
 * from heroes, CTAs, and any other page that uses <DemoRequestForm />.
 *
 * Access:
 *   create — public (no auth required, the form is unauthenticated)
 *   read / update / delete — authenticated admins only
 */
export const DemoRequests: CollectionConfig = {
  slug: 'demo-requests',
  labels: {
    singular: 'Demo Request',
    plural:   'Demo Requests',
  },
  admin: {
    useAsTitle:     'email',
    defaultColumns: ['email', 'source', 'status', 'createdAt'],
    description:    'Leads captured via the "Request a demo" form.',
  },
  // No draft workflow needed — every submission is immediately visible
  timestamps: true,
  access: {
    create: () => true,                            // public
    read:   ({ req: { user } }) => Boolean(user),  // admins only
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        const d = doc as Record<string, unknown>
        await sendLeadNotification(req.payload, {
          subject: `New demo request — ${String(d.email ?? '')}`,
          heading: 'New demo request',
          fields: [
            { label: 'Email',  value: d.email },
            { label: 'Source', value: d.source },
          ],
        })
      },
    ],
  },
  fields: [
    {
      name:     'email',
      type:     'email',
      required: true,
      label:    'Email',
      admin: {
        description: 'The email address entered by the visitor.',
      },
    },
    {
      name:  'source',
      type:  'text',
      label: 'Source',
      admin: {
        description: 'Which page / component submitted the request (e.g. "ai-hero", "home-cta").',
      },
    },
    {
      name:         'status',
      type:         'select',
      label:        'Status',
      defaultValue: 'new',
      options: [
        { label: 'New',              value: 'new'             },
        { label: 'Contacted',        value: 'contacted'       },
        { label: 'Demo Scheduled',   value: 'demo_scheduled'  },
        { label: 'Closed',           value: 'closed'          },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name:  'notes',
      type:  'textarea',
      label: 'Notes',
      admin: {
        position:    'sidebar',
        description: 'Internal notes visible only to the team.',
      },
    },
  ],
}
