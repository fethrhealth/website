/**
 * Seeds Fethr Health legal pages into the local `legal_pages` (Payload) table.
 * Idempotent: upserts by slug. Run: `node scripts/seed-legal.cjs`
 *
 * Content adapted from Attio's Privacy / Cookie / Terms per
 * content/legal-intake.md (Fethr Health, Inc. · Delaware · US-only ·
 * fethrhealth.com · support@fethrhealth.com · lightweight website terms).
 *
 * NOT legal advice — starter drafts for counsel review.
 */
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

// ─── Lexical builders ───────────────────────────────────────────────────────
const T = (text, format = 0) => ({ type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 })
const B = (text) => T(text, 1) // bold
const P = (...children) => ({ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, textFormat: 0, children: children.length ? children : [T('')] })
const H = (tag, text) => ({ type: 'heading', tag, version: 1, direction: 'ltr', format: '', indent: 0, children: [T(text)] })
const LI = (...children) => ({ type: 'listitem', version: 1, direction: 'ltr', format: '', indent: 0, value: 1, children })
const UL = (...items) => ({ type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, direction: 'ltr', format: '', indent: 0, children: items.map((it, i) => ({ ...it, value: i + 1 })) })
const OL = (...items) => ({ type: 'list', listType: 'number', tag: 'ol', start: 1, version: 1, direction: 'ltr', format: '', indent: 0, children: items.map((it, i) => ({ ...it, value: i + 1 })) })
const A = (text, url) => ({ type: 'link', version: 1, direction: 'ltr', format: '', indent: 0, fields: { url, newTab: true, linkType: 'custom' }, children: [T(text)] })
const HR = () => ({ type: 'horizontalrule', version: 1 })
const DOC = (...children) => ({ root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children } })

const COMPANY = 'Fethr Health, Inc.'
const ADDRESS = '1032 East Brandon Blvd #8926, Brandon, FL 33511'
const EMAIL = 'support@fethrhealth.com'
const DOMAIN = 'fethrhealth.com'
const TODAY = '2026-06-24'

