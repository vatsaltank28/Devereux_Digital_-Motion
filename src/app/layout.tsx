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

/** Marks the document as JS-enabled before first paint so motion pre-states only apply when JS can resolve them. */
const jsFlag = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <Script id="js-flag" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body suppressHydrationWarning>
        <JsFlag />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
          <SiteHeader />
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
