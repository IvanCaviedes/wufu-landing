import { pillars } from "./data";

export function PillarsSection() {
  return (
    <section className="intro section wrap" id="proposito">
      <div className="kicker">01 — Lo que nos mueve</div>
      <div className="intro-grid">
        <h2>
          Una vida mejor
          <br />
          se construye <em>juntos.</em>
        </h2>
        <p>
          Creamos pensando en el vínculo que compartes con tu mascota: más cercanía, menos
          complicaciones, más confianza y bienestar en cada momento.
        </p>
      </div>
      <div className="pillar-grid">
        {pillars.map(({ description, icon: Icon, title }, index) => (
          <article className="pillar" key={title}>
            <div className="pillar-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i>
                <Icon />
              </i>
            </div>
            <div className="pillar-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
