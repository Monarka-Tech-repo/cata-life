import type { LegalSection, ShowcaseSlideKey } from "@/lib/i18n/types";

const SUPPORT_EMAIL = "cata.support@monarka.tech";

const privacySections: LegalSection[] = [
  {
    title: "1. Introducción",
    paragraphs: [
      `MONARKA TECH LLC ("nosotros", "nuestro") desarrolla CATA, un diario gastronómico social para registrar platillos, descubrir restaurantes y compartir experiencias con otros usuarios. Esta Política de Privacidad explica qué información recopilamos a través de la app CATA (iOS y Android) y de este sitio web, cómo la usamos y qué derechos tienes sobre ella.`,
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
      {
        h3: "Herramientas en cata.life que no requieren cuenta",
        paragraphs: [
          "Puedes usar el Planificador de Viajes y el Cuestionario de Gustos en nuestro sitio web sin crear una cuenta de CATA. Para que estas herramientas funcionen, creamos una sesión anónima de acceso — no recopilamos tu nombre ni identidad a menos que la proporciones directamente.",
        ],
        list: [
          "Planificador de Viajes: si guardas un viaje sin haber iniciado sesión, te pedimos tu correo electrónico para poder guardarlo y avisarte sobre él",
          "Cuestionario de Gustos: tus restaurantes favoritos, tus preferencias de sabor y, si lo proporcionas, tu correo electrónico. Usamos estas respuestas, junto con las de otros usuarios, para construir un perfil de gustos general que usaremos en el futuro para recomendarte viajes gastronómicos personalizados",
          'Página de Comunidad: tus preferencias de sabor (sin tu correo ni ninguna otra información personal) se suman a estadísticas agregadas y públicas de la comunidad. Si respondes "¿Qué restaurante recomendarías ahora mismo?" o agregas restaurantes favoritos en el Cuestionario de Gustos, el nombre del restaurante se muestra públicamente en esta página como una recomendación de la comunidad — nunca se muestra tu identidad junto con él',
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
      "Guardar y notificarte sobre viajes creados en el Planificador sin cuenta, y desarrollar futuras recomendaciones personalizadas a partir de las respuestas del Cuestionario de Gustos",
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
      `También puedes solicitar la eliminación de tu cuenta escribiendo a ${SUPPORT_EMAIL}.`,
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
      `CATA no está dirigida a menores de 13 años y no recopilamos intencionalmente información de menores de 13. Si descubrimos que un menor de 13 años nos proporcionó datos personales, los eliminaremos con prontitud. Si crees que esto ha ocurrido, escríbenos a ${SUPPORT_EMAIL}.`,
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
    list: ["Empresa: MONARKA TECH LLC", `Correo: ${SUPPORT_EMAIL}`, "Sitio web: cata.life"],
  },
];

const termsSections: LegalSection[] = [
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
      'CATA te permite publicar fotos, calificaciones, reseñas, comentarios y otro contenido ("Contenido de Usuario"). Conservas la propiedad de tu Contenido de Usuario.',
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
    title: "11. Ley aplicable y jurisdicción",
    paragraphs: [
      "Estos Términos se rigen por las leyes del Estado de Arizona, Estados Unidos, sin dar efecto a sus disposiciones sobre conflicto de leyes. Cualquier disputa relacionada con estos Términos o con el uso de CATA se someterá a la jurisdicción exclusiva de los tribunales estatales o federales ubicados en Arizona.",
    ],
  },
  {
    title: "12. Cambios a estos Términos",
    paragraphs: [
      "Podemos actualizar estos Términos periódicamente. Notificaremos cambios importantes actualizando la fecha al inicio de esta página. El uso continuado de CATA después de un cambio implica la aceptación de los Términos actualizados.",
    ],
  },
  {
    title: "13. Contacto",
    paragraphs: ["Si tienes preguntas sobre estos Términos de Servicio, contáctanos:"],
    list: ["Empresa: MONARKA TECH LLC", `Correo: ${SUPPORT_EMAIL}`, "Sitio web: cata.life"],
  },
];

const showcaseCaptions: Record<ShowcaseSlideKey, { title: string; text: string }> = {
  profile: { title: "Tu perfil de sabor", text: "CATA descubre tu estilo: sabores favoritos, insignias e historias de tus comidas." },
  explore: { title: "Explora a tu alrededor", text: "Busca platillos, restaurantes y personas, y encuentra lugares cerca de ti según tu gusto." },
  shuffle: { title: "¿No sabes dónde comer?", text: "Elige un tipo de cocina y deja que CATA sortee un lugar cerca de ti." },
  restaurant: { title: "Conoce cada restaurante", text: "Fotos, calificaciones y dirección. Guárdalo, márcalo como visitado o súmalo a tu viaje." },
  newEntry: { title: "Registra cada platillo", text: "Agrega foto, fecha, restaurante y con quién lo compartiste." },
  rateTaste: { title: "Califica lo que probaste", text: "Marca ingredientes, sabores y aromas con una intensidad del 1 al 5." },
  publish: { title: "Revisa y publica", text: "Confirma tu reseña y elige quién puede verla." },
  radar: { title: "Tu radar de sabor", text: "Descubre qué intensidades dominan tu paladar: mantecoso, cálido, dulce y más." },
  diary: { title: "Tu diario gastronómico", text: "Guarda cada viaje como una colección: Italia, Ciudad de México, Copenhague y más." },
  route: { title: "Planea tu ruta", text: "Ve tus paradas en orden sobre el mapa, con un botón para llegar a cada una." },
  addStop: { title: "Agrega paradas a tu viaje", text: "Restaurante, platillo, fecha, calificación y notas de cada parada." },
  lists: { title: "Listas para descubrir", text: "Guarda listas curadas, solicita unirte y compártelas con tus amigos." },
  recipes: { title: "Crea tus propias recetas", text: "Importa desde un enlace, foto o texto, con ingredientes y pasos." },
};

const es = {
  meta: {
    siteDescription: "CATA — el diario gastronómico social de MONARKA TECH.",
    homeTitle: "CATA — Tu diario gastronómico social",
    homeDescription:
      "Guarda tus platillos, descubre tu perfil de gustos y comparte la mesa con tus amigos. Descarga la beta de CATA para iPhone.",
    homeShareDescription: "Recuerda lo que comiste, descubre tu gusto y comparte la mesa.",
    ogLocale: "es_MX",
  },
  common: {
    backHome: "← Volver a inicio",
    homeAria: "Ir al inicio de CATA",
    lastUpdated: "Última actualización",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    support: "Soporte",
    remove: "Quitar",
    retry: "Intentar de nuevo",
    supportPersist: "Si el problema persiste, escríbenos a",
  },
  nav: {
    taste: "Mi Perfil de Gustos",
    planner: "Planificador",
    community: "Comunidad",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Idioma",
  },
  home: {
    badge: "Beta abierta para iPhone",
    heroTitle: "Tu diario gastronómico,",
    heroHighlight: "compartido.",
    heroBody:
      "Guarda los platillos que amas, descubre qué define tu gusto y comparte la mesa con las personas que hacen memorable cada comida.",
    testFlightCta: "Descargar con TestFlight",
    howItWorksLink: "Ver cómo funciona",
    availability: "Disponible para iPhone · Cupos limitados · Beta gratuita",
    benefitsEyebrow: "Todo lo que pruebas, en un solo lugar",
    benefitsTitle: "Más que una lista de restaurantes",
    benefitsBody: "CATA conecta tus recuerdos, tus gustos y tu mesa para que cada salida deje algo más que la cuenta.",
    benefits: {
      diary: {
        title: "Tu diario gastronómico",
        body: "Guarda cada platillo con fotos, calificaciones y notas para recordar lo que realmente valió la pena.",
      },
      share: {
        title: "Comparte la mesa",
        body: "Invita a tus amigos, arma el pedido de todos y divide la cuenta sin perder el sabor del momento.",
      },
      discover: {
        title: "Descubre tu gusto",
        body: "Convierte tus registros en un perfil vivo de cocinas, sabores y lugares que cuentan tu historia.",
      },
    },
    stepsEyebrow: "Una comida. Tres pasos.",
    stepsTitle: "Así empieza tu historia en CATA",
    steps: {
      try: { title: "Prueba algo", body: "Visita un restaurante y fotografía el platillo que quieres recordar." },
      story: {
        title: "Hazlo parte de tu historia",
        body: "Califica, etiqueta sabores y guarda los detalles que hicieron especial la experiencia.",
      },
      share: {
        title: "Compártelo",
        body: "Invita a tu mesa, recomienda lo mejor y descubre qué están disfrutando tus amigos.",
      },
    },
    betaEyebrow: "Llévate CATA a tu próxima mesa",
    betaTitle: "Prueba la beta y ayúdanos a servir algo extraordinario.",
    betaBody:
      "Estamos construyendo CATA con personas que disfrutan descubrir, recordar y compartir lo que comen. Tu experiencia puede definir lo que sigue.",
    betaBenefits: ["Acceso anticipado a nuevas funciones", "Ayuda a definir el futuro de CATA", "Feedback directo desde TestFlight"],
    qrAlt: "Código QR para descargar la beta de CATA en TestFlight",
    qrTitle: "Escanea con tu iPhone",
    qrBody: "Abre la cámara, apunta al código y únete a la beta en TestFlight.",
  },
  showcase: {
    imageAlt: "Captura de la app CATA",
    captions: showcaseCaptions,
  },
  support: {
    title: "Soporte",
    subtitle: "¿En qué podemos ayudarte?",
    contactTitle: "Contáctanos",
    contactBody: "¿Tienes una pregunta, un problema o una idea? Escríbenos directamente y te responderemos lo antes posible.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
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
        answer:
          "Desde la app, ve a Ajustes → Cuenta → Eliminar cuenta. La eliminación es inmediata y permanente: se borran tu perfil, platillos, publicaciones, comentarios y demás contenido asociado. También puedes solicitarlo por correo.",
      },
      {
        question: "¿CATA tiene algún costo?",
        answer:
          "No. CATA es gratis y actualmente está disponible como beta pública a través de TestFlight mientras seguimos puliendo la experiencia antes del lanzamiento oficial.",
      },
      {
        question: "¿Cómo accedo a la beta en TestFlight?",
        answer:
          "Descarga la app TestFlight de Apple y usa el enlace de invitación en la página principal de cata.life. Si el cupo está lleno, escríbenos y te avisamos cuando se abran más lugares.",
      },
      {
        question: "¿Dónde veo qué información recopila CATA?",
        answer: "Toda la información sobre qué datos usamos y cómo los protegemos está en nuestra Política de Privacidad.",
      },
    ],
  },
  privacy: {
    title: "Política de Privacidad",
    lastUpdated: "2 de agosto de 2026",
    sections: privacySections,
  },
  terms: {
    title: "Términos de Servicio",
    lastUpdated: "5 de septiembre de 2026",
    sections: termsSections,
  },
  notFound: {
    title: "No encontramos esta página",
    body: "Puede que el enlace esté mal escrito o que la página ya no exista.",
    home: "Ir al inicio",
  },
  login: {
    metaTitle: "Iniciar sesión",
    title: "Tu cuenta CATA",
    subtitle: "La misma cuenta que usas en la app.",
    signIn: "Iniciar sesión",
    signUp: "Crear cuenta",
    name: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    forgotPassword: "Olvidé mi contraseña",
    forgotNeedsEmail: "Escribe tu correo arriba y toca de nuevo en “Olvidé mi contraseña”.",
    resetSent: "Te enviamos un correo para restablecer tu contraseña.",
    wait: "Un momento…",
    or: "o",
    google: "Continuar con Google",
    logoAlt: "CATA Dining Journal",
  },
  authErrors: {
    fallback: "Algo salió mal. Inténtalo de nuevo.",
    codes: {
      "auth/wrong-password": "Contraseña incorrecta.",
      "auth/invalid-credential": "Correo o contraseña incorrectos.",
      "auth/user-not-found": "No existe una cuenta con ese correo.",
      "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
      "auth/invalid-email": "El correo no es válido.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
      "auth/popup-closed-by-user": "Se cerró la ventana antes de completar el inicio de sesión. Intenta de nuevo.",
      "auth/popup-blocked":
        "Tu navegador bloqueó la ventana de Google. Permite ventanas emergentes para este sitio e intenta de nuevo.",
      "auth/cancelled-popup-request": "Se canceló el intento anterior. Intenta de nuevo.",
      "auth/unauthorized-domain": "Este sitio aún no está autorizado para iniciar sesión con Google. Contacta a soporte.",
      "auth/operation-not-allowed": "El inicio de sesión con Google no está disponible todavía. Contacta a soporte.",
      "auth/too-many-requests": "Demasiados intentos. Intenta de nuevo en unos minutos.",
    } as Record<string, string>,
  },
  joinTable: {
    metaTitle: "Únete a la mesa",
    metaDescription: "Acepta una invitación y únete a una mesa compartida en CATA.",
    loading: "Preparando tu lugar en la mesa…",
    unavailableTitle: "Esta invitación no está disponible",
    unavailableBody: "El enlace puede haber vencido, ser incorrecto o el anfitrión pudo haber cerrado las invitaciones.",
    connectionTitle: "No pudimos abrir la invitación",
    connectionBody: "Revisa tu conexión e inténtalo de nuevo.",
    closedTitle: "Esta mesa ya no acepta invitados",
    closedBody: "Pídele al anfitrión una nueva invitación o confirma que la mesa siga abierta.",
    beFirst: "Sé la primera persona en unirse.",
    peopleAtTable: (count: number) => `${count} personas ya están en la mesa`,
    peopleHere: (count: number) => (count === 1 ? "1 persona ya está aquí" : `${count} personas ya están aquí`),
    goToCata: "Ir a CATA",
    joinedEyebrow: "¡Ya estás en la mesa!",
    placeSaved: (name: string) => `${name}, tu lugar quedó guardado.`,
    placeAlreadySaved: "Tu lugar ya estaba guardado.",
    openAppNote:
      "Abre CATA para dividir la cuenta, ordenar y participar con el grupo. Esas funciones están disponibles únicamente dentro de la app.",
    downloadAndroid: "Descargar para Android",
    iphoneSoon: "Versión para iPhone: próximamente en App Store.",
    invitedEyebrow: "Te invitaron a compartir la mesa",
    nameLabel: "¿Cómo te llamas?",
    namePlaceholder: "Tu nombre",
    saving: "Guardando tu lugar…",
    join: "Unirme a la mesa",
    temporaryAccess: "Al continuar se crea un acceso temporal seguro para añadirte a esta mesa.",
    defaultTableName: "Mesa de CATA",
    defaultRestaurant: "Restaurante por confirmar",
    defaultGuest: "Invitado",
  },
  taste: {
    title: "Mi Perfil de Gustos",
    subtitle: "Basado en los platillos que has registrado en CATA.",
    loadError: "No pudimos cargar tu perfil de gustos. Intenta de nuevo más tarde.",
    empty: "Aún no has registrado platillos — abre la app CATA para tu primer registro y tu perfil de gustos aparecerá aquí.",
    haveAccount: "¿Ya tienes cuenta en CATA?",
    signInLink: "Inicia sesión",
    haveAccountRest: "para ver tu perfil real basado en los platillos que has registrado. Si no, prueba este cuestionario rápido:",
    vesselLabel: "Distribución de tu perfil de sabor",
    modes: { type: "TIPO DE COMIDA", taste: "SABOR", cuisine: "COCINA", ratings: "CALIFICACIONES" },
    emptyHints: {
      type: "Registra platillos en la app para ver tu distribución por tipo de comida",
      taste: "Registra platillos con etiquetas de sabor para ver tu perfil de sabor",
      cuisine: "Registra platillos en distintos restaurantes para ver tu distribución por cocina",
      ratings: "Califica platillos con etiquetas para ver qué es lo que mejor calificas",
    },
    entries: (count: number) => `${count} ${count === 1 ? "registro" : "registros"}`,
  },
  quiz: {
    saveError: "No pudimos guardar tus respuestas. Intenta de nuevo.",
    doneEyebrow: "¡Listo!",
    doneTitle: "Tu primer perfil de gustos",
    doneBody: "Guardamos tus respuestas — pronto usaremos esto para recomendarte viajes gastronómicos personalizados.",
    flavorsQuestion: "¿Qué sabores te gustan más?",
    favoriteRestaurants: "Tus restaurantes favoritos",
    emailLabel: "Correo (opcional)",
    emailPlaceholder: "Para avisarte cuando tengamos recomendaciones para ti",
    saving: "Guardando…",
    submit: "Ver mi perfil de gustos",
  },
  flavors: {
    Sweet: "Dulce",
    Sour: "Ácido",
    Salty: "Salado",
    Bitter: "Amargo",
    Spicy: "Picante",
    Umami: "Umami",
    Smoky: "Ahumado",
  } as Record<string, string>,
  planner: {
    title: "Planificador de Viajes",
    subtitle: "Guarda restaurantes para tu próximo viaje — sincronizado con la app CATA.",
    loadError: "No pudimos cargar tus viajes. Intenta de nuevo más tarde.",
    yourTrips: "Tus viajes",
    newTrip: "Nuevo viaje",
    emptyList: "Aún no has creado ningún viaje. Crea uno para empezar a guardar restaurantes que quieres visitar.",
    noCity: "Sin ciudad",
    restaurantCount: (count: number) => `${count} ${count === 1 ? "restaurante" : "restaurantes"}`,
    allTrips: "← Todos tus viajes",
    noRestaurants: "Aún no hay restaurantes en este viaje.",
    tripTitle: "Título del viaje",
    tripTitlePlaceholder: "Ej. Fin de semana en Austin",
    city: "Ciudad",
    cityPlaceholder: "Opcional — se detecta del primer restaurante",
    email: "Correo electrónico",
    emailPlaceholder: "Para guardar y avisarte sobre tu viaje",
    createError: "No pudimos crear tu viaje. Intenta de nuevo.",
    creating: "Creando…",
    create: "Crear viaje",
    cancel: "Cancelar",
  },
  picker: {
    loadError: "No pudimos cargar la búsqueda de restaurantes. Intenta de nuevo más tarde.",
    label: "Agregar restaurante",
    loading: "Cargando búsqueda…",
    placeholder: "Busca un restaurante",
  },
  community: {
    title: "Comunidad",
    subtitle: "Gustos y recomendaciones de todas las personas que han usado CATA — sin necesidad de cuenta.",
    worldTitle: "Gustos alrededor del mundo",
    worldSubtitle: "Filtra por ciudad para ver cómo se come ahí.",
    communityTitle: "Así prueba la comunidad",
    pollEyebrow: "Una pregunta rápida",
    pollTitle: "¿Qué restaurante recomendarías ahora mismo?",
    pollSubtitle: "Sin cuenta, sin formularios largos — solo escribe el nombre.",
    pollError: "No pudimos guardar tu recomendación. Intenta de nuevo.",
    pollThanksBefore: "¡Gracias! Agregamos",
    pollThanksAfter: "a las recomendaciones de la comunidad.",
    recentlyRecommended: "Recomendado recientemente",
    statsError: "No pudimos cargar las estadísticas de la comunidad.",
    statsEmpty: "Todavía no hay suficientes respuestas — sé de las primeras personas en tomar el cuestionario de gustos.",
    basedOn: (count: number) =>
      `Basado en ${count} ${count === 1 ? "persona" : "personas"} que han tomado el cuestionario de gustos.`,
    topRestaurants: "Restaurantes más recomendados",
    recommendationCount: (count: number) => `${count} ${count === 1 ? "recomendación" : "recomendaciones"}`,
    googleRating: (rating: string) => `★ ${rating} en Google`,
    googleReviews: (count: number) => ` · ${count} reseñas`,
    viewOnMaps: "Ver en Google Maps",
    worldError: "No pudimos cargar los gustos del mundo.",
    worldEmpty: "Todavía no hay suficientes platillos registrados en CATA para mostrar esto.",
    cityEmpty: "No encontramos platillos registrados para esa ciudad.",
    citySearch: "Busca una ciudad",
    citySearchPlaceholder: "Ej. Chicago o Nueva York",
  },
};

export type Dictionary = typeof es;

export default es;
