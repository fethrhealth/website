/**
 * Central type definitions for Fethr Health website.
 * All shared interfaces and types live here.
 */

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

// ---------------------------------------------------------------------------
// Blog / CMS
// ---------------------------------------------------------------------------

export interface BlogPost {
  id: string
  title: string
  slug: string
  author?: string
  authorRole?: string
  publishDate?: string
  category?: string
  excerpt?: string
  content?: unknown // Payload lexical rich text — typed at point of use
  featuredImage?: MediaItem
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface LegalPage {
  id: string
  title: string
  slug: string
  subtitle?: string
  lastUpdated?: string
  order?: number
  content?: unknown // Payload lexical rich text
  createdAt: string
  updatedAt: string
}

export interface MediaItem {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
}

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number | boolean>
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export interface DemoRequestFormData {
  name: string
  email: string
  company: string
  teamSize?: string
  message?: string
}

// ---------------------------------------------------------------------------
// Marketing / UI
// ---------------------------------------------------------------------------

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatarUrl?: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  highlighted?: boolean
}
