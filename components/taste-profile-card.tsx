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
import { useI18n } from "@/components/locale-provider";

type Mode = "type" | "taste" | "cuisine" | "ratings";

const MODES: Mode[] = ["type", "taste", "cuisine", "ratings"];

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TasteProfileCard({
  dishes,
  vesselSize = 128,
  bordered = true,
}: {
  dishes: Dish[];
  vesselSize?: number;
  bordered?: boolean;
}) {
  const { t } = useI18n();
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
        {MODES.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition ${
              mode === key
                ? "border-foreground bg-foreground text-background"
                : "border-border-2 bg-secondary text-foreground"
            }`}
          >
            {t.taste.modes[key]}
          </button>
        ))}
      </div>

      {segments.length > 0 ? (
        <div
          className={`mt-6 flex flex-col items-center gap-6 sm:flex-row ${
            bordered ? "rounded-2xl border border-border-2 bg-card p-6" : ""
          }`}
        >
          <TasteVessel segments={segments} size={vesselSize} label={t.taste.vesselLabel} />
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
                    ? t.taste.entries(seg.count)
                    : seg.avgRating > 0
                      ? `★ ${seg.avgRating.toFixed(1)} · ${t.taste.entries(seg.count)}`
                      : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm italic text-muted-foreground">{t.taste.emptyHints[mode]}</p>
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