// ─── 1. PRIVACY POLICY ──────────────────────────────────────────────────────
const privacy = DOC(
  H('h2', '1. Introduction'),
  P(T(`This Privacy Policy sets out how ${COMPANY} ("Fethr", "we", "us", or "our") collects and uses personal data, and explains your rights in relation to your personal data. If you have any questions about this Privacy Policy or wish to exercise any of your rights, you can contact us using the details in Section 14 below.`)),
  P(T('This Privacy Policy applies to our website at '), A(DOMAIN, `https://${DOMAIN}`), T(` and to personal data we handle as a controller in connection with our marketing, sales, and recruitment activities (together, the "Fethr Services"). Your use of the Fethr Services is also subject to our `), A('Website Terms of Use', '/legal/terms'), T('.')),
  P(B('Healthcare data (PHI). '), T('Fethr Health provides a healthcare interoperability platform. Any protected health information (PHI) we process on behalf of a customer is governed by our separate Business Associate Agreement (BAA) and applicable healthcare laws, not by this Privacy Policy. See our '), A('HIPAA Notice', '/legal/hipaa'), T('. Our public website is not intended to collect PHI.')),
  P(T('We may update this Privacy Policy from time to time. If a change substantially affects your rights, we will take commercially reasonable measures to notify you. Otherwise, you are responsible for reviewing this Privacy Policy periodically.')),

  H('h2', '2. Personal data we collect'),
  P(T('By "personal data" we mean information that identifies you, such as your name, email address, phone number, employer, IP address, or any other information you provide to us.')),
  H('h3', '2.1 Data you provide to us'),
  P(T('We collect personal data when you:')),
  UL(
    LI(P(T('Submit a form on our website (for example, requesting a demo, talking to sales, applying to our startup program, or registering as a referral partner).'))),
    LI(P(T('Subscribe to receive product updates or marketing communications.'))),
    LI(P(T('Apply for a job with us (including information on your CV/resume).'))),
    LI(P(T('Contact us with questions, comments, or complaints, including through a social media account such as LinkedIn.'))),
    LI(P(T('Provide services to us, or purchase services from us.'))),
  ),
  P(T('This may include your name, business email address, phone number, company, role, region, and any information you choose to include. Where certain data is required to fulfil your request and you do not provide it, we may be unable to respond or provide the service.')),
  H('h3', '2.2 Data we collect automatically'),
  P(T('When you use our website, we automatically collect information about your device and activity, which may include:')),
  UL(
    LI(P(T('Technical information such as device type, browser, and operating system.'))),
    LI(P(T('Approximate location inferred from your IP address.'))),
    LI(P(T('Pages viewed, referring website, and the dates and times of your visits.'))),
    LI(P(T('Whether marketing emails we send are delivered, opened, or clicked.'))),
  ),
  P(T('We collect much of this information using cookies and similar technologies. To learn more, see our '), A('Cookie Policy', '/legal/cookies'), T('.')),

  H('h2', '3. How we use your personal data'),
  P(T('We use the personal data we collect to:')),
  UL(
    LI(P(T('Provide, maintain, improve, and analyze the Fethr Services.'))),
    LI(P(T('Respond to your inquiries and provide customer support.'))),
    LI(P(T('Send you marketing and product communications where permitted (see Section 4).'))),
    LI(P(T('Process and respond to job applications.'))),
    LI(P(T('Detect, prevent, and respond to fraud, abuse, and security issues.'))),
    LI(P(T('Generate aggregated or de-identified data, which we may use for any lawful purpose.'))),
    LI(P(T('Comply with our legal obligations and enforce our agreements and legal rights.'))),
  ),

  H('h2', '4. Marketing communications'),
  P(T('You will receive marketing communications from us if you have requested information from us, purchased our services, or otherwise not opted out. You can opt out at any time by following the unsubscribe link in any marketing email or by contacting us at '), A(EMAIL, `mailto:${EMAIL}`), T('. Even if you opt out of marketing, we may still send you transactional or service-related messages.')),

  H('h2', '5. Who we share your personal data with'),
  P(T('We may share your personal data with:')),
  UL(
    LI(P(B('Service providers. '), T('Vendors that perform functions on our behalf, including website hosting and storage (Vercel) and transactional email delivery (Microsoft).'))),
    LI(P(B('Analytics and advertising partners. '), T('We use Google Analytics, the Meta (Facebook) Pixel, and the LinkedIn Insight Tag to understand site usage and measure advertising. These partners may set cookies and receive information about your visits. See our Cookie Policy for details and opt-out options.'))),
    LI(P(B('Professional advisors. '), T('Lawyers, accountants, auditors, and consultants, where needed to obtain advice or services.'))),
    LI(P(B('Legal and safety. '), T('Third parties where we believe in good faith that disclosure is necessary to comply with law, respond to lawful requests, enforce our agreements, or protect the rights, property, or safety of Fethr or others.'))),
    LI(P(B('Corporate transactions. '), T('An acquirer, investor, or successor in connection with a merger, financing, acquisition, or sale of assets.'))),
    LI(P(B('With your consent. '), T('Other parties where you have given us permission to do so.'))),
  ),
  P(T('You can learn more about Google Analytics at '), A('https://policies.google.com/privacy/partners', 'https://policies.google.com/privacy/partners'), T('.')),

  H('h2', '6. Where we hold and process your personal data'),
  P(T('We are based in the United States, and we store and process personal data in the United States. We use service providers that may process data in the United States and other countries.')),

  H('h2', '7. Security'),
  P(T('We use reasonable technical and organizational measures designed to protect your personal data. However, no system can be completely secure, and we cannot guarantee that your personal data will always remain secure.')),

  H('h2', '8. Data retention'),
  P(T('We retain personal data for as long as necessary to fulfil the purposes described in this Privacy Policy, and as required to comply with our legal, accounting, or reporting obligations. We may retain de-identified or aggregated data indefinitely.')),

  H('h2', '9. Your rights and choices'),
  P(T('Depending on where you live, you may have rights to:')),
  UL(
    LI(P(B('Know and access '), T('the personal data we hold about you.'))),
    LI(P(B('Correct or delete '), T('your personal data.'))),
    LI(P(B('Opt out '), T('of marketing communications, and of the "sharing" of your information for cross-context behavioral advertising. You can exercise advertising opt-outs by disabling targeting cookies (see our Cookie Policy) and via the partner opt-out links described there.'))),
    LI(P(B('Withdraw consent '), T('you previously provided, at any time.'))),
  ),
  P(T('To exercise any of these rights, contact us at '), A(EMAIL, `mailto:${EMAIL}`), T('. We will not discriminate against you for exercising your rights. We do not sell your personal data for money.')),

  H('h2', '10. Children’s privacy'),
  P(T('Our services are not directed to children, and we do not knowingly collect personal data from anyone under 18 years of age. If you believe a child has provided us with personal data, please contact us at '), A(EMAIL, `mailto:${EMAIL}`), T(' and we will delete it.')),

  H('h2', '11. Third-party websites'),
  P(T('Our website may contain links to third-party websites and services. We do not control and are not responsible for their privacy practices. We encourage you to read the privacy policy of every website you visit.')),

  H('h2', '12. Healthcare data and HIPAA'),
  P(T('Where Fethr processes protected health information (PHI) on behalf of a covered entity or business associate, that processing is governed by HIPAA and our Business Associate Agreement with that customer, not by this Privacy Policy. Individuals seeking to exercise rights with respect to PHI should contact the relevant healthcare provider or covered entity. See our '), A('HIPAA Notice', '/legal/hipaa'), T('.')),

  H('h2', '13. Changes to this Privacy Policy'),
  P(T('We may update this Privacy Policy from time to time. The "Last updated" date above reflects the most recent changes.')),

  H('h2', '14. How to contact us'),
  P(T('You can contact us with any questions about your personal data or this Privacy Policy at:')),
  P(B(COMPANY)),
  P(T(ADDRESS)),
  P(A(EMAIL, `mailto:${EMAIL}`)),
)

