import { Menu } from "@/types/menu";
import { useTranslations } from "next-intl";

const getLocalizedPath = (path: string, locale: string) => {
  return `/${locale}${path}`;
};

const useMenuData = () => {
  const t = useTranslations();

  const menuData: Menu[] = [
    {
      id: 1,
      title: t("Menu.home"),
      path: getLocalizedPath("/", "en"),
      newTab: false,
    },
    {
      id: 2,
      title: t("Menu.about"),
      path: getLocalizedPath("/about", "en"),
      newTab: false,
    },
    {
      id: 33,
      title: t("Menu.blog"),
      path: getLocalizedPath("/blog", "en"),
      newTab: false,
    },
    {
      id: 3,
      title: t("Menu.support"),
      path: getLocalizedPath("/contact", "en"),
      newTab: false,
    },
  ];

  return menuData;
};

export default useMenuData;
