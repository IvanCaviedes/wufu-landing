function canonicalSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const fallback = "https://www.wufu.pet";

  try {
    const url = new URL(value || fallback);
    if (url.hostname === "wufu.pet") url.hostname = "www.wufu.pet";
    return url.origin;
  } catch {
    return fallback;
  }
}

export const publicConfig = {
  siteUrl: canonicalSiteUrl(),
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Wufú",
  campaignYear: process.env.NEXT_PUBLIC_CAMPAIGN_YEAR || "2026",
  campaignCode: process.env.NEXT_PUBLIC_CAMPAIGN_CODE || "MANADA01",
  secretWord: (process.env.NEXT_PUBLIC_SECRET_WORD || "wufu").toLowerCase(),
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/wufupets/",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL || "#",
  communityUrl: process.env.NEXT_PUBLIC_COMMUNITY_URL || "#",
} as const;
