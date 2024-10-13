"use client";

import Card from "./components/Card";
import DiskUsage from "./components/DiskUsage";
import VideoHistoryChart from "./components/VideoHistoryChart";
import { FiUsers, FiFile, FiCheckCircle, FiFilm } from "react-icons/fi";
import RecentVideos from "./components/RecentVideos";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";

const DashboardPage = () => {
  useAuthCheck();
  return (
    <>
      <div className="mb-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Active plan"
          value="4"
          icon={<FiFile />}
          imgsrc="assets/icons/idea.svg"
          bgColor="dashcard1"
          classProps="bg-dashcard1"
        />
        <Card
          title="Created videos"
          value="45"
          icon={<FiCheckCircle />}
          imgsrc="assets/icons/ui_design.svg"
          bgColor="dashcard2"
          classProps="bg-dashcard2"
        />
        <Card
          title="Created videos"
          value="300"
          icon={<FiUsers />}
          imgsrc="assets/icons/teamwork.svg"
          bgColor="dashcard3"
          classProps="bg-dashcard3"
        />
        <Card
          title="Created Canpaign"
          value="4000"
          icon={<FiFilm />}
          imgsrc="assets/icons/startup.svg"
          bgColor="dashcard4"
          classProps="bg-dashcard4"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
        {/* Disk Usage */}
        <div className="lg:col-span-1">
          <DiskUsage />
        </div>

        {/* Video History and Recent Videos */}
        <div className="space-y-6 lg:col-span-3">
          <VideoHistoryChart />
          <RecentVideos />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
