import Navbar from "../ui/navbar";
import SiteFooter from "../ui/site-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="legal" />
      {children}
      <SiteFooter variant="legal" />
    </>
  );
}