// ─── 2. COOKIE POLICY ───────────────────────────────────────────────────────
const cookies = DOC(
  P(T(`${COMPANY} uses cookies and similar technologies on `), A(DOMAIN, `https://${DOMAIN}`), T(' to operate our website, understand how it is used, and measure our marketing. This policy explains the cookies we use and how you can control them.')),

  H('h2', 'What is a cookie?'),
  P(T('A cookie is a small text file that a website stores on your browser or device. Cookies help websites work, remember your preferences, and collect information about how you use the site, which may include personal data. To learn more about how we handle personal data, see our '), A('Privacy Policy', '/legal/privacy'), T('.')),

  H('h2', 'Categories of cookies we use'),
  UL(
    LI(P(B('Strictly necessary cookies. '), T('Required for the website to function. These cannot be switched off in our systems.'))),
    LI(P(B('Analytics / performance cookies. '), T('Help us count visitors and understand how they move around the site so we can improve it.'))),
    LI(P(B('Targeting / advertising cookies. '), T('Set by our advertising partners to record your visit and the pages you view so that advertising shown to you elsewhere is more relevant. This information may be shared with those partners.'))),
  ),

  H('h2', 'Cookies on our site'),
  P(T('We use the following first- and third-party cookies. Exact names and durations set by third parties may change over time.')),

  H('h3', 'Google Analytics (analytics)'),
  UL(
    LI(P(B('_ga '), T('— up to 2 years — distinguishes users.'))),
    LI(P(B('_ga_<container-id> '), T('— up to 2 years — persists session state for Google Analytics 4.'))),
    LI(P(B('_gid '), T('— 24 hours — distinguishes users.'))),
  ),
  H('h3', 'Meta / Facebook Pixel (advertising)'),
  UL(
    LI(P(B('_fbp '), T('— up to 3 months — used by Meta to deliver and measure advertising.'))),
  ),
  H('h3', 'LinkedIn Insight Tag (advertising)'),
  UL(
    LI(P(B('bcookie '), T('— up to 2 years — LinkedIn browser identifier used to measure advertising and detect abuse.'))),
    LI(P(B('li_gc '), T('— up to 2 years — stores consent regarding non-essential cookies.'))),
    LI(P(B('lidc '), T('— 24 hours — used by LinkedIn for data-center selection.'))),
    LI(P(B('UserMatchHistory / AnalyticsSyncHistory '), T('— up to 30 days — used by LinkedIn to sync and measure advertising.'))),
  ),

  H('h2', 'Third-party cookies'),
  P(T('Some cookies are set by third parties (Google, Meta, and LinkedIn) over which we have no control. These are generally analytics or advertising cookies. Please review those providers’ own privacy and cookie policies for more information.')),

  H('h2', 'How to control cookies'),
  P(T('You can control and delete cookies through your browser settings. You can also opt out of certain analytics and advertising cookies directly:')),
  UL(
    LI(P(T('Google Analytics opt-out: '), A('https://tools.google.com/dlpage/gaoptout', 'https://tools.google.com/dlpage/gaoptout'))),
    LI(P(T('Meta ad preferences: '), A('https://www.facebook.com/adpreferences', 'https://www.facebook.com/adpreferences'))),
    LI(P(T('LinkedIn ad preferences: '), A('https://www.linkedin.com/psettings/guest-controls', 'https://www.linkedin.com/psettings/guest-controls'))),
    LI(P(T('Industry opt-out (DAA): '), A('https://optout.aboutads.info', 'https://optout.aboutads.info'))),
  ),
  P(T('Blocking some cookies may affect your experience on our website.')),

  H('h2', 'Contact us'),
  P(T('Questions about this Cookie Policy? Contact us at '), A(EMAIL, `mailto:${EMAIL}`), T('.')),
)

