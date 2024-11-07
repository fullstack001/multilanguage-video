"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import DashboardLayout from "@/components/DashboradLayout";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthCheck();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading state while auth is being checked
  }

  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>

      <ToastContainer />
    </>
  );
}
