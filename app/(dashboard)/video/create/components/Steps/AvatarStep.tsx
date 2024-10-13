"use client";
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Loading from "@/components/Loading";
import { Avatar } from "@/types/Avatar";
import { FaPlayCircle, FaTimes } from "react-icons/fa";
import { avatarData } from "@/lib/data";
import "./avatar.css";
const avatars = avatarData;

const AvatarStep = ({
  onNext,
  onPrev,
  videoData,
}: {
  videoData: { avatar: Avatar };
  onNext: (avatar: { avatar: Avatar }) => void;
  onPrev: (avatar: { avatar: Avatar }) => void;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(
    videoData.avatar || null,
  );
  // Modal state
  const [isOpen, setIsOpen] = useState<boolean>(false); // To control modal visibility
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // To store the video URL

  const handlePlayVideo = (mediaUrl: string) => {
    setVideoUrl(mediaUrl); // Set the video URL to play
    setIsOpen(true); // Open the modal
  };

  const capitalizeName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

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
            key={avatar.replica_id} // Use the unique identifier of the avatar object
            className={`relative border p-4 ${
              selectedAvatar?.replica_id === avatar.replica_id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedAvatar(avatar)} // Set the selectedAvatar to the avatar
          >
            {/* Remove the video element and display only the name */}
            <p className="text-center text-lg text-gray-700">
              {capitalizeName(avatar.replica_name)}
            </p>
            {/* Show play icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <FaPlayCircle
                size={40}
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent avatar selection when clicking play icon
                  handlePlayVideo(avatar.thumbnail_video_url); // Play the avatar's media video
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
