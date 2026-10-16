import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Perro artesanal de Rumi y anuncio de la próxima tienda de mascotas en Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Keep a lightweight PNG just for Satori; the page itself uses WebP.
const heroData = await readFile(join(process.cwd(), "public/images/rumi-hero-og.png"));
const heroSrc = `data:image/png;base64,${heroData.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        overflow: "hidden",
        background: "#07383f",
        color: "#fffaf1",
      }}
    >
      <div
        style={{
          width: 700,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 62px 52px",
          background: "#07383f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 34, fontWeight: 900, color: "#31d8c2" }}>rumi</span>
          <span
            style={{
              width: 8,
              height: 8,
              marginLeft: 18,
              marginRight: 18,
              borderRadius: 999,
              background: "#31d8c2",
            }}
          />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1.5 }}>
            PRÓXIMA APERTURA
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            <span>Más vidas</span>
            <span style={{ color: "#31d8c2" }}>juntas.</span>
          </strong>
          <span
            style={{
              width: 510,
              marginTop: 28,
              fontSize: 27,
              lineHeight: 1.3,
              color: "#dcebea",
            }}
          >
            Una nueva tienda para mascotas, pensada para perros, gatos y sus familias.
          </span>
        </div>

        <span style={{ fontSize: 22, fontWeight: 700, color: "#31d8c2" }}>
          Descubre lo que viene en somosrumi.pet
        </span>
      </div>

      <div style={{ width: 500, height: 630, display: "flex", position: "relative" }}>
        {/* ImageResponse se renderiza fuera del DOM y necesita una imagen HTML directa. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          style={{ width: 500, height: 630, objectFit: "cover", objectPosition: "58% center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, #07383f 0%, rgba(7,56,63,0) 28%)",
          }}
        />
      </div>
    </div>,
    size,
  );
}
