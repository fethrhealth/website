import type { CollectionConfig } from 'payload'

/**
 * TelemetryEvents collection — stores real-time UI telemetry from orchestration
 * engine installations (page views, editor actions, auth events, etc.).
 *
 * Access:
 *   create — public (orchestration engine posts without auth)
 *   read / update / delete — authenticated admins only
 */
export const TelemetryEvents: CollectionConfig = {
  slug: 'telemetry-events',
  labels: {
    singular: 'Telemetry Event',
    plural:   'Telemetry Events',
  },
  admin: {
    useAsTitle:     'eventType',
    defaultColumns: ['eventType', 'instanceId', 'userId', 'status', 'createdAt'],
    description:    'Real-time UI events from orchestration engine installations.',
  },
  timestamps: true,
  access: {
    create: () => true,                            // public
    read:   ({ req: { user } }) => Boolean(user),  // admins only
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name:     'eventType',
          type:     'text',
          required: true,
          label:    'Event Type',
          admin: {
            description: 'The event type (e.g. PAGE, EDITOR_TAB_ACTION, ossauth, setup_flow:*).',
          },
        },
        {
          name:     'instanceId',
          type:     'text',
          required: true,
          label:    'Instance ID',
          admin: {
            description: 'The unique instance UUID of the orchestration engine installation.',
          },
        },
      ],
    },
    {
      name:  'userId',
      type:  'text',
      label: 'User ID',
      admin: {
        description: 'The browser-generated user ID (uid from localStorage).',
      },
    },
    {
      name:     'eventData',
      type:     'json',
      required: true,
      label:    'Event Data',
      admin: {
        description: 'Full event payload as received from the orchestration engine.',
      },
    },
    {
      name:         'status',
      type:         'select',
      label:        'Status',
      defaultValue: 'new',
      options: [
        { label: 'New',       value: 'new'       },
        { label: 'Processed', value: 'processed'  },
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
