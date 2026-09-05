import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "5 de septiembre de 2026";

type Section = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

const sections: Section[] = [
  {
    title: "1. Aceptación de los términos",
    paragraphs: [
      `Estos Términos de Servicio ("Términos") rigen el uso de la app CATA (iOS y Android) y del sitio web cata.life, operados por MONARKA TECH LLC ("nosotros", "nuestro"). Al crear una cuenta o usar CATA aceptas estos Términos. Si no estás de acuerdo, no utilices la app ni el sitio web.`,
    ],
  },
  {
    title: "2. Elegibilidad",
    paragraphs: [
      "Debes tener al menos 13 años para crear una cuenta de CATA. Si tienes entre 13 y la mayoría de edad en tu jurisdicción, confirmas que cuentas con el permiso de un padre, madre o tutor legal para usar la app.",
    ],
  },
  {
    title: "3. Tu cuenta",
    list: [
      "Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad que ocurra en tu cuenta",
      "La información que nos proporciones (nombre, correo, contenido de perfil) debe ser precisa y no suplantar a otra persona o entidad",
      "Puedes eliminar tu cuenta en cualquier momento desde Ajustes → Cuenta → Eliminar cuenta; la eliminación es inmediata y permanente",
    ],
  },
  {
    title: "4. Contenido del usuario",
    paragraphs: [
      "CATA te permite publicar fotos, calificaciones, reseñas, comentarios y otro contenido (\"Contenido de Usuario\"). Conservas la propiedad de tu Contenido de Usuario.",
      "Al publicar contenido en CATA, nos otorgas una licencia mundial, no exclusiva y libre de regalías para almacenar, mostrar, reproducir y distribuir ese contenido dentro de la app y el sitio web, únicamente con el fin de operar y promocionar CATA (por ejemplo, mostrar tu reseña a otros usuarios o destacar recomendaciones en la página de Comunidad). Esta licencia termina cuando eliminas el contenido o tu cuenta, salvo por copias ya compartidas con otros usuarios o conservadas por obligación legal.",
      "Eres el único responsable del contenido que publicas. No debes publicar contenido que sea falso, difamatorio, que infrinja derechos de terceros o que viole la ley aplicable.",
    ],
  },
  {
    title: "5. Conducta y normas de la comunidad",
    paragraphs: ["Al usar CATA aceptas no:"],
    list: [
      "Publicar contenido ilegal, difamatorio, acosador, discriminatorio o sexualmente explícito",
      "Suplantar a otra persona, restaurante o entidad, o crear reseñas falsas",
      "Reclamar la página de un restaurante sin autorización para representarlo",
      "Usar bots, scraping u otros medios automatizados para acceder a CATA sin nuestro consentimiento",
      "Interferir con el funcionamiento normal de la app o intentar acceder a cuentas de otros usuarios",
    ],
  },
  {
    title: "6. Restaurantes y contenido de terceros",
    paragraphs: [
      "La información de restaurantes (ubicación, horarios, menús) proviene en parte de Google Maps Platform y puede contener imprecisiones. CATA no garantiza la exactitud de esta información ni la calidad de los restaurantes listados.",
      "Los propietarios de restaurantes pueden reclamar y gestionar la página de su negocio (Restaurant Mode). Nos reservamos el derecho de verificar dicha titularidad y de remover contenido que consideremos fraudulento.",
    ],
  },
  {
    title: "7. Propiedad intelectual",
    paragraphs: [
      "CATA, su logotipo, diseño e interfaz son propiedad de MONARKA TECH LLC y están protegidos por leyes de propiedad intelectual. No puedes copiar, modificar o distribuir ninguna parte de la app o el sitio web sin nuestro consentimiento previo por escrito.",
    ],
  },
  {
    title: "8. Terminación",
    paragraphs: [
      "Podemos suspender o eliminar tu cuenta si violas estos Términos, si tu uso representa un riesgo de seguridad o legal para CATA u otros usuarios, o a solicitud tuya. También puedes dejar de usar CATA y eliminar tu cuenta en cualquier momento.",
    ],
  },
  {
    title: "9. Exclusión de garantías",
    paragraphs: [
      'CATA se ofrece "tal cual" y "según disponibilidad", sin garantías de ningún tipo, expresas o implícitas. No garantizamos que la app esté libre de errores, sea ininterrumpida o esté disponible en todo momento.',
    ],
  },
  {
    title: "10. Limitación de responsabilidad",
    paragraphs: [
      "En la medida permitida por la ley, MONARKA TECH LLC no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso de CATA, incluyendo decisiones tomadas con base en información de restaurantes publicada por otros usuarios.",
    ],
  },
  {
    title: "11. Cambios a estos Términos",
    paragraphs: [
      "Podemos actualizar estos Términos periódicamente. Notificaremos cambios importantes actualizando la fecha al inicio de esta página. El uso continuado de CATA después de un cambio implica la aceptación de los Términos actualizados.",
    ],
  },
  {
    title: "12. Contacto",
    paragraphs: ["Si tienes preguntas sobre estos Términos de Servicio, contáctanos:"],
    list: [
      "Empresa: MONARKA TECH LLC",
      "Correo: cata.support@monarka.tech",
      "Sitio web: cata.life",
    ],
  },
];

function renderLine(text: string) {
  const [label, ...rest] = text.split(": ");
  const value = rest.join(": ");
  if (!value) return text;
  return (
    <>
      <strong className="font-semibold text-foreground">{label}:</strong> {value}
    </>
  );
}

export default function TermsPage() {
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
            Términos de Servicio
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">Última actualización: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="border-b border-border-2 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
              {section.title}
            </h2>

            {section.paragraphs?.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}

            {section.list && (
              <ul className="mt-3 space-y-1.5 pl-0">
                {section.list.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-accent before:content-['▸']"
                  >
                    {renderLine(item)}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
