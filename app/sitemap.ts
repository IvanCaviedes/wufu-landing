import type { MetadataRoute } from "next";
import { publicConfig } from "./config/public";
export default function sitemap():MetadataRoute.Sitemap{const base=publicConfig.siteUrl;return[{url:base,lastModified:new Date(),changeFrequency:"weekly",priority:1},{url:`${base}/privacidad`,lastModified:new Date(),changeFrequency:"monthly",priority:.3},{url:`${base}/terminos`,lastModified:new Date(),changeFrequency:"monthly",priority:.3}]}
