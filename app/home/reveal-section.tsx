import Image from "next/image";

import bondImage from "../../public/images/rumi-bond-v2.webp";
import type { CampaignSettings } from "../config/campaign";
import Paw from "../ui/paw-mark";
import { Arrow } from "./arrow";
import { Countdown } from "./countdown";
import type { getLandingContent } from "./landing-content";

export function RevealSection({
  campaign,
  content,
  clockDiscovered,
  onDiscover,
}: {
  campaign: CampaignSettings;
  content: ReturnType<typeof getLandingContent>["reveal"];
  clockDiscovered: boolean;
  onDiscover: () => void;
}) {
  return (
    <section className="reveal section">
      <div className="reveal-grid wrap">
        <div className="placeholder">
          <Image
            className="brand-photo"
            src={bondImage}
            alt="Perro artesanal de Rumi sosteniendo un reloj de arena durante la cuenta regresiva"
            fill
            sizes="(max-width: 600px) calc(100vw - 28px), (max-width: 900px) 560px, 42vw"
          />
          <div>
            <Paw />
          </div>
        </div>
        <div className="reveal-copy">
          <div className="kicker">{content.kicker}</div>
          <h2>
            {content.title}
            <br /> <em>{content.accent}</em>
          </h2>
          <p>{content.description}</p>
          <p className="campaign-status-label">{content.countdownLabel}</p>
          {campaign.phase === "open" ? (
            <div className="visit-details" aria-label="Información de la tienda">
              <strong>{campaign.location}</strong>
              <span>{campaign.openingHours}</span>
            </div>
          ) : (
            <Countdown
              targetAt={campaign.phaseEndsAt}
              secretDisabled={clockDiscovered}
              onSecret={onDiscover}
            />
          )}
          <a href="#unete" className="button button-cream">
            {content.cta} <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
