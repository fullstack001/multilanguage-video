import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { FaGlobe } from "react-icons/fa";
// Import flag icons
import { FlagIcon, FlagIconCode } from "react-flag-kit"; // Example import, adjust based on your flag icon library

const LanguageSelector = () => {
  const [isLanguagePanelOpen, setLanguagePanelOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const toggleLanguagePanel = () => {
    setLanguagePanelOpen(!isLanguagePanelOpen);
  };

  const flags = [
    { code: "US", locale: "en", name: "English" }, // UK flag for English
    { code: "ES", locale: "es", name: "Spanish" }, // Spain flag for Spanish
    { code: "FR", locale: "fr", name: "French" }, // France flag for French
    { code: "DE", locale: "de", name: "German" }, // Germany flag for German
    { code: "CN", locale: "zh", name: "Chinese" }, // China flag for Simplified Chinese
    { code: "JP", locale: "ja", name: "Japanese" }, // Japan flag for Japanese
    { code: "UA", locale: "uk", name: "Ukrainian" }, // Russia flag for Russian
    { code: "SA", locale: "ar", name: "Arabic" }, // Saudi Arabia flag for Arabic
    { code: "BR", locale: "pt", name: "Portuguese" }, // Brazil flag for Portuguese
    { code: "IT", locale: "it", name: "Italian" }, // Italy flag for Italian
  ];

  const changeLanguage = (newLocale) => {
    // Change the path based on the new locale
    const currentPath = window.location.pathname; // Get the current path
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`); // Replace the locale in the path
    router.push(newPath); // Navigate to the new path using Next.js navigation
    console.log(`Locale changed to: ${newLocale}`); // Placeholder for actual locale change
  };

  return (
    <div className="relative">
      <button
        aria-label="language selector"
        onClick={toggleLanguagePanel}
        className="flex items-center text-dark dark:text-white"
      >
        <FaGlobe className="h-5 w-5" />
      </button>

      {isLanguagePanelOpen && (
        <div className="absolute -right-16 mt-2 w-80 rounded bg-white shadow-lg dark:bg-gray-800">
          <ul className="grid grid-cols-2 gap-2">
            {flags.map((flag) => (
              <li
                key={flag.locale}
                className="flex cursor-pointer  p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => changeLanguage(flag.locale)}
              >
                <FlagIcon
                  code={flag.code as FlagIconCode}
                  size={20}
                  className="mr-2 inline-block"
                />
                {flag.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
