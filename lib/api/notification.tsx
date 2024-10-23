import axiosInstance from "./axios";
import { Notification } from "@/types/notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get(
    "/api/notification/get-notifications",
  );
  return response.data;
};
