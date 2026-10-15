import Image from "next/image";

import bondImage from "../../public/images/wufu-bond-v2.png";
import Paw from "../ui/paw-mark";
import { Arrow } from "./arrow";
import { Countdown } from "./countdown";

export function RevealSection({
  clockDiscovered,
  onDiscover,
}: {
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
            alt="Perro junto a un reloj de arena que representa la espera del lanzamiento"
            fill
            sizes="(max-width: 600px) calc(100vw - 28px), (max-width: 900px) 560px, 42vw"
          />
          <div>
            <Paw />
          </div>
        </div>
        <div className="reveal-copy">
          <div className="kicker light">02 — La espera vale la pena</div>
          <h2>
            Lo bueno se
            <br />
            disfruta.
            <br />
            <em>
              Lo increíble
              <br />
              se espera.
            </em>
          </h2>
          <p>
            Estamos afinando cada detalle para sorprenderte. Mientras tanto, este reloj guarda el
            secreto.
          </p>
          <Countdown secretDisabled={clockDiscovered} onSecret={onDiscover} />
          <a href="#unete" className="button button-cream">
            Avísenme primero <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
