import type { LandingPhase } from "../config/campaign";

const content = {
  prelaunch: {
    hero: {
      eyebrow: "Wufú está por llegar",
      title: "Cuidarlos mejor.",
      accent: "Vivir más juntos.",
      description:
        "Muy pronto llega Wufú, una tienda de mascotas en Colombia con productos para perros y gatos elegidos para su bienestar y cuidado diario.",
      primary: "Quiero acceso anticipado",
      secondary: "Descubrir la idea",
      whisper: "Explora con atención: esta historia esconde algunas señales.",
      sticker: "En construcción",
      marquee:
        "CUIDADO CON PROPÓSITO　✦　DECISIONES MÁS SIMPLES　✦　VIDAS MÁS FELICES　✦　WUFÚ SE ACERCA　✦",
    },
    intro: {
      kicker: "01 — Lo que estamos construyendo",
      title: "Un lugar pensado para",
      accent: "vivir mejor juntos.",
      description:
        "Estamos creando una tienda para mascotas donde elegir productos para perros y gatos sea más claro, humano y confiable.",
    },
    reveal: {
      kicker: "02 — Antes que nadie",
      title: "Sé parte desde",
      accent: "el primer día.",
      description:
        "La comunidad fundadora recibirá primero las novedades, la fecha oficial y las sorpresas de apertura.",
      cta: "Reservar mi lugar",
      countdownLabel: "La siguiente etapa comienza en",
    },
    faq: {
      kicker: "03 — Lo esencial",
      title: "Lo que podemos",
      accent: "contarte hoy.",
      badge: "Fase\nprelanzamiento",
    },
    signup: {
      kicker: "04 — Comunidad fundadora",
      title: "Llega antes.",
      accent: "Vívelo primero.",
      description:
        "Únete a la lista privada de Wufú y recibe los anuncios importantes antes de que sean públicos.",
      trust: "Tus datos se usan únicamente para novedades y beneficios de Wufú.",
      submit: "Quiero acceso anticipado",
    },
  },
  launch: {
    hero: {
      eyebrow: "La apertura ya tiene fecha",
      title: "La espera termina.",
      accent: "Wufú está por abrir.",
      description:
        "Muy pronto podrás descubrir una tienda de mascotas con productos para perros y gatos, creada para cuidar mejor y disfrutar más juntos.",
      primary: "Recibir mi invitación",
      secondary: "Conocer Wufú",
      whisper: "Encuentra las cinco señales y desbloquea tu pase de apertura.",
      sticker: "Abrimos pronto",
      marquee:
        "YA CASI ABRIMOS　✦　PRODUCTOS ELEGIDOS CON CUIDADO　✦　UNA EXPERIENCIA PARA DISFRUTAR JUNTOS　✦",
    },
    intro: {
      kicker: "01 — La experiencia Wufú",
      title: "Todo lo que necesitas.",
      accent: "Mucho más cerca.",
      description:
        "Productos para mascotas seleccionados para el bienestar cotidiano, orientación cercana y una comunidad que entiende el lugar que ocupan en tu vida.",
    },
    reveal: {
      kicker: "02 — Cuenta regresiva",
      title: "Cada vez falta",
      accent: "menos para conocernos.",
      description:
        "Estamos terminando los últimos detalles. Regístrate para recibir la ubicación, el horario y las novedades de apertura.",
      cta: "Avisarme primero",
      countdownLabel: "Abrimos en",
    },
    faq: {
      kicker: "03 — Prepara tu visita",
      title: "Todo listo para",
      accent: "el gran día.",
      badge: "Apertura\nmuy pronto",
    },
    signup: {
      kicker: "04 — Tu invitación",
      title: "No te pierdas",
      accent: "la apertura.",
      description:
        "Déjanos tus datos para recibir la información oficial y beneficios especiales de lanzamiento.",
      trust: "Tus datos se usan únicamente para novedades y beneficios de Wufú.",
      submit: "Recibir mi invitación",
    },
  },
  open: {
    hero: {
      eyebrow: "Wufú ya abrió sus puertas",
      title: "Más bienestar.",
      accent: "Más vidas juntas.",
      description:
        "Visita nuestra tienda de mascotas y descubre productos seleccionados y atención cercana para cuidar a tu perro o gato con más confianza.",
      primary: "Planear mi visita",
      secondary: "Conocer la experiencia",
      whisper: "La comunidad Wufú apenas comienza. Siempre habrá algo nuevo por descubrir.",
      sticker: "Ya abrimos",
      marquee:
        "WUFÚ YA ESTÁ AQUÍ　✦　VEN A CONOCERNOS　✦　BIENESTAR PARA PERROS Y GATOS　✦　MÁS VIDAS JUNTAS　✦",
    },
    intro: {
      kicker: "01 — Bienvenido a Wufú",
      title: "Cuidar mejor se siente",
      accent: "así de simple.",
      description:
        "Encuentra productos para perros y gatos pensados para la vida real, orientación para elegir con criterio y un espacio creado para disfrutar juntos.",
    },
    reveal: {
      kicker: "02 — Visítanos",
      title: "Tu próxima historia",
      accent: "empieza aquí.",
      description:
        "Ya estamos listos para recibirte. Consulta nuestra ubicación y horario antes de venir con tu compañero de cuatro patas.",
      cta: "Recibir novedades",
      countdownLabel: "Ya estamos abiertos",
    },
    faq: {
      kicker: "03 — Antes de visitarnos",
      title: "Todo lo que necesitas",
      accent: "para venir.",
      badge: "Puertas\nabiertas",
    },
    signup: {
      kicker: "04 — Sigue cerca",
      title: "Únete a la",
      accent: "comunidad Wufú.",
      description:
        "Recibe novedades, actividades y recomendaciones para compartir una vida mejor con tu mascota.",
      trust: "Tus datos se usan únicamente para comunicaciones de Wufú.",
      submit: "Unirme a la comunidad",
    },
  },
} as const;

export function getLandingContent(phase: LandingPhase) {
  return content[phase];
}
