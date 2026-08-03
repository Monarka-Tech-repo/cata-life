import { signInAnonymously, type User } from "firebase/auth";
import { getFirebaseServices } from "@/lib/firebase";

// Shared by any web-only tool that shouldn't require a real account
// (join-table guests, Travel Planner, the taste quiz) — reuses whatever
// session already exists (anonymous or real) instead of forcing a new one.
export async function getOrCreateSessionUser(): Promise<User> {
  const { auth } = getFirebaseServices();
  if (auth.currentUser) return auth.currentUser;
  const credential = await signInAnonymously(auth);
  return credential.user;
}
