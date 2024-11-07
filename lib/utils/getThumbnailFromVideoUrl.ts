// Function to get the first screen's image from a video URL
export const getThumbnailFromVideoUrl = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous"; // Handle CORS if needed

    video.addEventListener("loadeddata", () => {
      // Set the time to capture the thumbnail (e.g., at 1 second)
      video.currentTime = 1; // Adjust this time as needed
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      // Set canvas dimensions to match the video's dimensions
      canvas.width = video.videoWidth; // Use video's width
      canvas.height = video.videoHeight; // Use video's height
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL("image/jpeg"); // Get the image data URL
        resolve(thumbnailUrl);
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    });

    video.addEventListener("error", (err) => {
      reject(err);
    });

    video.load(); // Load the video
  });
};
