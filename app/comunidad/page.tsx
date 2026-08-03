import type { Metadata } from "next";
import { CommunityClient } from "@/components/community-client";

export const metadata: Metadata = {
  title: "Comunidad",
  alternates: { canonical: "/comunidad" },
};

export default function ComunidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <h1 className="font-heading text-4xl italic tracking-normal normal-case">Comunidad</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Gustos y recomendaciones de todas las personas que han usado CATA — sin necesidad de cuenta.
      </p>
      <div className="mt-10">
        <CommunityClient />
      </div>
    </main>
  );
}
