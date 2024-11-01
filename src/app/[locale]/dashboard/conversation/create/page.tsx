"use client";
import React, { useState } from "react";

const ConversationCreatePage: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState("Ari");
  const [selectedReplica, setSelectedReplica] = useState("Aaliyah - Office");

  return (
    <div className="flex flex-col gap-6 p-6 lg:flex-row">
      {/* Left Section - Form Area */}
      <div className="rounded-lg bg-white p-6 shadow-md lg:w-1/3">
        <h2 className="mb-4 text-xl font-bold">Persona</h2>
        <select
          value={selectedPersona}
          onChange={(e) => setSelectedPersona(e.target.value)}
          className="mb-4 w-full rounded-md border p-2"
        >
          <option value="Ari">Ari</option>
        </select>

        <h2 className="mb-4 text-xl font-bold">Replica</h2>
        <div className="mb-4 flex items-center gap-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Aaliyah - Office"
            className="h-10 w-10 rounded-full"
          />
          <p>{selectedReplica}</p>
        </div>

        <h2 className="mb-4 text-xl font-bold">Conversation Name (optional)</h2>
        <input
          type="text"
          placeholder="Enter a name for your conversation"
          className="mb-4 w-full rounded-md border p-2"
        />

        <h2 className="mb-4 text-xl font-bold">
          Conversation Context (optional)
        </h2>
        <textarea
          placeholder="Enter context for your conversation"
          className="mb-4 w-full rounded-md border p-2"
          rows={3}
        ></textarea>

        <button className="mt-4 w-full rounded-md bg-pink-500 py-2 text-white">
          Create Conversation
        </button>
      </div>

      {/* Right Section - Preview Area */}
      <div className="rounded-lg bg-white p-6 shadow-md lg:w-2/3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Conversation Name</h2>
        </div>

        <div className="mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
          <p className="text-center">
            In preview mode, sound and face animations are off
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">Generated Conversations</h3>
          <div className="mb-2 flex items-center justify-between">
            <p>New Conversation 1730217054796</p>
            <span className="rounded-md bg-green-100 px-2 py-1 text-green-500">
              Ended
            </span>
          </div>
          <p className="text-gray-500">October 29, 5:50 pm</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationCreatePage;
