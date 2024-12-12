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
                    pointRadius: window.innerWidth < 768 ? 1 : 3, // Smaller points on mobile
                },
                {
                    label: 'S&P 500',
                    data: performanceData.benchmark,
                    borderColor: '#FFB800',
                    tension: 0.4,
                    pointRadius: window.innerWidth < 768 ? 1 : 3, // Smaller points on mobile
                }
            ],
        };
    
        // Modified options with responsive configurations
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: window.innerWidth < 768 ? 'bottom' : 'right',
                    align: 'center',
                    labels: {
                        color: '#10B981',
                        usePointStyle: true,
                        padding: window.innerWidth < 768 ? 10 : 20,
                        boxWidth: window.innerWidth < 768 ? 6 : 10,
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    titleFont: {
                        size: window.innerWidth < 768 ? 10 : 12
                    },
                    bodyFont: {
                        size: window.innerWidth < 768 ? 10 : 12
                    },
                    padding: window.innerWidth < 768 ? 6 : 10
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
                            size: window.innerWidth < 768 ? 10 : 12
                        },
                        maxTicksLimit: window.innerWidth < 768 ? 5 : 8, // Fewer ticks on mobile
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { 
                        color: "#10B981",
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: window.innerWidth < 768 ? 10 : 12
                        },
                        maxTicksLimit: window.innerWidth < 768 ? 6 : 12, // Fewer ticks on mobile
                        maxRotation: window.innerWidth < 768 ? 45 : 0, // Rotate labels on mobile
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        };
    
        return (
            <motion.div
                variants={cardVariants}
                className="bg-[#141414] rounded-xl p-3 sm:p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[#FFB800]">Performance Metrics</h2>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        {["1M", "3M", "YTD", "ALL"].map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                className={`px-2 sm:px-3 py-1 rounded-lg text-sm sm:text-base font-medium flex-1 sm:flex-none ${
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
                
                <div className="h-[300px] sm:h-[540px] relative">
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
