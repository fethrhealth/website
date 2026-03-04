/**
 * CTA Section — Avatar data and content config.
 * Edit CTA_AVATARS to add/remove/replace profile photos.
 * Edit CTA_CONTENT to change heading text and button labels/links.
 *
 * Photos go in /public/avatars/ — name them avatar-01.jpg, avatar-02.jpg, etc.
 */

export interface CtaAvatar {
  /** Shown as the <img> alt attribute (for accessibility) */
  name: string;
  /** Absolute path from /public, e.g. "/avatars/dr-smith.jpg" */
  src: string;
}

// ---------------------------------------------------------------------------
// EDIT THIS ARRAY ↓ — add or remove avatars freely.
// The mosaic grid will cycle through them automatically.
// ---------------------------------------------------------------------------
export const CTA_AVATARS: CtaAvatar[] = [
  { name: "Dr. Sarah Johnson",   src: "/avatars/avatar-01.jpg" },
  { name: "Dr. Michael Chen",    src: "/avatars/avatar-02.jpg" },
  { name: "Dr. Emily Rodriguez", src: "/avatars/avatar-03.jpg" },
  { name: "Dr. James Wilson",    src: "/avatars/avatar-04.jpg" },
  { name: "Dr. Lisa Park",       src: "/avatars/avatar-05.jpg" },
  { name: "Dr. Robert Martinez", src: "/avatars/avatar-06.jpg" },
  { name: "Dr. Amanda Foster",   src: "/avatars/avatar-07.jpg" },
  { name: "Dr. Kevin Thompson",  src: "/avatars/avatar-08.jpg" },
  { name: "Dr. Rachel Kim",      src: "/avatars/avatar-09.jpg" },
  { name: "Dr. David Lee",       src: "/avatars/avatar-10.jpg" },
  { name: "Dr. Nicole Adams",    src: "/avatars/avatar-11.jpg" },
  { name: "Dr. Chris Brown",     src: "/avatars/avatar-12.jpg" },
  { name: "Dr. Stephanie White", src: "/avatars/avatar-13.jpg" },
  { name: "Dr. Marcus Johnson",  src: "/avatars/avatar-14.jpg" },
  { name: "Dr. Jennifer Davis",  src: "/avatars/avatar-15.jpg" },
  { name: "Dr. Andrew Taylor",   src: "/avatars/avatar-16.jpg" },
  { name: "Dr. Michelle Garcia", src: "/avatars/avatar-17.jpg" },
  { name: "Dr. Daniel Nguyen",   src: "/avatars/avatar-18.jpg" },
  { name: "Dr. Patricia Moore",  src: "/avatars/avatar-19.jpg" },
  { name: "Dr. Thomas Harris",   src: "/avatars/avatar-20.jpg" },
];

// ---------------------------------------------------------------------------
// EDIT THIS OBJECT ↓ — section text and button links.
// ---------------------------------------------------------------------------
export const CTA_CONTENT = {
  /** Plain text on the first line of the heading */
  heading: "The CRM behind",
  /** Serif/italic text on the second line of the heading */
  headingSerif: "thousands of companies.",
  primaryCta: {
    label: "Start for free",
    href: "/signup",
  },
  secondaryCta: {
    label: "Talk to sales",
    href: "/contact",
  },
  /** Label on the submit button of the mobile email form */
  mobileCta: "Send me a demo",
} as const;
