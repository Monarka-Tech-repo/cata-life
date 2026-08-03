"use client";

import { CommunityStats } from "@/components/community-stats";
import { GlobalTasteExplorer } from "@/components/global-taste-explorer";
import { RestaurantPoll } from "@/components/restaurant-poll";

export function CommunityClient() {
  return (
    <div className="space-y-12">
      <RestaurantPoll />
      <div>
        <h2 className="font-heading text-2xl italic normal-case">Gustos alrededor del mundo</h2>
        <p className="mt-1 text-sm text-muted-foreground">Filtra por ciudad para ver cómo se come ahí.</p>
        <div className="mt-4">
          <GlobalTasteExplorer />
        </div>
      </div>
      <div>
        <h2 className="font-heading text-2xl italic normal-case">Así prueba la comunidad</h2>
        <div className="mt-4">
          <CommunityStats />
        </div>
      </div>
    </div>
  );
}
