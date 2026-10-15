import Image from "next/image";
import { Sparkles } from "lucide-react";

import heroImage from "../../public/images/wufu-hero-v2.png";
import Navbar from "../ui/navbar";
import Paw from "../ui/paw-mark";
import { Arrow } from "./arrow";
import type { SecretId } from "./types";

type HeroSectionProps = {
  found: SecretId[];
  onDiscover: (secret: SecretId) => void;
  onToggleTheme: () => void;
};

export function HeroSection({ found, onDiscover, onToggleTheme }: HeroSectionProps) {
  return (
    <section className="hero" id="inicio">
      <Navbar variant="landing" onToggleTheme={onToggleTheme} />
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" /> Algo grande está por llegar
          </div>
          <h1>
            La vida juntos
            <br />
            está a punto de
            <br />
            <em>cambiar.</em>
          </h1>
          <p>
            Muy pronto descubrirás una nueva forma de cuidar, consentir y compartir más momentos con
            quien siempre está a tu lado.
          </p>
          <div className="hero-actions">
            <a href="#unete" className="button button-aqua">
              Ser parte de la manada <Arrow />
            </a>
            <a href="#proposito" className="text-link">
              Conoce lo que nos mueve <Arrow down />
            </a>
          </div>
          <div className="discovery-whisper">
            <Sparkles />
            <span>Los mejores detalles no siempre están a simple vista.</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Familia compartiendo con sus mascotas">
          <Image
            className="brand-photo"
            src={heroImage}
            alt="Persona compartiendo un momento feliz con su perro y su gato"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <div className="orbit one" />
          <div className="orbit two" />
          <button
            type="button"
            className="mystery"
            onClick={() => onDiscover("clue")}
            disabled={found.includes("clue")}
            aria-label="Descubrir un detalle secreto"
          >
            ?
          </button>
          <div
            className={`sticker one ${found.includes("logo") ? "secret-hotspot-found" : ""}`}
            onDoubleClick={found.includes("logo") ? undefined : () => onDiscover("logo")}
          >
            Muy
            <br />
            pronto
          </div>
          <button
            type="button"
            className="sticker two"
            onDoubleClick={() => onDiscover("paw")}
            disabled={found.includes("paw")}
            aria-label="Huella decorativa"
          >
            <Paw light />
          </button>
          <i className="spark a">✦</i>
          <i className="spark b">✦</i>
        </div>
      </div>
      <div className="marquee">
        <div>
          MÁS VIDAS JUNTAS　✦　MÁS MOMENTOS　✦　MÁS HISTORIAS　✦　MÁS VIDAS JUNTAS　✦　MÁS
          MOMENTOS　✦
        </div>
      </div>
    </section>
  );
}
