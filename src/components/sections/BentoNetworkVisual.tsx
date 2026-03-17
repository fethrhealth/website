/**
 * BentoNetworkVisual
 *
 * Static network/node cluster SVG for HomeBentoSection contentC, row 3 ("Connect any type of data").
 */

import type { ReactNode } from 'react'

export function BentoNetworkVisual(): ReactNode {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width="120"
        height="122"
        viewBox="0 0 120 122"
        fill="none"
        className="h-full max-h-[100px] w-full max-w-[100px] shrink overflow-visible"
      >
        {/* Top cap */}
        <path
          d="M87.1271 16.0359V20.9825L61.3409 34.057C60.5268 34.4699 59.5647 34.4694 58.7508 34.056L32.9642 20.9585V16.0357C32.9642 14.9538 33.5741 13.9645 34.5408 13.4786L58.7603 1.30485C59.569 0.898384 60.5221 0.898384 61.3307 1.30485L85.5503 13.4786C86.5169 13.9645 87.1271 14.9541 87.1271 16.0359Z"
          fill="#FAFAFB"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right cap */}
        <path
          d="M119.085 65.6369V89.7095C119.085 90.7745 118.494 91.7514 117.55 92.2452L95.2908 103.892C94.4676 104.323 93.4869 104.327 92.66 103.903L85.9824 100.485V74.0949C85.9824 73.014 86.5914 72.0254 87.5566 71.539L110.97 59.7432L117.524 63.0875C118.482 63.5763 119.085 64.5613 119.085 65.6369Z"
          fill="#FAFAFB"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left cap */}
        <path
          d="M34.1025 74.1096V100.493L27.4249 103.912C26.5979 104.335 25.6172 104.331 24.7941 103.9L2.53517 92.2538C1.59161 91.7599 1 90.783 1 89.7181V65.6453C1 64.5698 1.60303 63.5851 2.56087 63.0963L9.01973 59.7998L32.5202 71.5499C33.4897 72.0347 34.1025 73.0256 34.1025 74.1096Z"
          fill="#FAFAFB"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Internal guide lines */}
        <g opacity="0.3">
          <path d="M118.637 64.1123L93.9709 76.4322V104.226" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33.4058 14.4998L60.0339 28.0136L86.6773 14.4922" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60.0424 28.0156V34.3684" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M86.427 72.5791L93.972 76.4324" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.46802 64.1279L26.1033 76.4323V104.13" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33.648 72.5742L26.0978 76.4302" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Main body */}
        <path
          d="M119.091 32.067V53.8972C119.091 54.9776 118.483 55.9659 117.518 56.4523L110.976 59.7521L87.5631 71.5479C86.5979 72.0341 85.9889 73.0229 85.9889 74.1038V106.534C85.9889 107.616 85.379 108.605 84.4126 109.091L61.3324 120.696C60.5254 121.102 59.574 121.102 58.7668 120.696L35.6866 109.092C34.7202 108.606 34.1103 107.617 34.1103 106.535V74.1098C34.1103 73.0258 33.4978 72.0349 32.5283 71.5501L9.02782 59.7999L2.7296 56.641C1.76176 56.1556 1.15088 55.1656 1.15088 54.083V31.9946C1.15088 30.9197 1.75319 29.9354 2.71056 29.4461L24.8174 18.1503C25.6322 17.7338 26.5972 17.7324 27.4135 18.1463L32.968 20.962L58.7547 34.0596C59.5686 34.4729 60.5307 34.4732 61.3448 34.0605L87.131 20.986L92.6869 18.1696C93.5025 17.7562 94.4665 17.7574 95.2809 18.1727L117.529 29.5183C118.487 30.0071 119.091 30.9911 119.091 32.067Z"
          fill="white"
          stroke="#505967"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center axis lines */}
        <g opacity="0.6">
          <path d="M60.1206 120.884V60.2871" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M118.648 30.5433L60.042 60.2858L1.62817 30.4912" stroke="#505967" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}
