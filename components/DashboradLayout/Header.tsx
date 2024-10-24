import { useState, useEffect, useRef } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import Link from "next/link"; // Change this import
import Image from "next/image";
import { useNotificationStore } from "@/store/notificationStore";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { notifications } = useNotificationStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex items-center justify-between bg-white px-20 py-3 shadow-md">
      <button
        className="text-purple-600 focus:outline-none lg:hidden"
        onClick={onSidebarToggle}
      >
        <FiMenu className="h-6 w-6" />
      </button>

      <div className="text-2xl font-semibold"></div>

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative text-purple-600 hover:text-purple-800">
          <FiBell className="h-6 w-6" />
          {notifications.length > 0 && (
            <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-600"></span>
          )}
        </button>

        {/* User Avatar and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Image
              src="/images/blog/author-01.png"
              alt="User avatar"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-bold">Oscar Acosta</p>
                <p>oscar@example.com</p>
              </div>
              <hr className="border-gray-200" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleItemClick}
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleItemClick}
              >
                Settings
              </a>
              <hr className="border-gray-200" />
              <Link
                href="/"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleItemClick}
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
