import type { MetadataRoute } from "next";
import { publicConfig } from "./config/public";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicConfig.siteUrl;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/privacidad`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/terminos`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
