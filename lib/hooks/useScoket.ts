import { useEffect } from "react";
import { initializeSocket, getSocket, disconnectSocket } from "../socket";

export const useSocket = () => {
  useEffect(() => {
    initializeSocket();
  }, []);

  return getSocket();
};
