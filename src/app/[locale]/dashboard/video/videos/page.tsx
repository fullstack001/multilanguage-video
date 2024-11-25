"use client";

import { useState, useEffect } from "react";
import { getUserVideos, deleteVideo } from "@/lib/api/videoMamagement";
import VideoPlayer from "@/components/VideoPlayer";
import { VideoDetail } from "@/types/VideoDetail";
import VideoPreview from "./VideoPreview";

export default function VideosPage() {
  const [videos, setVideos] = useState<
    { _id: string; user: string; video_id: string }[]
  >([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDetail | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
    const handleRefetchData = () => fetchVideos();
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

  const setVideo = (video: VideoDetail, title: string) => {
    setSelectedVideo(video);
    setSelectedVideoTitle(title);
  };

  const handleDownload = (video: VideoDetail) => {
    const link = document.createElement("a");
    link.href = video.video_url;

    // Create a file name using video_name or video_id, and ensure it has a .mp4 extension
    let fileName = selectedVideoTitle.trim();
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
      if (selectedVideo?.id === videoId) {
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
              <VideoPreview
                key={video._id}
                video_id={video.video_id}
                setSelectedVideo={setVideo}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main content for selected video with a different background */}
      <div className="w-full bg-white p-4 md:w-2/3">
        {selectedVideo ? (
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              {selectedVideoTitle}
            </h2>
            {selectedVideo.status === "completed" ? (
              <VideoPlayer
                streamUrl={selectedVideo.video_url}
                title={selectedVideoTitle}
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
                onClick={() => handleDelete(selectedVideo.id)}
                className={`rounded px-4 py-2 text-white ${
                  deleteLoading === selectedVideo.id
                    ? "bg-gray-400"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={deleteLoading === selectedVideo.id}
              >
                {deleteLoading === selectedVideo.id ? "Deleting..." : "Delete"}
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
