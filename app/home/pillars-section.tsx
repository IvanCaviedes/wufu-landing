import { pillars } from "./data";
import type { getLandingContent } from "./landing-content";

export function PillarsSection({
  content,
}: {
  content: ReturnType<typeof getLandingContent>["intro"];
}) {
  return (
    <section className="intro section wrap" id="proposito">
      <div className="kicker">{content.kicker}</div>
      <div className="intro-grid">
        <h2>
          {content.title}
          <br /> <em>{content.accent}</em>
        </h2>
        <p>{content.description}</p>
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
