import type { Metadata } from 'next'
import { DataContextSection } from '@/components/sections/DataContextSection'
import { DataHeroSection } from '@/components/sections/DataHeroSection'
import { EnrichmentSection } from '@/components/sections/EnrichmentSection'
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'
import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'
import { PlatformNavSection } from '@/components/sections/PlatformNavSection'
import { ScrollAccordionSection } from '@/components/sections/ScrollAccordionSection'
import TrialSection from '@/components/sections/TrialSection'
import Divider from '@/components/ui/divider'
import { DATA_PAGE_TABS } from '@/data/feature-tabs'
import { DATA_GRID_HEADING, DATA_GRID_SUBHEADING, DATA_GRID_ITEMS, DATA_GRID_QUOTE } from '@/data/data-grid-section'
import { DATA_ENRICHMENT_HEADING, DATA_ENRICHMENT_SUBHEADING, DATA_ENRICHMENT_ITEMS } from '@/data/data-enrichment'
import { DATA_ACCORDION_HEADING, DATA_ACCORDION_SUBHEADING, DATA_ACCORDION_ITEMS } from '@/data/data-accordion'

export const metadata: Metadata = {
  title: 'Data',
  description: 'Your healthcare data, structured and enriched. Keep every record accurate, complete, and ready to act on.',
}

/**
 * Data page — /platform/data
 */
export default function DataPage(): React.ReactElement {
  return (
    <main>
      <DataHeroSection />
      <Divider />
      <FeatureGridSection
        heading={DATA_GRID_HEADING}
        subheading={DATA_GRID_SUBHEADING}
        cols={2}
        background='dots'
        rules='dashed'
        guideLines
        items={DATA_GRID_ITEMS}
        quote={DATA_GRID_QUOTE}
      />
      <Divider/>
      <DataContextSection />
      <EnrichmentSection
        heading={DATA_ENRICHMENT_HEADING}
        subheading={DATA_ENRICHMENT_SUBHEADING}
        items={DATA_ENRICHMENT_ITEMS}
      />
      <Divider/>
      <ScrollAccordionSection
        heading={DATA_ACCORDION_HEADING}
        subheading={DATA_ACCORDION_SUBHEADING}
        items={DATA_ACCORDION_ITEMS}
      />
      <FeatureTabsSection {...DATA_PAGE_TABS} />
      <Divider/>
      <PlatformNavSection currentHref="/platform/data" />
      <Divider/>
      <TrialSection headingLayout='inline' source='data' />
    </main>
  )
}
