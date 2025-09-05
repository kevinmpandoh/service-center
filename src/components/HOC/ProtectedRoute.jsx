"use client";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();

  const isRoleAllowed = useMemo(() => {
    if (!user) return false;
    if (allowedRoles.length === 0) return true;
    return allowedRoles.includes(user.role);
  }, [allowedRoles, user]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isRoleAllowed) {
      router.replace("/403");
    }
  }, [isHydrated, isAuthenticated, isRoleAllowed, router]);

  if (!isHydrated) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated || !isRoleAllowed) {
    // 🚫 Jangan render halaman dulu, block pakai spinner
    return <LoadingSpinner fullScreen />;
  }

  return children;
}
