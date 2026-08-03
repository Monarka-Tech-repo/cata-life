import { collection, getDocs, limit, orderBy, query, where, type DocumentData, type QueryDocumentSnapshot } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";
import type { Dish } from "@/lib/types";

function mapDishDoc(d: QueryDocumentSnapshot<DocumentData>): Dish {
  const data = d.data();
  return {
    id: d.id,
    userId: data.userId ?? "",
    name: data.name ?? "",
    city: data.city || null,
    category: data.category ?? null,
    restaurantCuisine: data.restaurantCuisine || null,
    restaurantName: data.restaurantName ?? null,
    rating: typeof data.rating === "number" ? data.rating : 0,
    notes: data.notes ?? "",
    photoURL: data.photoURL ?? null,
    foodGroupTags: Array.isArray(data.foodGroupTags) ? data.foodGroupTags : [],
    flavorTags: Array.isArray(data.flavorTags) ? data.flavorTags : [],
    aromaTags: Array.isArray(data.aromaTags) ? data.aromaTags : [],
    textureTags: Array.isArray(data.textureTags) ? data.textureTags : [],
    tempTags: Array.isArray(data.tempTags) ? data.tempTags : [],
    createdAt: data.createdAt ?? null,
  };
}

// No orderBy — avoids requiring a new Firestore composite index (dishes only
// has userId+createdAt today). Sort/aggregate client-side instead.
export async function fetchUserDishes(uid: string): Promise<Dish[]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "dishes"), where("userId", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map(mapDishDoc);
}

// A capped, recent sample of dishes across ALL users worldwide — powers the
// /comunidad "taste around the world" explorer. Deliberately a sample, not
// an exhaustive read of every dish ever logged (that wouldn't scale) — the
// UI is honest about this being based on recent activity, not a full census.
// Already-existing firestore.rules (`allow read: if signedIn()` on `dishes`)
// permit any signed-in session — including anonymous — to read this today;
// no new rule needed.
export async function fetchGlobalDishSample(sampleSize = 500): Promise<Dish[]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"), limit(sampleSize));
  const snap = await getDocs(q);
  return snap.docs.map(mapDishDoc);
}
