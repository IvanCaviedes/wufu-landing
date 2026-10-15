export const publicConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://wufu.co",
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Wufú",
  campaignYear: process.env.NEXT_PUBLIC_CAMPAIGN_YEAR || "2026",
  launchAt: process.env.NEXT_PUBLIC_LAUNCH_AT || "2026-12-01T09:00:00-05:00",
  campaignCode: process.env.NEXT_PUBLIC_CAMPAIGN_CODE || "MANADA01",
  secretWord: (process.env.NEXT_PUBLIC_SECRET_WORD || "wufu").toLowerCase(),
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL || "#",
  communityUrl: process.env.NEXT_PUBLIC_COMMUNITY_URL || "#",
} as const;
