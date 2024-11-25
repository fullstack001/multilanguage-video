import { useEffect, useState } from "react";
import Image from "next/image";

import { Video } from "@/types/Video";
import { VideoDetail } from "@/types/VideoDetail";
import { getVideoDetail, getVideoList } from "@/lib/api/heygen";

export default function VideoPreview({
  video_id,
  setSelectedVideo,
}: {
  video_id: string;
  setSelectedVideo: (videoDetail: VideoDetail, title: string) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [video, setVideo] = useState<Video>(null);
  const [vidoeDetail, setVideoDetail] = useState<VideoDetail>(null);

  useEffect(() => {
    const fetchVideoDetail = async (video_id: string) => {
      setLoading(true);
      const videos = await getVideoList();
      const currentVideo = videos.find((item) => item.video_id === video_id);
      setVideo(currentVideo);
      if (currentVideo.status === "completed") {
        const res = await getVideoDetail(video_id);
        setVideoDetail(res);
      }
      setLoading(false);
    };
    fetchVideoDetail(video_id);
  }, [video_id]);
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div
      className={`video-item cursor-pointer rounded-lg p-2 transition ${
        video?.video_id ? "bg-gray-300" : "hover:bg-gray-200"
      }`}
      onClick={() => setSelectedVideo(vidoeDetail, video.video_title)}
    >
      {video?.status === "completed" ? (
        <Image
          className="mx-auto"
          src={vidoeDetail.thumbnail_url}
          alt={"Video thumbnail"}
          width={220}
          height={100}
        />
      ) : (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Generating...
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-800">
        {video?.video_title || "Untitled Video"}
      </h3>
    </div>
  );
}
