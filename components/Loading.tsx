import React from "react";
import Image from "next/image";
// Pass the spinner SVG URL as a prop or import it directly
const Loading = ({
  spinnerSrc,
  text,
}: {
  spinnerSrc: string;
  text: string;
}) => {
  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center">
      <Image
        src={spinnerSrc}
        alt="Loading..."
        className="h-16 w-16"
        width={64}
        height={64}
      />
      <div className="mx-auto text-center text-sm font-semibold">{text}</div>
    </div>
  );
};

export default Loading;
