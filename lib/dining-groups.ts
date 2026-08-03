import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirebaseServices } from "@/lib/firebase";
import { getOrCreateSessionUser } from "@/lib/anonymous-auth";

export type DiningGroupMember = {
  name: string;
  photoURL: string | null;
};

export type DiningGroupInvite = {
  id: string;
  name: string;
  restaurantName: string;
  restaurantPhoto: string | null;
  members: DiningGroupMember[];
  status: string;
  inviteOpen: boolean;
  uid: string;
  alreadyJoined: boolean;
};

type DiningGroupDocument = {
  name?: unknown;
  restaurantName?: unknown;
  restaurantPhoto?: unknown;
  memberIds?: unknown;
  memberInfo?: unknown;
  status?: unknown;
  inviteOpen?: unknown;
};

export class DiningGroupError extends Error {
  constructor(public readonly reason: "unavailable" | "closed" | "connection") {
    super(reason);
    this.name = "DiningGroupError";
  }
}

function textValue(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function photoValue(value: unknown) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function parseMembers(value: unknown): DiningGroupMember[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];

  return Object.values(value).flatMap((member) => {
    if (!member || typeof member !== "object" || Array.isArray(member)) return [];
    const data = member as Record<string, unknown>;
    return [{ name: textValue(data.name, "Invitado"), photoURL: photoValue(data.photoURL) }];
  });
}

export async function loadDiningGroup(tableId: string): Promise<DiningGroupInvite> {
  try {
    const { db } = getFirebaseServices();
    const user = await getOrCreateSessionUser();
    const snapshot = await getDoc(doc(db, "diningGroups", tableId));

    if (!snapshot.exists()) throw new DiningGroupError("unavailable");

    const data = snapshot.data() as DiningGroupDocument;
    const memberIds = Array.isArray(data.memberIds)
      ? data.memberIds.filter((id): id is string => typeof id === "string")
      : [];

    return {
      id: tableId,
      name: textValue(data.name, "Mesa de CATA"),
      restaurantName: textValue(data.restaurantName, "Restaurante por confirmar"),
      restaurantPhoto: photoValue(data.restaurantPhoto),
      members: parseMembers(data.memberInfo),
      status: textValue(data.status, ""),
      inviteOpen: data.inviteOpen === true,
      uid: user.uid,
      alreadyJoined: memberIds.includes(user.uid),
    };
  } catch (error) {
    if (error instanceof DiningGroupError) throw error;

    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "permission-denied" || code === "not-found") {
      throw new DiningGroupError("unavailable");
    }
    throw new DiningGroupError("connection");
  }
}

export async function joinDiningGroup(tableId: string, uid: string, displayName: string) {
  const name = displayName.trim();
  if (!name || name.length > 60) throw new DiningGroupError("unavailable");

  try {
    const { db } = getFirebaseServices();
    await updateDoc(doc(db, "diningGroups", tableId), {
      memberIds: arrayUnion(uid),
      [`memberInfo.${uid}`]: { name, photoURL: null },
    });
  } catch {
    throw new DiningGroupError("closed");
  }
}
