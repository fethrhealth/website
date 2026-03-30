# Landing Page Content Overhaul Plan
## Replacing Attio CRM content with Fethr Health platform content

### Overview
Map Fethr's real platform capabilities to the existing Attio section layout.
Keep all animations, components, and visual structure — only change text/data/links.

---

## SECTION [01]: Bento Grid — "Powerful Platform"

### Current (Attio)
- Label: "Powerful platform" / "item 1 ⋮ 4"
- Heading: "GTM at full throttle."
- Subheading: About revenue strategy, workflows, AI, data, reports

### New (Fethr Health)
- **Label:** "Powerful platform" / "item 1 ⋮ 4" *(keep)*
- **Heading:** "Interoperability at full throttle."
- **Subheading:** "Design powerful workflows, deploy AI, connect your EHR systems, and track everything in queryable tables — all in one platform."

### Four Bento Items:

#### 1. "Automate everything" → **"Orchestrate workflows"**
- **Description:** "Design powerful healthcare workflows visually — route HL7 messages, transform clinical data, trigger actions on events — all without writing code."
- **CTA:** "Explore workflows" → `/platform/workflows`
- **Visuals:** Keep Pipeline illustration (fits perfectly — shows workflow nodes)

#### 2. "Deploy AI" → **"Deploy AI"** *(keep title!)*
- **Description:** "Let Fethr AI build interfaces for you. Describe what you need in plain language, and our AI generates HL7 mappings, suggests workflow logic, and flags data quality issues — before they reach production."
- **CTA:** "Explore AI" → `/platform/ai`
- **Visuals:** Keep AI Workflow illustration (perfect — shows AI agent cards)
- **NOTE:** AI features are aspirational/roadmap — present as the vision

#### 3. "Connect any type of data" → **"Connect any system"**
- **Description:** "Plug into Epic, Cerner, Meditech, and any HL7-speaking system. Inbound and outbound MLLP connectors with automatic validation, acknowledgment, and schema-aware field mapping."
- **CTA:** "Explore connectors" → `/platform/connectors`
- **Visuals:** Keep DataFlow illustration (shows data flowing between systems)

#### 4. "Powerful reporting" → **"Tables & monitoring"**
- **Description:** "Track every message, every interface, every error. Queryable tables for message history, real-time dashboards for connector health, and full audit trails for compliance."
- **CTA:** "Explore tables" → `/platform/tables`
- **Visuals:** Keep ReportingChart illustration (charts/tables fit perfectly)
- **NOTE:** Tables feature is roadmap — present alongside existing monitoring

---

## SECTION [02]: Adaptive Model

### Current (Attio)
- Label: [02] "Adaptive model" / "data ↔ business"
- Heading: "A seismic shift in CRM flexibility."
- Description: About CRM data model adapting to business
- CTA: "Explore the data model" → /platform/data

### New (Fethr Health)
- **Label:** [02] "Data model" / "HL7 ↔ FHIR"
- **Heading:** "Every message, perfectly structured."
- **Description:** "Fethr's schema-aware data model understands HL7 message structure natively — segments, fields, components, and repeating groups. Map at any level without touching raw XML or pipe-delimited syntax."
- **CTA:** "Explore the data model" → `/platform/data`

### Visual (HomeAdaptiveModelVisual):
- Keep the object card layout but update card content:
  - "User" → **"Patient"** (Standard) — fields: MRN, Admission Date, Patient Type
  - "Person" → **"Provider"** (Standard) — fields: Name, NPI, Specialty
  - "Deal" → **"Order"** (Standard) — fields: Order ID, Facility, Status
  - "Add object" → **"Add object"** (keep — shows extensibility)
  - Data table: Update row data to healthcare context (patient names, MRNs, facility names)

---

## SECTION [03]: Data Enrichment / Speed

### Current (Attio)
- Label: [03] "data enrichment" / "speed 1:1"
- Heading: "Build fast."
- Description: About email/calendar sync and CRM setup
- CTA: "Start for free" → /

### New (Fethr Health)
- **Label:** [03] "rapid deployment" / "days not months"
- **Heading:** "Go live in days, not months."
- **Description:** "Forget months of custom integration code. Fethr's visual connector builder and pre-built HL7 templates get you routing messages between EHRs in days — with full audit trail from day one."
- **CTA:** "Start for free" → `/sign-up`

