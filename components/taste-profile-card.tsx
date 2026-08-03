"use client";

import { useState } from "react";
import { TasteVessel } from "@/components/taste-vessel";
import {
  computeTagProfile,
  computeTagRatingProfile,
  computeTasteProfile,
  topTags,
} from "@/lib/taste-profile";
import type { Dish } from "@/lib/types";

type Mode = "type" | "taste" | "cuisine" | "ratings";

const MODE_OPTIONS: { key: Mode; label: string }[] = [
  { key: "type", label: "TIPO DE COMIDA" },
  { key: "taste", label: "SABOR" },
  { key: "cuisine", label: "COCINA" },
  { key: "ratings", label: "CALIFICACIONES" },
];

const EMPTY_HINTS: Record<Mode, string> = {
  type: "Registra platillos en la app para ver tu distribución por tipo de comida",
  taste: "Registra platillos con etiquetas de sabor para ver tu perfil de sabor",
  cuisine: "Registra platillos en distintos restaurantes para ver tu distribución por cocina",
  ratings: "Califica platillos con etiquetas para ver qué es lo que mejor calificas",
};

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TasteProfileCard({ dishes, vesselSize = 128 }: { dishes: Dish[]; vesselSize?: number }) {
  const [mode, setMode] = useState<Mode>("type");

  const segments =
    mode === "ratings"
      ? computeTagRatingProfile(dishes)
      : mode === "taste"
        ? computeTagProfile(dishes)
        : mode === "cuisine"
          ? computeTasteProfile(dishes, "restaurantCuisine")
          : computeTasteProfile(dishes, "category");
  const flavorTags = topTags(dishes);
  const byRatings = mode === "ratings";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {MODE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setMode(opt.key)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition ${
              mode === opt.key
                ? "border-foreground bg-foreground text-background"
                : "border-border-2 bg-secondary text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {segments.length > 0 ? (
        <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border border-border-2 bg-card p-6 sm:flex-row">
          <TasteVessel segments={segments} size={vesselSize} />
          <div className="flex-1 space-y-3">
            {segments.map((seg) => (
              <div key={seg.key}>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
                  <span className="flex-1 truncate text-sm font-semibold">{titleCase(seg.key)}</span>
                  <span className="text-sm font-bold">
                    {byRatings ? `★ ${seg.avgRating.toFixed(1)}` : `${Math.round(seg.pct)}%`}
                  </span>
                </div>
                <p className="ml-[18px] text-xs text-muted-foreground">
                  {byRatings
                    ? `${seg.count} ${seg.count === 1 ? "registro" : "registros"}`
                    : seg.avgRating > 0
                      ? `★ ${seg.avgRating.toFixed(1)} · ${seg.count} ${seg.count === 1 ? "registro" : "registros"}`
                      : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm italic text-muted-foreground">{EMPTY_HINTS[mode]}</p>
      )}

      {flavorTags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {flavorTags.map((tag) => (
            <span key={tag} className="rounded-full border border-border-2 bg-secondary px-3 py-1.5 text-[10px] font-semibold tracking-widest">
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
