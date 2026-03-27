# Fethr Health Website

Pixel-perfect clone of attio.com. Next.js 15 App Router + Payload CMS + Tailwind CSS.

## Commands

```bash
npm run dev              # local dev server (http://localhost:3000)
npm run build            # payload migrate && next build
npm run start            # production server
npm run payload          # Payload CLI
npm run generate:types   # auto-generate TS types from CMS collections
```

## Tech Stack

- **Framework:** Next.js 15.4 (App Router, React Server Components)
- **Language:** TypeScript 5.9 (strict mode — see gotchas below)
- **Styling:** Tailwind CSS 3.4 + custom design system tokens
- **Components:** shadcn/ui (Radix primitives) + Lucide icons
- **CMS:** Payload CMS 3.78 (PostgreSQL + Vercel Blob storage)
- **Animation:** Framer Motion 12
- **Forms:** React Hook Form + Zod validation
- **Analytics:** GA4 + Meta Pixel + LinkedIn (abstracted via `useAnalytics` hook)

## Project Structure

```
src/
├── app/
│   ├── (site)/              # Public pages (home, blog, platform/*, legal/*)
│   ├── (payload)/           # CMS admin panel (/admin)
│   └── api/                 # API routes (demo-request, talk-to-sales, startup-application)
├── components/
│   ├── sections/            # Page section components (44 files)
│   ├── layout/              # Navbar, Footer, FooterWrapper
│   ├── ui/                  # shadcn/ui primitives + custom (DemoRequestForm, TalkToSalesDialog)
│   ├── icons/               # SVG icon components per feature area
│   ├── analytics/           # AnalyticsScripts, PageViewTracker
│   ├── blog/                # Blog-specific components
│   ├── legal/               # Legal page components
│   └── illustrations/       # Decorative SVG components
├── data/                    # All hardcoded page copy/content (79 files)
├── collections/             # Payload CMS collection configs (BlogPosts, DemoRequests, etc.)
├── lib/                     # utils.ts (cn()), analytics.ts (useAnalytics), lexical.tsx
├── types/                   # Centralized type definitions
└── styles/                  # globals.css (includes hacker mode overrides)
```

## Key Architecture Decisions

- **Content lives in `src/data/`** — marketing page copy is hardcoded in data files, not in components. Blog content uses Payload CMS. Edit data files for copy changes.
- **No global state management** — local React hooks only. No Redux/Zustand/Context.
- **Server Components by default** — only `"use client"` where needed (forms, animations, analytics).
- **Form submission flow:** React Hook Form → POST to `/api/{form}/route.ts` → Payload CMS collection create.
- **Blog uses ISR** with `revalidate = 60`.

## Import Conventions

```tsx
// Always use @/ alias (maps to ./src/)
import { HomeHeroSection } from '@/components/sections/HomeHeroSection'
import { cn } from '@/lib/utils'
import { HERO_HEADING } from '@/data/home-hero'
import type { BentoItem } from '@/types'
```

- **No barrel exports** — import directly from source files
- **@payload-config** alias points to root `payload.config.ts`

## Naming Conventions

| Category | Pattern | Example |
|----------|---------|---------|
| Components | PascalCase `.tsx` | `HomeHeroSection.tsx` |
| Data files | kebab-case `.ts` | `home-hero.ts`, `workflows-email.ts` |
| Collections | PascalCase `.ts` | `BlogPosts.ts`, `DemoRequests.ts` |
| Constants | UPPER_SNAKE_CASE | `HERO_HEADING`, `NAV_MENU` |
| Hooks | camelCase `use` prefix | `useAnalytics()` |
| Utils | camelCase | `cn()`, `fireGA4()` |

## TypeScript Gotchas

Strict mode is fully on with extra strictness:
- `noUncheckedIndexedAccess` — array/object index access returns `T | undefined`
- `noImplicitReturns` — all code paths must return
- `noFallthroughCasesInSwitch` — no implicit fallthrough
- `forceConsistentCasingInFileNames` — case-sensitive imports

## Design System Notes

The Tailwind config has a precise design system cloned from Attio:
- **Container:** 100% @ sm, 624px @ md, 1440px @ lg+
- **Fonts:** Inter (sans), Inter Display, Tiempos (serif), JetBrains Mono
- **Colors:** Semantic tokens (background, surface, stroke, text) with light/dark variants + brand colors
- **Custom spacing:** non-standard values like 3.25, 6.5, 7.5, 13, 15, 18, 25, 30, etc.
- **Dark mode:** `class` strategy (manual toggle)

## Hacker Mode

A green terminal theme activated by `data-hacker="true"` on `<html>`. Used on `/platform/developers`. Overrides are in `globals.css` using `[data-hacker]` selectors. The Tailwind config has a custom `hacker` variant.

## Environment Variables

```bash
DATABASE_URI=postgresql://...        # PostgreSQL connection
PAYLOAD_SECRET=<openssl rand -base64 32>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX      # optional
NEXT_PUBLIC_META_PIXEL_ID=...        # optional
NEXT_PUBLIC_LINKEDIN_ID=...          # optional
BLOB_READ_WRITE_TOKEN=...           # auto-injected by Vercel
```

## Deployment

Hosted on Vercel. No test suite exists. No linter/formatter config files — rely on TypeScript strict mode for code quality.
