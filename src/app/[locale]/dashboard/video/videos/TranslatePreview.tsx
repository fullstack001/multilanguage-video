import { useEffect, useState } from "react";
import Image from "next/image";

import { VideoDetail } from "@/types/VideoDetail";
import { getTranslatedVideo } from "@/lib/api/heygen";
import { TranslatedVideo } from "@/types/TranslatedVideo";
import VideoPlayer from "@/components/VideoPlayer";

export default function TranslatePreview({
  video_translate_id,
  setSelectedVideo,
}: {
  video_translate_id: string;
  setSelectedVideo: (videoDetail: VideoDetail, title: string) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [video, setVideo] = useState<TranslatedVideo>(null);

  useEffect(() => {
    const fetchVideoDetail = async (video_translate_id: string) => {
      setLoading(true);
      const data = await getTranslatedVideo(video_translate_id);
      setVideo(data);
      setLoading(false);
    };
    fetchVideoDetail(video_translate_id);
  }, [video_translate_id]);

  return (
    <div
      className={`video-item h-64 cursor-pointer rounded-lg bg-gray-300 p-2 transition hover:bg-gray-200
      `}
      // onClick={() => setSelectedVideo(vidoeDetail, video.video_title)}
    >
      {loading ? (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Loading...
        </div>
      ) : video?.status === "success" ? (
        <video src={video.url} style={{ width: "300px", height: "200px" }} />
      ) : (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Generating...
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-800">
        {video?.title || "Untitled Video"}
      </h3>
    </div>
  );
}