// ─── 3. WEBSITE TERMS OF USE ────────────────────────────────────────────────
const terms = DOC(
  P(T(`These Website Terms of Use ("Terms") govern your access to and use of the website at `), A(DOMAIN, `https://${DOMAIN}`), T(` and any related content, together the "Fethr Services," operated by ${COMPANY} ("Fethr", "we", "us", or "our"). By accessing or using the Fethr Services, you agree to be bound by these Terms. If you do not agree, do not use the Fethr Services.`)),
  P(B('PLEASE READ SECTION 11 CAREFULLY. '), T('It requires that disputes be resolved by binding individual arbitration and waives your right to participate in a class action, unless you opt out as described.')),

  H('h2', '1. Who we are'),
  P(T(`The Fethr Services are provided by ${COMPANY}, a Delaware corporation, with a business address at ${ADDRESS}.`)),

  H('h2', '2. Eligibility and acceptable use'),
  P(T('You must be at least 18 years old to use the Fethr Services. You agree to use the Fethr Services only for lawful purposes and in accordance with these Terms. You agree that you will not:')),
  UL(
    LI(P(T('Use the Fethr Services in any way that violates applicable law or regulation.'))),
    LI(P(T('Reverse engineer, decompile, or attempt to discover the source code or underlying structure of the Fethr Services, except to the extent permitted by law.'))),
    LI(P(T('Copy, frame, mirror, scrape, or harvest content from the Fethr Services except as expressly permitted.'))),
    LI(P(T('Introduce any viruses, malware, or other harmful code, or attempt to gain unauthorized access to, probe, or disrupt the Fethr Services or related systems.'))),
    LI(P(T('Use the Fethr Services to infringe the intellectual property or other rights of any third party, or to post or transmit unlawful, defamatory, or objectionable content.'))),
    LI(P(T('Impersonate any person or entity, or misrepresent your affiliation with any person or entity.'))),
  ),

  H('h2', '3. Intellectual property'),
  P(T('The Fethr Services and all content, features, and functionality (including text, graphics, logos, and software) are owned by Fethr or its licensors and are protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to access and view the Fethr Services for your personal or internal business use. All rights not expressly granted are reserved. "Fethr Health" and our logos are our trademarks and may not be used without our prior written consent.')),

  H('h2', '4. Feedback'),
  P(T('If you provide us with any feedback, comments, or suggestions about the Fethr Services, you assign to us all rights in that feedback and agree that we may use it without restriction, attribution, or compensation.')),

  H('h2', '5. Third-party links'),
  P(T('The Fethr Services may contain links to third-party websites or resources that we do not control. We are not responsible for their content, products, or practices, and you access them at your own risk.')),

  H('h2', '6. Disclaimers'),
  P(T('THE FETHR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Fethr Services will be uninterrupted, secure, or error-free, or that any information on them is accurate or complete.')),

  H('h2', '7. Limitation of liability'),
  P(T('TO THE MAXIMUM EXTENT PERMITTED BY LAW, FETHR AND ITS DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR USE OF OR INABILITY TO USE THE FETHR SERVICES. OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US$100).')),

  H('h2', '8. Indemnification'),
  P(T('You agree to indemnify and hold harmless Fethr from any claims, losses, or damages, including reasonable legal fees, arising out of your use of the Fethr Services or your violation of these Terms.')),

  H('h2', '9. Privacy'),
  P(T('Your use of the Fethr Services is also governed by our '), A('Privacy Policy', '/legal/privacy'), T(' and '), A('Cookie Policy', '/legal/cookies'), T('.')),

  H('h2', '10. Changes to these Terms'),
  P(T('We may modify these Terms from time to time by posting the updated Terms on this page. If a change is material, we will make commercially reasonable efforts to notify you. Your continued use of the Fethr Services after the changes take effect constitutes acceptance of the updated Terms.')),

  H('h2', '11. Governing law and dispute resolution'),
  P(B('Governing law. '), T('These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws rules, except that the Federal Arbitration Act governs the interpretation and enforcement of the arbitration provisions below.')),
  P(B('Binding arbitration. '), T('Except for disputes relating to intellectual property rights, you and Fethr agree that any dispute arising out of or relating to these Terms or the Fethr Services will be finally resolved by binding arbitration before a single arbitrator administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules, conducted in English in the State of Delaware. The arbitrator’s decision will be final and binding and may be entered as a judgment in any court of competent jurisdiction. Either party may bring claims in small-claims court or seek injunctive relief in any court of competent jurisdiction for intellectual property or unauthorized-access disputes.')),
  P(B('Class-action waiver. '), T('You and Fethr agree that each may bring claims against the other only in an individual capacity, and not as a plaintiff or class member in any class or representative proceeding. You and Fethr waive any right to a jury trial.')),
  P(B('30-day opt-out. '), T('You may opt out of this agreement to arbitrate within 30 days of first accepting these Terms by sending written notice that includes your name, address, and a clear statement that you want to opt out to: '), A(EMAIL, `mailto:${EMAIL}`), T(`, or ${COMPANY}, ${ADDRESS}. If you opt out, neither party can require the other to arbitrate.`)),

  H('h2', '12. General'),
  P(T('If any provision of these Terms is found unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining Terms will remain in effect. No waiver of any term will be deemed a further or continuing waiver. You may not assign these Terms without our prior written consent; we may assign them freely. These Terms are the entire agreement between you and Fethr regarding the Fethr Services and supersede any prior agreements.')),

  H('h2', '13. Contact us'),
  P(T('Questions about these Terms? Contact us at:')),
  P(B(COMPANY)),
  P(T(ADDRESS)),
  P(A(EMAIL, `mailto:${EMAIL}`)),
)

