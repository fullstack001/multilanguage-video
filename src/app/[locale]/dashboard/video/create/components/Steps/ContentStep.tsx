"use client";
import React, { useState, useEffect, useRef } from "react";
import CountryFlag from "react-country-flag";
import { MdMoreVert, MdTranslate } from "react-icons/md";
import { Voice } from "@/types/Voice";
import { getVoice } from "@/lib/api/heygen";
import SelectVoiceModal from "@/components/SelectVoiceModal";
import TranslateModal from "@/components/TransalteModal";
const moods = [
  { label: "Excited", emoji: "😃" }, // Grinning Face with Big Eyes
  { label: "Friendly", emoji: "😊" }, // Smiling Face with Smiling Eyes
  { label: "Serious", emoji: "😐" }, // Neutral Face
  { label: "Soothing", emoji: "😌" }, // Relieved Face
  { label: "Broadcaster", emoji: "🎤" }, // Microphone
];

const ContentStep = ({
  onNext,
  onPrev,
  videoData,
}: {
  videoData: { voice: object };
  onNext: (data: { voice: object | null }) => void;
  onPrev: (data: { voice: object }) => void;
}) => {
  const [voice, setVoice] = useState<object | null>(videoData.voice || null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [text, setText] = useState<string>("");
  const [voiceType, setVoiceType] = useState<string>("text");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("Friendly");
  const [speed, setSpeed] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isTranslateModalOpen, setIsTranslateModalOpen] =
    useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchVoices = async () => {
      const voices = await getVoice();
      setVoices(voices.voices);
      setSelectedVoice(voices.voices[0]);
    };
    fetchVoices();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const voiceSetting = () => {
    if (voiceType === "text") {
      return {
        voice: {
          voice_id: selectedVoice?.voice_id,
          speed: speed,
          pitch: pitch,
          emotion: selectedEmoji,
          input_text: text,
          type: "text",
        },
      };
    }
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="mt-4 rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() =>
            onPrev({
              voice: null,
            })
          }
        >
          Prev
        </button>
        <button
          disabled={!selectedVoice && !text}
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white disabled:opacity-50"
          onClick={() => onNext(voiceSetting())}
        >
          Next
        </button>
      </div>
      <div className="my-4 flex flex-col space-x-4">
        <label className="mb-2 flex items-center text-lg font-bold">
          <input
            type="radio"
            value="text"
            checked={voiceType === "text"}
            onChange={() => setVoiceType("text")}
            className="mr-2 h-5 w-5"
          />
          <span className="w-full rounded  bg-blue-200 p-2">Text Script</span>
        </label>
        {voiceType === "text" && (
          <div className="rounded-lg border bg-gray-100 p-4">
            <div className="mx-auto  w-full  rounded-lg bg-gray-800 p-4 text-white shadow-md">
              <div className=" flex justify-between">
                <div className="flex items-center">
                  <div
                    className="flex cursor-pointer rounded-xl border p-3 font-semibold shadow-md"
                    onClick={toggleModal}
                  >
                    {selectedVoice?.language} -{selectedVoice?.name}
                  </div>
                  <select
                    value={selectedEmoji}
                    onChange={(e) => setSelectedEmoji(e.target.value)}
                    className="ml-2 h-10 bg-transparent "
                  >
                    {moods.map((mood) => (
                      <option key={mood.label} value={mood.label}>
                        {mood.emoji} {mood.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative flex" ref={dropdownRef}>
                  {isDropdownOpen && (
                    <div className=" absolute right-10 top-2 rounded-lg bg-gray-800 p-4 shadow-lg">
                      <div className="flex flex-col">
                        <label className="flex items-center">
                          <span className="w-16">Speed</span>
                          <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            defaultValue="1"
                            className="ml-2"
                          />
                        </label>
                        <label className="flex items-center">
                          <span className="w-16">Pitch</span>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            step="1"
                            defaultValue="0"
                            className="ml-2"
                          />
                        </label>
                        <button
                          className="mt-2 rounded bg-purple-500 px-4 py-2 text-white"
                          onClick={() => setIsTranslateModalOpen(true)}
                        >
                          Translate
                        </button>
                      </div>
                    </div>
                  )}
                  <MdTranslate
                    className="mr-2 cursor-pointer text-2xl text-gray-300"
                    onClick={() => setIsTranslateModalOpen(true)}
                  />
                  <MdMoreVert
                    className="cursor-pointer text-2xl text-gray-300"
                    onClick={toggleDropdown}
                  />
                </div>
              </div>
              <div className="mt-10 text-sm md:mt-16  ">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-auto w-full rounded-lg border bg-gray-700 p-2 text-white"
                  placeholder="Enter your script here"
                ></textarea>
                <p></p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="my-4 flex flex-col space-x-4">
        <label className="mb-2  flex items-center text-lg font-bold">
          <input
            type="radio"
            value="image"
            checked={voiceType === "audio"}
            onChange={() => setVoiceType("audio")}
            className="mr-2 h-5 w-5"
          />
          <span className="w-full rounded bg-blue-200 p-2">Audio Script</span>
        </label>
        {voiceType === "audio" && (
          <div className="rounded-lg border bg-gray-100 p-4">
            <p>Comming Soon</p>
            {/* Add image upload component here */}
          </div>
        )}
      </div>
      {isModalOpen && (
        <SelectVoiceModal
          onClose={toggleModal}
          voices={voices}
          selectVoic={(voice) => setSelectedVoice(voice)}
        />
      )}
      {isTranslateModalOpen && (
        <TranslateModal
          onClose={() => setIsTranslateModalOpen(false)}
          text={text}
          changeText={(text) => setText(text)}
        />
      )}
    </div>
  );
};

export default ContentStep;
