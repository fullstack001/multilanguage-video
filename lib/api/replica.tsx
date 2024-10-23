import axiosInstance from "./axios";

export async function createReplica(file: File, name: string): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    const response = await axiosInstance.post(
      "/api/replica/create-replica",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to create replica");
    }

    // Handle successful creation
    console.log("Replica created successfully");
  } catch (error) {
    console.error("Error creating replica:", error);
    throw error;
  }
}
