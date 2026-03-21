import type { ReactNode } from 'react'

// ─── Component ────────────────────────────────────────────────────────────────
// Spinning dashed rings + lock icon SVG.
// CSS keyframes (permissions-spin-cw / permissions-spin-ccw) live in globals.css.

export function PermissionsCardVisual(): ReactNode {
  return (
    <svg width="100%" height="100%" viewBox="0 0 416 378" fill="none" className="scale-116">

      <defs>
        <filter id="filter0_ddd_permissions" x="148" y="133" width="120" height="120" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_morphology" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.160784 0 0 0 0 0.294118 0 0 0 0.16 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect2_morphology" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect3_morphology" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.06 0" />
          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
        </filter>
      </defs>

      {/* Outer ring — r=154, opacity 0.2, rotates clockwise (40s) */}
      <circle
        opacity="0.2" cx="208" cy="189" r="154"
        stroke="#A4ADBA" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 8"
        style={{ transformOrigin: '50% 50%', transformBox: 'fill-box', animation: 'permissions-spin-cw 40s linear infinite' }}
      />

      {/* Middle ring — r=120, opacity 0.4, rotates counter-clockwise (28s) */}
      <circle
        opacity="0.4" cx="208" cy="189" r="120"
        stroke="#A4ADBA" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 8"
        style={{ transformOrigin: '50% 50%', transformBox: 'fill-box', animation: 'permissions-spin-ccw 28s linear infinite' }}
      />

      {/* Center white circle with drop-shadow filter */}
      <g filter="url(#filter0_ddd_permissions)">
        <circle cx="208" cy="189" r="50" fill="white" />
      </g>

      {/* Lock icon */}
      <path d="M208 180.47C210.366 180.47 212.285 182.388 212.286 184.755V187C212.609 187.055 212.909 187.142 213.193 187.287C213.865 187.629 214.412 188.176 214.754 188.848C214.97 189.271 215.06 189.729 215.102 190.249C215.144 190.761 215.143 191.396 215.143 192.184V192.326C215.143 193.114 215.144 193.75 215.102 194.262C215.06 194.782 214.97 195.239 214.754 195.662C214.412 196.334 213.865 196.88 213.193 197.223C212.77 197.438 212.313 197.529 211.792 197.571C211.28 197.613 210.646 197.612 209.858 197.612H206.143C205.355 197.612 204.721 197.613 204.208 197.571C203.688 197.529 203.23 197.438 202.807 197.223C202.135 196.88 201.589 196.334 201.247 195.662C201.031 195.239 200.941 194.782 200.899 194.262C200.857 193.749 200.858 193.114 200.858 192.326V192.184C200.858 191.396 200.857 190.761 200.899 190.249C200.941 189.729 201.031 189.271 201.247 188.848C201.589 188.176 202.135 187.629 202.807 187.287C203.091 187.142 203.391 187.055 203.714 187V184.755C203.715 182.388 205.633 180.47 208 180.47ZM206.143 188.326C205.331 188.326 204.765 188.327 204.325 188.363C203.893 188.399 203.645 188.465 203.457 188.561C203.053 188.766 202.725 189.094 202.52 189.497C202.424 189.685 202.358 189.933 202.323 190.365C202.287 190.806 202.286 191.372 202.286 192.184V192.326C202.286 193.138 202.287 193.704 202.323 194.145C202.358 194.577 202.424 194.826 202.52 195.014C202.725 195.417 203.053 195.745 203.457 195.95C203.645 196.046 203.893 196.112 204.325 196.147C204.765 196.183 205.331 196.184 206.143 196.184H209.858C210.669 196.184 211.236 196.183 211.676 196.147C212.108 196.112 212.356 196.046 212.544 195.95C212.948 195.745 213.276 195.417 213.481 195.014C213.577 194.826 213.643 194.577 213.678 194.145C213.714 193.704 213.714 193.138 213.714 192.326V192.184C213.714 191.372 213.714 190.806 213.678 190.365C213.643 189.933 213.577 189.685 213.481 189.497C213.276 189.094 212.948 188.766 212.544 188.561C212.356 188.465 212.108 188.399 211.676 188.363C211.236 188.327 210.669 188.326 209.858 188.326H206.143ZM208 181.897C206.422 181.898 205.142 183.177 205.142 184.755V186.902C205.445 186.898 205.777 186.898 206.143 186.898H209.858C210.223 186.898 210.555 186.898 210.857 186.902V184.755C210.857 183.177 209.577 181.897 208 181.897Z" fill="#505155" />

      {/* Inner ring — r=86, rotates clockwise (55s) */}
      <circle
        cx="208" cy="189" r="86"
        stroke="#A4ADBA" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 8"
        style={{ transformOrigin: '50% 50%', transformBox: 'fill-box', animation: 'permissions-spin-cw 55s linear infinite' }}
      />

      {/* Decorative tick marks */}
      <path d="M176 158L183.071 165.071" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M232.5 213L239.571 220.071" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M176.75 220.821L183.821 213.75" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M231.75 164.321L238.821 157.25" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M169.05 167.284L177.711 172.284" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M237.86 205.787L246.521 210.787" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M186.034 227.771L191.034 219.11" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M224.537 158.961L229.537 150.301" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M164.74 178.051L174.399 180.639" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M241.171 197.432L250.83 200.02" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M196.8 232.08L199.388 222.421" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M216.182 155.649L218.77 145.99" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M208.315 233.457L208.315 223.457" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M208.315 154.456L208.315 144.456" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M165.015 201.045L174.674 198.457" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M240.896 179.614L250.556 177.026" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M219.795 231.806L217.207 222.146" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M198.364 155.924L195.776 146.265" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M169.581 211.706L178.241 206.706" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M237.33 171.366L245.99 166.366" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M230.456 227.24L225.456 218.58" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />
      <path d="M190.116 159.491L185.116 150.831" stroke="#EDEFF3" strokeWidth="1" strokeLinecap="round" />

      {/* Horizontal accent lines */}
      <path d="M163 189.562L179 189.562" stroke="#505155" strokeWidth="1" strokeLinecap="round" />
      <path d="M236.203 188.562L252.203 188.563" stroke="#505155" strokeWidth="1" strokeLinecap="round" />

    </svg>
  )
}
