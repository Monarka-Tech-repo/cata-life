import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirebaseServices } from "@/lib/firebase";

export async function signUpWithEmail(displayName: string, email: string, password: string) {
  const { auth } = getFirebaseServices();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName.trim()) {
    await updateProfile(credential.user, { displayName: displayName.trim() });
  }
  return credential.user;
}

export async function signInWithEmail(email: string, password: string) {
  const { auth } = getFirebaseServices();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signInWithGoogle() {
  const { auth } = getFirebaseServices();
  const credential = await signInWithPopup(auth, new GoogleAuthProvider());
  return credential.user;
}

export async function resetPassword(email: string) {
  const { auth } = getFirebaseServices();
  await sendPasswordResetEmail(auth, email);
}

export async function signOutUser() {
  const { auth } = getFirebaseServices();
  await signOut(auth);
}
