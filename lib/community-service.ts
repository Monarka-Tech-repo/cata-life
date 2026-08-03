import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";
import type { RestaurantRecommendation, TasteQuizPublicEntry } from "@/lib/types";

const READ_LIMIT = 1000;

// Public, no-PII collections — read is unrestricted per firestore.rules, but
// we still cap how many docs we pull client-side to keep this cheap as the
// community grows. See lib/taste-quiz-service.ts for what writes here.
export async function fetchGlobalFlavorTags(): Promise<string[][]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "tasteQuizPublic"), limit(READ_LIMIT));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as TasteQuizPublicEntry;
    return Array.isArray(data.flavorTags) ? data.flavorTags : [];
  });
}

export async function fetchRecentRecommendations(count = 12): Promise<RestaurantRecommendation[]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "restaurantRecommendations"), orderBy("createdAt", "desc"), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    restaurantName: d.data().restaurantName ?? "",
    placeId: d.data().placeId ?? null,
    createdAt: d.data().createdAt ?? null,
  }));
}

export async function fetchAllRecommendations(): Promise<RestaurantRecommendation[]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "restaurantRecommendations"), limit(READ_LIMIT));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    restaurantName: d.data().restaurantName ?? "",
    placeId: d.data().placeId ?? null,
    createdAt: d.data().createdAt ?? null,
  }));
}

export async function submitRestaurantRecommendation(restaurantName: string, placeId: string | null) {
  const { db } = getFirebaseServices();
  await addDoc(collection(db, "restaurantRecommendations"), {
    restaurantName: restaurantName.trim(),
    placeId,
    createdAt: serverTimestamp(),
  });
}
