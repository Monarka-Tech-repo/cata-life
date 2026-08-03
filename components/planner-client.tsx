"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { JourneyCreateForm } from "@/components/journey-create-form";
import { JourneyDetail } from "@/components/journey-detail";
import { JourneyList } from "@/components/journey-list";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";
import { fetchJourneyById, fetchUserJourneys } from "@/lib/journeys-service";
import type { FoodJourneyList } from "@/lib/types";

type View =
  | { name: "loading" }
  | { name: "error" }
  | { name: "list"; journeys: FoodJourneyList[] }
  | { name: "create"; journeys: FoodJourneyList[] }
  | { name: "detail"; journey: FoodJourneyList; journeys: FoodJourneyList[] };

export function PlannerClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>({ name: "loading" });

  // No login wall — anyone gets a session (their own real account if
  // already signed in, otherwise a silent anonymous one, same trick /join-table uses).
  useEffect(() => {
    let cancelled = false;
    void getOrCreateSessionUser()
      .then(async (sessionUser) => {
        if (cancelled) return;
        setUser(sessionUser);
        const tripId = new URLSearchParams(window.location.search).get("trip");
        const journeys = await fetchUserJourneys(sessionUser.uid);
        if (cancelled) return;
        if (tripId) {
          const journey = journeys.find((j) => j.id === tripId) ?? (await fetchJourneyById(tripId));
          if (!cancelled) {
            if (journey) setView({ name: "detail", journey, journeys });
            else setView({ name: "list", journeys });
          }
          return;
        }
        setView({ name: "list", journeys });
      })
      .catch(() => {
        if (!cancelled) setView({ name: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function openJourney(journey: FoodJourneyList, journeys: FoodJourneyList[]) {
    router.push(`/planner?trip=${journey.id}`);
    setView({ name: "detail", journey, journeys });
  }

  if (view.name === "error") {
    return (
      <div role="alert" className="rounded-2xl bg-destructive/10 p-6 text-center text-sm text-destructive">
        No pudimos cargar tus viajes. Intenta de nuevo más tarde.
        <br />
        Si el problema persiste, escríbenos a{" "}
        <a href="mailto:cata.support@monarka.tech" className="underline underline-offset-4">
          cata.support@monarka.tech
        </a>
        .
      </div>
    );
  }

  if (view.name === "loading" || !user) {
    return (
      <div className="flex justify-center py-16" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  if (view.name === "create") {
    return (
      <JourneyCreateForm
        user={user}
        onCancel={() => {
          router.push("/planner");
          setView({ name: "list", journeys: view.journeys });
        }}
        onCreated={(id) => {
          void fetchJourneyById(id).then((journey) => {
            if (journey) openJourney(journey, [journey, ...view.journeys]);
          });
        }}
      />
    );
  }

  if (view.name === "detail") {
    return (
      <JourneyDetail
        journey={view.journey}
        onBack={() => {
          router.push("/planner");
          setView({ name: "list", journeys: view.journeys });
        }}
        onUpdated={(journey) => setView({ name: "detail", journey, journeys: view.journeys })}
      />
    );
  }

  return (
    <JourneyList
      journeys={view.journeys}
      onOpen={(id) => {
        const journey = view.journeys.find((j) => j.id === id);
        if (journey) openJourney(journey, view.journeys);
      }}
      onNew={() => setView({ name: "create", journeys: view.journeys })}
    />
  );
}
