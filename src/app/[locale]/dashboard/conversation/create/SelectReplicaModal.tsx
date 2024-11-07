import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Image from "next/image";
import { Avatar } from "@/types/Avatar";
import { FaVolumeMute, FaVolumeUp, FaExpand, FaCompress } from "react-icons/fa"; // Import icons

import { stockPersonas } from "@/lib/data";
import { avatarData } from "@/lib/data";
import { getThumbnailFromVideoUrl } from "@/lib/utils/getThumbnailFromVideoUrl";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSelectPersona: (replica: Avatar) => void;
}

const SelectReplicaModal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onSelectPersona,
}) => {
  const [selectedReplica, setSelectedReplica] = useState<Avatar | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(8); // Number of initial videos shown
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    if (showModal) {
      Modal.setAppElement("body");
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onClose}
      contentLabel="Select Persona"
      appElement={document.getElementById("root") || undefined}
      className="max-h-[750px] w-full max-w-4xl flex-row overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:p-6"
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold md:text-xl">Select a Persona</h2>
        <button
          onClick={onClose}
          className="text-lg text-gray-500 hover:text-gray-700 md:hidden"
        >
          &times;
        </button>
      </div>
      {/* Left Column */}
      <div className="w-full border-b pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
        <p className="mb-4 text-sm text-gray-600">
          Replica is a customizable set of attributes that powers your replica’s
          behavior.
        </p>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Enter Persona ID to search"
            className="w-full rounded-md border border-gray-300 p-2"
          />
          <button className="ml-2 rounded-md bg-gray-200 px-4 py-2">
            Search
          </button>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-bold text-gray-500">Personal Replicas (0)</div>
        </div>
        <div className="my-4 font-bold text-gray-500">
          Stock Replicas ({avatarData.length})
        </div>
        <div className="grid h-96 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          {avatarData.slice(0, displayCount).map((replica, index) => (
            <div
              key={index}
              className={`relative grid cursor-pointer rounded-md border p-2 hover:bg-gray-50 ${
                replica.replica_id === selectedReplica?.replica_id
                  ? "border-2 border-pink-500"
                  : ""
              }`}
              onClick={() => setSelectedReplica(replica)}
            >
              <div className="relative">
                <video
                  className="w-full rounded-md"
                  muted
                  controls={false}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                  ref={(el) => (videoRefs.current[index] = el)}
                >
                  <source src={replica.thumbnail_video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute right-2 top-2 flex space-x-2">
                  <button
                    onClick={() => {
                      const video = videoRefs.current[index];
                      if (video) {
                        if ((video as any).requestFullscreen) {
                          (video as any).requestFullscreen();
                        } else if ((video as any).webkitRequestFullscreen) {
                          (video as any).webkitRequestFullscreen();
                        }
                      }
                    }}
                    className="rounded-md bg-white p-1 shadow"
                  >
                    {document.fullscreenElement ? (
                      <FaCompress /> // Use the compress icon when in fullscreen
                    ) : (
                      <FaExpand /> // Use the expand icon when not in fullscreen
                    )}
                  </button>
                  <button
                    onClick={() => {
                      const video = videoRefs.current[index];
                      if (video) {
                        video.muted = !video.muted;
                      }
                    }}
                    className="rounded-md bg-white p-1 shadow"
                  >
                    {videoRefs.current[index] &&
                    videoRefs.current[index].muted ? (
                      <FaVolumeUp /> // Use the unmute icon
                    ) : (
                      <FaVolumeMute /> // Use the mute icon
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center bg-slate-600 text-center text-white">
                <p className="text-lg">{replica.replica_name}</p>
              </div>
              <div className="absolute bottom-12 left-6 rounded-full bg-black bg-opacity-50 p-1 text-white">
                <p className="text-xs font-semibold">{replica.model_name}</p>
              </div>
              <div className="absolute bottom-12 right-6 rounded-full bg-black bg-opacity-50 p-1 text-white">
                <p className="text-xs">{replica.replica_id}</p>
              </div>
            </div>
          ))}
        </div>
        {displayCount < avatarData.length && (
          <button
            onClick={() => setDisplayCount(displayCount + 10)}
            className="mt-4 w-full rounded-md bg-gray-300 px-4 py-2 text-center"
          >
            Show More
          </button>
        )}
      </div>

      <button
        onClick={() => {
          if (!selectedReplica) {
            toast.error("Please select a persona");
            return;
          }
          onSelectPersona(selectedReplica);
        }}
        className="mt-4 w-full rounded-md bg-pink-500 px-4 py-2 text-white"
      >
        Select
      </button>
    </Modal>
  );
};

export default SelectReplicaModal;
