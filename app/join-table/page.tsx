import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JoinTableClient } from "@/components/join-table-client";

export const metadata: Metadata = {
  title: "Únete a la mesa",
  description: "Acepta una invitación y únete a una mesa compartida en CATA.",
  alternates: { canonical: "/join-table" },
  robots: { index: false, follow: false },
};

export default function JoinTablePage() {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-12">
      <div aria-hidden="true" className="absolute -left-28 top-16 -z-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-8 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="mx-auto w-full max-w-lg">
        <Link href="/" className="mx-auto mb-7 flex w-fit items-center" aria-label="Ir al inicio de CATA">
          <Image src="/assets/cata/cata-logo.png" alt="CATA Dining Journal" width={104} height={104} priority className="h-auto w-24" />
        </Link>
        <section className="rounded-[2rem] border border-border bg-card p-7 shadow-[0_30px_80px_rgba(56,39,25,.14)] sm:p-10">
          <JoinTableClient />
        </section>
      </div>
    </main>
  );
}
