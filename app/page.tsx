"use client";

import { FaqSection } from "./home/faq-section";
import { HeroSection } from "./home/hero-section";
import { BackToTop } from "./home/back-to-top";
import { PillarsSection } from "./home/pillars-section";
import { RevealSection } from "./home/reveal-section";
import { SecretOverlays } from "./home/secret-overlays";
import { SignupSection } from "./home/signup-section";
import { useHomeExperience } from "./home/use-home-experience";
import SiteFooter from "./ui/site-footer";

export default function Home() {
  const experience = useHomeExperience();

  return (
    <main onMouseMove={experience.trackPointer} onClick={experience.leavePrint}>
      <SecretOverlays
        found={experience.found}
        prints={experience.prints}
        secret={experience.secret}
        onClose={() => experience.setSecret(null)}
        onDiscover={experience.discover}
        onShowLatest={() => experience.setSecret(experience.found.at(-1) ?? "clue")}
      />
      <BackToTop
        hasReward={experience.found.length > 0}
        visible={experience.scrollProgress > 12 && experience.secret === null}
      />
      <div className="scroll-progress" style={{ width: `${experience.scrollProgress}%` }} />
      <HeroSection onDiscover={experience.discover} onToggleTheme={experience.toggleTheme} />
      <PillarsSection />
      <RevealSection onDiscover={() => experience.discover("clock")} />
      <FaqSection />
      <SignupSection
        foundCount={experience.found.length}
        onRegistrationSent={experience.resetDiscoveries}
      />
      <SiteFooter />
    </main>
  );
}
