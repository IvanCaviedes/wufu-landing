import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Wufú, próxima tienda para mascotas — Más vidas juntas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heroData = await readFile(join(process.cwd(), "public/images/wufu-hero-v2.png"));
const heroSrc = `data:image/png;base64,${heroData.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#07383f",
        color: "#fffaf1",
      }}
    >
      {/* ImageResponse se renderiza fuera del DOM y necesita una imagen HTML directa. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroSrc}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(4,37,42,.96) 0%, rgba(4,37,42,.82) 48%, rgba(4,37,42,.12) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "68px 72px",
          maxWidth: 750,
        }}
      >
        <span
          style={{
            color: "#31d8c2",
            fontSize: 27,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Próxima tienda para mascotas
        </span>
        <strong
          style={{
            display: "flex",
            marginTop: 25,
            fontSize: 86,
            lineHeight: 0.94,
            letterSpacing: -4,
          }}
        >
          Más vidas juntas.
        </strong>
        <span style={{ marginTop: 34, fontSize: 31, lineHeight: 1.25 }}>
          Productos y experiencias pensados para perros, gatos y sus familias.
        </span>
        <span style={{ marginTop: 34, fontSize: 30, color: "#31d8c2", fontWeight: 800 }}>Wufú</span>
      </div>
    </div>,
    size,
  );
}
