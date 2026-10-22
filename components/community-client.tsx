"use client";

import { CommunityStats } from "@/components/community-stats";
import { GlobalTasteExplorer } from "@/components/global-taste-explorer";
import { RestaurantPoll } from "@/components/restaurant-poll";
import { useI18n } from "@/components/locale-provider";

export function CommunityClient() {
  const { t } = useI18n();
  return (
    <div className="space-y-12">
      <RestaurantPoll />
      <div>
        <h2 className="font-heading text-2xl italic normal-case">{t.community.worldTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.community.worldSubtitle}</p>
        <div className="mt-4">
          <GlobalTasteExplorer />
        </div>
      </div>
      <div>
        <h2 className="font-heading text-2xl italic normal-case">{t.community.communityTitle}</h2>
        <div className="mt-4">
          <CommunityStats />
        </div>
      </div>
    </div>
  );
}
