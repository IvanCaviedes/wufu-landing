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
        src: "/images/favicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
