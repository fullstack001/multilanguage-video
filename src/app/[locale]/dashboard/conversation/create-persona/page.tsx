"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Avatar } from "@/types/Avatar";
import { getThumbnailFromVideoUrl } from "@/lib/utils/getThumbnailFromVideoUrl";

import SelectReplicaModal from "../create/SelectReplicaModal";
import { createPersona } from "@/lib/api/personas";

const CreatePersona = () => {
  const [enableVision, setEnableVision] = useState(true);
  const [activeTab, setActiveTab] = useState("Persona"); // State for active tab in the left pane
  const [isReplicaModalOpen, setIsReplicaModalOpen] = useState(false);
  const [personalRole, setPersonalRole] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [conversationalContext, setConversationalContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [selectedReplica, setSelectedReplica] = useState<Avatar | null>(null);
  const [model, setModel] = useState("tavus-llama");

  useEffect(() => {
    if (selectedReplica) {
      getThumbnailFromVideoUrl(selectedReplica.thumbnail_video_url).then(
        (url) => {
          setThumbnail(url);
        },
      );
    }
  }, [selectedReplica]);

  const handleersona = async () => {
    setLoading(true);
    try {
      const response = await createPersona(
        model,
        personalRole,
        systemPrompt,
        conversationalContext,
        selectedReplica?.replica_id,
      );
      console.log(response);
      toast.success("Persona created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create persona");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col space-y-4 p-4 lg:flex-row lg:space-x-4 lg:space-y-0">
      {/* Left Pane with Tabs */}
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 lg:w-1/2">
        <h2 className="mb-4 text-lg font-semibold">Settings</h2>

        {/* Tabs for Persona and Layout */}
        <div className="mb-4 flex space-x-4">
          <button
            className={`w-full py-2 font-medium ${
              activeTab === "Persona"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("Persona")}
          >
            Persona
          </button>
          <button
            className={`w-full py-2 font-medium ${
              activeTab === "Layout"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("Layout")}
          >
            Layout
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "Persona" && (
          <div className="space-y-4">
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

            {/* Enable Vision */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={enableVision}
                onChange={() => setEnableVision(!enableVision)}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">Enable Vision</label>
            </div>

            {/* Persona Role */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Persona Role (optional)
              </label>
              <input
                type="text"
                placeholder="Enter a name for your persona"
                className="w-full rounded border border-gray-300 p-2"
                onChange={(e) => setPersonalRole(e.target.value)}
              />
            </div>

            {/* System Prompt */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                System Prompt
              </label>
              <textarea
                placeholder="Enter System Prompt for your persona"
                className="h-24 w-full rounded border border-gray-300 p-2"
                onChange={(e) => setSystemPrompt(e.target.value)}
              />
            </div>

            {/* Conversational Context */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Conversational Context (optional)
              </label>
              <textarea
                placeholder="Enter Context for your persona"
                className="h-36 w-full rounded border border-gray-300 p-2"
                onChange={(e) => setConversationalContext(e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === "Layout" && (
          <div className="space-y-4  rounded-sm border p-2">
            <div className=" items-center gap-4">
              <p className="text-lg font-medium text-gray-900">
                Language Model(LLM)
              </p>
              <p className="text-sm font-medium text-gray-500">
                Choose the LLM model and configure integration parameters.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700"
              >
                Model Name
              </label>
              <select
                id="model"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="tavus-llama">tavus-llama (default)</option>
                <option value="tavus-gpt-4o">tavus-gpt-4o</option>
                <option value="tavus-gpt-4o-mini">tavus-gpt-4o-mini</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 flex">
          <button
            onClick={handleersona}
            className="w-full rounded bg-pink-500 py-2 font-medium text-white disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Persona"}
          </button>
        </div>
      </div>

      {/* Right Pane for Preview */}
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 lg:w-1/2">
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
      </div>
    </div>
  );
};

export default CreatePersona;
