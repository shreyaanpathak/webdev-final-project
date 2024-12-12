import { useState, useEffect, useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { getHistoricalPrices } from "./client";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Timeframe = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y";

interface ChartData {
  labels: string[];
  prices: number[];
}

interface ChartProps {
  selectedStock?: string | null;
}

export const Chart = ({ selectedStock }: ChartProps) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("1D");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const gradient = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createLinearGradient(0, 0, 0, 400);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    return grad;
  }, []);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#1A1A1A',
        titleColor: '#10B981',
        bodyColor: '#FFB800',
        borderColor: '#10B981',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            return `$${value.toFixed(2)}`;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { 
          color: "rgba(16, 185, 129, 0.1)",
          drawBorder: false,
        },
        ticks: { 
          color: "#10B981",
          callback: function(value: any) {
            if (typeof value === 'number') {
              return `$${value.toFixed(2)}`;
            }
            return value;
          },
          font: {
            size: 12
          }
        },
        border: {
          display: false
        }
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: "#10B981",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
          font: {
            size: 12
          }
        },
        border: {
          display: false
        }
      },
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStock) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getHistoricalPrices(selectedStock, timeframe);
        console.log("Chart data received:", data);
        
        if (
          data &&
          Array.isArray(data.labels) &&
          Array.isArray(data.prices) &&
          data.labels.length === data.prices.length
        ) {
          if (data.labels.length === 0) {
            // No data available
            setChartData(null);
            setError("No data available for the selected timeframe.");
          } else {
            setChartData(data);
          }
        } else {
          setError("Invalid data format received");
          console.error("Invalid data format:", data);
          setChartData(null);
        }
      } catch (err) {
        console.error("Failed to fetch historical data:", err);
        setError(err instanceof Error ? err.message : "Failed to load chart data");
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [selectedStock, timeframe]);

  if (!selectedStock) {
    return (
      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20 h-[500px] flex items-center justify-center">
        <div className="text-[#10B981]">Select a stock to view price history</div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#FFB800]">Price History</h2>
        <div className="flex gap-2">
          {["1D", "1W", "1M", "3M", "6M", "1Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as Timeframe)}
              className={`px-3 py-1 rounded-lg font-medium ${
                timeframe === tf
                  ? "bg-[#10B981] text-white"
                  : "border border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
              } transition-all duration-200`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[500px] relative" style={{ minHeight: "400px" }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/50 backdrop-blur-sm z-10">
            <div className="text-[#10B981]">Loading...</div>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#FFB800]">{error}</div>
          </div>
        )}

        {chartData && !loading && !error && (
          <Line
            ref={canvasRef}
            data={{
              labels: chartData.labels,
              datasets: [{
                label: selectedStock,
                data: chartData.prices,
                borderColor: "#10B981",
                backgroundColor: gradient ? gradient : "rgba(16, 185, 129, 0.2)",
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#10B981",
                pointHoverBorderColor: "#10B981",
                pointHoverBorderWidth: 2,
                cubicInterpolationMode: 'monotone',
              }]
            }}
            options={options}
          />
        )}
      </div>
    </div>
  );
};
