"use client";
import { useState, useEffect } from "react";
import { getConversations } from "@/lib/api/conversation";
import { Conversation } from "@/types/Conversation";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations().then((convs) => {
      setConversations(convs);
    });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust items per page here

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConversations = conversations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(conversations.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Conversations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Persona ID</th>
              <th className="p-3 text-left">Conversation ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {currentConversations.map((conv, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{conv.conversation_name}</td>
                <td className="p-3">{conv.persona_id}</td>
                <td className="p-3">{conv.conversation_id}</td>
                <td className="p-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    {conv.status}
                  </span>
                </td>
                <td className="p-3">{conv.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, conversations.length)} of{" "}
          {conversations.length} conversations
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
