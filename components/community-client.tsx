"use client";

import { CommunityStats } from "@/components/community-stats";
import { RestaurantPoll } from "@/components/restaurant-poll";

export function CommunityClient() {
  return (
    <div className="space-y-12">
      <RestaurantPoll />
      <div>
        <h2 className="font-heading text-2xl italic normal-case">Así prueba la comunidad</h2>
        <div className="mt-4">
          <CommunityStats />
        </div>
      </div>
    </div>
  );
}
