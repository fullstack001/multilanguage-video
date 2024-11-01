"use client";
import React, { useState, useEffect } from "react";
import { translateContent } from "@/lib/api/videoCreate";
import { languageData } from "@/lib/languageData";

const ContentStep = ({
  onNext,
  onPrev,
  videoData,
}: {
  videoData: { content: string; language: string };
  onNext: (data: {
    content: string;
    originContent: string;
    language: string;
  }) => void;
  onPrev: (data: {
    content: string;
    originContent: string;
    language: string;
  }) => void;
}) => {
  const [content, setContent] = useState(videoData.content || "");
  const [language, setLanguage] = useState(videoData.language || "English");
  const [translatedContent, setTranslatedContent] = useState("");
  const [error, setError] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleLanguageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
  };

  const handleTranslate = async () => {
    if (language !== "English" && content) {
      setIsTranslating(true);
      try {
        const translated = await translateContent({
          text: content,
          targetLanguage: language,
        });
        setTranslatedContent(translated);
      } catch (error) {
        console.error("Translation error:", error);
        setError("Failed to translate content. Please try again.");
      } finally {
        setIsTranslating(false);
      }
    } else {
      setTranslatedContent("");
    }
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="mt-4 rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() =>
            onPrev({
              content: translatedContent || content,
              originContent: content,
              language,
            })
          }
        >
          Prev
        </button>
        <button
          disabled={!content}
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white disabled:opacity-50"
          onClick={() =>
            content &&
            onNext({
              content: translatedContent || content,
              originContent: content,
              language,
            })
          }
        >
          Next
        </button>
      </div>
      <textarea
        className="w-full rounded-lg border border-gray-300 p-2 text-gray-700"
        rows={5}
        placeholder="Enter the script here in English..."
        value={content}
        onChange={handleContentChange}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}

      <div className="mt-4">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700"
        >
          Select Language:
        </label>
        <div className="flex items-center gap-4">
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-800 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {languageData.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <div>
            <button
              onClick={handleTranslate}
              className="translate rounded-lg border bg-fuchsia-600 px-4 py-2 text-white"
            >
              {isTranslating ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>
      </div>
      {translatedContent && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold  text-gray-800">
            Translated Content:
          </h3>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-2 text-gray-700"
            rows={5}
            placeholder="Enter the script here..."
            value={translatedContent}
            onChange={(e) => setTranslatedContent(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ContentStep;
