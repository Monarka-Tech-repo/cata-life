import { loadGoogleMapsPlaces } from "@/lib/maps-loader";

export type PlaceRating = {
  rating: number | null;
  userRatingCount: number | null;
  googleMapsURI: string | null;
};

// Enriches the community's "most recommended restaurants" list with real
// Google ratings. Uses the same Maps JavaScript API key as restaurant
// search/autocomplete — no separate key or backend needed.
export async function fetchPlaceRatings(placeIds: string[]): Promise<Map<string, PlaceRating>> {
  const result = new Map<string, PlaceRating>();
  if (placeIds.length === 0) return result;

  const places = await loadGoogleMapsPlaces();
  await Promise.all(
    placeIds.map(async (placeId) => {
      try {
        const place = new places.Place({ id: placeId });
        await place.fetchFields({ fields: ["rating", "userRatingCount", "googleMapsURI"] });
        result.set(placeId, {
          rating: place.rating ?? null,
          userRatingCount: place.userRatingCount ?? null,
          googleMapsURI: place.googleMapsURI ?? null,
        });
      } catch {
        // Skip restaurants we can't fetch ratings for — the list still
        // renders with just the community recommendation count.
      }
    }),
  );
  return result;
}
