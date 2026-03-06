import Image from 'next/image'
import { REFERRAL_STEPS, type ProcessStep } from '@/data/referral-steps'

// ─── Single step card ─────────────────────────────────────────────────────────

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <div>
      <Image
        src={step.imageSrc}
        alt=""
        width={370}
        height={80}
        className="rounded-3xl"
      />
      <div className="mt-10 text-secondary-foreground">
        <div className="mr-5">
          <div className="font-semibold text-lg">{step.title}</div>
          <div className="mt-2.5">{step.description}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ReferralProcessSection({
  headingBold = 'Our referral',
  headingMuted = 'process.',
  subheading = 'Participate in our referral program in just a few steps.',
  steps = REFERRAL_STEPS,
}: {
  headingBold?: string
  headingMuted?: string
  subheading?: string
  steps?: ProcessStep[]
}) {
  return (
    <section>
      <div className="container">
        <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pt-16 lg:pt-24 xl:pt-32 pb-10 lg:pb-16 xl:pb-24">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* Header */}
            <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
              <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                  <div className="col-span-full">
                    <h2 className="text-pretty text-heading-responsive-md">
                      {headingBold}{' '}
                      <span style={{ color: '#727b84' }}>{headingMuted}</span>
                    </h2>
                  </div>
                  <p className="col-span-full text-pretty text-lg lg:text-xl">
                    {subheading}
                  </p>
                </div>
              </div>
            </div>

            {/* Steps grid — 1 col → 2 col (md) → 3 col (lg) */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <StepCard key={step.title} step={step} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
