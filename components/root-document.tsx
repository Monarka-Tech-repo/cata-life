import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { AuthProvider } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/site-header";
import { LocaleProvider } from "@/components/locale-provider";
import { LOCALE_STORAGE_KEY, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Runs before paint on Spanish pages only. First-time visitors whose browser's
// preferred language isn't Spanish are sent to the English version; an explicit
// choice from the language switcher always wins. Crawlers are skipped so search
// engines index both versions (they find each other through hreflang links).
const languageRedirectScript = `(function(){try{
var p=location.pathname;if(/^\\/en(\\/|$)/.test(p))return;
var s=null;try{s=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)})}catch(e){}if(s===${JSON.stringify(defaultLocale)})return;
var go=s==="en";
if(!go){if(/bot|crawl|spider|slurp|facebookexternalhit|lighthouse|headless/i.test(navigator.userAgent))return;
var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";go=!!l&&!/^es(-|$)/i.test(l);}
if(go)location.replace("/en"+p+location.search+location.hash);
}catch(e){}})();`;

export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    description: getDictionary(locale).meta.siteDescription,
  };
}

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${fraunces.variable} ${plusJakarta.variable} ${caveat.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Plain inline script (not next/script) so it runs during HTML parsing, before first paint. */}
        {locale === defaultLocale && <script dangerouslySetInnerHTML={{ __html: languageRedirectScript }} />}
        <LocaleProvider locale={locale}>
          <AuthProvider>
            <SiteHeader />
            {children}
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
