"use client";

import InteractiveAvatar from "@/components/interactive/InteractiveAvatar";
export default function App() {
  return (
    <div className="flex  flex-col">
      <div className="mx-auto flex w-[900px] flex-col items-start justify-start gap-5 pb-20 pt-4">
        <div className="w-full">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}
