"use client";

import { useEffect, useState } from "react";

import { publicConfig } from "../config/public";

const labels = {
  days: "días",
  hours: "horas",
  minutes: "min",
  seconds: "seg",
};

type TimeLeft = Record<keyof typeof labels, number>;

function getTimeLeft(target: number): TimeLeft {
  const difference = Math.max(0, target - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function Countdown({
  onSecret,
  secretDisabled,
}: {
  onSecret: () => void;
  secretDisabled: boolean;
}) {
  const configuredTarget = Date.parse(publicConfig.launchAt);
  const target = Number.isFinite(configuredTarget) ? configuredTarget : 0;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(target)), 1_000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([unit, value]) => {
        const key = unit as keyof TimeLeft;

        return (
          <button
            type="button"
            className="time-unit"
            key={key}
            onDoubleClick={key === "seconds" ? onSecret : undefined}
            disabled={key === "seconds" && secretDisabled}
            aria-label={`${value} ${labels[key]}`}
          >
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{labels[key]}</span>
          </button>
        );
      })}
    </div>
  );
}
