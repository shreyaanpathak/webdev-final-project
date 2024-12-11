// MarketResearch.tsx
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { cardVariants } from "./constants";

export const MarketResearch = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#10B981',
                    font: { family: 'Inter, system-ui, sans-serif', size: 12 }
                }
            }
        },
        scales: {
            y: {
                grid: { color: "rgba(16, 185, 129, 0.05)" },
                ticks: { color: "#10B981" }
            },
            x: {
                grid: { display: false },
                ticks: { color: "#10B981" }
            }
        }
    };

    const marketData = {
        labels: ['1D', '1W', '1M', '3M', '6M', '1Y'],
        datasets: [
            {
                label: 'AI Sentiment Score',
                data: [75, 78, 82, 80, 85, 88],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true
            },
            {
                label: 'Market Volatility Index',
                data: [25, 28, 22, 30, 25, 20],
                borderColor: '#FFB800',
                backgroundColor: 'rgba(255, 184, 0, 0.1)',
                fill: true
            }
        ]
    };

    const signals = [
        { name: "Tech Sector", signal: "Strong Buy", confidence: 85, trend: "↑", color: "#10B981" },
        { name: "Energy Sector", signal: "Hold", confidence: 65, trend: "→", color: "#FFB800" },
        { name: "Real Estate", signal: "Sell", confidence: 75, trend: "↓", color: "#EF4444" }
    ];

    const marketMetrics = [
        { metric: "Market Cap", value: "$2.8T", change: "+3.2%" },
        { metric: "Daily Volume", value: "$142B", change: "-1.5%" },
        { metric: "Active Traders", value: "1.2M", change: "+5.8%" },
        { metric: "Avg. Volatility", value: "15.2", change: "-2.1%" }
    ];

    const topMovers = [
        { asset: "NVDA", price: "$890.25", change: "+8.2%" },
        { asset: "TSLA", price: "$245.30", change: "-4.5%" },
        { asset: "AAPL", price: "$182.15", change: "+2.1%" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
                variants={cardVariants}
                className="md:col-span-3 bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
            >
                <h2 className="text-xl font-bold text-[#FFB800] mb-6">Market Intelligence</h2>
                <div className="h-[300px] relative mb-6">
                    <h3 className="text-[#10B981] mb-4">Market Sentiment Analysis</h3>
                    <Line data={marketData} options={options} />
                </div>
                <div>
                    <h3 className="text-[#10B981] pt-[25px] mb-4">Today's Top Movers</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {topMovers.map((item, index) => (
                            <div key={index} className="bg-[#0D1F17] p-4 rounded-lg border border-[#10B981]/10 hover:bg-[#0D1F17]/80 hover:border-[#10B981]/30 transition-all duration-300">
                                <div className="text-[#FFB800] font-bold mb-2">{item.asset}</div>
                                <div className="text-white font-bold">{item.price}</div>
                                <div className={`text-sm ${item.change.includes('+') ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                    {item.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={cardVariants}
                className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
            >
                <h3 className="text-[#10B981] mb-6">AI Trading Signals</h3>
                <div className="space-y-4">
                    {signals.map((signal) => (
                        <div
                            key={signal.name}
                            className="bg-[#0D1F17] p-4 rounded-xl border border-[#10B981]/10 hover:border-[#10B981]/30 transition-colors duration-300"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-[#FFB800] font-bold">{signal.name}</h4>
                                <div className="text-2xl" style={{ color: signal.color }}>{signal.trend}</div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-2 bg-[#141414] rounded-lg border border-[#10B981]/10">
                                    <span className="text-[#10B981] text-sm">Signal</span>
                                    <span className="text-white font-bold text-sm">{signal.signal}</span>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[#10B981] text-sm">AI Confidence</span>
                                        <span className="text-white font-bold text-sm">{signal.confidence}%</span>
                                    </div>
                                    <div className="h-1.5 bg-[#0D1F17] rounded-full overflow-hidden border border-[#10B981]/10">
                                        <div
                                            className="h-full"
                                            style={{
                                                width: `${signal.confidence}%`,
                                                backgroundColor: signal.color
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};