'use client'

import { ReferralPartnerDialog } from '@/components/ui/ReferralPartnerDialog'

export function ReferHeroCta() {
  return (
    <div className="container">
      <div className="flex justify-center pt-6 pb-10 lg:pb-16 xl:pb-24">
        <ReferralPartnerDialog
          className="button-primary relative inline-flex cursor-pointer items-center justify-center rounded-[10px] px-3 text-sm h-9 max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base"
          label="Become a referral partner"
        />
      </div>
    </div>
  )
}
