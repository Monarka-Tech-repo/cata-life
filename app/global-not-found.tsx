import "./globals.css";
import type { Metadata } from "next";
import { RootDocument } from "@/components/root-document";
import { localizePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

// One static 404 serves every unmatched URL in both languages, so it shows both.
export const metadata: Metadata = {
  title: "404 — CATA",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="es">
      <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-12 px-6 py-24">
        <p className="font-hand text-3xl font-semibold text-accent">404</p>
        {locales.map((locale) => {
          const { notFound } = getDictionary(locale);
          return (
            <section key={locale} lang={locale}>
              <h1 className="font-heading text-3xl italic tracking-normal normal-case">{notFound.title}</h1>
              <p className="mt-3 text-sm text-muted-foreground">{notFound.body}</p>
              <a href={localizePath("/", locale)} className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-4">
                {notFound.home}
              </a>
            </section>
          );
        })}
      </main>
    </RootDocument>
  );
}
