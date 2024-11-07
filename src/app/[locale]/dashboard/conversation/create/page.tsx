"use client";
import React, { useState, useEffect } from "react";
import SelectPersonaModal from "./SelectPersonaModal";
import SelectReplicaModal from "./SelectReplicaModal";
import RightSidePanel from "./RightSidePanel";
import { Persona } from "@/types/Persona";
import { Avatar } from "@/types/Avatar";
import { getThumbnailFromVideoUrl } from "@/lib/utils/getThumbnailFromVideoUrl";
import { toast } from "react-toastify";
import {
  createConversation,
  getConversations,
  deleteConversation,
} from "@/lib/api/conversation";
import { Conversation } from "@/types/Conversation";
import { formatDateTime } from "@/lib/utils/dateTimeFormat";

const ConversationCreatePage: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedReplica, setSelectedReplica] = useState<Avatar | null>(null);
  const [conversation_name, setConversationName] = useState<string>("");
  const [conversation_context, setConversationContext] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplicaModalOpen, setIsReplicaModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getConversations().then((data) => {
      console.log(data);
      setConversations(data);
    });
  }, []);

  useEffect(() => {
    if (selectedReplica) {
      getThumbnailFromVideoUrl(selectedReplica.thumbnail_video_url).then(
        (url) => {
          setThumbnail(url);
        },
      );
    }
  }, [selectedReplica]);

  const handleOpenPanel = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleSelectPersonaClick = () => {
    setIsModalOpen(true);
  };

  const handleCreateConversation = async () => {
    if (!selectedPersona || !selectedReplica || !conversation_name) {
      toast.error(
        "Please select a Persona, Replica, and enter a Conversation Name.",
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await createConversation(
        selectedPersona?.persona_id,
        selectedReplica?.replica_id,
        conversation_name,
        conversation_context,
      );
      toast.success("Conversation created successfully");
      setConversations([...conversations, response]);
    } catch (error) {
      toast.error("Failed to create conversation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (conversation_id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?",
    );
    if (confirmed) {
      setDeleting(true);
      try {
        await deleteConversation(conversation_id);
        handleClosePanel();
        toast.success("Conversation deleted successfully");
        setConversations(
          conversations.filter(
            (convo) => convo.conversation_id !== conversation_id,
          ),
        );
      } catch (error) {
        toast.error("Failed to delete conversation");
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:flex-row">
      {/* Left Section - Form Area */}
      <div className="rounded-lg bg-white p-6 shadow-md lg:w-1/2">
        <h2 className="mb-4 text-xl font-bold">Persona</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 w-full rounded-md border p-2 text-left hover:border-pink-500"
        >
          {selectedPersona ? selectedPersona.persona_name : "Select Persona"}
        </button>

        {isModalOpen && (
          <SelectPersonaModal
            showModal={isModalOpen}
            onSelectPersona={(persona) => {
              setSelectedPersona(persona);
              setIsModalOpen(false);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <h2 className="mb-4 text-xl font-bold">Replica</h2>
        <button
          onClick={() => setIsReplicaModalOpen(true)}
          className="mb-4 flex w-full items-center gap-4 rounded-md border p-2 text-left hover:border-pink-500"
        >
          {selectedReplica ? (
            <>
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Aaliyah - Office"
                  className="h-10 rounded-full"
                />
              )}
              <p>{selectedReplica?.replica_name}</p>
            </>
          ) : (
            <p>Select a Replica</p>
          )}
        </button>

        {isReplicaModalOpen && (
          <SelectReplicaModal
            showModal={isReplicaModalOpen}
            onSelectPersona={(replica) => {
              setSelectedReplica(replica);
              setIsReplicaModalOpen(false);
            }}
            onClose={() => setIsReplicaModalOpen(false)}
          />
        )}

        <h2 className="mb-4 text-xl font-bold">Conversation Name (optional)</h2>
        <input
          type="text"
          placeholder="Enter a name for your conversation"
          className="mb-4 w-full rounded-md border p-2"
          value={conversation_name}
          onChange={(e) => setConversationName(e.target.value)}
        />

        <h2 className="mb-4 text-xl font-bold">
          Conversation Context (optional)
        </h2>
        <textarea
          placeholder="Enter context for your conversation"
          className="mb-4 h-80 w-full rounded-md border p-2"
          rows={3}
          value={conversation_context}
          onChange={(e) => setConversationContext(e.target.value)}
        ></textarea>

        <button
          className={`mt-4 w-full rounded-md ${
            isLoading ? "bg-gray-500" : "bg-pink-500"
          } py-2 text-white`}
          onClick={handleCreateConversation}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Conversation"}
        </button>
      </div>

      {/* Right Section - Preview Area */}
      <div className="rounded-lg bg-white p-6 shadow-md lg:w-1/2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Conversation Name</h2>
        </div>

        <div className="relative mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
          {thumbnail && (
            <img src={thumbnail} alt="Aaliyah - Office" className="w-3/4 " />
          )}
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            In preview mode, sound and face animations are off
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">Generated Conversations</h3>
          {conversations.map((conversation) => (
            <div
              key={conversation.conversation_id}
              className="mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-white p-2"
              onClick={() => handleOpenPanel(conversation)}
            >
              <p className="w-24">{conversation.conversation_name}</p>
              <span
                className={`rounded-lg bg-green-100 px-2 py-1 ${
                  conversation.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {conversation.status}
              </span>
              <p className="text-sm text-gray-500">
                {formatDateTime(
                  conversation.updated_at || conversation.created_at,
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <RightSidePanel
        deleting={deleting}
        conversation={selectedConversation}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ConversationCreatePage;
