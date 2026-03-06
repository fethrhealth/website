/**
 * Steps for the "Referral Process" section.
 *
 * Imágenes → /public/assets/images/referral/step-[n].webp
 * Tamaño recomendado: 370×80 px
 *
 * Uso:
 *   <ReferralProcessSection steps={REFERRAL_STEPS} />
 */

export interface ProcessStep {
  /** Ruta de la imagen decorativa desde /public */
  imageSrc: string
  /** Número + título, e.g. "1. Share your unique link" */
  title: string
  description: string
}

export const REFERRAL_STEPS: ProcessStep[] = [
  {
    imageSrc: '/assets/images/referral/step-1.webp',
    title: '1. Share your unique link',
    description:
      'Find more teams who need Fethr and give them 10% off their subscription with your unique link.',
  },
  {
    imageSrc: '/assets/images/referral/step-2.webp',
    title: '2. One billed seat = one point',
    description:
      'Earn points at the moment a referred account converts to a paid plan.',
  },
  {
    imageSrc: '/assets/images/referral/step-3.webp',
    title: '3. Earn exclusive rewards',
    description:
      'Use your points to redeem up to $2.5k in rewards, from exclusive Fethr merch to an Apple display.',
  },
]
