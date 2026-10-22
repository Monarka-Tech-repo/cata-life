import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, pageAlternates } from "@/lib/i18n";

const SUPPORT_EMAIL = "cata.support@monarka.tech";

export function supportMetadata(locale: Locale): Metadata {
  return {
    title: getDictionary(locale).support.title,
    alternates: pageAlternates("/support", locale),
  };
}

export function SupportPage({ locale }: { locale: Locale }) {
  const { support, common } = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <Link href={localizePath("/", locale)} className="text-sm font-medium text-accent underline underline-offset-4">
        {common.backHome}
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <Image src="/assets/cata/cata-logo.png" alt="CATA" width={56} height={56} className="rounded-2xl border border-border-2" />
        <div>
          <h1 className="font-heading text-3xl italic tracking-normal normal-case md:text-4xl">{support.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{support.subtitle}</p>
        </div>
      </div>

      <section className="mt-12 rounded-2xl border border-border-2 bg-muted/30 p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">{support.contactTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{support.contactBody}</p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4"
        >
          {SUPPORT_EMAIL}
        </a>
      </section>

      <div className="mt-12 space-y-8">
        <h2 className="border-b border-border-2 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">{support.faqTitle}</h2>
        {support.faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-border-2 pt-6 text-xs text-muted-foreground">
        <p>MONARKA TECH LLC</p>
        <div className="mt-1 flex gap-4">
          <Link href={localizePath("/privacy", locale)} className="inline-block text-accent underline underline-offset-4">
            {common.privacy}
          </Link>
          <Link href={localizePath("/terms", locale)} className="inline-block text-accent underline underline-offset-4">
            {common.terms}
          </Link>
        </div>
      </div>
    </div>
  );
}
