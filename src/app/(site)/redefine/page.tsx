import { RedefineHeroSection } from '@/components/sections/RedefineHeroSection'
import { RedefineManifestoSection } from '@/components/sections/RedefineManifestoSection'

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
