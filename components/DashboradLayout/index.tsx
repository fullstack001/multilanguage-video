"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "./Header";
import menuData from "./menuData";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const usePathName = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-20 w-64 bg-purple-700 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center">
          <h2 className="text-2xl font-bold">Making AI Personal</h2>
        </div>
        <nav className="mt-4 flex-1 space-y-2 px-4">
          {menuData.map((item) => (
            <Link href={item.path} key={item.id}>
              <div
                className={`block rounded px-4 py-2.5 transition duration-200 hover:bg-purple-600 ${
                  usePathName === item.path ? "bg-purple-600" : ""
                }`}
              >
                {item.title}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 px-12">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
