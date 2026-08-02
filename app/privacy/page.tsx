import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2 de agosto de 2026";

type Section = {
  title: string;
  paragraphs?: string[];
  subsections?: { h3?: string; paragraphs?: string[]; list?: string[] }[];
  list?: string[];
};

const sections: Section[] = [
  {
    title: "1. Introducción",
    paragraphs: [
      `Monarka TECH ("nosotros", "nuestro") desarrolla CATA, un diario gastronómico social para registrar platillos, descubrir restaurantes y compartir experiencias con otros usuarios. Esta Política de Privacidad explica qué información recopilamos a través de la app CATA (iOS y Android) y de este sitio web, cómo la usamos y qué derechos tienes sobre ella.`,
      "Al usar CATA aceptas las prácticas descritas en esta política. Si no estás de acuerdo, te pedimos que no utilices la app.",
    ],
  },
  {
    title: "2. Información que recopilamos",
    subsections: [
      {
        h3: "Información de cuenta",
        list: [
          "Nombre, correo electrónico y contraseña al crear una cuenta (gestionados de forma segura mediante Firebase Authentication)",
          "Si inicias sesión con Google o Apple, recibimos el nombre y correo que esos proveedores nos entregan",
        ],
      },
      {
        h3: "Información de perfil y contenido",
        list: [
          "Foto de perfil, biografía y preferencias que configures en la app",
          "Registros de platillos (Log Dish) con fotos, calificaciones y notas",
          "Colecciones en My Menu, Food Journeys, insignias (Badges) y posición en el Leaderboard",
          "Publicaciones en el Feed, comentarios, likes y usuarios que sigues",
          "Restaurantes marcados como visitados, reseñas y, si aplica, páginas de restaurante reclamadas y contenido de Restaurant Mode",
        ],
      },
      {
        h3: "Ubicación",
        paragraphs: [
          "Cuando usas funciones de búsqueda de restaurantes cercanos solicitamos tu ubicación aproximada, que se usa en el momento para devolver resultados relevantes y no se almacena.",
          'Si activas "Alertas de viaje" (opcional, desactivada por defecto), la app detecta cuando cambias de ciudad para notificarte. En ese caso guardamos únicamente el nombre de la última ciudad detectada junto a tu cuenta — nunca coordenadas exactas ni un historial de ubicación. Puedes desactivar esta función en cualquier momento desde Ajustes.',
        ],
      },
      {
        h3: "Datos de uso y dispositivo",
        list: [
          "Interacción básica con la app (pantallas visitadas, funciones usadas) para mejorar CATA",
          "Modelo de dispositivo, versión de sistema operativo y versión de la app, usados para soporte y compatibilidad",
          "Token de notificaciones push, vinculado a tu cuenta, usado únicamente para enviarte notificaciones dentro de la app",
        ],
      },
    ],
  },
  {
    title: "3. Cómo usamos tu información",
    list: [
      "Crear y mantener tu cuenta de CATA",
      "Mostrar tu perfil y contenido a otros usuarios según tu configuración de privacidad",
      "Dar soporte a funciones sociales: seguir, likes, comentarios, notificaciones",
      "Buscar restaurantes y platillos cerca de ti",
      "Enviar notificaciones dentro de la app sobre actividad relacionada con tu contenido",
      "Mejorar la app a partir de patrones de uso agregados",
      "Cumplir con obligaciones legales aplicables",
    ],
    paragraphs: [
      "No vendemos tu información personal, no la usamos para elaborar perfiles publicitarios y CATA no incluye SDKs de publicidad ni de rastreo (tracking) de terceros.",
    ],
  },
  {
    title: "4. Servicios de terceros",
    paragraphs: ["CATA utiliza los siguientes servicios de terceros, cada uno con su propia política de privacidad:"],
    list: [
      "Firebase (Google) — autenticación, base de datos y almacenamiento de fotos: https://firebase.google.com/support/privacy",
      "Google Maps Platform — búsqueda de restaurantes y mapas: https://policies.google.com/privacy",
      "Google Sign-In — inicio de sesión social opcional: https://policies.google.com/privacy",
      "Apple Sign-In — inicio de sesión social opcional (iOS): https://www.apple.com/legal/privacy/",
    ],
  },
  {
    title: "5. Compartir información",
    paragraphs: ["No vendemos, alquilamos ni intercambiamos tu información personal. Solo la compartimos en estos casos:"],
    list: [
      "Con los proveedores de servicio listados en la sección anterior, que nos ayudan a operar CATA",
      "Contenido público de tu perfil (Feed, reseñas, platillos) visible para otros usuarios según tu configuración de privacidad",
      "Si lo exige la ley, una orden judicial o una autoridad gubernamental",
      "Para proteger los derechos, la seguridad o la propiedad de CATA, nuestros usuarios o el público",
    ],
  },
  {
    title: "6. Retención y eliminación de datos",
    paragraphs: [
      "Conservamos tu información mientras tu cuenta esté activa. Puedes eliminar tu cuenta en cualquier momento, directamente desde la app, en Ajustes → Cuenta → Eliminar cuenta. La eliminación es permanente e inmediata: se borran tu perfil, platillos, publicaciones, comentarios, likes, seguidores/seguidos y demás contenido asociado a tu cuenta.",
      "También puedes solicitar la eliminación de tu cuenta escribiendo a cata.support@monarka.tech.",
    ],
  },
  {
    title: "7. Tus derechos",
    paragraphs: ["Dependiendo de tu ubicación, puedes tener derecho a:"],
    list: [
      "Acceder a los datos personales que tenemos sobre ti",
      "Solicitar la corrección de datos inexactos",
      "Solicitar la eliminación de tu cuenta y datos",
      "Oponerte o restringir el procesamiento de tus datos",
      "Solicitar la portabilidad de tus datos",
    ],
  },
  {
    title: "8. Privacidad de menores",
    paragraphs: [
      "CATA no está dirigida a menores de 13 años y no recopilamos intencionalmente información de menores de 13. Si descubrimos que un menor de 13 años nos proporcionó datos personales, los eliminaremos con prontitud. Si crees que esto ha ocurrido, escríbenos a cata.support@monarka.tech.",
    ],
  },
  {
    title: "9. Seguridad",
    paragraphs: [
      "Usamos medidas de seguridad estándar de la industria, incluyendo transmisión cifrada (HTTPS), la seguridad integrada de Firebase y reglas de Firestore que impiden el acceso no autorizado a los datos de los usuarios. Ningún método de transmisión por internet es 100% seguro.",
    ],
  },
  {
    title: "10. Cambios a esta política",
    paragraphs: [
      "Podemos actualizar esta Política de Privacidad periódicamente. Notificaremos cambios importantes actualizando la fecha al inicio de esta página. El uso continuado de CATA después de un cambio implica la aceptación de la política actualizada.",
    ],
  },
  {
    title: "11. Contacto",
    paragraphs: ["Si tienes preguntas sobre esta Política de Privacidad, contáctanos:"],
    list: [
      "Empresa: Monarka TECH",
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

export default function PrivacyPage() {
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
            Política de Privacidad
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

            {section.subsections?.map((sub, i) => (
              <div key={i} className={i > 0 ? "mt-5" : "mt-3"}>
                {sub.h3 && <h3 className="mb-2 text-sm font-semibold text-foreground">{sub.h3}</h3>}
                {sub.paragraphs?.map((p, j) => (
                  <p key={j} className="mb-2 text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {sub.list && (
                  <ul className="space-y-1.5 pl-0">
                    {sub.list.map((item, j) => (
                      <li
                        key={j}
                        className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-accent before:content-['▸']"
                      >
                        {renderLine(item)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