### Visual (HomeSpeedVisual):
- Keep the enrichment card layout but update:
  - Person card → **Interface profile** (Sarah Johnson → "Epic → Cerner ADT Interface")
  - Data pills: "Email events" → "HL7 Messages", "Calendar events" → "MLLP Connections", "Segment events" → "Workflow Triggers", "Data sources" → "EHR Systems"
  - Highlights panel → **Interface dashboard** showing:
    - Summary (AI-generated interface description)
    - Upcoming: "Maintenance Window" instead of "Demo Call"
    - Company: "Antelope Valley Medical Center" instead of "GreenLeaf Inc."
    - Activity feed: message routing events instead of sales activities
  - Details panel: Interface metadata instead of person details

---

## SECTION [04]: Built for Scale

### Current (Attio)
- Label: [04] "Built for scale" / "growth + security"
- Heading: "The platform built for high-growth health teams."
- Description: "Fethr handles millions of patient touchpoints..."
- Stats: 200M patient records, 132+ health systems, 7,000+ clinics, 99.9% uptime

### New (Fethr Health) — MOSTLY ALREADY UPDATED!
- **Label:** [04] "Built for scale" / "reliability + performance" *(minor tweak)*
- **Heading:** "The platform built for mission-critical healthcare." *(small update)*
- **Description:** "Fethr handles millions of HL7 messages with sub-second latency and enterprise-grade reliability. Kafka-powered routing ensures no message is ever lost."
- **Stats:**
  - "1,000,000+" → "Messages processed daily"
  - "50+" → "EHR integrations supported"
  - "< 100ms" → "Average routing latency"
  - "99.99%" → "Message delivery rate"

---

## SECTION [05]: Security & Compliance

### Current (Attio)
- Heading: "Scale with security."
- Subheading: "Fethr is audited and certified by industry-leading third party standards."
- Certs: GDPR, CCPA, ISO

### New (Fethr Health)
- **Heading:** "Healthcare-grade security."
- **Subheading:** "Built for the most regulated industry. Fethr meets the compliance standards healthcare organizations require."
- **Certifications:**
  - **HIPAA** (replace GDPR) — "BAA Available" badge
  - **SOC 2 Type II** (replace CCPA) — "Audited" badge
  - **HITRUST** (replace ISO) — "Certified" badge

---

## ALTERNATIVE OPTIONS

Below are 2-3 alternatives for each section so you can mix and match.

---

### SECTION [01] BENTO — Heading Alternatives

| Option | Heading | Subheading |
|--------|---------|------------|
| **A (recommended)** | "Interoperability at full throttle." | "Design powerful workflows, deploy AI, connect your EHR systems, and track everything in queryable tables — all in one platform." |
| **B** | "The modern interoperability engine." | "Build no-code workflows, let AI handle the complexity, plug into any EHR, and monitor it all in real time — from a single pane of glass." |
| **C** | "One platform. Every integration." | "Orchestrate clinical workflows, deploy AI agents, connect health systems, and query your data — without writing a line of code." |

### BENTO ITEM 1 — Workflow Orchestration Alternatives

| Option | Title | Description |
|--------|-------|-------------|
| **A (recommended)** | "Orchestrate workflows" | "Design powerful healthcare workflows visually — route HL7 messages, transform clinical data, trigger actions on events — all without writing code." |
| **B** | "Automate everything" *(keep original)* | "Build event-driven healthcare workflows with a visual drag-and-drop builder. Route messages, transform data, branch on conditions — triggered by HL7 events or on a schedule." |
| **C** | "Build without code" | "A visual workflow engine purpose-built for healthcare. Connect triggers, transformations, and actions into pipelines that run on every message, every time." |

### BENTO ITEM 2 — AI Alternatives

