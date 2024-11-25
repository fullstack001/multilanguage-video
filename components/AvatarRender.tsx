import { useState } from "react";
import Modal from "react-modal";
import { FiUserPlus } from "react-icons/fi";
import { FaPlayCircle, FaTimes } from "react-icons/fa";

import { Avatar } from "@/types/Avatar";
export default function AvatarRender({
  avatars,
  onSelect,
}: {
  avatars: Avatar[];
  onSelect: (type: string, id: string) => void;
}) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // To control modal visibility

  const handlePlayVideo = (mediaUrl: string) => {
    setVideoUrl(mediaUrl); // Set the video URL to play
    setIsOpen(true); // Open the modal
  };
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold"></h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto  md:grid-cols-6 ">
        {avatars.map((avatar) => (
          <div
            key={avatar.avatar_id}
            className={`relative rounded-xl border-2 p-4 ${
              selectedAvatar?.avatar_id === avatar.avatar_id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => {
              setSelectedAvatar(avatar);
              onSelect("avatar", avatar.avatar_id);
            }}
          >
            <div
              className="relative flex h-40 items-center justify-center rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${avatar.preview_image_url})` }}
            >
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-lg text-gray-700">
                {avatar.avatar_name}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <FaPlayCircle
                size={40}
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayVideo(avatar.preview_video_url);
                }}
              />
            </div>
          </div>
        ))}
      </div>
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
}
