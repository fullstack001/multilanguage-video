"use client";

import { useRouter } from "next/navigation"; // Changed from next/router
import { useState, useEffect } from "react";
import { checkAuth } from "@/services/auth"; // Adjusted import path

export function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authResult = checkAuth();
    setIsAuthenticated(authResult);
    if (!authResult) {
      router.push("/");
    }
  }, [router]);

  return isAuthenticated;
}
