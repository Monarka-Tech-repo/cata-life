import type { Metadata } from "next";
import { defaultLocale, localizePath, locales, type Locale } from "@/lib/i18n/config";
import en from "@/lib/i18n/dictionaries/en";
import es, { type Dictionary } from "@/lib/i18n/dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Canonical URL plus hreflang links to every language version of `path`. */
export function pageAlternates(path: string, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, localizePath(path, l)]));
  languages["x-default"] = localizePath(path, defaultLocale);
  return { canonical: localizePath(path, locale), languages };
}

export type { Dictionary };
