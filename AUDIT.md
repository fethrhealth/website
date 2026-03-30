# Fethr Website — Code Quality, Security & Readability Audit

**Date:** 2026-03-26
**Codebase:** `C:\Code\fethr\website`
**Overall Score:** 6/10

---

## Table of Contents

1. [Security & Vulnerability Findings](#security--vulnerability-findings)
2. [Readability & Code Quality Findings](#readability--code-quality-findings)
3. [Scorecard](#scorecard)
4. [Priority Action Plan](#priority-action-plan)

---

## Security & Vulnerability Findings

### 🔴 Critical (3)

#### 1. No Rate Limiting on Any API Route
- **Files:**
  - `src/app/api/demo-request/route.ts`
  - `src/app/api/talk-to-sales/route.ts`
  - `src/app/api/startup-application/route.ts`
- **Issue:** All 3 endpoints accept unlimited submissions — enables spam, database flooding, and DoS against Payload CMS.
- **Fix:** Implement rate limiting using `@vercel/rate-limit`, `upstash/ratelimit`, or Next.js middleware. Consider IP-based throttling (e.g., 5 requests/hour per IP).

#### 2. No CSRF Protection
- **Files:** Same 3 API routes
- **Issue:** No CSRF token validation, no Origin/Referer header checks on POST requests. Any website can submit forms to these endpoints.
- **Fix:** Add CSRF token validation via Next.js middleware, or at minimum validate Origin/Referer headers match your domain.

#### 3. reCAPTCHA Claimed in UI but Never Verified Server-Side
- **Files:**
  - `src/components/ui/TalkToSalesDialog.tsx` (lines 336-342)
  - `src/components/sections/StartupApplicationSection.tsx` (lines 308-315)
- **Issue:** UI displays "This site is protected by reCAPTCHA" but no token is collected on the client or validated on the server. This is misleading to users and provides zero actual protection.
- **Fix:** Either implement full reCAPTCHA (collect token client-side, verify server-side via Google API) or remove the reCAPTCHA text from the UI.

---

### 🟠 High (4)

#### 4. No Input Length Validation
- **Files:**
  - `src/app/api/talk-to-sales/route.ts` (lines 27-40)
  - `src/app/api/startup-application/route.ts` (lines 27-55)
- **Issue:** Text fields (firstName, lastName, phone, details, useCase) have no max length. Attacker can submit megabyte-sized strings causing database bloat.
- **Fix:** Add max length checks (e.g., name: 100 chars, details: 5000 chars). Mirror limits in Payload CMS field config and client-side validation.

#### 5. Insufficient Input Sanitization
- **Files:** All 3 API routes
- **Issue:** Only `.trim()` and `.toLowerCase()` applied. No HTML stripping, no special character filtering. Stored data could contain HTML/JS that renders unsafely in the Payload admin panel.
- **Fix:** Use a sanitization library like `sanitize-html` or `xss`. Strip `<script>`, `<iframe>`, event handlers from all text inputs.

#### 6. Overly Permissive Collection Access Control
- **Files:**
  - `src/collections/DemoRequests.ts` (line 25)
  - `src/collections/SalesLeads.ts` (line 23)
  - `src/collections/StartupApplications.ts` (line 24)
- **Issue:** `create: () => true` allows completely unauthenticated writes from any origin. Combined with no rate limiting, this is an open door.
- **Fix:** Rate limit at the API route level before Payload is invoked. Consider adding IP logging and abuse tracking.

#### 7. Weak Email Validation
- **Files:**
  - `src/app/api/demo-request/route.ts` (line 6)
  - `src/app/api/talk-to-sales/route.ts` (line 5)
- **Issue:** Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` accepts invalid emails like `a@b.c`, `@@@.com`, and emails with consecutive dots.
- **Fix:** Use an RFC 5322-compliant validator or a library like `email-validator`. Consider adding email confirmation flow.

---

### 🟡 Medium (4)

#### 8. No Security Headers
- **Files:** No `middleware.ts` or headers config found anywhere
- **Issue:** Missing all standard security headers: CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Fix:** Create `middleware.ts` or add `headers()` to `next.config.ts`:
  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://snap.licdn.com
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Referrer-Policy: strict-origin-when-cross-origin
  ```

#### 9. Missing Environment Variable Validation
- **Files:**
  - `payload.config.ts` (lines 45, 49, 57)
  - `src/components/analytics/AnalyticsScripts.tsx` (lines 14-16)
- **Issue:** `PAYLOAD_SECRET ?? ''` falls back to empty string silently — disables session security without any warning. Same for `DATABASE_URI`.
- **Fix:** Validate critical env vars at startup. Throw if `PAYLOAD_SECRET` or `DATABASE_URI` are missing. Use zod for env validation.

#### 10. Analytics Scripts Without Subresource Integrity
- **Files:** `src/components/analytics/AnalyticsScripts.tsx` (lines 27-78)
- **Issue:** GA4, Meta Pixel, and LinkedIn scripts loaded without SRI hashes. If a vendor CDN is compromised, malicious code executes in user browsers.
- **Fix:** Add `integrity` attributes with SHA-384 hashes to all third-party `<Script>` tags.

#### 11. Fragile Dynamic Environment Variable Lookup
- **Files:** `src/lib/analytics.ts` (lines 115-118)
- **Issue:** `process.env[NEXT_PUBLIC_LINKEDIN_CONVERSION_${formName.toUpperCase()}]` — dynamic env var name construction is fragile, undocumented, and could silently fail.
- **Fix:** Replace with a static config object mapping form names to conversion IDs.

---

### 🟢 Low / Info (3)

#### 12. console.error in Production
- **Files:** `src/app/api/startup-application/route.ts` (lines 40, 59)
- **Issue:** Logs internal error details that could leak info in production logging systems.
- **Fix:** Use structured logging (winston/pino) with appropriate log levels. Redact sensitive data.

#### 13. Server Error Messages Passed to Client Unsanitized
- **Files:**
  - `src/components/ui/TalkToSalesDialog.tsx` (line 190)
  - `src/components/ui/DemoRequestForm.tsx` (line 196)
- **Issue:** `(await res.json().catch(() => ({}))) as { error?: string }` — error text from server displayed directly to users.
- **Fix:** Show generic error messages to users. Log actual errors server-side only.

#### 14. .env.local Properly Gitignored ✅
- **Files:** `.gitignore` (lines 13-15)
- **Status:** PASS — `.env` and `.env.local` are listed. No secrets committed to the repo.

---

## Readability & Code Quality Findings

### Monolith Components (7 files over 1,000 lines)

| Component | Lines | What to Extract |
|-----------|-------|-----------------|
| `src/components/sections/HomeAdaptiveModelVisual.tsx` | 1,858 | SVG sub-components, logo grid sections |
| `src/components/sections/ReportingHeroCards.tsx` | 1,843 | Individual card components, animation logic |
| `src/components/sections/HomeHeroSection.tsx` | 1,714 | MonitorContent, WorkflowsContent, AIContent, Sidebar |
| `src/components/sections/DataHeroSection.tsx` | 1,350 | Tab content panels, sidebar nav |
| `src/components/sections/DevelopersBuildYourWaySection.tsx` | 1,117 | Card sections, inline SVG illustrations |
| `src/components/sections/DevelopersCtaSection.tsx` | 1,105 | Animation panels, spring configs |
| `src/components/sections/DevelopersMcpSection.tsx` | 1,004 | Code examples, visual blocks |

**Target:** Break each down to 200-300 line sub-components.

---

### DRY Violations (3 patterns)

#### A. API Route Boilerplate (duplicated across 3 files)
- `src/app/api/demo-request/route.ts`
- `src/app/api/talk-to-sales/route.ts`
- `src/app/api/startup-application/route.ts`
- **What's duplicated:** Email regex definition, Payload initialization, JSON parsing, error response formatting.
- **Fix:** Extract to `src/lib/api-helpers.ts` with shared `initPayload()`, `validateEmail()`, `jsonError()` utilities.

#### B. Form State Management (duplicated across 2 files)
- `src/components/ui/DemoRequestForm.tsx`
- `src/components/ui/TalkToSalesDialog.tsx`
- **What's duplicated:** Status state (`idle`/`loading`/`success`/`error`), error message state, `.json().catch(() => ({}))` pattern.
- **Fix:** Extract shared `useFormSubmit()` hook.

#### C. Massive Import Lists (2 files)
- `src/components/sections/HomeHeroSection.tsx` — 38 named imports from `home-hero.ts`
- `src/components/sections/DataHeroSection.tsx` — 40+ named imports
- **Fix:** Group related constants into objects in data files instead of exporting 40+ individual constants. E.g., `export const HERO = { heading: '...', subheading: '...', tabs: [...] }`.

---

### Type Safety Issues (6 instances of `as unknown`)

| File | Line | Cast |
|------|------|------|
| `src/components/layout/FooterWrapper.tsx` | 40 | `legalResult.docs as unknown as Array<{ title: string; slug: string }>` |
| `src/components/layout/FooterWrapper.tsx` | 45 | `socialResult.docs as unknown as SocialLinkEntry[]` |
| `src/app/(site)/blog/page.tsx` | 26 | `result.docs as unknown as BlogPost[]` |
| `src/app/(site)/blog/[slug]/page.tsx` | — | Similar double-cast pattern |
| `src/app/(payload)/admin/[[...segments]]/page.tsx` | 21 | `as unknown as React.ReactElement` |
| `src/types/index.ts` | 30, 56 | `content?: unknown` for Lexical rich text |

**Fix:** Define proper Payload response types or use generics: `type PayloadResult<T> = { docs: T[] }`. Import Lexical types for rich text content.

---

### TODO/FIXME Comments (8 across 6 files)

| File | Comment |
|------|---------|
| `src/lib/analytics.ts:7` | `// TODO: consent banner` |
| `src/lib/analytics.ts:91` | `// TODO: add fireMeta('PageView') here...` |
| `src/components/sections/TabsSection.tsx` | `// TODO: pass per-tab animated React nodes via the visuals prop` |
| `src/app/(site)/partners/page.tsx` | `// TODO Phase 2: Implement pixel-perfect design` |
| `src/app/(site)/platform/ai/page.tsx` | `// TODO Phase 2: Implement pixel-perfect design` |
| `src/app/(site)/platform/ask/page.tsx` | `// TODO Phase 2: Implement pixel-perfect design` |

**Fix:** Convert to GitHub Issues with labels and milestones, then remove from code.

---

### Inconsistent Error Handling Across API Routes

| Route | Payload init wrapped in try/catch? |
|-------|-------------------------------------|
| `src/app/api/demo-request/route.ts` | ❌ No |
| `src/app/api/talk-to-sales/route.ts` | ❌ No |
| `src/app/api/startup-application/route.ts` | ✅ Yes (lines 37-42) |

**Fix:** All routes should use identical error handling. Extract to shared utility.

---

### Magic Numbers (15+ instances across 8 files)

| File | Example |
|------|---------|
| `src/components/sections/AutomationStackVisual.tsx:111` | `style={{ width: 251, height: 54 }}` |
| `src/components/sections/DevelopersCtaSection.tsx:116-123` | Hardcoded spring stiffness/damping (600, 45, 300, 30) |
| `src/components/illustrations/BentoIllustrationAIWorkflow.tsx:29-34` | Magic decimals (0.20, 0.40, 0.65, 0.95, 1.40) |
| `src/components/sections/HomeAdaptiveModelVisual.tsx` | Hardcoded logo dimensions (1024, 225, 180) |

**Fix:** Extract to named constants at the top of each file or in a shared `constants.ts`.

---

### Other Issues

| Category | Count | Files | Notes |
|----------|-------|-------|-------|
| `eslint-disable` comments | 2 | `AskHeroIllustration.tsx`, `RainGrid.tsx` | Document why or fix the underlying issue |
| Console statements | 2 | `startup-application/route.ts` | Error logs — acceptable but should use structured logging |
| `'use client'` on static components | 1+ | `AccordionImageSection.tsx` | Unnecessary — remove to keep as server component |
| Inconsistent `aria-hidden` on SVGs | ~10 | Footer, icons | Some decorative SVGs have it, some don't |
| Silent catch block | 1 | `FooterWrapper.tsx` | Swallows all Payload errors with empty catch |
| Inline function creation in render | 2+ | `TalkToSalesDialog.tsx:154`, `AskHeroIllustration.tsx:74` | Should use useCallback to prevent re-renders |
| Multiple useState that should consolidate | 8+ files | Form components, section components | 5+ useState hooks per component — use useReducer or single state object |

---

## Scorecard

| Category | Score | Key Issue |
|----------|-------|-----------|
| Security | 4/10 | No rate limiting, no CSRF, fake reCAPTCHA claim, no input limits |
| TypeScript Discipline | 7.5/10 | Strict mode on, but 6 `as unknown` casts, `unknown` for Lexical |
| Component Architecture | 4.5/10 | 7 monolith components over 1,000 lines each |
| Error Handling | 5.5/10 | Inconsistent across API routes, silent catch in footer |
| DRY / Reuse | 5.5/10 | 3 clear duplication patterns across API routes and forms |
| Code Hygiene | 6/10 | 8 TODOs, 2 eslint-disables, minor dead code |
| Naming & Readability | 7.5/10 | Consistent conventions, but long import lists and magic numbers |
| Data Architecture | 8/10 | Clean content/component separation |
| Accessibility | 6/10 | Inconsistent aria attributes, no prefers-reduced-motion |
| **Overall** | **6/10** | |

---

## Priority Action Plan

### Phase 1 — Security (Do First)
- [ ] Implement rate limiting on all 3 API routes
- [ ] Add CSRF protection (Origin/Referer validation or token-based)
- [ ] Either implement real reCAPTCHA or remove the claim from UI
- [ ] Add max length validation to all text input fields
- [ ] Add input sanitization (strip HTML/JS from text fields)
- [ ] Create `middleware.ts` with security headers (CSP, HSTS, X-Frame-Options)
- [ ] Add env var validation — throw on missing PAYLOAD_SECRET/DATABASE_URI
- [ ] Improve email validation (use library or stricter regex)

### Phase 2 — Code Quality
- [ ] Extract shared API route utilities to `src/lib/api-helpers.ts`
- [ ] Extract shared `useFormSubmit()` hook for form components
- [ ] Make error handling consistent across all 3 API routes
- [ ] Replace `as unknown` casts with proper Payload response types
- [ ] Define Lexical rich text types instead of `unknown`
- [ ] Remove unnecessary `'use client'` directives on static components

### Phase 3 — Architecture
- [ ] Break down `HomeAdaptiveModelVisual.tsx` (1,858 lines) into sub-components
- [ ] Break down `ReportingHeroCards.tsx` (1,843 lines) into sub-components
- [ ] Break down `HomeHeroSection.tsx` (1,714 lines) into sub-components
- [ ] Break down `DataHeroSection.tsx` (1,350 lines) into sub-components
- [ ] Break down `DevelopersBuildYourWaySection.tsx` (1,117 lines) into sub-components
- [ ] Break down `DevelopersCtaSection.tsx` (1,105 lines) into sub-components
- [ ] Break down `DevelopersMcpSection.tsx` (1,004 lines) into sub-components
- [ ] Group data file exports into objects (reduce 40+ individual imports)

### Phase 4 — Cleanup
- [ ] Convert 8 TODO comments to GitHub Issues, remove from code
- [ ] Extract magic numbers to named constants
- [ ] Add consistent `aria-hidden` to all decorative SVGs
- [ ] Add `prefers-reduced-motion` media query support for animations
- [ ] Replace inline function definitions with useCallback where needed
- [ ] Add SRI hashes to third-party analytics scripts
- [ ] Replace dynamic env var lookup in analytics with static config object
- [ ] Fix or document 2 eslint-disable comments
- [ ] Use structured logging instead of console.error in API routes
