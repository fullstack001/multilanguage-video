import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VideoThumbnailProps {
  streamUrl: string;
  title: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  streamUrl,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  let hls: Hls | null = null;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      video.muted = true;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video
            .play()
            .catch((error) => console.error("Playback error:", error));
        });

        hls.on(Hls.Events.FRAG_PARSED, () => {
          video.currentTime = 1; // Seek to 1 second after fragments load
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamUrl;
      }

      video.addEventListener("seeked", () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnailUrl(canvas.toDataURL("image/png"));
          video.pause(); // Stop the video after thumbnail is captured
        }
      });

      return () => {
        if (Hls.isSupported() && hls) hls.destroy();
      };
    }
  }, [streamUrl]);

  return (
    <div className="relative aspect-video w-full">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
