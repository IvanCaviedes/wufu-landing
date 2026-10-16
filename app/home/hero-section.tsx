import Image from "next/image";
import { Gift, Ghost, Snowflake, Sparkles } from "lucide-react";

import heroImage from "../../public/images/wufu-hero-v2.png";
import type { CampaignSeason } from "../config/campaign";
import Navbar from "../ui/navbar";
import Paw from "../ui/paw-mark";
import { Arrow } from "./arrow";
import type { getLandingContent } from "./landing-content";
import type { SecretId } from "./types";

type HeroSectionProps = {
  content: ReturnType<typeof getLandingContent>["hero"];
  found: SecretId[];
  onDiscover: (secret: SecretId) => void;
  onToggleTheme: () => void;
  season: CampaignSeason;
};

const seasonalCopy = {
  halloween: "Una temporada de sustos, premios y colitas felices",
  christmas: "Celebremos juntos una Navidad llena de huellas",
} as const;

export function HeroSection({
  content,
  found,
  onDiscover,
  onToggleTheme,
  season,
}: HeroSectionProps) {
  const marqueeText = Array.from({ length: 4 }, () => content.marquee).join("　");

  return (
    <section className="hero" id="inicio">
      <Navbar variant="landing" onToggleTheme={onToggleTheme} />
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" /> {content.eyebrow}
          </div>
          {season !== "none" && (
            <div className={`seasonal-note ${season}`}>
              {season === "halloween" ? <Ghost /> : <Snowflake />}
              <span>{seasonalCopy[season]}</span>
            </div>
          )}
          <h1>
            {content.title}
            <br />
            <em>{content.accent}</em>
          </h1>
          <p>{content.description}</p>
          <div className="hero-actions">
            <a href="#unete" className="button button-aqua">
              {content.primary} <Arrow />
            </a>
            <a href="#proposito" className="text-link">
              {content.secondary} <Arrow down />
            </a>
          </div>
          <div className="discovery-whisper">
            <Sparkles />
            <span>{content.whisper}</span>
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
            {content.sticker}
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
          {season === "halloween" && (
            <div className="seasonal-ornament seasonal-halloween" aria-hidden="true">
              <Ghost />
              <span>BOO!</span>
            </div>
          )}
          {season === "christmas" && (
            <div className="seasonal-ornament seasonal-christmas" aria-hidden="true">
              <Snowflake />
              <Gift />
            </div>
          )}
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          <span>{marqueeText}</span>
          <span aria-hidden="true">{marqueeText}</span>
        </div>
      </div>
    </section>
  );
}
