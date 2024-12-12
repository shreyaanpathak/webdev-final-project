// components/StatsGrid.tsx
import { FaChartLine, FaBriefcase, FaUserTie, FaFileContract } from "react-icons/fa";
import { MotionStats } from "./MotionStats";

const stats = [
  {
    icon: <FaChartLine />,
    title: "Portfolio Growth",
    value: "32%",
    desc: "Past Year",
  },
  { icon: <FaBriefcase />, title: "Clients", value: "150+", desc: "Active" },
  { icon: <FaUserTie />, title: "Experience", value: "15", desc: "Years" },
  {
    icon: <FaFileContract />,
    title: "AUM",
    value: "$85M",
    desc: "Total Assets",
  },
];

export const StatsGrid = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat, index) => (
      <MotionStats key={index}>
        <div className="bg-gradient-to-br from-green-900/20 to-black border 
                      border-green-500/20 rounded-xl p-4 hover:border-yellow-500/50 
                      transition-all duration-300">
          <div className="text-yellow-500 text-3xl mb-2">{stat.icon}</div>
          <div className="text-green-500/80 text-sm">{stat.title}</div>
          <div className="text-yellow-500 text-2xl font-bold mt-1">{stat.value}</div>
          <div className="text-green-500/60 text-sm">{stat.desc}</div>
        </div>
      </MotionStats>
    ))}
  </div>
);
