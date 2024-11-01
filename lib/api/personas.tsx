import axiosInstance from "./axios";

export const getPersonas = async (): Promise<void> => {
  const response = await axiosInstance.get("/api/persona/get-personas");
};
