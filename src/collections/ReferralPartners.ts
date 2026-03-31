import type { CollectionConfig } from 'payload'

/**
 * ReferralPartners collection — stores referral partner applications.
 *
 * Access:
 *   create — public (unauthenticated form submission)
 *   read / update / delete — authenticated admins only
 */
export const ReferralPartners: CollectionConfig = {
  slug: 'referral-partners',
  labels: {
    singular: 'Referral Partner',
    plural:   'Referral Partners',
  },
  admin: {
    useAsTitle:     'email',
    defaultColumns: ['firstName', 'lastName', 'company', 'email', 'status', 'createdAt'],
    description:    'Referral partner applications submitted via the website.',
  },
  timestamps: true,
  access: {
    create: () => true,
    read:   ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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
      name:     'email',
      type:     'email',
      required: true,
      label:    'Email',
    },
    {
      name:  'phone',
      type:  'text',
      label: 'Phone Number',
    },
    {
      name:     'company',
      type:     'text',
      required: true,
      label:    'Company / Organization',
    },
    {
      name:  'jobTitle',
      type:  'text',
      label: 'Job Title',
    },
    {
      name:  'linkedIn',
      type:  'text',
      label: 'LinkedIn Profile',
      admin: {
        description: 'LinkedIn profile URL.',
      },
    },
    {
      name:  'region',
      type:  'select',
      label: 'Region',
      required: true,
      options: [
        { label: 'North America', value: 'North America' },
        { label: 'Europe',        value: 'Europe'        },
        { label: 'Rest of World', value: 'Rest of World' },
      ],
    },
    {
      name:  'healthcareNetwork',
      type:  'select',
      label: 'Healthcare Network',
      admin: {
        description: 'Primary area of healthcare expertise.',
      },
      options: [
        { label: 'Health Systems',    value: 'Health Systems'    },
        { label: 'Health IT Vendors', value: 'Health IT Vendors' },
        { label: 'Consulting',        value: 'Consulting'        },
        { label: 'Other',             value: 'Other'             },
      ],
    },
    {
      name:  'referralSource',
      type:  'text',
      label: 'How did you hear about us?',
    },
    {
      name:  'message',
      type:  'textarea',
      label: 'Message',
      admin: {
        description: 'Any additional information from the applicant.',
      },
    },
    {
      name:         'status',
      type:         'select',
      label:        'Status',
      defaultValue: 'new',
      options: [
        { label: 'New',       value: 'new'       },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Active',    value: 'active'    },
        { label: 'Inactive',  value: 'inactive'  },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name:  'notes',
      type:  'textarea',
      label: 'Internal Notes',
      admin: {
        position:    'sidebar',
        description: 'Team notes — not visible to the partner.',
      },
    },
  ],
}
