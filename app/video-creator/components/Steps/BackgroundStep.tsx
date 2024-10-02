import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading"; // Assume you have the loading spinner component
import { Background } from "@/types/Background";
import { getBackgroundUrls } from "@/lib/api/videoCreate";

const BackgroundStep = ({
  onNext,
  onPrev,
}: {
  onNext: (background: { background: Background }) => void;
  onPrev: (background: { background: Background }) => void;
}) => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] =
    useState<Background | null>(null);
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
        setSelectedBackground(backgroundData[0]);
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
          onClick={() =>
            selectedBackground
              ? onPrev({ background: selectedBackground })
              : null
          }
        >
          Prev
        </button>
        <button
          disabled={!selectedBackground}
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white"
          onClick={() =>
            selectedBackground && onNext({ background: selectedBackground })
          }
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {backgrounds.map((background) => (
          <div
            key={background.id}
            className={`relative cursor-pointer border p-4  text-gray-700 ${
              selectedBackground?.id === background.id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedBackground(background)}
          >
            <img
              src={background.src.original}
              alt={background.alt}
              className="h-32 w-full object-cover"
            />
            <p className="mt-2 text-center">{background.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundStep;
