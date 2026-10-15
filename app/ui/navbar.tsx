"use client";

import Link from "next/link";
import { ArrowRight, Moon, Sun } from "lucide-react";
import BrandLogo from "./brand-logo";
import PawMark from "./paw-mark";
import styles from "./site-chrome.module.css";

type NavbarProps =
  | { variant: "legal" }
  | { variant: "landing"; dark: boolean; onToggleTheme: () => void };

export default function Navbar(props: NavbarProps) {
  if (props.variant === "legal") {
    return (
      <header className={styles.legalNav}>
        <div className={styles.legalNavInner}>
          <Link
            className={styles.legalBrand}
            href="/#inicio"
            prefetch={false}
            aria-label="Wufú, volver al inicio"
          >
            <div className="logo">
              wufú
              <span>
                <PawMark small />
              </span>
            </div>
          </Link>
          <Link className={styles.legalBack} href="/#inicio" prefetch={false}>
            ← Volver al sitio
          </Link>
        </div>
      </header>
    );
  }

  return (
    <nav className="nav wrap">
      <a className="logo" href="#inicio" aria-label="Wufú, inicio">
        wufú
        <span>
          <PawMark small />
        </span>
      </a>
      <div className="nav-links">
        <a href="#pistas">Pistas</a>
        <a href="#preguntas">Preguntas</a>
      </div>
      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={props.onToggleTheme}
          aria-label={props.dark ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {props.dark ? <Sun /> : <Moon />}
        </button>
        <a className="nav-cta" href="#unete">
          Quiero enterarme <ArrowRight />
        </a>
      </div>
    </nav>
  );
}
