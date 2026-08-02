import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";
import type { FoodJourneyList, RestaurantEntry } from "@/lib/types";

function toJourney(id: string, data: Record<string, unknown>): FoodJourneyList {
  return {
    id,
    userId: (data.userId as string) ?? "",
    userName: (data.userName as string) ?? null,
    userPhoto: (data.userPhoto as string) ?? null,
    title: (data.title as string) ?? "",
    city: (data.city as string) ?? "",
    lat: typeof data.lat === "number" ? data.lat : null,
    lng: typeof data.lng === "number" ? data.lng : null,
    restaurants: Array.isArray(data.restaurants) ? (data.restaurants as RestaurantEntry[]) : [],
    memberIds: Array.isArray(data.memberIds) ? (data.memberIds as string[]) : [],
    members: Array.isArray(data.members) ? data.members : [],
    public: data.public === true,
    createdAt: data.createdAt ?? null,
  };
}

// No orderBy — avoids requiring a new Firestore composite index. Sort client-side.
export async function fetchUserJourneys(uid: string): Promise<FoodJourneyList[]> {
  const { db } = getFirebaseServices();
  const q = query(collection(db, "foodJourneyLists"), where("userId", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toJourney(d.id, d.data()));
}

export async function fetchJourneyById(id: string): Promise<FoodJourneyList | null> {
  const { db } = getFirebaseServices();
  const snap = await getDoc(doc(db, "foodJourneyLists", id));
  if (!snap.exists()) return null;
  return toJourney(snap.id, snap.data());
}

// Mirrors the exact field set d:\CATA\CATA_App\src\screens\CreateFoodJourneyScreen.js
// writes, so a trip created on web is fully readable by the mobile app.
export async function createJourney(params: {
  uid: string;
  userName: string | null;
  userPhoto: string | null;
  title: string;
  city: string;
  lat: number | null;
  lng: number | null;
  restaurants: RestaurantEntry[];
}): Promise<string> {
  const { db } = getFirebaseServices();
  const ref = await addDoc(collection(db, "foodJourneyLists"), {
    userId: params.uid,
    userName: params.userName || "CATA User",
    userPhoto: params.userPhoto,
    title: params.title.trim(),
    city: params.city.trim(),
    lat: params.lat,
    lng: params.lng,
    restaurants: params.restaurants,
    memberIds: [],
    members: [],
    public: true,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// Owner-only per firestore.rules (unconditional update rights for userId == auth.uid).
export async function addRestaurantToJourney(journeyId: string, restaurant: RestaurantEntry) {
  const { db } = getFirebaseServices();
  await updateDoc(doc(db, "foodJourneyLists", journeyId), {
    restaurants: arrayUnion(restaurant),
  });
}
