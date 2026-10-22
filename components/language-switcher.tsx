"use client";

import { usePathname } from "next/navigation";
import { LOCALE_STORAGE_KEY, localizePath, locales, stripLocale, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/components/locale-provider";

function rememberChoice(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage blocked (private mode etc.) — the link still switches language.
  }
}

export function LanguageSwitcher({ onSwitch }: { onSwitch?: () => void }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname);

  return (
    <div role="group" aria-label={t.nav.languageLabel} className="flex items-center gap-1 text-xs font-semibold">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-muted-foreground">·</span>}
          {l === locale ? (
            <span aria-current="true" className="text-accent">{l.toUpperCase()}</span>
          ) : (
            // Plain <a>: each language has its own root layout, so switching is a full page load anyway.
            <a
              href={localizePath(basePath, l)}
              hrefLang={l}
              lang={l}
              onClick={(event) => {
                // Keep query params (e.g. ?table= invites, ?trip= links) when switching.
                event.preventDefault();
                rememberChoice(l);
                onSwitch?.();
                window.location.assign(localizePath(basePath, l) + window.location.search + window.location.hash);
              }}
              className="text-foreground/70 transition hover:text-accent"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
