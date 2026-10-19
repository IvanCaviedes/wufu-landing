import type { MetadataRoute } from "next";
import { publicConfig } from "./config/public";
const base = publicConfig.siteUrl;
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
