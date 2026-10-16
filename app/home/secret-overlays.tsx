"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Gift,
  Lightbulb,
  PawPrint,
  Snowflake,
  Sparkles,
  Store,
  X,
} from "lucide-react";

import { publicConfig } from "../config/public";
import { secretAlertDurationMs, secretDetails, secretIds, totalSecrets } from "./data";
import type { PawPrintPosition, SecretId } from "./types";

type SecretOverlaysProps = {
  found: SecretId[];
  prints: PawPrintPosition[];
  secret: SecretId | null;
  onClose: () => void;
  onDiscover: (secret: SecretId) => void;
  onShowLatest: () => void;
};

function AlertCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(secretAlertDurationMs / 1_000));

  useEffect(() => {
    const timer = window.setInterval(
      () => setSecondsLeft((current) => Math.max(0, current - 1)),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return <small className="alert-countdown">Se cierra en {secondsLeft} s</small>;
}

function PumpkinMark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path className="pumpkin-stem" d="M16 8c-1.8-3.6.3-5.4 3.2-5.8-.5 2.4-1.4 4-3.2 5.8Z" />
      <path
        className="pumpkin-body"
        d="M16 7.5c7.6 0 12 4.5 12 10.5S23.6 28.5 16 28.5 4 24 4 18 8.4 7.5 16 7.5Z"
      />
      <path
        d="M16 8c-2.5 2.7-3.2 14.6 0 20M16 8c2.5 2.7 3.2 14.6 0 20M8.5 11.5c-2 4-1.8 9.3.2 13"
        fill="none"
        stroke="#8f3515"
        strokeOpacity=".28"
      />
      <path
        d="m10 16 3-2 1.5 3H9.8ZM22 16l-3-2-1.5 3h4.7ZM11.5 21c2.8 2 6.2 2 9 0"
        fill="none"
        stroke="#3c1c13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SecretOverlays({
  found,
  prints,
  secret,
  onClose,
  onDiscover,
  onShowLatest,
}: SecretOverlaysProps) {
  const [hintsOpen, setHintsOpen] = useState(false);
  const [secretGuess, setSecretGuess] = useState("");
  const [wrongGuess, setWrongGuess] = useState(false);
  const [wordInputOpen, setWordInputOpen] = useState(false);
  const isComplete = found.length === totalSecrets;
  const detail = secret ? secretDetails[secret] : null;
  const pendingSecrets = secretIds.filter((id) => !found.includes(id));

  function submitSecretWord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const matches = secretGuess.trim().toLowerCase() === publicConfig.secretWord;
    setWrongGuess(!matches);

    if (matches) {
      setSecretGuess("");
      setHintsOpen(false);
      onDiscover("code");
    }
  }

  return (
    <>
      {prints.map((print) => (
        <span
          className={`click-print ${print.kind === "pumpkin" ? "pumpkin-print" : ""} ${print.kind === "gift" || print.kind === "snowflake" ? "christmas-print" : ""}`}
          key={print.id}
          style={{ left: print.x, top: print.y, transform: `rotate(${print.rotation}deg)` }}
          aria-hidden="true"
        >
          {print.kind === "pumpkin" ? (
            <PumpkinMark className="pumpkin-mark" />
          ) : print.kind === "gift" ? (
            <Gift />
          ) : print.kind === "snowflake" ? (
            <Snowflake />
          ) : (
            <PawPrint />
          )}
        </span>
      ))}
      {secret && (
        <aside
          key={secret}
          className={`secret-alert secret-${secret} ${isComplete ? "complete" : ""}`}
          role="alert"
          aria-live="polite"
        >
          <div className="alert-icon">{isComplete ? <Gift /> : <Store />}</div>
          <div className="alert-copy">
            <span>
              <Sparkles /> Señal {found.length}/{totalSecrets}
            </span>
            <h3>{isComplete ? "¡Pase de apertura desbloqueado!" : detail?.title}</h3>
            <p>
              {isComplete ? (
                <>
                  Regístrate para recibir primero la fecha y ubicación.{" "}
                  <a href="#unete" onClick={onClose}>
                    Continuar →
                  </a>
                </>
              ) : (
                <>
                  {detail?.message}{" "}
                  {secret === "code" && <strong>{publicConfig.campaignCode}</strong>}
                </>
              )}
            </p>
            <AlertCountdown />
          </div>
          <button
            type="button"
            className="secret-close"
            onClick={onClose}
            aria-label="Cerrar alerta"
          >
            <X />
          </button>
          <div className="alert-timer" />
        </aside>
      )}
      {found.length > 0 && (
        <button
          type="button"
          className={`reward-fab ${isComplete ? "complete" : ""}`}
          onClick={onShowLatest}
          aria-label={`Ver progreso de señales: ${found.length} de ${totalSecrets}`}
        >
          <span>
            <Gift />
          </span>
          <b>{isComplete ? "Pase listo" : "Señales"}</b>
          <i>
            {found.length}/{totalSecrets}
          </i>
        </button>
      )}
      {!secret && !isComplete && (
        <div className={`hint-widget ${hintsOpen ? "open" : ""}`}>
          {hintsOpen && (
            <aside className="hint-panel" aria-label="Pistas para encontrar las señales">
              <div className="hint-panel-heading">
                <div>
                  <span>¿Te quedaste atrapado?</span>
                  <h3>Caja de pistas</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setHintsOpen(false)}
                  aria-label="Cerrar caja de pistas"
                >
                  <X />
                </button>
              </div>
              <ol>
                {secretIds.map((id, index) => {
                  const wasFound = found.includes(id);

                  return (
                    <li key={id} className={wasFound ? "found" : ""}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{secretDetails[id].hint}</p>
                      {wasFound && <Check aria-label="Encontrada" />}
                    </li>
                  );
                })}
              </ol>
              {pendingSecrets.includes("code") && (
                <div className={`secret-word-entry ${wordInputOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="secret-word-trigger"
                    onClick={() => setWordInputOpen((current) => !current)}
                    aria-expanded={wordInputOpen}
                  >
                    <span className="secret-word-trigger-copy">
                      <Sparkles />
                      <span>
                        <strong>¿Encontraste la palabra?</strong>
                        <small>Prueba tu respuesta</small>
                      </span>
                    </span>
                    <ChevronDown className="secret-word-chevron" />
                  </button>
                  {wordInputOpen && (
                    <form className="secret-word-form" onSubmit={submitSecretWord}>
                      <label htmlFor="secret-word">Escribe la palabra que descubriste</label>
                      <div>
                        <input
                          id="secret-word"
                          value={secretGuess}
                          onChange={(event) => {
                            setSecretGuess(event.target.value);
                            setWrongGuess(false);
                          }}
                          placeholder="Palabra secreta"
                          autoComplete="off"
                          maxLength={20}
                          required
                        />
                        <button type="submit" aria-label="Probar palabra">
                          <ArrowRight />
                        </button>
                      </div>
                      {wrongGuess && (
                        <small role="status">Todavía no. Mira otra vez la marca.</small>
                      )}
                    </form>
                  )}
                </div>
              )}
              <small>Las pistas orientan sin revelar directamente cada señal.</small>
            </aside>
          )}
          <button
            type="button"
            className="hint-fab"
            onClick={() => setHintsOpen((current) => !current)}
            aria-expanded={hintsOpen}
            aria-label={hintsOpen ? "Cerrar caja de pistas" : "Abrir caja de pistas"}
          >
            <Lightbulb />
            <span>{hintsOpen ? "Cerrar pistas" : "Necesito una pista"}</span>
          </button>
        </div>
      )}
    </>
  );
}
