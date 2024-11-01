import React from "react";

const videos = [
  {
    title: "Aquí va el título del video",
    createdBy: "Oscar Acosta",
  },
  {
    title: "Aquí va el título del video",
    createdBy: "Oscar Acosta",
  },
  {
    title: "Aquí va el título del video",
    createdBy: "Oscar Acosta",
  },
];

const RecentVideos = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-bold">Latest videos generated</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {videos.map((video, index) => (
          <div key={index} className="rounded-lg bg-gray-100 p-4 text-center">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-300">
              <span className="text-gray-500">Vista previa</span>
            </div>
            <p className="font-semibold">video title</p>

            <button className="mt-4 rounded-full bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVideos;
