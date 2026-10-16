"use client";

import type { CampaignSettings } from "../config/campaign";
import SiteFooter from "../ui/site-footer";
import { BackToTop } from "./back-to-top";
import { FaqSection } from "./faq-section";
import { HeroSection } from "./hero-section";
import { getLandingContent } from "./landing-content";
import { PillarsSection } from "./pillars-section";
import { RevealSection } from "./reveal-section";
import {
  ChristmasBackground,
  ChristmasSnow,
  HalloweenBackground,
  HalloweenTreats,
} from "./seasonal-background";
import { SecretOverlays } from "./secret-overlays";
import { SignupSection } from "./signup-section";
import { useHomeExperience } from "./use-home-experience";

export function HomePage({ campaign }: { campaign: CampaignSettings }) {
  const experience = useHomeExperience(campaign.season);
  const content = getLandingContent(campaign.phase);

  return (
    <main
      data-campaign-phase={campaign.phase}
      data-season={campaign.season}
      onMouseMove={experience.trackPointer}
      onClick={experience.leavePrint}
    >
      {campaign.season === "halloween" && (
        <>
          <HalloweenBackground />
          <HalloweenTreats />
        </>
      )}
      {campaign.season === "christmas" && (
        <>
          <ChristmasBackground />
          <ChristmasSnow />
        </>
      )}
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
      <HeroSection
        season={campaign.season}
        content={content.hero}
        found={experience.found}
        onDiscover={experience.discover}
        onToggleTheme={experience.toggleTheme}
      />
      <PillarsSection content={content.intro} />
      <RevealSection
        campaign={campaign}
        content={content.reveal}
        clockDiscovered={experience.found.includes("clock")}
        onDiscover={() => experience.discover("clock")}
      />
      <FaqSection campaign={campaign} content={content.faq} />
      <SignupSection
        content={content.signup}
        foundCount={experience.found.length}
        onRegistrationSent={experience.resetDiscoveries}
      />
      <SiteFooter />
    </main>
  );
}
