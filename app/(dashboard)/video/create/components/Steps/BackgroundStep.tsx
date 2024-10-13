import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { getBackgroundUrls } from "@/lib/api/videoCreate";

const BackgroundStep = ({
  onNext,
  onPrev,
}: {
  onNext: (background: { background: string }) => void;
  onPrev: (background: { background: string }) => void;
}) => {
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the background data (from an API or static array)
    const fetchBackgrounds = async () => {
      setLoading(true);
      try {
        // Simulate fetching data (replace with actual API call)
        const backgroundData = await getBackgroundUrls();
        setBackgrounds(backgroundData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch backgrounds");
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

  if (loading) {
    return <Loading spinnerSrc="/assets/icons/spinner.svg" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="mt-4 rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() => onPrev({ background: selectedBackground || null })}
        >
          Prev
        </button>
        <button
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white"
          onClick={() => onNext({ background: selectedBackground || null })}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {backgrounds.map((background, index) => (
          <div
            key={index}
            className={`relative cursor-pointer border-2 p-4  text-gray-700 ${
              selectedBackground === background
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedBackground(background)}
          >
            <img
              src={background}
              alt={`background[${index}]`}
              className="h-32 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundStep;
