/**
 * Partners section data.
 *
 * Add a new object to the PARTNERS array to add a partner type.
 * The index is displayed as-is in the overline: "01 / App partners".
 * Images go in /public/partners/ — e.g. "/partners/app.svg".
 */

export interface PartnerType {
  /** Number shown in the overline, e.g. "01" */
  index: string;
  /** Overline label, e.g. "App partners" */
  label: string;
  /**
   * First part of the heading — displayed in dark black.
   * Usually the partner type name with a period: "App partners."
   */
  titleBold: string;
  /**
   * Second part of the heading — displayed in muted grey (text-black-800).
   * Short description of the program.
   */
  titleMuted: string;
  /** CTA button label */
  ctaLabel: string;
  /** CTA button destination */
  ctaHref: string;
  /** Path from /public, e.g. "/partners/app.svg" */
  imageSrc: string;
  /** Alt text for accessibility */
  imageAlt: string;
}

// ---------------------------------------------------------------------------
// EDIT THIS ARRAY ↓ — add or remove partner types freely.
// ---------------------------------------------------------------------------
export const PARTNERS: PartnerType[] = [
  {
    index: "01",
    label: "App partners",
    titleBold: "App partners.",
    titleMuted: "Build apps that power the next era of CRM.",
    ctaLabel: "Become an App Partner",
    ctaHref: "/partners",
    imageSrc: "/partners/app.svg",
    imageAlt: "App partners illustration",
  },
  {
    index: "02",
    label: "Creator partners",
    titleBold: "Creator partners.",
    titleMuted: "Build your brand, grow your audience.",
    ctaLabel: "Become an Integration Partner",
    ctaHref: "/partners",
    imageSrc: "/partners/creator.svg",
    imageAlt: "Integration partners illustration",
  },
  {
    index: "03",
    label: "Expert partners",
    titleBold: "Expert partners.",
    titleMuted: "Help GTM teams build, scale and grow.",
    ctaLabel: "Become an Expert Partner",
    ctaHref: "/partners",
    imageSrc: "/partners/expert.svg",
    imageAlt: "Expert partners illustration",
  },
];
