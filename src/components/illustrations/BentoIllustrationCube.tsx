/**
 * BentoIllustrationCube
 *
 * Static isometric cube cluster for HomeBentoSection's contentC cell.
 * Three cubes (top-left, bottom-left, right) with correct SVG z-order:
 *   right-bg → bottom → top → right-fg (top face + outline on top of everything)
 */

import type { ReactNode } from 'react'

export function BentoIllustrationCube(): ReactNode {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="h-full max-h-[100px] w-full max-w-[100px] shrink overflow-visible"
      >
        {/* Right cube — background fill (rendered first, behind all others) */}
        <path
          d="M53.2944 38.3421L83.0481 23.4418C84.224 22.8527 85.6105 22.8527 86.7864 23.4418L116.54 38.3421C117.947 39.0465 118.835 40.4814 118.835 42.0509V72.0653C118.835 73.6344 117.947 75.0698 116.54 75.7741L86.7864 90.6745C85.6105 91.2635 84.224 91.2635 83.0481 90.6745L53.2944 75.7741C51.888 75.0698 51 73.6348 51 72.0653V42.0509C51 40.4818 51.888 39.0465 53.2944 38.3421Z"
          fill="#FAFAFB"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom-left cube */}
        <path
          d="M3.29443 67.1331L33.0481 52.2328C34.224 51.6438 35.6105 51.6438 36.7864 52.2328L66.5401 67.1331C67.9466 67.8375 68.8345 69.2725 68.8345 70.8419V99.8563C68.8345 101.425 67.9466 102.861 66.5401 103.565L36.7864 118.465C35.6105 119.055 34.224 119.055 33.0481 118.465L3.29443 103.565C1.88795 102.861 1 101.426 1 99.8563V70.8419C1 69.2728 1.88795 67.8375 3.29443 67.1331Z"
          fill="#F3F4F6"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.6"
          d="M1.65625 67.627L34.9181 84.4541L67.5 68M34.9167 118.914V84.4473"
          stroke="#505967"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top-left cube */}
        <path
          d="M3.29443 16.3421L33.0481 1.44179C34.224 0.852738 35.6105 0.852738 36.7864 1.44179L66.5401 16.3421C67.9466 17.0465 68.8345 18.4814 68.8345 20.0509V49.0653C68.8345 50.6344 67.9466 52.0698 66.5401 52.7741L36.7864 67.6745C35.6105 68.2635 34.224 68.2635 33.0481 67.6745L3.29443 52.7741C1.88795 52.0698 1 50.6348 1 49.0653V20.0509C1 18.4818 1.88795 17.0465 3.29443 16.3421Z"
          fill="white"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.6"
          d="M1.65625 17.8359L34.9181 34.663L68.1803 17.8359M34.9167 68.1227V34.6563"
          stroke="#505967"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right cube — top face + outline (rendered last, on top of top-left cube) */}
        <path
          d="M53.2944 38.8421L83.0481 23.9418C84.224 23.3527 85.6105 23.3527 86.7864 23.9418L116.54 38.8421C117.947 39.5465 118.835 40.9814 118.835 42.5509V58.5653L85.0481 75.1745L51 58.5653V42.5509C51 40.9818 51.888 39.5465 53.2944 38.8421Z"
          fill="#FAFAFB"
        />
        <path
          d="M116.54 75.7741C117.947 75.0698 118.835 73.6344 118.835 72.0653V42.0509C118.835 40.4814 117.947 39.0465 116.54 38.3421L86.7864 23.4418C85.6105 22.8527 84.224 22.8527 83.0481 23.4418L53.2944 38.3421C51.888 39.0465 51 40.4818 51 42.0509V59.35L66 66.85"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.6"
          d="M51.6562 39.8359L84.9181 56.663L118.18 39.8359M84.9167 91.1227V56.6563"
          stroke="#505967"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
