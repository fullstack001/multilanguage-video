import axios from "axios";
import axiosInstance from "./axios";
import { Persona } from "@/types/Persona";

export const createPersona = async (
  model: string,
  personalRole: string,
  systemPrompt: string,
  conversationalContext: string,
  replica_id: string,
): Promise<void> => {
  try {
    const response = await axiosInstance.post("/api/persona/create-persona", {
      model,
      personalRole,
      systemPrompt,
      conversationalContext,
      replica_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPersonas = async (): Promise<Persona[]> => {
  try {
    const response = await axiosInstance.get("/api/persona/get-personas");
    return response.data.matchedPersonas;
  } catch (error) {
    console.error(error);
  }
};
