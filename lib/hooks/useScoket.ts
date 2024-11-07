import { useEffect, useState } from "react";
import { initializeSocket, getSocket } from "../socket";

const useSocket = (key: string) => {
  const [data, setData] = useState<any>(null);
  const socket = initializeSocket();

  useEffect(() => {
    const currentSocket = getSocket();

    currentSocket.on(key, (newData) => {
      console.log(newData);
      setData(newData);
    });

    return () => {
      currentSocket.disconnect();
    };
  }, [key]);

  return data;
};

export default useSocket;
