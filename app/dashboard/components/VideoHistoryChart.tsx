"use client";

import React from "react";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const VideoHistoryChart = () => {
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
    ],
    datasets: [
      {
        label: "Videos creados",
        data: [12, 19, 3, 5, 2, 3, 10, 15],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        fill: false,
      },
      {
        label: "Videos exportados",
        data: [2, 3, 20, 5, 1, 4, 7, 8],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Correct typing for position
      },
      tooltip: {
        mode: "index" as const, // Correct typing for mode
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Meses",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Cantidad de Videos",
        },
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Historial videos</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default VideoHistoryChart;