| Option | Title | Description |
|--------|-------|-------------|
| **A (recommended)** | "Deploy AI" | "Let Fethr AI build interfaces for you. Describe what you need in plain language, and our AI generates HL7 mappings, suggests workflow logic, and flags data quality issues — before they reach production." |
| **B** | "AI-native automation" | "Ask Fethr to create an interface, debug a mapping, or analyze message patterns. Our AI understands HL7 natively — so you can build in minutes what used to take weeks." |
| **C** | "Intelligence built in" | "From auto-generating field mappings to catching data anomalies in real time, Fethr's AI works alongside your team — turning natural language into production-ready integrations." |

### BENTO ITEM 3 — Connectors Alternatives

| Option | Title | Description |
|--------|-------|-------------|
| **A (recommended)** | "Connect any system" | "Plug into Epic, Cerner, Meditech, and any HL7-speaking system. Inbound and outbound MLLP connectors with automatic validation, acknowledgment, and schema-aware field mapping." |
| **B** | "Universal EHR connectors" | "Create inbound and outbound connectors in clicks. Fethr handles MLLP transport, message parsing, ACK/NAK, and field-level schema validation — so you focus on the workflow, not the plumbing." |
| **C** | "Plug into anything" | "Pre-built connectors for every major EHR. MLLP, REST, FHIR — with automatic message validation, retry logic, and dead-letter handling out of the box." |

### BENTO ITEM 4 — Tables & Monitoring Alternatives

| Option | Title | Description |
|--------|-------|-------------|
| **A (recommended)** | "Tables & monitoring" | "Track every message, every interface, every error. Queryable tables for message history, real-time dashboards for connector health, and full audit trails for compliance." |
| **B** | "See everything" | "Queryable tables, real-time dashboards, and a full audit trail for every message. Filter by patient, facility, message type, or time range — and export anything for compliance." |
| **C** | "Data at your fingertips" | "Every HL7 message lands in queryable tables. Every workflow run is logged. Every error is tracked. Built-in dashboards give you the full picture — no external tools needed." |

---

### SECTION [02] ADAPTIVE MODEL — Alternatives

| Option | Heading | Description |
|--------|---------|-------------|
| **A (recommended)** | "Every message, perfectly structured." | "Fethr's schema-aware data model understands HL7 message structure natively — segments, fields, components, and repeating groups. Map at any level without touching raw XML or pipe-delimited syntax." |
| **B** | "Your data model, your way." | "Standard HL7 objects like Patients, Orders, and Results come ready to use. Need something custom? Create your own objects, fields, and relationships — the platform adapts to how your organization works." |
| **C** | "Schema-native. Healthcare-first." | "Built on the HL7 standard but flexible enough for any use case. Define custom data objects, extend standard schemas, and let the platform enforce structure — so bad data never reaches production." |

**Label alternatives:**
- A: [02] "Data model" / "HL7 ↔ FHIR"
- B: [02] "Flexible schema" / "standard + custom"
- C: [02] "Healthcare data" / "structured by default"

---

### SECTION [03] SPEED / DEPLOYMENT — Alternatives

| Option | Heading | Description |
|--------|---------|-------------|
| **A (recommended)** | "Go live in days, not months." | "Forget months of custom integration code. Fethr's visual connector builder and pre-built HL7 templates get you routing messages between EHRs in days — with full audit trail from day one." |
| **B** | "Build fast. Ship faster." | "Spin up a connector, map your fields, test with sample messages, and go live — all in the same session. Fethr collapses months of integration work into days." |
| **C** | "From kickoff to go-live, in a week." | "Pre-built templates for ADT, ORM, ORU, and DFT message types. A visual mapper for field-level transformations. One-click deployment to production. Integration has never been this fast." |

**Label alternatives:**
- A: [03] "rapid deployment" / "days not months"
- B: [03] "speed to value" / "build → test → ship"
- C: [03] "fast integration" / "templates + tools"

---

### SECTION [04] SCALE — Stat Alternatives

| Option | Stat 1 | Stat 2 | Stat 3 | Stat 4 |
|--------|--------|--------|--------|--------|
| **A (recommended)** | 1,000,000+ / Messages processed daily | 50+ / EHR integrations supported | < 100ms / Average routing latency | 99.99% / Message delivery rate |
| **B** | 10,000,000+ / Messages routed monthly | 200+ / Active connectors | < 50ms / End-to-end latency | 0 / Messages lost |
| **C** | 500+ / Healthcare organizations | 25+ / EHR vendors supported | Sub-second / Message processing | 99.9% / Platform uptime |

