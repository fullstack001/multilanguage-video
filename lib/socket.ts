import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL);

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Global event listeners
    socket.on("videoCreated", handleVideoCreated);
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Global event handler
const handleVideoCreated = (data: any) => {
  console.log("Video created:", data);
  const pendingVideos: string[] = JSON.parse(
    localStorage.getItem("pendingVideos") || "[]",
  );

  if (pendingVideos.includes(data.video_id)) {
    // Remove the video ID from pending videos
    localStorage.setItem(
      "pendingVideos",
      JSON.stringify(pendingVideos.filter((id) => id !== data.video_id)),
    );

    // Show notification
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Video Created", {
            body: `Your video "${data.video_name}" is ready!`,
          });
        }
      });
    }

    // Dispatch a custom event that components can listen to
    window.dispatchEvent(new CustomEvent("videoCreated", { detail: data }));
    window.dispatchEvent(new CustomEvent("refetchData"));
  }
};
