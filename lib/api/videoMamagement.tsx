import axiosInstance from "./axios";

import { Video } from "@/types/Video";

export const getUserVideos = async (): Promise<Video[]> => {
  try {
    const response = await axiosInstance.get(
      "/api/video-management/get-user-videos",
    );
    console.log(response.data);
    return response.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  await axiosInstance.delete(`/api/video-management/delete-video/${videoId}`);
};
