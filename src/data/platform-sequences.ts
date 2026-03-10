import { NumberedGridItem } from "@/components/sections/FeatureGridSection";
import { ScrollAccordionItem } from "@/components/sections/ScrollAccordionSection";
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

export const HANDWRITTEN_WARMTH_ITEMS: ScrollAccordionItem[] = [
    {
      title: 'Customer details, auto-filled.',
      description: 'Drop in first names, renewal dates, or any field so each contact gets what’s most relevant.',
      image: '/assets/images/platform/sequences/handwritten-warmth/customer-details.webp',
      imageWidth: 2264,
      imageHeight: 2080,
    },
    {
      title: 'AI assist.',
      description: 'Need a hand? AI riffs the perfect phrase for every message.',
      image: '/assets/images/platform/sequences/handwritten-warmth/ai-assist.webp',
      imageWidth: 2264,
      imageHeight: 2080,
    },
    {
      title: 'Live accuracy.',
      description: 'Field updates flow straight into drafts, keeping the important details like numbers and dates spot-on.',
      image: '/assets/images/platform/sequences/handwritten-warmth/live-accuracy.webp',
      imageWidth: 2264,
      imageHeight: 2080,
    },
  ]