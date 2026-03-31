/**
 * FAQ data — one array per page.
 *
 * `answer` accepts plain text or an HTML string
 * (e.g., <strong>, <a href="...">, <br>) since the content
 * is developer-authored (not user input).
 *
 * Usage:
 *   import { STARTUPS_FAQ } from "@/data/faq"
 *   <FaqSection items={STARTUPS_FAQ} />
 */

// ---------------------------------------------------------------------------
// Shared types (also used by FaqSection component)
// ---------------------------------------------------------------------------

export interface FaqItem {
  /** Unique slug — used as the HTML id and aria-controls target */
  id: string;
  question: string;
  /** Plain text or HTML string */
  answer: string;
}

export interface FaqSectionProps {
  /** Section heading. Defaults to "Frequently asked questions" */
  heading?: string;
  items: FaqItem[];
}

// ---------------------------------------------------------------------------
// /refer page FAQ
// ---------------------------------------------------------------------------

export const REFER_FAQ: FaqItem[] = [
  {
    id: "refer-eligibility",
    question: "Who is eligible to participate?",
    answer:
      "You must be a U.S. citizen or permanent resident, not be a current Fethr employee or contractor, and be over 18. Complete a Referral Partner Agreement to get started.",
  },
  {
    id: "refer-qualifying-referral",
    question: "What counts as a Qualifying Referral?",
    answer:
      "A Qualifying Referral is a new client introduction that results in a signed engagement agreement with Fethr within 365 days. The client must be a new Fethr client.",
  },
  {
    id: "refer-earnings",
    question: "How much do I earn per referral?",
    answer:
      "You earn 10% of the initial annual engagement revenue for 3 years. There is no cap on deal size — whether the engagement is $15,000/year or $500,000/year, you earn 10%.",
  },
  {
    id: "refer-payment",
    question: "When and how do I get paid?",
    answer:
      "Referral fees are paid quarterly, within 30 days following the end of each calendar quarter. Payment is made via ACH, wire transfer, or check. You'll receive a quarterly statement detailing your referrals and fees.",
  },
  {
    id: "refer-limit",
    question: "Is there a limit to how many organizations I can refer?",
    answer:
      "No limit. Revenue shares from multiple referrals are cumulative and stack. The more you refer, the more you earn.",
  },
  {
    id: "refer-cancellation",
    question: "What happens if a referred client cancels?",
    answer:
      "If the referred client terminates their engagement before the 3-year period expires, the revenue share for that client ceases. However, your other active referrals are unaffected.",
  },
];
