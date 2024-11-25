import axiosInstance from "./axios";
import { VideoStatus } from "@/types/VideoStatus";
// Import the signOut function from your authentication library
import { logout } from "@/lib/api/auth"; // Adjust the import path as needed

const handleApiError = (error: any) => {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized access, signing out...");
    logout();
  } else {
    console.error("API error:", error.message || "Unknown error occurred");
  }
  throw error;
};

export const getBackgroundUrls = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get(
      "/api/video-create/get-backgrounds",
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const translateContent = async ({
  text,
  targetLanguage,
}: {
  text: string;
  targetLanguage: string;
}): Promise<string> => {
  try {
    const response = await axiosInstance.post("/api/video-create/translate", {
      text,
      targetLanguage,
    });
    return response.data.translatedText;
  } catch (error) {
    handleApiError(error);
  }
};

export const createVideo = async (videoData: {}): Promise<{
  video_id: string;
}> => {
  try {
    const response = await axiosInstance.post(
      "/api/video-create/create-video",
      videoData,
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const translateVideo = async (id: string, targetLanguage: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/video-create/translate-video",
      { id, targetLanguage },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
