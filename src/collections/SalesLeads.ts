import type { CollectionConfig } from 'payload'
import { sendLeadNotification } from '@/lib/lead-notification'

/**
 * SalesLeads collection — stores every "Talk to sales" form submission.
 *
 * Access:
 *   create — public (unauthenticated form submission)
 *   read / update / delete — authenticated admins only
 */
export const SalesLeads: CollectionConfig = {
  slug: 'sales-leads',
  labels: {
    singular: 'Sales Lead',
    plural:   'Sales Leads',
  },
  admin: {
    useAsTitle:     'companyEmail',
    defaultColumns: ['firstName', 'lastName', 'companyEmail', 'region', 'companySize', 'status', 'createdAt'],
    description:    'Leads captured via the "Talk to sales" dialog.',
  },
  timestamps: true,
  access: {
    create: () => true,
    read:   ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        const d = doc as Record<string, unknown>
        await sendLeadNotification(req.payload, {
          subject: `New sales lead — ${String(d.firstName ?? '')} ${String(d.lastName ?? '')} (${String(d.companyEmail ?? '')})`,
          heading: 'New sales lead (Talk to sales)',
          fields: [
            { label: 'Name',         value: `${String(d.firstName ?? '')} ${String(d.lastName ?? '')}`.trim() },
            { label: 'Company email', value: d.companyEmail },
            { label: 'Phone',        value: d.phone },
            { label: 'Region',       value: d.region },
            { label: 'Company size', value: d.companySize },
            { label: 'Details',      value: d.details },
            { label: 'Source',       value: d.source },
          ],
        })
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name:     'firstName',
          type:     'text',
          required: true,
          label:    'First Name',
        },
        {
          name:     'lastName',
          type:     'text',
          required: true,
          label:    'Last Name',
        },
      ],
    },
    {
      name:     'companyEmail',
      type:     'email',
      required: true,
      label:    'Company Email',
    },
    {
      name:  'phone',
      type:  'text',
      label: 'Phone Number',
    },
    {
      name:  'region',
      type:  'select',
      label: 'Region',
      options: [
        { label: 'North America', value: 'North America' },
        { label: 'Europe',        value: 'Europe'        },
        { label: 'Rest of World', value: 'Rest of World' },
      ],
    },
    {
      name:  'companySize',
      type:  'select',
      label: 'Number of Users',
      options: [
        { label: '1 to 5',    value: '1 to 5'    },
        { label: '6 to 10',   value: '6 to 10'   },
        { label: '11 to 20',  value: '11 to 20'  },
        { label: '21 to 50',  value: '21 to 50'  },
        { label: '51 to 100', value: '51 to 100' },
        { label: '101+',      value: '101+'       },
      ],
    },
    {
      name:  'details',
      type:  'textarea',
      label: 'Details',
      admin: {
        description: 'What the prospect told us about their needs.',
      },
    },
    {
      name:  'source',
      type:  'text',
      label: 'Source',
      admin: {
        description: 'Which page submitted the form (e.g. "home", "workflows").',
      },
    },
    {
      name:         'status',
      type:         'select',
      label:        'Status',
      defaultValue: 'new',
      options: [
        { label: 'New',            value: 'new'            },
        { label: 'Contacted',      value: 'contacted'      },
        { label: 'Meeting Booked', value: 'meeting_booked' },
        { label: 'Closed Won',     value: 'closed_won'     },
        { label: 'Closed Lost',    value: 'closed_lost'    },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name:  'notes',
      type:  'textarea',
      label: 'Internal Notes',
      admin: {
        position:    'sidebar',
        description: 'Team notes — not visible to the prospect.',
      },
    },
  ],
}
