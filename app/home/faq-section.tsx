"use client";

import { useState } from "react";

import type { CampaignSettings } from "../config/campaign";
import Paw from "../ui/paw-mark";
import { faqs } from "./data";
import type { getLandingContent } from "./landing-content";

export function FaqSection({
  campaign,
  content,
}: {
  campaign: CampaignSettings;
  content: ReturnType<typeof getLandingContent>["faq"];
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const phaseFaqs =
    campaign.phase === "open"
      ? [
          { question: "¿Dónde está Wufú?", answer: `Nos encuentras en ${campaign.location}.` },
          { question: "¿Cuál es el horario?", answer: campaign.openingHours },
          ...faqs.filter(({ question }) => !question.includes("Cuándo y dónde")),
        ]
      : faqs;

  return (
    <section className="faq section wrap" id="preguntas">
      <div className="faq-heading">
        <div>
          <div className="kicker">{content.kicker}</div>
          <h2>
            {content.title}
            <br />
            <em>{content.accent}</em>
          </h2>
        </div>
        <div className="faq-badge">
          <Paw light />
          <span>
            {content.badge.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        </div>
      </div>
      <div className="faq-list">
        {phaseFaqs.map(({ answer, question }, index) => {
          const isOpen = openIndex === index;

          return (
            <div className={`faq-item ${isOpen ? "open" : ""}`} key={question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
                <i>{isOpen ? "−" : "+"}</i>
              </button>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
