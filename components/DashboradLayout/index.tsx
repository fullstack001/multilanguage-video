"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "./Header";
import menuData from "./menuData";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isMounted) return null;

  const toggleSubmenu = (id: number) => {
    setOpenSubmenuId(openSubmenuId === id ? null : id);
  };

  const handleItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-20 w-64 bg-purple-700 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center">
          <h2 className="text-2xl font-bold">Making AI Personal</h2>
        </div>
        <nav className="mt-4 flex-1 space-y-2 px-4">
          {menuData.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <div
                  onClick={() => toggleSubmenu(item.id)}
                  className={`block cursor-pointer rounded px-4 py-2.5 transition duration-200 hover:bg-purple-600 ${
                    pathname.startsWith(item.path) ? "bg-purple-600" : ""
                  }`}
                >
                  {item.title}
                </div>
              ) : (
                <Link href={item.path} onClick={handleItemClick}>
                  <div
                    className={`block cursor-pointer rounded px-4 py-2.5 transition duration-200 hover:bg-purple-600 ${
                      pathname === item.path ? "bg-purple-600" : ""
                    }`}
                  >
                    {item.title}
                  </div>
                </Link>
              )}
              {item.submenu && openSubmenuId === item.id && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.submenu.map((subItem) => (
                    <Link
                      href={subItem.path}
                      key={subItem.id}
                      onClick={handleItemClick}
                    >
                      <div
                        className={`block rounded px-4 py-2 transition duration-200 hover:bg-purple-600 ${
                          pathname === subItem.path ? "bg-purple-600" : ""
                        }`}
                      >
                        {subItem.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
