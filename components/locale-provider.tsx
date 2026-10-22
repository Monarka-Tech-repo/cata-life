"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n";

type I18n = {
  locale: Locale;
  t: Dictionary;
  /** Locale-aware internal link: href("/privacy") -> "/en/privacy" on English pages. */
  href: (path: string) => string;
};

function buildI18n(locale: Locale): I18n {
  return { locale, t: getDictionary(locale), href: (path) => localizePath(path, locale) };
}

const I18nContext = createContext<I18n>(buildI18n(defaultLocale));

// Only the locale string crosses the server/client boundary; dictionaries
// contain plural functions, so each side looks them up itself.
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo(() => buildI18n(locale), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
