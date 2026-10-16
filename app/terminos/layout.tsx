import type { Metadata } from "next";

import Navbar from "../ui/navbar";
import SiteFooter from "../ui/site-footer";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Consulta los términos y condiciones de uso del sitio web de Rumi.",
  alternates: { canonical: "/terminos" },
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
