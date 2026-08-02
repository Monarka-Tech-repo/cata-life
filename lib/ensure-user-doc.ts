import type { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";

// Ported from d:\CATA\CATA_App\App.js's onAuthStateChanged handler (~lines 139-183)
// so a web sign-in creates/syncs the exact same users/{uid} shape the mobile
// app reads and writes. Never touches the protected fields firestore.rules
// blocks clients from setting (isPro, proType, streaks, totalDishesLogged,
// lastLoggedDate).
export async function ensureUserDoc(user: User) {
  if (user.isAnonymous) return;

  const { db } = getFirebaseServices();
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const current = snap.data();
    const authProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || current.displayName || "CATA User",
      photoURL: user.photoURL || current.photoURL || null,
    };
    const changed =
      authProfile.email !== (current.email || "") ||
      authProfile.displayName !== (current.displayName || "") ||
      authProfile.photoURL !== (current.photoURL || null);
    if (changed) {
      await setDoc(userRef, { ...authProfile, updatedAt: serverTimestamp() }, { merge: true });
    }
    return;
  }

  // No web setup-profile flow exists (unlike the app's SetupProfileScreen),
  // so a web-created account starts out already "complete".
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "CATA User",
    photoURL: user.photoURL || null,
    bio: "",
    dishCount: 0,
    followersCount: 0,
    followingCount: 0,
    tier: "free",
    setupComplete: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
