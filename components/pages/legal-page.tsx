import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, pageAlternates } from "@/lib/i18n";
import type { LegalSection } from "@/lib/i18n/types";

type LegalDoc = "privacy" | "terms";

export function legalMetadata(doc: LegalDoc, locale: Locale): Metadata {
  return {
    title: getDictionary(locale)[doc].title,
    alternates: pageAlternates(`/${doc}`, locale),
  };
}

// Renders "Label: value" list items with the label in bold.
function renderLine(text: string) {
  const [label, ...rest] = text.split(": ");
  const value = rest.join(": ");
  if (!value) return text;
  return (
    <>
      <strong className="font-semibold text-foreground">{label}:</strong> {value}
    </>
  );
}

function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 pl-0 ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-accent before:content-['▸']"
        >
          {renderLine(item)}
        </li>
      ))}
    </ul>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section>
      <h2 className="border-b border-border-2 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">{section.title}</h2>

      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}

      {section.list && <BulletList items={section.list} className="mt-3" />}

      {section.subsections?.map((sub, i) => (
        <div key={i} className={i > 0 ? "mt-5" : "mt-3"}>
          {sub.h3 && <h3 className="mb-2 text-sm font-semibold text-foreground">{sub.h3}</h3>}
          {sub.paragraphs?.map((p, j) => (
            <p key={j} className="mb-2 text-sm leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          {sub.list && <BulletList items={sub.list} />}
        </div>
      ))}
    </section>
  );
}

export function LegalPage({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const t = getDictionary(locale);
  const content = t[doc];

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <Link href={localizePath("/", locale)} className="text-sm font-medium text-accent underline underline-offset-4">
        {t.common.backHome}
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <Image src="/assets/cata/cata-logo.png" alt="CATA" width={56} height={56} className="rounded-2xl border border-border-2" />
        <div>
          <h1 className="font-heading text-3xl italic tracking-normal normal-case md:text-4xl">{content.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {t.common.lastUpdated}: {content.lastUpdated}
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {content.sections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
