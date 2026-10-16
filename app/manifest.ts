import type { MetadataRoute } from "next";
import { publicConfig } from "./config/public";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${publicConfig.brandName} — Más vidas juntas`,
    short_name: publicConfig.brandName,
    description: "Todo para una vida más feliz con tu mascota.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf1",
    theme_color: "#0e5d66",
    lang: "es",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
