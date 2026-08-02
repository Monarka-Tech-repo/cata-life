"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsPlaces } from "@/lib/maps-loader";
import type { RestaurantEntry } from "@/lib/types";

export function RestaurantPicker({ onSelect }: { onSelect: (restaurant: RestaurantEntry) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    loadGoogleMapsPlaces()
      .then((places) => {
        if (cancelled || !inputRef.current) return;
        autocompleteRef.current = new places.Autocomplete(inputRef.current, {
          types: ["restaurant"],
          fields: ["place_id", "name", "formatted_address", "geometry", "photos"],
        });
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place?.place_id || !place.name) return;
          onSelect({
            placeId: place.place_id,
            name: place.name,
            address: place.formatted_address ?? null,
            lat: place.geometry?.location?.lat() ?? null,
            lng: place.geometry?.location?.lng() ?? null,
            photo: place.photos?.[0]?.getUrl({ maxWidth: 640 }) ?? null,
            recommendedDishes: [],
          });
          if (inputRef.current) inputRef.current.value = "";
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
    // onSelect is passed fresh each render by the caller but only referenced
    // inside a Google Maps listener set up once — intentionally omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "error") {
    return (
      <p role="alert" className="text-sm text-destructive">
        No pudimos cargar la búsqueda de restaurantes. Intenta de nuevo más tarde.
      </p>
    );
  }

  return (
    <div>
      <label htmlFor="restaurant-search" className="block text-sm font-semibold">
        Agregar restaurante
      </label>
      <input
        id="restaurant-search"
        ref={inputRef}
        type="text"
        placeholder={status === "loading" ? "Cargando búsqueda…" : "Busca un restaurante"}
        disabled={status === "loading"}
        className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
      />
    </div>
  );
}
