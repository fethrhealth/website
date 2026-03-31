import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts'
import { PageViewTracker } from '@/components/analytics/PageViewTracker'

// Self-hosted fonts extracted from attio.com — pixel-perfect match.
// Files live in public/fonts/ (keep out of git if font license requires it).

const inter = localFont({
  src: [
    { path: '../../../public/fonts/inter_regular.woff2',  weight: '400', style: 'normal' },
    { path: '../../../public/fonts/inter_medium.woff2',   weight: '500', style: 'normal' },
    { path: '../../../public/fonts/inter_semibold.woff2', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/inter_bold.woff2',     weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const interDisplay = localFont({
  src: [
    { path: '../../../public/fonts/inter_display_medium.woff2',   weight: '500', style: 'normal' },
    { path: '../../../public/fonts/inter_display_semibold.woff2', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/inter_display_bold.woff2',     weight: '700', style: 'normal' },
  ],
  variable: '--font-inter-display',
  display: 'swap',
})

const tiempos = localFont({
  src: [
    { path: '../../../public/fonts/tiempos_text_regular.woff2',        weight: '400', style: 'normal' },
    { path: '../../../public/fonts/tiempos_text_regular_italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-tiempos-text',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Fethr, Intelligent Healthcare Automation Platform',
    template: '%s | Fethr Health',
  },
  description: 'AI-powered healthcare automation platform. Connect to any EHR system. Transform, validate, and orchestrate healthcare data.',
  keywords: ['healthcare', 'integration', 'AI', 'automation', 'health technology', 'EHR', 'FHIR', 'HL7', 'interoperability'],
  authors: [{ name: 'Fethr' }],
  creator: 'Fethr',
  publisher: 'Fethr',
  robots: 'index, follow',
  metadataBase: new URL('https://www.fethrhealth.com'),
  openGraph: {
    title: 'Fethr, Intelligent Healthcare Automation Platform',
    description: 'AI-powered healthcare automation platform. Connect to any EHR system. Transform, validate, and orchestrate healthcare data.',
    url: 'https://www.fethrhealth.com',
    siteName: 'Fethr Health',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fethr Health - Intelligent Healthcare Automation Platform',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fethr, Intelligent Healthcare Automation Platform',
    description: 'AI-powered healthcare automation platform. Connect to any EHR system. Transform, validate, and orchestrate healthcare data.',
    images: ['/og-image.png'],
    creator: '@fethrhealth',
  },
}

export default function SiteLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} ${tiempos.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <AnalyticsScripts />
        <PageViewTracker />
        <Navbar />
        <main className="pt-[60px]">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}
