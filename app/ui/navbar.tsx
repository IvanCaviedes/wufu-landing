"use client";

import Link from "next/link";
import { ArrowRight, Moon, Sun } from "lucide-react";
import PawMark from "./paw-mark";
import styles from "./site-chrome.module.css";

type NavbarProps = { variant: "legal" } | { variant: "landing"; onToggleTheme: () => void };

export default function Navbar(props: NavbarProps) {
  if (props.variant === "legal") {
    return (
      <header className={styles.legalNav}>
        <div className={styles.legalNavInner}>
          <Link
            className={styles.legalBrand}
            href="/#inicio"
            prefetch={false}
            aria-label="Rumi, volver al inicio"
          >
            <div className="logo">
              rumi
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
      <a className="logo" href="#inicio" aria-label="Rumi, inicio">
        rumi
        <span>
          <PawMark small />
        </span>
      </a>
      <div className="nav-links">
        <a href="#proposito">Nuestro propósito</a>
        <a href="#preguntas">Preguntas</a>
      </div>
      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={props.onToggleTheme}
          aria-label="Cambiar tema de color"
        >
          <Moon className="theme-icon-light" aria-hidden="true" />
          <Sun className="theme-icon-dark" aria-hidden="true" />
        </button>
        <a className="nav-cta" href="#unete">
          Quiero enterarme <ArrowRight />
        </a>
      </div>
    </nav>
  );
}
