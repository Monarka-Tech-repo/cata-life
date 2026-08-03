"use client";

import { useEffect, useState } from "react";
import { TasteVessel } from "@/components/taste-vessel";
import { fetchAllRecommendations, fetchGlobalFlavorTags } from "@/lib/community-service";
import { PROFILE_COLORS, type ProfileSegment } from "@/lib/taste-profile";

const FLAVOR_LABEL_ES: Record<string, string> = {
  Sweet: "Dulce",
  Sour: "Ácido",
  Salty: "Salado",
  Bitter: "Amargo",
  Spicy: "Picante",
  Umami: "Umami",
  Smoky: "Ahumado",
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; segments: ProfileSegment[]; participants: number; topRestaurants: { name: string; count: number }[] };

function titleCase(str: string) {
  return FLAVOR_LABEL_ES[str] || str;
}

export function CommunityStats() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    void Promise.all([fetchGlobalFlavorTags(), fetchAllRecommendations()])
      .then(([flavorLists, recommendations]) => {
        if (cancelled) return;
        if (flavorLists.length === 0) {
          setState({ status: "empty" });
          return;
        }

        const counts = new Map<string, number>();
        flavorLists.forEach((tags) => tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
        const total = [...counts.values()].reduce((a, b) => a + b, 0);
        const segments: ProfileSegment[] = [...counts.entries()]
          .map(([key, count]) => ({ key, count, pct: (count / total) * 100, avgRating: 0 }))
          .sort((a, b) => b.count - a.count)
          .map((seg, i) => ({ ...seg, color: PROFILE_COLORS[i % PROFILE_COLORS.length] }));

        const restaurantCounts = new Map<string, number>();
        recommendations.forEach((r) => {
          if (!r.restaurantName) return;
          restaurantCounts.set(r.restaurantName, (restaurantCounts.get(r.restaurantName) || 0) + 1);
        });
        const topRestaurants = [...restaurantCounts.entries()]
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);

        setState({ status: "ready", segments, participants: flavorLists.length, topRestaurants });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
        No pudimos cargar las estadísticas de la comunidad.
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="rounded-2xl border border-dashed border-border-2 bg-secondary p-8 text-center text-sm text-muted-foreground">
        Todavía no hay suficientes respuestas — sé de las primeras personas en tomar el cuestionario de gustos.
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Basado en {state.participants} {state.participants === 1 ? "persona" : "personas"} que han tomado el cuestionario de gustos.
      </p>

      <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border border-border-2 bg-card p-6 sm:flex-row">
        <TasteVessel segments={state.segments} size={128} />
        <div className="flex-1 space-y-3">
          {state.segments.map((seg) => (
            <div key={seg.key} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="flex-1 text-sm font-semibold">{titleCase(seg.key)}</span>
              <span className="text-sm font-bold">{Math.round(seg.pct)}%</span>
            </div>
          ))}
        </div>
      </div>

      {state.topRestaurants.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">Restaurantes más recomendados</h3>
          <ul className="mt-3 space-y-2">
            {state.topRestaurants.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between rounded-xl border border-border-2 bg-card px-4 py-3 text-sm"
              >
                <span className="truncate font-medium">{r.name}</span>
                <span className="ml-3 shrink-0 text-xs font-semibold text-muted-foreground">
                  {r.count} {r.count === 1 ? "recomendación" : "recomendaciones"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
