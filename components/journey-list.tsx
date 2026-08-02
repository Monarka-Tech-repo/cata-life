"use client";

import type { FoodJourneyList } from "@/lib/types";

export function JourneyList({
  journeys,
  onOpen,
  onNew,
}: {
  journeys: FoodJourneyList[];
  onOpen: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tus viajes</h2>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:bg-accent"
        >
          Nuevo viaje
        </button>
      </div>

      {journeys.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border-2 bg-secondary p-8 text-center text-sm text-muted-foreground">
          Aún no has creado ningún viaje. Crea uno para empezar a guardar restaurantes que quieres visitar.
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {journeys.map((journey) => (
            <li key={journey.id}>
              <button
                type="button"
                onClick={() => onOpen(journey.id)}
                className="w-full rounded-2xl border border-border-2 bg-card p-5 text-left transition hover:border-accent"
              >
                <h3 className="font-heading text-xl italic normal-case">{journey.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{journey.city || "Sin ciudad"}</p>
                <p className="mt-3 text-xs font-semibold text-accent">
                  {journey.restaurants.length}{" "}
                  {journey.restaurants.length === 1 ? "restaurante" : "restaurantes"}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
