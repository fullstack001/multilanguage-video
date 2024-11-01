import { usePathname } from "next/navigation";

const useCurrentLocale = () => {
  const pathname = usePathname();

  // Extract the locale from the pathname
  const locale = pathname.split("/")[1]; // Assumes the locale is the first segment

  return locale;
};

export default useCurrentLocale;
