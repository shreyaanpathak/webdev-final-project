import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { cardVariants } from "./constants";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";

export const PerformanceMetrics = () => {
    const [timeframe, setTimeframe] = useState("1M");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [performanceData, setPerformanceData] = useState<{
        labels: string[];
        portfolio: number[];
        benchmark: number[];
    }>({
        labels: [],
        portfolio: [],
        benchmark: []
    });

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            if (!currentUser?._id) return;

            try {
                setLoading(true);
                setError(null);
                const data = await client.getPerformanceMetrics(currentUser._id, timeframe);
                setPerformanceData(data);
            } catch (err) {
                console.error("Failed to fetch performance data:", err);
                setError(err instanceof Error ? err.message : "Failed to load performance data");
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();
    }, [currentUser?._id, timeframe]);

    const lineData = {
        labels: performanceData.labels,
        datasets: [
            {
                label: 'Portfolio',
                data: performanceData.portfolio,
                borderColor: '#10B981',
                tension: 0.4,
            },
            {
                label: 'S&P 500',
                data: performanceData.benchmark,
                borderColor: '#FFB800',
                tension: 0.4,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#10B981',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                grid: { 
                    color: "rgba(16, 185, 129, 0.05)",
                    drawBorder: false
                },
                ticks: { 
                    color: "#10B981",
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12
                    }
                }
            },
            x: {
                grid: { display: false },
                ticks: { 
                    color: "#10B981",
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#FFB800]">Performance Metrics</h2>
                <div className="flex gap-2">
                    {["1M", "3M", "YTD", "ALL"].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
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
            
            <div className="h-[650px] relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#141414]/50 backdrop-blur-sm">
                        <div className="text-[#10B981]">Loading...</div>
                    </div>
                )}

                {error && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-red-500">{error}</div>
                    </div>
                )}

                {!loading && !error && performanceData.labels.length > 0 && (
                    <Line data={lineData} options={options} />
                )}
            </div>
        </motion.div>
    );
};
