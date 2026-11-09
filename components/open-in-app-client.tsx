"use client";

// Landing page for app deep links (cata.life/u/…, /dish/…, /trip/…) opened
// where the app didn't intercept them: app not installed, desktop, or an
// in-app browser that skips universal links. Cloudflare serves /open/ for
// those paths (public/_redirects), so the real path is read from the URL.

import { useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { useI18n } from "@/components/locale-provider";
import { stripLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

// Keep in sync with CATA_App/src/navigation/linking.js.
const KIND_BY_SEGMENT = { u: "profile", dish: "dish", trip: "trip" } as const;
type Kind = (typeof KIND_BY_SEGMENT)[keyof typeof KIND_BY_SEGMENT];

// Firebase uids and Firestore ids are URL-safe; anything else is ignored so
// the custom-scheme link is never built from arbitrary input.
const DEEP_LINK = /^\/(u|dish|trip)\/([A-Za-z0-9_-]{1,128})\/?$/;

type Target = { kind: Kind; appUrl: string } | null;

const ANDROID_PACKAGE = "com.cata.app";

/**
 * Where a phone should go automatically, or null to just show the page.
 *
 * Android: a Chrome intent URL opens the app on the shared screen if it's
 * installed, and Chrome itself falls back to Google Play if it isn't — no
 * guessing with timers. Works in Chrome and Chrome Custom Tabs (WhatsApp).
 *
 * iPhone: Safari has no equivalent fallback (a cata:// link without the app
 * shows an "invalid address" error), and once apple-app-site-association
 * lists these paths, iPhones *with* the app open it before this page ever
 * loads. So an iPhone reaching this page almost always lacks the app → App
 * Store. The "Open in CATA" button stays on the page for the rare exception.
 */
function handoffUrl(target: NonNullable<Target>, userAgent: string): string | null {
  if (/android/i.test(userAgent)) {
    const path = target.appUrl.replace(/^cata:\/\//, "");
    const fallback = encodeURIComponent(siteConfig.playStoreUrl);
    return `intent://${path}#Intent;scheme=cata;package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
  }
  // iPadOS reports itself as Mac; touch support tells them apart.
  const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    || (/macintosh/i.test(userAgent) && typeof document !== "undefined" && "ontouchend" in document);
  if (isIOS) return siteConfig.appStoreUrl;
  return null;
}

// The path never changes while this page is open.
const noopSubscribe = () => () => {};

function resolveTarget(pathname: string): Target {
  const match = stripLocale(pathname).match(DEEP_LINK);
  if (!match) return null;
  const segment = match[1] as keyof typeof KIND_BY_SEGMENT;
  return { kind: KIND_BY_SEGMENT[segment], appUrl: `cata://${segment}/${match[2]}` };
}

export function OpenInAppClient() {
  const { t, href } = useI18n();
  const copy = t.openInApp;
  // The static HTML is built for /open/, so the server snapshot has no
  // target; the browser reads the real (rewritten) path on hydration.
  const pathname = useSyncExternalStore(noopSubscribe, () => window.location.pathname, () => null);
  const target = useMemo(() => (pathname ? resolveTarget(pathname) : null), [pathname]);

  // On phones, don't make people read a page: hand off once per link per tab
  // session (so pressing Back from the store doesn't bounce them again).
  useEffect(() => {
    if (!target) return;
    const handoff = handoffUrl(target, navigator.userAgent);
    if (!handoff) return; // desktop: the page and its buttons are the answer
    const key = `cata-handoff:${location.pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // storage blocked (private mode): still hand off — worst case Back re-runs it
    }
    window.location.replace(handoff);
  }, [target]);

  const title = target ? copy.titles[target.kind] : copy.titles.generic;

  return (
    <div className="text-center">
      <p className="font-hand text-2xl font-semibold text-accent">{copy.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">{copy.body}</p>

      {target && (
        <>
          <a
            href={target.appUrl}
            className="mt-8 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-accent px-6 font-semibold text-background transition hover:bg-foreground"
          >
            {copy.open}
          </a>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">{copy.notInstalled}</p>
        </>
      )}

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={siteConfig.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent">
          {copy.downloadIphone}
        </a>
        <a href={siteConfig.playStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-border-2 px-6 font-semibold text-foreground transition hover:bg-secondary">
          {copy.downloadAndroid}
        </a>
      </div>

      <Link href={href("/")} className="mt-6 block text-sm font-medium text-accent underline underline-offset-4">
        {copy.goToCata}
      </Link>
    </div>
  );
}
