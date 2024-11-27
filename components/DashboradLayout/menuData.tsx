import { Menu } from "@/types/menu";
import useCurrentLocale from "@/lib/hooks/useCurrentLocales";
const useMenuData = () => {
  const locale = useCurrentLocale();
  const menuData: Menu[] = [
    {
      id: 1,
      title: "Overview",
      path: `/${locale}/dashboard/overview`,
      newTab: false,
    },
    {
      id: 2,
      title: "Video",
      newTab: false,
      submenu: [
        {
          id: 21,
          title: "Video Create",
          path: `/${locale}/dashboard/video/create`,
          newTab: false,
        },
        {
          id: 22,
          title: "My Videos",
          path: `/${locale}/dashboard/video/videos`,
          newTab: false,
        },
        {
          id: 23,
          title: "Video Translation",
          path: `/${locale}/dashboard/video/translation`,
          newTab: false,
        },
      ],
    },
    {
      id: 3,
      title: "Conversation",
      newTab: false,
      path: `/${locale}/dashboard/conversation`,
    },
    {
      id: 4,
      title: "Analytics & Reports",
      path: `/${locale}/dashboard/analytics`,
      newTab: false,
    },
    {
      id: 5,
      title: "Audience Segmentation",
      path: `/${locale}/dashboard/audience`,
      newTab: false,
    },
    {
      id: 6,
      title: "Integrations",
      path: `/${locale}/dashboard/integrations`,
      newTab: false,
    },
    {
      id: 7,
      title: "Settings",
      path: `/${locale}/dashboard/setting`,
      newTab: false,
    },
  ];
  return menuData;
};
export default useMenuData;
