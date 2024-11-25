"use client";

import React, { useState } from "react";
import StepProgress from "./components/StepPrgress";
import AvatarStep from "./components/Steps/AvatarStep";
import ContentStep from "./components/Steps/ContentStep";
import BackgroundStep from "./components/Steps/BackgroundStep";
// import VoiceStep from "./components/Steps/VoiceStep";
import CreateVideoStep from "./components/Steps/CreateVideoStep";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";

const steps = [
  { component: AvatarStep, title: "Select Avatar" },
  { component: BackgroundStep, title: "Select Background" },
  { component: ContentStep, title: "Select Voice" },
  { component: CreateVideoStep, title: "Create Video" },
];

const VideoCreatorPage = () => {
  useAuthCheck();
  const [videoData, setVideoData] = useState({
    currentStep: 0,
    character: null,
    voice: null,
    background: null,
  });

  const handleNextStep = (data: any) => {
    setVideoData((prevData) => ({
      ...prevData,
      ...data,
      currentStep: prevData.currentStep + 1,
    }));
  };
  const handleprevStep = (data: any) => {
    setVideoData((prevData) => ({
      ...prevData,
      ...data,
      currentStep: prevData.currentStep - 1,
    }));
  };
  console.log(videoData);

  const StepComponent = steps[videoData.currentStep].component;

  return (
    <div className="p-6 ">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        {steps[videoData.currentStep].title}
      </h1>
      <StepProgress currentStep={videoData.currentStep} />
      <StepComponent
        onNext={handleNextStep}
        onPrev={handleprevStep}
        videoData={videoData} // Add language property
      />
    </div>
  );
};

export default VideoCreatorPage;
