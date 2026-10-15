import { ArrowUp } from "lucide-react";

type BackToTopProps = {
  hasReward: boolean;
  visible: boolean;
};

export function BackToTop({ hasReward, visible }: BackToTopProps) {
  return (
    <a
      className={`back-to-top ${visible ? "visible" : ""} ${hasReward ? "with-reward" : ""}`}
      href="#inicio"
      aria-label="Volver al inicio de la página"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span>Volver arriba</span>
      <ArrowUp aria-hidden="true" />
    </a>
  );
}
