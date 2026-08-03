"use client";

import { useMemo, useState, useEffect } from "react";
import { TasteProfileCard } from "@/components/taste-profile-card";
import { WorldMapBackground } from "@/components/world-map-background";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";
import { fetchGlobalDishSample } from "@/lib/dishes-service";
import type { Dish } from "@/lib/types";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; dishes: Dish[] };

export function GlobalTasteExplorer() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    void getOrCreateSessionUser()
      .then(() => fetchGlobalDishSample())
      .then((dishes) => {
        if (!cancelled) setState({ status: "ready", dishes });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDishes = useMemo(() => {
    if (state.status !== "ready") return [];
    const needle = search.trim().toLowerCase();
    if (!needle) return state.dishes;
    return state.dishes.filter((d) => d.city?.toLowerCase().includes(needle));
  }, [state, search]);

  if (state.status === "loading") {
    return (
      <div className="flex justify-center py-12" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div role="alert" className="rounded-2xl bg-destructive/10 p-6 text-center text-sm text-destructive">
        No pudimos cargar los gustos del mundo.
      </div>
    );
  }

  if (state.dishes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-2 bg-secondary p-8 text-center text-sm text-muted-foreground">
        Todavía no hay suficientes platillos registrados en CATA para mostrar esto.
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div>
        {filteredDishes.length > 0 ? (
          <TasteProfileCard dishes={filteredDishes} vesselSize={220} bordered={false} />
        ) : (
          <p className="text-sm italic text-muted-foreground">No encontramos platillos registrados para esa ciudad.</p>
        )}
      </div>

      <div>
        <label htmlFor="global-city-search" className="block text-sm font-semibold">
          Busca una ciudad
        </label>
        <input
          id="global-city-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ej. Chicago o Nueva York"
          className="mt-2 min-h-13 w-full rounded-full border border-border-2 bg-secondary px-5 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden">
          <WorldMapBackground />
        </div>
      </div>
    </div>
  );
}
