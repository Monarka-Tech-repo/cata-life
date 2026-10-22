"use client";

import { useEffect, useState } from "react";
import { TasteVessel } from "@/components/taste-vessel";
import { fetchAllRecommendations, fetchGlobalFlavorTags } from "@/lib/community-service";
import { fetchPlaceRatings, type PlaceRating } from "@/lib/place-ratings-service";
import { PROFILE_COLORS, type ProfileSegment } from "@/lib/taste-profile";
import { useI18n } from "@/components/locale-provider";

type TopRestaurant = { name: string; count: number; placeId: string | null };

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; segments: ProfileSegment[]; participants: number; topRestaurants: TopRestaurant[] };

export function CommunityStats() {
  const { t } = useI18n();
  const [state, setState] = useState<State>({ status: "loading" });
  const [ratings, setRatings] = useState<Map<string, PlaceRating>>(new Map());

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

        const restaurantCounts = new Map<string, { count: number; placeId: string | null }>();
        recommendations.forEach((r) => {
          if (!r.restaurantName) return;
          const existing = restaurantCounts.get(r.restaurantName);
          restaurantCounts.set(r.restaurantName, {
            count: (existing?.count || 0) + 1,
            placeId: existing?.placeId ?? r.placeId,
          });
        });
        const topRestaurants: TopRestaurant[] = [...restaurantCounts.entries()]
          .map(([name, v]) => ({ name, count: v.count, placeId: v.placeId }))
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

  // Real Google ratings are a nice-to-have enrichment fetched separately —
  // if the Maps API key isn't configured, this silently fails and the list
  // still renders with just the community recommendation counts.
  useEffect(() => {
    if (state.status !== "ready") return;
    const placeIds = state.topRestaurants.map((r) => r.placeId).filter((id): id is string => !!id);
    if (placeIds.length === 0) return;
    let cancelled = false;
    void fetchPlaceRatings(placeIds).then((map) => {
      if (!cancelled) setRatings(map);
    });
    return () => {
      cancelled = true;
    };
  }, [state]);

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
        {t.community.statsError}
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="rounded-2xl border border-dashed border-border-2 bg-secondary p-8 text-center text-sm text-muted-foreground">
        {t.community.statsEmpty}
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {t.community.basedOn(state.participants)}
      </p>

      <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border border-border-2 bg-card p-6 sm:flex-row">
        <TasteVessel segments={state.segments} size={128} label={t.taste.vesselLabel} />
        <div className="flex-1 space-y-3">
          {state.segments.map((seg) => (
            <div key={seg.key} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="flex-1 text-sm font-semibold">{t.flavors[seg.key] || seg.key}</span>
              <span className="text-sm font-bold">{Math.round(seg.pct)}%</span>
            </div>
          ))}
        </div>
      </div>

      {state.topRestaurants.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">{t.community.topRestaurants}</h3>
          <ul className="mt-3 space-y-2">
            {state.topRestaurants.map((r) => {
              const rating = r.placeId ? ratings.get(r.placeId) : undefined;
              return (
                <li key={r.name} className="rounded-xl border border-border-2 bg-card px-4 py-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-medium">{r.name}</span>
                    <span className="ml-3 shrink-0 text-xs font-semibold text-muted-foreground">
                      {t.community.recommendationCount(r.count)}
                    </span>
                  </div>
                  {rating?.rating != null && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t.community.googleRating(rating.rating.toFixed(1))}
                      {rating.userRatingCount != null && t.community.googleReviews(rating.userRatingCount)}
                      {rating.googleMapsURI && (
                        <>
                          {" · "}
                          <a href={rating.googleMapsURI} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                            {t.community.viewOnMaps}
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
