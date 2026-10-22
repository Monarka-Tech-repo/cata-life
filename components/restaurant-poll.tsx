"use client";

import { useEffect, useState } from "react";
import { RestaurantPicker } from "@/components/restaurant-picker";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";
import { fetchRecentRecommendations, submitRestaurantRecommendation } from "@/lib/community-service";
import type { RestaurantEntry, RestaurantRecommendation } from "@/lib/types";
import { useI18n } from "@/components/locale-provider";

export function RestaurantPoll() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState<string | null>(null);
  const [recent, setRecent] = useState<RestaurantRecommendation[]>([]);

  useEffect(() => {
    let cancelled = false;
    void fetchRecentRecommendations().then((list) => {
      if (!cancelled) setRecent(list);
    });
    return () => {
      cancelled = true;
    };
  }, [justSubmitted]);

  async function handleSelect(restaurant: RestaurantEntry) {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await getOrCreateSessionUser();
      await submitRestaurantRecommendation(restaurant.name, restaurant.placeId);
      setJustSubmitted(restaurant.name);
    } catch {
      setError(t.community.pollError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border-2 bg-card p-6">
      <p className="font-hand text-2xl font-semibold text-accent">{t.community.pollEyebrow}</p>
      <h2 className="mt-1 font-heading text-2xl italic normal-case">{t.community.pollTitle}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t.community.pollSubtitle}</p>

      <div className="mt-5">
        <RestaurantPicker onSelect={handleSelect} />
      </div>

      {justSubmitted && (
        <div role="status" className="mt-4 rounded-xl bg-brand-green/10 p-4 text-sm text-foreground">
          {t.community.pollThanksBefore} <strong>{justSubmitted}</strong> {t.community.pollThanksAfter}
        </div>
      )}
      {error && (
        <div role="alert" className="mt-4 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {recent.length > 0 && (
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.community.recentlyRecommended}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {recent.map((r) => (
              <li key={r.id} className="rounded-full border border-border-2 bg-secondary px-3 py-1.5 text-xs font-medium">
                {r.restaurantName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
