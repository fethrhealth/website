/**
 * AnalyticsScripts — server component.
 *
 * Injects third-party analytics <script> tags into the <head> / body.
 * Uses Next.js `next/script` with strategy="afterInteractive" so scripts
 * load after hydration and never block the critical path.
 *
 * Each block is guarded by its env var — missing IDs = no script injected.
 * IDs come from .env.local (see .env.local.example for var names).
 */

import Script from 'next/script'

const GA4_ID      = process.env.NEXT_PUBLIC_GA4_ID
const LINKEDIN_ID = process.env.NEXT_PUBLIC_LINKEDIN_ID
const META_ID     = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function AnalyticsScripts(): React.ReactElement {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Google Analytics 4                                                   */}
      {/* ------------------------------------------------------------------ */}
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* LinkedIn Insight Tag                                                 */}
      {/* ------------------------------------------------------------------ */}
      {LINKEDIN_ID && (
        <Script id="li-tag" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${LINKEDIN_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l){
              if(!l){ window.lintrk = function(a,b){ window.lintrk.q.push([a,b]) }; window.lintrk.q=[]; }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Meta (Facebook) Pixel                                                */}
      {/* ------------------------------------------------------------------ */}
      {META_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_ID}');
          `}
        </Script>
      )}

    </>
  )
}
