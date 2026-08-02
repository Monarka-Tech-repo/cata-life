import type { Metadata } from "next";
import { PlannerClient } from "@/components/planner-client";

export const metadata: Metadata = {
  title: "Planificador de Viajes",
  alternates: { canonical: "/planner" },
  robots: { index: false, follow: false },
};

export default function PlannerPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <h1 className="font-heading text-4xl italic tracking-normal normal-case">Planificador de Viajes</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Guarda restaurantes para tu próximo viaje — sincronizado con la app CATA.
      </p>
      <div className="mt-10">
        <PlannerClient />
      </div>
    </main>
  );
}
