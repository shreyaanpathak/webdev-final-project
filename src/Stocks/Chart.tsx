import { useState, useEffect, useRef } from "react";
import { Line as ChartLine } from "react-chartjs-2";
import { motion } from "framer-motion";
import { cardVariants } from "./constants/index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeframeButton = ({ timeframe, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-lg font-medium ${
      isSelected
        ? "bg-[#10B981] text-white"
        : "border border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
    } transition-all duration-200`}
  >
    {timeframe}
  </button>
);

export const Chart = ({ selectedStock }) => {
  const [timeframe, setTimeframe] = useState("1D");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!selectedStock) return;
      
      try {
        setLoading(true);
        const data = await getHistoricalPrices(selectedStock, timeframe);
        
        setChartData({
          labels: data.labels,
          datasets: [{
            label: selectedStock,
            data: data.prices,
            borderColor: "#FFD700",
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            fill: true,
            tension: 0.4,
          }],
        });
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [selectedStock, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        grid: { color: "rgba(16, 185, 129, 0.1)" },
        ticks: { color: "#10B981" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#10B981" },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <motion.div variants={cardVariants} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#FFB800]">Price History</h2>
        <div className="flex gap-2">
          {["1D", "1W", "1M", "3M", "6M", "1Y"].map((tf) => (
            <TimeframeButton
              key={tf}
              timeframe={tf}
              isSelected={timeframe === tf}
              onClick={() => setTimeframe(tf)}
            />
          ))}
        </div>
      </div>
      <div className="h-[500px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#10B981]">Loading chart data...</div>
          </div>
        ) : chartData ? (
          <ChartLine
            ref={chartRef}
            data={chartData}
            options={options}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#10B981]">Select a stock to view price history</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
