export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

// Spanish lives at the site root; every other locale is served under /<locale>/.
export const defaultLocale: Locale = "es";

// localStorage key holding the visitor's explicit language choice from the switcher.
export const LOCALE_STORAGE_KEY = "cata-locale";

const prefixPattern = new RegExp(`^/(${locales.filter((l) => l !== defaultLocale).join("|")})(?=/|$)`);

/** Maps a locale-less path ("/privacy") to its URL in `locale` ("/en/privacy"). */
export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Removes any locale prefix: "/en/privacy/" -> "/privacy/", "/en" -> "/". */
export function stripLocale(pathname: string): string {
  return pathname.replace(prefixPattern, "") || "/";
}
