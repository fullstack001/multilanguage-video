// lib/api/auth.ts
import axios from "axios";
import { Avatar } from "@/types/Avatar";
import { Voice } from "@/types/Voice";
import { Background } from "@/types/Background";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Signup function using Axios and the proxy to /api/signup
export const getAvatar = async (): Promise<Avatar[]> => {
  // Replace this with your actual API call
  const response = await fetch(`${API_URL}/api/video-create/get-avatars`);
  const data = await response.json();
  return data.presenters; // Assuming the API response has an avatars array
};

export const getVoice = async (): Promise<Voice[]> => {
  const response = await fetch(`${API_URL}/api/video-create/get-voices`);
  const data = await response.json();
  return data;
};


export const getBackgroundUrls = async (): Promise<Background[]> => {
  const response = await fetch(`${API_URL}/api/video-create/get-backgrounds`);
  const data = await response.json();
  console.log(data.photos);
  return data.photos;
};

export const createAudio = async (
  voice: Voice,
  content: string,
): Promise<string> => {
  const response = await axios.post(`${API_URL}/api/video-create/create-audio`, {
    voice,
    content,
  });
  return response.data.audioUrl;
};

export const createVideo = async (videoData: {}): Promise<{
  videoUrl: string;
}> => {
  const response = await axios.post(
    `${API_URL}/api/video-create/create-video`,
    videoData,
  );
  const data = await response.data;
  console.log(data.data);
  return data;
};
