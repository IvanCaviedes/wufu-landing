"use client";

import { useState } from "react";

import Paw from "../ui/paw-mark";
import { faqs } from "./data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section wrap" id="preguntas">
      <div className="faq-heading">
        <div>
          <div className="kicker">03 — Antes de abrir las puertas</div>
          <h2>
            Lo que ya podemos
            <br />
            <em>contarte.</em>
          </h2>
        </div>
        <div className="faq-badge">
          <Paw light />
          <span>
            Abrimos
            <br />
            muy pronto
          </span>
        </div>
      </div>
      <div className="faq-list">
        {faqs.map(({ answer, question }, index) => {
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
