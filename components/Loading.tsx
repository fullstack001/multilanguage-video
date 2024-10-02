import React from "react";

// Pass the spinner SVG URL as a prop or import it directly
const Loading = ({ spinnerSrc }: { spinnerSrc: string }) => {
  return (
    <div className="mt-10 flex h-full items-center justify-center">
      <img src={spinnerSrc} alt="Loading..." className="h-16 w-16" />
    </div>
  );
};

export default Loading;
