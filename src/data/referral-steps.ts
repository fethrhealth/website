/**
 * Steps for the "Referral Process" section.
 *
 * Images → /public/assets/images/referral/step-[n].webp
 * Recommended size: 370×80 px
 *
 * Usage:
 *   <ReferralProcessSection steps={REFERRAL_STEPS} />
 */

export interface ProcessStep {
  /** Path to the decorative image from /public */
  imageSrc: string
  /** Number + title, e.g. "1. Share your unique link" */
  title: string
  description: string
}

export const REFERRAL_STEPS: ProcessStep[] = [
  {
    imageSrc: '/assets/images/referral/step-1.webp',
    title: '1. Make a warm introduction',
    description:
      'Introduce a healthcare organization to Fethr via email, warm intro, or your referral link. No sales work required — just the introduction.',
  },
  {
    imageSrc: '/assets/images/referral/step-2.webp',
    title: '2. They sign an engagement',
    description:
      'When your referral signs a paid services agreement with Fethr within 365 days, it becomes a Qualifying Referral.',
  },
  {
    imageSrc: '/assets/images/referral/step-3.webp',
    title: '3. Earn 10% for 3 years',
    description:
      'Receive 10% of the annual engagement revenue, paid quarterly, for 3 full years. No cap on deal size or number of referrals.',
  },
]
