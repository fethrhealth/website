import type { ImageGridItem } from '@/data/image-grid'
import { AccordionItem } from './rewards'
import { BentoItem } from './bento-grid'


export const REPORTING_ENGINE: BentoItem[] = [
  {
    columns: 4,                                                                                                                                                                                          
    title: 'Drill down to the metrics that matter.',                                                                                                                                                     
    description: 'Analyze live data any way you like, from line charts and bar graphs to geospatial mapping.',
    imageSrc: '/assets/images/platform/reporting/reporting-engine/metrics-that-matter.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
  {
    columns: 6,
    title: 'Customize reports with unprecedented flexibility.',
    description: "Attio\’s powerful engine allows you to find whichever insights you\’re looking for.",
    imageSrc: '/assets/images/platform/reporting/reporting-engine/customize-reports.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/reporting/reporting-engine/customize-reports-mobile.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 6,
    title: 'Build powerful dashboards.',
    description: "Combine visualizations to instantly understand the full story and make better business decisions.",
    imageSrc: '/assets/images/platform/reporting/reporting-engine/build-powerful-dashboards.webp',
    imageWidth: 2416, imageHeight: 1008,
    imageSrcMobile: '/assets/images/platform/reporting/reporting-engine/build-powerful-dashboards-mobile.webp',
    imageMobileWidth: 1472, imageMobileHeight: 1008,
  },
  {
    columns: 4,                                                                                                                                                                                          
    title: 'Collaborate on the fly.',                                                                                                                                                     
    description: 'Work with your teammates to build the dashboards and reports you need in true real-time.',
    imageSrc: '/assets/images/platform/reporting/reporting-engine/collaborate-on-the-fly.webp',
    imageWidth: 1472, imageHeight: 1008,
  },
]

export const REPORTING_EXAMPLES: ImageGridItem[] = [
  {
    imageSrc: '/assets/images/platform/reporting/daily-workspace.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Daily workspace creations',
    title: 'Pass deals to Customer Success',
    description:
      'Stay on track and keep a close eye on workspace creations.',
  },
  {
    imageSrc: '/assets/images/platform/reporting/average-revenue.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Closed-won deal notification workflow',
    title: 'Average revenue per workspace',
    description:
      'Understand the revenue each workspace is generating.',
  },
  {
    imageSrc: '/assets/images/platform/reporting/number-of-users.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Closed won deal Slack message workflow',
    title: 'Number of users per workspace',
    description:
      'See how many users are active in each workspace in real-time.',
  },
  {
    imageSrc: '/assets/images/platform/reporting/monthly-recurring-revenue.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Won and lost deal summary workflow',
    title: 'Monthly recurring revenue',
    description:
      'Get a closer look at your MRR to figure out where you can improve.',
  },
  {
    imageSrc: '/assets/images/platform/reporting/customer-acquisition-cost.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Customer renewal date autofill workflow',
    title: 'Customer acquisition cost',
    description:
      'Analyze your CAC figures and shave them down as much as possible.',
  },
  {
    imageSrc: '/assets/images/platform/reporting/lead-channel-distribution.webp',
    imageWidth: 1920,
    imageHeight: 937,
    imageAlt: 'Stay on top of workflows',
    title: 'Lead channel distribution',
    description:
      'Discover which of your lead channels are most effective and reliable.',
  },
]

export const REPORTING_DATA_EXPLORATION: AccordionItem[] = [
  {
    title: 'Group your way.',
    description: 'Understand even the most complex data by categorizing, condensing, and manipulating data points in milliseconds.',
    imageSrc: '/assets/images/platform/reporting/data-exploration/group-your-way.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Set better targets.',
    description: 'Visualize results, gauge performance and drive sharper decision-making by setting data-driven goals.',
    imageSrc: '/assets/images/platform/reporting/data-exploration/set-better-targets.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Historical data.',
    description: 'Identify trends and patterns over time and set smarter benchmarks for the future.',
    imageSrc: '/assets/images/platform/reporting/data-exploration/historical-data.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
  {
    title: 'Drill down into your report data.',
    description: 'Explore the data points behind your reports, down to the most minute level.',
    imageSrc: '/assets/images/platform/reporting/data-exploration/your-report-data.webp',
    imageWidth: 2272,
    imageHeight: 1704,
  },
]
