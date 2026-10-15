import type { Metadata } from "next";
import "./globals.css";
import { publicConfig } from "./config/public";
import ThemeScript from "./ui/theme-script";
const siteUrl = publicConfig.siteUrl;
const siteDescription =
  "Descubre Wufú, la próxima tienda para mascotas en Colombia: productos elegidos con cuidado, experiencias y novedades para compartir más momentos con perros y gatos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${publicConfig.brandName} | Próxima tienda para mascotas`,
    template: `%s | ${publicConfig.brandName}`,
  },
  description: siteDescription,
  applicationName: publicConfig.brandName,
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: ["/images/favicon.png"],
    apple: [{ url: "/images/favicon.png", type: "image/png" }],
  },
  keywords: [
    "Wufú",
    "Wufu",
    "Wufu mascotas",
    "Wufu tienda para mascotas",
    "tienda para mascotas",
    "tienda de mascotas Colombia",
    "productos para perros",
    "productos para gatos",
    "mascotas",
    "bienestar animal",
    "perros",
    "gatos",
    "próxima apertura",
  ],
  authors: [{ name: publicConfig.brandName }],
  creator: publicConfig.brandName,
  publisher: publicConfig.brandName,
  category: "mascotas",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: publicConfig.brandName,
    title: `${publicConfig.brandName} | Próxima tienda para mascotas`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${publicConfig.brandName} | Próxima tienda para mascotas`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const socialProfiles = [publicConfig.instagramUrl, publicConfig.tiktokUrl].filter((url) =>
  url.startsWith("https://"),
);
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: publicConfig.brandName,
      alternateName: "Wufu",
      url: siteUrl,
      slogan: "Más vidas juntas",
      description: siteDescription,
      sameAs: socialProfiles,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: publicConfig.brandName,
      alternateName: "Wufu",
      description: siteDescription,
      inLanguage: "es-CO",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
