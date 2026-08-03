"use client";

import { useEffect, useState } from "react";
import { TasteProfileCard } from "@/components/taste-profile-card";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";
import { fetchGlobalDishSample } from "@/lib/dishes-service";
import type { Dish } from "@/lib/types";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; dishes: Dish[] };

export function GlobalTasteExplorer() {
  const [state, setState] = useState<State>({ status: "loading" });

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
        Basado en una muestra reciente de {state.dishes.length} platillos registrados en CATA alrededor del mundo.
      </p>
      <div className="mt-6">
        <TasteProfileCard dishes={state.dishes} />
      </div>
    </div>
  );
}
