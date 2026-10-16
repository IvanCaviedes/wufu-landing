export type LandingPhase = "prelaunch" | "launch" | "open";
export type CampaignSeason = "none" | "halloween" | "christmas";

export type CampaignSettings = {
  phase: LandingPhase;
  phaseEndsAt: string;
  season: CampaignSeason;
  location: string;
  openingHours: string;
};

const phaseValues = new Set<LandingPhase>(["prelaunch", "launch", "open"]);
const seasonValues = new Set<CampaignSeason>(["none", "halloween", "christmas"]);

function parseDate(value: string | undefined, fallback: string) {
  const parsed = Date.parse(value ?? "");
  return Number.isFinite(parsed) ? parsed : Date.parse(fallback);
}

export function getCampaignSettings(now = Date.now()): CampaignSettings {
  const prelaunchEndsAt =
    process.env.PRELAUNCH_END_AT ||
    process.env.NEXT_PUBLIC_PRELAUNCH_END_AT ||
    "2026-12-01T00:00:00-05:00";
  const launchAt =
    process.env.LAUNCH_AT || process.env.NEXT_PUBLIC_LAUNCH_AT || "2027-01-01T00:00:00-05:00";
  const override = process.env.LANDING_PHASE?.toLowerCase() as LandingPhase | undefined;
  const halloweenStartsAt = parseDate(process.env.HALLOWEEN_START_AT, "2026-10-01T00:00:00-05:00");
  const halloweenEndsAt = parseDate(process.env.HALLOWEEN_END_AT, "2026-11-03T00:00:00-05:00");
  const christmasStartsAt = parseDate(process.env.CHRISTMAS_START_AT, "2026-12-01T00:00:00-05:00");
  const christmasEndsAt = parseDate(process.env.CHRISTMAS_END_AT, "2027-01-07T00:00:00-05:00");
  const seasonOverride = process.env.SEASON_OVERRIDE?.toLowerCase() as CampaignSeason | undefined;
  const phase =
    override && phaseValues.has(override)
      ? override
      : now < parseDate(prelaunchEndsAt, "2026-12-01T00:00:00-05:00")
        ? "prelaunch"
        : now < parseDate(launchAt, "2027-01-01T00:00:00-05:00")
          ? "launch"
          : "open";
  const season =
    seasonOverride && seasonValues.has(seasonOverride)
      ? seasonOverride
      : now >= halloweenStartsAt && now < halloweenEndsAt
        ? "halloween"
        : now >= christmasStartsAt && now < christmasEndsAt
          ? "christmas"
          : "none";

  return {
    phase,
    phaseEndsAt: phase === "prelaunch" ? prelaunchEndsAt : launchAt,
    season,
    location: process.env.OPENING_LOCATION || "Ubicación por anunciar",
    openingHours: process.env.OPENING_HOURS || "Horario por anunciar",
  };
}
