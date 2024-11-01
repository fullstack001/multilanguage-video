"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DiskUsage = () => {
  // Data for main disk usage
  const diskData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [96, 4], // 96% used, 4% free
        backgroundColor: ["#7C3AED", "#E5E7EB"], // Purple for used, gray for free
        hoverBackgroundColor: ["#A78BFA", "#D1D5DB"],
      },
    ],
  };

  const options = {
    cutout: "80%", // Size of the doughnut hole
    responsive: true,
    maintainAspectRatio: false, // Ensure we can control the aspect ratio manually
    plugins: {
      legend: {
        display: false, // Hide legend to show usage percentage
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      {/* Main Disk Usage Chart */}
      <div className="relative mb-4 h-40">
        <Doughnut data={diskData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
          96%
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button className="mt-4 rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
          Improve plan
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Your plan will renew on 11/24/24
        </p>

        <div className="mt-6 text-sm text-gray-700">
          <p className="mb-2 font-semibold">Summary of your plan</p>
          <ul className="space-y-2">
            <li>Disk space: 500MBB</li>
            <li>Videos per month: 30</li>
            <li>Maximum length per video: 3 min</li>
            <li>Number of languages: 80</li>
            <li>Number of voices: 100</li>
            {/* <li>Acceso a plantillas: Sí</li>
            <li>Banco de sonidos: Sí</li>
            <li>Banco PEXEL: Sí</li>
            <li>Banco PIXABAY: No</li>
            <li>Banco UNSPLASH: No</li>
            <li>Usuarios autorizados: 0</li>
            <li>Contenido PRO: No</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiskUsage;
