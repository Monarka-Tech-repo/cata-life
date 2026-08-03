"use client";

import { FormEvent, useState } from "react";
import { RestaurantPicker } from "@/components/restaurant-picker";
import { TasteVessel } from "@/components/taste-vessel";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";
import { PROFILE_COLORS } from "@/lib/taste-profile";
import { saveTasteQuizResponse } from "@/lib/taste-quiz-service";
import type { RestaurantEntry } from "@/lib/types";

const FLAVOR_OPTIONS = ["Sweet", "Sour", "Salty", "Bitter", "Spicy", "Umami", "Smoky"];

const FLAVOR_LABEL_ES: Record<string, string> = {
  Sweet: "Dulce",
  Sour: "Ácido",
  Salty: "Salado",
  Bitter: "Amargo",
  Spicy: "Picante",
  Umami: "Umami",
  Smoky: "Ahumado",
};

export function TasteQuiz() {
  const [flavorTags, setFlavorTags] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantEntry[]>([]);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function toggleFlavor(tag: string) {
    setFlavorTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function handleSelectRestaurant(restaurant: RestaurantEntry) {
    setRestaurants((prev) => (prev.some((r) => r.placeId === restaurant.placeId) ? prev : [...prev, restaurant]));
  }

  function handleRemoveRestaurant(placeId: string) {
    setRestaurants((prev) => prev.filter((r) => r.placeId !== placeId));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || flavorTags.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      await getOrCreateSessionUser();
      await saveTasteQuizResponse({
        favoriteRestaurants: restaurants.map((r) => ({ placeId: r.placeId, name: r.name })),
        flavorTags,
        email: email.trim() || null,
      });
      setDone(true);
    } catch {
      setError("No pudimos guardar tus respuestas. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    const segments = flavorTags.map((tag, i) => ({
      key: tag,
      count: 1,
      pct: 100 / flavorTags.length,
      avgRating: 0,
      color: PROFILE_COLORS[i % PROFILE_COLORS.length],
    }));
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border-2 bg-card p-8 text-center">
        <p className="font-hand text-2xl font-semibold text-accent">¡Listo!</p>
        <h2 className="mt-1 font-heading text-3xl italic normal-case">Tu primer perfil de gustos</h2>
        <div className="mt-6">
          <TasteVessel segments={segments} size={140} />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {flavorTags.map((tag) => (
            <span key={tag} className="rounded-full border border-border-2 bg-secondary px-3 py-1.5 text-[10px] font-semibold tracking-widest">
              {(FLAVOR_LABEL_ES[tag] || tag).toUpperCase()}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-sm text-sm text-muted-foreground">
          Guardamos tus respuestas — pronto usaremos esto para recomendarte viajes gastronómicos personalizados.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border-2 bg-card p-6">
      <div>
        <p className="text-sm font-semibold">¿Qué sabores te gustan más?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {FLAVOR_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleFlavor(tag)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                flavorTags.includes(tag)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border-2 bg-secondary text-foreground"
              }`}
            >
              {FLAVOR_LABEL_ES[tag] || tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold">Tus restaurantes favoritos</p>
        <div className="mt-3">
          <RestaurantPicker onSelect={handleSelectRestaurant} />
        </div>
        {restaurants.length > 0 && (
          <ul className="mt-3 space-y-2">
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
      </div>

      <div>
        <label htmlFor="quiz-email" className="block text-sm font-semibold">
          Correo (opcional)
        </label>
        <input
          id="quiz-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Para avisarte cuando tengamos recomendaciones para ti"
          className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || flavorTags.length === 0}
        className="flex min-h-13 w-full items-center justify-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Guardando…" : "Ver mi perfil de gustos"}
      </button>
    </form>
  );
}
