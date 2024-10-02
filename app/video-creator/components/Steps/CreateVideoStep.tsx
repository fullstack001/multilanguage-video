import React, { useState } from "react";
import { createVideo } from "@/lib/api/videoCreate"; // Assume you have an API call for creating the video

const CreateVideoStep = ({
  onPrev,
  // onVideoCreated,
  videoData,
}: {
  videoData: {}; // Fixed typo from 'vidoeData' to 'videoData'
  onPrev: (data: { data: string }) => void;
  onNext: (data: { data: string }) => void;
  // onVideoCreated: (videoUrl: string) => void; // Callback when the video is created
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // URL of the created video
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to create the video (call your backend or API)
  const handleCreateVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call your API to create the video
      const response = await createVideo(videoData);
      const videoUrl = response.videoUrl; // Assuming the API returns a video URL
      setVideoUrl(videoUrl);
      // onVideoCreated(videoUrl); // Trigger callback for next steps
    } catch (error) {
      setError("Failed to create video");
    } finally {
      setLoading(false);
    }
  };

  // Function to download the video
  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = "created-video.mp4"; // You can specify the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
          {/* Create Video Button */}
          <button
            className={`rounded-xl px-4 py-2 text-white ${
              loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
            disabled={loading}
            onClick={handleCreateVideo}
          >
            {loading ? "Creating..." : "Create Video"}
          </button>

          {/* Save Button (Placeholder for custom save logic) */}
          {videoUrl && (
            <button
              className="rounded-xl bg-green-500 px-4 py-2 text-white"
              onClick={() => console.log("Save video logic goes here")}
            >
              Save
            </button>
          )}

          {/* Download Button */}
          {videoUrl && (
            <button
              className="rounded-xl bg-blue-500 px-4 py-2 text-white"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      </div>
      {/* Preview Area */}
      <div className="mb-6">
        <h3>Preview Area</h3>
        {videoUrl ? (
          <video src={videoUrl} controls className="h-64 w-full" />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gray-200">
            <p>No video created yet</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CreateVideoStep;
