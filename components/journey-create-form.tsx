"use client";

import { FormEvent, useState } from "react";
import { RestaurantPicker } from "@/components/restaurant-picker";
import { useAuth } from "@/hooks/use-auth";
import { createJourney } from "@/lib/journeys-service";
import type { RestaurantEntry } from "@/lib/types";

export function JourneyCreateForm({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState<RestaurantEntry[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSelectRestaurant(restaurant: RestaurantEntry) {
    setRestaurants((prev) => (prev.some((r) => r.placeId === restaurant.placeId) ? prev : [...prev, restaurant]));
  }

  function handleRemoveRestaurant(placeId: string) {
    setRestaurants((prev) => prev.filter((r) => r.placeId !== placeId));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || submitting || !title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const first = restaurants[0];
      const id = await createJourney({
        uid: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        title,
        city: city.trim() || first?.address?.split(",").slice(-2, -1)[0]?.trim() || "",
        lat: first?.lat ?? null,
        lng: first?.lng ?? null,
        restaurants,
      });
      onCreated(id);
    } catch {
      setError("No pudimos crear tu viaje. Intenta de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-2xl border border-border-2 bg-card p-6">
      <div>
        <label htmlFor="journey-title" className="block text-sm font-semibold">
          Título del viaje
        </label>
        <input
          id="journey-title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Fin de semana en Austin"
          className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div>
        <label htmlFor="journey-city" className="block text-sm font-semibold">
          Ciudad
        </label>
        <input
          id="journey-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Opcional — se detecta del primer restaurante"
          className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <RestaurantPicker onSelect={handleSelectRestaurant} />

      {restaurants.length > 0 && (
        <ul className="space-y-2">
          {restaurants.map((r) => (
            <li key={r.placeId} className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3 text-sm">
              <span className="truncate font-medium">{r.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveRestaurant(r.placeId)}
                className="ml-3 shrink-0 text-xs font-semibold text-destructive"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div role="alert" className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="flex min-h-13 flex-1 items-center justify-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Creando…" : "Crear viaje"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex min-h-13 items-center justify-center rounded-full border border-border-2 px-6 font-semibold transition hover:bg-secondary"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
