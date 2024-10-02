"use client";

import React, { useState } from "react";
import StepProgress from "./components/StepPrgress";
import AvatarStep from "./components/Steps/AvatarStep";
import ContentStep from "./components/Steps/ContentStep";
import BackgroundStep from "./components/Steps/BackgroundStep";
import VoiceStep from "./components/Steps/VoiceStep";
import CreateVideoStep from "./components/Steps/CreateVideoStep";

const steps = [
  { component: AvatarStep, title: "Select Avatar" },
  { component: BackgroundStep, title: "Select Avatar" },
  { component: ContentStep, title: "Write Content" },
  { component: VoiceStep, title: "Select Language & Avatar" },
  { component: CreateVideoStep, title: "Create Video" },
];

const VideoCreatorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoData, setVideoData] = useState({
    avatar: null,
    content: "",
    background: null,
    language: "",
    voice: null,
    audioUrl: "",
  });

  const handleNextStep = (data: any) => {
    console.log(data);
    setVideoData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleprevStep = (data: any) => {
    setCurrentStep(currentStep - 1);
  };

  console.log(videoData);

  const StepComponent = steps[currentStep].component;

  return (
    <div className="p-6 ">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        {steps[currentStep].title}
      </h1>
      <StepProgress currentStep={currentStep} />
      <StepComponent
        onNext={handleNextStep}
        onPrev={handleprevStep}
        videoData={videoData} // Make sure this prop is also present
      />
    </div>
  );
};

export default VideoCreatorPage;
