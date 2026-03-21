/**
 * BentoIllustrationReporting
 *
 * Static isometric SVG for HomeBentoSection contentC, row 4 ("Powerful reporting").
 * Two boxes: tall right box + white bottom-left box, with edge guide lines.
 */

import type { ReactNode } from 'react'

export function BentoIllustrationReporting(): ReactNode {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width="121"
        height="120"
        viewBox="0 0 121 120"
        fill="none"
        className="h-full max-h-[100px] w-full max-w-[100px] shrink overflow-visible"
      >
        {/* Tall right box */}
        <path
          d="M53.8323 16.3421L83.586 1.44179C84.7619 0.852738 86.1483 0.852738 87.3243 1.44179L117.078 16.3421C118.484 17.0465 119.372 18.4814 119.372 20.0509V72.326C119.372 73.8951 118.484 75.3305 117.078 76.0348L87.3243 90.9352C86.1483 91.5242 84.7619 91.5242 83.586 90.9352L53.8323 76.0348C52.4258 75.3305 51.5378 73.8955 51.5378 72.326V20.0509C51.5378 18.4818 52.4258 17.0465 53.8323 16.3421Z"
          fill="#FAFAFB"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom-left box */}
        <path
          d="M3.29443 66.1331L33.0481 51.2328C34.224 50.6438 35.6105 50.6438 36.7864 51.2328L66.5401 66.1331C67.9466 66.8375 68.8345 68.2725 68.8345 69.8419V99.8563C68.8345 101.425 67.9466 102.861 66.5401 103.565L36.7864 118.465C35.6105 119.055 34.224 119.055 33.0481 118.465L3.29443 103.565C1.88795 102.861 1 101.426 1 99.8563V69.8419C1 68.2728 1.88795 66.8375 3.29443 66.1331Z"
          fill="white"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Edge guide lines */}
        <g opacity="0.6">
          <path
            d="M52.1929 17.8232L85.4551 34.65L118.717 17.8232M85.4533 90.9976V34.6509"
            stroke="#505967"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.65625 67.6289L34.9181 84.456L68.1803 67.6289M34.9167 118.916V84.4493"
            stroke="#505967"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}