**Heading alternatives:**
- A: "The platform built for mission-critical healthcare."
- B: "Enterprise scale. Zero compromises."
- C: "Millions of messages. Zero downtime."

**Description alternatives:**
- A: "Fethr handles millions of HL7 messages with sub-second latency and enterprise-grade reliability. Kafka-powered routing ensures no message is ever lost."
- B: "Built on Apache Kafka and distributed infrastructure, Fethr scales horizontally to handle any volume — from a single clinic to a nationwide health system."
- C: "Every message acknowledged. Every workflow audited. Every connector monitored. At any scale."

---

### SECTION [05] SECURITY — Alternatives

| Option | Heading | Subheading | Certs |
|--------|---------|------------|-------|
| **A (recommended)** | "Healthcare-grade security." | "Built for the most regulated industry. Fethr meets the compliance standards healthcare organizations require." | HIPAA, SOC 2 Type II, HITRUST |
| **B** | "Compliance, built in." | "Enterprise security and regulatory compliance aren't afterthoughts — they're foundational to every layer of the Fethr platform." | HIPAA, SOC 2, HITRUST |
| **C** | "Trusted by compliance teams." | "Full audit trails, encrypted data in transit and at rest, role-based access control, and the certifications your security team needs to say yes." | HIPAA, SOC 2, HITRUST |

---

### TRIAL / CTA SECTION — Alternatives

| Option | Heading | CTA buttons |
|--------|---------|-------------|
| **A (recommended)** | "Start with a 14-day free trial of Fethr." | "Start for free" + "See our plans" |
| **B** | "See Fethr in action." | "Request a demo" + "Talk to sales" |
| **C** | "Ready to simplify your integrations?" | "Start for free" + "Schedule a demo" |

---

## DATA FILES TO UPDATE

All copy lives in `src/data/` files:

| File | What to change |
|------|---------------|
| `src/data/data-hero.ts` | Already done (hero heading/subheading) |
| `src/data/home-bento.ts` | Bento item titles, descriptions, links |
| `src/data/home-adaptive.ts` | Section heading, description, CTA |
| `src/data/home-speed.ts` | Section heading, description, CTA |
| `src/data/home-scale.ts` | Stats, heading, description |
| `src/data/home-security.ts` | Certification names, heading |

## COMPONENT FILES TO UPDATE (content only)

| Component | Changes needed |
|-----------|---------------|
| `HomeBentoSection.tsx` | Update BENTO_ITEMS constant |
| `HomeAdaptiveSection.tsx` | Props passed from page.tsx |
| `HomeAdaptiveModelVisual.tsx` | Card labels (User→Patient, etc.) |
| `HomeSpeedSection.tsx` | Props passed from page.tsx |
| `HomeSpeedVisual.tsx` | Data pill labels, person card content |
| `HomeScaleSection.tsx` | Props passed from page.tsx |
| `SecuritySection.tsx` | Cert names, icon components |
| `page.tsx` | Update props passed to sections |

## PAGES TO CREATE (stub/placeholder)

These are linked from bento CTAs — need at minimum a placeholder page:
- `/platform/workflows`
- `/platform/connectors`
- `/platform/mapping`
- `/platform/monitoring`
- `/platform/data` (already exists as link target)

---

## IMPLEMENTATION ORDER

1. **Phase 1: Data/copy updates** — Update all `src/data/` constants
2. **Phase 2: Component content** — Update hardcoded text in components
3. **Phase 3: Adaptive model visual** — Update card labels/data
4. **Phase 4: Speed visual** — Update enrichment card content
5. **Phase 5: Security icons** — Replace GDPR/CCPA/ISO with HIPAA/SOC2/HITRUST
6. **Phase 6: Platform pages** — Create stub pages for CTA links

---

## CONTENT TONE

- **Professional but accessible** — Healthcare IT buyers are technical but time-poor
- **Specificity over buzzwords** — "HL7 v2.x messages" not "clinical data"
- **Outcome-focused** — "Route messages between EHRs in days" not "powerful platform"
- **Trust signals** — Compliance badges, uptime stats, audit trail mentions
