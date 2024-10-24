import React from "react";
import Image from "next/image";
// Pass the spinner SVG URL as a prop or import it directly
const Loading = ({ spinnerSrc }: { spinnerSrc: string }) => {
  return (
    <div className="mt-10 flex h-full items-center justify-center">
      <Image
        src={spinnerSrc}
        alt="Loading..."
        className="h-16 w-16"
        width={64}
        height={64}
      />
    </div>
  );
};

export default Loading;
