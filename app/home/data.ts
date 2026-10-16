import { Clock3, Heart, PawPrint, ShieldCheck, Sparkles, Users } from "lucide-react";

import type { SecretId } from "./types";

export const faqs = [
  {
    question: "¿Qué abrirá primero Rumi?",
    answer:
      "Nuestra primera etapa será una tienda de mascotas física en Colombia: un lugar cercano donde podrás descubrir productos para perros y gatos, recibir orientación y vivir la experiencia Rumi de primera mano.",
  },
  {
    question: "¿Qué encontraré en la tienda?",
    answer:
      "Estamos preparando productos para el bienestar, cuidado y vida cotidiana de perros y gatos. También ofreceremos atención personal para ayudarte a elegir según las necesidades de tu mascota.",
  },
  {
    question: "¿Cuándo y dónde será la apertura?",
    answer:
      "Anunciaremos muy pronto la ubicación y la fecha de apertura. Las personas inscritas en nuestra lista serán las primeras en recibir la información y conocer las novedades de lanzamiento.",
  },
  {
    question: "¿Rumi tendrá una aplicación?",
    answer:
      "Sí, pero todavía está en desarrollo. La aplicación será una etapa posterior de Rumi y complementará la experiencia de la tienda física. Compartiremos sus avances cuando esté lista para ofrecer una experiencia sólida y útil.",
  },
  {
    question: "¿La experiencia será para perros y gatos?",
    answer:
      "Sí. La primera etapa de Rumi está pensada para familias con perros y gatos, con una propuesta que reconoce sus diferentes necesidades y formas de cuidado.",
  },
  {
    question: "¿Tiene algún costo unirme a la lista?",
    answer:
      "No. Registrarte es gratuito y te permitirá recibir novedades, acceso anticipado a anuncios y beneficios especiales relacionados con el lanzamiento.",
  },
];

export const pillars = [
  {
    description:
      "Fortalecemos ese vínculo que convierte cada día compartido en parte de la familia.",
    icon: Heart,
    title: "Más cerca",
  },
  {
    description: "Diseñamos experiencias fáciles de entender, disfrutar e integrar a tu rutina.",
    icon: Sparkles,
    title: "Más simple",
  },
  {
    description:
      "Buscamos bienestar para ellos y la tranquilidad de saber que estás cuidándolos bien.",
    icon: PawPrint,
    title: "Más feliz",
  },
  {
    description:
      "Cada decisión parte del cuidado responsable, la transparencia y el respeto por tu confianza.",
    icon: ShieldCheck,
    title: "Más confianza",
  },
  {
    description: "Queremos devolverte tiempo para lo importante: disfrutar más momentos juntos.",
    icon: Clock3,
    title: "Más tiempo",
  },
  {
    description:
      "Construimos una comunidad donde cada familia y cada forma de querer tienen un lugar.",
    icon: Users,
    title: "Más comunidad",
  },
] as const;

export const secretIds: SecretId[] = ["clue", "code", "clock", "paw", "logo"];

export const totalSecrets = secretIds.length;
export const secretAlertDurationMs = 5_000;

export const secretDetails: Record<SecretId, { hint: string; message: string; title: string }> = {
  clue: {
    title: "La primera puerta",
    message: "El primer capítulo de Rumi será un lugar real que podrás visitar con tu mascota.",
    hint: "La curiosidad abre puertas. En la portada hay algo que parece estar haciendo una pregunta.",
  },
  logo: {
    title: "La apertura se acerca",
    message: "La tienda física será el punto de partida de todo lo que estamos construyendo.",
    hint: "Uno de los anuncios de la portada guarda más de lo que muestra a primera vista. Insiste un poco.",
  },
  paw: {
    title: "Ellos son protagonistas",
    message: "Perros y gatos estarán en el centro de la primera experiencia Rumi.",
    hint: "La marca de nuestros verdaderos protagonistas está escondida cerca del primer encuentro.",
  },
  clock: {
    title: "El momento se acerca",
    message: "La fecha y la ubicación se revelarán primero a quienes se unan a la manada.",
    hint: "Dentro de la cuenta regresiva, la parte que nunca deja de moverse responde si insistes.",
  },
  code: {
    title: "Clave de la manada",
    message: "Encontraste la palabra que conecta todas las señales de nuestra apertura.",
    hint: "La palabra correcta aparece varias veces frente a ti. El teclado también puede descubrir señales.",
  },
};
