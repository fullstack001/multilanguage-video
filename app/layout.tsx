"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "node_modules/react-modal-video/css/modal-video.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DashboardLayout from "@/components/DashboradLayout"; // Import the Dashboard layout
import ScrollToTop from "@/components/ScrollToTop";
import { useUserStore } from "@/store/userStore"; // Import Zustand store to check authentication
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth, logout } = useUserStore(); // Zustand store for authentication
  const router = useRouter(); // Next.js router for navigation

  // Check the user's authentication status when the layout is rendered
  useEffect(() => {
    checkAuth(); // Check if the user is authenticated

    if (!isAuthenticated) {
      // If the token is not authenticated (expired), redirect to the homepage
      router.push("/");
      logout(); // Optionally, log out the user and clear the token
    }
  }, [checkAuth, isAuthenticated, router, logout]);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          {isAuthenticated ? (
            <DashboardLayout>{children}</DashboardLayout> // Render DashboardLayout when authenticated
          ) : (
            <>
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
