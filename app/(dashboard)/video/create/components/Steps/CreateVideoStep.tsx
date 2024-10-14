import React, { useState, useEffect } from "react";
import { createVideo } from "@/lib/api/videoCreate";
import { io } from "socket.io-client";
import { VideoStatus } from "@/types/VideoStatus";
import VideoPlayer from "@/components/VideoPlayer";
import { useRouter } from "next/navigation";
interface VideoResult {
  video_id: string;
  video_name: string;
  status: string;
  generation_progress: string;
  stream_url: string;
  download_url: string;
  // ... other fields as needed
}

const CreateVideoStep = ({
  onPrev,
  videoData,
}: {
  videoData: {};
  onPrev: (data: { data: string }) => void;
  onNext: (data: { data: string }) => void;
}) => {
  const router = useRouter();
  const [videoResult, setVideoResult] = useState<VideoResult | null>(null);
  const [videoStatus, setVideoStatus] = useState<VideoStatus | null>(null);
  const [videoName, setVideoName] = useState<string>(""); // Video name input
  const [showNameInput, setShowNameInput] = useState<boolean>(true); // Control visibility of name input
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const socket = io(process.env.NEXT_PUBLIC_API_URL);
  //   socket.on("videoCreated", (data: VideoResult) => {
  //     console.log(data);
  //     if (data.video_id === videoStatus?.video_id) {
  //       setVideoResult(data);
  //     }
  //   });
  // }, []);

  // Function to create the video (call your backend or API)
  const handleCreateVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call your API to create the video
      const response = await createVideo({ ...videoData, name: videoName });
      setVideoStatus(response.resultData);
      setShowNameInput(false); // Hide the input after submission
      const pendingVideos = JSON.parse(
        localStorage.getItem("pendingVideos") || "[]",
      );
      pendingVideos.push(response.resultData.video_id);
      localStorage.setItem("pendingVideos", JSON.stringify(pendingVideos));
      router.push("/video/videos");
      // onVideoCreated(videoUrl); // Trigger callback for next steps
    } catch (error) {
      setError("Failed to create video");
    } finally {
      setLoading(false);
    }
  };

  // Function to download the video
  const handleDownload = () => {
    if (videoResult && videoResult.download_url) {
      window.open(videoResult.download_url, "_blank");
    }
  };

  return (
    <div>
      {/* Create, Save, and Download Buttons */}
      <div className="flex items-center justify-between">
        {/* Prev Button */}
        <button
          className="rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() => onPrev({ data: "return" })}
        >
          Prev
        </button>

        <div className="flex space-x-4">
          {/* Video Name Input */}
          {showNameInput && (
            <input
              type="text"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder="Enter video name"
              className="rounded-xl border px-4 py-2 text-gray-800"
            />
          )}

          {/* Create Video Button */}

          <button
            className={`rounded-xl px-4 py-2 text-white ${
              loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
            disabled={loading || (showNameInput && !videoName.trim())}
            onClick={handleCreateVideo}
          >
            {loading ? "Creating..." : "Create Video"}
          </button>

          {/* Save Button (Placeholder for custom save logic) */}
          {videoResult && (
            <button
              className="rounded-xl bg-green-500 px-4 py-2 text-white"
              onClick={() => console.log("Save video logic goes here")}
            >
              Save
            </button>
          )}

          {/* Download Button */}
          {videoResult && (
            <button
              className="rounded-xl bg-blue-500 px-4 py-2 text-white"
              onClick={handleDownload}
              disabled={!videoResult}
            >
              Download
            </button>
          )}
        </div>
      </div>
      {/* Preview Area */}
      <div className="mb-6">
        <div className="mt-4 flex h-64 w-full  items-center justify-center bg-gray-200 text-center text-lg text-gray-800">
          <p>
            Usually you willll find that the videos take just a few minutes,
            however if they are longer scripts, they may take 10 minutes or so !
            You can check the status of the video in the My videos Page and you
            will get notification when the vidoe generating will complete.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CreateVideoStep;
