import axiosInstance from "./axios";

import { Video } from "@/types/Video";

export const getUserVideos = async (): Promise<
  { _id: string; user: string; video_id: string }[]
> => {
  try {
    const response = await axiosInstance.get(
      "/api/video-management/get-user-videos",
    );
    return response.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const getUserTranslates = async (): Promise<
  { _id: string; user: string; video_translate_id: string }[]
> => {
  try {
    const response = await axiosInstance.get(
      "/api/video-management/get-user-translates",
    );
    return response.data.translates;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  await axiosInstance.delete(`/api/video-management/delete-video/${videoId}`);
};
