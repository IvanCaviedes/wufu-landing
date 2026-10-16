import { connection } from "next/server";
import { Suspense } from "react";

import { getCampaignSettings } from "./config/campaign";
import { HomePage } from "./home/home-page";

async function CurrentCampaign() {
  await connection();
  return <HomePage campaign={getCampaignSettings()} />;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <CurrentCampaign />
    </Suspense>
  );
}