// ─── 4. HIPAA / PHI NOTICE (stub) ───────────────────────────────────────────
const hipaa = DOC(
  P(B('This is a starter notice and not legal advice. '), T('It should be reviewed and completed by counsel before publication.')),

  H('h2', '1. Our role'),
  P(T(`${COMPANY} provides a healthcare interoperability platform. When we receive, process, or transmit protected health information (PHI) on behalf of a covered entity or another business associate, we act as a business associate as defined under the Health Insurance Portability and Accountability Act of 1996 and its implementing regulations (collectively, "HIPAA").`)),

  H('h2', '2. Business Associate Agreement (BAA)'),
  P(T('Our handling of PHI is governed by a Business Associate Agreement (BAA) entered into with the applicable customer, together with HIPAA — not by our '), A('Privacy Policy', '/legal/privacy'), T('. Where there is a conflict between the BAA and our other policies with respect to PHI, the BAA controls. To request a BAA, contact us at '), A(EMAIL, `mailto:${EMAIL}`), T('.')),

  H('h2', '3. Our commitments regarding PHI'),
  P(T('Consistent with HIPAA and the applicable BAA, we:')),
  UL(
    LI(P(T('Use and disclose PHI only as permitted by the BAA or as required by law.'))),
    LI(P(T('Implement reasonable and appropriate administrative, physical, and technical safeguards to protect PHI.'))),
    LI(P(T('Report security incidents and breaches of unsecured PHI as required by the BAA and HIPAA.'))),
    LI(P(T('Make PHI available to support the covered entity’s obligations regarding individual rights of access and amendment, as set out in the BAA.'))),
  ),

  H('h2', '4. Individual rights'),
  P(T('If you are an individual seeking to access, amend, or otherwise exercise rights regarding your PHI, please contact the healthcare provider or covered entity responsible for your care. As a business associate, we act on that entity’s instructions and will support its handling of your request.')),

  H('h2', '5. Our public website'),
  P(T('Our public website is intended for general information, marketing, and sales, and is not intended to collect PHI. Please do not submit PHI through website forms or email.')),

  H('h2', '6. Contact us'),
  P(B(COMPANY)),
  P(T(ADDRESS)),
  P(A(EMAIL, `mailto:${EMAIL}`)),
)

