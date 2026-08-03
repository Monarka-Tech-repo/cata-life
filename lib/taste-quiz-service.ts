import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";

// Write-only, feeds the future "global taste profile" used for personalized
// food journey recommendations — not read back client-side today. See
// firestore.rules in the CATA_App repo for the matching security rule.
export async function saveTasteQuizResponse(params: {
  favoriteRestaurants: { placeId: string; name: string }[];
  flavorTags: string[];
  email: string | null;
}) {
  const { db } = getFirebaseServices();
  await addDoc(collection(db, "tasteQuizResponses"), {
    favoriteRestaurants: params.favoriteRestaurants,
    flavorTags: params.flavorTags,
    email: params.email,
    createdAt: serverTimestamp(),
  });
}
