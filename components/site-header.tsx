"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { signOutUser } from "@/lib/auth-service";
import { useI18n } from "@/components/locale-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader() {
  const { user, isRealUser, loading } = useAuth();
  const { t, href } = useI18n();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: href("/taste"), label: t.nav.taste },
    { href: href("/planner"), label: t.nav.planner },
    { href: href("/comunidad"), label: t.nav.community },
  ];

  const initial = (user?.displayName || user?.email || "C").trim().charAt(0).toUpperCase();

  return (
    <header className="relative z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={href("/")} className="flex items-center gap-2" aria-label={t.common.homeAria}>
          <Image src="/assets/cata/cata-logo.png" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-heading text-lg italic normal-case">CATA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher />
          {!loading && isRealUser ? (
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {initial}
              </span>
              <button
                type="button"
                onClick={() => signOutUser()}
                className="text-sm font-medium text-foreground/80 transition hover:text-accent"
              >
                {t.nav.signOut}
              </button>
            </div>
          ) : (
            <Link
              href={href("/login")}
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:bg-accent"
            >
              {t.nav.signIn}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-2"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium">
                {link.label}
              </Link>
            ))}
            {!loading && isRealUser ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOutUser();
                }}
                className="text-left text-sm font-medium text-accent"
              >
                {t.nav.signOut}
              </button>
            ) : (
              <Link href={href("/login")} onClick={() => setOpen(false)} className="text-sm font-semibold text-accent">
                {t.nav.signIn}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
