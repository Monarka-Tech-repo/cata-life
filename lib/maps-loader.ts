import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

let optionsSet = false;
let placesPromise: Promise<google.maps.PlacesLibrary> | null = null;

// Must only ever be called from inside a useEffect/event handler — never at
// module scope — so it doesn't run during `next build`'s static evaluation.
export function loadGoogleMapsPlaces(): Promise<google.maps.PlacesLibrary> {
  if (!placesPromise) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY;
    if (!apiKey) {
      return Promise.reject(new Error("Falta NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY"));
    }
    if (!optionsSet) {
      setOptions({ key: apiKey });
      optionsSet = true;
    }
    placesPromise = importLibrary("places");
  }
  return placesPromise;
}
