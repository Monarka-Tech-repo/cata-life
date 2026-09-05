import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Soporte",
  alternates: { canonical: "/support" },
};

const SUPPORT_EMAIL = "cata.support@monarka.tech";

const faqs: { question: string; answer: string }[] = [
  {
    question: "¿Cómo reporto un error o problema técnico?",
    answer: `Escríbenos a ${SUPPORT_EMAIL} contándonos qué pasó, en qué pantalla ocurrió y, si puedes, incluye una captura de pantalla. Respondemos la mayoría de los correos en menos de 48 horas.`,
  },
  {
    question: "¿Cómo sugiero una función nueva?",
    answer: `Nos encanta escuchar ideas. Mándanos tu sugerencia a ${SUPPORT_EMAIL} — muchas de las funciones de CATA nacieron de feedback de usuarios en TestFlight.`,
  },
  {
    question: "¿Cómo elimino mi cuenta y mis datos?",
    answer: "Desde la app, ve a Ajustes → Cuenta → Eliminar cuenta. La eliminación es inmediata y permanente: se borran tu perfil, platillos, publicaciones, comentarios y demás contenido asociado. También puedes solicitarlo por correo.",
  },
  {
    question: "¿CATA tiene algún costo?",
    answer: "No. CATA es gratis y actualmente está disponible como beta pública a través de TestFlight mientras seguimos puliendo la experiencia antes del lanzamiento oficial.",
  },
  {
    question: "¿Cómo accedo a la beta en TestFlight?",
    answer: "Descarga la app TestFlight de Apple y usa el enlace de invitación en la página principal de cata.life. Si el cupo está lleno, escríbenos y te avisamos cuando se abran más lugares.",
  },
  {
    question: "¿Dónde veo qué información recopila CATA?",
    answer: "Toda la información sobre qué datos usamos y cómo los protegemos está en nuestra Política de Privacidad.",
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <Link
        href="/"
        className="text-sm font-medium text-accent underline underline-offset-4"
      >
        ← Volver a inicio
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <Image
          src="/assets/cata/cata-logo.png"
          alt="CATA"
          width={56}
          height={56}
          className="rounded-2xl border border-border-2"
        />
        <div>
          <h1 className="font-heading text-3xl italic tracking-normal normal-case md:text-4xl">
            Soporte
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            ¿En qué podemos ayudarte?
          </p>
        </div>
      </div>

      <section className="mt-12 rounded-2xl border border-border-2 bg-muted/30 p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
          Contáctanos
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          ¿Tienes una pregunta, un problema o una idea? Escríbenos directamente y te responderemos lo antes posible.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4"
        >
          {SUPPORT_EMAIL}
        </a>
      </section>

      <div className="mt-12 space-y-8">
        <h2 className="border-b border-border-2 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
          Preguntas frecuentes
        </h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-border-2 pt-6 text-xs text-muted-foreground">
        <p>MONARKA TECH LLC</p>
        <div className="mt-1 flex gap-4">
          <Link href="/privacy" className="inline-block text-accent underline underline-offset-4">
            Política de Privacidad
          </Link>
          <Link href="/terms" className="inline-block text-accent underline underline-offset-4">
            Términos de Servicio
          </Link>
        </div>
      </div>
    </div>
  );
}
