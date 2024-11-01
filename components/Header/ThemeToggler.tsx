import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex items-center">
      <button
        aria-label="theme toggler"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black dark:text-white md:h-14 md:w-14"
      >
        <FaSun className="h-5 w-5 dark:hidden md:h-6 md:w-6" />
        <FaMoon className="hidden h-5 w-5 dark:block md:h-6 md:w-6" />
      </button>
    </div>
  );
};

export default ThemeToggler;
