import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";
import type { WebLead } from "@/lib/types";

// Write-only collection — anonymous or real sessions can create a lead, no
// one reads it back client-side. See firestore.rules in the CATA_App repo
// for the matching security rule (must be added there before this works).
export async function saveLead(email: string, source: WebLead["source"]) {
  const { db } = getFirebaseServices();
  await addDoc(collection(db, "webLeads"), {
    email: email.trim(),
    source,
    createdAt: serverTimestamp(),
  });
}
