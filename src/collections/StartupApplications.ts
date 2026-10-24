import type { CollectionConfig } from 'payload'
import { sendLeadNotification } from '@/lib/lead-notification'

/**
 * StartupApplications collection — stores every startup program application
 * submitted via <StartupApplicationSection />.
 *
 * Access:
 *   create — public (unauthenticated form submission)
 *   read / update / delete — authenticated admins only
 */
export const StartupApplications: CollectionConfig = {
  slug: 'startup-applications',
  labels: {
    singular: 'Startup Application',
    plural:   'Startup Applications',
  },
  admin: {
    useAsTitle:     'companyEmail',
    defaultColumns: ['companyEmail', 'firstName', 'lastName', 'status', 'createdAt'],
    description:    'Applications submitted via the Startup Program form.',
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
          subject: `New startup application — ${String(d.firstName ?? '')} ${String(d.lastName ?? '')} (${String(d.companyEmail ?? '')})`,
          heading: 'New startup program application',
          fields: [
            { label: 'Name',                value: `${String(d.firstName ?? '')} ${String(d.lastName ?? '')}`.trim() },
            { label: 'Company email',       value: d.companyEmail },
            { label: 'Year founded',        value: d.yearFounded },
            { label: 'Latest funding round', value: d.latestFundingRound },
            { label: 'Total amount raised', value: d.totalAmountRaised },
            { label: 'Team size',           value: d.teamSize },
            { label: 'Use case',            value: d.useCase },
          ],
        })
      },
    ],
  },
  fields: [
    // ── Identity ────────────────────────────────────────────────────────────
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

    // ── Company details ──────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name:  'yearFounded',
          type:  'text',
          label: 'Year Founded',
        },
        {
          name:  'latestFundingRound',
          type:  'select',
          label: 'Latest Funding Round',
          options: [
            { label: 'Pre-seed',  value: 'Pre-seed'  },
            { label: 'Seed',      value: 'Seed'      },
            { label: 'Series A',  value: 'Series A'  },
            { label: 'Series B',  value: 'Series B'  },
            { label: 'Series C+', value: 'Series C+' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name:  'totalAmountRaised',
          type:  'select',
          label: 'Total Amount Raised',
          options: [
            { label: '$0 to $500k',  value: '$0 to $500k'  },
            { label: '$500k to $1M', value: '$500k to $1M' },
            { label: '$1M to $2.5M', value: '$1M to $2.5M' },
            { label: '$2.5M to $5M', value: '$2.5M to $5M' },
            { label: '$5M to $7.5M', value: '$5M to $7.5M' },
            { label: '$7.5M+',       value: '$7.5M+'       },
          ],
        },
        {
          name:  'teamSize',
          type:  'select',
          label: 'Team Size',
          options: [
            { label: '1 to 5',    value: '1 to 5'    },
            { label: '6 to 10',   value: '6 to 10'   },
            { label: '11 to 20',  value: '11 to 20'  },
            { label: '21 to 50',  value: '21 to 50'  },
            { label: '51 to 100', value: '51 to 100' },
            { label: '101+',      value: '101+'      },
          ],
        },
      ],
    },
    {
      name:  'useCase',
      type:  'text',
      label: 'Use Case',
      admin: {
        description: 'What the applicant plans to use Fethr for.',
      },
    },

    // ── Review ───────────────────────────────────────────────────────────────
    {
      name:         'status',
      type:         'select',
      label:        'Status',
      defaultValue: 'new',
      options: [
        { label: 'New',      value: 'new'      },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name:  'notes',
      type:  'textarea',
      label: 'Internal Notes',
      admin: {
        position:    'sidebar',
        description: 'Internal notes visible only to the team.',
      },
    },
  ],
}
