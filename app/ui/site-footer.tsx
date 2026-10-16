import Link from "next/link";
import { Camera } from "lucide-react";
import PawMark from "./paw-mark";
import styles from "./site-chrome.module.css";
import { publicConfig } from "../config/public";

export default function SiteFooter({ variant = "landing" }: { variant?: "landing" | "legal" }) {
  if (variant === "legal") {
    return (
      <footer className={styles.legalFooter}>
        © {publicConfig.campaignYear} {publicConfig.brandName} ·{" "}
        <Link href="/privacidad">Privacidad</Link>
        <span>·</span>
        <Link href="/terminos">Términos y condiciones</Link>
      </footer>
    );
  }

  return (
    <footer>
      <div className="wrap footer-main">
        <a className="logo footer-logo" href="#inicio">
          wufú
          <span>
            <PawMark small />
          </span>
        </a>
        <p>
          Todo para tu mascota.
          <br />
          Más vidas juntas.
          <small className="secret-hint">
            Psst… algunas palabras también se descubren con el teclado.
          </small>
        </p>
        <div className="socials">
          <a className="instagram" href={publicConfig.instagramUrl} aria-label="Instagram de Wufú">
            <Camera />
            <span>Instagram</span>
          </a>
          {/* <a className="tiktok" href={publicConfig.tiktokUrl} aria-label="TikTok">
            <Music2 />
            <span>TikTok</span>
          </a>
          <a className="community" href={publicConfig.communityUrl} aria-label="Comunidad Wufú">
            <MessageCircle />
            <span>Comunidad</span>
          </a> */}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {publicConfig.campaignYear} {publicConfig.brandName}. Todos los derechos reservados.
        </span>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/terminos">Términos</Link>
      </div>
    </footer>
  );
}
