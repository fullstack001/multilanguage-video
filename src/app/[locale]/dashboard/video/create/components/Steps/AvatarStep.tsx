"use client";
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Loading from "@/components/Loading";
import { Avatar } from "@/types/Avatar";
import { FaPlayCircle, FaTimes } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { avatarData, personalAvatarData } from "@/lib/data";
import "./avatar.css";
import CreateReplicaModal from "./CreateReplicaModal"; // Assume this component exists

const stockAvatars = avatarData;
const personalAvatars = personalAvatarData; // Assuming this data is available

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handlePlayVideo = (mediaUrl: string) => {
    setVideoUrl(mediaUrl); // Set the video URL to play
    setIsOpen(true); // Open the modal
  };

  const capitalizeName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  const renderAvatarGrid = (avatars: Avatar[], title: string) => (
    <div>
      <h2 className="mb-2 text-xl font-semibold">
        {title} {avatars.length > 0 && `(${avatars.length})`}
      </h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto  md:grid-cols-6 ">
        {title === "Personal Replicas" && (
          <div
            className="block cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-purple-700 p-4  text-purple-700"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <FiUserPlus className="mx-auto my-2" />
            <p className="text-center text-lg">Create Replica</p>
          </div>
        )}
        {avatars.map((avatar) => (
          <div
            key={avatar.replica_id}
            className={`relative rounded-xl border-2 p-4 ${
              selectedAvatar?.replica_id === avatar.replica_id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedAvatar(avatar)}
          >
            <p className="text-center text-lg text-gray-700">
              {capitalizeName(avatar.replica_name)}
            </p>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <FaPlayCircle
                size={40}
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayVideo(avatar.thumbnail_video_url);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
      <div className="space-y-8">
        {renderAvatarGrid(personalAvatars, "Personal Replicas")}
        {renderAvatarGrid(stockAvatars, "Stock Replicas")}
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

      {/* Create Replica Modal */}
      <CreateReplicaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default AvatarStep;
