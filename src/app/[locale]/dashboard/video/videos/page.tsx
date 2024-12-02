"use client";

import { useState, useEffect } from "react";
import {
  getUserVideos,
  deleteVideo,
  getUserTranslates,
} from "@/lib/api/videoMamagement";
import VideoPlayer from "@/components/VideoPlayer";
import { VideoDetail } from "@/types/VideoDetail";
import { Modal, Button } from "flowbite-react";
import { getVideoList } from "@/lib/api/heygen";
import VideoPreview from "./VideoPreview";
import TranslatePreview from "./TranslatePreview";
import { Video } from "@/types/Video";

export default function VideosPage() {
  const [originVideos, setOriginVideos] = useState<Video[]>([]);
  const [videos, setVideos] = useState<
    { _id: string; user: string; video_id: string }[]
  >([]);
  const [translates, setTransaltes] = useState<
    { _id: string; user: string; video_translate_id: string }[]
  >([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDetail | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const videos = await getVideoList();
      const fetchedVideos = await getUserVideos();
      setOriginVideos(videos);
      const existVideos = fetchedVideos.filter((video) =>
        videos.some((fetchVideo) => fetchVideo.video_id === video.video_id),
      );
      setVideos(existVideos);
      const translateVideos = await getUserTranslates();
      console.log(translateVideos);
      setTransaltes(translateVideos);
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

  const confirmDelete = (videoId: string) => {
    setVideoToDelete(videoId);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;
    setDeleteLoading(videoToDelete);
    try {
      await deleteVideo(videoToDelete);
      setVideos(videos.filter((video) => video._id !== videoToDelete));
      if (selectedVideo?.id === videoToDelete) {
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setDeleteLoading(null);
      setModalOpen(false);
      setVideoToDelete(null);
    }
  };

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      {/* Sidebar for video list with unique background */}
      <div className="w-full overflow-y-auto bg-gray-100 p-4 md:w-1/3">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">My Videos</h1>
        {loading ? (
          <div className="flex h-1/2 items-center justify-center">
            <p className="text-lg text-gray-500">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex h-1/2 items-center justify-center">
            <p className="text-lg text-gray-500">No videos available</p>
          </div>
        ) : (
          <div className="grid h-1/2 grid-cols-1 gap-4 overflow-y-auto bg-white sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {videos.map((video) => (
              <VideoPreview
                key={video._id}
                video_id={video.video_id}
                setSelectedVideo={setVideo}
                originVideos={originVideos}
              />
            ))}
          </div>
        )}
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Translated Videos
        </h1>
        {loading ? (
          <div className="flex h-1/2 items-center justify-center">
            <p className="text-lg text-gray-500">Loading videos...</p>
          </div>
        ) : translates.length === 0 ? (
          <div className="flex h-1/2 items-center justify-center">
            <p className="text-lg text-gray-500">No videos available</p>
          </div>
        ) : (
          <div className="grid h-1/2 grid-cols-1 gap-4  overflow-y-auto sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {translates.map((video) => (
              <TranslatePreview
                key={video._id}
                video_translate_id={video.video_translate_id}
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
              >
                Download
              </button>
              <button
                onClick={() => confirmDelete(selectedVideo.id)}
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

      {/* Modal for delete confirmation */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this video? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => setModalOpen(false)}
            disabled={!!deleteLoading}
          >
            Cancel
          </Button>
          <Button
            color="failure"
            onClick={handleDelete}
            disabled={!!deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
