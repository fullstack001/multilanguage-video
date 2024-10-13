"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import DashboardLayout from "@/components/DashboradLayout";
import { initializeSocket, disconnectSocket } from "@/lib/socket";

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

    if (isAuthenticated) {
      const socket = initializeSocket();

      const handleVideoCreatedNotification = (event: Event) => {
        const data = (event as CustomEvent).detail;

        // Show a toast notification
        toast.success(`Your video "${data.video_name}" is ready!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };

      window.addEventListener("videoCreated", handleVideoCreatedNotification);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener(
          "videoCreated",
          handleVideoCreatedNotification,
        );
        disconnectSocket();
      };
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
      <ToastContainer />
    </>
  );
}
