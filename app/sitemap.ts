import type { MetadataRoute } from "next";
import { publicConfig } from "./config/public";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicConfig.siteUrl;
  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${base}/images/wufu-hero-v2.webp`, `${base}/images/wufu-bond-v2.webp`],
    },
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
