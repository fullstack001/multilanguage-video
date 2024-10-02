import { useState } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white px-20 py-3 shadow-md">
      <button
        className="text-purple-600 focus:outline-none lg:hidden"
        onClick={onSidebarToggle}
      >
        <FiMenu className="h-6 w-6" />
      </button>

      <div className="text-2xl font-semibold">Dashboard</div>

      <div className="flex items-center space-x-4">
        {/* Create Video Button */}
        <button className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
          Crear video
        </button>

        {/* Notification Icon */}
        <button className="relative text-purple-600 hover:text-purple-800">
          <FiBell className="h-6 w-6" />
          <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-600"></span>
        </button>

        {/* User Avatar and Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="/images/blog/author-01.png"
              alt="User avatar"
              className="h-8 w-8 rounded-full"
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
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <hr className="border-gray-200" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
