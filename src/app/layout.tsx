import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import { defaultShareImage, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "@/styles/globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "optional",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Web Design, AI Automation & Digital Solutions`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Web Design, AI Automation & Digital Solutions`,
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [defaultShareImage],
  },
  twitter: { card: "summary_large_image", title: `${site.name} | Web Design, AI Automation & Digital Solutions`, description: site.description, images: [defaultShareImage.url] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "dark light",
  viewportFit: "cover",
};

import { JsFlag } from "@/components/layout/JsFlag";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { DeferredUI } from "@/components/layout/DeferredUI";
import { desktopNavData } from "@/data/navMenu";

/** Marks the document as JS-enabled before first paint so motion pre-states only apply when JS can resolve them. */
const jsFlag = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
window.ddClearAnalyticsCookies = function(){
  document.cookie.split(';').forEach(function(c){
    var n = c.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat|_gcl)/.test(n)) return;
    var p = location.hostname.split('.');
    for (var i = 0; i < p.length; i++) {
      var d = p.slice(i).join('.');
      document.cookie = n + '=; Max-Age=0; path=/; domain=.' + d;
      document.cookie = n + '=; Max-Age=0; path=/; domain=' + d;
    }
    document.cookie = n + '=; Max-Age=0; path=/';
  });
};
var ddConsent = null;
try { ddConsent = JSON.parse(localStorage.getItem('dd-cookie-consent')); } catch (e) {}
var ddStats = ddConsent && ddConsent.statistics ? 'granted' : 'denied';
var ddAds = ddConsent && ddConsent.marketing ? 'granted' : 'denied';
if (ddStats === 'denied') window.ddClearAnalyticsCookies();
gtag('consent', 'default', { analytics_storage: ddStats, ad_storage: ddAds, ad_user_data: ddAds, ad_personalization: ddAds });
gtag('js', new Date());

gtag('config', 'G-7BM1XJJ4K6');
(function(){
  var done = false, events = ['pointerdown','keydown','scroll','touchstart'];
  function load(){
    if (done) return; done = true;
    document.documentElement.classList.add('motion-ready');
    events.forEach(function(e){ removeEventListener(e, load); });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-7BM1XJJ4K6';
    document.head.appendChild(s);
  }
  events.forEach(function(e){ addEventListener(e, load, { once: true, passive: true }); });
  setTimeout(load, 8000);
})();`}
        </Script>
        <Script id="js-flag" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body suppressHydrationWarning>
        <JsFlag />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
          <SiteHeader navData={desktopNavData} />
          <div id="site-content">
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
          </div>
        <WhatsAppButton />
        <DeferredUI />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]) }}
        />
      </body>
    </html>
  );
}
