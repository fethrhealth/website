/**
 * Partners section data.
 *
 * Agrega un nuevo objeto al array PARTNERS para añadir un tipo de partner.
 * El índice (index) se muestra tal cual en el overline: "01 / App partners".
 * Las imágenes van en /public/partners/ — e.g. "/partners/app.svg".
 */

export interface PartnerType {
  /** Número mostrado en el overline, e.g. "01" */
  index: string;
  /** Etiqueta del overline, e.g. "App partners" */
  label: string;
  /**
   * Primera parte del heading — se muestra en negro oscuro.
   * Suele ser el nombre del tipo de partner con punto: "App partners."
   */
  titleBold: string;
  /**
   * Segunda parte del heading — se muestra en gris (text-black-800).
   * Es la descripción corta del programa.
   */
  titleMuted: string;
  /** Texto del botón CTA */
  ctaLabel: string;
  /** Destino del botón CTA */
  ctaHref: string;
  /** Ruta desde /public, e.g. "/partners/app.svg" */
  imageSrc: string;
  /** Alt text para accesibilidad */
  imageAlt: string;
}

// ---------------------------------------------------------------------------
// EDIT THIS ARRAY ↓ — agrega o quita tipos de partners libremente.
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
