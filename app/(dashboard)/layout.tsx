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
    } else if (isAuthenticated) {
      const socket = initializeSocket();

      // Listen for the custom videoCreated event
      window.addEventListener("videoCreated", handleVideoCreatedNotification);

      // Clean up event listeners and socket on unmount
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
    return <div>Loading...</div>; // Loading state while auth is being checked
  }

  // Event handler for video created notification
  const handleVideoCreatedNotification = (event: Event) => {
    const data = (event as CustomEvent).detail;
    console.log("Video created event received:", data);

    toast.success(`Your video "${data.video_name}" is ready!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>

      <ToastContainer />
    </>
  );
}
