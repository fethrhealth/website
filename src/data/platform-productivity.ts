import type { FeatureCardItem } from '@/data/feature-cards'
import { AccordionItem } from './rewards'
import { BentoItem } from './bento-grid'

/**
 * Productivity page data.
 * Icons → /public/assets/icons/productivity/[name].webp
 */

export const BENTO_INTELLIGENT_CALLS: BentoItem[] = [
  {
    columns: 4,                                                                                                                                                                                          
    title: 'Everything in one place.',                                                                                                                                                     
    description: 'Your customer calls live where they should — in your CRM, not scattered across tools.',
    imageSrc: '/assets/images/platform/productivity/intelligent-calls/everything-in-one-place.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
  {
    columns: 6,
    title: 'Personalize your insights.',
    description: "From discovery calls to product feedback, build personalized templates to capture the insights you need, how you need it.",
    imageSrc: '/assets/images/platform/productivity/intelligent-calls/personalize-your-insights.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/productivity/intelligent-calls/personalize-your-insights.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 10,
    layout: 'inline',
    title: 'Real-time intelligence during conversations.',
    description: "Let AI surface insights during your calls while you focus on building the relationship.",
    imageSrc: '/assets/images/platform/productivity/intelligent-calls/real-time-intelligence.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/productivity/intelligent-calls/real-time-intelligence.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 6,
    title: 'Personalize your insights.',
    description: "From discovery calls to product feedback, build personalized templates to capture the insights you need, how you need it.",
    imageSrc: '/assets/images/platform/productivity/intelligent-calls/review-your-way.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/productivity/intelligent-calls/review-your-way.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 4,                                                                                                                                                                                          
    title: 'Everything in one place.',                                                                                                                                                     
    description: 'Your customer calls live where they should — in your CRM, not scattered across tools.',
    imageSrc: '/assets/images/platform/productivity/intelligent-calls/works-where-you-do.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
]

export const SAME_TEAM_SAME_PAGE: AccordionItem[] = [
  {
    title: 'Create templates.',
    description: 'Streamline everything from sales calls to customer check-ins and more with custom templates.',
    imageSrc: '/assets/images/platform/productivity/same-team/create-templates.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Watch your teammates type.',
    description: 'Have a conversation, spitball and share ideas. All in the same note, all in real-time.',
    imageSrc: '/assets/images/platform/productivity/same-team/teammates-type.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Link with your calendar.',
    description: 'Attach your notes to upcoming events to instantly provide context.',
    imageSrc: '/assets/images/platform/productivity/same-team/calendar-link.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Collaborate anywhere you go.',
    description: 'Create, edit, and get all the context you need with mobile notes.',
    imageSrc: '/assets/images/platform/productivity/same-team/collaborate-anywhere.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]

export const BENTO_EMAIL_RELEVANT: BentoItem[] = [
  {
    columns: 4,                                                                                                                                                                                          
    title: 'Automated, personalized outreach.',                                                                                                                                                     
    description: 'Pull attributes and enriched data with variables and make your email feel personal, even at scale.',
    imageSrc: '/assets/images/platform/productivity/email-relevant/automated.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
  {
    columns: 6,
    title: 'Email templates.',
    description: "Streamline outreach for your entire team with custom templates built for any situation.",
    imageSrc: '/assets/images/platform/productivity/email-relevant/email-templates.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/reporting/reporting-engine/customize-reports.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 10,
    layout: 'inline',
    title: 'Send emails at scale.',
    description: "Send personalized emails to everyone all at once, without missing a beat.",
    imageSrc: '/assets/images/platform/productivity/email-relevant/emails-at-scale.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/reporting/reporting-engine/customize-reports.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
]

export const EMAIL_RELEVANT: FeatureCardItem[] = [
  {
    iconSrc: '/assets/icons/productivity/email-relevant/rich-text.webp',
    label: 'Rich text formatting',
    description:
      'Create emails as elegant as they are effective with painless formatting.',
},
{
  iconSrc: '/assets/icons/productivity/email-relevant/clip.webp',
  label: 'Add attachments',
  description:
    'Attach files to emails directly within Attio with just a single click.',
},
{
  iconSrc: '/assets/icons/productivity/email-relevant/share.webp',
  label: 'Easily shared',
  description:
    'Share entire email threads with your team, with just a link.',
},
]


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
    imageSrc: '/assets/images/platform/reporting/data-exploration/group-your-way.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Run workflows anywhere on the web.',
    description: 'Run your automations on leads from anywhere on the web.',
    imageSrc: '/assets/images/platform/reporting/data-exploration/set-better-targets.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Understand context for every lead and prospect.',
    description: 'See all the relevant data about your customer as you interact with them.',
    imageSrc: '/assets/images/platform/reporting/data-exploration/historical-data.webp',
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
    imageWidth: 1472, imageHeight: 1008,
  },
  {
    columns: 4,
    title: 'Thread commenting.',
    description: "Have better discussions by creating intuitive threads around single comments.",
    imageSrc: '/assets/images/platform/productivity/thread-commenting.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/reporting/reporting-engine/customize-reports.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 10,
    layout: 'inline',
    title: 'Comment history.',
    description: "Combine visualizations to instantly understand the full story and make better business decisions.",
    imageSrc: '/assets/images/platform/productivity/comment-history.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/reporting/reporting-engine/customize-reports.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
]
