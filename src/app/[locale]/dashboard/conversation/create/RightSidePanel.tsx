import React, { useEffect, useState } from "react";
import { Conversation } from "@/types/Conversation";
import { getThumbnailFromVideoUrl } from "@/lib/utils/getThumbnailFromVideoUrl";
import { avatarData } from "@/lib/data";
import { AiOutlineRight, AiOutlineDelete, AiOutlineLink } from "react-icons/ai";
import { toast } from "react-toastify";

type RightSidePanelProps = {
  conversation: Conversation | null;
  onClose: () => void;
  isOpen: boolean;
  deleting: boolean;
  onDelete: (conversation_id: string) => void;
};

const RightSidePanel: React.FC<RightSidePanelProps> = ({
  conversation,
  onClose,
  isOpen,
  deleting,
  onDelete,
}) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (conversation) {
      const avatar = avatarData.find(
        (avatar) => avatar.replica_id === conversation.replica_id,
      );
      if (avatar?.thumbnail_video_url) {
        getThumbnailFromVideoUrl(avatar.thumbnail_video_url).then((url) => {
          setThumbnail(url);
        });
      }
    }
  }, [conversation]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    if (conversation) {
      navigator.clipboard.writeText(conversation.conversation_url || "");
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 m-4 h-full w-96 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <button onClick={onClose} className="text-2xl text-gray-600">
            <AiOutlineRight />
          </button>
          <button
            onClick={() => {
              onDelete(conversation?.conversation_id || "");
            }}
            className={`flex items-center gap-2 text-red-500 ${
              deleting ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <AiOutlineDelete />
            <span>{deleting ? "Deleting..." : "Delete Conversation"}</span>
          </button>
        </div>

        {conversation ? (
          <div className="p-4">
            {thumbnail && (
              <img
                src={thumbnail}
                alt={conversation.conversation_name}
                className="mb-4 w-full rounded-lg"
              />
            )}
            <h2 className="mb-2 text-xl font-bold">
              {conversation.conversation_name}
            </h2>

            <div className="space-y-1 text-gray-700">
              <p>
                <span className="font-semibold">Conversation ID:</span>{" "}
                {conversation.conversation_id}
              </p>
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {conversation.created_at}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-500">{conversation.status}</span>
              </p>
              <p>
                <span className="font-semibold">Persona ID:</span>{" "}
                {conversation.persona_id}
              </p>
              <p>
                <span className="font-semibold">Replica ID:</span>{" "}
                {conversation.replica_id}
              </p>
            </div>

            <div className="mt-4">
              <label className="font-semibold text-gray-700">
                Conversation Link
              </label>
              <div className="mt-2 flex items-center rounded-md border bg-gray-100 p-2">
                <input
                  type="text"
                  readOnly
                  value={conversation.conversation_url}
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button onClick={handleCopyLink} className="ml-2 text-pink-500">
                  <AiOutlineLink size={24} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="p-4 text-gray-500">No conversation selected</p>
        )}
      </div>
    </>
  );
};

export default RightSidePanel;
