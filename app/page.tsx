import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CataScreensShowcase } from "@/components/cata-screens-showcase";

const testFlightUrl = "https://testflight.apple.com/join/wpZP6h12";

function AppleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M17.05 12.54c-.03-3.06 2.5-4.55 2.62-4.62a5.63 5.63 0 0 0-4.44-2.4c-1.87-.2-3.68 1.12-4.63 1.12-.97 0-2.43-1.1-4.01-1.07a5.88 5.88 0 0 0-4.95 3.02c-2.15 3.72-.55 9.2 1.51 12.21 1.03 1.47 2.23 3.1 3.81 3.04 1.55-.06 2.13-.98 4-.98 1.84 0 2.38.98 4 .94 1.66-.02 2.7-1.47 3.69-2.95a12.2 12.2 0 0 0 1.69-3.45 5.29 5.29 0 0 1-3.29-4.86ZM14.01 3.54A5.35 5.35 0 0 0 15.23 0a5.46 5.46 0 0 0-3.52 1.68 5.05 5.05 0 0 0-1.25 3.4 4.5 4.5 0 0 0 3.55-1.54Z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "CATA",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="relative isolate flex-1 overflow-hidden">
      <div aria-hidden="true" className="absolute -left-28 top-20 -z-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-16 px-6 py-16 md:grid-cols-[1fr_auto] md:gap-20 md:py-24">
        <section className="text-center md:text-left">
          <Image
            src="/assets/cata/cata-logo.png"
            alt="CATA Dining Journal"
            width={140}
            height={140}
            priority
            className="mx-auto h-auto w-32 md:mx-0 md:w-36"
          />

          <p className="mt-10 font-hand text-2xl font-semibold text-accent">Sé de los primeros en probarla</p>
          <h1 className="mt-3 max-w-2xl font-heading text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Tu próxima gran comida empieza aquí.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground md:mx-0 md:text-lg">
            Descarga la beta de CATA en tu iPhone y ayúdanos a construir una mejor forma de descubrir, guardar y compartir lo que comes.
          </p>

          <a
            href={testFlightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-foreground px-7 text-base font-semibold text-background shadow-[0_16px_38px_rgba(26,26,24,.2)] transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <AppleMark />
            Descargar con TestFlight
          </a>
          <p className="mt-4 text-xs text-muted-foreground">Disponible para iPhone · Cupos limitados</p>

          <Link
            href="/privacy"
            className="mt-8 block text-sm font-medium text-accent underline underline-offset-4"
          >
            Política de Privacidad
          </Link>
        </section>

        <CataScreensShowcase />
      </div>
    </main>
  );
}
