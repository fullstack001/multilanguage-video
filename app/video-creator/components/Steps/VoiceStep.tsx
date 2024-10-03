import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Voice } from "@/types/Voice";
import { getVoice, createAudio } from "@/lib/api/videoCreate";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa"; // Import play and stop icons
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VoiceStep = ({
  onNext,
  onPrev,
  videoData,
}: {
  videoData: {
    voice: Voice;
    language: string;
    content: string;
    audioUrl: string;
  };
  onNext: (selectedData: {
    voice: Voice;
    language: string;
    audioUrl: string;
  }) => void;
  onPrev: (selectedData: {
    voice: Voice;
    language: string;
    audioUrl: string;
  }) => void;
}) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(
    videoData.voice || null,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    videoData.language || null,
  );
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // For playing audio
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // Track the ID of the currently playing voice
  const [createdAudioUrl, setCreatedAudioUrl] = useState<string | null>(null);
  const [isCreatingAudio, setIsCreatingAudio] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  useEffect(() => {
    const fetchVoice = async () => {
      setLoading(true);
      try {
        const voiceList = await getVoice(); // Fetch voice list
        setVoices(voiceList);

        // Extract unique languages from the voices and sort them alphabetically
        const uniqueLanguages = Array.from(
          new Set(voiceList.map((voice) => voice.locale)),
        ).sort((a, b) => a.localeCompare(b)); // Sort languages alphabetically

        setLanguages(uniqueLanguages); // Set the unique and sorted languages
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchVoice();
  }, []);

  // Handle language selection
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);

    // Filter the voices based on the selected language
    const filtered = voices.filter((voice) => voice.locale === language);
    setFilteredVoices(filtered);
    setSelectedVoice(null); // Reset the selected voice when language changes
  };

  // Handle playing audio
  const handlePlayAudio = (previewUrl: string, voiceId: string) => {
    if (audio) {
      audio.pause(); // Pause any currently playing audio
    }

    const newAudio = new Audio(previewUrl);
    setAudio(newAudio);
    newAudio.play();
    setIsPlaying(voiceId); // Set the ID of the currently playing voice

    // Listen for when the audio ends to reset the playing state
    newAudio.onended = () => {
      setIsPlaying(null);
    };
  };

  // Handle stopping audio
  const handleStopAudio = () => {
    if (audio) {
      audio.pause(); // Stop the currently playing audio
      setIsPlaying(null); // Reset the playing state
    }
  };

  const handleCreateAudio = async () => {
    if (!selectedVoice || !videoData.content) return;
    setIsCreatingAudio(true);
    try {
      const audioUrl = await createAudio(selectedVoice, videoData.content);
      setCreatedAudioUrl(`${API_URL}/api/get-audio/${audioUrl}`);
    } catch (error) {
      console.error("Error creating audio:", error);
    } finally {
      setIsCreatingAudio(false);
    }
  };

  const handlePreviewAudio = () => {
    if (createdAudioUrl) {
      if (isPreviewPlaying) {
        handleStopAudio();
      } else {
        handlePlayAudio(createdAudioUrl, "preview");
      }
      setIsPreviewPlaying(!isPreviewPlaying);
    }
  };

  if (loading) {
    // Show loading spinner while avatars are being fetched
    return <Loading spinnerSrc="/assets/icons/spinner.svg" />;
  }

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="mt-4 rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() =>
            selectedVoice && selectedLanguage
              ? onPrev({
                  voice: selectedVoice,
                  language: selectedLanguage,
                  audioUrl: createdAudioUrl,
                })
              : null
          }
        >
          Prev
        </button>
        <button
          disabled={!selectedVoice}
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white"
          onClick={() =>
            selectedVoice &&
            onNext({
              voice: selectedVoice,
              language: selectedLanguage,
              audioUrl: createdAudioUrl,
            })
          }
        >
          Next
        </button>
      </div>
      {/* Add Create Audio and Preview buttons */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="rounded-xl bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
          onClick={handleCreateAudio}
          disabled={!selectedVoice || isCreatingAudio}
        >
          {isCreatingAudio ? "Creating..." : "Create Audio"}
        </button>
        <button
          className="flex items-center rounded-xl bg-green-500 px-4 py-2 text-white disabled:bg-gray-400"
          onClick={handlePreviewAudio}
          disabled={!createdAudioUrl}
        >
          {isPreviewPlaying ? (
            <>
              <FaStopCircle className="mr-2" />
              Stop
            </>
          ) : (
            <>
              <FaPlayCircle className="mr-2" />
              Preview
            </>
          )}
        </button>
      </div>

      {/* Language selection */}
      <div className="mb-4">
        <label
          htmlFor="language"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select Language:
        </label>
        <select
          id="language"
          className="w-full rounded border-gray-300 text-gray-700"
          value={selectedLanguage || ""}
          onChange={(e) => handleLanguageSelect(e.target.value)}
        >
          <option value="" disabled>
            -- Select Language --
          </option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {/* Voice selection */}
      {selectedLanguage && (
        <div>
          <h3 className=" text-gray-700">
            Select a Voice for {selectedLanguage}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {filteredVoices.map((voice) => (
              <div
                key={voice.id}
                className={`relative cursor-pointer border p-4 text-gray-700 ${
                  selectedVoice === voice
                    ? "border-purple-500"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedVoice(voice)}
              >
                {/* Display the image for each voice */}
                <img
                  src={voice.imageUrl}
                  alt={voice.displayName}
                  className="mb-2 h-32 w-32 object-cover"
                />
                <p>{voice.displayName}</p>
                <p className="text-sm text-gray-600">
                  {voice.gender} - {voice.locale} - {voice.ageRange} -{" "}
                  {voice.speakerType}
                </p>
                {/* Play/Stop button if the voice has a sampleTtsUrl */}
                {voice.speakerStyles[0]?.sampleTtsUrl && (
                  <div className="absolute bottom-4 right-4 flex cursor-pointer items-center space-x-2 text-blue-500">
                    {isPlaying === voice.id ? (
                      <div
                        className="flex cursor-pointer items-center space-x-2"
                        onClick={handleStopAudio}
                      >
                        <FaStopCircle size={24} />
                        <span>Stop</span>
                      </div>
                    ) : (
                      <div
                        className="flex cursor-pointer items-center space-x-2"
                        onClick={() => {
                          const previewUrl =
                            voice.speakerStyles[0].sampleTtsUrl;
                          if (previewUrl) {
                            handlePlayAudio(previewUrl, voice.id);
                          }
                        }}
                      >
                        <FaPlayCircle size={24} />
                        <span>Play</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceStep;
