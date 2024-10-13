import axiosInstance from "./axios";

export const fetchNotifications = async () => {
  const response = await axiosInstance.get(
    "/api/notification/get-notifications",
  );
  return response.data;
};
