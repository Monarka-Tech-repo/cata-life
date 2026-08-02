import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";
import type { Dish } from "@/lib/types";

// No orderBy — avoids requiring a new Firestore composite index (dishes only
// has userId+createdAt today). Sort/aggregate client-side instead.
export async function fetchUserDishes(uid: string): Promise<Dish[]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "dishes"), where("userId", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId: data.userId ?? "",
      name: data.name ?? "",
      category: data.category ?? null,
      restaurantCuisine: data.restaurantCuisine ?? null,
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
  });
}
