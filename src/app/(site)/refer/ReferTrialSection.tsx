'use client'

import TrialSection from '@/components/sections/TrialSection'
import { ReferralPartnerDialog } from '@/components/ui/ReferralPartnerDialog'

const BTN_BASE =
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap border' +
  ' transition-colors duration-300 ease-in-out' +
  ' disabled:pointer-events-none disabled:cursor-default' +
  ' h-9 gap-x-1.5 rounded-[10px] px-3 text-sm' +
  ' max-lg:h-11 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base'

export function ReferTrialSection() {
  return (
    <TrialSection
      source="refer"
      heading="Ready to join the"
      headingSerif="program?"
      showSales={false}
      showImageMobile
      customCta={
        <ReferralPartnerDialog
          className={`${BTN_BASE} button-primary max-md:hidden`}
          label="Become a referral partner"
        />
      }
    />
  )
}
