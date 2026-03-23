import { NumberedGridItem } from "@/components/sections/FeatureGridSection";
import { EmailSequenceDiagram } from '@/components/ui/EmailSequenceDiagram'

export const INTERACTION_ITEMS: NumberedGridItem[] = [
  {
    kind: 'numbered',
    number: '[01]',
    image: '/assets/images/platform/sequences/interaction/track-the-journey.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'Track the journey.',
    description: 'See who progresses through each step.',
  },
  {
    kind: 'numbered',
    number: '[02]',
    image: '/assets/images/platform/sequences/interaction/performance.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'Performance..',
    description: 'Track engagement to exit in one glance.',
  },
  {
    kind: 'numbered',
    number: '[03]',
    image: '/assets/images/platform/sequences/interaction/one-click-control.webp',
    imageWidth: 800,
    imageHeight: 480,
    title: 'One-click control.',
    description: 'Pause, revive, or remove recipients with one click.',
  },
  {
    kind: 'numbered',
    number: '[04]',
    visual: EmailSequenceDiagram,
    title: 'Smart sending.',
    description: 'Land in their inbox when they\'re ready.',
  }
]

