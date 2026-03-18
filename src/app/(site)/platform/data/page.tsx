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
import { DATA_ENRICHMENT_ITEMS, DATA_GRID_ITEMS, DATA_GRID_QUOTE, DATA_SOURCES_ITEMS } from '@/data/platform-data'

/**
 * Data page — /platform/data
 */
export default function DataPage(): React.ReactElement {
  return (
    <main>
      <DataHeroSection />
      <Divider />
      <FeatureGridSection
        heading='Blazingly fast, amazingly flexible.'
        subheading='Create the exact data model your business needs with custom objects.'
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
        heading="Automatic enrichment, automatic advantage."
        subheading="Get the context you need for every prospect, automatically drawn from 100s of sources and pre-analyzed by AI."
        items={DATA_ENRICHMENT_ITEMS}
      />
      <Divider/>
      <ScrollAccordionSection
        heading='Unify your data sources.'
        subheading='Draw on all your business, customer and product data to supercharge your GTM team’s efforts.'
        items={ DATA_SOURCES_ITEMS }
      />
      <FeatureTabsSection {...DATA_PAGE_TABS} />
      <Divider/>
      <PlatformNavSection currentHref="/platform/data" />
      <Divider/>
      <TrialSection />
    </main>
  )
}
