import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { localizePath, locales } from "@/lib/i18n/config";

export const dynamic = "force-static";

// Indexable pages only (login, planner, taste and join-table are noindex).
const routes = ["/", "/comunidad", "/support", "/privacy", "/terms"];

// Trailing slash matches the URLs the site actually serves (trailingSlash: true).
function absolute(path: string) {
  return `${siteConfig.url}${path === "/" ? "/" : `${path}/`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const languages = Object.fromEntries(locales.map((l) => [l, absolute(localizePath(route, l))]));
    return locales.map((locale) => ({
      url: absolute(localizePath(route, locale)),
      lastModified: new Date(),
      alternates: { languages },
    }));
  });
}
