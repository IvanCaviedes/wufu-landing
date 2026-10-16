import type { Metadata } from "next";
import "./globals.css";
import { publicConfig } from "./config/public";
import ThemeScript from "./ui/theme-script";
const siteUrl = publicConfig.siteUrl;
const siteDescription =
  "Conoce Rumi, la próxima tienda de mascotas en Colombia, con productos para perros y gatos elegidos para su bienestar, cuidado y vida diaria.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${publicConfig.brandName} | Tienda de mascotas en Colombia`,
    template: `%s | ${publicConfig.brandName}`,
  },
  description: siteDescription,
  applicationName: publicConfig.brandName,
  icons: {
    icon: [{ url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" }],
    shortcut: ["/images/favicon-32.png"],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "Rumi",
    "tienda de mascotas",
    "tienda de mascotas Colombia",
    "productos para mascotas",
    "productos para perros",
    "productos para gatos",
    "bienestar para perros y gatos",
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
    title: `${publicConfig.brandName} | Tienda de mascotas en Colombia`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${publicConfig.brandName} | Tienda de mascotas en Colombia`,
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
      alternateName: "Rumi",
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
      alternateName: "Rumi",
      description: siteDescription,
      inLanguage: "es-CO",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
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
