import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-12">
      <div aria-hidden="true" className="absolute -left-28 top-16 -z-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-8 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mx-auto mb-7 flex w-fit items-center" aria-label="Ir al inicio de CATA">
          <Image src="/assets/cata/cata-logo.png" alt="CATA Dining Journal" width={104} height={104} priority className="h-auto w-24" />
        </Link>
        <section className="rounded-[2rem] border border-border bg-card p-7 shadow-[0_30px_80px_rgba(56,39,25,.14)] sm:p-10">
          <h1 className="text-center font-heading text-3xl italic tracking-normal normal-case">Tu cuenta CATA</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            La misma cuenta que usas en la app.
          </p>
          <div className="mt-7">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
