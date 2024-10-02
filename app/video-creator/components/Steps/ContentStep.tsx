"use client";
import React, { useState } from "react";

const ContentStep = ({
  onNext,
  onPrev,
  videoData,
}: {
  videoData: { content: string };
  onNext: (content: { content: string }) => void;
  onPrev: (contetn: { content: string }) => void;
}) => {
  const [content, setContent] = useState(videoData.content || "");
  const [error, setError] = useState("");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= 7000) {
      setContent(newContent);
      setError("");
    } else {
      setError("Content must not exceed 7000 characters.");
    }
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="mt-4 rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() => onPrev({ content })}
        >
          Prev
        </button>
        <button
          disabled={!content || content.length > 7000}
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white disabled:opacity-50"
          onClick={() => content && onNext({ content })}
        >
          Next
        </button>
      </div>
      <textarea
        className="w-full rounded-lg border border-gray-300 p-2 text-gray-700"
        rows={5}
        placeholder="Enter the script here..."
        value={content}
        onChange={handleContentChange}
        maxLength={7000}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <p className="mt-2 text-gray-500">{content.length}/7000 characters</p>
    </div>
  );
};

export default ContentStep;
