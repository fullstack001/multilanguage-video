import type { StartAvatarResponse } from "@heygen/streaming-avatar";

import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Spinner,
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useMemoizedFn, usePrevious } from "ahooks";

import InteractiveAvatarTextInput from "./InteractiveAvatarTextInput";
import SelectVoiceModal from "../SelectVoiceModal";
import Loading from "../Loading";

import { AVATARS, STT_LANGUAGE_LIST } from "@/lib/constans";
import { getAccessToken, getVoice } from "@/lib/api/heygen";
import { Prompt } from "./prompt";
import { Voice } from "@/types/Voice";

export default function InteractiveAvatar() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [knowledgeId, setKnowledgeId] = useState<string>("");
  const [fullPrompt, setFullPrompt] = useState<string>(Prompt);
  const [voice, setVoice] = useState<Voice>(null);
  const [voices, setVoices] = useState<Voice[]>([]);

  const [applyPrompt, setApplyPrompt] = useState<boolean>(false);
  const [avatarId, setAvatarId] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  const [data, setData] = useState<StartAvatarResponse>();
  const [text, setText] = useState<string>("");
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const [chatMode, setChatMode] = useState("text_mode");
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoiceModal, setIsVoiceModal] = useState<boolean>(false);

  async function fetchAccessToken() {
    try {
      const token = await getAccessToken();

      console.log("Access Token:", token); // Log the token to verify

      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }

    return "";
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
      console.log("Avatar started talking", e);
    });
    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
      console.log("Avatar stopped talking", e);
    });
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log("Stream disconnected");
      endSession();
    });
    avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
      console.log(">>>>> Stream ready:", event.detail);
      setStream(event.detail);
    });
    avatar.current?.on(StreamingEvents.USER_START, (event) => {
      console.log(">>>>> User started talking:", event);
      setIsUserTalking(true);
    });
    avatar.current?.on(StreamingEvents.USER_STOP, (event) => {
      console.log(">>>>> User stopped talking:", event);
      setIsUserTalking(false);
    });
    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: avatarId,
        knowledgeBase: applyPrompt ? fullPrompt : undefined,
        knowledgeId: applyPrompt ? undefined : knowledgeId, // Or use a custom `knowledgeBase`.
        voice: {
          voiceId: voice?.voice_id,
          rate: 1, // 0.5 ~ 1.5
          emotion: VoiceEmotion.EXCITED,
        },
        language: language,
        disableIdleTimeout: true,
      });

      setData(res);
      // default to voice mode
      await avatar.current?.startVoiceChat({
        useSilencePrompt: false,
      });
      setChatMode("voice_mode");
    } catch (error) {
      console.error("Error starting avatar session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  }
  async function handleSpeak() {
    setIsLoadingRepeat(true);
    if (!avatar.current) {
      setDebug("Avatar API not initialized");

      return;
    }
    // speak({ text: text, task_type: TaskType.REPEAT })
    await avatar.current
      .speak({ text: text, taskType: TaskType.TALK, taskMode: TaskMode.SYNC })
      .catch((e) => {
        setDebug(e.message);
      });
    setIsLoadingRepeat(false);
  }
  async function handleInterrupt() {
    if (!avatar.current) {
      setDebug("Avatar API not initialized");

      return;
    }
    await avatar.current.interrupt().catch((e) => {
      setDebug(e.message);
    });
  }
  async function endSession() {
    await avatar.current?.stopAvatar();
    setStream(undefined);
  }

  const handleChangeChatMode = useMemoizedFn(async (v) => {
    if (v === chatMode) {
      return;
    }
    if (v === "text_mode") {
      avatar.current?.closeVoiceChat();
    } else {
      await avatar.current?.startVoiceChat();
    }
    setChatMode(v);
  });

  const previousText = usePrevious(text);
  useEffect(() => {
    if (!previousText && text) {
      avatar.current?.startListening();
    } else if (previousText && !text) {
      avatar?.current?.stopListening();
    }
  }, [text, previousText]);

  useEffect(() => {
    const fetchVoice = async () => {
      try {
        const voices = await getVoice();
        setVoices(voices.voices);
      } catch (error) {
        console.error("Error fetching voices:", error); // Log the error
      }
    };
    fetchVoice();

    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      };
      console.log("Stream URL:", stream);
    }
  }, [mediaStream, stream]);

  const openEditBase = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Card>
        <CardBody className="flex  flex-col items-center justify-center">
          {stream ? (
            <div className="flex h-[500px] w-auto items-center justify-center overflow-hidden rounded-lg">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              >
                <track kind="captions" />
              </video>
              <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                <Button
                  className="rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white"
                  size="md"
                  variant="shadow"
                  onClick={handleInterrupt}
                >
                  Interrupt task
                </Button>
                <Button
                  className="rounded-lg bg-gradient-to-tr from-indigo-500  to-indigo-300 text-white"
                  size="md"
                  variant="shadow"
                  onClick={endSession}
                >
                  End session
                </Button>
                <Button
                  className="rounded-lg bg-gradient-to-tr from-indigo-500  to-indigo-300 text-white"
                  size="md"
                  variant="shadow"
                  onClick={() => alert("Developing Now")}
                >
                  {`<>`}Integration
                </Button>
                <Button
                  className="rounded-lg bg-gradient-to-tr from-indigo-500  to-indigo-300 text-white"
                  size="md"
                  variant="shadow"
                  onClick={() => alert("Developing Now")}
                >
                  Share
                </Button>
              </div>
            </div>
          ) : !isLoadingSession ? (
            <div className="flex h-full w-[500px] flex-col items-center justify-center gap-8 self-center">
              <div className="flex w-full flex-col gap-2">
                <button
                  onClick={openEditBase}
                  className="rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-300 p-2 text-lg font-medium text-white hover:from-indigo-600 hover:to-indigo-400"
                >
                  System Prompt
                </button>

                <p className="text-sm font-medium leading-none">
                  Select Avatar:
                </p>

                <select
                  className="mb-6"
                  placeholder=" Or select one from these example avatars"
                  onChange={(e) => {
                    setAvatarId(e.target.value);
                  }}
                >
                  {AVATARS.map((avatar) => (
                    <option key={avatar.avatar_id} value={avatar.avatar_id}>
                      {avatar.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm font-medium leading-none">
                  Select Language:
                </p>
                <select
                  className="mb-6"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                >
                  {STT_LANGUAGE_LIST.map((lang) => (
                    <option key={lang.key} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setIsVoiceModal(true)}
                  className="rounded-lg bg-cyan-600 p-2 text-sm font-medium leading-none text-white hover:bg-cyan-700"
                >
                  Select Voice:
                  {voice ? ` ${voice.language} - ${voice.name}` : ""}
                </button>
              </div>
              <Button
                className="w-full rounded-xl bg-gradient-to-tr from-orange-700 to-indigo-300 p-4 text-lg text-white"
                size="md"
                variant="shadow"
                onClick={startSession}
              >
                Start session
              </Button>
            </div>
          ) : (
            <Loading
              spinnerSrc="/assets/icons/spinner.svg"
              text="Generating Avatar"
            />
          )}
        </CardBody>
        {stream && (
          <>
            <Divider />
            <CardFooter className="relative flex flex-col gap-3">
              <Tabs
                aria-label="Options"
                selectedKey={chatMode}
                onSelectionChange={(v) => {
                  handleChangeChatMode(v);
                }}
                className="border-b-2 border-gray-300"
              >
                <Tab
                  key="text_mode"
                  title="Text mode"
                  className={`px-4 py-2 ${
                    chatMode === "text_mode"
                      ? "border-b-2 border-blue-600 font-bold text-blue-600"
                      : "text-gray-500"
                  }`}
                />
                <Tab
                  key="voice_mode"
                  title="Voice mode"
                  className={`px-4 py-2 ${
                    chatMode === "voice_mode"
                      ? "border-b-2 border-blue-600 font-bold text-blue-600"
                      : "text-gray-500"
                  }`}
                />
              </Tabs>
              {chatMode === "text_mode" ? (
                <div className="relative flex w-full">
                  <InteractiveAvatarTextInput
                    disabled={!stream}
                    input={text}
                    label=""
                    loading={isLoadingRepeat}
                    placeholder="Type something for the avatar to respond"
                    setInput={setText}
                    onSubmit={handleSpeak}
                  />
                  {text && (
                    <Chip className="absolute right-16 top-3">Listening</Chip>
                  )}
                </div>
              ) : (
                <div className="w-full text-center">
                  <Button
                    isDisabled={!isUserTalking}
                    className="bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white"
                    size="md"
                    variant="shadow"
                  >
                    {isUserTalking ? "Listening" : "Voice chat"}
                  </Button>
                </div>
              )}
            </CardFooter>
          </>
        )}
      </Card>

      <Modal
        className="rounded-lg p-4"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="modal-header p-2 px-4">
          <h2 className="text-2xl font-bold">Language Learning Partner</h2>
        </div>
        <div className="modal-body p-2 px-4">
          <p className="text-lg font-medium">full prompt:</p>
          <textarea
            name=""
            id=""
            className="min-h-[300px] w-full"
            value={fullPrompt}
            onChange={(e) => setFullPrompt(e.target.value)}
          ></textarea>
        </div>
        <div className="modal-footer flex justify-between gap-2 p-2 px-4">
          <Button
            className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
          <Button
            className="rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-300 p-2 text-white hover:from-indigo-600 hover:to-indigo-400"
            onClick={() => {
              setApplyPrompt(true);
              setIsModalOpen(false);
            }}
          >
            Save and apply
          </Button>
        </div>
      </Modal>
      {isVoiceModal && (
        <SelectVoiceModal
          onClose={() => setIsVoiceModal(false)}
          voices={voices}
          selectVoic={(voice) => setVoice(voice)}
        />
      )}
    </div>
  );
}
