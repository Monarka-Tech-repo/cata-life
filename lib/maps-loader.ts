import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

let optionsSet = false;
let placesPromise: Promise<google.maps.PlacesLibrary> | null = null;
let corePromise: Promise<google.maps.MapsLibrary> | null = null;

function ensureOptions(): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY;
  if (!apiKey) throw new Error("Falta NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY");
  if (!optionsSet) {
    setOptions({ key: apiKey });
    optionsSet = true;
  }
  return apiKey;
}

// Must only ever be called from inside a useEffect/event handler — never at
// module scope — so it doesn't run during `next build`'s static evaluation.
export function loadGoogleMapsPlaces(): Promise<google.maps.PlacesLibrary> {
  if (!placesPromise) {
    try {
      ensureOptions();
    } catch (err) {
      return Promise.reject(err);
    }
    placesPromise = importLibrary("places");
  }
  return placesPromise;
}

// Core "maps" library — needed for a plain google.maps.Map instance (e.g. a
// decorative background map), separate from the "places" library above.
export function loadGoogleMapsCore(): Promise<google.maps.MapsLibrary> {
  if (!corePromise) {
    try {
      ensureOptions();
    } catch (err) {
      return Promise.reject(err);
    }
    corePromise = importLibrary("maps");
  }
  return corePromise;
}
