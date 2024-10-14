"use client";

import { useState, useEffect } from "react";
import { getUserVideos, deleteVideo } from "@/lib/api/videoMamagement";
import VideoPlayer from "@/components/VideoPlayer";
import VideoThumbnail from "@/components/VideoThumbnail";
import { Video } from "@/types/Video";

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
    const handleRefetchData = () => fetchVideos();
    window.addEventListener("refetchData", handleRefetchData);

    return () => {
      window.removeEventListener("refetchData", handleRefetchData);
    };
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const fetchedVideos = await getUserVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (video: Video) => {
    const link = document.createElement("a");
    link.href = video.download_url;

    // Create a file name using video_name or video_id, and ensure it has a .mp4 extension
    let fileName = (video.video_name || video.video_id || "video").trim();
    if (!fileName.toLowerCase().endsWith(".mp4")) {
      fileName += ".mp4";
    }

    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (videoId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?",
    );
    if (!confirmDelete) return;

    setDeleteLoading(videoId);
    try {
      await deleteVideo(videoId);
      setVideos(videos.filter((video) => video._id !== videoId));
      if (selectedVideo?._id === videoId) {
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      {/* Sidebar for video list with unique background */}
      <div className="w-full overflow-y-auto bg-gray-100 p-4 md:w-1/3">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">My Videos</h1>
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-gray-500">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-gray-500">No videos available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video._id}
                className={`video-item cursor-pointer rounded-lg p-2 transition ${
                  selectedVideo?._id === video._id
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedVideo(video)}
              >
                {video.status === "ready" ? (
                  <VideoThumbnail
                    streamUrl={video.stream_url || null}
                    title={video.video_name || "Untitled Video"}
                  />
                ) : (
                  <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
                    Generating...
                  </div>
                )}
                <h3 className="mt-2 text-sm font-semibold text-gray-800">
                  {video.video_name || "Untitled Video"}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content for selected video with a different background */}
      <div className="w-full bg-white p-4 md:w-2/3">
        {selectedVideo ? (
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              {selectedVideo.video_name || selectedVideo.video_id}
            </h2>
            {selectedVideo.status === "ready" ? (
              <VideoPlayer
                streamUrl={selectedVideo.stream_url}
                title={selectedVideo.video_name || "Untitled Video"}
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-500">
                This video is not available now. Status: {selectedVideo.status}
              </div>
            )}
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleDownload(selectedVideo)}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                disabled={selectedVideo.status !== "ready"}
              >
                Download
              </button>
              <button
                onClick={() => handleDelete(selectedVideo._id)}
                className={`rounded px-4 py-2 text-white ${
                  deleteLoading === selectedVideo._id
                    ? "bg-gray-400"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={deleteLoading === selectedVideo._id}
              >
                {deleteLoading === selectedVideo._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50">
            <p className="text-lg text-gray-500">Select a video to play</p>
          </div>
        )}
      </div>
    </div>
  );
}
