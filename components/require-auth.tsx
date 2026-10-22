"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/components/locale-provider";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isRealUser, loading } = useAuth();
  const router = useRouter();
  const { href } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isRealUser) {
      router.replace(`${href("/login")}?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isRealUser, pathname, router, href]);

  if (loading || !isRealUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  return <>{children}</>;
}
