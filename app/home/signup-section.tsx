"use client";

import { useState, type FormEvent } from "react";
import { Bone, Cat, Check, Dog, Gift, Mail, ShieldCheck, ToyBrick } from "lucide-react";

import Paw from "../ui/paw-mark";
import { Arrow } from "./arrow";
import { totalSecrets } from "./data";
import { TurnstileWidget } from "./turnstile-widget";

export function SignupSection({ foundCount }: { foundCount: number }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [challengeKey, setChallengeKey] = useState(0);
  const hasReward = foundCount === totalSecrets;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          petType: data.get("pet_type"),
          discoverySource: data.get("discovery_source"),
          signalsFound: foundCount,
          rewardUnlocked: hasReward,
          marketingConsent: data.get("marketing_consent") === "on",
          website: data.get("website"),
          turnstileToken,
        }),
      });
      const result: unknown = await response.json();
      const error =
        typeof result === "object" && result && "error" in result
          ? String(result.error)
          : "No pudimos completar el registro";

      if (!response.ok) throw new Error(error);

      setSent(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "No pudimos completar el registro");
      setTurnstileToken("");
      setChallengeKey((current) => current + 1);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="signup section" id="unete">
      <div className="signup-inner wrap">
        <div className="signup-copy">
          <Paw light />
          <div className="kicker light">04 — Únete a la manada</div>
          <h2>
            Sé el primero
            <br />
            en saberlo.
          </h2>
          <p>
            Conoce antes que nadie la fecha y ubicación de nuestra tienda, y desbloquea una sorpresa
            especial de apertura.
          </p>
          <div className="trust">
            <ShieldCheck />
            <span>Tus datos se usan únicamente para novedades del lanzamiento.</span>
          </div>
          <div className="pet-icons">
            <Dog />
            <Cat />
            <Bone />
            <ToyBrick />
          </div>
        </div>
        <div className="signup-card">
          {!sent ? (
            <form onSubmit={submit} autoComplete="on">
              <input
                type="hidden"
                name="secretos_encontrados"
                value={`${foundCount}/${totalSecrets}`}
              />
              <input type="hidden" name="recompensa_desbloqueada" value={hasReward ? "sí" : "no"} />
              <div className="form-honeypot" aria-hidden="true">
                <label htmlFor="website">Sitio web</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className={`form-reward ${hasReward ? "unlocked" : ""}`}>
                <Gift />
                <div>
                  <strong>
                    {hasReward ? "Pase de apertura desbloqueado" : "Descubre las señales"}
                  </strong>
                  <span>
                    {hasReward
                      ? "Tu registro quedará marcado para la sorpresa de apertura."
                      : `${foundCount}/${totalSecrets} señales encontradas`}
                  </span>
                </div>
                <b>{hasReward ? "✓" : `${foundCount}/${totalSecrets}`}</b>
              </div>
              <label htmlFor="name">Tu nombre</label>
              <input
                id="name"
                name="name"
                maxLength={60}
                autoComplete="name"
                placeholder="¿Cómo te llamas?"
                required
              />
              <label htmlFor="email">Tu correo</label>
              <div className="input-icon">
                <Mail />
                <input
                  id="email"
                  name="email"
                  maxLength={120}
                  autoComplete="email"
                  type="email"
                  placeholder="hola@ejemplo.com"
                  required
                />
              </div>
              <label htmlFor="pet">¿Quién es tu compañero?</label>
              <select id="pet" name="pet_type" defaultValue="" required>
                <option value="" disabled>
                  Elige una opción
                </option>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="both">Ambos</option>
                <option value="other">Otro</option>
              </select>
              <label htmlFor="discovery-source">¿Dónde nos conociste?</label>
              <select id="discovery-source" name="discovery_source" defaultValue="" required>
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
                <option value="recommendation">Recomendación de alguien</option>
                <option value="event">Evento o feria</option>
                <option value="other">Otro</option>
              </select>
              <label className="consent-field">
                <input type="checkbox" name="marketing_consent" required />
                <span>
                  Autorizo el tratamiento de mis datos para recibir novedades de Wufú. Consulta la{" "}
                  <a href="/privacidad" target="_blank" rel="noreferrer">
                    política de privacidad
                  </a>
                  .
                </span>
              </label>
              {turnstileSiteKey ? (
                <TurnstileWidget
                  key={challengeKey}
                  siteKey={turnstileSiteKey}
                  onToken={setTurnstileToken}
                />
              ) : (
                <p className="form-error" role="alert">
                  La verificación de seguridad no está configurada.
                </p>
              )}
              {submitError && (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                className="button button-dark"
                disabled={submitting || !turnstileToken}
              >
                {submitting ? "Registrando…" : "¡Quiero saber!"} {!submitting && <Arrow />}
              </button>
              <small>
                Cero spam, palabra de mascota. Puedes retirar tu autorización cuando quieras.
              </small>
            </form>
          ) : (
            <div className="success">
              <div className="success-paw">
                <Check />
              </div>
              <h3>
                ¡Ya eres parte
                <br />
                de la manada!
              </h3>
              <p>La primera novedad llegará muy pronto a tu correo.</p>
              <button type="button" onClick={() => setSent(false)} className="text-link">
                Registrar otro correo
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
