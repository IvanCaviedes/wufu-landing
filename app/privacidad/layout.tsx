import type { Metadata } from "next";

import Navbar from "../ui/navbar";
import SiteFooter from "../ui/site-footer";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Conoce cómo Rumi recopila, utiliza y protege tus datos personales.",
  alternates: { canonical: "/privacidad" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="legal" />
      {children}
      <SiteFooter variant="legal" />
    </>
  );
}
