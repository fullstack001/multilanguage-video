"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Use react-modal for more customization
import { getAvatar } from "@/lib/api/videoCreate"; // Make sure the path is correct
import Loading from "@/components/Loading";
import { Avatar } from "@/types/Avatar";
import { FaPlayCircle, FaTimes } from "react-icons/fa";
import "./avatar.css";

const AvatarStep = ({
  onNext,
  onPrev,
  videoData,
}: {
  videoData: { avatar: Avatar };
  onNext: (avatar: { avatar: Avatar }) => void;
  onPrev: (avatar: { avatar: Avatar }) => void;
}) => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(
    videoData.avatar || null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isOpen, setIsOpen] = useState<boolean>(false); // To control modal visibility
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // To store the video URL

  useEffect(() => {
    // Fetch avatars when the component is mounted
    const fetchAvatars = async () => {
      setLoading(true);
      try {
        const avatarList = await getAvatar(); // Assuming getAvatar returns an array of avatar objects
        setAvatars(avatarList);
        setSelectedAvatar(avatarList[0]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch avatars");
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const handlePlayVideo = (mediaUrl: string) => {
    setVideoUrl(mediaUrl); // Set the video URL to play
    setIsOpen(true); // Open the modal
  };

  const capitalizeName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  if (loading) {
    // Show loading spinner while avatars are being fetched
    return <Loading spinnerSrc="/assets/icons/spinner.svg" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex w-full justify-end">
        <button
          disabled={!selectedAvatar}
          className="my-3 mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white"
          onClick={() => selectedAvatar && onNext({ avatar: selectedAvatar })}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto md:grid-cols-6">
        {avatars.map((avatar) => (
          <div
            key={avatar.presenter_id} // Use the unique identifier of the avatar object
            className={`relative border p-4 ${
              selectedAvatar?.presenter_id === avatar.presenter_id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedAvatar(avatar)} // Set the selectedAvatar to the avatar
          >
            <img
              src={avatar.thumbnail_url}
              alt={`Avatar ${avatar.presenter_id}`}
              width="300px"
              className="transition-all duration-300 ease-in-out"
            />
            {/* Display the avatar name below the image, with the first letter capitalized */}
            <p className="mt-2 text-center text-lg  text-gray-700">
              {capitalizeName(avatar.name)}
            </p>
            {/* Show play icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <FaPlayCircle
                size={40}
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent avatar selection when clicking play icon
                  handlePlayVideo(avatar.talking_preview_url); // Play the avatar's media video
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for video preview */}
      {videoUrl && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Avatar Video"
          className="modal-video"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <FaTimes size={24} />
            </button>
            {/* Use <video> tag to prevent download and play directly */}
            <video controls autoPlay src={videoUrl} className="w-full" />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AvatarStep;
