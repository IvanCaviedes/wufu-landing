import type { Metadata } from "next";
import Link from "next/link";
import { Check, ClockAlert } from "lucide-react";
import { Suspense } from "react";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Confirmación de correo",
  robots: { index: false, follow: false },
};

type ConfirmationSearchParams = Promise<{ status?: string }>;

async function ConfirmationCard({ searchParams }: { searchParams: ConfirmationSearchParams }) {
  const { status } = await searchParams;
  const confirmed = status === "confirmed";
  const unavailable = status === "unavailable";

  return (
    <section className={styles.card}>
      <div className={`${styles.icon} ${confirmed ? "" : styles.errorIcon}`}>
        {confirmed ? <Check aria-hidden="true" /> : <ClockAlert aria-hidden="true" />}
      </div>
      <p className={styles.eyebrow}>Rumi · Más vidas juntas</p>
      <h1>{confirmed ? "Correo confirmado" : "No pudimos confirmar"}</h1>
      <p>
        {confirmed
          ? "Tu correo es válido y ya eres parte de la manada. Te avisaremos cuando tengamos novedades de nuestra tienda."
          : unavailable
            ? "El servicio no está disponible en este momento. Intenta abrir el enlace nuevamente más tarde."
            : "El enlace ya fue utilizado, venció o no es válido. Puedes volver al formulario para solicitar uno nuevo."}
      </p>
      <Link href={confirmed ? "/" : "/#unete"} className={styles.button}>
        {confirmed ? "Volver a Rumi" : "Solicitar otro enlace"}
      </Link>
    </section>
  );
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: ConfirmationSearchParams;
}) {
  return (
    <main className={styles.page}>
      <Suspense fallback={<div className={styles.card}>Verificando tu correo…</div>}>
        <ConfirmationCard searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