// ─── Pages ──────────────────────────────────────────────────────────────────
const PAGES = [
  { slug: 'privacy', title: 'Privacy Policy', order: 1, content: privacy,
    subtitle: `${COMPANY} takes data privacy seriously. This Privacy Policy explains how we collect and use personal data and your rights in relation to it.` },
  { slug: 'cookies', title: 'Cookie Policy', order: 2, content: cookies,
    subtitle: 'How we use cookies and similar technologies, and how you can control them.' },
  { slug: 'terms', title: 'Website Terms of Use', order: 3, content: terms,
    subtitle: 'The terms governing your use of the Fethr Health website.' },
  { slug: 'hipaa', title: 'HIPAA Notice', order: 4, content: hipaa,
    subtitle: 'How we handle protected health information (PHI) as a HIPAA business associate.' },
]

// ─── Upsert ─────────────────────────────────────────────────────────────────
function dbUri() {
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
  const line = env.split(/\r?\n/).find((l) => l.startsWith('DATABASE_URI='))
  if (!line) throw new Error('DATABASE_URI not found in .env.local')
  return line.slice('DATABASE_URI='.length).trim()
}

;(async () => {
  const c = new Client({ connectionString: dbUri() })
  await c.connect()
  for (const pg of PAGES) {
    await c.query(
      `INSERT INTO legal_pages (title, slug, subtitle, last_updated, "order", content, updated_at, created_at)
       VALUES ($1,$2,$3,$4,$5,$6, now(), now())
       ON CONFLICT (slug) DO UPDATE SET
         title=EXCLUDED.title, subtitle=EXCLUDED.subtitle,
         last_updated=EXCLUDED.last_updated, "order"=EXCLUDED."order",
         content=EXCLUDED.content, updated_at=now()`,
      [pg.title, pg.slug, pg.subtitle, TODAY, pg.order, JSON.stringify(pg.content)],
    )
    console.log(`  upserted /legal/${pg.slug}  (${pg.title})`)
  }
  const r = await c.query('select slug,title,"order" from legal_pages order by "order"')
  console.log('\nlegal_pages now:', JSON.stringify(r.rows))
  await c.end()
})().catch((e) => { console.error('SEED FAILED:', e.message); process.exit(1) })
