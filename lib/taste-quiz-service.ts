import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";

// tasteQuizResponses (private, has email) feeds the future personalized
// recommendations dataset. tasteQuizPublic (no PII) and
// restaurantRecommendations (no PII) are redacted copies that power
// cata.life's public /comunidad aggregate stats — see firestore.rules in
// the CATA_App repo for the matching security rules.
export async function saveTasteQuizResponse(params: {
  favoriteRestaurants: { placeId: string; name: string }[];
  flavorTags: string[];
  email: string | null;
}) {
  const { db } = getFirebaseServices();
  const col = collection(db, "tasteQuizResponses");
  await addDoc(col, {
    favoriteRestaurants: params.favoriteRestaurants,
    flavorTags: params.flavorTags,
    email: params.email,
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, "tasteQuizPublic"), {
    flavorTags: params.flavorTags,
    createdAt: serverTimestamp(),
  }).catch(() => {});

  await Promise.all(
    params.favoriteRestaurants.map((r) =>
      addDoc(collection(db, "restaurantRecommendations"), {
        restaurantName: r.name,
        placeId: r.placeId,
        createdAt: serverTimestamp(),
      }).catch(() => {}),
    ),
  );
}
