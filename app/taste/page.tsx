import type { Metadata } from "next";
import { TasteProfileClient } from "@/components/taste-profile-client";

export const metadata: Metadata = {
  title: "Mi Perfil de Gustos",
  alternates: { canonical: "/taste" },
  robots: { index: false, follow: false },
};

export default function TastePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <h1 className="font-heading text-4xl italic tracking-normal normal-case">Mi Perfil de Gustos</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Basado en los platillos que has registrado en CATA.
      </p>
      <div className="mt-10">
        <TasteProfileClient />
      </div>
    </main>
  );
}
