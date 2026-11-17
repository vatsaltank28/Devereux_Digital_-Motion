import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "@/styles/globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
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

/** Marks the document as JS-enabled before first paint so motion pre-states only apply when JS can resolve them. */
const jsFlag = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <JsFlag />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <div id="site-content">
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
          </div>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
