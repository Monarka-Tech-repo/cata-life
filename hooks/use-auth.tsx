"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseServices } from "@/lib/firebase";
import { ensureUserDoc } from "@/lib/ensure-user-doc";

type AuthState = {
  user: User | null;
  /** True only for a real (non-anonymous) signed-in user — join-table guests use anonymous auth and don't count. */
  isRealUser: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ user: null, isRealUser: false, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isRealUser: false, loading: true });

  useEffect(() => {
    const { auth } = getFirebaseServices();
    const unsub = onAuthStateChanged(auth, (user) => {
      setState({ user, isRealUser: !!user && !user.isAnonymous, loading: false });
      if (user && !user.isAnonymous) {
        ensureUserDoc(user).catch(() => {});
      }
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
