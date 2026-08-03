"use client";

import { useEffect, useRef } from "react";
import { loadGoogleMapsCore } from "@/lib/maps-loader";

// Purely decorative, non-interactive world map used as a background behind
// the community search bar — no markers, no controls, nothing clickable.
export function WorldMapBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    if (!containerRef.current) return;
    void loadGoogleMapsCore()
      .then((maps) => {
        if (cancelled || !containerRef.current) return;
        new maps.Map(containerRef.current, {
          center: { lat: 20, lng: 10 },
          zoom: 2,
          disableDefaultUI: true,
          gestureHandling: "none",
          keyboardShortcuts: false,
          clickableIcons: false,
          draggable: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#e8e0d6" }] },
            { elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#f0ebe3" }] },
            { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
            { featureType: "road", stylers: [{ visibility: "off" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
          ],
        });
      })
      .catch(() => {
        // Decorative only — if the map fails to load, the section behind it
        // still works fine without a background.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0" />;
}
