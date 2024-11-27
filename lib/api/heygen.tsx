import axios from "axios";
import { Avatar } from "@/types/Avatar";
import { Photo } from "@/types/Photo";
import { Voice } from "@/types/Voice";
import { InteractiveAvatar } from "@/types/InteractiveAvatar";
import { Video } from "@/types/Video";
import { VideoDetail } from "@/types/VideoDetail";
const baseUrl = "https://api.heygen.com";

export const heygenApi = axios.create({
  baseURL: baseUrl,
  headers: { "X-Api-Key": process.env.NEXT_PUBLIC_HEYGEN_API_TOKEN },
});

export const getAvatar = async (): Promise<{
  avatars: Avatar[];
  talking_photos: Photo[];
}> => {
  const response = await heygenApi.get("/v2/avatars");
  return response.data.data;
};

export const getVoice = async (): Promise<{
  voices: Voice[];
}> => {
  const response = await heygenApi.get("/v2/voices");
  return response.data.data;
};

export const getInteractiveAvatar = async (): Promise<InteractiveAvatar> => {
  const response = await heygenApi.get("/v1/interactive_avatars");
  return response.data.data;
};

export const getAccessToken = async (): Promise<string> => {
  const response = await heygenApi.post("/v1/streaming.create_token");
  console.log(response.data);
  return response.data.data.token;
};

export const getVideoDetail = async (
  video_id: string,
): Promise<VideoDetail> => {
  const response = await heygenApi.get(
    `/v1/video_status.get?video_id=${video_id}`,
  );
  return response.data.data;
};

export const getVideoList = async (): Promise<Video[]> => {
  const response = await heygenApi.get("/v1/video.list");
  return response.data.data.videos;
};

export const getTranslateLanguage = async (): Promise<string[]> => {
  const response = await heygenApi.get("/v2/video_translate/target_languages");
  return response.data.data.languages;
};
