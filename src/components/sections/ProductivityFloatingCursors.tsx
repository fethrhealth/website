'use client'

import { motion } from 'framer-motion'

/**
 * ProductivityFloatingCursors
 *
 * Three floating cursor badges with independent drift animations.
 * Each cursor moves along a unique path at its own speed — organic, non-robotic.
 * Desktop only (max-lg:hidden).
 *
 * Cursors:
 *   John  — green  (#0FC27B) · top center
 *   Roza  — purple (#9162F9) · bottom left
 *   Ethan — orange (#FD9038) · bottom right
 */

// ─── Per-cursor float configs ─────────────────────────────────────────────────
// x/y keyframes are small pixel offsets from resting position.
// Different durations + paths = no synchronization = organic feel.

const JOHN_FLOAT = {
  x: [0, 5, -3, 8, -6, 2, 0],
  y: [0, -5, 4, -2, 7, -4, 0],
  transition: { duration: 11, repeat: Infinity, ease: 'easeInOut' as const },
}

const ROZA_FLOAT = {
  x: [0, -7, 4, -4, 9, -2, 0],
  y: [0, 4, -6, 8, -3, 5, 0],
  transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' as const },
}

const ETHAN_FLOAT = {
  x: [0, 6, -8, 3, -5, 7, 0],
  y: [0, -3, 6, -7, 2, -5, 0],
  transition: { duration: 13, repeat: Infinity, ease: 'easeInOut' as const },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductivityFloatingCursors() {
  return (
    <div className="pointer-events-none absolute inset-0 max-lg:hidden" aria-hidden="true">

      {/* John — green · top center */}
      <motion.div
        className="absolute top-[3%] left-1/2"
        animate={{ x: JOHN_FLOAT.x, y: JOHN_FLOAT.y }}
        transition={JOHN_FLOAT.transition}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="74" height="54" fill="none">
          <defs>
            <filter id="john-badge" width="57" height="32" x="17" y="22" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="2" result="e1" />
              <feOffset dy="3" /><feGaussianBlur stdDeviation="3" />
              <feColorMatrix values="0 0 0 0 0.0588235 0 0 0 0 0.760784 0 0 0 0 0.482353 0 0 0 0.08 0" />
              <feBlend in2="BackgroundImageFix" result="s1" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="2" result="e2" />
              <feOffset dy="2" /><feGaussianBlur stdDeviation="2" />
              <feColorMatrix values="0 0 0 0 0.0588235 0 0 0 0 0.760784 0 0 0 0 0.482353 0 0 0 0.12 0" />
              <feBlend in2="s1" result="s2" />
              <feBlend in="SourceGraphic" in2="s2" result="shape" />
            </filter>
            <filter id="john-cursor" width="35.4923" height="38.2793" x=".0909424" y=".24707" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="2" result="e1" />
              <feOffset dy="4" /><feGaussianBlur stdDeviation="6" />
              <feColorMatrix values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.16 0" />
              <feBlend in2="BackgroundImageFix" result="s1" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="4" result="e2" />
              <feOffset dy="4" /><feGaussianBlur stdDeviation="4" />
              <feColorMatrix values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.12 0" />
              <feBlend in2="s1" result="s2" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="e3" />
              <feOffset /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.04 0" />
              <feBlend in2="s2" result="s3" />
              <feBlend in="SourceGraphic" in2="s3" result="shape" />
            </filter>
          </defs>
          <g filter="url(#john-badge)">
            <rect width="49" height="24" x="21" y="23" fill="#0FC27B" rx="8" />
            <path fill="#fff" d="M34.076 29.8182h1.5312v7.2187c0 .653-.1292 1.2114-.3877 1.6755-.2552.464-.6149.8186-1.0789 1.0639-.464.2419-1.0076.3629-1.6307.3629-.5733 0-1.0887-.1044-1.5461-.3132-.4541-.2088-.8137-.5121-1.0789-.9098-.2618-.401-.3927-.8883-.3927-1.4617h1.5263c0 .2818.0646.5254.1939.7309.1325.2055.3132.3662.5419.4822.232.1127.4971.169.7954.169.3248 0 .5999-.0679.8253-.2038.2287-.1392.4027-.343.522-.6115.1193-.2685.179-.5966.179-.9844v-7.2187Zm6.5845 10.3359c-.7159 0-1.3407-.164-1.8743-.4922-.5336-.3281-.9479-.7871-1.2429-1.3771-.295-.59-.4424-1.2794-.4424-2.0682 0-.7921.1474-1.4848.4424-2.0781.295-.5933.7093-1.054 1.2429-1.3821.5336-.3281 1.1584-.4922 1.8743-.4922s1.3407.1641 1.8743.4922c.5336.3281.9479.7888 1.2429 1.3821.295.5933.4425 1.286.4425 2.0781 0 .7888-.1475 1.4782-.4425 2.0682-.295.59-.7093 1.049-1.2429 1.3771-.5336.3282-1.1584.4922-1.8743.4922Zm.005-1.2479c.464 0 .8485-.1226 1.1534-.3678.3049-.2453.5303-.5718.6761-.9795.1492-.4076.2238-.8567.2238-1.3473 0-.4872-.0746-.9346-.2238-1.3423-.1458-.411-.3712-.7407-.6761-.9893-.3049-.2486-.6894-.3729-1.1534-.3729-.4673 0-.8551.1243-1.1634.3729-.3049.2486-.5319.5783-.6811.9893-.1458.4077-.2187.8551-.2187 1.3423 0 .4906.0729.9397.2187 1.3473.1492.4077.3762.7342.6811.9795.3083.2452.6961.3678 1.1634.3678Zm6.4205-3.4403V40h-1.4866V29.8182h1.4667v3.7883h.0944c.179-.411.4524-.7374.8203-.9794.3679-.2419.8485-.3629 1.4418-.3629.5237 0 .9811.1077 1.3722.3232.3944.2154.6993.5369.9147.9644.2188.4243.3282.9546.3282 1.591V40h-1.4865v-4.6783c0-.5601-.1442-.9943-.4326-1.3025-.2883-.3116-.6894-.4674-1.2031-.4674-.3513 0-.6662.0746-.9446.2238-.2751.1491-.4922.3679-.6513.6562-.1558.2851-.2336.6298-.2336 1.0341Zm8.1418 0V40h-1.4865v-7.6364h1.4269v1.2429h.0944c.1757-.4043.4508-.7291.8253-.9744.3779-.2453.8535-.3679 1.4269-.3679.5203 0 .976.1094 1.3671.3281.3911.2155.6944.537.9098.9645.2155.4276.3232.9562.3232 1.586V40h-1.4865v-4.6783c0-.5535-.1442-.986-.4325-1.2976-.2884-.3148-.6845-.4723-1.1882-.4723-.3447 0-.6513.0746-.9198.2238-.2651.1491-.4756.3679-.6314.6562-.1524.2851-.2287.6298-.2287 1.0341Z" />
            <rect width="48" height="23" x="21.5" y="23.5" stroke="#232529" strokeOpacity=".1" rx="7.5" />
          </g>
          <g filter="url(#john-cursor)">
            <path fill="#0FC27B" d="M11.0959 7.54364 13.8798 23.319c.0407.2304.3472.2837.4633.0806l3.6015-6.3026c.0352-.0617.0951-.1055.1646-.1204l6.2759-1.3448c.2211-.0474.2707-.3408.0773-.4582L11.4719 7.2865c-.1838-.11157-.4133.04544-.376.25714Z" />
            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m10.6035 7.63053 2.7839 15.77537c.122.6911 1.0416.8511 1.3898.2418l3.5461-6.2056 6.1665-1.3214c.6636-.1422.8122-1.0223.2321-1.3745L11.7314 6.8591c-.5513-.33468-1.2399.13634-1.1279.77143Z" />
          </g>
        </svg>
      </motion.div>

      {/* Roza — purple · bottom left */}
      <motion.div
        className="absolute bottom-[5%] left-[13%]"
        animate={{ x: ROZA_FLOAT.x, y: ROZA_FLOAT.y }}
        transition={ROZA_FLOAT.transition}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="74" height="54" fill="none">
          <defs>
            <filter id="roza-badge" width="57" height="32" x="17" y="22" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="2" result="e1" />
              <feOffset dy="3" /><feGaussianBlur stdDeviation="3" />
              <feColorMatrix values="0 0 0 0 0.568627 0 0 0 0 0.384314 0 0 0 0 0.976471 0 0 0 0.08 0" />
              <feBlend in2="BackgroundImageFix" result="s1" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="2" result="e2" />
              <feOffset dy="2" /><feGaussianBlur stdDeviation="2" />
              <feColorMatrix values="0 0 0 0 0.568627 0 0 0 0 0.384314 0 0 0 0 0.976471 0 0 0 0.12 0" />
              <feBlend in2="s1" result="s2" />
              <feBlend in="SourceGraphic" in2="s2" result="shape" />
            </filter>
            <filter id="roza-cursor" width="35.4923" height="38.2793" x=".0909424" y=".24707" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="2" result="e1" />
              <feOffset dy="4" /><feGaussianBlur stdDeviation="6" />
              <feColorMatrix values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.16 0" />
              <feBlend in2="BackgroundImageFix" result="s1" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" radius="4" result="e2" />
              <feOffset dy="4" /><feGaussianBlur stdDeviation="4" />
              <feColorMatrix values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.12 0" />
              <feBlend in2="s1" result="s2" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="e3" />
              <feOffset /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.04 0" />
              <feBlend in2="s2" result="s3" />
              <feBlend in="SourceGraphic" in2="s3" result="shape" />
            </filter>
          </defs>
          <g filter="url(#roza-badge)">
            <rect width="49" height="24" x="21" y="23" fill="#9162F9" rx="8" />
            <path fill="#fff" d="M30.1186 40V29.8182h3.6293c.7888 0 1.4434.1359 1.9637.4077.5237.2717.9148.6479 1.1733 1.1285.2586.4773.3878 1.0291.3878 1.6555 0 .6231-.1309 1.1717-.3927 1.6456-.2586.4707-.6496.8369-1.1733 1.0988-.5204.2618-1.175.3927-1.9638.3927h-2.7493v-1.3224h2.6101c.4972 0 .9015-.0713 1.2131-.2138.3148-.1425.5452-.3497.691-.6215.1458-.2717.2188-.5982.2188-.9794 0-.3844-.0746-.7175-.2238-.9992-.1458-.2818-.3761-.4972-.691-.6464-.3116-.1524-.7209-.2286-1.228-.2286h-1.929V40h-1.5362Zm5.0263-4.5938L37.6605 40h-1.75l-2.4659-4.5938h1.7003Zm6.7187 4.7479c-.7159 0-1.3406-.164-1.8742-.4922-.5337-.3281-.948-.7871-1.2429-1.3771-.295-.59-.4425-1.2794-.4425-2.0682 0-.7921.1475-1.4848.4425-2.0781.2949-.5933.7092-1.054 1.2429-1.3821.5336-.3281 1.1583-.4922 1.8742-.4922.716 0 1.3407.1641 1.8743.4922.5337.3281.948.7888 1.2429 1.3821.295.5933.4425 1.286.4425 2.0781 0 .7888-.1475 1.4782-.4425 2.0682-.2949.59-.7092 1.049-1.2429 1.3771-.5336.3282-1.1583.4922-1.8743.4922Zm.005-1.2479c.464 0 .8485-.1226 1.1534-.3678.3049-.2453.5303-.5718.6762-.9795.1491-.4076.2237-.8567.2237-1.3473 0-.4872-.0746-.9346-.2237-1.3423-.1459-.411-.3713-.7407-.6762-.9893-.3049-.2486-.6894-.3729-1.1534-.3729-.4673 0-.8551.1243-1.1633.3729-.305.2486-.532.5783-.6811.9893-.1459.4077-.2188.8551-.2188 1.3423 0 .4906.0729.9397.2188 1.3473.1491.4077.3761.7342.6811.9795.3082.2452.696.3678 1.1633.3678ZM46.6435 40v-1.0192l4.1363-5.2549v-.0697h-4.0021v-1.2926h5.8565v1.0838l-3.9772 5.1904v.0696h4.1165V40h-6.13Zm9.826.169c-.4839 0-.9214-.0895-1.3125-.2684-.3911-.1823-.701-.4458-.9297-.7905-.2254-.3447-.3381-.7673-.3381-1.2678 0-.4308.0829-.7855.2486-1.0639.1657-.2784.3894-.4988.6712-.6612.2817-.1624.5966-.2851.9446-.3679.348-.0829.7026-.1458 1.0639-.1889.4574-.0531.8286-.0961 1.1136-.1293.2851-.0365.4922-.0945.6215-.174.1292-.0795.1939-.2088.1939-.3878v-.0348c0-.4342-.1227-.7706-.3679-1.0092-.242-.2387-.6032-.358-1.0838-.358-.5005 0-.8949.1111-1.1833.3331-.285.2188-.4822.4624-.5916.7308l-1.397-.3181c.1657-.464.4077-.8386.7258-1.1236.3215-.2884.6911-.4972 1.1087-.6264.4176-.1326.8568-.1989 1.3175-.1989.3049 0 .6281.0365.9694.1094.3447.0696.6662.1988.9645.3878.3016.1889.5486.459.7408.8103.1922.348.2883.8005.2883 1.3573V40h-1.4517v-1.044h-.0596c-.0961.1922-.2403.3811-.4325.5667-.1923.1856-.4392.3398-.7408.4624-.3016.1226-.6629.1839-1.0838.1839Zm.3231-1.1931c.411 0 .7623-.0813 1.054-.2437.295-.1624.5187-.3745.6712-.6363.1558-.2652.2336-.5486.2336-.8502v-.9843c-.053.053-.1557.1027-.3082.1491-.1491.0431-.3198.0812-.5121.1144-.1922.0298-.3795.058-.5618.0845-.1823.0232-.3347.0431-.4573.0596-.2884.0365-.5519.0978-.7905.184-.2354.0862-.4243.2104-.5668.3729-.1392.159-.2088.3712-.2088.6363 0 .3679.1359.6463.4077.8352.2718.1856.6181.2785 1.039.2785Z" />
            <rect width="48" height="23" x="21.5" y="23.5" stroke="#232529" strokeOpacity=".1" rx="7.5" />
          </g>
          <g filter="url(#roza-cursor)">
            <path fill="#9162F9" d="M11.0959 7.54364 13.8798 23.319c.0407.2304.3472.2837.4633.0806l3.6015-6.3026c.0352-.0617.0951-.1055.1646-.1204l6.2759-1.3448c.2211-.0474.2707-.3408.0773-.4582L11.4719 7.2865c-.1838-.11157-.4133.04544-.376.25714Z" />
            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m10.6035 7.63053 2.7839 15.77537c.122.6911 1.0416.8511 1.3898.2418l3.5461-6.2056 6.1665-1.3214c.6636-.1422.8122-1.0223.2321-1.3745L11.7314 6.8591c-.5513-.33468-1.2399.13634-1.1279.77143Z" />
          </g>
        </svg>
      </motion.div>

      {/* Ethan — orange · bottom right */}
      <motion.div
        className="absolute right-[10%] bottom-[15%]"
        animate={{ x: ETHAN_FLOAT.x, y: ETHAN_FLOAT.y }}
        transition={ETHAN_FLOAT.transition}
      >
        <svg width="79" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="ethan-badge" x="17" y="22" width="62" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius="2" operator="erode" in="SourceAlpha" result="e1" />
              <feOffset dy="3" /><feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.564706 0 0 0 0 0.219608 0 0 0 0.08 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="s1" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius="2" operator="erode" in="SourceAlpha" result="e2" />
              <feOffset dy="2" /><feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.564706 0 0 0 0 0.219608 0 0 0 0.12 0" />
              <feBlend mode="normal" in2="s1" result="s2" />
              <feBlend mode="normal" in="SourceGraphic" in2="s2" result="shape" />
            </filter>
            <filter id="ethan-cursor" x="0.0909424" y="0.24707" width="35.4923" height="38.2793" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius="2" operator="erode" in="SourceAlpha" result="e1" />
              <feOffset dy="4" /><feGaussianBlur stdDeviation="6" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.16 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="s1" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius="4" operator="erode" in="SourceAlpha" result="e2" />
              <feOffset dy="4" /><feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.12 0" />
              <feBlend mode="normal" in2="s1" result="s2" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="e3" />
              <feOffset /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.156863 0 0 0 0 0.25098 0 0 0 0.04 0" />
              <feBlend mode="normal" in2="s2" result="s3" />
              <feBlend mode="normal" in="SourceGraphic" in2="s3" result="shape" />
            </filter>
          </defs>
          <g filter="url(#ethan-badge)">
            <rect x="21" y="23" width="54" height="24" rx="8" fill="#FD9038" />
            <path d="M30.1186 40V29.8182H36.5021V31.1406H31.6548V34.2429H36.169V35.5604H31.6548V38.6776H36.5618V40H30.1186ZM41.7195 32.3636V33.5568H37.5483V32.3636H41.7195ZM38.6669 30.5341H40.1534V37.7578C40.1534 38.0462 40.1965 38.2633 40.2827 38.4091C40.3689 38.5516 40.4799 38.6494 40.6158 38.7024C40.755 38.7521 40.9058 38.777 41.0682 38.777C41.1875 38.777 41.2919 38.7687 41.3814 38.7521C41.4709 38.7356 41.5405 38.7223 41.5902 38.7124L41.8587 39.9403C41.7725 39.9735 41.6499 40.0066 41.4908 40.0398C41.3317 40.0762 41.1328 40.0961 40.8942 40.0994C40.5031 40.1061 40.1385 40.0365 39.8004 39.8906C39.4624 39.7448 39.1889 39.5194 38.9801 39.2145C38.7713 38.9096 38.6669 38.5268 38.6669 38.0661V30.5341ZM44.7344 35.4659V40H43.2479V29.8182H44.7145V33.6065H44.809C44.9879 33.1955 45.2614 32.8691 45.6293 32.6271C45.9972 32.3852 46.4778 32.2642 47.071 32.2642C47.5947 32.2642 48.0521 32.3719 48.4432 32.5874C48.8376 32.8028 49.1425 33.1243 49.358 33.5518C49.5767 33.9761 49.6861 34.5064 49.6861 35.1428V40H48.1996V35.3217C48.1996 34.7616 48.0554 34.3274 47.7671 34.0192C47.4787 33.7076 47.0777 33.5518 46.5639 33.5518C46.2126 33.5518 45.8977 33.6264 45.6193 33.7756C45.3442 33.9247 45.1271 34.1435 44.9681 34.4318C44.8123 34.7169 44.7344 35.0616 44.7344 35.4659ZM53.6121 40.169C53.1282 40.169 52.6907 40.0795 52.2996 39.9006C51.9085 39.7183 51.5986 39.4548 51.3699 39.1101C51.1445 38.7654 51.0318 38.3428 51.0318 37.8423C51.0318 37.4115 51.1147 37.0568 51.2804 36.7784C51.4461 36.5 51.6698 36.2796 51.9515 36.1172C52.2333 35.9548 52.5481 35.8321 52.8962 35.7493C53.2442 35.6664 53.5988 35.6035 53.9601 35.5604C54.4175 35.5073 54.7887 35.4643 55.0737 35.4311C55.3587 35.3946 55.5659 35.3366 55.6952 35.2571C55.8244 35.1776 55.889 35.0483 55.889 34.8693V34.8345C55.889 34.4003 55.7664 34.0639 55.5212 33.8253C55.2792 33.5866 54.9179 33.4673 54.4373 33.4673C53.9369 33.4673 53.5425 33.5784 53.2541 33.8004C52.9691 34.0192 52.7719 34.2628 52.6625 34.5312L51.2655 34.2131C51.4312 33.7491 51.6731 33.3745 51.9913 33.0895C52.3128 32.8011 52.6824 32.5923 53.1 32.4631C53.5176 32.3305 53.9568 32.2642 54.4175 32.2642C54.7224 32.2642 55.0455 32.3007 55.3869 32.3736C55.7316 32.4432 56.0531 32.5724 56.3514 32.7614C56.653 32.9503 56.8999 33.2204 57.0922 33.5717C57.2844 33.9197 57.3805 34.3722 57.3805 34.929V40H55.9288V38.956H55.8692C55.773 39.1482 55.6289 39.3371 55.4366 39.5227C55.2444 39.7083 54.9975 39.8625 54.6959 39.9851C54.3943 40.1077 54.033 40.169 53.6121 40.169ZM53.9352 38.9759C54.3462 38.9759 54.6975 38.8946 54.9892 38.7322C55.2842 38.5698 55.5079 38.3577 55.6604 38.0959C55.8161 37.8307 55.894 37.5473 55.894 37.2457V36.2614C55.841 36.3144 55.7382 36.3641 55.5858 36.4105C55.4366 36.4536 55.2659 36.4917 55.0737 36.5249C54.8815 36.5547 54.6942 36.5829 54.5119 36.6094C54.3296 36.6326 54.1772 36.6525 54.0545 36.669C53.7662 36.7055 53.5027 36.7668 53.264 36.853C53.0287 36.9392 52.8398 37.0634 52.6973 37.2259C52.5581 37.3849 52.4885 37.5971 52.4885 37.8622C52.4885 38.2301 52.6244 38.5085 52.8962 38.6974C53.1679 38.883 53.5143 38.9759 53.9352 38.9759ZM60.567 35.4659V40H59.0805V32.3636H60.5073V33.6065H60.6018C60.7774 33.2022 61.0525 32.8774 61.4271 32.6321C61.8049 32.3868 62.2805 32.2642 62.8539 32.2642C63.3743 32.2642 63.83 32.3736 64.2211 32.5923C64.6122 32.8078 64.9155 33.1293 65.1309 33.5568C65.3463 33.9844 65.454 34.513 65.454 35.1428V40H63.9675V35.3217C63.9675 34.7682 63.8234 34.3357 63.535 34.0241C63.2467 33.7093 62.8506 33.5518 62.3468 33.5518C62.0021 33.5518 61.6955 33.6264 61.4271 33.7756C61.1619 33.9247 60.9514 34.1435 60.7957 34.4318C60.6432 34.7169 60.567 35.0616 60.567 35.4659Z" fill="white" />
            <rect x="21.5" y="23.5" width="53" height="23" rx="7.5" stroke="#232529" strokeOpacity="0.1" />
          </g>
          <g filter="url(#ethan-cursor)">
            <path d="M11.0959 7.54364L13.8798 23.319C13.9205 23.5494 14.227 23.6027 14.3431 23.3996L17.9446 17.097C17.9798 17.0353 18.0397 16.9915 18.1092 16.9766L24.3851 15.6318C24.6062 15.5844 24.6558 15.291 24.4624 15.1736L11.4719 7.2865C11.2881 7.17493 11.0586 7.33194 11.0959 7.54364Z" fill="#FD9038" />
            <path d="M10.6035 7.63053L13.3874 23.4059C13.5094 24.097 14.429 24.257 14.7772 23.6477L18.3233 17.4421L24.4898 16.1207C25.1534 15.9785 25.302 15.0984 24.7219 14.7462L11.7314 6.8591C11.1801 6.52442 10.4915 6.99544 10.6035 7.63053Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </motion.div>

    </div>
  )
}
