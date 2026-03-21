import type { Metadata } from 'next'
import { RedefineHeroSection } from '@/components/sections/RedefineHeroSection'
import { RedefineManifestoSection } from '@/components/sections/RedefineManifestoSection'

export const metadata: Metadata = {
  title: 'Redefine',
  description: 'A new vision for healthcare relationship management. Read our manifesto.',
}

/**
 * Redefine page — /redefine
 * No footer (suppressed via ClientFooter in site layout).
 */
export default function RedefinePage(): React.ReactElement {
  return (
    <main className='container relative flex flex-col items-center'>
      <RedefineHeroSection />
      <RedefineManifestoSection />
    </main>
  )
}
