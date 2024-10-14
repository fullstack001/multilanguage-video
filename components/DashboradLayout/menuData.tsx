import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Overview",
    path: "/dashboard",
    newTab: false,
  },
  {
    id: 2,
    title: "Video",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "My Videos",
        path: "/video/videos",
        newTab: false,
      },
      {
        id: 22,
        title: "Video Create",
        path: "/video/create",
        newTab: false,
      },
      {
        id: 23,
        title: "Video Translation",
        path: "/video/translation",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "Conversation",
    path: "/conversation",
    newTab: false,
  },
  {
    id: 4,
    title: "Analytics & Reports",
    path: "/analytics",
    newTab: false,
  },
  {
    id: 5,
    title: "Audience Segmentation",
    path: "/audience",
    newTab: false,
  },
  {
    id: 6,
    title: "Integrations",
    path: "/integrations",
    newTab: false,
  },
  {
    id: 7,
    title: "Settings",
    path: "/setting",
    newTab: false,
  },
];
export default menuData;
