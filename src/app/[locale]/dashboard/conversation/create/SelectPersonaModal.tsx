import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { Persona } from "@/types/Persona";
import { stockPersonas } from "@/lib/data";
import { avatarData } from "@/lib/data";
import { getThumbnailFromVideoUrl } from "@/lib/utils/getThumbnailFromVideoUrl";
import { useLocale } from "next-intl";

import { fetchPersonas } from "@/lib/api/personas";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSelectPersona: (persona: Persona) => void;
}

const PersonaModal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onSelectPersona,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [personalPersonas, setPersonalPersonas] = useState<Persona[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const getPersonas = async () => {
      const response = await fetchPersonas();
      setPersonalPersonas((response as Persona[]) ? response : []);
    };

    getPersonas();
    if (showModal) {
      Modal.setAppElement("body");
    }
  }, [showModal]);

  useEffect(() => {
    if (selectedPersona) {
      getThumbnailFromVideoUrl(
        avatarData.find(
          (avatar) => avatar.replica_id === selectedPersona.default_replica_id,
        )?.thumbnail_video_url,
      ).then((url) => setThumbnailUrl(url));
    }
  }, [selectedPersona]);

  if (!showModal) return null;
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onClose}
      contentLabel="Select Persona"
      appElement={document.getElementById("root") || undefined}
      className="flex h-full max-h-[750px] w-full max-w-4xl flex-col overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:flex-row md:p-6"
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      {/* Left Column */}
      <div className="w-full border-b pb-4 md:w-1/2 md:border-b-0 md:border-r md:pb-0 md:pr-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold md:text-xl">Select a Persona</h2>
          <button
            onClick={onClose}
            className="text-lg text-gray-500 hover:text-gray-700 md:hidden"
          >
            &times;
          </button>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          Persona is a customizable set of attributes that powers your replica’s
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
          <div className="font-bold text-gray-500">
            Personal Personas {personalPersonas.length}
          </div>
          <Link
            className="text-sm text-pink-500"
            href={`/${locale}/dashboard/conversation/create-persona`}
          >
            + Create Persona
          </Link>
        </div>
        <div className="max-h-[400px] space-y-4 overflow-y-auto">
          {personalPersonas.map((persona, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md border p-2 hover:bg-gray-50"
              onClick={() => setSelectedPersona(persona)}
            >
              <p className="font-semibold">{persona.persona_name}</p>
              <p className="text-sm text-gray-500">
                {persona?.system_prompt.length > 30
                  ? `${persona.system_prompt.substring(0, 30)}...`
                  : persona?.system_prompt}
              </p>
            </div>
          ))}
        </div>
        <div className="my-4 font-bold text-gray-500">
          Stock Personas ({stockPersonas.length})
        </div>
        <div className="h-[400px] space-y-4 overflow-y-auto">
          {stockPersonas.map((persona, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md border p-2 hover:bg-gray-50"
              onClick={() => setSelectedPersona(persona)}
            >
              <p className="font-semibold">{persona.persona_name}</p>
              <p className="text-sm text-gray-500">
                {persona?.system_prompt.length > 30
                  ? `${persona.system_prompt.substring(0, 30)}...`
                  : persona?.system_prompt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex w-full flex-col pt-4 md:w-1/2 md:pl-4 md:pt-0">
        <button
          onClick={onClose}
          className="mb-2 ml-auto hidden text-lg text-gray-500 hover:text-gray-700 md:block"
        >
          &times;
        </button>
        <div className="flex-grow">
          {/* Replace VideoThumbnail with an Image based on selectedPersona's default_replica_id */}
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={selectedPersona.persona_name}
              className="w-full rounded-md"
              layout="responsive" // Adjust layout as needed
              width={500} // Set appropriate width
              height={300} // Set appropriate height
            />
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center rounded-md bg-gray-200">
              <p className="text-gray-500">No persona selected</p>
            </div>
          )}
          {/* Removed VideoThumbnail component */}
          {/* <VideoThumbnail
            streamUrl={avatarData[0].thumbnail_video_url}
            title={selectedPersona?.persona_name}
          /> */}
          <h3 className="mt-2 text-lg font-semibold md:text-xl">
            {selectedPersona?.persona_name || "Select a persona to preview"}
          </h3>
          {selectedPersona && (
            <>
              <p className="mt-2 text-sm text-gray-500">
                Persona ID:{" "}
                <span className="text-gray-700">
                  {selectedPersona?.persona_id}
                </span>
              </p>
              <p className="mb-4 mt-1 text-sm text-gray-500">
                Replica ID:{" "}
                <span className="text-gray-700">
                  {selectedPersona?.default_replica_id}
                </span>
              </p>
              <div className="w-full text-left">
                <p className="mb-1 text-sm font-semibold">System Prompt:</p>
                <div className="rounded-md bg-gray-100 p-3 text-sm text-gray-700">
                  {selectedPersona?.system_prompt}
                </div>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => {
            if (!selectedPersona) {
              toast.error("Please select a persona");
              return;
            }
            onSelectPersona(selectedPersona);
          }}
          className="mt-4 w-full rounded-md bg-pink-500 px-4 py-2 text-white"
        >
          Select
        </button>
      </div>
    </Modal>
  );
};

export default PersonaModal;
