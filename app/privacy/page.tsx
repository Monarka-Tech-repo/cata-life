import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-32">
      <h1 className="font-heading text-4xl italic tracking-normal normal-case">Política de Privacidad</h1>
      <div className="mt-8 rounded-lg border border-dashed border-border-2 bg-secondary p-6 text-sm text-muted-foreground">
        Contenido pendiente — Rubén proporcionará el texto legal completo.
      </div>
    </div>
  );
}
