"use client";

import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { TasteProfileCard } from "@/components/taste-profile-card";
import { useAuth } from "@/hooks/use-auth";
import { fetchUserDishes } from "@/lib/dishes-service";
import type { Dish } from "@/lib/types";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; dishes: Dish[] };

function Inner() {
  const { user } = useAuth();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void Promise.resolve()
      .then(() => {
        if (!cancelled) setState({ status: "loading" });
        return fetchUserDishes(user.uid);
      })
      .then((dishes) => {
        if (!cancelled) setState({ status: "ready", dishes });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (state.status === "loading") {
    return (
      <div className="flex justify-center py-16" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div role="alert" className="rounded-2xl bg-destructive/10 p-6 text-center text-sm text-destructive">
        No pudimos cargar tu perfil de gustos. Intenta de nuevo más tarde.
        <br />
        Si el problema persiste, escríbenos a{" "}
        <a href="mailto:cata.support@monarka.tech" className="underline underline-offset-4">
          cata.support@monarka.tech
        </a>
        .
      </div>
    );
  }

  if (state.dishes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-2 bg-secondary p-8 text-center text-sm text-muted-foreground">
        Aún no has registrado platillos — abre la app CATA para tu primer registro y tu perfil de sabor aparecerá aquí.
      </div>
    );
  }

  return <TasteProfileCard dishes={state.dishes} />;
}

export function TasteProfileClient() {
  return (
    <RequireAuth>
      <Inner />
    </RequireAuth>
  );
}
