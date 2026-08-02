import type { Metadata } from "next";
import Link from "next/link";
import { CataScreensShowcase } from "@/components/cata-screens-showcase";

export const metadata: Metadata = {
  title: "CATA",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center gap-16 px-6 py-20 md:flex-row md:items-center md:justify-between md:gap-12 md:py-32">
      <div className="max-w-md text-center md:text-left">
        <h1 className="font-heading text-5xl italic tracking-normal normal-case md:text-6xl">CATA</h1>
        <p className="mt-6 text-sm italic text-muted-foreground">Contenido pendiente — descripción de la app.</p>
        <Link
          href="/privacy"
          className="mt-8 inline-block text-sm font-medium text-accent underline underline-offset-4"
        >
          Política de Privacidad
        </Link>
      </div>

      <CataScreensShowcase />
    </div>
  );
}
