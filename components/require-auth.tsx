"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isRealUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isRealUser) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isRealUser, pathname, router]);

  if (loading || !isRealUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  return <>{children}</>;
}
