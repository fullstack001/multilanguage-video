import axiosInstance from "./axios";
import { Conversation } from "@/types/Conversation";

export const createConversation = async (
  persona_id: string,
  replica_id: string,
  conversation_name: string,
  conversation_context: string,
): Promise<Conversation> => {
  try {
    const response = await axiosInstance.post("/api/conversation/create", {
      persona_id,
      replica_id,
      conversation_name,
      conversation_context,
    });
    return response.data.resultData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await axiosInstance.get("/api/conversation/");
    return response.data.conversationData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteConversation = async (
  conversation_id: string,
): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/api/conversation/${conversation_id}`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
