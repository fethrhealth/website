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
    id: "refer-redeem-rewards",
    question: "How do I get my rewards?",
    answer:
      "Visit your referral settings in Attio and click 'redeem'.",
  },
  {
    id: "refer-terms-conditions",
    question: "Are there any terms and conditions I should be aware of?",
    answer:
      "Please refer to our Referral Policy for more details.",
  },
  {
    id: "refer-qualified-referral",
    question: "What counts as a qualified referral?",
    answer:
      "Your referral is only valid when a new workspace signs up using your link and converts to a paid plan. The workspace must be new and not an existing customer.",
  },
  {
    id: "refer-cash-redemption",
    question: "Can I use my points for cash?",
    answer:
      "Unfortunately not, we don't offer any cash alternatives for reward tiers.",
  },
  {
    id: "refer-referral-limit",
    question: "Is there a limit to how many teams I can refer?",
    answer:
      "There's no limit to the number of teams you can refer. The more you refer, the more likely you are to earn points.",
  },
  {
    id: "refer-referral-cancellation",
    question: "What happens if a referral cancels their subscription?",
    answer:
      "Nothing changes if a referral cancels their subscription. Your points don't get deducted and you're still eligible to redeem rewards.",
  },
];
