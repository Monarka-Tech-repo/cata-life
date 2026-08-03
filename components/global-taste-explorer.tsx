"use client";

import { useEffect, useMemo, useState } from "react";
import { TasteProfileCard } from "@/components/taste-profile-card";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";
import { fetchGlobalDishSample } from "@/lib/dishes-service";
import type { Dish } from "@/lib/types";

const TOP_CITY_COUNT = 8;

// The mobile app derives `city` from splitting a Google formatted address by
// comma, which sometimes yields a street/plaza fragment instead of a real
// city name (e.g. "48-red", "Av Gral Álvaro Obregón s/n-Local 33"). Keep
// those out of the suggested pills — a real city name doesn't contain
// digits or slashes and isn't unusually long.
function looksLikeCityName(city: string): boolean {
  return !/[\d/]/.test(city) && city.length <= 24;
}

type State = { status: "loading" } | { status: "error" } | { status: "ready"; dishes: Dish[] };

export function GlobalTasteExplorer() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
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

  const topCities = useMemo(() => {
    if (state.status !== "ready") return [];
    const counts = new Map<string, number>();
    state.dishes.forEach((d) => {
      if (!d.city || !looksLikeCityName(d.city)) return;
      counts.set(d.city, (counts.get(d.city) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_CITY_COUNT)
      .map(([city, count]) => ({ city, count }));
  }, [state]);

  const filteredDishes = useMemo(() => {
    if (state.status !== "ready") return [];
    if (selectedCity) return state.dishes.filter((d) => d.city === selectedCity);
    if (search.trim()) {
      const needle = search.trim().toLowerCase();
      return state.dishes.filter((d) => d.city?.toLowerCase().includes(needle));
    }
    return state.dishes;
  }, [state, selectedCity, search]);

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
    <div>
      <p className="text-sm text-muted-foreground">
        Basado en una muestra reciente de platillos registrados en CATA alrededor del mundo.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedCity(null);
            setSearch("");
          }}
          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
            !selectedCity
              ? "border-foreground bg-foreground text-background"
              : "border-border-2 bg-secondary text-foreground"
          }`}
        >
          Todo el mundo
        </button>
        {topCities.map(({ city, count }) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setSelectedCity(city);
              setSearch("");
            }}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              selectedCity === city
                ? "border-foreground bg-foreground text-background"
                : "border-border-2 bg-secondary text-foreground"
            }`}
          >
            {city} <span className="opacity-60">· {count}</span>
          </button>
        ))}
      </div>

      <div className="mt-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedCity(null);
          }}
          placeholder="O busca cualquier otra ciudad…"
          className="min-h-11 w-full max-w-sm rounded-xl border border-border-2 bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="mt-6">
        {filteredDishes.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">No encontramos platillos registrados para esa ciudad.</p>
        ) : (
          <>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              {selectedCity || search.trim() || "Todo el mundo"} · {filteredDishes.length}{" "}
              {filteredDishes.length === 1 ? "platillo" : "platillos"}
            </p>
            <TasteProfileCard dishes={filteredDishes} />
          </>
        )}
      </div>
    </div>
  );
}
