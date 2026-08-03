import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookHeart, ChartNoAxesCombined, ChevronDown, Camera, Sparkles, UsersRound } from "lucide-react";
import { CataScreensShowcase } from "@/components/cata-screens-showcase";

const testFlightUrl = "https://testflight.apple.com/join/wpZP6h12";

const benefits = [
  {
    icon: BookHeart,
    title: "Tu diario gastronómico",
    body: "Guarda cada platillo con fotos, calificaciones y notas para recordar lo que realmente valió la pena.",
  },
  {
    icon: UsersRound,
    title: "Comparte la mesa",
    body: "Invita a tus amigos, arma el pedido de todos y divide la cuenta sin perder el sabor del momento.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Descubre tu gusto",
    body: "Convierte tus registros en un perfil vivo de cocinas, sabores y lugares que cuentan tu historia.",
  },
];

const steps = [
  { number: "01", icon: Camera, title: "Prueba algo", body: "Visita un restaurante y fotografía el platillo que quieres recordar." },
  { number: "02", icon: Sparkles, title: "Hazlo parte de tu historia", body: "Califica, etiqueta sabores y guarda los detalles que hicieron especial la experiencia." },
  { number: "03", icon: UsersRound, title: "Compártelo", body: "Invita a tu mesa, recomienda lo mejor y descubre qué están disfrutando tus amigos." },
];

const betaBenefits = ["Acceso anticipado a nuevas funciones", "Ayuda a definir el futuro de CATA", "Feedback directo desde TestFlight"];

function AppleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M17.05 12.54c-.03-3.06 2.5-4.55 2.62-4.62a5.63 5.63 0 0 0-4.44-2.4c-1.87-.2-3.68 1.12-4.63 1.12-.97 0-2.43-1.1-4.01-1.07a5.88 5.88 0 0 0-4.95 3.02c-2.15 3.72-.55 9.2 1.51 12.21 1.03 1.47 2.23 3.1 3.81 3.04 1.55-.06 2.13-.98 4-.98 1.84 0 2.38.98 4 .94 1.66-.02 2.7-1.47 3.69-2.95a12.2 12.2 0 0 0 1.69-3.45 5.29 5.29 0 0 1-3.29-4.86ZM14.01 3.54A5.35 5.35 0 0 0 15.23 0a5.46 5.46 0 0 0-3.52 1.68 5.05 5.05 0 0 0-1.25 3.4 4.5 4.5 0 0 0 3.55-1.54Z" />
    </svg>
  );
}

function TestFlightButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={testFlightUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-base font-semibold shadow-[0_16px_38px_rgba(26,26,24,.18)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${
        light ? "bg-background text-foreground hover:bg-white focus-visible:outline-background" : "bg-foreground text-background hover:bg-accent focus-visible:outline-accent"
      }`}
    >
      <AppleMark />
      Descargar con TestFlight
    </a>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-hand text-2xl font-semibold text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{title}</h2>
      {body && <p className="mt-5 leading-7 text-muted-foreground">{body}</p>}
    </div>
  );
}

export const metadata: Metadata = {
  title: "CATA — Tu diario gastronómico social",
  description: "Guarda tus platillos, descubre tu perfil de gustos y comparte la mesa con tus amigos. Descarga la beta de CATA para iPhone.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CATA — Tu diario gastronómico social",
    description: "Recuerda lo que comiste, descubre tu gusto y comparte la mesa.",
    url: "/",
    siteName: "CATA",
    images: [{ url: "/assets/cata/cata-logo.png", width: 500, height: 500, alt: "CATA Dining Journal" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CATA — Tu diario gastronómico social",
    description: "Recuerda lo que comiste, descubre tu gusto y comparte la mesa.",
    images: ["/assets/cata/cata-logo.png"],
  },
};

export default function HomePage() {
  return (
    <main className="relative isolate flex-1 overflow-hidden">
      <section className="relative">
        <div aria-hidden="true" className="absolute -left-28 top-20 -z-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

        <div className="mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-6xl items-center gap-16 px-6 py-16 md:grid-cols-[1fr_auto] md:gap-20 md:py-24">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Beta abierta para iPhone
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Tu diario gastronómico, <span className="italic text-accent">compartido.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground md:mx-0 md:text-lg">
              Guarda los platillos que amas, descubre qué define tu gusto y comparte la mesa con las personas que hacen memorable cada comida.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <TestFlightButton />
              <a href="#como-funciona" className="inline-flex min-h-14 items-center gap-2 px-4 text-sm font-semibold text-foreground transition hover:text-accent">
                Ver cómo funciona <ChevronDown className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Disponible para iPhone · Cupos limitados · Beta gratuita</p>
          </div>

          <CataScreensShowcase />
        </div>
      </section>

      <section className="border-y border-border/70 bg-card px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow="Todo lo que pruebas, en un solo lugar"
          title="Más que una lista de restaurantes"
          body="CATA conecta tus recuerdos, tus gustos y tu mesa para que cada salida deje algo más que la cuenta."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(56,39,25,.1)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="px-6 py-20 md:py-28">
        <SectionHeading eyebrow="Una comida. Tres pasos." title="Así empieza tu historia en CATA" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          {steps.map(({ number, icon: Icon, title, body }, index) => (
            <article key={number} className="relative text-center">
              {index < steps.length - 1 && <div aria-hidden="true" className="absolute left-[62%] top-8 hidden h-px w-[76%] bg-border-2 md:block" />}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border-2 bg-card text-accent shadow-sm">
                <Icon className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 rounded-full bg-foreground px-2 py-1 text-[9px] font-bold text-background">{number}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_.8fr] md:gap-20">
          <div>
            <p className="font-hand text-2xl font-semibold text-brand-gold">Llévate CATA a tu próxima mesa</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">Prueba la beta y ayúdanos a servir algo extraordinario.</h2>
            <p className="mt-6 max-w-xl leading-7 text-background/65">
              Estamos construyendo CATA con personas que disfrutan descubrir, recordar y compartir lo que comen. Tu experiencia puede definir lo que sigue.
            </p>
            <ul className="mt-8 space-y-3">
              {betaBenefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-background/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-foreground">✓</span>{item}
                </li>
              ))}
            </ul>
            <div className="mt-9"><TestFlightButton light /></div>
          </div>

          <div className="mx-auto hidden w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/8 p-8 text-center backdrop-blur md:block">
            <div className="mx-auto w-fit rounded-3xl bg-white p-4">
              <Image src="/assets/cata/testflight-qr.png" alt="Código QR para descargar la beta de CATA en TestFlight" width={220} height={220} className="h-52 w-52" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold">Escanea con tu iPhone</h3>
            <p className="mt-2 text-sm leading-6 text-background/60">Abre la cámara, apunta al código y únete a la beta en TestFlight.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <Image src="/assets/cata/cata-icon.png" alt="" width={36} height={36} className="rounded-lg" />
            <p className="text-sm text-muted-foreground">CATA · Dining Journal</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground transition hover:text-accent">Política de Privacidad</Link>
            <a href="mailto:cata.support@monarka.tech" className="text-muted-foreground transition hover:text-accent">Contacto</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
