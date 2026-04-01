import type { CollectionConfig } from 'payload'

/**
 * ServerReports collection — stores scheduled backend telemetry reports from
 * orchestration engine installations (feature usage, service usage, plugin
 * usage, system information).
 *
 * Access:
 *   create — public (orchestration engine posts without auth)
 *   read / update / delete — authenticated admins only
 */
export const ServerReports: CollectionConfig = {
  slug: 'server-reports',
  labels: {
    singular: 'Server Report',
    plural:   'Server Reports',
  },
  admin: {
    useAsTitle:     'reportType',
    defaultColumns: ['reportType', 'instanceId', 'serverType', 'serverVersion', 'status', 'createdAt'],
    description:    'Scheduled backend reports from orchestration engine installations.',
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
          name:     'reportType',
          type:     'text',
          required: true,
          label:    'Report Type',
          admin: {
            description: 'The type of report (usage, system_information, plugin_metrics, service_usage, plugin_usage).',
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
      type: 'row',
      fields: [
        {
          name:  'sessionId',
          type:  'text',
          label: 'Session ID',
          admin: {
            description: 'The session UUID (generated on each server startup).',
          },
        },
        {
          name:  'serverType',
          type:  'text',
          label: 'Server Type',
          admin: {
            description: 'STANDALONE, EXECUTOR, SCHEDULER, or WORKER.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name:  'serverVersion',
          type:  'text',
          label: 'Server Version',
          admin: {
            description: 'The Kestra version of the reporting instance.',
          },
        },
        {
          name:  'zoneId',
          type:  'text',
          label: 'Timezone',
          admin: {
            description: 'The system timezone of the reporting instance.',
          },
        },
      ],
    },
    {
      name:  'reportedAt',
      type:  'date',
      label: 'Reported At',
      admin: {
        description: 'When the report was generated on the source instance.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name:     'payload',
      type:     'json',
      required: true,
      label:    'Payload',
      admin: {
        description: 'Full report payload as received from the orchestration engine.',
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
