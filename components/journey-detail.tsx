"use client";

import { useState } from "react";
import { RestaurantPicker } from "@/components/restaurant-picker";
import { useAuth } from "@/hooks/use-auth";
import { addRestaurantToJourney } from "@/lib/journeys-service";
import type { FoodJourneyList, RestaurantEntry } from "@/lib/types";

export function JourneyDetail({
  journey,
  onBack,
  onUpdated,
}: {
  journey: FoodJourneyList;
  onBack: () => void;
  onUpdated: (journey: FoodJourneyList) => void;
}) {
  const { user } = useAuth();
  const isOwner = user?.uid === journey.userId;
  const [adding, setAdding] = useState(false);

  async function handleAdd(restaurant: RestaurantEntry) {
    if (adding || journey.restaurants.some((r) => r.placeId === restaurant.placeId)) return;
    setAdding(true);
    try {
      await addRestaurantToJourney(journey.id, restaurant);
      onUpdated({ ...journey, restaurants: [...journey.restaurants, restaurant] });
    } finally {
      setAdding(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={onBack} className="text-sm font-medium text-accent underline underline-offset-4">
        ← Todos tus viajes
      </button>

      <h2 className="mt-4 font-heading text-3xl italic normal-case">{journey.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{journey.city || "Sin ciudad"}</p>

      {journey.restaurants.length === 0 ? (
        <p className="mt-6 text-sm italic text-muted-foreground">Aún no hay restaurantes en este viaje.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {journey.restaurants.map((r) => (
            <li key={r.placeId} className="rounded-2xl border border-border-2 bg-card p-4">
              <p className="font-semibold">{r.name}</p>
              {r.address && <p className="mt-0.5 text-sm text-muted-foreground">{r.address}</p>}
            </li>
          ))}
        </ul>
      )}

      {isOwner && (
        <div className="mt-8 border-t border-border pt-6">
          <RestaurantPicker onSelect={handleAdd} />
        </div>
      )}
    </div>
  );
}
