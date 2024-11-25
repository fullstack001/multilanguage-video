import axios from "axios";
import { Avatar } from "@/types/Avatar";
import { Photo } from "@/types/Photo";
import { Voice } from "@/types/Voice";
import { InteractiveAvatar } from "@/types/InteractiveAvatar";
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
