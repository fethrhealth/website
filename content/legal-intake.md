# Fethr Health — Legal Pages Intake

Source of truth for rewriting Attio's legal docs into Fethr's. Adapted from
Attio's Privacy Policy, Cookie Policy, and Terms & Conditions.

**Scope of this round:** Privacy Policy, Cookie Policy, Website Terms of Use
(lightweight — NOT a SaaS customer agreement). Plus a HIPAA/PHI notice stub.

Last reviewed: June 2026

---

## A. Company / legal entity
- **Legal name:** Fethr Health, Inc.
- **Incorporated in:** Delaware (single entity — no second/UK entity)
- **Structure note:** US-only. Collapse Attio's dual UK/US entity model down to
  one entity everywhere.

## B. Addresses
- **Business / contact address (use in "Contact us" sections):**
  1032 East Brandon Blvd #8926, Brandon, FL 33511
- **Registered agent address (Delaware):** N/A for these docs — not needed
  because we are writing lightweight Website Terms, not a full customer
  agreement. (For reference: the DE registered-agent address is the one on file
  with the state via whoever you incorporated through; it is NOT the operating
  address.)
- **EU Article 27 representative:** None — drop (US-only, no EU targeting).

## C. Contact emails
- **General / support:** support@fethrhealth.com
- **Privacy / legal:** support@fethrhealth.com (same)
- **Security / vulnerability disclosure:** support@fethrhealth.com (same)

## D. Domain & URLs
- **Production domain:** fethrhealth.com
- **Legal pages base:** https://fethrhealth.com/legal/<slug>
- **Referral scheme URL:** https://fethrhealth.com/legal/referral
  (only used if/when a Referral Policy is published — out of scope this round)

## E. Product / service naming (locked)
- **Defined term:** "the Fethr Services"
- **Definition:** the Fethr Health healthcare interoperability platform and
  related websites, applications, and services.

## F. Jurisdiction & legal decisions
- **Governing law / courts:** State of Delaware, USA
- **Mandatory arbitration + class-action waiver (AAA):** KEEP
- **Children's privacy threshold:** under 18
- **Data protection authority reference:** DROP the UK ICO line; no EU/UK
  supervisory-authority references (US-only).

## G. Third-party services / subprocessors (WEBSITE scope only)
Confirmed in use by the **website**:

| Service | Purpose | Cookies? |
|---|---|---|
| Google Analytics 4 (GA4) | site analytics | yes |
| Meta / Facebook Pixel | ads / conversion | yes |
| LinkedIn Insight Tag | ads / conversion | yes |
| Microsoft Graph | transactional email (Payload) | no (server-side) |
| Vercel | hosting / blob storage | minimal/none |

**Explicitly NOT used by the website (do not mention):**
Intercom, Mixpanel, Microsoft Clarity, Twitter/X, payment provider,
data-enrichment provider, PostHog.

> Note: PostHog is **core-product (orchestration engine) telemetry only**, not
> the marketing website — so it is excluded from the website Privacy Policy.

## H. Cookie inventory (to rebuild from the stack above)
Rebuild Attio's table using ONLY: GA4, Meta Pixel, LinkedIn, plus app cookies.
- Rename `attio-cookie-banner` → `fethr-cookie-banner`
- Rename `attio-session` → `fethr-session`
- **OPEN ITEM:** No cookie-consent banner found in the codebase. For US/CCPA a
  banner isn't strictly required (opt-out model), but EU visitors would need
  one. Decision pending: (a) write policy to match reality (no banner), or
  (b) add a consent banner. Defaulting to (a) for now — describe actual cookies,
  provide browser opt-out + GA/Meta/LinkedIn opt-out links.

## I. Scope decisions
- **Terms & Conditions:** Option (a) — **lightweight Website Terms of Use**
  (site IP, disclaimers, no-warranty, acceptable behavior). NOT the full SaaS
  customer agreement (no Plans/Seats/Fees/Free Trial/Developer Program/API
  license/Integration Apps/audit rights).
- **Google Drive/Gmail/Calendar "Limited Use" section:** DROP.
- **Integration App / Developer Program / App Marketplace language:** DROP.

## J. Dates
- **"Last updated" on all docs:** default to today's date on publish (June 2026).

## K. Healthcare add-on
- **HIPAA / PHI notice stub:** YES — draft a short notice/reference (separate
  from the three core docs).

---

## Deliverables for next step
1. **Privacy Policy** — fethrhealth.com, FL contact address, Delaware, US-only,
   under-18, processors = GA4/Meta/LinkedIn/Microsoft/Vercel, ICO dropped,
   Google-OAuth + Integration App sections dropped.
2. **Cookie Policy** — rebuilt table (GA4 + Meta + LinkedIn + fethr-* app
   cookies), opt-out guidance.
3. **Website Terms of Use** — lightweight; Delaware governing law; arbitration +
   class-action waiver kept; "Fethr Services" defined term.
4. **HIPAA/PHI notice stub.**

Each will be created as a `legal-pages` CMS entry (slug, title, subtitle,
lastUpdated, order, rich-text content) so it renders at /legal/<slug> and in the
footer Legal column.

> ⚠️ These are starter drafts, not legal advice — have counsel review before
> publishing, especially the arbitration clause, HIPAA notice, and anything
> touching PHI.
