import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  streamUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl, title }) => {
  return (
    <div className="video-player">
      <h2>{title}</h2>
      <ReactPlayer
        url={streamUrl}
        controls
        playing
        width="100%"
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
