import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Enero", created: 40, exported: 20, deleted: 10 },
  { name: "Febrero", created: 30, exported: 25, deleted: 15 },
  { name: "Marzo", created: 50, exported: 30, deleted: 20 },
  // Continue data
];

const VideoHistoryChartComponent = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-bold">Historial de mis videos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="created" stroke="#8884d8" />
          <Line type="monotone" dataKey="exported" stroke="#82ca9d" />
          <Line type="monotone" dataKey="deleted" stroke="#ff5f5f" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VideoHistoryChartComponent;
