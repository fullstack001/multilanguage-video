import axiosInstance from "@/lib/api/axios";

export const createReplica = async (file: File, name: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  try {
    const response = await axiosInstance.post("/api/replicas", {
      body: formData,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create replica");
  }
};
