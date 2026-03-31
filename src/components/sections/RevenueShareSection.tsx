'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EXAMPLES = [
  { engagement: '$15,000/yr',  annual: '$1,500/yr',  threeYear: '$4,500',   fiveReferrals: '$22,500'  },
  { engagement: '$25,000/yr',  annual: '$2,500/yr',  threeYear: '$7,500',   fiveReferrals: '$37,500'  },
  { engagement: '$50,000/yr',  annual: '$5,000/yr',  threeYear: '$15,000',  fiveReferrals: '$75,000'  },
  { engagement: '$100,000/yr', annual: '$10,000/yr', threeYear: '$30,000',  fiveReferrals: '$150,000' },
  { engagement: '$150,000/yr', annual: '$15,000/yr', threeYear: '$45,000',  fiveReferrals: '$225,000' },
] as const

export function RevenueShareSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref}>
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6 pt-16 lg:pt-24 xl:pt-32 pb-10 lg:pb-16 xl:pb-24">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* Header */}
            <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
              <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                  <div className="col-span-full">
                    <h2 className="text-pretty text-heading-responsive-md">
                      Revenue share{' '}
                      <span style={{ color: '#727b84' }}>examples.</span>
                    </h2>
                  </div>
                  <p className="col-span-full text-pretty text-lg lg:text-xl">
                    The more organizations you refer, the more you earn. No cap on deal size or number of referrals.
                  </p>
                </div>
              </div>
            </div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-default-stroke">
                    <th className="pb-3 pr-6 text-xs font-medium text-accent-foreground">Annual Engagement</th>
                    <th className="pb-3 pr-6 text-xs font-medium text-accent-foreground">Annual Referral Fee</th>
                    <th className="pb-3 pr-6 text-xs font-medium text-accent-foreground">3-Year Total</th>
                    <th className="pb-3 text-xs font-medium text-accent-foreground hidden md:table-cell">5 Referrals (3-Year)</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map((row, i) => (
                    <motion.tr
                      key={row.engagement}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                      className="border-b border-default-stroke"
                    >
                      <td className="py-4 pr-6 text-sm font-medium text-secondary-foreground">{row.engagement}</td>
                      <td className="py-4 pr-6 text-sm text-secondary-foreground">{row.annual}</td>
                      <td className="py-4 pr-6 text-sm text-secondary-foreground">{row.threeYear}</td>
                      <td className="py-4 text-sm font-semibold text-secondary-foreground hidden md:table-cell">{row.fiveReferrals}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 text-xs text-accent-foreground">
                All figures above are illustrative. Actual referral fees are calculated based on the executed engagement value.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
