import { create } from "zustand";
import { fetchNotifications } from "../lib/api/notification";

export const useNotificationStore = create((set) => ({
  notifications: [],
  fetchNotifications: async () => {
    const response = await fetchNotifications();
    set({ notifications: response });
  },
}));
