// Page shells for the interactive tools (login, taste profile, planner,
// community, join-table). The interactive parts are client components that
// read the locale from LocaleProvider.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { TasteProfileClient } from "@/components/taste-profile-client";
import { PlannerClient } from "@/components/planner-client";
import { CommunityClient } from "@/components/community-client";
import { JoinTableClient } from "@/components/join-table-client";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, pageAlternates } from "@/lib/i18n";

const noIndex = { index: false, follow: false };

export function loginMetadata(locale: Locale): Metadata {
  return { title: getDictionary(locale).login.metaTitle, alternates: pageAlternates("/login", locale), robots: noIndex };
}

export function tasteMetadata(locale: Locale): Metadata {
  return { title: getDictionary(locale).taste.title, alternates: pageAlternates("/taste", locale), robots: noIndex };
}

export function plannerMetadata(locale: Locale): Metadata {
  return { title: getDictionary(locale).planner.title, alternates: pageAlternates("/planner", locale), robots: noIndex };
}

export function communityMetadata(locale: Locale): Metadata {
  return { title: getDictionary(locale).community.title, alternates: pageAlternates("/comunidad", locale) };
}

export function joinTableMetadata(locale: Locale): Metadata {
  const { joinTable } = getDictionary(locale);
  return {
    title: joinTable.metaTitle,
    description: joinTable.metaDescription,
    alternates: pageAlternates("/join-table", locale),
    robots: noIndex,
  };
}

function Glow() {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-28 top-16 -z-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-8 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
    </>
  );
}

function LogoLink({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Link href={localizePath("/", locale)} className="mx-auto mb-7 flex w-fit items-center" aria-label={t.common.homeAria}>
      <Image src="/assets/cata/cata-logo.png" alt={t.login.logoAlt} width={104} height={104} priority className="h-auto w-24" />
    </Link>
  );
}

function ToolPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <h1 className="font-heading text-4xl italic tracking-normal normal-case">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-10">{children}</div>
    </main>
  );
}

export function LoginPage({ locale }: { locale: Locale }) {
  const { login } = getDictionary(locale);
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-12">
      <Glow />
      <div className="mx-auto w-full max-w-md">
        <LogoLink locale={locale} />
        <section className="rounded-[2rem] border border-border bg-card p-7 shadow-[0_30px_80px_rgba(56,39,25,.14)] sm:p-10">
          <h1 className="text-center font-heading text-3xl italic tracking-normal normal-case">{login.title}</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">{login.subtitle}</p>
          <div className="mt-7">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export function TastePage({ locale }: { locale: Locale }) {
  const { taste } = getDictionary(locale);
  return (
    <ToolPage title={taste.title} subtitle={taste.subtitle}>
      <TasteProfileClient />
    </ToolPage>
  );
}

export function PlannerPage({ locale }: { locale: Locale }) {
  const { planner } = getDictionary(locale);
  return (
    <ToolPage title={planner.title} subtitle={planner.subtitle}>
      <PlannerClient />
    </ToolPage>
  );
}

export function CommunityPage({ locale }: { locale: Locale }) {
  const { community } = getDictionary(locale);
  return (
    <ToolPage title={community.title} subtitle={community.subtitle}>
      <CommunityClient />
    </ToolPage>
  );
}

export function JoinTablePage({ locale }: { locale: Locale }) {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-12">
      <Glow />
      <div className="mx-auto w-full max-w-lg">
        <LogoLink locale={locale} />
        <section className="rounded-[2rem] border border-border bg-card p-7 shadow-[0_30px_80px_rgba(56,39,25,.14)] sm:p-10">
          <JoinTableClient />
        </section>
      </div>
    </main>
  );
}
