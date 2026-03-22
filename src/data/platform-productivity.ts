import type { FeatureCardItem } from '@/data/feature-cards'
import { AccordionItem } from './rewards'

/**
 * Productivity page data.
 * Icons → /public/assets/icons/productivity/[name].webp
 */







export const PRODUCTIVITY_FEATURES: FeatureCardItem[] = [
  {
    iconSrc: '/assets/icons/productivity/key.webp',
      label: 'Permission controls',
      description:
        'Adjust permissions to manage access to objects, lists, dashboards, and more.',
    },
    {
      iconSrc: '/assets/icons/productivity/folder.webp',
      label: 'File sharing',
      description:
        'Share the most important customer documents so that your team is always on the same page.',
    },
    {
      iconSrc: '/assets/icons/productivity/note-template.webp',
      label: 'Real-time notes',
      description:
        'Stop dreading the note-taking process with effortless, real-time collaboration with your teammates.',
    },
    {
      iconSrc: '/assets/icons/productivity/check-square-plus.webp',
      label: 'Task management',
      description:
        "Fethr's natural language task manager ensures your team will work as one single, coordinated unit.",
    },
    {
      iconSrc: '/assets/icons/productivity/webhooks.webp',
      label: 'APIs and webhooks',
      description: 'Get creative by integrating the APIs and webhooks you need to enhance your work.',
      linkLabel: 'Developer docs',
      linkHref: '/platform/developers',
    },
    {
      iconSrc: '/assets/icons/productivity/browser-extension.webp',
      label: 'Browser extension',
      description:
        'Import people and company records from X, Google Meets, and the web with just one click.',
      linkLabel: 'Download',
      linkHref: 'https://chromewebstore.google.com',
      linkExternal: true,
  },
]

export const STAY_IN_THE_FLOW: AccordionItem[] = [
  {
    title: 'Bring in data from everywhere.',
    description: 'Add leads from X, Google Meets, and more with just a single click.',
    imageSrc: '/assets/images/platform/productivity/flow/bring-data.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Run workflows anywhere on the web.',
    description: 'Run your automations on leads from anywhere on the web.',
    imageSrc: '/assets/images/platform/productivity/flow/run-workflows.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Understand context for every lead and prospect.',
    description: 'See all the relevant data about your customer as you interact with them.',
    imageSrc: '/assets/images/platform/productivity/flow/understand-context.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]


