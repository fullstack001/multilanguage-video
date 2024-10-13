"use client";

import { useState, useEffect } from "react";
import { getUserVideos } from "@/lib/api/videoMamagement";
import VideoPlayer from "@/components/VideoPlayer";
import VideoThumbnail from "@/components/VideoThumbnail";
import { Video } from "@/types/Video";
import { languageData } from "@/lib/languageData";
import { translateVideo } from "@/lib/api/videoCreate";
// Add this import
import { useRouter } from "next/navigation";

export default function TranslationPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [translating, setTranslating] = useState(false);
  // Add this line
  const router = useRouter();

  useEffect(() => {
    fetchVideos();
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

  const handleTranslate = async () => {
    if (!selectedVideo || !selectedLanguage) return;
    setTranslating(true);
    try {
      const response = await translateVideo(selectedVideo._id, selectedLanguage);
      const pendingVideos = JSON.parse(
        localStorage.getItem("pendingVideos") || "[]",
      );
      pendingVideos.push(response.resultData.video_id);
      localStorage.setItem("pendingVideos", JSON.stringify(pendingVideos));
      // Add these lines
      router.push("/video/videos");
    } catch (error) {
      console.error("Error translating video:", error);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="flex  min-h-full   flex-col md:flex-row">
      {/* Sidebar for video list with unique background */}
      <div className="w-full overflow-y-auto bg-gray-100 p-4 md:w-1/3">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Transalte Video
        </h1>
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
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded border border-gray-300 px-4 py-2"
              >
                <option value="">Select language</option>
                {languageData.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTranslate}
                className={`rounded px-4 py-2 text-white ${
                  translating || !selectedLanguage
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={translating || !selectedLanguage}
              >
                {translating ? "Translating..." : "Translate"}
              </button>
            </div>
            {translating && (
              <div className="mb-6">
                <div className="mt-4 flex h-64 w-full  items-center justify-center bg-gray-200 text-center text-lg text-gray-800">
                  <p>
                    Usually you'll find that the videos take just a few minutes,
                    however if they're longer scripts, they may take 10 minutes
                    or so ! You can check the status of the video in the "My
                    videos" Page and you will get notification when the vidoe
                    generating will complete.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50">
            <p className="text-lg text-gray-500">Select a video to translate</p>
          </div>
        )}
      </div>
    </div>
  );
}
