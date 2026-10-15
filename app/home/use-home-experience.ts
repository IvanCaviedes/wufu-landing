"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { publicConfig } from "../config/public";
import { secretAlertDurationMs } from "./data";
import { clearProgress, loadProgress, saveProgress } from "./progress-storage";
import type { PawPrintPosition, SecretId } from "./types";

export function useHomeExperience() {
  const [found, setFound] = useState<SecretId[]>([]);
  const [prints, setPrints] = useState<PawPrintPosition[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [secret, setSecret] = useState<SecretId | null>(null);
  const typed = useRef("");

  const discover = useCallback((value: SecretId) => {
    setSecret(value);
    setFound((current) => {
      const next = current.includes(value) ? current : [...current, value];
      void saveProgress(next);
      return next;
    });
  }, []);

  const resetDiscoveries = useCallback(() => {
    clearProgress();
    typed.current = "";
    setFound([]);
    setPrints([]);
    setSecret(null);
  }, []);

  useEffect(() => {
    const systemTheme = matchMedia("(prefers-color-scheme: dark)");
    void loadProgress().then(setFound);

    function followSystemTheme(event: MediaQueryListEvent) {
      if (localStorage.getItem("wufu-theme")) return;

      document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    }

    function updateScrollProgress() {
      const scrollableHeight = document.documentElement.scrollHeight - innerHeight;
      const percentage = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, percentage));
    }

    function handleKeydown(event: KeyboardEvent) {
      typed.current = (typed.current + event.key.toLowerCase()).slice(
        -publicConfig.secretWord.length,
      );
      if (typed.current === publicConfig.secretWord) discover("code");
    }

    addEventListener("scroll", updateScrollProgress, { passive: true });
    addEventListener("keydown", handleKeydown);
    systemTheme.addEventListener("change", followSystemTheme);
    return () => {
      removeEventListener("scroll", updateScrollProgress);
      removeEventListener("keydown", handleKeydown);
      systemTheme.removeEventListener("change", followSystemTheme);
    };
  }, [discover]);

  useEffect(() => {
    if (!secret) return;

    const dismissTimer = window.setTimeout(() => setSecret(null), secretAlertDurationMs);
    return () => window.clearTimeout(dismissTimer);
  }, [secret]);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = nextTheme ? "dark" : "light";
    localStorage.setItem("wufu-theme", nextTheme ? "dark" : "light");
  }

  function trackPointer(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--mx", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY}px`);
  }

  function leavePrint(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("input, select")) return;
    const id = Date.now();
    setPrints((current) => [
      ...current.slice(-7),
      { id, x: event.clientX, y: event.clientY, rotation: Math.random() * 40 - 20 },
    ]);
    window.setTimeout(
      () => setPrints((current) => current.filter((print) => print.id !== id)),
      950,
    );
  }

  return {
    discover,
    found,
    leavePrint,
    prints,
    resetDiscoveries,
    scrollProgress,
    secret,
    setSecret,
    toggleTheme,
    trackPointer,
  };
}
