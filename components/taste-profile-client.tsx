"use client";

import { useEffect, useState } from "react";
import { TasteProfileCard } from "@/components/taste-profile-card";
import { TasteQuiz } from "@/components/taste-quiz";
import { useAuth } from "@/hooks/use-auth";
import { fetchUserDishes } from "@/lib/dishes-service";
import type { Dish } from "@/lib/types";
import { useI18n } from "@/components/locale-provider";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; dishes: Dish[] };

function RealProfile({ uid }: { uid: string }) {
  const { t } = useI18n();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve()
      .then(() => {
        if (!cancelled) setState({ status: "loading" });
        return fetchUserDishes(uid);
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
  }, [uid]);

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
        {t.taste.loadError}
        <br />
        {t.common.supportPersist}{" "}
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
        {t.taste.empty}
      </div>
    );
  }

  return <TasteProfileCard dishes={state.dishes} />;
}

export function TasteProfileClient() {
  const { isRealUser, loading, user } = useAuth();
  const { t, href } = useI18n();

  if (loading) {
    return (
      <div className="flex justify-center py-16" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  if (isRealUser && user) {
    return <RealProfile uid={user.uid} />;
  }

  // No CATA account yet — a standalone quiz builds a lightweight profile
  // instead of gating the page behind a login wall.
  return (
    <div>
      <p className="mb-6 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
        {t.taste.haveAccount}{" "}
        <a href={href("/login")} className="font-semibold text-accent underline underline-offset-4">
          {t.taste.signInLink}
        </a>{" "}
        {t.taste.haveAccountRest}
      </p>
      <TasteQuiz />
    </div>
  );
}
