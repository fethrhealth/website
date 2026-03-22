import type { FeatureCardItem } from '@/data/feature-cards'
import { AccordionItem } from './rewards'
import { BentoItem } from './bento-grid'

/**
 * Productivity page data.
 * Icons → /public/assets/icons/productivity/[name].webp
 */





export const NEED_FOR_SPEED: AccordionItem[] = [
  {
    title: 'Blazingly fast.',
    description: 'Comb through all your records in milliseconds and see results in real-time.',
    imageSrc: '/assets/images/platform/productivity/need-for-speed/blazingly-fast.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Perform quick actions.',
    description: 'Create records, notes, and tasks, add items to lists, and draft emails with intuitive keyboard shortcuts.',
    imageSrc: '/assets/images/platform/productivity/need-for-speed/perform-quick-actions.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Search with natural language.',
    description: 'Find exactly what you\’re looking for using semantic language that just makes sense.',
    imageSrc: '/assets/images/platform/productivity/need-for-speed/search-with-natural-language.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]

export const NEED_FOR_SPEED_FEATURES: FeatureCardItem[] = [
    {
      iconSrc: '/assets/icons/productivity/need-for-speed/user.webp',
      label: 'Preview contacts',
      description:
        'Quickly get an overview of contacts directly from the command palette.',
  },
  {
    iconSrc: '/assets/icons/productivity/need-for-speed/connection.webp',
    label: 'Find connection strengths',
    description:
      'Understand the strength of each and every connection at a glance.',
  },
  {
    iconSrc: '/assets/icons/productivity/need-for-speed/file-ai.webp',
    label: 'See event information',
    description:
      'Pre-populated info for each important event you have coming up.',
  },
]


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


export const COLLABORATE_WITH_COMMENTS: BentoItem[] = [
  {
    columns: 6,                                                                                                                                                                                          
    title: 'Add comments anywhere.',                                                                                                                                                     
    description: 'Make sure your teammates always have the right context for any workflow they’re collaborating on.',
    imageSrc: '/assets/images/platform/productivity/add-comments.webp',
    imageSrcMobile: '/assets/images/platform/productivity/add-comments-mobile.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
  {
    columns: 4,
    title: 'Thread commenting.',
    description: "Have better discussions by creating intuitive threads around single comments.",
    imageSrc: '/assets/images/platform/productivity/thread-commenting.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/productivity/thread-commenting-mobile.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 10,
    layout: 'inline',
    title: 'Comment history.',
    description: "Combine visualizations to instantly understand the full story and make better business decisions.",
    imageSrc: '/assets/images/platform/productivity/comment-history.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/productivity/comment-history-mobile.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
]
